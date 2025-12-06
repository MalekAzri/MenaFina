import numpy as np
import gymnasium as gym
from gymnasium import spaces
import talib

PROFILE_CONFIG = {
    "conservative": {"max_crypto": 0.03, "min_safe": 0.40, "min_bonds": 0.30, "risk_factor":0.3},
    "balanced":     {"max_crypto": 0.10, "min_safe": 0.25, "min_bonds": 0.15, "risk_factor":1.0},
    "aggressive":   {"max_crypto": 0.25, "min_safe": 0.10, "min_bonds": 0.00, "risk_factor":2.0},
}

PROFILE_VEC = {
    "conservative":np.array([1,0,0]),
    "balanced":    np.array([0,1,0]),
    "aggressive":  np.array([0,0,1])
}

def safe(x): return np.nan_to_num(x).astype(np.float32)

class MarketEnv(gym.Env):
    def __init__(self, price_data, fx_rate, initial_alloc=None, profile="balanced",
                 lookback=30, initial_capital=10000, fee=0.001):

        super().__init__()

        self.prices = price_data.ffill().bfill()
        self.fx = fx_rate
        self.tickers = list(price_data.columns)
        self.n_assets = len(self.tickers)

        self.profile = profile
        self.profile_vec = PROFILE_VEC[profile]
        self.config = PROFILE_CONFIG[profile]

        self.lookback = lookback
        self.initial_capital = initial_capital
        self.fee = fee

        self.current_step = lookback

        # OBS = historical prices + RSI/MACD/vol *N + allocs + cash + profile_vector
        self.obs_size = self.n_assets*lookback + self.n_assets*3 + self.n_assets + 1 + 3

        self.observation_space = spaces.Box(low=-5,high=5,shape=(self.obs_size,),dtype=np.float32)
        self.action_space = spaces.Box(low=0,high=1,shape=(self.n_assets,),dtype=np.float32)

        self.initial_alloc = initial_alloc
        self.reset()

    def _state(self):
        window = safe(self.prices.iloc[self.current_step-self.lookback:self.current_step].values.flatten())

        indicators=[]
        for t in self.tickers:
            series=self.prices[t].values[:self.current_step]
            rsi=talib.RSI(series,14); rsi=safe(np.array([rsi[-1]/100])) if len(rsi)>14 else np.array([0.5])
            macd,_ ,_= talib.MACD(series); macd=safe(np.array([macd[-1] if not np.isnan(macd[-1]) else 0]))
            vol=np.array([np.std(np.diff(series))]) if len(series)>5 else np.array([0.01])
            indicators+=list(rsi)+list(macd)+list(vol)

        alloc = safe(self.portfolio/(np.sum(self.portfolio)+1e-9))
        total = self.cash + (self.portfolio*self.prices.iloc[self.current_step]).sum()
        cash_ratio = safe(np.array([self.cash/(total+1e-9)]))

        return safe(np.concatenate([window, indicators, alloc, cash_ratio, self.profile_vec]))

    def _risk_penalty(self, alloc):
        crypto_weight = np.sum(alloc[[i for i,t in enumerate(self.tickers) if "USD" in t]])
        bonds_weight = np.sum(alloc[[i for i,t in enumerate(self.tickers) if t in ["BND","TLT","LQD","IEF","SHY"]]])
        safe_weight  = bonds_weight

        p=self.config
        penalty=0
        if crypto_weight > p["max_crypto"]: penalty += (crypto_weight - p["max_crypto"])*5
        if safe_weight < p["min_safe"]:     penalty += (p["min_safe"] - safe_weight)*3
        if bonds_weight < p["min_bonds"]:   penalty += (p["min_bonds"] - bonds_weight)*2
        return penalty*p["risk_factor"]

    def step(self, action):
        action=safe(action/(np.sum(action)+1e-9))

        prices=self.prices.iloc[self.current_step].values
        total=self.cash+(self.portfolio*prices).sum()

        target=total*action
        new_shares=target/(prices+1e-9)

        cost=np.sum(np.abs(new_shares-self.portfolio)*prices)*self.fee
        self.portfolio=new_shares
        self.cash=total-(new_shares*prices).sum()-cost

        self.current_step+=1
        new_total=self.cash + (self.portfolio*self.prices.iloc[self.current_step]).sum()

        reward=((new_total-total)/(total+1e-9)) - self._risk_penalty(action)
        terminated=self.current_step>=len(self.prices)-2
        truncated=False
        return self._state(), float(reward), terminated, truncated, {"value_usd":new_total}

    def reset(self, seed=None, options=None):
        super().reset(seed=seed)
        self.current_step=self.lookback

        if self.initial_alloc is not None:
            self.portfolio=(self.initial_alloc*self.initial_capital/self.prices.iloc[0].values)
            self.cash=0
        else:
            self.portfolio=np.zeros(self.n_assets)
            self.cash=self.initial_capital

        return self._state(),{}
