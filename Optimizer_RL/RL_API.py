import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import numpy as np
import yfinance as yf
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv, VecNormalize

# Imports locaux (même dossier Optimizer_RL)
from Optimizer_RL.fixer_api import get_usd_tnd_fixer
from Optimizer_RL.universe import get_all_tickers
from Optimizer_RL.env_market import MarketEnv


# ==========================================================
#  Utilitaire : adapter l'allocation HRP → univers RL (52 tickers)
# ==========================================================
def expand_alloc_to_rl_space(alloc_dict, tickers):
    """
    alloc_dict : dict {"SHY": 0.2, "GLD": 0.1, ...} (poids HRP)
    tickers    : liste des 52 tickers RL

    Retour : np.array de longueur len(tickers) normalisée.
    """
    if alloc_dict is None:
        # si pas d'allocation initiale : répartition égale
        arr = np.ones(len(tickers), dtype=float)
    else:
        arr = np.array([alloc_dict.get(t, 0.0) for t in tickers], dtype=float)

    s = arr.sum()
    if s <= 0:
        arr = np.ones(len(tickers), dtype=float) / len(tickers)
    else:
        arr = arr / s

    return arr


# ==========================================================
#  🚀 API appelée par le chatbot
# ==========================================================
def run_rl(capital, profile, initial_alloc_dict=None):
    """
    capital : montant en TND (pour cohérence avec le reste de ton app)
    profile : "conservative" / "balanced" / "aggressive"
    initial_alloc_dict : dict des poids HRP, ex: {"SHY":0.2, "GLD":0.1, ...}
                         (peut être None → alloc égale)

    Retour :
        {
          "allocation": { "VT": montant_TND, ... },
          "final_value": valeur_finale_TND
        }
    """

    # 1) FX live USD → TND
    fx_df = get_usd_tnd_fixer("845d874cbaef527504bc022b66838e24")
    fx = float(fx_df["USD_TND"].iloc[0])
    print(f"✔ USD->TND Live rate: {fx:.4f}")

    # 2) Univers RL + données de prix
    tickers = get_all_tickers()
    prices = yf.download(tickers, start="2018-01-01")["Close"].dropna()

    # 3) Adapter l'allocation HRP aux 52 tickers RL
    initial_alloc = expand_alloc_to_rl_space(initial_alloc_dict, tickers)
    print(f"\n🟢 Allocation initiale adaptée au RL : {len(initial_alloc)} tickers")

    # 4) Construire chemins robustes vers les modèles
    base_dir = os.path.dirname(__file__)
    models_dir = os.path.join(base_dir, "models")
    vecnorm_path = os.path.join(models_dir, "C:\\Users\\victus\\Desktop\\FINA\\models\\vecnorm.pkl")
    ppo_path = os.path.join(models_dir, "C:\\Users\\victus\\Desktop\\FINA\\models\\ppo_rl_multi_profile_cycled.zip")

    # 5) Environnement RL
    env_raw = DummyVecEnv([
        lambda: MarketEnv(
            price_data=prices,
            fx_rate=fx,
            initial_alloc=initial_alloc,
            profile=profile,
            initial_capital=capital
        )
    ])

    # Charger normalisation entraînée
    env = VecNormalize.load(vecnorm_path, env_raw)
    env.training = False
    env.norm_reward = False

    # 6) Charger le modèle PPO
    model = PPO.load(ppo_path, env=env)

    # 7) Simulation
    obs = env.reset()
    done = False
    steps = 0

    while not done and steps < 5000:  # garde un max de sécurité
        action, _ = model.predict(obs, deterministic=True)
        obs, rewards, dones, infos = env.step(action)
        done = bool(dones[0])
        steps += 1

    # 8) Extraction du résultat final
    env_inner = env.envs[0]  # environnement sous-jacent (non normalisé)
    final_idx = env_inner.current_step
    final_prices = prices.iloc[final_idx].values

    units = env_inner.portfolio           # quantité par actif
    values_usd = units * final_prices     # valeur en USD
    total_usd = float(values_usd.sum() + env_inner.cash)
    total_tnd = total_usd * fx

    # Allocation en TND par ticker (on filtre les tout petits montants)
    allocation_tnd = {
        tickers[i]: round(float(values_usd[i] * fx), 2)
        for i in range(len(tickers))
        if values_usd[i] * fx > 1.0
    }

    # ---- convertir résultat RL en pourcentage + appliquer montants sur capital réel ----

    total_alloc = sum(allocation_tnd.values())
    weights = {k: v/total_alloc for k,v in allocation_tnd.items()}   # 0→1

    capital_alloc_tnd = {k: round(weights[k] * capital, 2) for k in weights}

    print("\n📊 Répartition recommandée pour ton capital réel :", capital, "TND")
    for k,v in capital_alloc_tnd.items():
        print(f"  {k:<8}  {weights[k]*100:5.1f}%   → {v} TND")

    return {
        "allocation_percent": {k: round(weights[k]*100,2) for k in weights},
        "allocation_tnd": capital_alloc_tnd,
        "final_value_rl_simulation": float(total_tnd),
    }

