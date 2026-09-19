// Fiches de référence : Git
// Généré à partir du pense-bête — un objet par groupe de fiches.
window.CHEATSHEET_DATA = window.CHEATSHEET_DATA || {};
window.CHEATSHEET_DATA.git = {
  "id": "git",
  "label": "Git",
  "color": "var(--git-color)",
  "groups": [
    {
      "name": "Démarrer",
      "cards": [
        {
          "t": "Init & clone",
          "d": "Deux façons de commencer à utiliser git sur un projet : soit en créer un nouveau tout seul (init), soit récupérer un projet qui existe déjà quelque part (clone).",
          "code": "git init                     # transforme le dossier courant en dépôt git\ngit clone https://github.com/user/repo.git   # copie un dépôt distant en local"
        },
        {
          "t": "Configuration",
          "d": "Indique à git QUI vous êtes, pour que chaque sauvegarde (commit) que vous créez porte votre nom. --global applique ce réglage à tous vos projets d'un coup.",
          "code": "git config --global user.name \"Votre Nom\"\ngit config --global user.email \"vous@exemple.fr\""
        }
      ]
    },
    {
      "name": "Cycle quotidien",
      "cards": [
        {
          "t": "État & historique",
          "d": "Des commandes en lecture seule, pour voir ce qui a changé avant de valider quoi que ce soit : rien de risqué à les lancer souvent.",
          "code": "git status                # fichiers modifiés / ajoutés / non suivis\ngit log --oneline           # historique des commits, une ligne chacun\ngit diff                     # différences non indexées (pas encore \"add\")\ngit diff --staged             # différences déjà indexées (prêtes à commit)"
        },
        {
          "t": "Ajouter & valider",
          "d": "Les trois étapes classiques : add sélectionne les changements à sauvegarder, commit crée le point de sauvegarde, push l'envoie sur le serveur pour que les autres le voient.",
          "code": "git add fichier.c          # ajoute ce fichier à la prochaine validation\ngit add .                    # ajoute tous les fichiers modifiés du dossier\ngit commit -m \"Message clair\" # crée un point de sauvegarde avec un message\ngit push origin main           # envoie les commits locaux vers le dépôt distant"
        },
        {
          "t": "Récupérer",
          "d": "pull récupère les nouveaux changements faits par d'autres personnes sur le dépôt distant, et les intègre directement dans votre copie locale.",
          "code": "git pull origin main    # équivaut à : git fetch + git merge\ngit fetch origin          # télécharge les changements SANS les fusionner"
        }
      ]
    },
    {
      "name": "Branches",
      "cards": [
        {
          "t": "Créer & changer",
          "d": "Une branche est une copie parallèle du projet, pour développer une nouvelle fonctionnalité sans risquer d'abîmer la version principale (main) tant que ce n'est pas prêt.",
          "code": "git branch nouvelle-fonctionnalite   # crée la branche\ngit checkout nouvelle-fonctionnalite   # bascule dessus\ngit checkout -b nouvelle-fonctionnalite # crée ET bascule en une commande\n\ngit switch main    # équivalent moderne de checkout pour changer de branche\ngit branch -av       # liste toutes les branches, locales et distantes"
        },
        {
          "t": "Fusionner",
          "d": "merge prend tous les changements faits sur une branche et les rapatrie dans la branche où l'on se trouve actuellement (typiquement main).",
          "code": "git checkout main\ngit merge nouvelle-fonctionnalite      # fusionne dans main\ngit branch -d nouvelle-fonctionnalite   # supprime la branche fusionnée"
        }
      ]
    },
    {
      "name": "Dépôts distants",
      "cards": [
        {
          "t": "Gérer les remotes",
          "d": "Un \"remote\" est juste un petit surnom pratique pour désigner l'adresse d'un dépôt distant (sur GitHub, par exemple), plutôt que de retaper l'URL entière à chaque fois.",
          "code": "git remote add origin https://github.com/user/repo.git # ajoute l'alias \"origin\"\ngit remote -v                        # liste les remotes avec leurs URLs\ngit remote set-url origin <url>       # change l'URL d'un remote existant\ngit remote rm origin                   # supprime un remote"
        }
      ]
    },
    {
      "name": "Historique avancé",
      "cards": [
        {
          "t": "git log utile",
          "d": "Des options pour explorer l'historique plus efficacement que la liste brute par défaut : voir toutes les branches d'un coup, chercher un mot précis, ou voir le détail d'un commit.",
          "code": "git log --oneline --graph --all   # graphe visuel de toutes les branches\ngit log -p fichier.c                # montre le contenu des modifications\ngit log -S\"motAChercher\"             # commits qui ajoutent/retirent ce texte\ngit show <hash>                       # détail complet d'un commit précis"
        },
        {
          "t": "git rebase",
          "d": "Reprend les commits d'une branche et les rejoue un par un par-dessus une autre, pour obtenir un historique bien droit (linéaire) au lieu de branches entremêlées.",
          "code": "git checkout ma-branche\ngit rebase main            # rejoue les commits de ma-branche par-dessus main\n# en cas de conflit :\ngit status                  # voir les fichiers en conflit\ngit add fichier.c           # une fois le conflit résolu à la main\ngit rebase --continue         # poursuit le rebase"
        },
        {
          "t": "git cherry-pick",
          "d": "Permet de récupérer UN SEUL commit précis d'une autre branche, sans avoir à fusionner toute la branche avec tous ses autres commits.",
          "code": "git cherry-pick <hash-du-commit> # rejoue ce commit sur la branche actuelle"
        },
        {
          "t": "git blame & git bisect",
          "d": "blame retrouve qui (et quand) a écrit une ligne précise. bisect aide à retrouver quel commit exact a introduit un bug, en testant automatiquement des commits intermédiaires.",
          "code": "git blame fichier.c          # montre, ligne par ligne, le dernier commit qui l'a modifiée\n\ngit bisect start               # démarre une recherche par dichotomie du commit fautif\ngit bisect bad                   # le commit actuel est \"mauvais\" (bug présent)\ngit bisect good <hash-ok>          # un ancien commit connu comme \"bon\"\n# git teste un commit intermédiaire ; répondre good/bad jusqu'à trouver le coupable\ngit bisect reset                     # termine et revient à l'état initial"
        }
      ]
    },
    {
      "name": "Annuler & nettoyer",
      "cards": [
        {
          "t": "Annuler des changements",
          "d": "Plusieurs commandes existent selon l'étape où en est le changement : pas encore ajouté, ajouté mais pas encore validé, ou déjà validé par un commit.",
          "code": "git checkout -- fichier.c     # annule les modifs locales non indexées\ngit reset HEAD fichier.c        # désindexe (retire du prochain commit)\ngit reset --hard HEAD            # annule TOUT, y compris le travail en cours (danger)\ngit revert <commit>               # annule un commit en créant un nouveau commit"
        },
        {
          "t": "Modifier le dernier commit",
          "d": "amend permet de corriger le tout dernier commit (message ou contenu) au lieu d'en créer un nouveau juste pour une petite correction.",
          "code": "git commit --amend -m \"Nouveau message\" # remplace le message du dernier commit\ngit commit --amend --no-edit               # garde le message, ajoute les fichiers indexés"
        },
        {
          "t": "Stash",
          "d": "Met de côté, temporairement, des changements pas encore prêts à être validés (par exemple pour changer rapidement de branche), sans avoir à faire un commit \"bâclé\".",
          "code": "git stash              # sauvegarde et nettoie les changements en cours\ngit stash list           # liste les stash enregistrés\ngit stash pop              # réapplique le dernier stash ET le supprime de la liste\ngit stash apply              # réapplique le dernier stash mais le garde en mémoire"
        },
        {
          "t": ".gitignore",
          "d": "Un fichier texte qui liste tout ce que git doit ignorer complètement : les fichiers générés automatiquement, les mots de passe, les gros dossiers de dépendances...",
          "code": "*.o             # tous les fichiers objets compilés\n*.exe            # tous les exécutables Windows\nbuild/            # tout le dossier build\n.env               # variables d'environnement (secrets)\n__pycache__/         # cache Python\nnode_modules/          # dépendances Node.js"
        },
        {
          "t": "Retirer un fichier déjà suivi par erreur",
          "d": "Ajouter une ligne à .gitignore APRÈS avoir déjà commité un fichier ne suffit pas : git continue de suivre ce fichier, il faut lui dire explicitement d'arrêter.",
          "code": "git rm --cached fichier-secret.env  # arrête de le suivre, SANS le supprimer du disque\n# puis ajouter la ligne correspondante dans .gitignore pour éviter que ça se reproduise\ngit commit -m \"Retire le fichier secret du suivi\"\n\n# Pour un dossier entier :\ngit rm -r --cached node_modules/"
        }
      ]
    },
    {
      "name": "Conflits & bonnes pratiques",
      "cards": [
        {
          "t": "Résoudre un conflit de fusion, étape par étape",
          "d": "Un conflit arrive quand deux personnes ont modifié la même ligne de la même façon différente : git ne peut pas deviner tout seul laquelle garder, donc il demande à un humain de trancher.",
          "code": "git merge autre-branche\n# CONFLICT (content): Merge conflict in fichier.c\n\n# 1. Ouvrir le fichier : git a inséré des marqueurs autour du conflit\n# <<<<<<< HEAD\n#     code de la branche actuelle\n# =======\n#     code de l'autre branche\n# >>>>>>> autre-branche\n\n# 2. Éditer le fichier à la main pour ne garder que la version voulue\n#    (ou un mélange des deux), puis supprimer les marqueurs <<< === >>>\n\n# 3. Valider la résolution\ngit add fichier.c\ngit commit          # termine la fusion avec un message généré automatiquement"
        },
        {
          "t": "Bien écrire ses messages de commit",
          "d": "Un bon message de commit explique POURQUOI le changement a été fait, pas juste ce qui a changé (ça, git.diff le montre déjà) : ça aide énormément à se relire des mois plus tard.",
          "code": "# Convention courante : un verbe à l'impératif + résumé court (< 50 caractères)\ngit commit -m \"Corrige le calcul de la moyenne pour une liste vide\"\n\n# À éviter : des messages vagues qui n'aident personne\n# git commit -m \"fix\"\n# git commit -m \"wip\"\n# git commit -m \"update\"\n\n# Un commit = un changement logique cohérent, pas \"tout le travail de la journée\""
        },
        {
          "t": "Erreurs fréquentes & comment s'en sortir",
          "d": "Quelques situations qui paraissent catastrophiques la première fois, mais qui ont toutes une solution simple et connue.",
          "code": "# Committé sur main au lieu d'une branche dédiée :\ngit branch ma-feature      # crée une branche AVEC les commits déjà faits\ngit reset --hard origin/main # remet main comme avant (les commits restent sur ma-feature)\n\n# Push refusé (\"rejected\") car la branche distante a avancé :\ngit pull --rebase origin main  # récupère les changements distants, rejoue les siens par-dessus\ngit push origin main\n\n# Fichier modifié par erreur, envie de tout annuler avant de committer :\ngit restore fichier.c            # (git moderne) annule les modifs locales non indexées"
        }
      ]
    },
    {
      "name": "Étiquettes & alias",
      "cards": [
        {
          "t": "Tags",
          "d": "Un marque-page posé sur un commit précis, en général pour repérer une version publiée du projet (v1.0, v2.0...) et pouvoir y revenir facilement plus tard.",
          "code": "git tag v1.0                        # crée un tag léger sur le commit actuel\ngit tag -a v1.0 -m \"Version 1.0\"      # tag annoté, avec message et auteur\ngit push origin v1.0                   # pousse le tag vers le dépôt distant\ngit tag                                 # liste tous les tags du dépôt"
        },
        {
          "t": "Alias utiles",
          "d": "Un raccourci personnel pour ne plus avoir à retaper en entier les commandes qu'on utilise le plus souvent.",
          "code": "git config --global alias.co checkout\ngit config --global alias.br branch\ngit config --global alias.st status\ngit config --global alias.ci commit\n\ngit co main   # équivaut désormais à : git checkout main"
        }
      ]
    }
  ]
};
