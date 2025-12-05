from dotenv import load_dotenv
import requests
import os
import json

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

def generate_fina_explanation(profile, reasons):

    prompt = f"""
Tu es FINA, un conseiller financier intelligent et rassurant.
Tu ne promets jamais de gains et ne recommandes aucun actif précis.
Ton rôle : aider l’utilisateur à comprendre son profil, à se sentir accompagné,
et à avancer vers une gestion financière alignée, sereine et progressive.

Profil identifié : {profile}
Éléments clés observés : {reasons}

Ta réponse doit être :
- chaleureuse, bienveillante, structurée et simple à lire
- 7 à 10 lignes maximum
- expliquer pourquoi ce profil est cohérent pour lui
- montrer comment transformer ce profil en force dans sa vie financière
- rassurer : il n'est pas seul, FINA accompagne étape par étape
- proposer des pistes d'orientation générales (sans recommander où investir)
- ton empathique, coach financier humain, jamais supérieur

Structure recommandée :
1) Accueil + reconnaissance du profil
2) Mise en valeur des qualités et forces observées
3) Ce que cela implique dans sa manière d'investir (avantages + points d'attention)
4) Message de guidance : comment avancer progressivement
5) Phrase finale réconfortante, FINA est un compagnon de route

Écris comme si tu t'adressais directement à la personne.
Pas de jargon, pas de chiffres techniques.
"""


    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "gpt-4o-mini",   # OpenRouter proxy, 100% compatible
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.4,
        "max_tokens": 500
    }

    try:
        r = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            data=json.dumps(payload)
        )
        data = r.json()

        if "choices" not in data:
            return f"""
FINA n’a pas pu générer une explication complète pour le moment.

Profil : {profile}
Points clés : {', '.join(reasons)}

Message API :
{data.get("error", data)}
"""
        return data["choices"][0]["message"]["content"]

    except Exception as e:
        return f"[ERREUR API] {str(e)}"
