// Fiches de référence : JSON et bases de données
//
// Schéma : { id, label, color, guide, groups: [ { name, cards: [ { t, d, code } ] } ] }
//   guide           → texte affiché en tête de page (champs décrits dans js/data/web.js)
//   groups[].name   → titre de section affiché (ex. "Écrire du JSON")
//   cards[].t       → titre court de la fiche
//   cards[].d       → description en langage simple (affichée sous le titre)
//   cards[].code    → extrait affiché tel quel, avec ses propres commentaires //
// Pour ajouter une fiche : copier un objet du tableau "cards" d'un groupe et
// l'adapter. Pour ajouter une section : copier un objet du tableau "groups".
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.json = {
  "id": "json",
  "label": "JSON et bases de données",
  "color": "var(--json-color)",
  "guide": {
    "resume": "Le format texte qui sert à ranger et à échanger des données : accolades, guillemets, et rien d'autre. C'est sous cette forme que les sites parlent aux bases de données.",
    "role": "JSON n'est pas un langage de programmation : c'est une façon d'écrire des données sous forme de texte. Un objet entre accolades, des paires `\"clé\": valeur`, des listes entre crochets. N'importe quel langage sait le lire et l'écrire, ce qui en fait le format d'échange universel.\n\nUne **base de données** garde ces données de façon durable et partagée : comptes, articles, commandes, messages. Le site ne lit pas la base directement : il envoie une demande à une adresse (une **API**), qui répond en JSON. Certaines bases, dites « orientées documents », stockent même directement des objets JSON.\n\nBien ranger ses données compte plus que le code qui les affiche : un identifiant unique par élément, des noms de champs clairs, et jamais deux fois la même information à deux endroits.",
    "pour": [
      "Enregistrer des données structurées dans un fichier ou dans le navigateur",
      "Échanger des données entre un site et un serveur",
      "Décrire le contenu d'une base : utilisateurs, articles, commandes",
      "Écrire des fichiers de configuration"
    ],
    "pasPour": [
      "Des calculs ou de la logique : JSON ne contient que des données",
      "Des commentaires : le format n'en prévoit pas",
      "Des images ou des sons : on enregistre leur adresse, pas le fichier",
      "Des mots de passe ou des clés secrètes dans un fichier public"
    ],
    "fichiers": {
      "texte": "Les données dans des fichiers `.json`, et un seul fichier JavaScript chargé de les lire et de les écrire :",
      "arbre": "mon-site/\n├── index.html\n├── data/\n│   └── produits.json   # des données lues par le site\n└── js/\n    ├── api.js          # toutes les lectures et écritures\n    └── app.js          # l'affichage, qui appelle api.js",
      "notes": [
        "Regrouper les lectures et écritures dans un seul fichier : le reste du site appelle `lireProduits()` sans savoir d'où viennent les données.",
        "Un fichier `.json` ne contient que des données : pas de `const`, pas de point-virgule, pas de commentaire.",
        "VS Code souligne en rouge la moindre erreur de syntaxe dans un fichier `.json`."
      ]
    },
    "demarrer": [
      "Lister ce qu'il faut enregistrer, et les champs de chaque élément (section « Structurer ses données »).",
      "Écrire deux ou trois exemples à la main dans un fichier `.json`.",
      "Les lire avec `fetch` et les afficher dans la page.",
      "Quand les données doivent être modifiées ou partagées entre visiteurs, passer à une base de données et à son API.",
      "Vérifier chaque donnée avant de l'enregistrer (section « Vérifier et protéger »)."
    ]
  },
  "groups": [
    {
      "name": "Écrire du JSON",
      "cards": [
        {
          "t": "Un objet : des paires clé / valeur",
          "d": "Des accolades, des clés entre guillemets doubles, deux-points, la valeur, et une virgule entre chaque paire.",
          "code": "{\n  \"nom\": \"Dupont\",\n  \"prenom\": \"Alice\",\n  \"age\": 34,\n  \"abonne\": true,\n  \"telephone\": null\n}"
        },
        {
          "t": "Les types de valeurs",
          "d": "Il n'y en a que six : texte, nombre, booléen, null, liste et objet. Pas de date, pas de fonction.",
          "code": "{\n  \"texte\": \"bonjour\",\n  \"nombre\": 42,\n  \"decimal\": 3.14,\n  \"booleen\": true,\n  \"vide\": null,\n  \"liste\": [\"rouge\", \"vert\", \"bleu\"],\n  \"objet\": { \"x\": 10, \"y\": 20 }\n}"
        },
        {
          "t": "Les erreurs qui cassent tout",
          "d": "JSON est strict : une seule faute et le fichier entier est refusé. Les commentaires ci-dessous sont là pour l'explication, un vrai fichier JSON n'en contient pas.",
          "code": "// FAUX : guillemets simples\n{ 'nom': 'Dupont' }\n\n// FAUX : clé sans guillemets\n{ nom: \"Dupont\" }\n\n// FAUX : virgule après le dernier élément\n{ \"nom\": \"Dupont\", }\n\n// JUSTE\n{ \"nom\": \"Dupont\" }"
        },
        {
          "t": "Passer de JSON à JavaScript",
          "d": "JSON.stringify transforme un objet en texte (pour l'enregistrer ou l'envoyer), JSON.parse fait l'inverse.",
          "code": "const client = { nom: 'Dupont', abonne: true };\n\nconst texte = JSON.stringify(client);\n// '{\"nom\":\"Dupont\",\"abonne\":true}'\n\nconst objet = JSON.parse(texte);\nobjet.nom; // 'Dupont'\n\n// Version lisible, indentée de 2 espaces\nJSON.stringify(client, null, 2);"
        },
        {
          "t": "Garder des données dans le navigateur",
          "d": "localStorage ne stocke que du texte : on passe par JSON. Le try/catch évite que le site plante si le texte enregistré est abîmé. Les données restent sur l'appareil du visiteur.",
          "code": "function lireFavoris() {\n  try {\n    return JSON.parse(localStorage.getItem('favoris')) || [];\n  } catch {\n    return [];\n  }\n}\n\nfunction ajouterFavori(id) {\n  const liste = lireFavoris().filter((f) => f !== id); // pas de doublon\n  liste.push(id);\n  localStorage.setItem('favoris', JSON.stringify(liste));\n}"
        }
      ]
    },
    {
      "name": "Structurer ses données",
      "cards": [
        {
          "t": "Une collection : une liste d'éléments de même forme",
          "d": "Tous les éléments d'une collection ont les mêmes champs, avec les mêmes noms. C'est l'équivalent d'un tableau : une ligne par élément, une colonne par champ.",
          "code": "[\n  { \"id\": 1, \"titre\": \"Clavier\", \"prix\": 4900, \"enStock\": true },\n  { \"id\": 2, \"titre\": \"Souris\",  \"prix\": 1900, \"enStock\": true },\n  { \"id\": 3, \"titre\": \"Écran\",   \"prix\": 15900, \"enStock\": false }\n]"
        },
        {
          "t": "Un identifiant unique par élément",
          "d": "Deux clients peuvent porter le même nom : c'est l'identifiant qui les distingue. Il ne change jamais et ne sert à rien d'autre.",
          "code": "// Un numéro qui augmente\n{ \"id\": 42, \"nom\": \"Dupont\" }\n\n// Ou un identifiant aléatoire, impossible à deviner\n{ \"id\": \"f47ac10b-58cc-4372-a567-0e02b2c3d479\", \"nom\": \"Dupont\" }\n\n// En JavaScript, pour en créer un\nconst id = crypto.randomUUID();"
        },
        {
          "t": "Ranger par identifiant",
          "d": "Avec un objet dont les clés sont les identifiants, on atteint un élément directement, sans parcourir toute la liste. Beaucoup de bases de données rangent leurs données ainsi.",
          "code": "{\n  \"u1\": { \"nom\": \"Dupont\", \"ville\": \"Lyon\" },\n  \"u2\": { \"nom\": \"Martin\", \"ville\": \"Lille\" }\n}\n\n// En JavaScript\nclients[\"u2\"].ville;        // \"Lille\", accès direct\nObject.values(clients);     // pour retrouver une liste"
        },
        {
          "t": "Relier deux collections",
          "d": "Plutôt que de recopier l'auteur dans chaque article, on enregistre seulement son identifiant. Si l'auteur change de nom, une seule ligne est à modifier.",
          "code": "{\n  \"auteurs\": {\n    \"a1\": { \"nom\": \"Alice Dupont\" }\n  },\n  \"articles\": {\n    \"p1\": { \"titre\": \"Premier article\", \"auteurId\": \"a1\" },\n    \"p2\": { \"titre\": \"Deuxième article\", \"auteurId\": \"a1\" }\n  }\n}"
        },
        {
          "t": "Imbriquer ou relier ?",
          "d": "On imbrique ce qui n'existe pas sans son parent et reste petit (une adresse). On relie ce qui grandit sans limite ou sert ailleurs (des commandes).",
          "code": "{\n  \"clients\": {\n    \"u1\": {\n      \"nom\": \"Dupont\",\n      \"adresse\": { \"rue\": \"12 rue des Lilas\", \"ville\": \"Lyon\" }\n    }\n  },\n  \"commandes\": {\n    \"c1\": { \"clientId\": \"u1\", \"total\": 6800 },\n    \"c2\": { \"clientId\": \"u1\", \"total\": 1900 }\n  }\n}"
        },
        {
          "t": "Dates et montants",
          "d": "JSON n'a pas de type date : on écrit un texte au format ISO, que tous les langages savent lire et qui se trie correctement. Un prix s'enregistre en centimes, pour éviter les erreurs d'arrondi des nombres à virgule.",
          "code": "{\n  \"creeLe\": \"2025-03-14T09:30:00Z\",\n  \"prix\": 1999\n}\n\n// En JavaScript\nnew Date().toISOString();                 // \"2025-03-14T09:30:00.000Z\"\nnew Date(commande.creeLe);                // texte -> date\n(commande.prix / 100).toFixed(2) + \" €\";  // \"19.99 €\""
        }
      ]
    },
    {
      "name": "Lire et écrire",
      "cards": [
        {
          "t": "Lire un fichier JSON",
          "d": "fetch va chercher le fichier, res.json() le transforme en objet JavaScript. Il faut ouvrir le site avec un serveur local : en double-cliquant sur index.html, le navigateur bloque la lecture.",
          "code": "async function lireProduits() {\n  const res = await fetch('data/produits.json');\n  return res.json();\n}\n\nconst produits = await lireProduits();\nproduits[0].titre; // \"Clavier\""
        },
        {
          "t": "Lire depuis une base : GET",
          "d": "Une API donne une adresse à chaque collection et à chaque élément. Lire, c'est demander cette adresse.",
          "code": "const API = 'https://api.exemple.fr';\n\n// Toute la collection\nconst produits = await (await fetch(`${API}/produits`)).json();\n\n// Un seul élément, par son identifiant\nconst produit = await (await fetch(`${API}/produits/42`)).json();"
        },
        {
          "t": "Ajouter un élément : POST",
          "d": "On envoie l'objet en JSON dans le corps de la demande. Le serveur lui attribue un identifiant et renvoie l'élément créé.",
          "code": "const res = await fetch(`${API}/produits`, {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ titre: 'Casque', prix: 5900 })\n});\n\nconst cree = await res.json(); // { id: 43, titre: 'Casque', prix: 5900 }"
        },
        {
          "t": "Modifier : PATCH ou PUT",
          "d": "PATCH ne change que les champs envoyés. PUT remplace l'élément entier : tout champ oublié est perdu.",
          "code": "// Changer seulement le prix\nawait fetch(`${API}/produits/43`, {\n  method: 'PATCH',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ prix: 4900 })\n});"
        },
        {
          "t": "Supprimer : DELETE",
          "d": "Une suppression est définitive : mieux vaut demander confirmation avant.",
          "code": "if (confirm('Supprimer ce produit ?')) {\n  await fetch(`${API}/produits/43`, { method: 'DELETE' });\n}"
        },
        {
          "t": "Prévoir les erreurs",
          "d": "fetch ne signale pas une réponse « introuvable » ou « refusé » : il faut tester res.ok. Le try/catch attrape la coupure de connexion.",
          "code": "async function lire(chemin) {\n  try {\n    const res = await fetch(`${API}/${chemin}`);\n    if (!res.ok) throw new Error(`Erreur ${res.status}`); // 404, 403, 500...\n    return await res.json();\n  } catch (e) {\n    console.error('Lecture impossible', e);\n    return null;\n  }\n}"
        },
        {
          "t": "Chercher, filtrer, trier",
          "d": "Une fois les données lues, ce sont des tableaux JavaScript ordinaires. Sur une grosse base, on demande plutôt au serveur de filtrer, pour ne pas tout télécharger.",
          "code": "const un = produits.find((p) => p.id === 42);          // un élément, ou undefined\nconst dispo = produits.filter((p) => p.enStock);        // ceux qui correspondent\nconst parPrix = [...produits].sort((a, b) => a.prix - b.prix); // copie triée\n\n// Côté serveur, souvent par l'adresse :\n// /produits?enStock=true&tri=prix"
        }
      ]
    },
    {
      "name": "Vérifier et protéger",
      "cards": [
        {
          "t": "Vérifier avant d'enregistrer",
          "d": "Un champ vide, un texte à la place d'un nombre, un pseudo de 5 000 caractères : on refuse avant d'écrire, et on dit pourquoi.",
          "code": "function verifierProduit(p) {\n  if (typeof p.titre !== 'string' || p.titre.trim() === '') return 'Titre manquant';\n  if (p.titre.length > 80) return 'Titre trop long';\n  if (!Number.isInteger(p.prix) || p.prix < 0) return 'Prix invalide';\n  return null; // tout va bien\n}\n\nconst erreur = verifierProduit(saisie);\nif (erreur) alert(erreur);\nelse await enregistrer(saisie);"
        },
        {
          "t": "Ne garder que les champs prévus",
          "d": "On recopie un par un les champs attendus au lieu d'enregistrer l'objet reçu tel quel. Tout champ en trop est ainsi ignoré.",
          "code": "function nettoyer(saisie) {\n  return {\n    titre: String(saisie.titre).trim(),\n    prix: Number(saisie.prix),\n    enStock: Boolean(saisie.enStock)\n  };\n}\n\nnettoyer({ titre: ' Casque ', prix: '5900', admin: true });\n// { titre: 'Casque', prix: 5900, enStock: false }   -> \"admin\" a disparu"
        },
        {
          "t": "Valeurs par défaut",
          "d": "Les données enregistrées avant l'ajout d'un champ ne le contiennent pas. On complète à la lecture plutôt que de supposer qu'il existe.",
          "code": "function completer(produit) {\n  return {\n    enStock: true,     // valeurs utilisées si le champ manque\n    etiquettes: [],\n    ...produit         // les vraies valeurs passent par-dessus\n  };\n}\n\ncompleter({ titre: 'Clavier' });\n// { enStock: true, etiquettes: [], titre: 'Clavier' }"
        },
        {
          "t": "La vraie vérification se fait côté serveur",
          "d": "Le JavaScript d'un site est lisible et modifiable par n'importe quel visiteur. Les vérifications dans la page servent au confort ; celles qui protègent les données sont dans la base ou sur le serveur.",
          "code": "// Dans la page : pour aider le visiteur\nif (erreur) alert(erreur);\n\n// Côté serveur ou dans les règles de la base : pour protéger\n// - qui fait la demande ? (connecté ou non)\n// - a-t-il le droit de lire ou de modifier CET élément ?\n// - la donnée a-t-elle la bonne forme ?"
        },
        {
          "t": "Ce qui ne va jamais dans un fichier public",
          "d": "Tout ce que le navigateur télécharge peut être lu : fichiers .json, code JavaScript, réponses de l'API. Un champ « caché » à l'affichage reste visible dans les outils du navigateur.",
          "code": "// À NE PAS FAIRE\n{\n  \"nom\": \"Dupont\",\n  \"motDePasse\": \"azerty123\",\n  \"cleSecrete\": \"sk_live_...\"\n}\n\n// Une API ne renvoie que ce que le visiteur a le droit de voir\n{\n  \"id\": \"u1\",\n  \"nom\": \"Dupont\"\n}"
        }
      ]
    }
  ]
};
