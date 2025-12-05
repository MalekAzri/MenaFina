import numpy as np
import pandas as pd

# ============================================================
# PARAMETERS
# ============================================================
N = 10000
np.random.seed(42)

# ============================================================
# 1️⃣ PROFILE DISTRIBUTION (Balanced)
# ============================================================
profiles = np.random.choice(
    ["Conservative", "Balanced", "Aggressive"],
    size=N,
    p=[0.34, 0.33, 0.33]   # Slightly imperfect on purpose
)

# ============================================================
# 2️⃣ SOCIODEMOGRAPHICS (Realistic proportions)
# ============================================================
gender = np.random.choice(["Male","Female"], N, p=[0.48, 0.52])

age = np.random.choice(
    ["17-25","26-30","31-35","36-40","41-45","46-50","50+"],
    N, p=[0.14,0.17,0.17,0.16,0.16,0.14,0.06]
)

occupation = np.random.choice(
    ["Student","Professional","GovEmployee","Entrepreneur","Retired"],
    N, p=[0.18,0.38,0.18,0.22,0.04]
)

income = np.random.choice(
    ["<5M","5-10M","10-20M","20-50M",">50M"],
    N, p=[0.27,0.34,0.22,0.13,0.04]
)

stock_value = np.random.choice(
    ["<5M","5-10M","10-20M","20-50M","50-100M",">100M"],
    N, p=[0.35,0.27,0.19,0.11,0.05,0.03]
)

# ============================================================
# 3️⃣ UTILS
# ============================================================
def likert_noise(mean, std=0.7, size=1, noise=0.4):
    """Mean trait but with noise to simulate human inconsistency."""
    x = np.random.normal(mean, std, size)
    x += np.random.uniform(-noise, noise, size)  # extra noise
    return np.clip(np.round(x), 1, 5)

# ============================================================
# 4️⃣ LATENT TRAITS (OCEAN + FINANCIAL)
# ============================================================
O = np.zeros(N)
C = np.zeros(N)
E = np.zeros(N)
A = np.zeros(N)
Nn = np.zeros(N)

FI_lat = np.zeros(N)
RI_lat = np.zeros(N)
FD_lat = np.zeros(N)

for i in range(N):
    p = profiles[i]

    # Base deterministic tendencies (approximate, not perfect)
    if p == "Conservative":
        base = {
            "O": 3.0, "C": 4.0, "E": 2.4, "A": 3.8, "N": 4.0,
            "FI": 2.4, "RI": 2.1
        }
    elif p == "Balanced":
        base = {
            "O": 3.4, "C": 3.5, "E": 3.3, "A": 3.5, "N": 3.0,
            "FI": 3.0, "RI": 3.0
        }
    else:  # Aggressive
        base = {
            "O": 4.2, "C": 3.3, "E": 4.2, "A": 3.1, "N": 2.1,
            "FI": 4.1, "RI": 4.4
        }

    # Human-like noisy traits
    O[i]  = likert_noise(base["O"], 0.55)
    C[i]  = likert_noise(base["C"], 0.55)
    E[i]  = likert_noise(base["E"], 0.55)
    A[i]  = likert_noise(base["A"], 0.55)
    Nn[i] = likert_noise(base["N"], 0.55)

    FI_lat[i] = likert_noise(base["FI"], 0.45)
    RI_lat[i] = likert_noise(base["RI"], 0.45)

    # FD depends on FI + RI but imperfectly
    FD_lat[i] = np.clip(
        np.round(
            0.45 * RI_lat[i] +
            0.22 * FI_lat[i] +
            np.random.normal(0, 0.6)  # More noise → more human
        ), 1, 5
    )

# ============================================================
# 5️⃣ QUESTION BLOCKS (5 questions each)
# ============================================================
def make_block(lat):
    # Humans answer inconsistently → add extra random noise
    return np.clip(
        np.round(np.random.normal(lat[:, None], 0.45, (N, 5))), 
        1,5
    )

Op = make_block(O)
Co = make_block(C)
Ex = make_block(E)
Ag = make_block(A)
Ne = make_block(Nn)
FI = make_block(FI_lat)
RI = make_block(RI_lat)
FD = make_block(FD_lat)

# ============================================================
# 6️⃣ FINAL DATASET
# ============================================================
data = {
    "Gender": gender,
    "Age": age,
    "Occupation": occupation,
    "Income": income,
    "StockValue": stock_value,
    "Profile": profiles
}

blocks = [
    ("Op", Op), ("Co", Co), ("Ex", Ex), ("Ag", Ag),
    ("Ne", Ne), ("FI", FI), ("RI", RI), ("FD", FD)
]

for name, block in blocks:
    for j in range(5):
        data[f"{name}{j+1}"] = block[:, j]

df = pd.DataFrame(data)
df.to_excel("C:\\Users\\victus\\Desktop\\FINA\\data\\data_synthetique\\investors_10000_realistic.xlsx", index=False)

print("✔️ Dataset generated: investors_10000_realistic.xlsx")
print(df["Profile"].value_counts(normalize=True))
