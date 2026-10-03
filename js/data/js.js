// Fiches de référence : JavaScript
//
// Schéma : { id, label, color, groups: [ { name, cards: [ { t, d, code } ] } ] }
//   id/label/color → identifiant, nom et couleur de l'onglet (variable CSS
//                     définie dans css/style.css, ex. --js-color). Ce fichier
//                     est chargé sous le sous-onglet "JavaScript" de l'onglet
//                     groupé "Site Web" (voir NAV_RAW dans js/app.js).
//   groups[].name   → titre de section affiché (ex. "Bases")
//   cards[].t       → titre court de la fiche
//   cards[].d       → description en langage simple (affichée sous le titre)
//   cards[].code    → extrait affiché tel quel, avec ses propres commentaires //
// Pour ajouter une fiche : copier un objet du tableau "cards" d'un groupe et
// l'adapter. Pour ajouter une section : copier un objet du tableau "groups".
// Le champ "guide" (texte affiché en tête de page) est décrit dans js/data/web.js.
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.js = {
  "id": "js",
  "label": "JavaScript",
  "color": "var(--js-color)",
  "guide": {
    "resume": "Le comportement de la page : réagir aux clics, modifier le contenu, charger et enregistrer des données.",
    "role": "JavaScript est le seul vrai langage de programmation des trois. Il s'exécute dans le navigateur du visiteur et peut tout modifier après le chargement : afficher une fenêtre, filtrer une liste, changer de page sans recharger, sauvegarder une partie.\n\nLa démarche est toujours la même : on récupère un élément de la page, on écoute un évènement (clic, frappe au clavier), et on modifie la page en réponse. Un site peut très bien fonctionner sans JavaScript ; on l'ajoute quand la page doit réagir.",
    "pour": [
      "Réagir aux actions : clics, saisie, défilement",
      "Construire la page à partir de données (liste de rôles, de fiches, de produits)",
      "Onglets, fenêtres modales, recherche instantanée",
      "Sauvegarder dans le navigateur (localStorage), jeux par navigateur"
    ],
    "pasPour": [
      "La mise en forme (une classe CSS ajoutée en JS suffit)",
      "Le contenu fixe de la page (il doit être dans le HTML)",
      "Garder un secret : tout le code est visible par le visiteur"
    ],
    "fichiers": {
      "texte": "On sépare les données (les textes, les listes) de la logique (ce qui affiche et réagit). Pour changer un texte, on ne touche alors qu'au fichier de données.",
      "arbre": "js/\n├── donnees.js      # uniquement des données : const roles = [ {...}, {...} ];\n└── app.js          # la logique : affichage, clics, navigation\n\n<!-- Dans index.html, juste avant </body>, dans cet ordre : -->\n<script src=\"js/donnees.js\"></script>\n<script src=\"js/app.js\"></script>",
      "notes": [
        "L'ordre des balises `<script>` compte : un fichier ne peut utiliser que ce qui a été chargé avant lui.",
        "Placer les scripts en fin de `<body>` (ou ajouter `defer`) : sinon le code s'exécute avant que la page existe.",
        "Pour un gros projet, un dossier par domaine (voir « Organiser son site »)."
      ]
    },
    "demarrer": [
      "Créer `js/app.js` et le relier en fin de `<body>` avec `<script src=\"js/app.js\"></script>`.",
      "Y écrire `console.log(\"Bonjour\");` puis ouvrir la console du navigateur (F12 > Console) pour voir le message.",
      "La console affiche aussi les erreurs, avec le fichier et le numéro de ligne : c'est le premier endroit où regarder quand rien ne se passe.",
      "Utiliser `const` par défaut, `let` si la valeur change, jamais `var`."
    ]
  },
  "groups": [
    {
      "name": "Bases",
      "cards": [
        {
          "t": "Variables",
          "d": "Trois mots-clés pour créer une variable : let si sa valeur va changer plus tard, const si elle ne doit jamais changer, var à éviter (ancienne syntaxe, moins fiable).",
          "code": "let x = 10;        // peut être réaffectée plus tard\nconst y = 20;        // ne peut jamais être réaffectée\nvar z = 30;             // ancienne syntaxe, portée moins prévisible : à éviter\n\nx = 15;    // OK, x est une \"let\"\n// y = 25; // erreur : y est une \"const\""
        },
        {
          "t": "Fonctions",
          "d": "Un bloc de code réutilisable auquel on donne un nom. Deux façons de l'écrire : la déclaration classique, ou la version raccourcie \"fléchée\" (arrow function).",
          "code": "function addition(a, b) {     // déclaration classique\n    return a + b;\n}\n\nconst soustraction = (a, b) => a - b; // fonction fléchée : version courte\n\nconst multiplication = (a, b) => {\n    return a * b;                // accolades nécessaires sur plusieurs lignes\n};"
        },
        {
          "t": "Conditions & boucles",
          "d": "if exécute du code seulement si une condition est vraie ; for/while répètent un bloc. === compare la valeur ET le type, ce qui évite les surprises de conversion automatique.",
          "code": "if (x === 10) {          // === compare aussi le TYPE, recommandé\n    console.log(\"dix\");\n} else {\n    console.log(\"autre chose\");\n}\n\nfor (let i = 0; i < 5; i++) { console.log(i); }     // boucle classique\nfor (const item of [1, 2, 3]) { console.log(item); } // parcourt les valeurs\nwhile (x > 0) { x--; }"
        },
        {
          "t": "Portée des variables & closures",
          "d": "Une variable let/const n'existe que dans le bloc {} où elle est créée. Une closure, c'est quand une fonction \"garde en mémoire\" une variable de l'endroit où elle a été créée, même après.",
          "code": "if (true) {\n    let a = 1;\n    var b = 2;\n}\n// console.log(a); // erreur : a n'existe pas hors du bloc\nconsole.log(b);     // 2 : var ignore les blocs, seulement les fonctions (à éviter)\n\nfunction creerCompteur() {\n    let total = 0;             // \"enfermée\" dans la fonction retournée : c'est une closure\n    return function () {\n        total++;\n        return total;\n    };\n}\nconst compteur = creerCompteur();\ncompteur(); // 1\ncompteur(); // 2 : total a été conservé entre les appels"
        },
        {
          "t": "Destructuring & spread/rest",
          "d": "Le destructuring extrait rapidement des valeurs d'un tableau/objet dans des variables séparées ; les trois petits points (...) servent soit à étaler un tableau, soit à regrouper plusieurs arguments.",
          "code": "const [premier, second] = [\"a\", \"b\", \"c\"];   // destructuring de tableau -> \"a\", \"b\"\nconst { nom, age } = { nom: \"Alice\", age: 30 }; // destructuring d'objet\n\nconst liste = [1, 2, 3];\nconst copie = [...liste, 4];    // spread : étale les éléments -> [1, 2, 3, 4]\n\nfunction somme(...nombres) {     // rest : regroupe les arguments dans un tableau\n    return nombres.reduce((a, b) => a + b, 0);\n}\nsomme(1, 2, 3); // 6"
        }
      ]
    },
    {
      "name": "Données",
      "cards": [
        {
          "t": "Tableaux (arrays)",
          "d": "Une liste ordonnée de valeurs. Plutôt que d'écrire une boucle à la main, JavaScript propose des méthodes toutes prêtes pour transformer, filtrer ou parcourir cette liste.",
          "code": "const fruits = [\"pomme\", \"poire\", \"banane\"];\nfruits.push(\"kiwi\");            // ajoute un élément à la fin\nfruits.length;                     // nombre d'éléments actuel\n\nfruits.map(f => f.toUpperCase());     // nouvelle liste transformée (majuscules)\nfruits.filter(f => f.length > 5);       // ne garde que ce qui correspond au test\nfruits.forEach(f => console.log(f));      // exécute une action sur chaque élément"
        },
        {
          "t": "Objets",
          "d": "Une façon de regrouper plusieurs informations liées sous forme de paires nom -> valeur (comme une fiche), avec la possibilité d'y ajouter des actions (méthodes).",
          "code": "const personne = {\n    nom: \"Alice\",\n    age: 30,\n    saluer() {                            // méthode définie dans l'objet\n        console.log(\"Salut \" + this.nom);  // this = l'objet lui-même\n    }\n};\n\npersonne.age;         // accès avec le point -> 30\npersonne[\"nom\"];         // accès avec crochets, utile si la clé est une variable\npersonne.saluer();         // appelle la méthode -> affiche \"Salut Alice\""
        },
        {
          "t": "Classes",
          "d": "Un modèle qui décrit comment fabriquer des objets qui se ressemblent tous (même structure, mêmes actions possibles), un peu comme un moule.",
          "code": "class Personne {\n    constructor(nom, age) {   // appelé automatiquement à la création\n        this.nom = nom;\n        this.age = age;\n    }\n    sePresenter() {\n        return `Je m'appelle ${this.nom}`; // template literal : insère une variable\n    }\n}\n\nclass Etudiant extends Personne {   // héritage : réutilise Personne\n    constructor(nom, age, ecole) {\n        super(nom, age);              // appelle le constructeur de la classe parente\n        this.ecole = ecole;\n    }\n}\n\nconst e = new Etudiant(\"Bob\", 20, \"Lycée Langevin\");"
        },
        {
          "t": "Map & Set",
          "d": "Map est comme un objet mais accepte n'importe quel type de clé (pas seulement du texte) ; Set est une liste qui refuse automatiquement les valeurs en double.",
          "code": "const m = new Map();\nm.set(\"nom\", \"Alice\");   // ajoute/remplace une entrée\nm.get(\"nom\");              // \"Alice\"\nm.has(\"nom\");                // true : test de présence\n\nconst s = new Set([1, 2, 2, 3]); // doublons supprimés automatiquement -> {1, 2, 3}\ns.add(4);\ns.has(2);                          // true"
        }
      ]
    },
    {
      "name": "Le DOM & le réseau",
      "cards": [
        {
          "t": "Sélectionner des éléments",
          "d": "Le \"DOM\" est la représentation de la page HTML que JavaScript peut manipuler. Ces fonctions permettent de retrouver un ou plusieurs éléments précis dedans, pour agir dessus ensuite.",
          "code": "const titre = document.querySelector(\"h1\");        // 1er élément qui correspond\nconst tous = document.querySelectorAll(\".carte\");     // TOUS les éléments (liste)\nconst parId = document.getElementById(\"mon-id\");        // recherche par id"
        },
        {
          "t": "Modifier la page & événements",
          "d": "Une fois un élément sélectionné, on peut changer son texte ou son style ; addEventListener permet de faire réagir la page à une action de l'utilisateur (un clic, par exemple).",
          "code": "titre.textContent = \"Nouveau titre\";   // change le texte affiché\ntitre.style.color = \"blue\";              // modifie un style CSS directement\n\nconst bouton = document.querySelector(\"button\");\nbouton.addEventListener(\"click\", () => {   // exécutée à chaque clic\n    console.log(\"Bouton cliqué !\");\n});"
        },
        {
          "t": "fetch — requêtes réseau",
          "d": "Permet d'aller chercher des données sur un serveur distant (une API) sans recharger la page. \"Asynchrone\" veut dire que le reste du code continue de s'exécuter pendant que la réponse arrive.",
          "code": "fetch(\"https://api.exemple.fr/donnees\")\n    .then(reponse => reponse.json())        // convertit la réponse en objet JS\n    .then(donnees => console.log(donnees))\n    .catch(erreur => console.error(erreur));  // capture les erreurs réseau\n\n// version moderne, avec async/await (plus lisible)\nasync function charger() {\n    const reponse = await fetch(\"https://api.exemple.fr/donnees\");\n    const donnees = await reponse.json();\n    console.log(donnees);\n}"
        },
        {
          "t": "localStorage",
          "d": "Un petit espace de stockage directement dans le navigateur de l'utilisateur : les données restent enregistrées même après avoir fermé l'onglet ou éteint l'ordinateur.",
          "code": "localStorage.setItem(\"theme\", \"sombre\");   // enregistre une valeur (toujours en texte)\nconst theme = localStorage.getItem(\"theme\"); // relit la valeur -> \"sombre\"\nlocalStorage.removeItem(\"theme\");              // supprime cette entrée\n\n// Pour stocker un objet, il faut le convertir en texte JSON :\nlocalStorage.setItem(\"user\", JSON.stringify({ nom: \"Alice\" }));\nconst user = JSON.parse(localStorage.getItem(\"user\"));"
        }
      ]
    },
    {
      "name": "Erreurs fréquentes",
      "cards": [
        {
          "t": "== vs === et les conversions surprenantes",
          "d": "== essaie de convertir les deux valeurs pour qu'elles se ressemblent avant de comparer, ce qui donne des résultats étranges. === compare sans rien convertir : plus prévisible.",
          "code": "0 == \"0\";        // true  : \"0\" est converti en nombre 0\n0 == \"\";           // true  : \"\" convertie en 0 aussi !\nfalse == \"0\";        // true\nnull == undefined;      // true (cas particulier)\n\n0 === \"0\";        // false : type différent (number vs string), pas de conversion\n// Règle simple : utiliser === partout, sauf besoin très précis de =="
        },
        {
          "t": "undefined vs null",
          "d": "Deux façons différentes de dire \"il n'y a rien ici\", à ne pas confondre : undefined arrive TOUT SEUL (variable jamais définie), null est un choix VOLONTAIRE écrit dans le code.",
          "code": "let x;                  // undefined : déclarée mais jamais définie\nconsole.log(x);           // undefined\n\nlet y = null;              // null : \"vide\" volontairement assigné par le code\n\ntypeof undefined;             // \"undefined\"\ntypeof null;                    // \"object\" (bizarrerie historique du langage)\n\nx == null;    // true  (comparaison \"lâche\")\nx === null;    // false (comparaison stricte : types différents)"
        },
        {
          "t": "this qui change selon le contexte d'appel",
          "d": "this représente \"l'objet concerné\", mais sa valeur dépend de COMMENT la fonction est appelée, pas de l'endroit où elle est écrite dans le code : source de bugs classique.",
          "code": "const objet = {\n    nom: \"Alice\",\n    normale: function () { console.log(this.nom); },  // this = objet -> \"Alice\"\n    fleche: () => { console.log(this.nom); }             // this = contexte extérieur -> undefined\n};\nobjet.normale(); // \"Alice\"\nobjet.fleche();    // undefined : les arrow functions n'ont pas leur propre \"this\"\n\nconst f = objet.normale;\nf(); // undefined : appelée seule, this n'est plus \"objet\""
        },
        {
          "t": "Modifier un tableau/objet passé par référence",
          "d": "Copier un tableau ou un objet avec = ne crée PAS une vraie copie : les deux noms de variable pointent vers la même donnée en mémoire, donc modifier l'un modifie aussi l'autre.",
          "code": "const original = [1, 2, 3];\nconst copie = original;    // ATTENTION : ne copie pas, pointe vers le MÊME tableau\ncopie.push(4);\nconsole.log(original);       // [1, 2, 3, 4] : modifié aussi !\n\nconst vraieCopie = [...original]; // spread : crée un nouveau tableau indépendant\nvraieCopie.push(5);\nconsole.log(original);              // reste inchangé"
        }
      ]
    },
    {
      "name": "Recettes pour un vrai site",
      "cards": [
        {
          "t": "Générer du HTML à partir d'un tableau",
          "d": "Au lieu de recopier dix fois le même bloc HTML, on décrit les données dans un tableau et on laisse JavaScript fabriquer les blocs. Ajouter un élément au tableau suffit pour qu'il apparaisse.",
          "code": "const risques = [\n    { id: \"stress\", titre: \"Stress au travail\" },\n    { id: \"bruit\",  titre: \"Bruit\" }\n];\n\n// map() transforme chaque objet en morceau de HTML, join(\"\") colle le tout\nconst html = risques\n    .map((r) => `<a class=\"carte\" href=\"#${r.id}\">${r.titre}</a>`)\n    .join(\"\");\n\ndocument.getElementById(\"cartes\").innerHTML = html;\n\n// innerHTML interprète les balises : parfait pour VOS données.\n// Pour du texte saisi par un visiteur, utiliser textContent."
        },
        {
          "t": "Changer de vue selon l'adresse (hashchange)",
          "d": "Un site d'une seule page qui affiche des vues différentes selon l'ancre (#stress, #accueil). Chaque vue a sa propre adresse : on peut la partager, et le bouton Précédent du navigateur fonctionne.",
          "code": "// index.html#stress  ->  location.hash vaut \"#stress\"\nfunction afficherVue() {\n    const id = location.hash.slice(1);             // enlève le \"#\"\n    const page = pages.find((p) => p.id === id);\n    if (page) afficherPage(page);\n    else afficherAccueil();                        // ancre vide ou inconnue\n}\n\nwindow.addEventListener(\"hashchange\", afficherVue); // à chaque changement d'ancre\nafficherVue();                                      // et une fois au chargement\n\n// Dans le HTML, de simples liens suffisent : <a href=\"#stress\">Stress</a>"
        },
        {
          "t": "Onglets avec des attributs data-",
          "d": "Chaque bouton porte le nom de sa section dans un attribut data-onglet. Un seul écouteur gère tous les boutons, sans onclick dans le HTML.",
          "code": "// HTML : <nav id=\"onglets\">\n//            <button data-onglet=\"regles\">Règles</button>\n//            <button data-onglet=\"roles\">Rôles</button>\n//        </nav>\n//        <section id=\"regles\" class=\"onglet\">...</section>\n//        <section id=\"roles\" class=\"onglet\" hidden>...</section>\n\nfunction montrer(nom) {\n    document.querySelectorAll(\".onglet\").forEach((section) => {\n        section.hidden = section.id !== nom;       // cache tout sauf la section demandée\n    });\n    document.querySelectorAll(\"[data-onglet]\").forEach((bouton) => {\n        bouton.setAttribute(\"aria-selected\", bouton.dataset.onglet === nom);\n    });\n}\n\n// Un seul écouteur sur le parent (délégation d'évènement)\ndocument.getElementById(\"onglets\").addEventListener(\"click\", (e) => {\n    const bouton = e.target.closest(\"[data-onglet]\");\n    if (bouton) montrer(bouton.dataset.onglet);\n});"
        },
        {
          "t": "Fenêtre modale : ouvrir, fermer, touche Échap",
          "d": "Les trois façons attendues de fermer une fenêtre : le bouton, un clic sur le fond, la touche Échap. Le CSS correspondant est dans la fiche CSS « Fenêtre modale ».",
          "code": "const fond = document.getElementById(\"modale-fond\");\n\nfunction ouvrirModale(titre, texte) {\n    document.getElementById(\"modale-titre\").textContent = titre;\n    document.getElementById(\"modale-texte\").textContent = texte;\n    fond.classList.add(\"ouverte\");\n    document.body.style.overflow = \"hidden\";   // bloque le défilement derrière\n}\n\nfunction fermerModale() {\n    fond.classList.remove(\"ouverte\");\n    document.body.style.overflow = \"\";\n}\n\ndocument.getElementById(\"modale-fermer\").addEventListener(\"click\", fermerModale);\nfond.addEventListener(\"click\", (e) => {\n    if (e.target === fond) fermerModale();     // clic sur le fond, pas sur la boîte\n});\ndocument.addEventListener(\"keydown\", (e) => {\n    if (e.key === \"Escape\") fermerModale();\n});"
        },
        {
          "t": "Sauvegarder une partie (JSON + localStorage)",
          "d": "localStorage ne stocke que du texte : on convertit l'objet avec JSON.stringify pour l'enregistrer, et JSON.parse pour le relire. Le try/catch évite que le site plante si le stockage est plein ou bloqué.",
          "code": "const CLE = \"monJeu_sauvegarde_1\";\n\nfunction sauvegarder(partie) {\n    try {\n        localStorage.setItem(CLE, JSON.stringify(partie));   // objet -> texte\n    } catch (e) {\n        console.error(\"Sauvegarde impossible\", e);\n    }\n}\n\nfunction charger() {\n    try {\n        const brut = localStorage.getItem(CLE);\n        if (!brut) return null;                 // aucune sauvegarde\n        const data = JSON.parse(brut);          // texte -> objet\n        // Valeurs par défaut pour les champs ajoutés après coup :\n        // une ancienne sauvegarde ne les contient pas\n        data.argent = typeof data.argent === \"number\" ? data.argent : 100;\n        data.sac = data.sac || {};\n        return data;\n    } catch (e) {\n        return null;                            // sauvegarde illisible\n    }\n}\n\nsauvegarder({ equipe: [\"Pikachu\"], etage: 3, argent: 250, date: Date.now() });"
        },
        {
          "t": "Hasard : tirer et mélanger",
          "d": "Les trois besoins classiques d'un jeu : un élément au hasard, un tableau mélangé équitablement, un entier entre deux bornes.",
          "code": "// Un élément au hasard dans un tableau\nfunction auHasard(tab) {\n    return tab[Math.floor(Math.random() * tab.length)];\n}\n\n// Copie mélangée d'un tableau (algorithme de Fisher-Yates)\nfunction melanger(tab) {\n    const a = [...tab];                         // copie : l'original reste intact\n    for (let i = a.length - 1; i > 0; i--) {\n        const j = Math.floor(Math.random() * (i + 1));\n        [a[i], a[j]] = [a[j], a[i]];            // échange les cases i et j\n    }\n    return a;\n}\n\n// Entier entre min et max inclus\nconst entier = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;\n\n// À éviter : tab.sort(() => Math.random() - 0.5) ne mélange pas équitablement"
        },
        {
          "t": "Borner une valeur (clamp)",
          "d": "Empêche une valeur de sortir d'un intervalle : un volume entre 0 et 1, des points de vie entre 0 et le maximum.",
          "code": "const borner = (valeur, min, max) => Math.max(min, Math.min(max, valeur));\n\nborner(150, 0, 100);   // 100\nborner(-5, 0, 100);    // 0\nborner(42, 0, 100);    // 42\n\naudio.volume = borner(volume, 0, 1);\npv = borner(pv - degats, 0, pvMax);"
        },
        {
          "t": "Musique : attendre le premier clic",
          "d": "Les navigateurs refusent de lancer du son tant que le visiteur n'a pas interagi avec la page. On démarre donc la musique au premier clic, une seule fois.",
          "code": "const musique = new Audio(\"assets/audio/menu.mp3\");\nmusique.loop = true;\nmusique.volume = 0.4;\n\ndocument.addEventListener(\"click\", () => {\n    musique.play().catch(() => {});   // play() renvoie une promesse qui peut échouer\n}, { once: true });                   // l'écouteur se retire après le premier clic\n\n// Retenir le volume choisi d'une visite à l'autre\nfunction reglerVolume(v) {\n    musique.volume = v;\n    localStorage.setItem(\"volume\", String(v));\n}\nconst memorise = parseFloat(localStorage.getItem(\"volume\"));\nif (!isNaN(memorise)) musique.volume = memorise;"
        },
        {
          "t": "Copier un texte dans le presse-papiers",
          "d": "Un bouton « Copier » avec retour visuel. L'API ne fonctionne que sur un site en HTTPS ou en localhost.",
          "code": "bouton.addEventListener(\"click\", async () => {\n    try {\n        await navigator.clipboard.writeText(\"texte à copier\");\n        bouton.textContent = \"Copié\";\n        setTimeout(() => { bouton.textContent = \"Copier\"; }, 1400);\n    } catch (e) {\n        console.error(\"Copie impossible\", e);   // hors HTTPS ou permission refusée\n    }\n});"
        }
      ]
    }
  ]
};
