from config import PROFILE_CONFIG
from universe import TICKERS
import pandas as pd

# === Construction d'un mapping ticker → catégorie d'actif ===
TICKER_CLASS = {ticker:category for category, items in TICKERS.items() for ticker in items}


def apply_constraints(weights, profile):
    """
    Applique les contraintes de diversification basées sur le profil.
    Fonctionne maintenant avec les catégories définies dans universe.py.
    """

    cfg = PROFILE_CONFIG.get(profile.lower(), PROFILE_CONFIG["balanced"])

    # -------------------------------------
    # Convertir série en DataFrame classé
    # -------------------------------------
    df = pd.DataFrame({
        "weight": weights,
        "class": [TICKER_CLASS.get(t, "Other") for t in weights.index]   # sécurise les valeurs inconnues
    })

    # REGROUPER par classe d'actif
    class_alloc = df.groupby("class").weight.sum()

    # ======== 1) Limite Crypto ===========
    if "Crypto" in class_alloc and class_alloc["Crypto"] > cfg["max_crypto"]:
        factor = cfg["max_crypto"] / class_alloc["Crypto"]
        df.loc[df["class"]=="Crypto","weight"] *= factor


    # ======== 2) Maximum individuel par actif =========
    MAX_SINGLE = 0.20  # tu peux modifier
    df["weight"] = df["weight"].clip(upper=MAX_SINGLE)


    # ======== 3) SAFE minimum (ETF / Or / Immobilier) =========
    if "Safe" in class_alloc and class_alloc["Safe"] < cfg.get("min_safe",0):
        missing = cfg["min_safe"] - class_alloc["Safe"]
        safe_assets = df[df["class"]=="Safe"].index
        if len(safe_assets)>0:
            df.loc[safe_assets,"weight"] += missing/len(safe_assets)


    # ======== 4) Obligations minimum =========
    if "Bonds" in class_alloc and class_alloc["Bonds"] < cfg.get("min_bonds",0):
        missing = cfg["min_bonds"] - class_alloc["Bonds"]
        bond_assets = df[df["class"]=="Bonds"].index
        if len(bond_assets)>0:
            df.loc[bond_assets,"weight"] += missing/len(bond_assets)


    # ======== 5) Renormalisation =========
    df["weight"] = df["weight"].clip(lower=0)
    df["weight"] = df["weight"] / df["weight"].sum()

    # ======== 6) Diversité minimale =========
    MIN_ASSETS = 6
    if (df.weight > 0.03).sum() < MIN_ASSETS:   # si trop concentré
        top = df.sort_values("weight",ascending=False).head(MIN_ASSETS).index
        df["weight"] = 0
        df.loc[top,"weight"] = 1/MIN_ASSETS

    return df["weight"].round(3)
