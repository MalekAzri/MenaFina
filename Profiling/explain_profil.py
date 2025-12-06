# =====================================
# explain_profil.py
# =====================================
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
import joblib
import shap
import pandas as pd
from Profiling.generate_ai_explanation import generate_fina_explanation


# -------------------------------
# Charger modèle + scaler + colonnes
# -------------------------------
clf = joblib.load("C:\\Users\\victus\\Desktop\\FINA\\data\\models\\investor_profile_model.pkl")
scaler = joblib.load("C:\\Users\\victus\\Desktop\\FINA\\data\\models\\scaler.pkl")
columns = joblib.load("C:\\Users\\victus\\Desktop\\FINA\\data\\models\\columns.pkl")

# -------------------------------
# Fonction pour préparer X_user
# -------------------------------
def prepare_user_input(user_dict):

    df_user = pd.DataFrame([user_dict])

    # One-hot
    df_cat = pd.get_dummies(
        df_user[["Gender", "Age", "Occupation", "Income", "StockValue"]],
        drop_first=True
    )

    # Likert
    prefixes = ("Op","Co","Ex","Ag","Ne","FI","RI","FD")
    likert_cols = [c for c in df_user.columns if c.startswith(prefixes)]
    df_num = df_user[likert_cols].apply(pd.to_numeric, errors="coerce")

    # Assemble
    X_user = pd.concat([df_cat, df_num], axis=1)

    # Align with training columns
    X_user = X_user.reindex(columns=columns)

    # supprimer tous les NaN après reindex
    X_user = X_user.fillna(0)

    # Normalisation
    X_user_scaled = scaler.transform(X_user)

    return X_user_scaled, X_user



# -------------------------------
# Traduction SHAP → phrases humaines
# -------------------------------
def humanize_shap(column, value):
    if column.startswith("Op"):
        return "tu sembles ouvert(e) aux opportunités et aux idées nouvelles"
    if column.startswith("Co"):
        return "tu recherches de la structure et de la clarté dans tes décisions"
    if column.startswith("Ex"):
        return "tu montres une belle aisance à communiquer et à t’exprimer financièrement"
    if column.startswith("Ag"):
        return "tu restes calme, coopératif(ve) et posé(e) dans tes décisions"
    if column.startswith("Ne"):
        return "tu essaies d’éviter le stress et les situations incertaines"
    if column.startswith("FI"):
        return "tu réfléchis sérieusement avant de t’engager financièrement"
    if column.startswith("RI"):
        return "tu évalues bien les risques avant d’agir"
    if column.startswith("FD"):
        return "tu analyses les données ou les chiffres pour te rassurer"
    if column.startswith("Gender_"):
        return "ton style de décision est influencé par tes expériences de vie"
    if column.startswith("Age_"):
        return "tes choix reflètent ton étape personnelle de vie"
    return "un élément de ta personnalité financière influence ce résultat"

# -------------------------------
# Fonction principale : prédire + expliquer
# -------------------------------
def explain_prediction(user_dict):

    # Préparation input
    X_user_scaled, X_user_df = prepare_user_input(user_dict)

    # Prédiction
    pred_code = clf.predict(X_user_scaled)[0]
    proba = clf.predict_proba(X_user_scaled)[0]

    mapping = {0: "Conservative", 1: "Balanced", 2: "Aggressive"}
    profile_name = mapping[pred_code]

    print("\n=== PROFILE ===")
    print(profile_name)
    print(proba)

    # SHAP
    explainer = shap.LinearExplainer(clf, X_user_df)
    shap_values = explainer(X_user_df)
    shap_user = shap_values.values[0]

    # SHAP
    explainer = shap.LinearExplainer(clf, X_user_df)
    shap_values = explainer(X_user_df)

    # SHAP renvoie (1, 3, n_features) → on sélectionne la classe prédite
    shap_user = shap_values.values[0, pred_code]

    # Top 8 contributions
    idx = abs(shap_user).argsort()[::-1][:8]

    human_reasons = []
    for i in idx:
        i = int(i)  # indice propre
        col = columns[i]
        val = shap_user[i]
        reason = humanize_shap(col, val)
        human_reasons.append(reason)




    # Explication finalisée par FINA
    fina_text = generate_fina_explanation(profile_name, human_reasons)

    print("\n===== FINA EXPLANATION =====")
    print(fina_text)

    return fina_text


# -------------------------------
# TEST
# -------------------------------
if __name__ == "__main__":
    example_user = {
    "Gender": "Male",
    "Age": "46-50",
    "Occupation": "GovEmployee",
    "Income": "10-20M",
    "StockValue": "5-10M",

    "Op1": 3, "Op2": 3, "Op3": 2, "Op4": 2, "Op5": 3,   # ouverture modérée
    "Co1": 4, "Co2": 4, "Co3": 5, "Co4": 4, "Co5": 5,   # très structuré / ordonné
    "Ex1": 3, "Ex2": 2, "Ex3": 3, "Ex4": 3, "Ex5": 2,   # expression plutôt réservée
    "Ag1": 4, "Ag2": 4, "Ag3": 4, "Ag4": 3, "Ag5": 3,   # calme, réfléchi
    "Ne1": 2, "Ne2": 2, "Ne3": 3, "Ne4": 2, "Ne5": 2,   # faible anxiété financière
    "FI1": 4, "FI2": 5, "FI3": 4, "FI4": 4, "FI5": 4,   # analyse avant engagement
    "RI1": 5, "RI2": 4, "RI3": 5, "RI4": 4, "RI5": 4,   # forte gestion du risque
    "FD1": 4, "FD2": 4, "FD3": 3, "FD4": 4, "FD5": 4,   # base de décision sur les faits
}


    explain_prediction(example_user)
