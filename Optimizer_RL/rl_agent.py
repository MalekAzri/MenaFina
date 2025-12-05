import os
from stable_baselines3 import PPO, SAC
from sb3_contrib import RecurrentPPO

def get_agent(name, env, save_dir="models"):

    os.makedirs(save_dir, exist_ok=True)

    if name=="PPO":
        return PPO("MlpPolicy", env, learning_rate=3e-5,
                   n_steps=2048, batch_size=256, gamma=0.99,
                   ent_coef=0.01, verbose=1)

    if name=="PPO-LSTM":
        return RecurrentPPO("MlpLstmPolicy", env, learning_rate=3e-5,
                            n_steps=2048, batch_size=256, verbose=1)

    if name=="SAC":
        return SAC("MlpPolicy", env, learning_rate=3e-4,
                   batch_size=256, tau=0.02, verbose=1)

    raise Exception("Choose PPO / SAC / PPO-LSTM")
