// Fiches de référence : Markdown
//
// Schéma : { id, label, color, guide, groups: [ { name, cards: [ { t, d, code } ] } ] }
//   guide           → texte affiché en tête de page (champs décrits dans js/data/web.js)
//   groups[].name   → titre de section affiché (ex. "Texte")
//   cards[].t       → titre court de la fiche
//   cards[].d       → description en langage simple (affichée sous le titre)
//   cards[].code    → extrait affiché tel quel, avec ses commentaires <!-- -->
// Pour ajouter une fiche : copier un objet du tableau "cards" d'un groupe et
// l'adapter. Pour ajouter une section : copier un objet du tableau "groups".
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.markdown = {
  "id": "markdown",
  "label": "Markdown",
  "color": "var(--markdown-color)",
  "guide": {
    "resume": "Une façon d'écrire du texte mis en forme avec de simples symboles. C'est le format des fichiers README.",
    "role": "Markdown n'est pas un langage de programmation : c'est une convention d'écriture. On tape du texte brut, avec quelques symboles (`#` pour un titre, `*` pour l'italique, `-` pour une liste), et le site qui l'affiche le transforme en page mise en forme.\n\nLe fichier reste lisible tel quel, même sans être converti, et s'enregistre très bien dans Git. On le retrouve partout : fichiers README sur GitHub, messages Discord, documentations, prises de notes (Obsidian, Notion).",
    "pour": [
      "Le fichier README.md d'un projet",
      "Documentation et notes de cours",
      "Messages mis en forme sur GitHub et Discord",
      "Écrire vite sans quitter le clavier"
    ],
    "pasPour": [
      "Une mise en page précise (couleurs, colonnes) : c'est le rôle de HTML et CSS",
      "Un document à imprimer avec une mise en page soignée",
      "Des tableaux complexes avec cellules fusionnées"
    ],
    "fichiers": {
      "texte": "Les fichiers Markdown portent l'extension `.md`. Le plus important est `README.md`, à la racine du projet : GitHub l'affiche automatiquement sous la liste des fichiers.",
      "arbre": "mon-projet/\n├── README.md           # présentation : quoi, pourquoi, comment lancer\n├── docs/               # documentation plus détaillée (facultatif)\n│   ├── installation.md\n│   └── img/\n│       └── capture.png # images utilisées dans la documentation\n├── index.html\n└── js/",
      "notes": [
        "Le nom `README.md` s'écrit en majuscules, par convention.",
        "Dans VS Code, Ctrl + Maj + V affiche l'aperçu du fichier Markdown.",
        "Le rendu varie légèrement d'un site à l'autre : les fiches ci-dessous suivent celui de GitHub."
      ]
    },
    "demarrer": [
      "Créer un fichier `README.md` à la racine du projet.",
      "Y coller la fiche « Squelette de README » et remplacer le contenu.",
      "Vérifier le rendu avec l'aperçu de VS Code (Ctrl + Maj + V).",
      "Envoyer sur GitHub : le README s'affiche sur la page du dépôt."
    ]
  },
  "groups": [
    {
      "name": "Texte",
      "cards": [
        {
          "t": "Titres",
          "d": "Le nombre de # donne le niveau du titre, de 1 (le plus important) à 6. Un seul titre de niveau 1 par document.",
          "code": "# Titre du document\n## Grande partie\n### Sous-partie\n#### Détail\n\n<!-- L'espace après le # est obligatoire : \"#Titre\" ne fonctionne pas -->"
        },
        {
          "t": "Gras, italique, barré",
          "d": "On entoure le texte de symboles. Les deux écritures (* ou _) donnent le même résultat.",
          "code": "*italique* ou _italique_\n**gras** ou __gras__\n***gras et italique***\n~~barré~~\n\nUn mot **important** au milieu d'une phrase."
        },
        {
          "t": "Paragraphes & retours à la ligne",
          "d": "Une ligne vide sépare deux paragraphes. Un simple retour à la ligne est ignoré : le texte continue sur la même ligne.",
          "code": "Premier paragraphe.\nCette ligne est collée à la précédente dans le rendu.\n\nDeuxième paragraphe, après une ligne vide.\n\nPour forcer un retour à la ligne sans changer de paragraphe,\nterminer la ligne par deux espaces (comme ci-dessus) ou par <br>."
        },
        {
          "t": "Citations",
          "d": "Le signe > en début de ligne met le texte en retrait, comme une citation. Pratique pour une remarque ou un avertissement.",
          "code": "> Ceci est une citation.\n> Elle peut tenir sur plusieurs lignes.\n\n> **Attention :** enregistrez avant de fermer.\n\n> Citation\n>> imbriquée dans la première"
        }
      ]
    },
    {
      "name": "Listes",
      "cards": [
        {
          "t": "Listes à puces & numérotées",
          "d": "Un tiret pour une liste à puces, un nombre suivi d'un point pour une liste numérotée. On imbrique en décalant de deux espaces (puces) ou trois (numéros).",
          "code": "- Premier élément\n- Deuxième élément\n  - Sous-élément (2 espaces de retrait)\n  - Autre sous-élément\n- Troisième élément\n\n1. Première étape\n2. Deuxième étape\n   - Précision (3 espaces de retrait sous un numéro)\n3. Troisième étape"
        },
        {
          "t": "Liste de tâches",
          "d": "Des cases à cocher, affichées par GitHub. Idéal pour une liste de choses à faire dans un README ou une issue.",
          "code": "- [x] Créer la page d'accueil\n- [x] Ajouter le thème sombre\n- [ ] Corriger le menu sur mobile\n- [ ] Mettre le site en ligne"
        }
      ]
    },
    {
      "name": "Liens & images",
      "cards": [
        {
          "t": "Liens",
          "d": "Le texte cliquable entre crochets, l'adresse entre parenthèses. Une adresse entre chevrons devient cliquable telle quelle.",
          "code": "[Texte du lien](https://www.exemple.fr)\n[Lien avec info-bulle](https://www.exemple.fr \"Texte au survol\")\n\n<https://www.exemple.fr>\n\n[Autre fichier du projet](docs/installation.md)\n[Une section de cette page](#installation)"
        },
        {
          "t": "Images",
          "d": "Comme un lien, précédé d'un point d'exclamation. Le texte entre crochets est le texte alternatif, lu si l'image ne charge pas.",
          "code": "![Capture d'écran de l'accueil](docs/img/capture.png)\n\n<!-- Image cliquable : une image à l'intérieur d'un lien -->\n[![Logo](img/logo.png)](https://www.exemple.fr)\n\n<!-- Pour choisir la taille, il faut passer par du HTML -->\n<img src=\"docs/img/capture.png\" alt=\"Capture d'écran\" width=\"400\">"
        },
        {
          "t": "Sommaire avec ancres",
          "d": "Chaque titre reçoit automatiquement une ancre : le titre en minuscules, les espaces remplacés par des tirets, la ponctuation retirée.",
          "code": "## Sommaire\n\n- [Aperçu](#aperçu)\n- [Lancer le site](#lancer-le-site)\n- [Structure du projet](#structure-du-projet)\n\n## Aperçu\n...\n## Lancer le site\n...\n## Structure du projet\n..."
        }
      ]
    },
    {
      "name": "Code",
      "cards": [
        {
          "t": "Code dans une phrase",
          "d": "Des accents graves (touche AltGr + 7) autour d'un mot l'affichent en police de code : pour un nom de fichier, de fonction ou une commande.",
          "code": "Ouvrir le fichier `index.html` puis lancer `git status`.\n\nLa fonction `afficherVue()` est appelée au chargement.\n\n<!-- Pour afficher un accent grave dans du code, doubler les délimiteurs -->\n``Texte avec un ` dedans``"
        },
        {
          "t": "Bloc de code",
          "d": "Trois accents graves avant et après. Le nom du langage sur la première ligne active la coloration syntaxique.",
          "code": "```js\nfunction bonjour(nom) {\n    console.log(\"Bonjour \" + nom);\n}\n```\n\n```bash\npython -m http.server 5500\n```\n\n```\nSans nom de langage : texte brut, idéal pour une arborescence\nmon-site/\n├── index.html\n└── css/\n```\n\n<!-- Langages courants : html, css, js, python, c, cpp, bash, json -->"
        }
      ]
    },
    {
      "name": "Tableaux & séparateurs",
      "cards": [
        {
          "t": "Tableau",
          "d": "Des barres verticales séparent les colonnes, une ligne de tirets sépare l'en-tête du contenu. Les colonnes n'ont pas besoin d'être alignées dans le fichier.",
          "code": "| Fichier       | Rôle                         |\n| ------------- | ---------------------------- |\n| `index.html`  | Structure de la page         |\n| `style.css`   | Mise en forme                |\n| `app.js`      | Affichage et navigation      |\n\n<!-- Alignement : les deux-points dans la ligne de tirets -->\n| À gauche | Centré | À droite |\n| :------- | :----: | -------: |\n| texte    | texte  |    12,50 |"
        },
        {
          "t": "Ligne de séparation",
          "d": "Trois tirets seuls sur une ligne tracent un trait horizontal. Laisser une ligne vide avant, sinon le texte au-dessus devient un titre.",
          "code": "Fin de la première partie.\n\n---\n\nDébut de la deuxième partie."
        }
      ]
    },
    {
      "name": "Aller plus loin",
      "cards": [
        {
          "t": "Afficher un symbole tel quel",
          "d": "Une barre oblique inversée devant un symbole empêche Markdown de l'interpréter.",
          "code": "\\*Ce texte n'est pas en italique\\*\n\\# Ceci n'est pas un titre\nPrix : 5 \\* 3 = 15\n\n<!-- Symboles concernés : \\ ` * _ { } [ ] ( ) # + - . ! | -->"
        },
        {
          "t": "Encadrés GitHub (note, attention...)",
          "d": "Une citation qui commence par un mot-clé entre crochets devient un encadré coloré sur GitHub.",
          "code": "> [!NOTE]\n> Information utile, même en lisant en diagonale.\n\n> [!TIP]\n> Conseil pour aller plus vite.\n\n> [!WARNING]\n> Point qui demande une attention immédiate.\n\n> [!CAUTION]\n> Action risquée ou irréversible."
        },
        {
          "t": "HTML dans du Markdown",
          "d": "Quand Markdown ne suffit pas, on peut écrire du HTML directement dans le fichier. GitHub n'accepte que les balises simples (pas de style ni de script).",
          "code": "<details>\n<summary>Cliquer pour afficher la suite</summary>\n\nContenu caché par défaut. La ligne vide après summary est nécessaire\npour que le **Markdown** fonctionne à l'intérieur.\n\n</details>\n\n<p align=\"center\">\n  <img src=\"img/logo.png\" alt=\"Logo du projet\" width=\"120\">\n</p>\n\nAppuyer sur <kbd>Ctrl</kbd> + <kbd>S</kbd> pour enregistrer."
        }
      ]
    },
    {
      "name": "Modèles",
      "cards": [
        {
          "t": "Squelette de README",
          "d": "La structure minimale d'un bon README : ce que c'est, comment le lancer, comment c'est rangé. À copier à la racine de chaque projet.",
          "code": "# Nom du projet\n\nUne ou deux phrases : ce que fait le projet et pour qui.\n\n## Aperçu\n\n![Capture d'écran](docs/img/capture.png)\n\n## Lancer le projet\n\nAucune installation : ouvrir `index.html` dans un navigateur.\n\n## Structure\n\n```\nmon-projet/\n├── index.html      Squelette de la page\n├── css/style.css   Mise en forme\n└── js/app.js       Logique\n```\n\n## Modifier le contenu\n\nTout le texte se trouve dans `js/donnees.js`.\n\n## Auteur\n\nRéalisé par **Prénom**, dans le cadre de ..."
        },
        {
          "t": "Notes de mise à jour (CHANGELOG)",
          "d": "Un fichier CHANGELOG.md qui liste ce qui change à chaque version, la plus récente en haut.",
          "code": "# Notes de mise à jour\n\n## v0.11.1 — 2026-09-28\n\n### Ajouts\n- Bouton de fermeture sur la sélection de difficulté\n\n### Corrections\n- Les sprites de l'éditeur étaient trop petits\n- Évolution impossible vers une forme non jouable\n\n## v0.11 — 2026-09-20\n\n### Ajouts\n- Mode 2 contre 2"
        }
      ]
    },
    {
      "name": "Erreurs fréquentes",
      "cards": [
        {
          "t": "Oublier la ligne vide",
          "d": "Une liste, un tableau ou un bloc de code collé au paragraphe précédent n'est souvent pas reconnu. Dans le doute, une ligne vide avant et après.",
          "code": "<!-- FAUX : la liste est collée au texte -->\nVoici les étapes :\n- Installer\n- Lancer\n\n<!-- BON -->\nVoici les étapes :\n\n- Installer\n- Lancer"
        },
        {
          "t": "Oublier l'espace après le symbole",
          "d": "Titres, listes et citations exigent un espace entre le symbole et le texte.",
          "code": "<!-- FAUX -->\n#Titre\n-élément\n>citation\n\n<!-- BON -->\n# Titre\n- élément\n> citation"
        },
        {
          "t": "Sous-liste mal décalée",
          "d": "Une sous-liste doit être alignée sur le TEXTE de l'élément parent, pas sur son symbole : 2 espaces sous un tiret, 3 sous un numéro.",
          "code": "<!-- FAUX : un seul espace, la sous-liste reste au premier niveau -->\n1. Étape\n - détail\n\n<!-- BON : aligné sous le \"É\" de Étape -->\n1. Étape\n   - détail\n\n- Élément\n  - détail"
        }
      ]
    }
  ]
};
