import numpy as np
import pandas as pd
import yfinance as yf
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv, VecNormalize

from Optimizer_RL.universe import get_all_tickers
from env_market import MarketEnv
from utils.fixer_api import get_usd_tnd_fixer
from Optimizer.bridge_profile import run_from_profile
from Optimizer.generator import generate_portfolio

# ----------------------------------------
# 1) Profil utilisateur → portefeuille initial
# ----------------------------------------
profile ="balanced"
mode ="hrp"

profil = run_from_profile(profile)      
initial_alloc = generate_portfolio(profil,mode) 

# ----------------------------------------
# 2) Market Data
# ----------------------------------------
tickers = get_all_tickers()
prices = yf.download(tickers, start="2016-01-01")["Close"].dropna()
prices_init = prices.iloc[0]

initial_capital = 10000  
starting_portfolio_units = np.array([ 
    (initial_alloc.get(t,0)*initial_capital) / prices_init[t]  
    for t in tickers
])

# ----------------------------------------
# 3) Live FX USD→TND
# ----------------------------------------
API_KEY = "*****************************"
fx_df = get_usd_tnd_fixer(API_KEY)
fx = float(fx_df["USD_TND"].iloc[0])

print(f"✔ USD→TND = {fx}")

# ----------------------------------------
# 4) RL Environment
# ----------------------------------------
env_raw = DummyVecEnv([lambda: MarketEnv(prices, fx, starting_portfolio_units)])

# Charge normalization utilisée durant training
env = VecNormalize.load("models/vecnorm.pkl", env_raw)

# ----------------------------------------
# 5) Load Trained Model
# ----------------------------------------
model = PPO.load("models/ppo_tnd.zip")

# ----------------------------------------
# 6) Run RL Simulation
# ----------------------------------------
obs,_ = env.reset()
done=False
value=[]

while not done:
    action,_ = model.predict(obs, deterministic=True)
    obs, reward, terminated, truncated, info = env.step(action)
    done = terminated or truncated

    info_single = info[0] if isinstance(info, list) else info
    v_tnd = info_single["value_usd"] * fx
    value.append(v_tnd)

# ---------- AFFICHAGE DU PORTFOLIO -------------------
final_prices = prices.iloc[env.envs[0].current_step].values
final_units = env.envs[0].portfolio
final_values_usd = final_units * final_prices

total_usd = final_values_usd.sum() + env.envs[0].cash
total_tnd = total_usd * fx

print("\n📌 Portefeuille final optimisé (RL)\n")

for i,asset in enumerate(tickers):
    units = final_units[i]
    if units>0.00001:
        val_usd = final_values_usd[i]
        val_tnd = val_usd * fx
        weight = (val_usd/total_usd)*100
        print(f"{asset:<10} : {units:8.4f} unités | {val_tnd:10.2f} TND | {weight:5.1f}%")

if env.envs[0].cash > 0:
    cash_tnd = env.envs[0].cash * fx
    weight_cash = (env.envs[0].cash/total_usd)*100
    print(f"Cash       :          ---       | {cash_tnd:10.2f} TND | {weight_cash:5.1f}%")

print(f"\n💰 Valeur totale finale = {total_tnd:,.2f} TND")
