// Fiches de référence : HTML
//
// Schéma : { id, label, color, groups: [ { name, cards: [ { t, d, code } ] } ] }
//   id/label/color → identifiant, nom et couleur de l'onglet (variable CSS
//                     définie dans css/style.css, ex. --html-color). Ce fichier
//                     est chargé sous le sous-onglet "HTML" de l'onglet groupé
//                     "Site Web" (voir NAV_RAW dans js/app.js).
//   groups[].name   → titre de section affiché (ex. "Structure")
//   cards[].t       → titre court de la fiche
//   cards[].d       → description en langage simple (affichée sous le titre)
//   cards[].code    → extrait affiché tel quel, avec ses propres commentaires //
// Pour ajouter une fiche : copier un objet du tableau "cards" d'un groupe et
// l'adapter. Pour ajouter une section : copier un objet du tableau "groups".
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.html = {
  "id": "html",
  "label": "HTML",
  "color": "var(--html-color)",
  "groups": [
    {
      "name": "Structure",
      "cards": [
        {
          "t": "Squelette de page",
          "d": "Le strict minimum pour qu'une page HTML soit valide : un modèle à copier-coller comme point de départ de n'importe quel nouveau projet.",
          "code": "<!DOCTYPE html>              <!-- déclare qu'on utilise HTML5 -->\n<html lang=\"fr\">              <!-- lang aide les lecteurs d'écran et les moteurs de recherche -->\n<head>\n    <meta charset=\"UTF-8\">    <!-- encodage des caractères, gère les accents -->\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> <!-- adapté mobile -->\n    <title>Titre de la page</title> <!-- affiché dans l'onglet du navigateur -->\n</head>\n<body>\n    <h1>Bonjour</h1>          <!-- le contenu visible commence ici -->\n</body>\n</html>"
        },
        {
          "t": "Balises sémantiques HTML5",
          "d": "Des balises qui indiquent CE QU'EST chaque zone de la page (un menu, un pied de page...) plutôt que d'utiliser une <div> générique qui ne dit rien sur son rôle.",
          "code": "<header>...</header>   <!-- en-tête de page ou de section -->\n<nav>...</nav>           <!-- menu de navigation -->\n<main>\n    <section>...</section> <!-- regroupement thématique -->\n    <article>...</article>  <!-- contenu autonome (article de blog, etc.) -->\n    <aside>...</aside>       <!-- contenu annexe (encadré, pub, liens liés) -->\n</main>\n<footer>...</footer>     <!-- pied de page -->"
        }
      ]
    },
    {
      "name": "Mise en forme du texte",
      "cards": [
        {
          "t": "Emphase & style en ligne",
          "d": "Des balises qui changent l'apparence d'un morceau de texte SANS créer de nouveau paragraphe ni de nouvelle ligne.",
          "code": "<strong>important</strong>    <!-- gras, indique une forte importance -->\n<em>insisté</em>                <!-- italique, met l'accent sur le mot -->\n<mark>surligné</mark>            <!-- surlignage, comme un stabilo -->\n<code>maFonction()</code>         <!-- texte de code, police à chasse fixe -->\n<small>petit texte</small>         <!-- mentions légales, notes -->\n<sub>2</sub> et <sup>2</sup>        <!-- indice et exposant -->\n<del>supprimé</del> <ins>ajouté</ins> <!-- suivi de modifications -->"
        },
        {
          "t": "Titres & paragraphes",
          "d": "h1 à h6 forment le \"plan\" de la page, du plus important au moins important. h1 doit être le titre principal, utilisé une seule fois par page.",
          "code": "<h1>Titre principal</h1>\n<h2>Sous-titre</h2>\n<p>Un paragraphe de texte normal.</p>\n<br>   <!-- retour à la ligne simple, sans nouveau paragraphe -->\n<hr>   <!-- ligne horizontale de séparation -->"
        }
      ]
    },
    {
      "name": "Liens, images & médias",
      "cards": [
        {
          "t": "Liens & images",
          "d": "href indique VERS OÙ un lien pointe ; pour une image, alt fournit un texte de remplacement, lu par les personnes malvoyantes ou affiché si l'image ne charge pas.",
          "code": "<a href=\"https://exemple.fr\" target=\"_blank\">Lien</a>\n<!-- target=\"_blank\" ouvre dans un nouvel onglet -->\n\n<img src=\"photo.jpg\" alt=\"Description de l'image\" width=\"400\">\n<!-- alt est affiché si l'image ne charge pas, et lu par les lecteurs d'écran -->"
        },
        {
          "t": "Vidéo & audio",
          "d": "Le navigateur sait lire des vidéos et du son directement, avec ses propres boutons de lecture (controls), sans avoir besoin d'installer quoi que ce soit.",
          "code": "<video controls width=\"320\">\n    <source src=\"film.mp4\" type=\"video/mp4\">\n    Votre navigateur ne supporte pas la vidéo. <!-- texte de repli -->\n</video>\n\n<audio controls>\n    <source src=\"son.mp3\" type=\"audio/mpeg\">\n</audio>"
        },
        {
          "t": "figure & details",
          "d": "figure relie une image à sa légende (figcaption) ; details/summary crée un petit bloc \"cliquer pour en voir plus\", sans une seule ligne de JavaScript.",
          "code": "<figure>\n    <img src=\"graphe.png\" alt=\"Graphique des ventes\">\n    <figcaption>Ventes du mois</figcaption> <!-- légende de l'image -->\n</figure>\n\n<details>\n    <summary>Voir plus</summary>  <!-- texte toujours visible, cliquable -->\n    <p>Contenu caché jusqu'au clic.</p>\n</details>"
        }
      ]
    },
    {
      "name": "Listes & tableaux",
      "cards": [
        {
          "t": "Listes",
          "d": "Deux façons de présenter une suite d'éléments : ul avec des puces (l'ordre n'a pas d'importance), ol avec des numéros (l'ordre compte).",
          "code": "<ul>\n    <li>Élément 1</li>\n    <li>Élément 2</li>\n</ul>\n\n<ol>\n    <li>Premier</li>\n    <li>Second</li>\n</ol>"
        },
        {
          "t": "Tableau",
          "d": "table dessine un vrai tableau avec des lignes et des colonnes ; thead marque la ligne d'en-tête (les titres de colonnes), tbody contient les données.",
          "code": "<table>\n    <thead>\n        <tr><th>Nom</th><th>Age</th></tr> <!-- th = cellule d'en-tête -->\n    </thead>\n    <tbody>\n        <tr><td>Alice</td><td>30</td></tr> <!-- td = cellule normale -->\n    </tbody>\n</table>"
        }
      ]
    },
    {
      "name": "Formulaires",
      "cards": [
        {
          "t": "Formulaire de base",
          "d": "form regroupe tous les champs de saisie d'un utilisateur ; action indique où envoyer les données une fois validées, method comment les envoyer.",
          "code": "<form action=\"/envoyer\" method=\"post\">\n    <label for=\"nom\">Nom</label>              <!-- for relie le label au champ -->\n    <input type=\"text\" id=\"nom\" name=\"nom\" required>\n\n    <select name=\"pays\">                        <!-- liste déroulante -->\n        <option value=\"fr\">France</option>\n    </select>\n\n    <textarea name=\"message\"></textarea>        <!-- zone de texte multi-ligne -->\n\n    <button type=\"submit\">Envoyer</button>       <!-- déclenche l'envoi du formulaire -->\n</form>"
        },
        {
          "t": "Types d'input utiles",
          "d": "Changer le \"type\" d'un champ suffit à adapter automatiquement le clavier affiché (sur mobile) et à faire vérifier le format par le navigateur, sans code supplémentaire.",
          "code": "<input type=\"email\" required>        <!-- vérifie le format d'une adresse mail -->\n<input type=\"number\" min=\"0\" max=\"100\"> <!-- clavier numérique, bornes -->\n<input type=\"password\">                <!-- masque les caractères saisis -->\n<input type=\"checkbox\" checked>         <!-- case à cocher -->\n<input type=\"radio\" name=\"choix\">        <!-- bouton radio (un seul choix par name) -->\n<input type=\"date\">                       <!-- sélecteur de date natif -->\n<input type=\"range\" min=\"0\" max=\"10\">      <!-- curseur -->"
        }
      ]
    },
    {
      "name": "Meta & en-tête",
      "cards": [
        {
          "t": "Balises meta utiles",
          "d": "Des informations placées dans <head>, jamais visibles à l'écran, mais lues par le navigateur ou les moteurs de recherche pour bien afficher/référencer la page.",
          "code": "<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<meta name=\"description\" content=\"Résumé affiché dans les résultats de recherche\">\n<link rel=\"icon\" href=\"favicon.ico\">      <!-- icône affichée dans l'onglet -->\n<link rel=\"stylesheet\" href=\"style.css\">  <!-- feuille de style externe -->\n<script src=\"script.js\"></script>          <!-- fichier JavaScript externe -->"
        }
      ]
    },
    {
      "name": "Attributs globaux & accessibilité",
      "cards": [
        {
          "t": "Attributs utilisables sur presque toutes les balises",
          "d": "id donne un nom unique à UN élément précis (pour le cibler depuis CSS/JS), class peut être réutilisée sur plusieurs éléments, data-* permet d'accrocher une information personnalisée n'importe où.",
          "code": "<div id=\"menu-principal\">...</div>   <!-- id : identifiant UNIQUE sur toute la page -->\n<p class=\"alerte importante\">...</p>  <!-- class : réutilisable sur plusieurs éléments -->\n<button data-user-id=\"42\">Voir</button> <!-- data-* : stocke une donnée personnalisée -->\n<abbr title=\"HyperText Markup Language\">HTML</abbr> <!-- title : info-bulle au survol -->"
        },
        {
          "t": "Accessibilité de base (ARIA)",
          "d": "Des attributs qui aident les personnes utilisant un lecteur d'écran (un logiciel qui lit la page à voix haute) à comprendre une page, surtout pour tout ce que le HTML seul n'explique pas assez.",
          "code": "<button aria-label=\"Fermer la fenêtre\">✕</button>\n<!-- aria-label : texte lu à voix haute quand le contenu visible est ambigu -->\n\n<div role=\"alert\">Erreur : champ requis</div>\n<!-- role=\"alert\" : annoncé immédiatement par le lecteur d'écran -->\n\n<img src=\"decor.png\" alt=\"\"> <!-- alt vide : image purement décorative, ignorée -->\n<input type=\"text\" aria-required=\"true\"> <!-- signale un champ obligatoire -->"
        }
      ]
    },
    {
      "name": "Erreurs fréquentes & bonnes pratiques",
      "cards": [
        {
          "t": "Balises non fermées ou mal imbriquées",
          "d": "Le navigateur essaie toujours de deviner et corriger tout seul les erreurs, mais le résultat affiché peut devenir imprévisible : mieux vaut fermer chaque balise correctement, dans le bon ordre.",
          "code": "<!-- Incorrect : imbrication croisée -->\n<p>Texte <strong>important</p></strong>\n\n<!-- Correct : les balises s'ouvrent et se ferment dans le bon ordre -->\n<p>Texte <strong>important</strong></p>\n\n<!-- Certaines balises n'ont pas de fermeture (\"balises orphelines\") -->\n<img src=\"photo.jpg\" alt=\"...\">  <!-- pas de </img> -->\n<br> <!-- pas de </br> -->"
        },
        {
          "t": "Abus de div (\"div-itis\")",
          "d": "Une <div> ne dit rien sur son rôle. Utiliser une balise sémantique (header, nav...) à la place quand elle existe rend la page plus facile à comprendre, pour le navigateur comme pour Google.",
          "code": "<!-- Moins bon : aucune information sur le rôle de chaque bloc -->\n<div class=\"header\">...</div>\n<div class=\"nav\">...</div>\n\n<!-- Mieux : le navigateur ET les moteurs de recherche comprennent la structure -->\n<header>...</header>\n<nav>...</nav>"
        },
        {
          "t": "Oublier l'attribut alt",
          "d": "Sans alt, une image reste totalement invisible pour une personne malvoyante utilisant un lecteur d'écran, et n'affiche rien de compréhensible si le fichier ne charge pas.",
          "code": "<img src=\"graphique-ventes.png\">              <!-- mauvais : aucune description -->\n<img src=\"graphique-ventes.png\" alt=\"\">        <!-- ok seulement si l'image est purement décorative -->\n<img src=\"graphique-ventes.png\" alt=\"Ventes en hausse de 20% au T3\"> <!-- bien -->"
        }
      ]
    }
  ]
};
