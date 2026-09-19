// Fiches de référence : C
// Généré à partir du pense-bête — un objet par groupe de fiches.
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.c = {
  "id": "c",
  "label": "C",
  "color": "var(--c-color)",
  "groups": [
    {
      "name": "Bases & compilation",
      "cards": [
        {
          "t": "Squelette d'un programme",
          "d": "Le point de départ obligatoire de tout programme en C : l'exécution commence toujours dans la fonction main(), ligne par ligne, jusqu'au return.",
          "code": "#include <stdio.h>       // importe les fonctions d'entrée/sortie (printf, etc.)\n\nint main(void) {          // point d'entrée du programme, renvoie un entier\n    printf(\"Bonjour\\n\");  // \\n = retour à la ligne\n    return 0;              // 0 signifie \"succès\" pour le système d'exploitation\n}"
        },
        {
          "t": "Types & tailles",
          "d": "Avant de créer une variable, il faut annoncer quel genre de valeur elle va contenir (un nombre entier, un nombre à virgule, un seul caractère...) : c'est son \"type\".",
          "code": "int      a;      // entier, généralement 4 octets\nshort    b;      // entier court, au moins 2 octets\nlong     c;      // entier long, au moins 4 octets (souvent 8)\nfloat    d;      // nombre à virgule, simple précision (4 o)\ndouble   e;      // nombre à virgule, double précision (8 o), plus précis\nchar     f;      // un seul caractère, 1 octet\nunsigned int g;  // entier non signé : uniquement positif ou nul\nsize_t   n;      // type non signé utilisé pour les tailles (sizeof, etc.)"
        },
        {
          "t": "Constantes",
          "d": "Une valeur qu'on protège contre toute modification accidentelle plus loin dans le programme : le compilateur refuse purement et simplement de compiler si on essaie d'y toucher.",
          "code": "const double PI = 3.14159; // le compilateur refuse toute modification\n// PI = 3;                  // erreur de compilation"
        },
        {
          "t": "Compilation (gcc)",
          "d": "gcc est le programme qui transforme votre fichier texte (.c) en un vrai exécutable que l'ordinateur peut lancer ; c'est une étape obligatoire en C.",
          "code": "gcc -Wall -Wextra -g -o prog main.c\n# -Wall -Wextra : affiche un maximum d'avertissements\n# -g            : ajoute les infos de débogage (pour gdb)\n# -o prog       : nomme l'exécutable \"prog\"\n\n./prog          # lance le programme compilé\n\ngcc main.c -o prog -lm   # -lm : lie la bibliothèque mathématique (math.h)"
        }
      ]
    },
    {
      "name": "Entrées / sorties",
      "cards": [
        {
          "t": "printf — formats",
          "d": "printf affiche du texte à l'écran ; chaque %quelquechose dans la chaîne est un emplacement réservé qui indique le TYPE de valeur à afficher à cet endroit précis.",
          "code": "printf(\"%d\\n\", 42);        // %d : entier (int)\nprintf(\"%f\\n\", 3.14);      // %f : flottant, 6 décimales par défaut\nprintf(\"%.2f\\n\", 3.14159); // %.2f : flottant avec 2 décimales -> 3.14\nprintf(\"%s\\n\", \"texte\");   // %s : chaîne de caractères\nprintf(\"%c\\n\", 'A');       // %c : un seul caractère\nprintf(\"%x\\n\", 255);       // %x : hexadécimal -> ff\nprintf(\"%p\\n\", (void*)&a); // %p : adresse mémoire"
        },
        {
          "t": "scanf — lecture clavier",
          "d": "scanf lit ce que l'utilisateur tape au clavier et le range dans une variable. Il a besoin de savoir à quelle ADRESSE mémoire écrire le résultat, d'où le & devant le nom de la variable.",
          "code": "int age;\nscanf(\"%d\", &age);        // & : on donne l'adresse pour que scanf puisse écrire dedans\n\nchar nom[50];\nscanf(\"%49s\", nom);       // pas de & : un tableau est déjà une adresse\n                           // %49s limite la lecture pour éviter un débordement"
        },
        {
          "t": "Autres fonctions utiles",
          "d": "Des raccourcis plus simples que printf/scanf, pratiques quand on n'a besoin que d'afficher ou de lire un seul caractère ou une seule ligne de texte.",
          "code": "puts(\"Une ligne\");        // affiche une chaîne + retour à la ligne automatique\nint c = getchar();        // lit un seul caractère au clavier\nputchar('A');              // affiche un seul caractère"
        }
      ]
    },
    {
      "name": "Opérateurs",
      "cards": [
        {
          "t": "Arithmétiques & incrémentation",
          "d": "Les calculs de base qu'on utilise tout le temps. ++ et -- sont juste un raccourci d'écriture pour \"ajouter 1\" ou \"retirer 1\" à une variable.",
          "code": "int a = 7, b = 2;\na + b;   // addition -> 9\na - b;   // soustraction -> 5\na * b;   // multiplication -> 14\na / b;   // division ENTIÈRE (deux int) -> 3, pas 3.5\na % b;   // modulo : reste de la division -> 1\n\na++;     // post-incrémente : utilise a, PUIS ajoute 1\n++a;     // pré-incrémente : ajoute 1, PUIS utilise a\na--; --a; // mêmes règles pour décrémenter"
        },
        {
          "t": "Comparaison & logique",
          "d": "Ces opérateurs répondent à une question par vrai ou faux (1 ou 0 en C), et peuvent combiner plusieurs questions à la fois avec ET / OU / NON.",
          "code": "a == b;  // égal à\na != b;  // différent de\na > b; a >= b; a < b; a <= b; // comparaisons classiques\n\n(a > 0) && (b > 0);  // ET logique : vrai si LES DEUX sont vrais\n(a > 0) || (b > 0);  // OU logique : vrai si AU MOINS UN est vrai\n!(a > 0);            // NON logique : inverse le résultat"
        },
        {
          "t": "Affectation composée",
          "d": "Un raccourci d'écriture : au lieu de répéter deux fois le nom de la variable, on la modifie directement à partir de sa propre valeur.",
          "code": "a += 5;  // équivaut à : a = a + 5\na -= 2;  // a = a - 2\na *= 3;  // a = a * 3\na /= 2;  // a = a / 2\na %= 3;  // a = a % 3"
        },
        {
          "t": "Bits (opérateurs binaires)",
          "d": "Ces opérateurs travaillent directement sur les 0 et les 1 qui composent un nombre en mémoire. Rarement utiles au quotidien, sauf pour l'optimisation ou la gestion de \"drapeaux\" (options combinées dans un seul nombre).",
          "code": "a & b;   // ET binaire, bit à bit\na | b;   // OU binaire, bit à bit\na ^ b;   // OU exclusif (XOR)\n~a;      // complément : inverse tous les bits\na << 2;  // décale les bits à gauche -> multiplie par 4\na >> 1;  // décale les bits à droite -> divise par 2"
        }
      ]
    },
    {
      "name": "Contrôle & fonctions",
      "cards": [
        {
          "t": "Conditions",
          "d": "Permet de n'exécuter un bloc de code que si une condition est vraie, et un autre bloc à la place sinon.",
          "code": "if (x > 0) {\n    // exécuté si x > 0\n} else if (x == 0) {\n    // exécuté si x == 0\n} else {\n    // exécuté sinon (x < 0)\n}"
        },
        {
          "t": "switch",
          "d": "Une autre façon d'écrire plusieurs if/else if quand on compare toujours la MÊME variable à des valeurs précises : plus lisible dans ce cas particulier.",
          "code": "switch (jour) {\n    case 1:\n        printf(\"Lundi\\n\");\n        break;          // sans break, l'exécution \"tombe\" dans le cas suivant\n    case 2:\n        printf(\"Mardi\\n\");\n        break;\n    default:\n        printf(\"Autre\\n\"); // exécuté si aucun \"case\" ne correspond\n}"
        },
        {
          "t": "Opérateur ternaire",
          "d": "Une façon très courte d'écrire un if/else quand celui-ci ne fait que choisir entre deux valeurs.",
          "code": "int max = (a > b) ? a : b;\n// se lit : si (a > b) alors max = a, sinon max = b"
        },
        {
          "t": "Boucles",
          "d": "Répètent un bloc de code plusieurs fois sans avoir à le recopier. for convient quand on connaît le nombre de répétitions ; while/do-while quand on répète tant qu'une condition reste vraie.",
          "code": "for (int i = 0; i < 10; i++) {\n    // initialisation; condition; pas — exécuté 10 fois (i = 0..9)\n}\n\nwhile (cond) {\n    // testé AVANT chaque tour ; peut ne jamais s'exécuter\n}\n\ndo {\n    // exécuté au moins UNE fois, testé après\n} while (cond);\n\n// break; sort de la boucle immédiatement\n// continue; passe directement au tour suivant"
        },
        {
          "t": "Fonctions",
          "d": "Un bloc de code auquel on donne un nom, pour pouvoir l'appeler autant de fois qu'on veut au lieu de recopier le même code à plusieurs endroits.",
          "code": "int addition(int a, int b) {  // reçoit deux int, renvoie un int\n    return a + b;               // termine la fonction et renvoie la valeur\n}\n\n// prototype : à mettre avant main() si la fonction est définie après\nint addition(int a, int b);"
        },
        {
          "t": "Portée des variables",
          "d": "Indique où une variable \"existe\" dans le code, et pendant combien de temps elle garde sa valeur : locale (dans un bloc), globale (tout le fichier), ou static (mémorisée entre les appels).",
          "code": "int compteurGlobal = 0;  // variable globale : visible dans tout le fichier, à éviter si possible\n\nvoid f() {\n    int x = 5;             // variable locale : n'existe que pendant l'exécution de f()\n}                          // x est détruite ici, à la fin du bloc\n\nvoid compter() {\n    static int appels = 0; // static : garde sa valeur d'un appel à l'autre (contrairement à x)\n    appels++;\n    printf(\"%d\\n\", appels); // affiche 1, puis 2, puis 3... à chaque appel\n}"
        },
        {
          "t": "Récursivité",
          "d": "Une fonction qui s'appelle elle-même pour résoudre un problème plus petit à chaque fois, jusqu'à atteindre un cas très simple (le \"cas de base\") qui arrête tout.",
          "code": "int factorielle(int n) {\n    if (n <= 1) return 1;         // cas de base : arrête la récursion, INDISPENSABLE\n    return n * factorielle(n - 1); // cas récursif : appelle la fonction sur un problème plus petit\n}\n\nfactorielle(4); // 4 * factorielle(3) -> 4 * 3 * factorielle(2) -> ... -> 4*3*2*1 = 24\n// Sans cas de base (ou mal écrit) : la fonction s'appelle indéfiniment\n// jusqu'à un crash (\"stack overflow\")."
        }
      ]
    },
    {
      "name": "Erreurs fréquentes & débogage",
      "cards": [
        {
          "t": "= au lieu de ==",
          "d": "L'erreur classique numéro un en C : = sert à donner une valeur, == sert à comparer. Les confondre dans un if compile sans erreur, mais ne fait pas ce qu'on croit.",
          "code": "int x = 5;\n\nif (x = 10) {       // BUG : affecte 10 à x (toujours \"vrai\" car 10 != 0)\n    // exécuté à chaque fois, même si l'intention était de tester x == 10\n}\n\nif (x == 10) {      // correct : compare x à 10\n    // ...\n}\n// Astuce : certains habituent à écrire \"if (10 == x)\" pour que le compilateur\n// signale l'erreur si on tape par mégarde un seul \"=\"."
        },
        {
          "t": "Variable non initialisée",
          "d": "En C, une variable locale à qui on n'a jamais donné de valeur ne vaut PAS 0 : elle contient ce qui traînait déjà à cet endroit en mémoire, une valeur imprévisible.",
          "code": "int total;              // ATTENTION : contient n'importe quoi, pas 0 !\nfor (int i = 0; i < 5; i++) {\n    total += i;          // additionne à une valeur imprévisible -> résultat faux\n}\n\nint total2 = 0;          // toujours initialiser explicitement\nfor (int i = 0; i < 5; i++) {\n    total2 += i;          // résultat correct et reproductible\n}"
        },
        {
          "t": "Segmentation fault : les causes classiques",
          "d": "Un \"segfault\" survient quand le programme essaie d'accéder à une zone mémoire qu'il n'a pas le droit de toucher : le système d'exploitation l'arrête de force pour se protéger.",
          "code": "int *p;\n*p = 5;                  // p pointe n'importe où (non initialisé) -> crash\n\nint *q = malloc(sizeof(int));\nfree(q);\n*q = 5;                  // use-after-free : q a été libéré -> crash ou bug silencieux\n\nint tab[5];\ntab[10] = 1;              // dépassement de tableau : écrit hors de la zone allouée\n\n// Réflexe utile : compiler avec -fsanitize=address pour détecter ces bugs à l'exécution\n// gcc -fsanitize=address -g -o prog main.c"
        },
        {
          "t": "Oublier le break dans un switch",
          "d": "Sans break, une fois qu'un case correspond, l'exécution continue automatiquement dans le case suivant, qu'on le veuille ou non.",
          "code": "switch (note) {\n    case 5:\n        printf(\"Parfait\\n\"); // sans break, tombe aussi dans le case 4 !\n    case 4:\n        printf(\"Bien\\n\");\n        break;                // ici, arrête bien l'exécution\n    default:\n        printf(\"Autre\\n\");\n}\n// Avec note = 5, ce code affiche à tort \"Parfait\" PUIS \"Bien\"."
        },
        {
          "t": "Déboguer avec printf (ou gdb)",
          "d": "La méthode la plus simple pour comprendre un bug : afficher l'état des variables à des endroits précis du programme pour voir où ça part en vrille.",
          "code": "printf(\"DEBUG: x=%d, y=%d\\n\", x, y); // affiche l'état à un endroit précis\n\n// Pour aller plus loin, un débogueur permet d'exécuter pas à pas :\n// gcc -g -o prog main.c   (-g garde les infos de débogage)\n// gdb ./prog\n// (gdb) break main        -> pose un point d'arrêt sur main\n// (gdb) run                -> lance le programme\n// (gdb) next / step         -> avance ligne par ligne\n// (gdb) print x              -> affiche la valeur de x à cet instant"
        }
      ]
    },
    {
      "name": "Tableaux & chaînes",
      "cards": [
        {
          "t": "Tableaux",
          "d": "Une boîte qui contient plusieurs valeurs du même type, rangées les unes après les autres. Chaque valeur a un numéro (son index), et le premier index est toujours 0.",
          "code": "int valeurs[3] = {10, 20, 30}; // taille fixée à la déclaration\nvaleurs[0] = 15;                // modifie le 1er élément\n\nfor (int i = 0; i < 3; i++) {\n    printf(\"%d\\n\", valeurs[i]); // parcours classique par index\n}\n\nint grille[2][3] = {{1,2,3}, {4,5,6}}; // tableau 2D : 2 lignes, 3 colonnes\ngrille[1][2]; // -> 6"
        },
        {
          "t": "Chaînes de caractères",
          "d": "En C, un mot ou une phrase n'est rien d'autre qu'un tableau de caractères, terminé par un caractère spécial et invisible ('\\0') qui marque la fin du texte.",
          "code": "#include <string.h>\n\nchar mot[20] = \"Bonjour\";  // se termine automatiquement par '\\0'\nstrlen(mot);                 // longueur SANS le '\\0' -> 7\nstrcpy(mot, \"Salut\");        // copie une chaîne dans mot (écrase le contenu)\nstrcat(mot, \" !\");           // concatène à la fin de mot\nstrcmp(mot, \"Salut !\");      // compare : renvoie 0 si les chaînes sont égales"
        }
      ]
    },
    {
      "name": "Enums & unions",
      "cards": [
        {
          "t": "Énumérations",
          "d": "Donnent un nom lisible à chaque valeur possible d'une liste (les jours de la semaine, par exemple), plutôt que de manipuler des nombres bruts difficiles à comprendre.",
          "code": "typedef enum {\n    LUNDI,    // vaut 0 par défaut\n    MARDI,    // vaut 1\n    MERCREDI  // vaut 2, et ainsi de suite\n} Jour;\n\nJour aujourdhui = MARDI;\nif (aujourdhui == MARDI) { /* ... */ }"
        },
        {
          "t": "Unions",
          "d": "Une structure spéciale où tous les champs partagent la même case mémoire : on ne peut en utiliser qu'un seul à la fois, contrairement à une structure classique.",
          "code": "union Valeur {\n    int i;\n    float f;\n    char c[4];\n};\n\nunion Valeur v;\nv.i = 42;        // écrit dans la mémoire partagée\nprintf(\"%d\", v.i);"
        }
      ]
    },
    {
      "name": "Pointeurs & mémoire",
      "cards": [
        {
          "t": "Pointeurs",
          "d": "Une variable un peu spéciale : au lieu de contenir directement une valeur, elle contient l'ADRESSE en mémoire où se trouve une autre variable.",
          "code": "int x = 10;\nint *p = &x;    // &x : adresse de x ; p pointe vers x\n*p = 20;        // *p : déréférencement, accède à la valeur pointée -> modifie x\nprintf(\"%d\", *p); // affiche 20"
        },
        {
          "t": "Allocation dynamique",
          "d": "Demander de la mémoire supplémentaire pendant que le programme tourne, par exemple pour un tableau dont on ne connaît pas la taille à l'avance. On doit la rendre soi-même avec free() une fois qu'on n'en a plus besoin.",
          "code": "int *tab = malloc(5 * sizeof(int)); // réserve la place pour 5 int\nif (tab == NULL) { /* échec d'allocation */ }\n\ntab[0] = 1;       // s'utilise comme un tableau normal\nfree(tab);         // rend la mémoire au système\ntab = NULL;         // évite un pointeur \"pendouillant\" (use-after-free)"
        },
        {
          "t": "Structures",
          "d": "Un moyen de regrouper plusieurs informations liées sous un seul nom, par exemple les coordonnées x et y d'un point.",
          "code": "typedef struct {\n    int x;\n    int y;\n} Point;\n\nPoint p = {1, 2};   // initialisation directe\np.x = 5;              // accès avec le point (variable classique)\n\nPoint *ptr = &p;\nptr->x = 10;          // -> équivaut à (*ptr).x, pour un pointeur"
        }
      ]
    },
    {
      "name": "Préprocesseur",
      "cards": [
        {
          "t": "Includes & macros",
          "d": "Des instructions traitées AVANT même la compilation : #include copie le contenu d'un autre fichier ici, #define remplace un mot par un texte partout où il apparaît.",
          "code": "#include <stdio.h>       // fichier système, entre chevrons\n#include \"monfichier.h\"   // fichier local du projet, entre guillemets\n\n#define PI 3.14159          // constante textuelle : remplacée partout\n#define CARRE(x) ((x)*(x))  // macro avec paramètre\n\nprintf(\"%f\\n\", PI);\nprintf(\"%d\\n\", CARRE(5));   // remplacé par ((5)*(5)) avant compilation"
        },
        {
          "t": "Compilation conditionnelle",
          "d": "Permet d'inclure ou d'exclure des morceaux de code selon qu'une certaine option est activée ou non, sans avoir à les supprimer physiquement du fichier.",
          "code": "#define DEBUG\n\n#ifdef DEBUG\n    printf(\"Mode debug\\n\"); // compilé seulement si DEBUG est défini\n#endif\n\n#ifndef MAX\n    #define MAX 100          // défini seulement si MAX n'existe pas déjà\n#endif"
        }
      ]
    },
    {
      "name": "Fichiers",
      "cards": [
        {
          "t": "Lecture / écriture",
          "d": "Les quatre étapes classiques pour travailler avec un fichier : l'ouvrir avec fopen, lire ou écrire dedans, puis toujours le refermer avec fclose.",
          "code": "FILE *f = fopen(\"data.txt\", \"w\"); // \"w\" = écriture (écrase le fichier existant)\nif (f) {\n    fprintf(f, \"valeur: %d\\n\", 42); // comme printf, mais vers un fichier\n    fclose(f);                        // toujours fermer après usage\n}\n\nFILE *g = fopen(\"data.txt\", \"r\"); // \"r\" = lecture\nchar ligne[100];\nwhile (fgets(ligne, sizeof(ligne), g)) { // lit ligne par ligne jusqu'à la fin\n    printf(\"%s\", ligne);\n}\nfclose(g);"
        },
        {
          "t": "Modes & positionnement",
          "d": "D'autres façons d'ouvrir un fichier (lecture, écriture, ajout...) et comment se déplacer à un endroit précis à l'intérieur, plutôt que de le lire du début à la fin.",
          "code": "// \"r\" lecture   \"w\" écriture (écrase)   \"a\" ajout à la fin\n// \"r+\" lecture+écriture   \"rb\"/\"wb\" mode binaire\n\nfseek(f, 0, SEEK_SET); // replace le curseur au début du fichier\nlong pos = ftell(f);    // position actuelle dans le fichier\nrewind(f);               // raccourci pour revenir au début"
        }
      ]
    }
  ]
};
