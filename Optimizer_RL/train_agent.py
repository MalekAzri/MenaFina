import yfinance as yf
from stable_baselines3.common.vec_env import DummyVecEnv, VecNormalize
from universe import get_all_tickers
from env_market import MarketEnv
from rl_agent import get_agent

tickers = get_all_tickers()
prices=yf.download(tickers,start="2018-01-01")["Close"].dropna()

# Training en USD (plus stable)
fx = 3.0   # valeur nominale pour entraînement (live sera appliqué ensuite)

env = DummyVecEnv([lambda: MarketEnv(prices, fx)])
env = VecNormalize(env, norm_obs=True, norm_reward=True, clip_obs=10.)

model = get_agent("PPO", env)

print("\n🔵 Training started...\n")
model.learn(total_timesteps=300000)           # augmenter si GPU/temps dispo
model.save("models/ppo_tnd.zip")
env.save("models/vecnorm.pkl")

print("\n✔ Model trained and saved successfully!\n")
