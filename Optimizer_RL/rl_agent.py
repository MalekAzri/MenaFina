from stable_baselines3 import PPO
from stable_baselines3.common.torch_layers import MlpExtractor

def get_agent(env, lr=3e-4):
    return PPO(
        "MlpPolicy", env,
        learning_rate=lr,
        n_steps=2048,
        batch_size=128,
        gamma=0.99,
        gae_lambda=0.95,
        clip_range=0.2,
        verbose=1
    )
