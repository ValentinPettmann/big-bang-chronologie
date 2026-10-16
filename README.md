# Chronologie du Big Bang — Visualisation Interactive

Application web statique autonome en français illustrant l'histoire de l'Univers, de l'**ère de Planck** ($10^{-43}\text{ s}$, $\sim 10^{32}\text{ K}$) jusqu'à **aujourd'hui** ($13,8\text{ milliards d'années}$, $2,725\text{ K}$).

## Caractéristiques

- **100 % autonome** : aucune dépendance externe, aucun CDN, aucune police distante (chemins relatifs uniquement).
- **Accessible au grand public** :
  - **Écran d'introduction** (`role="dialog"`, fermable au clic, avec `Entrée` ou `Échap`) expliquant le parcours, la lecture de l'échelle logarithmique (chaque graduation d'exposant +1 = 10× plus longtemps) et les contrôles.
  - **Explications vulgarisées en français simple** pour chaque ère, avec termes scientifiques expliqués en une ligne.
  - **Résumé « En une phrase »** mis en évidence et **repères du quotidien** (analogies numériquement justes sur les durées, températures et tailles) pour rendre les ordres de grandeur concrets, tout en conservant toutes les valeurs scientifiques exactes.
- **Animation Canvas 2D dédiée** pour chacune des **13 étapes cosmologiques** :
  1. Ère de Planck ($0$ à $10^{-43}\text{ s}$, $\sim 10^{32}\text{ K}$)
  2. Ère de grande unification ($10^{-43}$ à $10^{-36}\text{ s}$, $\sim 10^{28}\text{–}10^{32}\text{ K}$)
  3. Inflation cosmique ($\sim 10^{-36}$ à $10^{-32}\text{ s}$)
  4. Ère électrofaible ($10^{-32}$ à $10^{-12}\text{ s}$)
  5. Ère des quarks ($10^{-12}$ à $10^{-6}\text{ s}$)
  6. Ère des hadrons ($10^{-6}\text{ s}$ à $1\text{ s}$)
  7. Ère des leptons ($1\text{ s}$ à $10\text{ s}$)
  8. Nucléosynthèse primordiale ($\sim 10\text{ s}$ à $20\text{ min}$, $\sim 10^9\text{ K}$, $75\text{ \%}$ H / $25\text{ \%}$ He en masse)
  9. Ère des photons puis recombinaison / fond diffus cosmologique ($\sim 380\,000\text{ ans}$, $\sim 3\,000\text{ K}$)
  10. Âges sombres ($380\,000\text{ ans}$ à $\sim 100\text{–}200\text{ Ma}$)
  11. Premières étoiles ($\sim 100\text{–}200\text{ Ma}$)
  12. Galaxies ($\sim 400\text{ Ma}$ à $1\text{ Ga}$)
  13. Aujourd'hui ($13,8\text{ milliards d'années}$, $2,725\text{ K}$)
- **Frise chronologique logarithmique** ($\log_{10}(t\text{ en secondes})$) avec marqueurs interactifs cliquables.
- **Navigation accessible et responsive** : boutons *Précédent*, *Lecture/Pause*, *Suivant*, raccourcis clavier (`←`, `→`, `Espace`, `Échap`, `Entrée`), mise en page ajustée pour tenir sans défilement sur écran desktop ($1366 \times 800$) tout en restant fluide sur mobile.

## Structure du projet

```text
.
├── index.html      # Structure HTML5 et régions ARIA
├── css/
│   └── style.css   # Styles responsives (mobile et desktop)
├── js/
│   └── app.js      # Données des 13 ères, animations Canvas 2D et frise log10
└── README.md       # Documentation
```

## Ouvrir le projet localement

Vous pouvez ouvrir `index.html` directement dans un navigateur moderne, ou lancer un serveur HTTP local avec Python depuis la racine du dossier :

```bash
python3 -m http.server 8000
# ou : python -m http.server 8000
```

Ouvrez ensuite [http://localhost:8000](http://localhost:8000) dans votre navigateur.

## Déployer sur GitHub Pages

1. Poussez les fichiers (`index.html`, `css/style.css`, `js/app.js`, `README.md`) sur un dépôt GitHub.
2. Rendez-vous dans **Settings** → **Pages** de votre dépôt GitHub.
3. Sous **Build and deployment** → **Source**, sélectionnez **Deploy from a branch**.
4. Choisissez la branche principale (`main` ou `master`) et le dossier `/ (root)`, puis cliquez sur **Save**.
5. Votre page sera disponible quelques instants plus tard à l'adresse `https://<votre-utilisateur>.github.io/<nom-du-depot>/`.
