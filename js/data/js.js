// Fiches de référence : JavaScript
// Généré à partir du pense-bête — un objet par groupe de fiches.
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.js = {
  "id": "js",
  "label": "JavaScript",
  "color": "var(--js-color)",
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
    }
  ]
};
