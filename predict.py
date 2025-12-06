# le fichier principal qui va communiquer avec le simulateur et donc avec l'utilisateur final. Il prend en input le ticker ou le nom de l'entreprise
# et le seuil de decision ( strict or not ) , récupère ces données, charge les données brutes correspondantes au Ticker depuis l'api financiere,
# nettoie ces données brutes pour qu'elles puissent etre utilisées par le modele entraîné et puis charge le modèle et fait la prédiction finale et 
# envoie des statistiques pour l'utilisateur: accuracy, growth and risk level.



import warnings
warnings.filterwarnings("ignore")  # ignore tous les warnings


import numpy as np
import joblib
import yfinance as yf
from yahooquery import search
import pandas as pd
import sys
import os

accuracy_model=0.84 # % d'accuracy de modele utilisé ( içi c le modele de random forest du fichier model.ipynb )
def get_ticker(query):
    query = query.strip().upper()

    # --- cacher toutes les erreurs yfinance / urllib / HTTP --- puisque je cherche d'abord par ticker en cas où l'input est un nom d'entreprise au lieu de ticker
    old_stderr = sys.stderr
    sys.stderr = open(os.devnull, 'w')

    # 1) Vérifier si c'est un ticker valide
    try:
        info = yf.Ticker(query).info
        if info and info.get("regularMarketPrice") is not None:
            sys.stderr = old_stderr
            print(f"'{query}' est un ticker valide.")
            return query
    except:
        pass

    # 2) Recherche par nom
    try:
        results = search(query)
        quotes = results.get('quotes', [])
        if quotes:
            ticker = quotes[0].get('symbol')
            sys.stderr = old_stderr
            print(f"'{query}' correspond au ticker : {ticker}")
            return ticker
        else:
            sys.stderr = old_stderr
            print(f"Aucun ticker trouvé pour '{query}'")
            return None
    except:
        sys.stderr = old_stderr
        print("Erreur lors de la recherche du ticker")
        return None


# Demander le ticker ou nom
user_input = input("Entrez le ticker ou le nom de l'entreprise : ")
ticker = get_ticker(user_input)
if ticker is None:
    print("Ticker invalide ou introuvable ! Fin du programme.")
    exit(1)

print("Ticker utilisé :", ticker)


# Nettoyage des fondamentaux
def clean_fundamentals(fund_df):
    df = fund_df.copy()
    required_cols = [
        "Ticker", "Date",
        "Total Revenue", "Operating Revenue", "EBITDA", "EBIT", "Operating Income",
        "Net Income", "Net Income From Continuing Operations", "Net Income Common Stockholders",
        "Diluted Average Shares", "Basic Average Shares", "Diluted EPS", "Basic EPS",
        "Total Debt", "Net Debt", "Current Assets", "Current Liabilities", 
        "Cash Cash Equivalents And Short Term Investments", "Accounts Receivable", 
        "Inventory", "Invested Capital", "Total Equity", "Common Stock Equity",
        "Cost Of Revenue"
    ]

    col_map = {
        "totalRevenue": "Total Revenue",
        "ebitda": "EBITDA",
        "ebit": "EBIT",
        "operatingIncome": "Operating Income",
        "netIncomeToCommon": "Net Income Common Stockholders",
        "netIncome": "Net Income",
        "totalDebt": "Total Debt",
        "currentAssets": "Current Assets",
        "currentLiabilities": "Current Liabilities",
        "totalCash": "Cash Cash Equivalents And Short Term Investments",
        "accountsReceivable": "Accounts Receivable",
        "inventory": "Inventory",
        "totalStockholderEquity": "Total Equity",
        "commonStock": "Common Stock Equity",
        "costOfRevenue": "Cost Of Revenue",
        "trailingEps": "Diluted EPS",
        "sharesOutstanding": "Diluted Average Shares"
    }

    for api_col, model_col in col_map.items():
        if api_col in df.columns:
            df[model_col] = df[api_col]

    # Approximation des colonnes manquantes
    if "Operating Revenue" not in df or df["Operating Revenue"].isna().all():
        df["Operating Revenue"] = df.get("Total Revenue", np.nan)
    if "Net Income From Continuing Operations" not in df or df["Net Income From Continuing Operations"].isna().all():
        df["Net Income From Continuing Operations"] = df.get("Net Income Common Stockholders", np.nan)
    if "Basic Average Shares" not in df or df["Basic Average Shares"].isna().all():
        df["Basic Average Shares"] = df.get("Diluted Average Shares", np.nan)
    if "Net Debt" not in df or df["Net Debt"].isna().all():
        df["Net Debt"] = df.get("Total Debt", 0) - df.get("Cash Cash Equivalents And Short Term Investments", 0)
    if "Invested Capital" not in df or df["Invested Capital"].isna().all():
        df["Invested Capital"] = df.get("Total Equity", 0) + df.get("Net Debt", 0)

    for col in required_cols:
        if col not in df:
            df[col] = np.nan

    df_clean = df[required_cols]
    df_clean["Date"] = pd.to_datetime(df_clean["Date"], errors='coerce')
    return df_clean

def fetch_prices(ticker, start="2020-01-01", end=None):
    import yfinance as yf
    import pandas as pd
    import numpy as np

    # Télécharger les données
    df = yf.download(ticker, start=start, end=end, auto_adjust=False)
    df.reset_index(inplace=True)

    # Aplatir les colonnes MultiIndex si besoin
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = ['_'.join(filter(None, map(str, col))).replace(' ', '_') for col in df.columns]

    # Créer ou renommer la colonne Date
    date_cols = [c for c in df.columns if 'date' in c.lower()]
    if date_cols:
        df.rename(columns={date_cols[0]: 'Date'}, inplace=True)
    else:
        df['Date'] = pd.Timestamp.today()

    # Fonctions pour détecter les colonnes Close
    def find_adj_close_column(columns):
        for col in columns:
            if 'adj_close' in col.lower():
                return col
        return None

    def find_close_column(columns):
        for col in columns:
            if 'close' in col.lower() and 'adj_close' not in col.lower():
                return col
        return None

    # Gestion de la colonne Close_Adj
    adj_col = find_adj_close_column(df.columns)
    close_col = find_close_column(df.columns)
    if adj_col:
        df["Close_Adj"] = pd.to_numeric(df[adj_col], errors='coerce')
    elif close_col:
        df["Close_Adj"] = pd.to_numeric(df[close_col], errors='coerce')
    else:
        df["Close_Adj"] = np.nan

    df["Ticker"] = ticker

    # Calcul des indicateurs
    df["Daily_Return"] = df["Close_Adj"].pct_change()
    df["Volatility"] = df["Daily_Return"].rolling(20).std()
    df["Annual_Volatility"] = df["Volatility"] * np.sqrt(252)
    df["MA10"] = df["Close_Adj"].rolling(10).mean()
    df["MA50"] = df["Close_Adj"].rolling(50).mean()
    df["MA200"] = df["Close_Adj"].rolling(200).mean()

    delta = df["Close_Adj"].diff()
    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta < 0, 0)
    avg_gain = gain.rolling(14).mean()
    avg_loss = loss.rolling(14).mean()
    rs = avg_gain / avg_loss
    df["RSI"] = 100 - (100 / (1 + rs))
    ema12 = df["Close_Adj"].ewm(span=12, adjust=False).mean()
    ema26 = df["Close_Adj"].ewm(span=26, adjust=False).mean()
    df["MACD"] = ema12 - ema26
    df["Drawdown"] = df["Close_Adj"]/df["Close_Adj"].cummax() - 1
    df["Momentum_1D"] = df["Close_Adj"].diff(1)
    df["Momentum_5D"] = df["Close_Adj"].diff(5)
    df["Momentum_10D"] = df["Close_Adj"].diff(10)
    df["Momentum_20D"] = df["Close_Adj"].diff(20)
    df["Return_Lag_1D"] = df["Daily_Return"].shift(1)
    df["Return_Lag_5D"] = df["Daily_Return"].shift(5)
    df["Return_Lag_10D"] = df["Daily_Return"].shift(10)

    df["Date"] = pd.to_datetime(df["Date"], errors='coerce')
    df["Day_of_Week"] = df["Date"].dt.dayofweek
    df["Month"] = df["Date"].dt.month
    df["Quarter"] = df["Date"].dt.quarter

    # Réorganisation des colonnes
    columns_order = [
        "Ticker", "Date", "Close_Adj", "High", "Low", "Open", "Volume",
        "Daily_Return", "Volatility", "Annual_Volatility", "MA10", "MA50", "MA200",
        "RSI", "MACD", "Drawdown",
        "Momentum_1D", "Momentum_5D", "Momentum_10D", "Momentum_20D",
        "Return_Lag_1D", "Return_Lag_5D", "Return_Lag_10D",
        "Day_of_Week", "Month", "Quarter"
    ]

    df = df.reindex(columns=columns_order, fill_value=np.nan)
    
    # Sauvegarder
    #df.to_csv(f"{ticker}_prices.csv", index=False)
    #print(df.columns)

    return df


def fetch_fundamentals(ticker):
    info = yf.Ticker(ticker).info
    fund_df = pd.DataFrame([info])
    fund_df['Ticker'] = ticker

    # Créer une colonne 'Date' si elle n'existe pas ou est entièrement vide
    if 'Date' not in fund_df.columns or fund_df['Date'].isna().all():
        fund_df['Date'] = pd.Timestamp.today().normalize()  # date sans l'heure

    # Applatir les colonnes MultiIndex si besoin
    if isinstance(fund_df.columns, pd.MultiIndex):
        fund_df.columns = ['_'.join(col).strip() if col[1] else col[0] for col in fund_df.columns]

    # Réordonner les colonnes selon ton ordre souhaité
    ordered_cols = [
        "Ticker", "Date", "Total Revenue", "Operating Revenue", "EBITDA", "EBIT",
        "Operating Income", "Net Income", "Net Income From Continuing Operations",
        "Net Income Common Stockholders", "Diluted Average Shares", "Basic Average Shares",
        "Diluted EPS", "Basic EPS", "Total Debt", "Net Debt", "Current Assets",
        "Current Liabilities", "Cash Cash Equivalents And Short Term Investments",
        "Accounts Receivable", "Inventory", "Invested Capital", "Common Stock Equity",
        "Cost Of Revenue"
    ]
    for col in ordered_cols:
        if col not in fund_df:
            fund_df[col] = np.nan  # remplir les colonnes manquantes par NaN
    fund_df = fund_df[ordered_cols]

    # Sauvegarder
    #fund_df.to_csv(f"{ticker}_fundamentals.csv", index=False)
    #print(fund_df.columns)  # pour vérifier
    return fund_df



# 2. Récupérer les données
prices_df = fetch_prices(ticker)
fundamentals_df = fetch_fundamentals(ticker)


def compute_investment_metrics(features_row, accuracy_model):
    """
    Calcule:
    - accuracy_score (0-100)
    - growth_potential_level ("Low", "Medium", "High")
    - risk_level ("Low", "Medium", "High")
    """

    # 1) Accuracy score basé sur l'accuracy du modèle
    accuracy_score = round(float(accuracy_model) * 100, 2)

    # ----------------------------
    # 2) Growth potential (niveau qualitatif)
    # ----------------------------
    growth_factors = 0

    # Croissance
    if features_row.get("EPS_Growth", 0) > 0:
        growth_factors += 1
    if features_row.get("Revenue_Growth", 0) > 0:
        growth_factors += 1

    # Momentum
    for m in ["Momentum_1D", "Momentum_5D", "Momentum_10D", "Momentum_20D"]:
        if features_row.get(m, 0) > 0:
            growth_factors += 1

    # Trend: MA10 > MA50 > MA200
    ma10, ma50, ma200 = features_row.get("MA10", 0), features_row.get("MA50", 0), features_row.get("MA200", 0)
    if ma10 > ma50 > ma200:
        growth_factors += 1

    # RSI
    rsi = features_row.get("RSI", 50)
    if rsi < 30:
        growth_factors += 1

    # Définir niveau qualitatif
    if growth_factors <= 2:
        growth_potential_level = "Low"
    elif growth_factors <= 4:
        growth_potential_level = "Medium"
    else:
        growth_potential_level = "High"

    # ----------------------------
    # 3) Risk level
    # ----------------------------
    vol = features_row.get("Volatility", 0)
    ann_vol = features_row.get("Annual_Volatility", 0)
    drawdown = features_row.get("Drawdown", 0)
    debt = features_row.get("Debt_to_Equity", 0)

    risk_score = (
        vol * 20 +
        ann_vol * 15 +
        abs(drawdown) * 10 +
        max(0, debt - 1) * 10
    )

    if risk_score < 20:
        risk_level = "Low"
    elif risk_score < 60:
        risk_level = "Medium"
    else:
        risk_level = "High"

    return accuracy_score, growth_potential_level, risk_level


def fusion(prices_df, fundamentals_df, save_csv=True, csv_path="new_features.csv"):
    import pandas as pd
    import numpy as np

    # --- 1) Normaliser les dates et forcer le même type ---
    prices_df['Date'] = pd.to_datetime(prices_df['Date'], errors='coerce').dt.floor('D')
    fundamentals_df['Date'] = pd.to_datetime(fundamentals_df['Date'], errors='coerce').dt.floor('D')

    prices_df['Date'] = prices_df['Date'].astype('datetime64[ns]')
    fundamentals_df['Date'] = fundamentals_df['Date'].astype('datetime64[ns]')

    # --- 2) Nettoyer et trier ---
    prices_df = prices_df.dropna(subset=['Date']).sort_values(['Ticker', 'Date']).reset_index(drop=True)
    fundamentals_df = fundamentals_df.dropna(subset=['Date']).sort_values(['Ticker', 'Date']).reset_index(drop=True)

    # --- 3) Merge asof par ticker ---
    merged_list = []
    for ticker in prices_df['Ticker'].unique():
        prices_ticker = prices_df[prices_df['Ticker'] == ticker].copy()
        funds_ticker = fundamentals_df[fundamentals_df['Ticker'] == ticker].copy()
        if not funds_ticker.empty:
            merged = pd.merge_asof(
                prices_ticker, funds_ticker,
                on='Date',
                direction='backward',
                tolerance=pd.Timedelta('92D')
            )
            merged_list.append(merged)
        else:
            merged_list.append(prices_ticker)

    merged_df = pd.concat(merged_list, ignore_index=True)

    #print("apres fusion\n", merged_df.columns)

    # Si Ticker_x et Ticker_y existent, garder Ticker_x et supprimer Ticker_y
    if 'Ticker_x' in merged_df.columns and 'Ticker_y' in merged_df.columns:
        merged_df['Ticker'] = merged_df['Ticker_x']  # créer Ticker unique
        merged_df.drop(['Ticker_x','Ticker_y'], axis=1, inplace=True)
    elif 'Ticker_x' in merged_df.columns:
        merged_df.rename(columns={'Ticker_x':'Ticker'}, inplace=True)
    elif 'Ticker_y' in merged_df.columns:
        merged_df.rename(columns={'Ticker_y':'Ticker'}, inplace=True)


    # --- 5) Calcul des ratios financiers ---
    merged_df['ROE'] = merged_df['Net Income Common Stockholders'] / merged_df['Common Stock Equity']
    merged_df['Profit_Margin'] = merged_df['Net Income'] / merged_df['Total Revenue']
    merged_df['Debt_to_Equity'] = merged_df['Total Debt'] / merged_df['Common Stock Equity']
    merged_df['EPS_Growth'] = merged_df.groupby('Ticker')['Diluted EPS'].pct_change()
    merged_df['Revenue_Growth'] = merged_df.groupby('Ticker')['Total Revenue'].pct_change()
    merged_df['Current_Ratio'] = merged_df['Current Assets'] / merged_df['Current Liabilities']
    merged_df['Quick_Ratio'] = (merged_df['Current Assets'] - merged_df['Inventory']) / merged_df['Current Liabilities']
    merged_df['Operating_Margin'] = merged_df['Operating Income'] / merged_df['Total Revenue']
    merged_df['P_to_E'] = merged_df['Close_Adj'] / merged_df['Diluted EPS']
    merged_df['Price_to_Book'] = merged_df['Close_Adj'] / merged_df['Common Stock Equity']
    merged_df['Price_to_Revenue'] = merged_df['Close_Adj'] / merged_df['Total Revenue']

        # --- 6) Trier par date pour résumé ---
    merged_df = merged_df.sort_values(["Ticker", "Date"])

    # --- 7) Créer resume_df : dernière ligne par ticker ---
    resume_df = merged_df.groupby("Ticker").tail(1).reset_index(drop=True)


    # --- 8) Colonnes pour le modèle ---
    model_columns = [
        'Ticker', 'Date', 'Close_Adj', 'High', 'Low', 'Open', 'Volume', 'Daily_Return', 
        'Volatility', 'Annual_Volatility', 'MA10', 'MA50', 'MA200', 'RSI', 'MACD',
        'Drawdown', 'Momentum_1D', 'Momentum_5D', 'Momentum_10D', 'Momentum_20D', 
        'Return_Lag_1D', 'Return_Lag_5D', 'Return_Lag_10D', 'Day_of_Week', 'Month', 'Quarter',
        'Total Revenue', 'Operating Revenue', 'EBITDA', 'EBIT', 'Operating Income', 'Net Income', 
        'Net Income From Continuing Operations', 'Net Income Common Stockholders', 
        'Diluted Average Shares', 'Basic Average Shares', 'Diluted EPS', 'Basic EPS', 
        'Total Debt', 'Net Debt', 'Current Assets', 'Current Liabilities', 
        'Cash Cash Equivalents And Short Term Investments', 'Accounts Receivable', 'Inventory', 
        'Invested Capital', 'Common Stock Equity', 'Cost Of Revenue', 'ROE', 'Profit_Margin', 
        'Debt_to_Equity', 'EPS_Growth', 'Revenue_Growth', 'Current_Ratio', 'Quick_Ratio', 
        'Operating_Margin', 'P_to_E', 'Price_to_Book', 'Price_to_Revenue'
    ]

    # Garder uniquement les colonnes existantes
    resume_df = resume_df[[c for c in model_columns if c in resume_df.columns]]

    # --- 9) Sauvegarder ou mettre à jour CSV ---
    if save_csv:
        try:
            df_csv = pd.read_csv(csv_path)
        except FileNotFoundError:
            df_csv = pd.DataFrame()

        # Ajouter la nouvelle ligne
        df_csv = pd.concat([df_csv, resume_df], ignore_index=True)

        # Si plusieurs lignes pour le même ticker → garder la dernière (Date plus récente)
        if "Date" in df_csv.columns:
            df_csv["Date"] = pd.to_datetime(df_csv["Date"], errors="coerce")
            df_csv.sort_values(by="Date", inplace=True)

        # Eliminer les doublons par ticker en gardant la version récente
        df_csv.drop_duplicates(subset=["Ticker"], keep="last", inplace=True)

        # Sauvegarde
        df_csv.to_csv(csv_path, index=False)


    return resume_df


# 4. Calcul des features
resume_df = fusion(prices_df, fundamentals_df)

model_features = [
    'ROE', 'Profit_Margin', 'Debt_to_Equity', 'EPS_Growth', 'Revenue_Growth',
    'Current_Ratio', 'Quick_Ratio', 'Operating_Margin', 'P_to_E', 'Price_to_Book',
    'Price_to_Revenue', 'Daily_Return', 'Volatility', 'Annual_Volatility', 'MA10',
    'MA50', 'MA200', 'RSI', 'MACD', 'Drawdown', 'Momentum_1D', 'Momentum_5D',
    'Momentum_10D', 'Momentum_20D', 'Return_Lag_1D', 'Return_Lag_5D',
    'Return_Lag_10D', 'Day_of_Week', 'Month', 'Quarter'
]

# Ajouter les colonnes manquantes avec 0
for col in model_features:
    if col not in resume_df.columns:
        resume_df[col] = 0


# S'assurer de l'ordre exact des colonnes
X_model = resume_df[model_features]

accuracy, growth, risk = compute_investment_metrics(
    features_row=X_model.iloc[0],
    accuracy_model =accuracy_model
)



# 1. Charger le modèle et le scaler
try:
    model = joblib.load("investment_model.pkl")
    scaler = joblib.load("scaler.pkl")
except FileNotFoundError:
    print("Erreur : le fichier du modèle ou du scaler est introuvable !")
    exit(1)
except Exception as e:
    print(f"Erreur lors du chargement du modèle/scaler : {e}")
    exit(1)

# Normalisation avec le scaler
X_scaled = scaler.transform(X_model)


# Prédiction avec le modèle
prediction = model.predict(X_scaled)  # <-- ici on définit prediction

# Affichage
for i, ticker_name in enumerate(resume_df['Ticker']):
    print(f"Ticker: {ticker_name}")
    print(f"Prediction (invest=1 / not invest=0): {prediction[i]}")
    print(f"accuracy score: {accuracy}%")
    print(f"Growth Potential: {growth}")
    print(f"Risk Level: {risk}")

