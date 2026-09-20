// Fiches de référence : Python
//
// Schéma : { id, label, color, groups: [ { name, cards: [ { t, d, code } ] } ] }
//   id/label/color → identifiant, nom et couleur de l'onglet (variable CSS
//                     définie dans css/style.css, ex. --python-color)
//   groups[].name   → titre de section affiché (ex. "Bases")
//   cards[].t       → titre court de la fiche
//   cards[].d       → description en langage simple (affichée sous le titre)
//   cards[].code    → extrait affiché tel quel, avec ses propres commentaires #
// Pour ajouter une fiche : copier un objet du tableau "cards" d'un groupe et
// l'adapter. Pour ajouter une section : copier un objet du tableau "groups".
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.python = {
  "id": "python",
  "label": "Python",
  "color": "var(--python-color)",
  "groups": [
    {
      "name": "Bases",
      "cards": [
        {
          "t": "Variables & types",
          "d": "Pas besoin d'annoncer le type d'une variable comme en C : Python le devine tout seul selon la valeur qu'on lui donne (on appelle ça le \"typage dynamique\").",
          "code": "x = 10            # int\ny = 3.14          # float\nnom = \"Alice\"     # str\nactif = True      # bool\nrien = None       # NoneType, représente \"aucune valeur\"\n\nprint(type(x))    # affiche <class 'int'>"
        },
        {
          "t": "f-strings",
          "d": "Une façon d'écrire du texte en y insérant directement la valeur d'une variable, sans avoir à \"coller\" des morceaux de texte avec +.",
          "code": "nom = \"Alice\"\nage = 30\nprint(f\"{nom} a {age} ans\")         # insère les variables directement\nprint(f\"pi ≈ {3.14159:.2f}\")         # :.2f -> 2 décimales"
        },
        {
          "t": "Commentaires",
          "d": "Du texte que Python ignore complètement à l'exécution, écrit uniquement pour expliquer le code aux humains qui le liront (dont vous-même, plus tard).",
          "code": "# Commentaire sur une seule ligne\n\n\"\"\"\nCommentaire (ou chaîne) sur\nplusieurs lignes\n\"\"\""
        },
        {
          "t": "Chaînes de caractères : méthodes utiles",
          "d": "Un texte (str) possède plein d'actions intégrées prêtes à l'emploi, pour le nettoyer, le transformer ou le découper sans avoir à écrire une boucle.",
          "code": "s = \"  Bonjour Monde  \"\ns.strip()             # retire les espaces au début/fin -> \"Bonjour Monde\"\ns.lower()               # tout en minuscules\ns.upper()                 # tout en majuscules\ns.replace(\"Monde\", \"Python\")  # remplace une sous-chaîne\ns.split(\" \")                    # découpe en liste selon un séparateur -> [\"\", \"\", \"Bonjour\", ...]\n\"-\".join([\"a\", \"b\", \"c\"])          # inverse de split : assemble une liste -> \"a-b-c\"\n\"abc\" in s                            # test de présence -> True/False\nlen(s)                                   # nombre de caractères"
        }
      ]
    },
    {
      "name": "Contrôle & fonctions",
      "cards": [
        {
          "t": "Conditions",
          "d": "Exécute un bloc de code seulement si une condition est vraie. Particularité de Python : c'est l'indentation (les espaces au début de la ligne) qui délimite les blocs, pas des accolades.",
          "code": "if x > 0:\n    print(\"positif\")\nelif x == 0:\n    print(\"zéro\")\nelse:\n    print(\"négatif\")"
        },
        {
          "t": "Boucles",
          "d": "for répète un bloc pour chaque élément d'une séquence (une liste, un intervalle...) ; while répète tant qu'une condition reste vraie.",
          "code": "for i in range(10):    # i prend les valeurs 0 à 9\n    print(i)\n\nwhile x > 0:\n    x -= 1               # équivaut à x = x - 1\n\n# break  : sort de la boucle\n# continue : passe au tour suivant\nfor i in range(5):\n    if i == 2:\n        continue          # saute i == 2\n    if i == 4:\n        break               # arrête la boucle à i == 4"
        },
        {
          "t": "Fonctions",
          "d": "def crée une fonction, un bloc de code réutilisable qu'on appelle par son nom. Un paramètre peut avoir une valeur par défaut, utilisée si on ne la fournit pas à l'appel.",
          "code": "def addition(a, b=0):     # b vaut 0 si non fourni\n    return a + b\n\nresultat = addition(3, 4)   # 7\nresultat2 = addition(3)      # 3 (b prend sa valeur par défaut)"
        },
        {
          "t": "Lambda",
          "d": "Une mini-fonction sans nom, qui ne fait qu'une seule chose en une seule ligne : pratique quand on a besoin d'une petite fonction juste pour un usage ponctuel (comme trier une liste).",
          "code": "carre = lambda x: x ** 2\nprint(carre(5))          # 25\n\nnombres = [3, 1, 4, 1, 5]\ntries = sorted(nombres, key=lambda x: -x) # trie du plus grand au plus petit"
        },
        {
          "t": "*args et **kwargs",
          "d": "Permettent à une fonction d'accepter un nombre d'arguments qu'on ne connaît pas à l'avance : *args les regroupe en une liste, **kwargs en un dictionnaire nom -> valeur.",
          "code": "def somme(*args):           # args devient un tuple de valeurs\n    return sum(args)\nsomme(1, 2, 3)                # 6\n\ndef afficher(**kwargs):       # kwargs devient un dictionnaire\n    for cle, val in kwargs.items():\n        print(cle, \"=\", val)\nafficher(nom=\"Alice\", age=30)"
        }
      ]
    },
    {
      "name": "Structures de données",
      "cards": [
        {
          "t": "Listes",
          "d": "Une collection ordonnée de valeurs qu'on peut modifier à volonté (ajouter, retirer, changer un élément), avec un accès par numéro (index), en commençant à 0.",
          "code": "liste = [1, 2, 3]\nliste.append(4)         # ajoute à la fin\nliste.remove(2)          # retire la première occurrence de 2\nprint(liste[0])            # 1\nprint(liste[-1])            # dernier élément\nsous = liste[1:3]            # slice : éléments d'index 1 à 2 (3 exclu)"
        },
        {
          "t": "Tuples",
          "d": "Se comporte comme une liste, mais une fois créé, impossible d'y toucher : utile pour des valeurs qui ne doivent jamais changer (des coordonnées, par exemple).",
          "code": "t = (1, 2, 3)\nx, y, z = t         # décomposition (unpacking) en 3 variables\nprint(t[0])            # 1, accès comme une liste\n# t[0] = 5            # erreur : un tuple ne peut pas être modifié"
        },
        {
          "t": "Dictionnaires",
          "d": "Une collection qui associe une clé (souvent un mot) à une valeur, comme un carnet d'adresses : on retrouve une information par son nom plutôt que par sa position.",
          "code": "d = {\"nom\": \"Alice\", \"age\": 30}\nd[\"ville\"] = \"Paris\"    # ajoute ou remplace une entrée\nprint(d[\"nom\"])            # accès par clé -> \"Alice\"\nprint(d.get(\"age\", 0))      # comme [], mais renvoie 0 si absent au lieu d'une erreur\n\nfor cle, val in d.items():\n    print(cle, val)"
        },
        {
          "t": "Sets (ensembles)",
          "d": "Une collection qui garde uniquement des valeurs uniques (les doublons disparaissent automatiquement) et qui n'a pas d'ordre défini : parfait pour nettoyer une liste.",
          "code": "s = {1, 2, 2, 3}      # doublons supprimés automatiquement -> {1, 2, 3}\ns.add(4)\ns.remove(1)\nprint(2 in s)           # test d'appartenance, très rapide\n\na = {1, 2}; b = {2, 3}\nprint(a | b)              # union -> {1, 2, 3}\nprint(a & b)               # intersection -> {2}"
        },
        {
          "t": "Compréhensions de liste",
          "d": "Une façon très condensée d'écrire \"pour chaque élément, fais ceci\" et de construire une nouvelle liste en une seule ligne, avec un filtre optionnel.",
          "code": "carres = [x**2 for x in range(10)]             # [0, 1, 4, ..., 81]\npairs = [x for x in range(20) if x % 2 == 0]     # filtre avec \"if\"\nd = {x: x**2 for x in range(5)}                    # équivalent pour un dict"
        }
      ]
    },
    {
      "name": "Classes & POO",
      "cards": [
        {
          "t": "Classe de base",
          "d": "Une classe est un modèle pour créer des objets similaires. __init__ est appelé automatiquement à chaque création, et self représente toujours \"l'objet en train d'être manipulé\".",
          "code": "class Personne:\n    def __init__(self, nom, age):  # appelé automatiquement à la création\n        self.nom = nom               # attribut d'instance\n        self.age = age\n\n    def se_presenter(self):\n        return f\"Je m'appelle {self.nom}\"\n\np = Personne(\"Alice\", 30)\nprint(p.se_presenter())"
        },
        {
          "t": "Héritage",
          "d": "Une classe peut réutiliser tout ce que fait une autre classe, et y ajouter ou modifier des choses, sans avoir à tout réécrire depuis le début.",
          "code": "class Etudiant(Personne):          # hérite de Personne\n    def __init__(self, nom, age, ecole):\n        super().__init__(nom, age)   # appelle le constructeur de la classe parente\n        self.ecole = ecole\n\ne = Etudiant(\"Bob\", 20, \"Lycée Langevin\")"
        }
      ]
    },
    {
      "name": "Exceptions",
      "cards": [
        {
          "t": "try / except",
          "d": "Permet de \"surveiller\" un bloc de code qui pourrait échouer (une division par zéro, un fichier manquant...) et de réagir proprement au lieu de laisser le programme s'arrêter brutalement.",
          "code": "try:\n    x = 10 / 0\nexcept ZeroDivisionError as e:\n    print(f\"Erreur : {e}\")     # capture précisément ce type d'erreur\nexcept Exception as e:\n    print(\"Autre erreur :\", e)  # filet de sécurité pour le reste\nelse:\n    print(\"Aucune erreur\")        # exécuté seulement si tout s'est bien passé\nfinally:\n    print(\"Toujours exécuté\")      # exécuté dans tous les cas (nettoyage)"
        }
      ]
    },
    {
      "name": "Erreurs fréquentes",
      "cards": [
        {
          "t": "IndentationError",
          "d": "Puisque Python se sert de l'indentation pour savoir où commence et finit un bloc, mélanger espaces et tabulations, ou mal aligner une ligne, provoque directement une erreur.",
          "code": "def dire_bonjour():\n    print(\"Bonjour\")   # indenté avec 4 espaces\n      print(\"!\")        # ERREUR : indentation incohérente avec la ligne précédente\n\n# Règle d'or : choisir 4 espaces (convention PEP8) et s'y tenir partout,\n# ne jamais mélanger espaces et tabulations dans le même fichier."
        },
        {
          "t": "Argument par défaut mutable (piège classique)",
          "d": "Une valeur par défaut de type liste ou dictionnaire n'est créée qu'UNE SEULE fois, au moment où Python lit la fonction, puis elle est réutilisée à chaque appel : un piège classique et déroutant.",
          "code": "def ajouter(item, liste=[]):   # PIÈGE : cette liste est réutilisée à chaque appel !\n    liste.append(item)\n    return liste\n\najouter(\"a\")   # ['a']\najouter(\"b\")   # ['a', 'b']  <- inattendu, la liste précédente n'a pas été vidée\n\ndef ajouter_bis(item, liste=None): # bonne pratique : utiliser None puis créer la liste dedans\n    if liste is None:\n        liste = []\n    liste.append(item)\n    return liste"
        },
        {
          "t": "== vs is",
          "d": "== demande \"est-ce que ces deux valeurs se ressemblent ?\", is demande \"est-ce EXACTEMENT le même objet en mémoire ?\" — deux questions différentes.",
          "code": "a = [1, 2, 3]\nb = [1, 2, 3]\na == b   # True  : même contenu\na is b     # False : deux objets différents en mémoire\n\nc = a\nc is a       # True : c'est littéralement le même objet\n\n# Cas particulier fréquent : is None (recommandé) plutôt que == None\nif a is None:  # idiome standard en Python\n    pass"
        },
        {
          "t": "Modifier une liste en la parcourant",
          "d": "Retirer un élément d'une liste PENDANT qu'on la parcourt décale tous les index qui suivent, ce qui fait \"sauter\" involontairement certains éléments du parcours.",
          "code": "nombres = [1, 2, 3, 4, 5, 6]\nfor n in nombres:\n    if n % 2 == 0:\n        nombres.remove(n)   # BUG : décale les index, certains éléments sont sautés\nprint(nombres)                 # résultat inattendu : [1, 3, 5, 6] au lieu de [1, 3, 5]\n\n# Bonne pratique : construire une nouvelle liste plutôt que modifier en parcourant\nnombres = [1, 2, 3, 4, 5, 6]\nimpairs = [n for n in nombres if n % 2 != 0]  # compréhension de liste, sûre"
        }
      ]
    },
    {
      "name": "Fichiers, modules & environnement",
      "cards": [
        {
          "t": "Lire / écrire un fichier",
          "d": "with ouvre le fichier et se charge de le refermer automatiquement à la fin du bloc, même si une erreur survient entre-temps : plus fiable que de fermer soi-même.",
          "code": "with open(\"data.txt\", \"r\") as f:\n    contenu = f.read()       # lit tout le fichier d'un coup\n\nwith open(\"data.txt\", \"w\") as f:\n    f.write(\"nouvelle ligne\\n\")"
        },
        {
          "t": "Import de modules",
          "d": "Un module est un fichier de code déjà écrit (par vous ou par quelqu'un d'autre) qu'on peut réutiliser dans son propre programme, sans le recopier.",
          "code": "import math\nprint(math.sqrt(16))          # 4.0, accès préfixé par le nom du module\n\nfrom math import sqrt, pi      # importe seulement ce qui est utile\nprint(sqrt(16), pi)\n\nimport numpy as np             # alias, pratique pour les bibliothèques externes"
        },
        {
          "t": "JSON",
          "d": "Un format de texte très répandu pour échanger des données structurées entre programmes (ou avec un site web) ; json.dumps/loads convertit dans un sens et dans l'autre.",
          "code": "import json\n\ndata = {\"nom\": \"Alice\", \"age\": 30}\ntexte = json.dumps(data)        # objet Python -> texte JSON\nretour = json.loads(texte)       # texte JSON -> objet Python\n\nwith open(\"data.json\", \"w\") as f:\n    json.dump(data, f)            # écrit directement dans un fichier"
        },
        {
          "t": "Environnement virtuel",
          "d": "Un dossier isolé où installer les bibliothèques d'UN SEUL projet, pour éviter que deux projets différents n'entrent en conflit s'ils ont besoin de versions différentes d'une même bibliothèque.",
          "code": "python -m venv env             # crée l'environnement dans le dossier \"env\"\nsource env/bin/activate         # active l'environnement (Linux/Mac)\nenv\\Scripts\\activate            # active l'environnement (Windows)\n\npip install requests             # installe une bibliothèque dans l'environnement actif\npip freeze > requirements.txt     # exporte la liste des bibliothèques installées"
        }
      ]
    }
  ]
};
