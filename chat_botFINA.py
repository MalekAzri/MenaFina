# ================================
# 🤖 CHATBOT FINANCIER FINA - FULL PIPELINE
# Profil → Explication → HRP Optimizer → RL Optimizer optionnel
# ================================

import sys
import os
import json

import joblib


# === Ajout du PATH pour imports corrects ===
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

# === PROFILING ===
from Profiling.explain_profil import explain_prediction, prepare_user_input 

# === OPTIMIZER CLASSIQUE (bridge) ===
from Optimizer.bridge_profile import run_from_profile

# === RL OPTIMIZER ===
from Optimizer_RL.RL_API import run_rl  # on modifie rien chez toi

clf = joblib.load("C:\\Users\\victus\\Desktop\\FINA\\data\\models\\investor_profile_model.pkl")
# ========================================================
# 1) QUESTIONS UTILISATEUR
# Big Five + Behaviour = input chatbot
# ========================================================
import pandas as pd
import json, os, datetime

def ask_questions():

    print("\n🔷 Bienvenue sur FINA — Investment AI Advisor")
    print("Je vais te poser une série de questions pour déterminer ton profil.\n")

    # === 1) Variables catégorielles ===
    print("📌 D'abord quelques infos générales")

    Gender = input("Gender (Male/Female) : ")
    Age = input("Age group [17-25/26-30/31-35/36-40/41-45/46-50/50+] : ")
    Occupation = input("Occupation [Student/Professional/GovEmployee/Entrepreneur/Retired] : ")
    Income = input("Income level [<5M/5-10M/10-20M/20-50M/50M+] : ")
    StockValue = input("Total Stock Investment Value [<5M/5-10M/10-20M/20-50M/50-100M/100M] : ")

    # === 2) Big Five ===
    print("\n🟣 Personality (Likert 1→5)")

    def ask_block(prefix, questions):
        resp = {}
        for i,q in enumerate(questions,1):
            resp[f"{prefix}{i}"] = int(input(f"{q} (1-5) : "))
        return resp

    Op = ask_block("Op", ["I enjoy exploring new ideas",
                          "I like unfamiliar activities",
                          "I'm curious",
                          "I prefer novelty",
                          "I enjoy creativity"])

    Co = ask_block("Co", ["I prepare in advance","I'm reliable","I pay attention to details",
                          "I follow plans","I'm efficient"])

    Ex = ask_block("Ex", ["I like attention","Comfortable socially","I talk a lot",
                          "Energetic with people","I make friends easily"])

    Ag = ask_block("Ag", ["I'm kind","Avoid conflict","I trust easily",
                          "I'm cooperative","I'm empathetic"])

    Ne = ask_block("Ne", ["I stress easily","I worry","I get upset",
                          "I'm nervous","Mood swings"])

    # === 3) Financial behaviour ===
    print("\n💰 Finance & Risk behaviour (1-5)")

    FI = ask_block("FI", ["Follow news","Monitor investments","Enjoy finance",
                          "Research before investing","Review goals"])

    RI = ask_block("RI", ["Take risks","Comfortable volatility","High-risk return",
                          "Not afraid to lose money","Uncertain assets OK"])

    FD = ask_block("FD", ["Quick decisions","Use intuition","Bold choices",
                          "Prefer fast results","No overthinking"])

    capital = float(input("\n💵 Montant à investir : "))

    # Assemble complete dict for ML input
    user_dict = {
        "Gender":Gender,
        "Age":Age,
        "Occupation":Occupation,
        "Income":Income,
        "StockValue":StockValue,
        **Op, **Co, **Ex, **Ag, **Ne,
        **FI, **RI, **FD
    }

    # === transforme en format modèle ===

    return user_dict, capital


DB_PATH = "C://Users/victus/Desktop/FINA/data/users.json"

def load_db():
    if not os.path.exists(DB_PATH) or os.path.getsize(DB_PATH) == 0:
        with open(DB_PATH, "w") as f: json.dump({}, f, indent=4)
        return {}
    with open(DB_PATH,"r") as f:
        return json.load(f)

def save_db(data):
    with open(DB_PATH,"w") as f:
        json.dump(data, f, indent=4)

# --- 🔥 convertisseur JSON safe ---
def to_json_portfolio(port):
    if isinstance(port, dict):
        new_port = {}
        for k,v in port.items():
            if isinstance(v, dict):         # nested dict (percent/tnd)
                new_port[k] = {subk: float(subv) for subk,subv in v.items()}
            else:
                new_port[k] = float(v)
        return new_port
    return port

def normalize_portfolio(port):
    """ Convertit Series/DataFrame → dict {ticker: float} """
    if hasattr(port, "to_dict"):
        return {k: float(v) for k,v in port.to_dict().items()}
    if isinstance(port, dict):
        return {k: float(v) for k,v in port.items()}
    return port

def save_user_profile(name, profile, capital, hrp, rl=None):
    db = load_db()

    entry = {
        "date": str(datetime.date.today()),
        "profile": profile,
        "capital": float(capital),
        "hrp_portfolio": to_json_portfolio(hrp),
        "rl_portfolio": {
                            "percent": to_json_portfolio(rl.get("allocation_percent")) if rl else None,
                            "tnd": to_json_portfolio(rl.get("allocation_tnd")) if rl else None,
                            "final_simulation_value": rl.get("final_value_rl_simulation") if rl else None
                        }

    }

    if name not in db:
        db[name] = {"history":[entry]}
    else:
        db[name]["history"].append(entry)

    save_db(db)
    print(f"\n💾 Données enregistrées dans users.json pour {name} ✓")

def get_user_history(name):
    db = load_db()
    return db.get(name, None)



# ========================================================
# 2) PIPELINE FINA
# ========================================================
def chatbot_FINA():

    print("\n══════════════════════════════════════════════════════")
    print(" 🤝 Bienvenue sur FINA — ton assistant d'investissement")
    print("══════════════════════════════════════════════════════")

    while True:
        name = input("\n👋 Pour commencer, comment tu t'appelles ? ").strip()
        user = get_user_history(name)

        # ================= CLIENT EXISTANT =================
        if user:
            print(f"\n👀 Content de te revoir {name} ! J’ai retrouvé ton dossier.")
            last = user["history"][-1]

            print("\n📂 Dernières informations enregistrées :")
            print(f" • Profil détecté : {last['profile'].title()}")
            print(f" • Dernier capital étudié : {last['capital']} TND")
            print(f" • Date de la dernière analyse : {last['date']}")

            # proposer re-profiling
            rep = input("\n🧠 Penses-tu que ton profil a changé ou souhaites-tu le refaire ? (y/n) : ").lower()

            if rep == "y":
                print("\n✨ D’accord ! On va refaire le questionnaire ensemble.")
                answers, capital = ask_questions()
                X_user_scaled, _ = prepare_user_input(answers)
                pred = clf.predict(X_user_scaled)[0]
                profile = {0:'conservative',1:'balanced',2:'aggressive'}[pred]

                print(f"\n🎯 Nouveau profil détecté : **{profile.upper()}**")
                explain_prediction(answers)
            else:
                print("\n👌 On garde ton profil précédent !")
                profile = last["profile"]
                capital = last["capital"]
                print(f"➡ Profil retenu : {profile.upper()} avec capital {capital} TND")

        # ================= NOUVEAU CLIENT =================
        else:
            print("\n🆕 Super, première séance avec toi ! On va apprendre à te connaître.")
            answers, capital = ask_questions()
            X_user_scaled, _ = prepare_user_input(answers)
            pred = clf.predict(X_user_scaled)[0]
            profile = {0:'conservative',1:'balanced',2:'aggressive'}[pred]

            print("\n🎯 Profil détecté, laisse-moi t'expliquer brièvement…")
            explain_prediction(answers)

        # ================= HRP PORTFOLIO =================
        print("\n📈 Je calcule maintenant un portefeuille équilibré pour toi…")
        res= run_from_profile(profile, "hrp", capital)

        # ================= RL PROPOSÉ CHAUDEMENT =================
        print("\n🔥 Si tu veux aller plus loin, je peux optimiser ton portefeuille à l'aide du Reinforcement Learning.")
        use_rl = input("\n🔥 Lancer optimisation RL ? (y/n): ").lower()
        if use_rl == "y":
            result = run_rl(
                capital=capital,
                profile=profile,
                initial_alloc_dict=res.to_dict()  # dict des poids HRP
            )
            rl_alloc = {
                "percent": result["allocation_percent"],
                "tnd": result["allocation_tnd"]
            }

            print("\n🚀 RL terminé")

        # ================= SAUVEGARDE CLIENT =================
        hrp_clean = normalize_portfolio(res)

        rl_clean = {
            "percent": rl_alloc["percent"],
            "tnd": rl_alloc["tnd"],
        } if rl_alloc else None

        save_user_profile(name, profile, capital, hrp_clean, rl_clean)

        print("\n💾 C’est bon, tout est enregistré. Tu pourras revenir quand tu veux !")

        again = input("\n🔁 Tu veux analyser un autre profil ou une autre somme ? (y/n) : ").lower()
        if again != "y":
            print("\n🌟 Merci d'avoir discuté avec moi. J'espère t'avoir aidé ! À très bientôt 👋")
            break


# ========================================================
if __name__ == "__main__":
    chatbot_FINA()
