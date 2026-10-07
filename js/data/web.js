// Page « Organiser son site » : comment ranger, relier, tester et publier un site.
//
// Schéma : { id, label, color, guide, groups: [ { name, cards: [ { t, d, code } ] } ] }
//   guide.resume    → phrase affichée sous le titre de la page
//   guide.role      → « À quoi ça sert vraiment » (paragraphes séparés par \n\n)
//   guide.pour      → liste « Fait pour »
//   guide.pasPour   → liste « Pas fait pour »
//   guide.fichiers  → { texte, arbre, notes } : « Organiser ses fichiers »
//   guide.demarrer  → étapes numérotées « Pour démarrer »
//   Dans les textes du guide : `code` et **gras** sont mis en forme.
//   groups / cards  → les fiches, comme dans les autres fichiers de js/data/
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.web = {
  "id": "web",
  "label": "Organiser son site",
  "color": "var(--web-color)",
  "guide": {
    "resume": "Où ranger ses fichiers, comment les relier, comment tester et mettre en ligne : ce qu'il faut savoir avant d'écrire la première balise.",
    "role": "Un site web repose sur trois langages qui ont chacun un seul rôle. Le **HTML** contient le contenu (titres, textes, images). Le **CSS** règle l'apparence (couleurs, tailles, mise en page). Le **JavaScript** gère le comportement (ce qui se passe quand on clique).\n\nLa règle d'or est de ne pas les mélanger : chaque langage dans son fichier, chaque fichier dans son dossier. Un site bien rangé se modifie en quelques secondes ; un site où tout est dans le même fichier devient impossible à corriger au bout d'un mois.",
    "pour": [
      "HTML : dire ce qu'il y a dans la page",
      "CSS : dire à quoi ça ressemble",
      "JavaScript : dire comment ça réagit",
      "Git : enregistrer les versions et publier"
    ],
    "pasPour": [
      "Du CSS dans le HTML (`style=\"...\"`)",
      "Du JavaScript dans le HTML (`onclick=\"...\"`)",
      "Tous les fichiers en vrac à la racine du dossier"
    ],
    "fichiers": {
      "texte": "L'arborescence de base, valable pour presque tous les sites :",
      "arbre": "mon-site/\n├── index.html          # page d'accueil : nom obligatoire, à la racine\n├── css/\n│   └── style.css       # toute l'apparence\n├── js/\n│   ├── donnees.js      # les textes et listes affichés par le site\n│   └── app.js          # la logique : affichage, clics, navigation\n├── img/                # images (logo.webp, photo-equipe.jpg...)\n├── README.md           # présentation du projet\n└── .gitignore",
      "notes": [
        "Noms en minuscules, sans espace ni accent, mots séparés par des tirets : `page-contact.html`, pas `Page Contact.html`.",
        "Un seul dossier par projet. Les copies du type `site-v2-final` se remplacent par des commits Git.",
        "Les chemins sont relatifs au fichier qui les écrit : depuis `index.html`, on écrit `css/style.css`."
      ]
    },
    "demarrer": [
      "Créer le dossier du projet et l'arborescence ci-dessus (les fichiers peuvent être vides).",
      "Écrire le contenu dans `index.html` (page HTML), sans se soucier de l'apparence.",
      "Mettre en forme dans `css/style.css` (page CSS), en commençant par les variables de couleur.",
      "Ajouter le comportement dans `js/app.js` (page JavaScript), seulement si la page doit réagir.",
      "Enregistrer avec Git et publier sur GitHub Pages (page Git)."
    ]
  },
  "groups": [
    {
      "name": "Ranger ses fichiers",
      "cards": [
        {
          "t": "Petit site : l'arborescence de base",
          "d": "Suffisant pour un site vitrine, un devoir, un portfolio. Chaque type de fichier a son dossier, et index.html reste seul à la racine.",
          "code": "mon-site/\n├── index.html          # squelette de la page\n├── css/\n│   └── style.css       # toute la mise en forme\n├── js/\n│   ├── donnees.js      # tous les textes du site\n│   └── app.js          # affichage et navigation\n├── img/\n│   └── logo.png\n└── README.md"
        },
        {
          "t": "Gros projet : un dossier par domaine",
          "d": "Quand le JavaScript dépasse quelques fichiers (une boutique en ligne, par exemple), on ne range plus par type mais par sujet : tout ce qui concerne le catalogue ensemble, tout ce qui concerne le panier ensemble.",
          "code": "ma-boutique/\n├── index.html\n├── styles.css\n├── core/               # la base, utilisée partout\n│   ├── state.js        # l'état de l'application\n│   └── utils.js        # petites fonctions utiles\n├── catalogue/          # tout ce qui concerne les produits\n│   ├── filtres.js\n│   └── fiche-produit.js\n├── panier/             # tout ce qui concerne le panier\n│   ├── calcul-total.js\n│   └── panier-ui.js\n├── ui/                 # écrans, menus, fenêtres\n└── assets/\n    ├── icones/         # pictogrammes de l'interface\n    └── images/         # photos, classées par usage\n\n# Un fichier = un sujet. S'il dépasse 500 lignes, c'est qu'il en contient deux."
        },
        {
          "t": "Bien nommer ses fichiers",
          "d": "Un serveur web fait la différence entre majuscules et minuscules, contrairement à Windows : un nom mal écrit fonctionne sur votre PC puis casse une fois en ligne.",
          "code": "# BON\nindex.html\npage-contact.html\nimg/logo-accueil.png\njs/calcul-total.js\n\n# À ÉVITER\nPage Contact.html        # espace : devient %20 dans l'adresse\nPrésentation.html        # accent : problèmes d'encodage\nLogo.PNG                 # majuscules : \"logo.png\" ne sera pas trouvé en ligne\nscript(2)-final-v3.js    # utilisez Git pour les versions\n\n# Règles : minuscules, pas d'espace, pas d'accent, des tirets entre les mots,\n# et un nom qui dit ce que contient le fichier."
        },
        {
          "t": "Chemins relatifs",
          "d": "Un chemin se lit à partir du fichier dans lequel il est écrit, pas à partir de la racine du projet. C'est la cause numéro un des images et des styles qui « ne chargent pas ».",
          "code": "<!-- Depuis index.html (à la racine) -->\n<link rel=\"stylesheet\" href=\"css/style.css\">\n<img src=\"img/logo.png\" alt=\"Logo\">\n<a href=\"pages/contact.html\">Contact</a>\n\n<!-- Depuis pages/contact.html : ../ remonte d'un dossier -->\n<link rel=\"stylesheet\" href=\"../css/style.css\">\n<a href=\"../index.html\">Accueil</a>\n\n/* Depuis css/style.css : le chemin part du dossier css/ */\n.hero { background-image: url(\"../img/fond.jpg\"); }\n\n<!-- À ÉVITER : chemin absolu de votre ordinateur, cassé partout ailleurs -->\n<img src=\"C:/Users/moi/Desktop/site/img/logo.png\" alt=\"\">"
        }
      ]
    },
    {
      "name": "Relier les fichiers",
      "cards": [
        {
          "t": "Relier HTML, CSS et JavaScript",
          "d": "Le CSS se charge dans le <head> pour que la page soit mise en forme dès l'affichage. Le JavaScript se charge à la fin du <body>, quand tous les éléments existent.",
          "code": "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>Mon site</title>\n    <link rel=\"stylesheet\" href=\"css/style.css\">    <!-- CSS : dans le head -->\n</head>\n<body>\n    <main id=\"contenu\"></main>\n\n    <script src=\"js/app.js\"></script>               <!-- JS : en fin de body -->\n</body>\n</html>\n\n<!-- Variante : script dans le head avec defer (exécuté après le chargement)\n     <script src=\"js/app.js\" defer></script> -->"
        },
        {
          "t": "Plusieurs fichiers JS : l'ordre compte",
          "d": "Les scripts s'exécutent dans l'ordre où ils sont écrits. Un fichier ne peut utiliser que les variables et fonctions des fichiers chargés AVANT lui.",
          "code": "<!-- 1. La base : fonctions et données utilisées partout -->\n<script src=\"core/utils.js\"></script>\n<script src=\"core/state.js\"></script>\n\n<!-- 2. Les données -->\n<script src=\"js/donnees.js\"></script>\n\n<!-- 3. Ce qui utilise la base et les données -->\n<script src=\"panier/calcul-total.js\"></script>\n<script src=\"ui/screens.js\"></script>\n\n<!-- 4. En dernier : le fichier qui démarre tout -->\n<script src=\"js/app.js\"></script>\n\n<!-- Erreur \"xxx is not defined\" dans la console ?\n     Le fichier qui définit xxx est chargé trop tard (ou son chemin est faux). -->"
        },
        {
          "t": "Séparer les données de l'affichage",
          "d": "Les textes dans un fichier, le code qui les affiche dans un autre. Pour ajouter un élément au site, on modifie uniquement les données : aucun risque de casser le code.",
          "code": "// ----- js/donnees.js : uniquement des données -----\nconst produits = [\n    { nom: \"Stylo\", rayon: \"bureau\", texte: \"Encre bleue.\" },\n    { nom: \"Lampe\", rayon: \"maison\", texte: \"Ampoule fournie.\" }\n];\n\n// ----- js/app.js : uniquement de la logique -----\nfunction afficherProduits() {\n    document.getElementById(\"produits\").innerHTML = produits\n        .map((p) => `<article class=\"carte ${p.rayon}\">\n                         <h3>${p.nom}</h3>\n                         <p>${p.texte}</p>\n                     </article>`)\n        .join(\"\");\n}\nafficherProduits();\n\n// Ajouter un produit = ajouter une ligne dans donnees.js, rien d'autre."
        }
      ]
    },
    {
      "name": "Tester et mettre en ligne",
      "cards": [
        {
          "t": "Ouvrir le site sur son ordinateur",
          "d": "Le double-clic sur index.html suffit pour un site simple. Dès qu'on utilise fetch ou des modules JavaScript, il faut un petit serveur local.",
          "code": "# Méthode 1 : double-clic sur index.html\n#   l'adresse commence par file:///  — suffisant pour HTML + CSS + JS simple\n\n# Méthode 2 : serveur local (nécessaire pour fetch et import/export)\npython -m http.server 5500\n#   puis ouvrir http://localhost:5500\n\n# Méthode 3 : extension \"Live Server\" de VS Code\n#   clic droit sur index.html > Open with Live Server\n#   la page s'actualise toute seule à chaque enregistrement"
        },
        {
          "t": "Déboguer avec les outils du navigateur",
          "d": "F12 ouvre les outils de développement. Quatre onglets suffisent pour trouver presque tous les problèmes.",
          "code": "# Console    erreurs JavaScript, avec le fichier et la ligne en cause\n#            c'est aussi là que s'affichent les console.log()\n\n# Éléments   le HTML tel qu'il est vraiment, et le CSS appliqué à chaque\n#            élément (les règles barrées sont écrasées par une autre)\n\n# Réseau     les fichiers chargés ; une ligne rouge 404 = chemin faux\n\n# Appareil   (icône téléphone) simule un écran de mobile\n\n# Le site ne change pas après une modification ?\n#   Ctrl + F5 recharge en ignorant le cache du navigateur."
        },
        {
          "t": "Vérifications avant de publier",
          "d": "La liste des oublis classiques, à parcourir avant chaque mise en ligne.",
          "code": "<!-- Dans le <head> -->\n<html lang=\"fr\">                                   <!-- langue de la page -->\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>Titre clair et unique</title>\n<meta name=\"description\" content=\"Une phrase qui résume la page.\">\n<link rel=\"icon\" href=\"img/logo.png\" type=\"image/png\">\n\n<!-- Dans la page\n     [ ] chaque image a un attribut alt\n     [ ] un seul <h1>, puis des h2, h3 dans l'ordre\n     [ ] tous les liens fonctionnent (aucun 404 dans l'onglet Réseau)\n     [ ] aucune erreur dans la console\n     [ ] le site est utilisable à 375 px de large (téléphone)\n     [ ] on peut tout faire au clavier (Tab, Entrée, Échap)\n     [ ] le texte reste lisible : assez de contraste avec le fond -->"
        }
      ]
    }
  ]
};
