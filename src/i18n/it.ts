import type { Translations } from './en';

export const it: Translations = {
    nav: {
        the5Paths: 'I 5 Percorsi',
        operations: 'Operazioni',
        roadmap: 'Roadmap',
        ctaButton: 'Audit Gratuito',
        ourStory: 'La Nostra Storia',
    },

    hero: {
        badge: 'Progettato per i gruppi ristoranti di Milano e Parigi',
        headlinePre: 'Smetti di essere ',
        headlineHighlight: 'Invisibile',
        headlinePost: ' al 50% dei tuoi ospiti.',
        subtext:
            "Mentre ti concentri sulla cucina, il modo in cui gli ospiti ti trovano è cambiato per sempre. Se il tuo menu non è leggibile dall'IA e il tuo stock non è in tempo reale, stai perdendo la battaglia per la prossima generazione di clienti.",
        ctaPrimary: 'Richiedi un Audit di Visibilità Gratuito',
        ctaSecondary: 'Vedi il Calcolatore ROI',
        trusted: 'Scelto dai locali d\'élite a Brera, Navigli e Le Marais.',
        chartTitle: 'Evoluzione del Mercato 2025',
        chartStat: '+52% Volume di Ricerca',
        chartLabel1: 'Ricerca Google',
        chartLabel2: 'Scoperta IA (GPT/Siri/TikTok)',
        revenueLabel: 'Perdita di Fatturato Mensile',
        revenueEstLoss: 'Perdita St.',
    },

    discovery: {
        title: 'Il Nuovo Percorso dell\'Ospite',
        subtitle:
            'I clienti non si limitano più a "cercare su Google." Usano un motore di scoperta multicanale. Se i tuoi dati non sono strutturati per questi 5 percorsi, sei effettivamente offline.',
        paths: [
            {
                title: 'Motori IA',
                description:
                    'ChatGPT e Perplexity ora rispondono: "Dove portare un cliente per un pranzo tranquillo a Milano?"',
            },
            {
                title: 'Prova Visiva',
                description:
                    'TikTok e Reels vengono usati per il "Vibe Check." La ricerca è ora visiva e ad alta velocità.',
            },
            {
                title: 'Contesto Vocale',
                description:
                    'Richieste Siri e Apple Intelligence mentre cammini: "Trova un tavolo per 4 vicino a me adesso."',
            },
            {
                title: 'Élite Digitale',
                description:
                    'Substack e newsletter di nicchia di cui i grandi spenditori si fidano più delle recensioni.',
            },
            {
                title: 'Agenti IA',
                description:
                    'Assistenti digitali che gestiscono l\'intero processo di prenotazione automaticamente.',
            },
        ],
    },

    invisibleGap: {
        title: 'Il "Gap Invisibile" Definito',
        subtitle: "Un Gap Invisibile si verifica quando l'eccellenza fisica del tuo ristorante è intrappolata in",
        subtitleBold: 'Dati Analogici',
        invisibleLabel: 'Invisibile',
        invisibleItems: 'Menu PDF su un sito web\nCarta dei vini scritta a mano\nLista d\'attesa su un blocco note',
        indexableLabel: 'Indicizzabile',
        indexableItems: 'Schema.org JSON-LD\nAPI Stock Supabase in tempo reale\nDisponibilità leggibile dall\'IA',
    },

    ops: {
        headlinePre: 'Recupera ',
        headlineHighlight: '14+ Ore',
        headlinePost: ' Ogni Settimana.',
        subtextP1:
            'I Direttori Generali di gruppi di medie dimensioni dedicano in media 14 ore a settimana a sincronizzare manualmente i dati POS, aggiornare i menu del sito e gestire i conflitti di prenotazione.',
        subtextP2:
            'Indexable automatizza le frizioni, trasformando i tuoi dati in un motore auto-aggiornante.',
        stat1Value: '€60k',
        stat1Label: 'Perdita Annuale di Manodopera',
        stat2Value: '95%',
        stat2Label: 'Precisione dei Dati',
        calcTitle: 'Audit Operativo',
        locationsLabel: 'Numero di Sedi',
        locationSingular: 'Sede',
        locationPlural: 'Sedi',
        salaryLabel: 'Stipendio Manager (Media)',
        salaryOption1: '€45.000 / Anno',
        salaryOption2: '€55.000 / Anno',
        salaryOption3: '€75.000 / Anno',
        savingsLabel: 'Risparmio Annuale Stimato',
    },

    dbPop: {
        title: 'Il Momento della Migrazione',
        subtitle:
            'Questo è il momento in cui il cliente si rende conto che le sue frizioni operative gli costano migliaia di euro.',
        legacyLabel: 'Ops Legacy (WordPress + Excel)',
        legacyTerminal:
            '[Attesa] Aprire "Inventario_Finale_V2_Copia.xlsx"...\n[Attesa] Cercare "Barolo"...\n[Errore] La cella B12 è bloccata da "Manager_Ufficio_PC".',
        legacyChat:
            '"Chef, abbiamo aggiornato il sito per il cambio di stagione?"\n"No, lo sviluppatore è in ferie. Dica ai clienti che la pasta al tartufo è finita."',
        legacyResult: 'Risultato: 14+ Ore/Settimana di Sincronizzazione Manuale',
        modernLabel: 'Indexable.pro (Next.js + Supabase)',
        chatQ1: '"Staff Bot: Quante bottiglie di \'Gaja Barbaresco\' restano in tutte e 3 le sedi?"',
        chatA1:
            '"Sede 1: 4 | Sede 2: 0 | Sede 3: 12. Totale: 16. Ho aggiornato il menu del sito a \'Disponibilità Limitata\' automaticamente."',
        chatQ2: '"Perfetto. Lancia una promo del 10% solo sulla Sede 3 per stasera."',
        impactLabel: 'Impatto',
        impactValue: '95% Automazione',
        impactSub: 'Sincronizza POS con IA, Maps e Staff.',
    },

    roadmap: {
        title: 'La Roadmap Intelligente',
        phases: [
            {
                title: 'Fase 1: Visibilità',
                description:
                    'Iniettiamo Schema Markup e dati puliti nel tuo sito, rendendo il tuo menu immediatamente leggibile da ChatGPT, Google AI e Apple Maps.',
                outcomeLabel: 'Risultato Chiave:',
                outcome: '"Smetti di essere invisibile ai ricercatori IA."',
            },
            {
                title: 'Fase 2: Intelligenza',
                description:
                    'Migriamo il tuo caos analogico a un Database Supabase in Tempo Reale. Inventario, prenotazioni e POS sincronizzati in un unico cervello centrale.',
                outcomeLabel: 'Risultato Chiave:',
                outcome: '"Risparmia 14 ore di tempo di gestione."',
            },
            {
                title: 'Fase 3: Autonomia',
                description:
                    'Implementiamo Agenti di Prenotazione IA e ordini predittivi. Il tuo sistema anticipa le esigenze degli ospiti prima ancora del loro arrivo.',
                outcomeLabel: 'Risultato Chiave:',
                outcome: '"Libertà operativa totale."',
            },
        ],
    },

    cta: {
        headline: 'Il tuo gruppo di ristoranti è invisibile?',
        subtitle:
            'Eseguiremo una scansione tecnica completa del tuo brand per vedere come appari ai motori IA più potenti del mondo. Senza costi. Senza impegno.',
        placeholder: 'Inserisci l\'URL del tuo sito (es. ristorante-milano.com)',
        button: 'Avvia Audit Gratuito',
        tagline: 'Scansione quotidiana dei siti a Brera, Navigli, Le Marais e 11° Arr.',
    },

    footer: {
        quote:
            '"Dalle cucine di NYC ai bistrot parigini fino ai beach bar di Samoa, ho ricoperto ogni ruolo della casa. Ho creato Indexable per essere il cervello digitale che avrei voluto avere durante quelle chiusure alle 2 di notte — così puoi smettere di lottare con i fogli di calcolo e tornare all\'arte del servizio."',
        missionLabel: '— La Missione del Fondatore',
        copyright: 'Indexable.pro | Milano | Parigi',
        tagline: 'Progettato per la Tech dell\'Ospitalità di Lusso',
    },

    about: {
        heroHeadline: '"Ho fatto il tuo turno."',
        heroSubtext:
            'Dalle cucine stellate Michelin di Parigi agli stand di street food di Oostende, il mio percorso non è nato in una sala riunioni. È nato dietro al bancone, in linea e alla reception.',
        mapLabel: 'La Prospettiva Globale',
        mapTitle: '5 Città. 4 Paesi. Un Unico Problema.',
        locations: [
            {
                city: 'NYC & Miami',
                role: 'Startup & Bar di Alto Livello',
                description:
                    'Nei mercati più competitivi al mondo, ho imparato che la velocità è tutto. Se la tecnologia è lenta, il cliente se ne va.',
            },
            {
                city: 'Apia, Samoa',
                role: 'Ospitalità Resort',
                description:
                    'A Samoa ho imparato il valore del "Tocco Umano." La tecnologia non dovrebbe mai ostacolare un\'accoglienza calorosa.',
            },
            {
                city: 'Oostende, Belgio',
                role: 'Pub & Noodle Shop',
                description:
                    'Che sia un pub sul mare o un piccolo noodle shop, l\'efficienza operativa è ciò che tiene le porte aperte.',
            },
            {
                city: 'Parigi',
                role: 'Alta Cucina Francese & Coffee Shop',
                description:
                    'Parigi mi ha insegnato l\'arte della precisione. L\'alta cucina richiede dati perfetti come il piatto. Se il menu sul sito non corrisponde alla cantina, hai già perso la fiducia del cliente.',
            },
        ],
        rolesLabel: 'Testato sul Campo',
        rolesTitle: 'Sistemi costruiti da un ',
        rolesTitleHighlight: 'Collega.',
        rolesSubtext:
            'Sono stato il tuo chef, il tuo barman, il tuo cameriere e il tuo host. Non ho imparato l\'ospitalità da un manuale; l\'ho imparata nelle trincee. So esattamente dove si trova la frizione perché l\'ho vissuta. Indexable è il cervello digitale che avrei voluto avere durante ogni servizio che ho mai fatto.',
        roles: [
            {
                label: 'La Logica dello Chef',
                description:
                    'Se il menu non viene aggiornato istantaneamente quando un piatto è esaurito, la cucina ne soffre. Ho costruito sistemi che sincronizzano POS e sito in tempo reale.',
            },
            {
                label: 'La Velocità del Barman',
                description:
                    'I livelli di stock dovrebbero essere a un comando vocale di distanza. Ho creato lo "Staff Bot" così non devi mai lasciare la sala per controllare un\'annata.',
            },
            {
                label: 'La Prima Impressione dell\'Host',
                description:
                    'Ogni ospite che non ha trovato il tuo menu su ChatGPT è un coperto perso. Risolvo il "Gap Invisibile" alla radice.',
            },
        ],
        founderQuote:
            '"Ho visto gli stessi schemi a Miami che a Parigi. I gruppi di ristoranti indipendenti vengono lasciati indietro perché i loro dati sono bloccati nel 2010. Ho costruito questo per colmare quel divario."',
        founderLabel: '— Fondatore, Indexable.pro',
        ctaHeadline: 'Eliminiamo la frizione.',
        ctaSubtext:
            'Non hai bisogno di più "tech." Hai bisogno di un sistema che capisca come respira davvero un ristorante. Iniziamo con un audit di visibilità.',
        ctaButton: 'Richiedi un Audit',
        archiveLabel: 'L\'Archivio',
        archiveTitle: '"Nelle Trincee"',
        archivePlaceholders: ['Aggiungi foto NYC/Miami', 'Aggiungi foto Parigi', 'Aggiungi foto Samoa', 'Aggiungi foto Belgio'],
    },
};
