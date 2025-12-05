import numpy as np
import pandas as pd
import gymnasium as gym
from gymnasium import spaces
import talib

def safe(x):
    x = np.nan_to_num(x, nan=0.0, posinf=0.0, neginf=0.0)
    return np.clip(x, -5, 5).astype(np.float32)

class MarketEnv(gym.Env):
    def __init__(self, price_data_usd, fx_usd_tnd, starting_portfolio_units=None, lookback=30, initial_capital=10000, fee=0.001):
        super().__init__()

        self.data = price_data_usd.ffill().bfill()
        self.fx = fx_usd_tnd
        self.tickers = list(price_data_usd.columns)
        self.n_assets = len(self.tickers)
        self.lookback = lookback
        self.starting_portfolio_units = starting_portfolio_units

        self.initial_capital = initial_capital
        self.fee = fee

        # on commence après la fenêtre lookback
        self.current_step = lookback

        # Observation size
        self.obs_size = self.n_assets*lookback + self.n_assets*3 + self.n_assets + 1

        self.observation_space = spaces.Box(low=-5,high=5,shape=(self.obs_size,),dtype=np.float32)
        self.action_space = spaces.Box(low=0,high=1,shape=(self.n_assets,),dtype=np.float32)

        self.reset()


    def _state(self):
        # Prices history window
        window = self.data.iloc[self.current_step-self.lookback:self.current_step].values.flatten()
        window = safe(window)

        # Indicators
        indicators = []
        for asset in self.tickers:
            series = self.data[asset].values[:self.current_step]

            rsi = talib.RSI(series,14)
            rsi = (rsi[-1]/100) if len(rsi) > 14 else 0.5

            macd,_,_ = talib.MACD(series)
            macd = macd[-1] if not np.isnan(macd[-1]) else 0.0

            vol = np.std(pd.Series(series).pct_change().dropna()[-20:]) if len(series) > 20 else 0.0

            indicators += [rsi, macd, vol]

        indicators = safe(np.array(indicators))

        # Allocation
        alloc = safe(self.portfolio/(np.sum(self.portfolio)+1e-9))

        # Ratio cash
        total = self.cash + (self.portfolio * self.data.iloc[self.current_step]).sum()
        cash_ratio = safe(np.array([self.cash/(total+1e-9)]))

        return safe(np.concatenate([window, indicators, alloc, cash_ratio]))


    def step(self,action):
        action = safe(action/(np.sum(action)+1e-9))

        prices = self.data.iloc[self.current_step].values
        total = self.cash + (self.portfolio*prices).sum()

        # target allocation
        target = total*action
        new_shares = target/(prices+1e-9)

        # trading fee
        cost = np.sum(np.abs(new_shares - self.portfolio)*prices)*self.fee

        self.portfolio = new_shares
        self.cash = total - (self.portfolio*prices).sum() - cost

        self.current_step += 1
        new_total = self.cash + (self.portfolio*self.data.iloc[self.current_step]).sum()

        reward = (new_total-total)/(total+1e-9) - 0.2*np.sum(action**2)

        terminated = self.current_step >= len(self.data)-2
        truncated = False
        info = {"value_usd": new_total}

        return self._state(), float(reward), terminated, truncated, info


    def reset(self, *, seed=None, options=None):
        super().reset(seed=seed)

        self.current_step = self.lookback

        if self.starting_portfolio_units is not None:
            self.portfolio = self.starting_portfolio_units.astype(float)
            self.cash = 0
        else:
            self.portfolio = np.zeros(self.n_assets)
            self.cash = self.initial_capital

        return self._state(), {}
