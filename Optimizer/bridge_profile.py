import sys, os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from Optimizer.generator import generate_portfolio
from Optimizer.allocator import apply_constraints
import pandas as pd



# ========= Paramètre capital utilisateur (en dinar tunisien) ==========
  # ➤ tu peux remplacer par input() plus tard

# ========= Conversion devise ==========
import requests

def get_live_rate():
    try:
        url = "https://api.exchangerate.host/latest?base=USD&symbols=TND"
        return requests.get(url).json()["rates"]["TND"]
    except:
        return 3.15  # fallback

USD_TO_TND = get_live_rate() 

def convert_to_usd(tnd_amount):
    return tnd_amount / USD_TO_TND

def convert_to_tnd(usd_amount):
    return usd_amount * USD_TO_TND


def allocate_amount(weights, capital_usd):
    """Répartition du capital suivant les poids générés."""
    return weights * capital_usd


def run_from_profile(profile="balanced", mode="hrp", capital=10000):

    # 1) Génération du portefeuille (poids)
    weights = generate_portfolio(profile=profile, mode=mode)

    # 2) Conversion du capital
    capital_usd = convert_to_usd(capital)

    # 3) Allocation des montants par actifs
    invest_usd = allocate_amount(weights, capital_usd)
    invest_tnd = invest_usd.apply(convert_to_tnd)

    print(f"\n=== Portfolio recommandé (capital en TND) : {profile.upper()} ===")
    print(f"Capital initial : {capital} TND ≈ {capital_usd:.2f} $")

    print("\nAllocation par actif :\n")
    for ticker, usd in invest_usd.items():
        tnd = invest_tnd[ticker]
        print(f"{ticker:<10} {usd:>10.2f} $   (~{tnd:>10.2f} TND)   ({weights[ticker]*100:.2f}%)")

    print("\n💰 Total investi en USD :", invest_usd.sum())
    print("💰 Total investi en TND :", invest_tnd.sum())

    return weights


# ===================== EXECUTION =====================
if __name__ == "__main__":
    run_from_profile("balanced")  
