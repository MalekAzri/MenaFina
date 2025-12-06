import sys, os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import numpy as np
import yfinance as yf
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv, VecNormalize

from fixer_api import get_usd_tnd_fixer
from universe import get_all_tickers
from env_market import MarketEnv
from Optimizer.bridge_profile import run_from_profile
from Optimizer.generator import generate_portfolio


# ========================= CONFIG ========================= #

profile = "conservative"   # <<< choix utilisateur: cautious / balanced / aggressive
profil = run_from_profile(profile)

# Allocation initiale depuis optimizer classique (dictionnaire)
initial_alloc_dict = generate_portfolio(profile, "hrp")  # format dict {"SHY":0.2,...}

# FX live
fx = float(get_usd_tnd_fixer("845d874cbaef527504bc022b66838e24")["USD_TND"].iloc[0])

# Univers boursier RL
tickers = get_all_tickers()
prices = yf.download(tickers, start="2018-01-01")["Close"].dropna()


# ---- Convertir allocation classique → même dimension que RL (52 tickers) ---- #
def expand_alloc_to_rl_space(alloc_dict, tickers):
    alloc = [alloc_dict.get(t, 0) for t in tickers]     # 0 si ticker manquant
    alloc = np.array(alloc, dtype=float)
    alloc = alloc / (alloc.sum()+1e-9)                  # normalisation
    return alloc

initial_alloc = expand_alloc_to_rl_space(initial_alloc_dict, tickers)
print(f"\n🟢 Allocation initiale adaptée au RL : {len(initial_alloc)} tickers\n")


# ========================= ENVIRONNEMENT ========================= #

env_raw = DummyVecEnv([
    lambda: MarketEnv(
    prices,
    fx,
    initial_alloc,
    profile
)
])

# Charger normalisation entraînée
env = VecNormalize.load("models/vecnorm.pkl", env_raw)
env.training = False
env.norm_reward = False


# ========================= CHARGEMENT MODEL ========================= #

model = PPO.load("models/ppo_rl_multi_profile_cycled.zip", env=env)


# ========================= RUN OPTIMIZER RL ========================= #

obs= env.reset()
done = False

while not done:
    action,_ = model.predict(obs, deterministic=True)
    obs, reward,done, info = env.step(action)

final_prices = prices.iloc[env.envs[0].current_step].values
units = env.envs[0].portfolio
values = units * final_prices

total = values.sum() + env.envs[0].cash
total_tnd = total * fx


# ========================= RESULTAT ========================= #

print("\n📌 Portefeuille RL Optimisé\n")
for i,ticker in enumerate(tickers):
    if units[i] > 0.0001:
        print(f"{ticker:<10} {units[i]:.4f} u | {values[i]*fx:,.1f} TND")

print(f"\n💰 Valeur Finale = {total_tnd:,.2f} TND\n")
