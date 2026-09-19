# Pense-Bêtes Code

Aide-mémoire de syntaxe pour **C, C++, Arduino, HTML/CSS/JS, Python et Git** : recherche instantanée, copie en un clic, explications ligne par ligne.

## Arborescence

```
pense-bettes-code/
├── index.html          # page principale (structure + import des scripts/styles)
├── css/
│   └── style.css        # toute l'apparence (thème clair/sombre automatique)
└── js/
    ├── app.js            # logique : onglets, recherche, affichage des fiches, copier
    └── data/
        ├── c.js           # fiches C
        ├── cpp.js          # fiches C++
        ├── arduino.js       # fiches Arduino
        ├── html.js           # fiches HTML, CSS et JavaScript
        ├── python.js          # fiches Python
        └── git.js              # fiches Git
```

## Utilisation

Double-cliquer sur `index.html` suffit — aucune installation, aucun serveur, ça fonctionne directement dans le navigateur en local.

## Ajouter une fiche

Chaque fichier de `js/data/` définit `window.CHEATSHEET_DATA.<langage> = { id, label, color, groups }`. Un `group` a un `name` et une liste de `cards`, chacune avec `t` (titre), `d` (description) et `code` (le snippet, avec des commentaires `//` ou `<!-- -->` explicatifs). Il suffit d'ajouter une carte dans le bon groupe (ou un nouveau groupe) pour l'étoffer — chaque fichier de données est chargé en simple `<script>` classique dans `index.html`, avant `js/app.js` qui les assemble.
