// Page d'accueil : texte d'introduction, parcours conseillés et présentation
// de chaque page du site. Schéma différent des autres fichiers (pas de fiches) :
//   lead      → paragraphe d'introduction sous le titre
//   parcours  → suggestions d'ordre de lecture
//       titre, texte → ce que la personne veut faire
//       etapes       → id des pages à lire, dans l'ordre
//   intros    → une carte par page
//       target → id de la page (doit correspondre à un fichier js/data/*.js)
//       tag    → phrase d'accroche
//       text   → paragraphe de présentation
// Pour ajouter une page à l'accueil : copier un objet du tableau "intros".
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.accueil = {
  "id": "accueil",
  "label": "Accueil",
  "color": "var(--accueil-color)",
  "lead": "Ce n'est pas parce qu'on code depuis 15 ans qu'on se souvient de la syntaxe exacte d'un `printf` un lundi matin. Voici le pense-bête à garder ouvert dans un coin : la syntaxe expliquée ligne par ligne, les pièges classiques, et pour chaque langage un guide qui dit à quoi il sert vraiment et comment ranger ses fichiers.",
  "parcours": [
    {
      "titre": "Je veux créer un site web",
      "texte": "Commencez par l'organisation des fichiers, puis le contenu, l'apparence et enfin le comportement. Git sert à sauvegarder et à mettre en ligne.",
      "etapes": ["web", "html", "css", "js", "git"]
    },
    {
      "titre": "Je veux programmer une carte électronique",
      "texte": "Arduino permet d'obtenir un résultat tout de suite. Le C et le C++ expliquent ensuite ce qui se passe réellement derrière.",
      "etapes": ["arduino", "c", "cpp"]
    },
    {
      "titre": "Je n'ai jamais programmé",
      "texte": "Python est le plus lisible pour apprendre les variables, les boucles et les fonctions. Ces notions se retrouvent ensuite dans tous les autres langages.",
      "etapes": ["python", "git", "markdown"]
    }
  ],
  "intros": [
    {
      "target": "c",
      "tag": "Le vétéran increvable",
      "text": "Né en 1972, toujours utilisé pour piloter des systèmes d'exploitation, des fusées et des objets connectés. Aucun filet de sécurité : une variable mal gérée et c'est le fameux \"segmentation fault\". Un vrai rite de passage pour comprendre ce qui se cache sous le capot de (presque) tous les autres langages."
    },
    {
      "target": "cpp",
      "tag": "Le C, en plus musclé (et plus compliqué)",
      "text": "Tout ce que fait le C, plus les classes, les templates, et une bonne dizaine de façons élégantes de se tirer une balle dans le pied. On le retrouve dans les jeux vidéo, les moteurs 3D et partout où la performance compte plus que la tranquillité d'esprit du développeur."
    },
    {
      "target": "arduino",
      "tag": "Du code qui clignote une LED, pour de vrai",
      "text": "En coulisses, c'est du C/C++ simplifié pour piloter des microcontrôleurs : LEDs, moteurs, capteurs... Sans doute le langage le plus gratifiant qui soit : au bout de cinq lignes de code, un vrai objet s'allume sur votre bureau."
    },
    {
      "target": "python",
      "tag": "Celui qu'on recommande à tout le monde",
      "text": "Syntaxe proche de l'anglais, indentation obligatoire, une bibliothèque pour à peu près tout (calcul scientifique, intelligence artificielle, scripts, sites web...). Souvent le premier langage qu'on apprend — et celui qu'on garde sous le coude toute sa carrière."
    },
    {
      "target": "web",
      "tag": "Avant d'écrire la première balise",
      "text": "Où mettre ses fichiers, comment les nommer, comment relier le HTML, le CSS et le JavaScript, comment tester sur son ordinateur puis mettre le site en ligne. Les questions qu'on se pose toujours trop tard, quand le dossier est déjà en désordre."
    },
    {
      "target": "html",
      "tag": "Le squelette de toutes les pages web",
      "text": "Ce n'est pas vraiment un langage de programmation (pas de calculs, pas de boucles), plutôt une façon de structurer le contenu d'une page. Sans lui, pas de site web du tout — même le pire site en Comic Sans commence par du HTML."
    },
    {
      "target": "css",
      "tag": "Celui qui rend tout ça joli (ou pas)",
      "text": "S'occupe des couleurs, des espacements et de la mise en page. Capable de transformer une page austère en interface élégante — ou de vous faire perdre trois heures à essayer de centrer une div verticalement."
    },
    {
      "target": "js",
      "tag": "Le langage qui rend le web vivant",
      "text": "Le seul langage qui tourne nativement dans (presque) tous les navigateurs. Il sert à faire réagir une page à un clic, récupérer des données sans recharger la page, ou empiler les frameworks à un rythme qui donne le vertige."
    },
    {
      "target": "git",
      "tag": "Pas un langage, mais totalement indispensable",
      "text": "Le système qui garde l'historique de chaque modification de votre code, permet de revenir en arrière et de travailler à plusieurs sans (trop) se marcher dessus. On le maîtrise vraiment après avoir paniqué une première fois devant un conflit de fusion."
    },
    {
      "target": "markdown",
      "tag": "Du texte brut qui se met en forme tout seul",
      "text": "Quelques symboles (#, *, -) suffisent pour obtenir des titres, des listes et des tableaux. C'est le format des fichiers README sur GitHub, des messages Discord et de la plupart des documentations : dix minutes pour l'apprendre, des années à s'en servir."
    },
    {
      "target": "json",
      "tag": "Des accolades pour ranger des données",
      "text": "Le format texte que tous les langages savent lire : des clés, des valeurs, des listes. C'est sous cette forme que les sites enregistrent leurs données et parlent aux bases de données — à condition de bien les ranger et de vérifier ce qu'on y écrit."
    }
  ]
};
