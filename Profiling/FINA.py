import pandas as pd
import numpy as np
import joblib

from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    accuracy_score
)

# ============================================================
# 1) CHARGEMENT + NETTOYAGE GLOBAL DU DATASET
# ============================================================

print("🔵 Chargement du dataset…")
df = pd.read_excel("C:\\Users\\victus\\Desktop\\FINA\\data\\data_synthetique\\investors_10000_realistic.xlsx")

# --- Suppression des colonnes dupliquées ---
df = df.loc[:, ~df.columns.duplicated()]

# --- Suppression des colonnes vides ---
df = df.dropna(axis=1, how='all')

# --- Nettoyage des noms de colonnes ---
df.columns = df.columns.str.strip()

# --- Nettoyage des valeurs manquantes ---
df = df.fillna(0)

print(f"✔️ Colonnes utilisées : {len(df.columns)}")


# ============================================================
# 2) DÉFINITION DES BLOCS
# ============================================================

cat_cols = ["Gender", "Age", "Occupation", "Income", "StockValue"]

prefixes = ("Op", "Co", "Ex", "Ag", "Ne", "FI", "RI", "FD")
likert_cols = [c for c in df.columns if c.startswith(prefixes)]

print(f"✔️ Catégorielles : {cat_cols}")
print(f"✔️ Likert : {len(likert_cols)} colonnes")


# ============================================================
# 3) ONE-HOT ENCODING DES CATÉGORIELLES
# ============================================================

df_cat = pd.get_dummies(df[cat_cols], drop_first=True)

# Sécuriser en cas de colonnes manquantes ou d’ordre différent
df_cat = df_cat.reindex(columns=df_cat.columns, fill_value=0)


# ============================================================
# 4) EXTRACTION DES VALEURS NUMÉRIQUES
# ============================================================

df_num = df[likert_cols].apply(pd.to_numeric, errors="coerce").fillna(0)


# ============================================================
# 5) ASSEMBLAGE DE X
# ============================================================

X = pd.concat([df_cat, df_num], axis=1)
X = X.apply(pd.to_numeric, errors="coerce").fillna(0)

print(f"✔️ Matrice X finale : {X.shape}")


# ============================================================
# 6) ENCODAGE DU LABEL
# ============================================================

profile_map = {
    "Conservative": 0,
    "Balanced": 1,
    "Aggressive": 2
}

df["ProfileCode"] = df["Profile"].map(profile_map)
y = df["ProfileCode"]

print("✔️ Encodage du profil terminé.")


# ============================================================
# 7) SPLIT TRAIN/TEST
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

print("✔️ Train/Test Split effectué.")


# ============================================================
# 8) NORMALISATION
# ============================================================

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("✔️ Normalisation appliquée.")


# ============================================================
# 9) ENTRAÎNEMENT DU MODÈLE
# ============================================================

clf = LogisticRegression(max_iter=700)
clf.fit(X_train_scaled, y_train)

print("✔️ Modèle entraîné avec succès.")


# ============================================================
# 10) ÉVALUATION PROFESSIONNELLE
# ============================================================

y_pred = clf.predict(X_test_scaled)

print("\n📊 ====== ÉVALUATION DU MODÈLE ======")
print("Accuracy :", accuracy_score(y_test, y_pred))
print("\nMatrice de confusion :\n", confusion_matrix(y_test, y_pred))
print("\nRapport de classification :\n", classification_report(y_test, y_pred, target_names=["Conservative","Balanced","Aggressive"]))


# ============================================================
# 11) SAUVEGARDE
# ============================================================

joblib.dump(clf, "C:\\Users\\victus\\Desktop\\FINA\\data\\models\\investor_profile_model.pkl")
joblib.dump(scaler, "C:\\Users\\victus\\Desktop\\FINA\\data\\models\\scaler.pkl")
joblib.dump(list(X.columns), "C:\\Users\\victus\\Desktop\\FINA\\data\\models\\columns.pkl")

print("\n💾 Modèle & scaler enregistrés avec succès.")
print("🎉 Entraînement terminé.")
