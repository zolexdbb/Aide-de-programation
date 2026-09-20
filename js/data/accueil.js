// Page d'accueil : une présentation conviviale de chaque langage du site.
// Schéma volontairement différent des autres fiches (pas de "groups"/"cards"
// à copier, mais une liste "intros") :
//   target → id du langage vers lequel pointe le bouton "En savoir plus"
//            (doit correspondre à l'id d'un fichier js/data/*.js)
//   emoji  → icône affichée en haut de la carte
//   label  → nom du langage affiché
//   color  → variable CSS de couleur du langage (voir css/style.css), reprise
//            pour la bande du haut, l'icône, le sous-titre et le bouton
//   tag    → sous-titre court en italique, sous le nom
//   text   → paragraphe de présentation
//   badge  → (optionnel) petite étiquette, utilisée pour signaler que ce
//            langage est un sous-onglet de "Site Web" (html/css/js)
// Pour ajouter un langage à l'accueil : copier un objet de ce tableau.
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.accueil = {
  "id": "accueil",
  "label": "Accueil",
  "color": "var(--accueil-color)",
  "intros": [
    {
      "target": "c",
      "emoji": "⚙️",
      "label": "C",
      "color": "var(--c-color)",
      "tag": "Le vétéran increvable",
      "text": "Né en 1972, toujours utilisé pour piloter des systèmes d'exploitation, des fusées et des objets connectés. Aucun filet de sécurité : une variable mal gérée et c'est le fameux \"segmentation fault\". Un vrai rite de passage pour comprendre ce qui se cache sous le capot de (presque) tous les autres langages."
    },
    {
      "target": "cpp",
      "emoji": "🧩",
      "label": "C++",
      "color": "var(--cpp-color)",
      "tag": "Le C, en plus musclé (et plus compliqué)",
      "text": "Tout ce que fait le C, plus les classes, les templates, et une bonne dizaine de façons élégantes de se tirer une balle dans le pied. On le retrouve dans les jeux vidéo, les moteurs 3D et partout où la performance compte plus que la tranquillité d'esprit du développeur."
    },
    {
      "target": "arduino",
      "emoji": "🔌",
      "label": "Arduino",
      "color": "var(--arduino-color)",
      "tag": "Du code qui clignote une LED, pour de vrai",
      "text": "En coulisses, c'est du C/C++ simplifié pour piloter des microcontrôleurs : LEDs, moteurs, capteurs... Sans doute le langage le plus gratifiant qui soit : au bout de cinq lignes de code, un vrai objet s'allume sur votre bureau."
    },
    {
      "target": "html",
      "emoji": "📄",
      "label": "HTML",
      "color": "var(--html-color)",
      "tag": "Le squelette de toutes les pages web",
      "text": "Ce n'est pas vraiment un langage de programmation (pas de calculs, pas de boucles), plutôt une façon de structurer le contenu d'une page. Sans lui, pas de site web du tout — même le pire site en Comic Sans commence par du HTML.",
      "badge": "Regroupé dans l'onglet Site Web"
    },
    {
      "target": "css",
      "emoji": "🎨",
      "label": "CSS",
      "color": "var(--css-color)",
      "tag": "Celui qui rend tout ça joli (ou pas)",
      "text": "S'occupe des couleurs, des espacements et de la mise en page. Capable de transformer une page austère en interface élégante — ou de vous faire perdre trois heures à essayer de centrer une div verticalement.",
      "badge": "Regroupé dans l'onglet Site Web"
    },
    {
      "target": "js",
      "emoji": "⚡",
      "label": "JavaScript",
      "color": "var(--js-color)",
      "tag": "Le langage qui rend le web vivant",
      "text": "Le seul langage qui tourne nativement dans (presque) tous les navigateurs. Il sert à faire réagir une page à un clic, récupérer des données sans recharger la page, ou empiler les frameworks à un rythme qui donne le vertige.",
      "badge": "Regroupé dans l'onglet Site Web"
    },
    {
      "target": "python",
      "emoji": "🐍",
      "label": "Python",
      "color": "var(--python-color)",
      "tag": "Celui qu'on recommande à tout le monde",
      "text": "Syntaxe proche de l'anglais, indentation obligatoire, une bibliothèque pour à peu près tout (calcul scientifique, intelligence artificielle, scripts, sites web...). Souvent le premier langage qu'on apprend — et celui qu'on garde sous le coude toute sa carrière."
    },
    {
      "target": "git",
      "emoji": "🌳",
      "label": "Git",
      "color": "var(--git-color)",
      "tag": "Pas un langage, mais totalement indispensable",
      "text": "Le système qui garde l'historique de chaque modification de votre code, permet de revenir en arrière et de travailler à plusieurs sans (trop) se marcher dessus. On le maîtrise vraiment après avoir paniqué une première fois devant un conflit de fusion."
    }
  ]
};
