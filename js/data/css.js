// Fiches de référence : CSS
//
// Schéma : { id, label, color, groups: [ { name, cards: [ { t, d, code } ] } ] }
//   id/label/color → identifiant, nom et couleur de l'onglet (variable CSS
//                     définie dans css/style.css, ex. --css-color). Ce fichier
//                     est chargé sous le sous-onglet "CSS" de l'onglet groupé
//                     "Site Web" (voir NAV_RAW dans js/app.js).
//   groups[].name   → titre de section affiché (ex. "Lier & sélectionner")
//   cards[].t       → titre court de la fiche
//   cards[].d       → description en langage simple (affichée sous le titre)
//   cards[].code    → extrait affiché tel quel, avec ses propres commentaires //
// Pour ajouter une fiche : copier un objet du tableau "cards" d'un groupe et
// l'adapter. Pour ajouter une section : copier un objet du tableau "groups".
// Le champ "guide" (texte affiché en tête de page) est décrit dans js/data/web.js.
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.css = {
  "id": "css",
  "label": "CSS",
  "color": "var(--css-color)",
  "guide": {
    "resume": "L'apparence de la page : couleurs, polices, espacements, mise en page, adaptation au mobile.",
    "role": "Le CSS décide de l'allure de chaque élément HTML. Une règle se lit toujours de la même façon : un sélecteur (à qui ça s'applique), puis des propriétés (ce qu'on change). Le même fichier CSS s'applique à toutes les pages du site : changer une couleur à un seul endroit la change partout.\n\nCe n'est pas non plus un langage de programmation, mais il fait de plus en plus de choses seul : animations, thème sombre, mise en page qui s'adapte à la taille de l'écran.",
    "pour": [
      "Couleurs, polices, tailles, espacements",
      "Mise en page avec Flexbox et Grid",
      "Adapter le site au mobile (media queries)",
      "Animations et transitions simples, thème clair / sombre"
    ],
    "pasPour": [
      "Ajouter du contenu (il doit être dans le HTML)",
      "Mémoriser un choix de l'utilisateur ou faire un calcul complexe (JavaScript)",
      "Remplacer une structure HTML bancale"
    ],
    "fichiers": {
      "texte": "Un seul fichier `css/style.css` suffit pour la plupart des sites. L'important est l'ordre à l'intérieur, toujours du plus général au plus précis :",
      "arbre": "css/style.css\n├── 1. Variables        # :root { --couleur-fond: ...; } couleurs, polices, rayons\n├── 2. Base             # body, titres, liens : les réglages par défaut\n├── 3. Mise en page     # en-tête, navigation, grille principale, pied de page\n├── 4. Composants       # cartes, boutons, formulaires, fenêtre modale\n└── 5. Petits écrans    # @media (max-width: ...) : toujours à la fin",
      "notes": [
        "Un commentaire-titre par section (`/* ---------- Cartes ---------- */`) permet de s'y retrouver avec Ctrl + F.",
        "Toutes les couleurs dans des variables : aucune valeur `#3ddc97` recopiée au milieu du fichier.",
        "Des noms de classe qui disent ce que c'est (`.carte`, `.bouton-principal`), pas à quoi ça ressemble (`.bleu`, `.gros`)."
      ]
    },
    "demarrer": [
      "Créer `css/style.css` et le relier dans le `<head>` (fiche « Lier une feuille de style »).",
      "Commencer par `* { box-sizing: border-box; }` et les variables de couleur.",
      "Régler le `body` (police, couleur, fond), puis descendre élément par élément.",
      "Tester en réduisant la fenêtre : F12, puis l'icône de téléphone, simule un écran de mobile."
    ]
  },
  "groups": [
    {
      "name": "Lier & sélectionner",
      "cards": [
        {
          "t": "Lier une feuille de style",
          "d": "Trois façons de connecter du CSS à une page HTML : dans un fichier séparé (la plus propre), dans une balise <style>, ou directement sur un élément (à réserver aux tests rapides).",
          "code": "<link rel=\"stylesheet\" href=\"style.css\">   <!-- externe : fichier séparé, recommandé -->\n\n<style>\n    p { color: red; }                        /* interne : à l'intérieur de <head> */\n</style>\n\n<p style=\"color: red;\">Texte</p>             <!-- en ligne : à éviter, dur à maintenir -->"
        },
        {
          "t": "Sélecteurs",
          "d": "Un sélecteur, c'est la partie AVANT les accolades { } : il dit à quels éléments de la page le style qui suit va s'appliquer.",
          "code": "p { }              /* tous les <p> */\n.classe { }          /* tous les éléments avec class=\"classe\" */\n#id { }                /* l'élément unique avec id=\"id\" */\n\ndiv p { }                 /* les <p> descendants d'un <div>, à tout niveau */\ndiv > p { }                  /* les <p> enfants DIRECTS d'un <div> */\n\na:hover { }                     /* un lien quand la souris passe dessus */\np:first-child { }                  /* un <p> qui est le premier enfant de son parent */\ninput:focus { }                       /* un champ actuellement sélectionné */"
        },
        {
          "t": "Pseudo-éléments",
          "d": "Permettent de cibler une petite partie d'un élément (juste sa première ligne) ou d'ajouter du texte/contenu sans le taper dans le HTML.",
          "code": "p::first-line { font-weight: bold; }  /* seulement la première ligne du paragraphe */\n\n.citation::before {\n    content: \"« \";       /* insère du texte AVANT le contenu réel */\n}\n.citation::after {\n    content: \" »\";        /* insère du texte APRÈS le contenu réel */\n}\n/* content est obligatoire pour que ::before/::after s'affichent, même vide \"\" */"
        },
        {
          "t": "Spécificité & cascade",
          "d": "Quand deux règles CSS ciblent le même élément avec des valeurs différentes, ce n'est pas forcément la dernière écrite qui gagne : c'est la plus \"précise\" (id > classe > élément).",
          "code": "/* du moins au plus prioritaire : */\np { color: blue; }            /* élément : poids 1 */\n.texte { color: green; }        /* classe : poids 10 */\n#titre { color: red; }            /* id : poids 100 */\nstyle=\"color: orange\"               /* en ligne : poids 1000 */\n\np { color: purple !important; } /* !important : passe devant tout le reste, à éviter */\n\n/* À égalité de spécificité, la règle déclarée EN DERNIER dans le fichier gagne. */"
        }
      ]
    },
    {
      "name": "Mise en page",
      "cards": [
        {
          "t": "Box model",
          "d": "Chaque élément HTML est en réalité une boîte rectangulaire invisible, faite de 4 couches empilées : le contenu, l'espace autour (padding), la bordure, puis l'espace extérieur (margin).",
          "code": ".boite {\n    width: 200px;             /* largeur du contenu */\n    padding: 16px;             /* espace intérieur, entre le contenu et la bordure */\n    border: 1px solid #333;      /* bordure, autour du padding */\n    margin: 12px;                  /* espace extérieur, entre la boîte et ses voisines */\n    box-sizing: border-box;           /* padding + bordure inclus DANS les 200px de largeur */\n}"
        },
        {
          "t": "Flexbox",
          "d": "Un mode d'affichage pensé pour aligner des éléments sur une seule ligne (ou une seule colonne) et répartir l'espace entre eux automatiquement.",
          "code": ".conteneur {\n    display: flex;                /* active flexbox pour les enfants directs */\n    flex-direction: row;           /* row = en ligne (défaut) ; column = empilés */\n    justify-content: center;        /* alignement sur l'axe principal (horizontal ici) */\n    align-items: center;              /* alignement sur l'axe secondaire (vertical ici) */\n    gap: 12px;                           /* espace entre chaque élément */\n}\n.enfant {\n    flex: 1;                    /* grandit pour occuper l'espace disponible */\n}"
        },
        {
          "t": "Grid",
          "d": "Un mode d'affichage en grille, avec des lignes ET des colonnes en même temps : plus adapté que flexbox pour une mise en page en deux dimensions.",
          "code": ".grille {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr); /* 3 colonnes de largeur égale */\n    gap: 16px;                                /* espace entre les cases */\n}\n.item {\n    grid-column: span 2;    /* cet élément occupe 2 colonnes au lieu d'une */\n}"
        },
        {
          "t": "Media queries",
          "d": "Applique un style DIFFÉRENT selon la taille de l'écran, pour qu'une page s'adapte automatiquement entre ordinateur et mobile (le \"responsive design\").",
          "code": ".carte { width: 300px; }\n\n@media (max-width: 600px) {   /* s'applique seulement si l'écran fait ≤ 600px */\n    .carte {\n        width: 100%;            /* la carte prend toute la largeur sur mobile */\n    }\n}"
        },
        {
          "t": "Position",
          "d": "Change la façon dont un élément se place sur la page : suit-il le flux normal, ou est-il détaché pour être placé à un endroit précis ?",
          "code": "position: static;    /* par défaut : suit le flux normal, top/left ignorés */\nposition: relative;    /* décalé par rapport à SA position normale, garde sa place */\nposition: absolute;      /* sorti du flux, positionné par rapport au parent \"relative\" le plus proche */\nposition: fixed;           /* positionné par rapport à la FENÊTRE, reste visible au scroll */\nposition: sticky;            /* \"colle\" à un endroit en scrollant, jusqu'à une limite */\n\n.popup {\n    position: absolute;\n    top: 10px; right: 10px;  /* nécessite un parent en position: relative pour se repérer */\n}"
        }
      ]
    },
    {
      "name": "Apparence & effets",
      "cards": [
        {
          "t": "Couleurs & unités",
          "d": "Il existe plusieurs façons d'écrire une même couleur, et plusieurs façons d'exprimer une taille : fixe (en pixels) ou relative (en % ou par rapport à la fenêtre).",
          "code": "color: red;                     /* mot-clé */\ncolor: #ff0000;                   /* hexadécimal (rouge) */\ncolor: rgb(255, 0, 0);               /* rouge, vert, bleu, de 0 à 255 */\ncolor: rgba(255, 0, 0, 0.5);            /* comme rgb, + transparence de 0 à 1 */\n\nwidth: 100px;    /* pixels : taille fixe */\nwidth: 50%;        /* relatif à la largeur du parent */\nwidth: 2rem;          /* relatif à la taille de police de la racine (html) */\nwidth: 100vw;            /* relatif à la largeur de la fenêtre (viewport) */"
        },
        {
          "t": "Transitions & animations",
          "d": "transition rend un changement de style progressif au lieu d'instantané (par exemple au survol) ; animation va plus loin en enchaînant plusieurs étapes définies à l'avance.",
          "code": ".bouton {\n    transition: background-color 0.3s ease; /* anime le changement sur 0.3s */\n}\n.bouton:hover {\n    background-color: darkblue;                /* déclenche l'animation au survol */\n}\n\n@keyframes apparition {\n    from { opacity: 0; }   /* état de départ */\n    to   { opacity: 1; }     /* état d'arrivée */\n}\n.element {\n    animation: apparition 1s ease-in; /* joue l'animation à l'affichage de l'élément */\n}"
        },
        {
          "t": "Variables CSS (custom properties)",
          "d": "Donner un nom à une valeur (une couleur, une taille) pour la réutiliser partout dans le fichier, et pouvoir la changer d'un seul coup à un seul endroit.",
          "code": ":root {\n    --couleur-principale: #3457d5; /* déclarée une fois, sur :root pour toute la page */\n    --espacement: 16px;\n}\n\n.bouton {\n    background: var(--couleur-principale); /* utilise la variable */\n    padding: var(--espacement);\n}\n.bouton:hover {\n    background: var(--couleur-secours, gray); /* gray = valeur de repli si la variable n'existe pas */\n}"
        }
      ]
    },
    {
      "name": "Erreurs fréquentes",
      "cards": [
        {
          "t": "Oublier box-sizing: border-box",
          "d": "Par défaut, le padding et la bordure s'AJOUTENT à la largeur qu'on a définie, ce qui donne une boîte plus grande que prévu : une source de confusion très fréquente en début d'apprentissage.",
          "code": "/* Par défaut (content-box) : */\n.boite { width: 200px; padding: 20px; } /* largeur RÉELLE affichée : 240px ! */\n\n/* Avec border-box, la largeur définie inclut padding + bordure : */\n* { box-sizing: border-box; }             /* astuce très courante : l'appliquer à tout */\n.boite { width: 200px; padding: 20px; }   /* largeur réelle : bien 200px */"
        },
        {
          "t": "z-index qui ne fait rien",
          "d": "z-index décide quel élément passe devant un autre quand ils se chevauchent, mais il ne fonctionne QUE si l'élément a un \"position\" différent de la valeur par défaut (static).",
          "code": ".popup {\n    z-index: 999;    /* ne sert à RIEN tant que position est \"static\" (valeur par défaut) */\n}\n\n.popup {\n    position: relative; /* ou absolute/fixed/sticky */\n    z-index: 999;          /* fonctionne maintenant : passe devant les autres éléments */\n}"
        },
        {
          "t": "Centrer un élément : les bons réflexes",
          "d": "\"Centrer une div\" est une blague récurrente chez les développeurs tant ça a longtemps été pénible ; avec flexbox, c'est aujourd'hui devenu simple.",
          "code": "/* Centrer horizontalement UN bloc de largeur fixe */\n.bloc { width: 300px; margin: 0 auto; }\n\n/* Centrer horizontalement ET verticalement le contenu d'un conteneur */\n.conteneur {\n    display: flex;\n    justify-content: center; /* axe horizontal */\n    align-items: center;       /* axe vertical */\n    min-height: 100vh;           /* pour avoir de la hauteur à centrer dedans */\n}"
        }
      ]
    },
    {
      "name": "Recettes de mise en page",
      "cards": [
        {
          "t": "Thème clair / sombre avec des variables",
          "d": "Les couleurs sont déclarées une fois en variables ; le thème sombre ne fait que redéfinir ces variables. Aucune autre règle du fichier n'a besoin de changer.",
          "code": ":root {\n    --fond: #ffffff;\n    --texte: #1b1c1e;\n    --bordure: #e3e3df;\n    --accent: #15803d;\n}\n\n/* Le système est réglé en sombre : mêmes variables, autres valeurs */\n@media (prefers-color-scheme: dark) {\n    :root {\n        --fond: #0f1113;\n        --texte: #e7e7e4;\n        --bordure: #272b30;\n        --accent: #4ade80;\n    }\n}\n\n/* Le reste du fichier n'utilise QUE les variables */\nbody  { background: var(--fond); color: var(--texte); }\n.carte { border: 1px solid var(--bordure); }\na     { color: var(--accent); }"
        },
        {
          "t": "Grille de cartes qui s'adapte seule",
          "d": "Autant de colonnes que la largeur le permet, sans aucune media query : trois colonnes sur grand écran, une seule sur téléphone.",
          "code": ".cartes {\n    display: grid;\n    /* autant de colonnes de 280px minimum que possible,\n       qui se partagent ensuite la place restante (1fr) */\n    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n    gap: 16px;\n}\n\n/* Pour imposer exactement 2 colonnes, puis 1 sur mobile : */\n.grille-deux { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }\n@media (max-width: 640px) {\n    .grille-deux { grid-template-columns: 1fr; }\n}"
        },
        {
          "t": "Barre qui reste en haut (sticky)",
          "d": "L'élément défile normalement, puis se colle en haut de l'écran quand il l'atteint. Contrairement à fixed, il garde sa place dans la page.",
          "code": ".navigation {\n    position: sticky;\n    top: 0;              /* obligatoire : distance à laquelle il se colle */\n    z-index: 10;         /* passe au-dessus du contenu qui défile */\n    background: var(--fond);   /* sinon le contenu se voit à travers */\n}\n\n/* Ne fonctionne pas ? Un parent a sûrement overflow: hidden ou auto. */\n\n/* Évite que les titres visés par une ancre soient cachés sous la barre */\nhtml { scroll-padding-top: 72px; }"
        },
        {
          "t": "Contour de focus visible",
          "d": ":focus-visible affiche le contour pour la navigation au clavier (Tab), mais pas après un clic de souris. Ne jamais écrire outline: none sans le remplacer.",
          "code": "/* Un seul style pour tous les éléments interactifs */\n:focus-visible {\n    outline: 2px solid var(--accent);\n    outline-offset: 2px;       /* petit espace entre l'élément et le contour */\n}\n\n/* À NE PAS FAIRE : les utilisateurs au clavier ne voient plus où ils sont */\nbutton:focus { outline: none; }"
        },
        {
          "t": "Respecter « réduire les animations »",
          "d": "Certaines personnes désactivent les animations dans leur système (mal des transports, troubles de l'attention). Ce bloc, placé en fin de fichier, coupe celles du site pour elles.",
          "code": "@media (prefers-reduced-motion: reduce) {\n    *, *::before, *::after {\n        animation-duration: 0.01ms !important;\n        transition-duration: 0.01ms !important;\n        scroll-behavior: auto !important;\n    }\n}\n\n/* Défilement doux seulement pour ceux qui n'ont rien désactivé */\n@media (prefers-reduced-motion: no-preference) {\n    html { scroll-behavior: smooth; }\n}"
        },
        {
          "t": "Fenêtre modale : fond et boîte centrée",
          "d": "Un fond semi-transparent qui couvre tout l'écran, et une boîte centrée dedans. JavaScript ne fait qu'ajouter ou retirer la classe .ouverte (voir la fiche JavaScript correspondante).",
          "code": ".modale-fond {\n    position: fixed;\n    inset: 0;                         /* top, right, bottom, left à 0 */\n    background: rgba(0, 0, 0, 0.6);\n    display: none;\n    place-items: center;              /* centre la boîte dans les deux sens */\n    padding: 16px;\n    z-index: 100;\n}\n.modale-fond.ouverte { display: grid; }\n\n.modale-boite {\n    width: min(480px, 100%);          /* 480px, ou moins sur petit écran */\n    max-height: 90vh;\n    overflow-y: auto;                 /* défile si le contenu est trop long */\n    background: var(--fond);\n    border-radius: 8px;\n    padding: 24px;\n}"
        },
        {
          "t": "Zone cliquable assez grande",
          "d": "Sur téléphone, un doigt a besoin d'environ 44 px. Un lien ou un bouton trop petit est difficile à toucher, même s'il paraît correct à la souris.",
          "code": ".bouton, nav a {\n    min-height: 44px;\n    padding: 10px 16px;\n    display: inline-flex;\n    align-items: center;      /* centre le texte verticalement */\n    gap: 8px;                 /* espace entre icône et texte */\n    cursor: pointer;\n}\n\n/* Retour visuel au survol ET à l'appui */\n.bouton { transition: background 0.15s; }\n.bouton:hover  { background: var(--fond-survol); }\n.bouton:active { background: var(--fond-appui); }"
        }
      ]
    }
  ]
};
