# Le Codage pour les Nuls

Aide-mémoire pour **C, C++, Arduino, Python, HTML, CSS, JavaScript, Git et Markdown** :
un guide d'utilisation en tête de chaque page (à quoi sert le langage, comment ranger
ses fichiers, par où commencer), puis des fiches de syntaxe expliquées ligne par ligne.

Site statique, sans framework ni dépendance.

## Lancer le site

Double-cliquer sur `index.html` suffit. Pour le servir en local :

```bash
python -m http.server 5500
```

puis ouvrir <http://localhost:5500>.

## Structure

```
Aide-de-programation/
├── index.html          Squelette : barre du haut, barre latérale, zone de contenu
├── css/
│   └── style.css       Toute la mise en forme (thème clair et sombre)
└── js/
    ├── app.js          Navigation, recherche, affichage des guides et des fiches
    └── data/
        ├── accueil.js  Texte d'accueil, parcours conseillés, présentation des pages
        ├── web.js      Page « Organiser son site »
        ├── c.js  cpp.js  arduino.js  python.js
        ├── html.js  css.js  js.js
        └── git.js  markdown.js  json.js
```

## Fonctionnement

| Élément | Comportement |
| --- | --- |
| Adresse | Chaque page a la sienne : `index.html#/c`, `#/html`, `#/markdown`… (`#/` = accueil) |
| Recherche | Porte sur toutes les fiches à la fois ; touche `/` pour y aller, `Échap` pour l'effacer |
| Guide | Repliable ; l'état ouvert/fermé est mémorisé dans le navigateur |
| Thème | Suit le système, puis le choix fait avec le bouton en haut à droite |
| Commentaires | Affichés en gris dans les extraits, pour que le code ressorte |

## Modifier le contenu

Tout le contenu est dans `js/data/` ; il n'y a rien à modifier dans le HTML.

### Ajouter une fiche

Dans le fichier du langage, copier un objet du tableau `cards` d'une section :

```js
{
  "t": "Titre court",
  "d": "Explication en langage simple.",
  "code": "ligne 1   // commentaire\nligne 2"
}
```

### Modifier un guide

Chaque fichier contient un objet `guide` :

| Champ | Affiché dans |
| --- | --- |
| `resume` | La phrase sous le titre de la page |
| `role` | « À quoi ça sert vraiment » (paragraphes séparés par `\n\n`) |
| `pour` / `pasPour` | Les listes « Fait pour » et « Pas fait pour » |
| `fichiers` | « Organiser ses fichiers » : `texte`, `arbre` (arborescence), `notes` |
| `demarrer` | Les étapes numérotées « Pour démarrer » |

Dans ces textes, `` `code` `` et `**gras**` sont mis en forme.

### Ajouter une page

1. Créer `js/data/monlangage.js` sur le modèle d'un fichier existant.
2. L'inclure dans `index.html`, avant `js/app.js`.
3. Ajouter son `id` dans `NAV_RAW` (`js/app.js`) et sa couleur `--monlangage-color` (`css/style.css`).
4. Ajouter sa présentation dans le tableau `intros` de `js/data/accueil.js`.
