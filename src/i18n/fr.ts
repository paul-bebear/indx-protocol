import type { Translations } from './en';

export const fr: Translations = {
    nav: {
        the5Paths: 'Les 5 Chemins',
        operations: 'Opérations',
        roadmap: 'Feuille de route',
        ctaButton: 'Audit Gratuit',
        ourStory: 'Notre Histoire',
    },

    hero: {
        badge: 'Conçu pour les groupes de restaurants de Milan et Paris',
        headlinePre: 'Arrêtez d\'être ',
        headlineHighlight: 'Invisible',
        headlinePost: ' pour 50% de vos clients.',
        subtext:
            "Pendant que vous vous concentrez sur la cuisine, la façon dont les clients vous trouvent a changé pour toujours. Si votre menu n'est pas lisible par l'IA et votre stock n'est pas en temps réel, vous perdez la bataille pour la prochaine génération de convives.",
        ctaPrimary: 'Demander un Audit de Visibilité Gratuit',
        ctaSecondary: 'Voir le Calculateur de ROI',
        trusted: 'La confiance des établissements d\'élite à Brera, Navigli et Le Marais.',
        chartTitle: 'Évolution du Marché 2025',
        chartStat: '+52% Volume de Recherche',
        chartLabel1: 'Recherche Google',
        chartLabel2: 'Découverte IA (GPT/Siri/TikTok)',
        revenueLabel: 'Perte de Revenu Mensuelle',
        revenueEstLoss: 'Perte Est.',
    },

    discovery: {
        title: 'Le Nouveau Parcours Client',
        subtitle:
            'Les convives ne se contentent plus de "chercher sur Google." Ils utilisent un moteur de découverte multicanal. Si vos données ne sont pas structurées pour ces 5 chemins, vous êtes effectivement hors ligne.',
        paths: [
            {
                title: 'Moteurs IA',
                description:
                    'ChatGPT et Perplexity répondent maintenant : "Où emmener un client pour un déjeuner calme à Milan ?"',
            },
            {
                title: 'Preuve Visuelle',
                description:
                    'TikTok et Reels sont utilisés pour le "Vibe Check." La recherche est désormais visuelle et ultra-rapide.',
            },
            {
                title: 'Contexte Vocal',
                description:
                    'Requêtes Siri et Apple Intelligence en marchant : "Trouve une table pour 4 près de moi maintenant."',
            },
            {
                title: 'Élite Digitale',
                description:
                    'Substack et les newsletters de niche auxquelles les grands dépensiers font plus confiance qu\'aux avis.',
            },
            {
                title: 'Agents IA',
                description:
                    'Des assistants numériques qui gèrent l\'intégralité du processus de réservation automatiquement.',
            },
        ],
    },

    invisibleGap: {
        title: 'Le "Gap Invisible" Défini',
        subtitle: "Un Gap Invisible se produit lorsque l'excellence physique de votre restaurant est piégée dans des",
        subtitleBold: 'Données Analogiques',
        invisibleLabel: 'Invisible',
        invisibleItems: 'Menu PDF sur un site web\nCarte des vins manuscrite\nListe d\'attente sur un presse-papiers',
        indexableLabel: 'Indexable',
        indexableItems: 'Schema.org JSON-LD\nAPI Stock Supabase en direct\nDisponibilité lisible par l\'IA',
    },

    ops: {
        headlinePre: 'Récupérez ',
        headlineHighlight: '14+ Heures',
        headlinePost: ' Chaque Semaine.',
        subtextP1:
            'Les Directeurs Généraux de groupes de taille moyenne passent en moyenne 14 heures par semaine à synchroniser manuellement les données POS, mettre à jour les menus du site et gérer les conflits de réservation.',
        subtextP2:
            'Indexable automatise les frictions, transformant vos données en un moteur auto-actualisé.',
        stat1Value: '60k€',
        stat1Label: 'Perte de Main-d\'œuvre Annuelle',
        stat2Value: '95%',
        stat2Label: 'Précision des Données',
        calcTitle: 'Audit Opérationnel',
        locationsLabel: 'Nombre d\'Établissements',
        locationSingular: 'Établissement',
        locationPlural: 'Établissements',
        salaryLabel: 'Salaire Manager (Moy.)',
        salaryOption1: '45 000€ / An',
        salaryOption2: '55 000€ / An',
        salaryOption3: '75 000€ / An',
        savingsLabel: 'Économies Annuelles Estimées',
    },

    dbPop: {
        title: 'Le Déclic de la Migration',
        subtitle:
            "C'est le moment où le client réalise que ses frictions opérationnelles lui coûtent des milliers d'euros.",
        legacyLabel: 'Ops Hérité (WordPress + Excel)',
        legacyTerminal:
            '[Attente] Ouvrir "Inventaire_Final_V2_Copie.xlsx"...\n[Attente] Rechercher "Barolo"...\n[Erreur] La cellule B12 est verrouillée par "Manager_Bureau_PC".',
        legacyChat:
            '"Chef, on a mis à jour le site pour le changement de saison ?"\n"Non, le développeur est en vacances. Dites simplement aux clients qu\'on n\'a plus de pâtes à la truffe."',
        legacyResult: 'Résultat : 14+ Heures/Semaine de Synchronisation Manuelle',
        modernLabel: 'Indexable.pro (Next.js + Supabase)',
        chatQ1: '"Staff Bot : Combien de bouteilles de \'Gaja Barbaresco\' reste-t-il dans les 3 établissements ?"',
        chatA1:
            '"Loc 1 : 4 | Loc 2 : 0 | Loc 3 : 12. Total : 16. J\'ai mis à jour le menu du site en \'Disponibilité Limitée\' automatiquement."',
        chatQ2: '"Super. Lance une promo de 10% sur le Loc 3 uniquement pour ce soir."',
        impactLabel: 'Impact',
        impactValue: '95% Automatisation',
        impactSub: 'Synchronise POS vers IA, Maps et Staff.',
    },

    roadmap: {
        title: 'La Feuille de Route Intelligente',
        phases: [
            {
                title: 'Phase 1 : Visibilité',
                description:
                    'Nous injectons le Schema Markup et des données propres dans votre site, rendant votre menu instantanément lisible par ChatGPT, Google AI et Apple Maps.',
                outcomeLabel: 'Résultat Clé :',
                outcome: '"Arrêtez d\'être invisible pour les chercheurs IA."',
            },
            {
                title: 'Phase 2 : Intelligence',
                description:
                    'Nous migrons votre chaos analogique vers une Base de Données Supabase en Temps Réel. Inventaire, réservations et POS synchronisés dans un cerveau central.',
                outcomeLabel: 'Résultat Clé :',
                outcome: '"Économisez 14 heures de temps de gestion."',
            },
            {
                title: 'Phase 3 : Autonomie',
                description:
                    'Nous déployons des Agents de Réservation IA et des commandes prédictives. Votre système anticipe les besoins des clients avant même leur arrivée.',
                outcomeLabel: 'Résultat Clé :',
                outcome: '"Liberté opérationnelle totale."',
            },
        ],
    },

    cta: {
        headline: 'Votre groupe de restaurants est-il invisible ?',
        subtitle:
            'Nous effectuerons un scan technique complet de votre marque pour voir comment vous apparaissez aux moteurs IA les plus puissants du monde. Sans frais. Sans engagement.',
        placeholder: 'Entrez l\'URL de votre site (ex. bistro-paris.com)',
        button: 'Lancer l\'Audit Gratuit',
        tagline: 'Scan quotidien des sites à Brera, Navigli, Le Marais & 11e Arr.',
    },

    footer: {
        quote:
            '"Des cuisines de NYC aux bistros parisiens en passant par les bars de plage de Samoa, j\'ai occupé tous les postes de la maison. J\'ai créé Indexable pour être le cerveau numérique que j\'aurais voulu avoir lors de ces fermetures à 2h du matin — pour que vous puissiez arrêter de vous battre avec les tableurs et revenir à l\'art du service."',
        missionLabel: '— La Mission du Fondateur',
        copyright: 'Indexable.pro | Milan | Paris',
        tagline: 'Conçu pour la Tech Hôtelière de Luxe',
    },

    about: {
        heroHeadline: '"J\'ai fait votre service."',
        heroSubtext:
            'Des cuisines étoilées Michelin de Paris aux stands de street food d\'Oostende, mon parcours ne s\'est pas construit dans une salle de réunion. Il s\'est construit derrière le bar, en cuisine et à l\'accueil.',
        mapLabel: 'La Perspective Globale',
        mapTitle: '5 Villes. 4 Pays. Un Seul Problème.',
        locations: [
            {
                city: 'NYC & Miami',
                role: 'Startups & Bars Haut de Gamme',
                description:
                    'Dans les marchés les plus compétitifs au monde, j\'ai appris que la vitesse est tout. Si la tech est lente, le client est parti.',
            },
            {
                city: 'Apia, Samoa',
                role: 'Hôtellerie de Resort',
                description:
                    'Au Samoa, j\'ai appris la valeur du "Contact Humain." La technologie ne doit jamais se mettre en travers d\'un accueil chaleureux.',
            },
            {
                city: 'Oostende, Belgique',
                role: 'Pubs & Restaurants de Nouilles',
                description:
                    'Qu\'il s\'agisse d\'un pub en bord de mer ou d\'un petit restaurant de nouilles, l\'efficacité opérationnelle est ce qui garde les portes ouvertes.',
            },
            {
                city: 'Paris',
                role: 'Gastronomie Française & Coffee Shops',
                description:
                    'Paris m\'a enseigné l\'art de la précision. La gastronomie exige des données aussi parfaites que l\'assiette. Si le menu du site ne correspond pas à la cave, vous avez déjà perdu la confiance du client.',
            },
        ],
        rolesLabel: 'Éprouvé sur le Terrain',
        rolesTitle: 'Des systèmes conçus par un ',
        rolesTitleHighlight: 'Pair.',
        rolesSubtext:
            'J\'ai été votre chef, votre barman, votre serveur et votre hôte. Je n\'ai pas appris l\'hospitalité dans un manuel ; je l\'ai apprise dans le feu de l\'action. Je sais exactement où se trouve la friction parce que je l\'ai vécue. Indexable est le cerveau numérique que j\'aurais voulu avoir pendant chaque service que j\'ai jamais fait.',
        roles: [
            {
                label: 'La Logique du Chef',
                description:
                    'Si le menu n\'est pas mis à jour instantanément quand un plat est épuisé, la cuisine en souffre. J\'ai conçu des systèmes qui synchronisent le POS et le site en temps réel.',
            },
            {
                label: 'La Vitesse du Barman',
                description:
                    'Les niveaux de stock devraient être accessibles par commande vocale. J\'ai créé le "Staff Bot" pour que vous n\'ayez jamais à quitter la salle pour vérifier un millésime.',
            },
            {
                label: 'La Première Impression de l\'Hôte',
                description:
                    'Chaque client qui n\'a pas trouvé votre menu sur ChatGPT est un couvert perdu. Je résous le "Gap Invisible" à la racine.',
            },
        ],
        founderQuote:
            '"J\'ai vu les mêmes schémas à Miami qu\'à Paris. Les groupes de restaurants indépendants sont laissés pour compte parce que leurs données sont bloquées en 2010. J\'ai construit ceci pour combler ce fossé."',
        founderLabel: '— Fondateur, Indexable.pro',
        ctaHeadline: 'Éliminons la friction.',
        ctaSubtext:
            'Vous n\'avez pas besoin de plus de "tech." Vous avez besoin d\'un système qui comprend comment un restaurant respire vraiment. Commençons par un audit de visibilité.',
        ctaButton: 'Demander un Audit',
        archiveLabel: 'Les Archives',
        archiveTitle: '"Dans le Feu de l\'Action"',
        archivePlaceholders: ['Ajouter photo NYC/Miami', 'Ajouter photo Paris', 'Ajouter photo Samoa', 'Ajouter photo Belgique'],
    },
};
