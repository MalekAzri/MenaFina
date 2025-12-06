from Optimizer.strategies import optimize_portfolio
from Optimizer.allocator import apply_constraints
from Optimizer.universe import TICKERS
from Optimizer.data import load_returns
import pandas as pd
import numpy as np
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))


np.random.seed(42)  # <--- stabilisation HRP


PROFILE_ALLOC = {
    "conservative": {"Bonds":0.50,"Safe":0.30,"Gold":0.10,"Crypto":0.02,"Tech":0.05,"Other":0.03},
    "balanced":     {"Bonds":0.25,"Safe":0.25,"Gold":0.10,"Crypto":0.10,"Tech":0.25,"Other":0.05},
    "aggressive":   {"Bonds":0.10,"Safe":0.15,"Gold":0.05,"Crypto":0.25,"Tech":0.35,"Other":0.10}
}


def generate_portfolio(profile="balanced", mode="hrp", top_k=20):
    rets = load_returns()

    # 1) Optimisation
    w = optimize_portfolio(rets, mode).sort_values(ascending=False).head(top_k)
    w /= w.sum()

    # 2) Attribution classe
    df = pd.DataFrame({
        "weight": w,
        "class":[cat for t in w.index for cat, lst in TICKERS.items() if t in lst]
    })

    # 3) Redistribution selon profil (LA CLÉ MANQUANTE)
    alloc = PROFILE_ALLOC[profile]

    for cls,p in alloc.items():
        assets=df[df["class"]==cls].index
        if len(assets)>0:
            df.loc[assets,"weight"]=p/len(assets)

    df["weight"] /= df.weight.sum()

    # 4) Application contraintes (Min bonds, Min safe, Max crypto, etc)
    final = apply_constraints(df.weight,profile)

    return final
