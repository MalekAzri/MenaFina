import yfinance as yf
import pandas as pd
from Optimizer.universe import get_all_tickers
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
ALL_TICKERS = get_all_tickers()

def load_returns():

    # auto_adjust=True => pas de "Adj Close", on prend directement "Close"
    data = yf.download(ALL_TICKERS, start="2015-01-01", auto_adjust=True, progress=False)

    if "Close" in data.columns:  # format plat (une seule colonne par ticker)
        prices = data["Close"]
    else:  # format MultiIndex (Close, ticker)
        prices = data.xs("Close", axis=1, level=0)

    # Nettoyage
    prices = prices.ffill().bfill()
    prices = prices.dropna(axis=1, thresh=len(prices)*0.8)

    returns = prices.pct_change().dropna()

    return returns
