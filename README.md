FranzIQ MVP

Un mini-site de démo pour un test de QI mobile et interactif. 5 questions gratuites, puis essai 7 jours à 1€ avec une modale de paiement simulée (Apple Pay / Google Pay / PayPal / CB). Aucune transaction réelle n'est effectuée.

Lancer en local

1. Ouvrir `index.html` dans votre navigateur (double‑clic suffit) ou servez le dossier avec un serveur statique.
2. Cliquer sur « Je commence maintenant ».

Déploiement rapide

- GitHub Pages: poussez ce dossier dans un repo et activez Pages (branche `main`, racine `/`).
- Netlify / Vercel: glissez‑déposez le dossier, ou connectez le repo et déployez en 1 clic.

Push vers GitHub

```bash
cd /Users/simonazoulay/IQ_MVP
git init
git add .
git commit -m "feat: MVP FranzIQ"
git branch -M main
git remote add origin https://github.com/monsiaz/franz_IQ.git
git push -u origin main
```

Activer GitHub Pages

- Settings → Pages → Source: Deploy from a branch
- Branch: main / root
- L’URL s’affiche (ex: `https://monsiaz.github.io/franz_IQ/`).

Structure

- `index.html` — UI principale (Hero, Quiz, Résultats, Modale de paiement)
- `css/styles.css` — Styles (mobile‑first, Bootstrap 5)
- `js/app.js` — Logique du quiz, paywall et rendu
- `assets/` — Logos et SVGs

Personnalisation

- Pour changer les questions, éditez le tableau `QUESTIONS` dans `js/app.js`.
- La limite gratuite est définie par `FREE_LIMIT = 5`.
- La modale de paiement appelle `window.app.simulatePayment(method)` qui active la suite du test.

Notes

- Ce projet est une démonstration statique destinée au prototypage produit et tests utilisateurs.
- Pour un paiement réel, remplacez la simulation par Stripe (Payment Request API pour Apple/Google Pay) et PayPal Checkout.


