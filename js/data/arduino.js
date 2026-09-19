// Fiches de référence : Arduino
// Généré à partir du pense-bête — un objet par groupe de fiches.
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.arduino = {
  "id": "arduino",
  "label": "Arduino",
  "color": "var(--arduino-color)",
  "groups": [
    {
      "name": "Structure",
      "cards": [
        {
          "t": "Squelette d'un sketch",
          "d": "Tout programme Arduino (\"sketch\") a exactement ces deux fonctions : setup() s'exécute UNE seule fois au démarrage, puis loop() tourne encore et encore, sans jamais s'arrêter.",
          "code": "void setup() {\n    Serial.begin(9600);   // démarre la communication série à 9600 bauds\n    pinMode(13, OUTPUT);   // configure la broche 13 en sortie\n}\n\nvoid loop() {\n    digitalWrite(13, HIGH); // allume (5V ou 3.3V selon la carte)\n    delay(1000);              // pause de 1000 ms = 1 seconde (bloquante)\n    digitalWrite(13, LOW);    // éteint (0V)\n    delay(1000);\n}"
        }
      ]
    },
    {
      "name": "Bien démarrer",
      "cards": [
        {
          "t": "Téléverser un programme",
          "d": "\"Téléverser\" veut dire envoyer le code compilé sur la carte physique. Voici les étapes à suivre avant que le programme ne tourne réellement dessus.",
          "code": "// 1. Brancher la carte en USB\n// 2. Dans l'IDE Arduino : Outils > Type de carte -> choisir son modèle (ex: Uno)\n// 3. Outils > Port -> choisir le port série où la carte est détectée\n// 4. Cliquer sur la flèche \"Téléverser\" (ou Ctrl+U)\n//    -> compile le sketch PUIS l'envoie sur la carte via USB\n\n// Si \"Port\" est grisé : câble USB \"charge seule\" (pas de données),\n// pilote manquant, ou carte non reconnue -> essayer un autre câble/port."
        },
        {
          "t": "Bien nommer ses broches",
          "d": "Donner un nom à un numéro de broche plutôt que d'écrire le chiffre brut partout : le code se lit plus facilement et se modifie en un seul endroit si le câblage change.",
          "code": "const int BROCHE_LED = 13;     // plutôt que digitalWrite(13, HIGH) partout\nconst int BROCHE_BOUTON = 2;\n\nvoid setup() {\n    pinMode(BROCHE_LED, OUTPUT);\n    pinMode(BROCHE_BOUTON, INPUT_PULLUP);\n}\nvoid loop() {\n    digitalWrite(BROCHE_LED, HIGH); // on comprend immédiatement ce que ça allume\n}"
        }
      ]
    },
    {
      "name": "Entrées / sorties",
      "cards": [
        {
          "t": "Numérique",
          "d": "Une broche numérique ne connaît que deux états : HIGH (allumé/vrai) ou LOW (éteint/faux). pinMode choisit si elle sert à lire ou à écrire.",
          "code": "pinMode(2, INPUT);    // broche 2 configurée en entrée\npinMode(13, OUTPUT);   // broche 13 configurée en sortie\n\nint etat = digitalRead(2); // lit HIGH (1) ou LOW (0)\ndigitalWrite(13, HIGH);      // écrit HIGH ou LOW"
        },
        {
          "t": "Analogique",
          "d": "Contrairement au numérique (tout ou rien), l'analogique gère des valeurs intermédiaires : analogRead mesure une tension précise, analogWrite simule une sortie variable.",
          "code": "int val = analogRead(A0); // lit une tension sur A0, renvoie 0 à 1023\nanalogWrite(9, 128);        // PWM sur une broche marquée ~, de 0 à 255"
        },
        {
          "t": "map() & constrain()",
          "d": "map() convertit une valeur d'une échelle vers une autre (ex : 0-1023 vers 0-100) ; constrain() empêche un résultat de sortir d'une plage donnée.",
          "code": "int brut = analogRead(A0);                  // 0 à 1023\nint pourcent = map(brut, 0, 1023, 0, 100);   // reconvertit en 0-100\n\nint v = constrain(pourcent, 0, 100); // force v à rester entre 0 et 100"
        },
        {
          "t": "Moniteur série",
          "d": "Un moyen d'envoyer du texte depuis la carte vers l'écran de l'ordinateur (via le câble USB), très utile pour voir ce qui se passe pendant l'exécution.",
          "code": "Serial.begin(9600);\nSerial.print(\"valeur = \");   // affiche sans retour à la ligne\nSerial.println(val);          // affiche puis passe à la ligne suivante\n\nif (Serial.available() > 0) { // vrai s'il y a des données reçues à lire\n    char c = Serial.read();     // lit un caractère envoyé par l'ordinateur\n}"
        }
      ]
    },
    {
      "name": "Temps & aléatoire",
      "cards": [
        {
          "t": "delay() vs millis()",
          "d": "delay() met tout le programme en pause, y compris la lecture des boutons ou capteurs. millis() donne juste l'heure actuelle, ce qui permet de continuer à travailler pendant l'attente.",
          "code": "unsigned long precedent = 0;\nconst long intervalle = 1000; // 1000 ms entre deux actions\n\nvoid loop() {\n    unsigned long maintenant = millis(); // temps écoulé depuis le démarrage (ms)\n    if (maintenant - precedent >= intervalle) {\n        precedent = maintenant;\n        // action périodique exécutée sans bloquer le reste du programme\n    }\n}"
        },
        {
          "t": "random()",
          "d": "Génère un nombre \"au hasard\" (en réalité calculé, donc pas vraiment aléatoire, mais imprévisible en pratique).",
          "code": "randomSeed(analogRead(A5)); // initialise le générateur avec une valeur \"bruitée\"\nlong n = random(10);          // entier entre 0 et 9\nlong m = random(1, 7);         // entier entre 1 et 6 (comme un dé)"
        },
        {
          "t": "tone() & pulseIn()",
          "d": "tone() fait sonner un petit haut-parleur (buzzer) à une fréquence donnée ; pulseIn() mesure combien de temps dure un signal électrique.",
          "code": "tone(8, 440);        // joue un La à 440 Hz sur la broche 8\ndelay(500);\nnoTone(8);             // arrête le son\n\nlong duree = pulseIn(7, HIGH); // durée en µs pendant laquelle la broche 7 reste HIGH"
        }
      ]
    },
    {
      "name": "Composants courants",
      "cards": [
        {
          "t": "Bouton (résistance pull-up interne)",
          "d": "INPUT_PULLUP active une petite résistance déjà présente dans la carte, pour éviter d'en ajouter une soi-même sur le circuit. Le bouton relie alors la broche à la masse (GND) quand on appuie.",
          "code": "pinMode(2, INPUT_PULLUP); // niveau HIGH par défaut, sans composant externe\n\nvoid loop() {\n    if (digitalRead(2) == LOW) { // LOW = bouton appuyé (relié au GND)\n        // action\n    }\n}"
        },
        {
          "t": "Servo-moteur",
          "d": "Un servo-moteur tourne vers un angle précis (entre 0° et 180°) plutôt que de tourner en continu ; la bibliothèque Servo le pilote facilement.",
          "code": "#include <Servo.h>\nServo monServo;\n\nvoid setup() {\n    monServo.attach(9); // relie l'objet à la broche 9 (PWM)\n}\nvoid loop() {\n    monServo.write(90); // positionne le servo entre 0° et 180°\n}"
        },
        {
          "t": "Capteurs analogiques courants",
          "d": "Potentiomètre, photorésistance (capteur de lumière) ou capteur de température : tous fonctionnent de la même façon, en renvoyant une tension qu'on lit avec analogRead.",
          "code": "int val = analogRead(A0);           // 0 (0V) à 1023 (5V ou 3.3V selon la carte)\nfloat tension = val * (5.0 / 1023.0); // convertit en volts\n\n// Exemple : capteur de température LM35 (10 mV par °C)\nfloat temperatureC = tension * 100.0;"
        },
        {
          "t": "Écran LCD I2C",
          "d": "Afficher du texte sur un petit écran physique, en ne branchant que 2 fils grâce au protocole I2C (au lieu d'une dizaine de fils sans ce module).",
          "code": "#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27, 16, 2); // adresse I2C, 16 colonnes, 2 lignes\n\nvoid setup() {\n    lcd.init();\n    lcd.backlight();       // allume le rétroéclairage\n    lcd.setCursor(0, 0);    // colonne 0, ligne 0\n    lcd.print(\"Bonjour !\"); // affiche du texte à cet endroit\n}"
        }
      ]
    },
    {
      "name": "Erreurs fréquentes",
      "cards": [
        {
          "t": "Blink qui ne clignote jamais / clignote trop vite",
          "d": "Le piège classique du débutant : delay() compte en millisecondes, pas en secondes. Et une LED branchée à l'envers reste éteinte quoi qu'il arrive.",
          "code": "delay(1000);   // 1000 ms = 1 seconde ; delay(1) ne dure qu'une milliseconde !\n\n// Une LED câblée \"à l'envers\" (cathode vers +) reste éteinte quoi qu'il arrive :\n// vérifier le sens de la LED (patte longue = +) si rien ne s'allume."
        },
        {
          "t": "Bouton qui \"rebondit\" (faux appuis multiples)",
          "d": "Un bouton mécanique n'est pas parfait : il génère plusieurs micro-vibrations électriques en un seul appui, ce qui peut être compté à tort comme plusieurs clics.",
          "code": "// Solution simple : ignorer les changements trop rapprochés (anti-rebond / debounce)\nunsigned long dernierAppui = 0;\n\nvoid loop() {\n    if (digitalRead(2) == LOW && millis() - dernierAppui > 200) {\n        dernierAppui = millis(); // mémorise l'instant de cet appui valide\n        // action déclenchée par l'appui\n    }\n}"
        },
        {
          "t": "Alimenter un moteur/servo directement depuis la carte",
          "d": "Une broche Arduino ne peut fournir qu'un tout petit courant électrique : un moteur en demande beaucoup plus et peut endommager la carte si on le branche directement dessus.",
          "code": "// À NE PAS FAIRE : brancher un moteur directement sur une broche numérique\n// digitalWrite(9, HIGH); -> moteur branché en direct : risque de griller la broche\n\n// Bonne pratique : passer par un transistor, un module driver (L298N, etc.)\n// ou une alimentation externe dédiée au moteur, avec une masse (GND) commune."
        }
      ]
    },
    {
      "name": "Communication & interruptions",
      "cards": [
        {
          "t": "I2C (bibliothèque Wire)",
          "d": "Un protocole qui permet à la carte de dialoguer avec plusieurs capteurs ou modules en utilisant seulement 2 fils (au lieu d'un fil dédié par appareil).",
          "code": "#include <Wire.h>\n\nvoid setup() {\n    Wire.begin();   // démarre le bus I2C en mode maître\n}\nvoid loop() {\n    Wire.beginTransmission(0x3C); // adresse I2C du périphérique\n    Wire.write(0x00);              // envoie un octet de données\n    Wire.endTransmission();         // termine et envoie réellement les données\n}"
        },
        {
          "t": "attachInterrupt()",
          "d": "Permet de réagir INSTANTANÉMENT à un événement (comme un signal qui change), sans attendre que loop() en soit à ce moment-là dans son cycle.",
          "code": "volatile bool declenche = false; // volatile : peut changer pendant une interruption\n\nvoid setup() {\n    pinMode(2, INPUT_PULLUP);\n    // appelle surChangement() quand le signal descend (FALLING) sur la broche 2\n    attachInterrupt(digitalPinToInterrupt(2), surChangement, FALLING);\n}\nvoid surChangement() {\n    declenche = true; // rester très court : pas de delay() ni Serial dans une interruption\n}"
        }
      ]
    },
    {
      "name": "Mémoire",
      "cards": [
        {
          "t": "EEPROM",
          "d": "Une petite mémoire spéciale qui garde les valeurs écrites dedans même quand la carte est débranchée, contrairement aux variables normales qui s'effacent.",
          "code": "#include <EEPROM.h>\n\nEEPROM.write(0, 123);      // écrit l'octet 123 à l'adresse mémoire 0\nint val = EEPROM.read(0);   // relit la valeur stockée (0 à 255)"
        }
      ]
    }
  ]
};
