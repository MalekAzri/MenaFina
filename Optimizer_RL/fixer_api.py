import requests
import pandas as pd
from datetime import datetime

def get_usd_tnd_fixer(api_key):
    """
    Récupère le taux USD → TND via Fixer API en temps réel.
    Nécessite une clé API Fixer valide.
    """

    url = f"http://data.fixer.io/api/latest?access_key={api_key}&symbols=USD,TND"

    r = requests.get(url).json()

    if not r.get("success", False):
        print("❌ Erreur API Fixer:", r)
        return None

    # Fixer utilise EUR comme base → conversion correcte requise
    eur_to_usd = r["rates"]["USD"]            # EUR -> USD
    eur_to_tnd = r["rates"]["TND"]            # EUR -> TND

    usd_to_tnd = eur_to_tnd / eur_to_usd      # 1 USD en TND

    df = pd.DataFrame({"USD_TND":[usd_to_tnd]}, index=[datetime.now()])

    print(f"✔ USD->TND Live rate: {usd_to_tnd:.4f}")

    return df
