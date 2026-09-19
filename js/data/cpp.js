// Fiches de référence : C++
// Généré à partir du pense-bête — un objet par groupe de fiches.
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.cpp = {
  "id": "cpp",
  "label": "C++",
  "color": "var(--cpp-color)",
  "groups": [
    {
      "name": "Bases",
      "cards": [
        {
          "t": "Squelette d'un programme",
          "d": "La structure minimale qui compile : iostream donne accès à cout/cin pour afficher du texte et lire le clavier.",
          "code": "#include <iostream>\nusing namespace std;   // évite de préfixer std:: partout\n\nint main() {\n    cout << \"Bonjour\" << endl; // << envoie vers la sortie ; endl = retour à la ligne\n    return 0;\n}"
        },
        {
          "t": "Compilation (g++)",
          "d": "g++ est le programme qui transforme votre fichier .cpp (du texte) en un exécutable ; -std=c++17 précise quelle version du langage utiliser.",
          "code": "g++ -std=c++17 -Wall -o prog main.cpp\n./prog"
        },
        {
          "t": "Entrées / sorties",
          "d": "cout affiche du texte à l'écran, cin lit ce que l'utilisateur tape au clavier ; les << et >> indiquent le sens dans lequel circule l'information.",
          "code": "int age;\ncout << \"Age ? \";      // affiche sans retour à la ligne\ncin >> age;              // >> lit une valeur tapée au clavier\ncout << \"Vous avez \" << age << \" ans\" << endl;"
        },
        {
          "t": "Références",
          "d": "Un second nom pour une variable déjà existante : ce n'est pas une copie, donc modifier la référence modifie directement l'originale.",
          "code": "int x = 10;\nint &ref = x;    // ref désigne x, ce n'est pas une copie\nref = 20;         // modifie x aussi -> x vaut 20\n\nvoid increment(int &n) { n++; } // passage par référence : modifie l'argument original"
        }
      ]
    },
    {
      "name": "Opérateurs, conditions & boucles",
      "cards": [
        {
          "t": "Opérateurs",
          "d": "Les mêmes familles qu'en C : calculs (arithmétiques), comparaisons, et combinaisons de conditions (logiques).",
          "code": "a + b; a - b; a * b; a / b; a % b; // arithmétiques\na == b; a != b; a < b; a >= b;      // comparaison\na && b; a || b; !a;                  // logiques (ET, OU, NON)\na += 1; a *= 2;                       // affectation composée"
        },
        {
          "t": "Conditions",
          "d": "Exécute un bloc seulement si une condition est vraie, comme en C ; le ternaire est une version très courte pour les cas simples.",
          "code": "if (note >= 10) {\n    cout << \"Admis\" << endl;\n} else if (note >= 8) {\n    cout << \"Rattrapage\" << endl;\n} else {\n    cout << \"Recalé\" << endl;\n}\n\nstring resultat = (note >= 10) ? \"Admis\" : \"Recalé\"; // opérateur ternaire"
        },
        {
          "t": "Boucles",
          "d": "Répètent un bloc de code : for/while/do-while comme en C, plus le range-for qui parcourt directement chaque élément d'une collection.",
          "code": "for (int i = 0; i < 5; i++) { cout << i; }   // boucle classique par index\n\nint x = 5;\nwhile (x > 0) { x--; }                          // testée AVANT chaque tour\n\ndo { x++; } while (x < 3);                         // exécutée au moins une fois\n\nvector<int> v = {1, 2, 3};\nfor (int n : v) { cout << n << \" \"; }               // range-for : parcourt chaque élément"
        },
        {
          "t": "Tableaux statiques",
          "d": "Une suite de valeurs de même type, dont la taille est fixée une fois pour toutes au moment d'écrire le code.",
          "code": "int tab[5] = {1, 2, 3, 4, 5};\nint taille = sizeof(tab) / sizeof(tab[0]); // nombre d'éléments -> 5\n\nfor (int i = 0; i < taille; i++) {\n    cout << tab[i] << \" \";\n}"
        }
      ]
    },
    {
      "name": "Fonctions",
      "cards": [
        {
          "t": "Paramètres par défaut & surcharge",
          "d": "Un paramètre peut avoir une valeur automatique si on ne la fournit pas ; et plusieurs fonctions peuvent porter le même nom si leurs paramètres diffèrent.",
          "code": "int addition(int a, int b = 10) {  // b vaut 10 si non fourni\n    return a + b;\n}\naddition(5);       // 15 (utilise la valeur par défaut)\naddition(5, 2);     // 7\n\n// Surcharge : plusieurs fonctions avec le même nom, des paramètres différents\nint carre(int x) { return x * x; }\ndouble carre(double x) { return x * x; } // le compilateur choisit selon le type passé"
        },
        {
          "t": "Passage par valeur, référence ou pointeur",
          "d": "Trois façons de donner un argument à une fonction : une copie (aucun effet dehors), une référence, ou un pointeur (les deux modifient bien l'original).",
          "code": "void parValeur(int x) { x = 99; }        // reçoit une COPIE : n'affecte pas l'original\nvoid parReference(int &x) { x = 99; }     // modifie directement la variable d'origine\nvoid parPointeur(int *x) { *x = 99; }      // modifie via l'adresse, il faut déréférencer\n\nint n = 1;\nparValeur(n);     // n reste 1\nparReference(n);   // n devient 99\nparPointeur(&n);    // n devient 99 (on passe l'adresse avec &)"
        }
      ]
    },
    {
      "name": "Programmation orientée objet",
      "cards": [
        {
          "t": "Classes",
          "d": "Un modèle qui regroupe des données (les attributs) et les actions qu'on peut faire avec (les méthodes), pour créer des objets qui suivent ce modèle.",
          "code": "class Personne {\nprivate:                 // accessible seulement depuis la classe\n    string nom;\n    int age;\npublic:                  // accessible depuis l'extérieur\n    Personne(string n, int a) : nom(n), age(a) {} // constructeur\n    void afficher() {\n        cout << nom << \" a \" << age << \" ans\" << endl;\n    }\n};\n\nPersonne p(\"Alice\", 30); // appelle le constructeur\np.afficher();"
        },
        {
          "t": "Héritage & polymorphisme",
          "d": "Une classe peut réutiliser tout le comportement d'une autre (l'héritage) et redéfinir certaines de ses méthodes (le polymorphisme), pour adapter le comportement sans dupliquer le code.",
          "code": "class Animal {\npublic:\n    virtual void parler() { cout << \"...\" << endl; } // virtual : redéfinissable\n};\n\nclass Chien : public Animal {   // Chien hérite de Animal\npublic:\n    void parler() override { cout << \"Wouf\" << endl; } // override : redéfinit\n};\n\nAnimal *a = new Chien();\na->parler(); // affiche \"Wouf\" grâce au polymorphisme"
        }
      ]
    },
    {
      "name": "Bibliothèque standard (STL)",
      "cards": [
        {
          "t": "std::vector",
          "d": "Un tableau \"intelligent\" dont la taille peut grandir ou rétrécir pendant l'exécution, contrairement à un tableau classique de taille fixe.",
          "code": "#include <vector>\nvector<int> v = {1, 2, 3};\nv.push_back(4);     // ajoute 4 à la fin\nv.pop_back();        // retire le dernier élément\ncout << v.size() << endl; // nombre d'éléments actuel\n\nfor (int x : v) { cout << x << \" \"; }      // parcours simple (range-for)\nfor (size_t i = 0; i < v.size(); i++) { }   // parcours par index"
        },
        {
          "t": "std::string",
          "d": "Une chaîne de caractères qui gère sa taille toute seule (contrairement aux tableaux de char en C) et propose des méthodes prêtes à l'emploi.",
          "code": "#include <string>\nstring s = \"Bonjour\";\ns += \" monde\";                 // concaténation\ncout << s.length() << endl;     // nombre de caractères\ncout << s.substr(0, 3) << endl; // sous-chaîne de 3 caractères depuis l'index 0 -> \"Bon\"\nif (s.find(\"monde\") != string::npos) { } // npos = \"non trouvé\""
        },
        {
          "t": "std::map",
          "d": "Un dictionnaire qui associe une clé à une valeur (comme un carnet d'adresses nom -> numéro), toujours trié automatiquement par clé.",
          "code": "#include <map>\nmap<string, int> ages;\nages[\"Alice\"] = 30;   // insère ou remplace la valeur pour cette clé\nages[\"Bob\"] = 25;\n\nfor (auto &[nom, age] : ages) { // structured bindings (C++17)\n    cout << nom << \": \" << age << endl;\n}"
        },
        {
          "t": "std::set",
          "d": "Une collection qui garde ses valeurs triées et refuse automatiquement les doublons.",
          "code": "#include <set>\nset<int> s = {3, 1, 2, 1};  // doublons ignorés, trié -> {1, 2, 3}\ns.insert(4);\ns.erase(1);\nif (s.count(2)) { }          // count renvoie 1 (présent) ou 0 (absent)"
        },
        {
          "t": "std::pair",
          "d": "Un petit conteneur tout simple pour associer deux valeurs ensemble, éventuellement de types différents.",
          "code": "#include <utility>\npair<string, int> p = {\"Alice\", 30};\ncout << p.first << \" \" << p.second << endl; // .first / .second\n\nvector<pair<int,int>> points = {{1,2}, {3,4}};"
        },
        {
          "t": "Algorithmes <algorithm>",
          "d": "Des fonctions toutes prêtes qui font le travail répétitif habituel (trier, chercher, compter...) sur n'importe quel conteneur, pour éviter de réécrire une boucle à chaque fois.",
          "code": "#include <algorithm>\nvector<int> v = {5, 3, 1, 4};\n\nsort(v.begin(), v.end());                 // trie en place -> 1 3 4 5\nreverse(v.begin(), v.end());               // inverse l'ordre des éléments\nauto it = find(v.begin(), v.end(), 4);     // itérateur vers 4 (ou end() si absent)\nint n = count(v.begin(), v.end(), 3);      // nombre d'occurrences de 3\nint m = *max_element(v.begin(), v.end());  // plus grande valeur du conteneur"
        },
        {
          "t": "Lambdas",
          "d": "Une mini-fonction sans nom, écrite directement là où on en a besoin (par exemple pour dire à sort() comment comparer deux éléments).",
          "code": "auto carre = [](int x) { return x * x; }; // [] capture, () paramètres\ncout << carre(5) << endl; // 25\n\nvector<int> v = {4, 1, 3};\nsort(v.begin(), v.end(), [](int a, int b) {\n    return a > b;  // critère de tri : décroissant\n});"
        }
      ]
    },
    {
      "name": "Mémoire & gestion d'erreurs",
      "cards": [
        {
          "t": "new / delete",
          "d": "La version C++ pour réserver de la mémoire pendant l'exécution (new) et la rendre ensuite (delete) : chaque new doit avoir son delete, sans exception.",
          "code": "int *p = new int(42); // alloue un int initialisé à 42\ndelete p;               // libère la mémoire\n\nint *tab = new int[10]; // alloue un tableau de 10 int\ndelete[] tab;             // [] obligatoire pour libérer un tableau"
        },
        {
          "t": "Pointeurs intelligents",
          "d": "unique_ptr se comporte comme un pointeur normal, mais libère automatiquement sa mémoire tout seul quand on n'en a plus besoin : plus besoin de penser à delete.",
          "code": "#include <memory>\nunique_ptr<int> p = make_unique<int>(42);\ncout << *p << endl;\n// libéré automatiquement à la fin du scope, pas besoin de delete"
        },
        {
          "t": "try / catch",
          "d": "Permet d'intercepter une erreur survenue pendant l'exécution (par exemple une division par zéro) et d'y réagir, plutôt que de laisser le programme planter.",
          "code": "#include <stdexcept>\n\ntry {\n    if (diviseur == 0)\n        throw runtime_error(\"Division par zéro\"); // déclenche l'exception\n    resultat = a / diviseur;\n} catch (const runtime_error &e) {\n    cout << \"Erreur : \" << e.what() << endl; // .what() donne le message\n}"
        }
      ]
    },
    {
      "name": "Erreurs fréquentes",
      "cards": [
        {
          "t": "Fuite mémoire (memory leak)",
          "d": "Oublier de rendre une mémoire réservée avec new laisse cette place occupée pour rien jusqu'à la fin du programme, sans qu'on puisse plus jamais s'en servir.",
          "code": "void fuite() {\n    int *p = new int(42);\n    // ... du code ...\n    // pas de delete p; -> la mémoire n'est JAMAIS libérée\n}\n// Appelée 1000 fois, cette fonction \"fuit\" 1000 int inutilement.\n// Solution moderne : préférer unique_ptr/shared_ptr qui libèrent automatiquement."
        },
        {
          "t": "Oublier & sur une référence, copier au lieu de modifier",
          "d": "Sans le symbole &, un paramètre censé être une référence devient en fait une simple copie : modifier cette copie ne change rien à la variable d'origine.",
          "code": "void incrementer(int x) {      // BUG probable : x est une copie\n    x++;\n}\nint n = 5;\nincrementer(n);\ncout << n;                        // affiche toujours 5, pas 6 !\n\nvoid incrementerBis(int &x) {   // & : référence, modifie bien l'original\n    x++;\n}"
        },
        {
          "t": "Comparer des string avec ==, mais oublier la casse",
          "d": "== compare le texte lettre par lettre, sans tenir compte de la casse : \"Bonjour\" et \"bonjour\" sont considérés comme différents.",
          "code": "string a = \"Bonjour\";\nstring b = \"bonjour\";\nif (a == b) { /* jamais exécuté : la casse diffère */ }\n\n// Comparaison insensible à la casse (approche simple) :\n#include <algorithm>\nstring minuscule(string s) {\n    transform(s.begin(), s.end(), s.begin(), ::tolower);\n    return s;\n}\nif (minuscule(a) == minuscule(b)) { /* vrai cette fois */ }"
        }
      ]
    },
    {
      "name": "Templates & espaces de noms",
      "cards": [
        {
          "t": "Fonction générique (template)",
          "d": "Écrire une seule fois une fonction qui marchera avec n'importe quel type (int, double, string...) : le compilateur génère la bonne version selon ce qu'on lui donne.",
          "code": "template <typename T>\nT maximum(T a, T b) {\n    return (a > b) ? a : b;\n}\n\ncout << maximum(3, 7) << endl;     // T déduit à int\ncout << maximum(2.5, 1.1) << endl; // T déduit à double"
        },
        {
          "t": "namespace",
          "d": "Un espace de noms permet d'éviter les conflits quand deux bibliothèques différentes utilisent le même nom de fonction.",
          "code": "namespace maths {\n    int carre(int x) { return x * x; }\n}\n\ncout << maths::carre(4) << endl; // accès explicite via ::\nusing namespace maths;             // ensuite, accès direct sans préfixe"
        }
      ]
    }
  ]
};
