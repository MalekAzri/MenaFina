import sys, os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
import pandas as pd
import numpy as np
from scipy.cluster.hierarchy import linkage, fcluster
from sklearn.covariance import LedoitWolf


# ======================= 1) Baseline optimizers =======================

def sharpe_opt(returns):
    mean_ret = returns.mean()*252
    cov = returns.cov()*252
    inv = np.linalg.pinv(cov)
    w = inv.dot(mean_ret)/np.sum(inv.dot(mean_ret))
    return pd.Series(w, index=returns.columns)

def min_vol_opt(returns):
    cov = returns.cov()*252
    inv = np.linalg.pinv(cov)
    ones = np.ones(len(cov))
    w = inv.dot(ones)/np.sum(inv.dot(ones))
    return pd.Series(w,index=returns.columns)

def max_return_opt(returns):
    m = returns.mean()
    w = m/m.sum()
    return pd.Series(w,index=returns.columns)


# ======================= 2) Risk Parity =======================

def risk_parity(returns):
    cov = returns.cov()
    inv = 1/np.sqrt(np.diag(cov))
    w = inv/np.sum(inv)
    return pd.Series(w,index=returns.columns)


# ======================= 3) HRP — Hierarchical Risk Parity =======================

def hrp(returns):
    cov = returns.cov()
    corr = returns.corr()

    # Step 1 — Clustering
    dist = np.sqrt((1-corr)/2)
    link = linkage(dist, method='ward')
    clusters = fcluster(link, t=1.15, criterion='distance')

    weights = pd.Series(0, index=returns.columns)

    for c in np.unique(clusters):
        group = returns.columns[clusters==c]
        cov_sub = cov.loc[group,group]
        w_sub = 1/np.diag(cov_sub)
        w_sub = w_sub/np.sum(w_sub)
        weights[group] = w_sub/len(np.unique(clusters))

    return weights/weights.sum()


# ======================= 4) Optimizer selector =======================

def optimize_portfolio(returns, mode="hrp"):
    try:
        if mode=="hrp": 
            return hrp(returns)
    except:
        print("⚠ HRP failed → fallback to Sharpe optimizer.")
        return sharpe_opt(returns)

    return sharpe_opt(returns)

