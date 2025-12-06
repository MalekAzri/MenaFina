import yfinance as yf
from stable_baselines3.common.vec_env import DummyVecEnv, VecNormalize
from universe import get_all_tickers
from env_market import MarketEnv, PROFILE_CONFIG
from rl_agent import get_agent
import sys, os
from itertools import cycle

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

# ----- Données -----
tickers = get_all_tickers()
prices = yf.download(tickers, start="2018-01-01")["Close"].dropna()

fx = 3.0  # nominal pour training

profiles = list(PROFILE_CONFIG.keys())

# ----- Cycle pour entraîner équitablement -----
profile_cycle = cycle(profiles)

def make_env():
    profile = next(profile_cycle)
    print(f"Training episode with profile → {profile}")
    return MarketEnv(prices, fx, profile=profile)

# ----- Environnement RL -----
env = DummyVecEnv([make_env])
env = VecNormalize(env, norm_obs=True, norm_reward=True)

# ----- Agent -----
model = get_agent(env)

# ----- Entraînement -----
model.learn(total_timesteps=100000)

# ----- Sauvegarde -----
model.save("models/ppo_rl_multi_profile_cycled.zip")
env.save("models/vecnorm.pkl")

print("\n🔥 Training complete — model saved with perfectly balanced profiles.")
