// Fiches de référence : CSS
// Généré à partir du pense-bête — un objet par groupe de fiches.
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.css = {
  "id": "css",
  "label": "CSS",
  "color": "var(--css-color)",
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
    }
  ]
};
