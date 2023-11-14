const questions = [
    {
      text: "I nemici principali incontrati da Paperinik sono criminali comuni, la Banda Bassotti, o qualche volte anche l'avidità del suo stesso parente, Zio Paperone. Ma il vendicatore mascherato ha anche incontrato minacce più grandi, come un'invasione aliena.",
      answer:
        "Paperinik non ha mai incontrato gli alieni, è la sua versione alternativa, PK, che ci si scontra su base regolare",
      categories: ["comics"],
    },
    {
      text: "Paperino è uno dei personaggi Disney di cui vediamo più alter ego eroici. Tra questi abbiamo: il vendicatore mascherato Paperinik, il protettore della Terra PK, il simil-Batman Darkwing Duck, il simil-007 DoubleDuck, e l'agente segreto al servizio di Paperone Qu-Qu 7",
      answer:
        "Darkwing Duck è un personaggio distinto e non un alter ego di Paperino",
      categories: ["comics"],
    },
    {
      text: "L'alter ego supereroistico di Paperino, Paperinik, nasce perché il povero papero riceve in un insperato colpo di fortuna l'atto di proprietà di una villa come premio per una lotteria. La vincita si rivelerà essere la diroccata e fatiscente Villa Rosa, dove però Paperino troverà il diario di Fantomius, il ladro gentiluomo, e tutto il suo arsenale necessario per la nascita del vendicatore mascherato Disney.",
      answer:
        "Paperino ha fortuna insperata ma non vince un bel niente: per un errore del postino, riceve l'atto di proprietà che era in realtà stato vinto dal cugino Gastone, che quindi senza questo scambio sarebbe potuto diventare lui l'eroe mascherato di Paperopoli",
      categories: ["comics", "luck"],
    },
    {
      text: "A differenza di Rey (per sua fortuna), i protagonisti delle altre due trilogie, Anakin e Luke Skywalker, sono accomunati dall'aver entrambi perso la mano destra, tagliata dalla spada laser di un avversario a loro caro",
      answer:
        "Anakin perde sì la mano destra, contro il Conte Dooku, ma perde anche i suoi altri tre arti nello scontro finale con Obi-Wan Kenobi, prima di venire ricostruito come Darth Vader",
      categories: ["cinema", "sci_fi"],
    },
    {
      text: "Nel trono di Spade, Daenerys Nata dalla Tempesta, della casa Targaryen, Prima del suo nome, la Non bruciata, Regina di Mareen, Regina degli Andali, dei Rhoynar e dei Primi Uomini, Khaleesi del Grande Mare d'Erba, Distruttrice di Catene e Madre dei Draghi ha tre draghi di nome Drogon, Rhaegal e Meraxes",
      answer: "Il terzo drago si chiama Viserion, non Meraxes",
      categories: ["tv", "fantasy"],
    },
    {
      text: "Ne Il Ritorno dello Jedi, i ribelli attaccano e distruggono il generatore dello scudo della NUova Morte Nera sul pianeta di Endor con l'aiuto di pelose creature chiamate Ewoks",
      answer:
        "Endor è una luna, non un pianeta, e gli Ewoks sono gli abitanti di Endor, non il nome di una specie",
      categories: ["cinema", "sci_fi"],
    },
    {
      text: "Eevee, il pokemon numbero 133, può evolvere in Vaporeon, Electreon, Flareon, Espeon, Umbreon, Leafeon, Glaceon and Sylveon",
      answer: "Eevee può evolvere in tutte le forme elencate, tranne Electreon",
      categories: ["anime", "videogames"],
    },
    {
      text: "Lo scudo di Capitan america è così forte perchè fatto in Adamntium, lo stesso materiale degli artigli di Wolverine",
      answer: "Lo scudo di Capitan America è fatto di Vibranium, non Adamantium",
      categories: ["cinema", "comics"],
    },
    {
      text: "Nel Trono di Spade il genitori di Hodor lo chiamano così in onore di un famoso Maestro del Nord",
      answer:
        "Hodor è il nome che Hodor pronuncia per tutta la sua vita, ma il suo vero nome è Walder",
      categories: ["tv", "fantasy"],
    },
    {
      text: "Ne La Compagnia dell'Anello di J.R,R Tolkien la compagnia da cui prende nome il libro è composta da nove membri rappresentativi delle quattro specie libere: hobbit, umani, nani ed elfi",
      answer:
        "Gabdalf è un Istari, non un umano, e quindi non rappresenta la specie umana",
      categories: ["fantasy", "cinema"],
    },
    {
      text: "La serie La Ruota del Tempo inizia la sua pubblicazione con l'Occhio del Mondo nel 1990 e si è conclusa 23 anni quando Robert Jordan ha concluso l'ultimo libro: Memoria di Luce",
      answer:
        "Robert Jordan è morto prima di concludere la serie che è stata portata a termine da Brandon Sanderson",
      categories: ["fantasy", "books"],
    },
    {
      text: "In Start Wars, Qui-Gon Jinn usa i suoi poteri di manipolazione mentale per convincere il Toydoriano Watto a accettare crediti della Repubblica come pagamento per il suo T-14 Hyperdrive Generator",
      answer: "I poteri mentali dei Jedi non funzionano sui Toydoriani",
      categories: ["cinema", "sci_fi"],
    },
    {
      text: "Nel gioco Pokemon, puoi usare la pietra di luna per far evolvere il tuo Clefairy in Clefable, il tuo Jigglypuff in Pigglytuff, il tuo Nidorino in Nidoking e il tuo Nidorina in Nidoqueen",
      answer: "Jigglypuff evolve in Wigglytuff, non Pigglytuff",
      categories: ["anime", "videogames"],
    },
    {
      text: "Nel Mago di Oz, dopo aver visitato la città di Smeraldo, Dorothy e i suoi amici attraversano la terra dei Munchkin per raggiungere il castello della strega cattiva dell'ovest. Attraversano la foresta armati di una rete, uno spray per insetti e una pistola",
      answer: "Loro attraversano la terra dei Gialloni (Winkyland)",
      categories: ["fantasy", "books", "cinema"],
    },
    {
      text: "Nell'originale Crash Bandicoot per playstaton 1, Crash ottiene una nuova vita ogni volta che raccoglie 100 frutti Wumpa o rompendo una cassa 1-Up",
      answer: "Prende una vita dopo 100 frutti",
      categories: ["videogames"],
    },
    {
      text: "Nel fantasy esistono numerosi mostri creati unendo due creature reali in una e Dungeons and Dragons ne fa largo uso. Nel suo manuale dei mostri si possono trovare Orsogufi, Puzzomucche e conigli unicorno",
      answer: "Non ci sono puzzomucche",
      categories: ["boardgames", "fantasy"],
    },
    {
      text: "I giochi del franchise Final Fantasy tendono ad essere dei giochi standalone, ognuno che sviluppa un suo gruppo di ambientazione e personaggi. Ciononostante alcuni ritornano più volte attraverso la serie. Fin da Final Fantasy II ogni gioco ha sempre incluso i chocobo, i moguri e un personaggio chiamato Cid",
      answer:
        "I moguri appaiono per la prima volta in Final Fantasy III e non sono presenti nel IV",
      categories: ["videogames"],
    },
    {
      text: "Alcuni personaggi molto famosi non sono noti per i loro nomi: Pipino del Signore degli Anelli si chiama in realtà Peregrino, Voldemort si chiama Tom, Turanga Leela di Furutama usa princiaplemnte il suo cognome e Hodor del Trono di Spade si chiama in realtà Walder",
      answer: "Turanga è il cognome di Leela, non il nome",
      categories: ["fantasy", "tv", "books", "sci_fi"],
    },
    {
      text: "Super Mario Kart è un gioco di gare di Kart lanciato nel 1992 per la Super Nintendo. I giocatori possono gareggiare con personaggi quali Mario, Principessa Peach, Donkey Kong e Toad su percorsi come il famoso Rainbow Road",
      answer: "Donkey Kong non era giocabile, ma lo era Donkey Kong Jr",
      categories: ["videogames"],
    },
    {
      text: "Nel libro di L. Frank Baum 'Il Meraviglioso Mago di Oz', Dorothy ottinee due scarpette di rosso rubino dopo aver ucciso accidentalmente la malvagia strega dell'est. Le scarpette saranno alla fine il modo con cui ritorna in Kansas",
      answer:
        "Nel libro le scarpette sono d'argento. Nel film con Judy Garland si faranno rosse per sfruttre la nuova invenzione dell'epoca: il technicolor",
      categories: ["cinema", "books", "fantasy"],
    },
    {
      text: "I Draghi sono stati rappresentati di ogni forma e dimensione e le sottocategorie possono essere identificate attraverso piccole differenze. Per esempio le viverne hanno solo due gambe, i Wyrm sono enormi serpenti senza ali e gambe e i draghi Giapponesi sono lunghi, volanti, con quattro gambe e quattro dita per piede",
      answer:
        "Quelli giapponesi anno solo tre dita. Quelli cinesi quattro e quelli imperiali cinque. [Bonus] secondo il Signore degli Anelli ci sono wyrm alati",
      categories: ["fantasy", "books"],
    },
    {
      text: "In 'Star Trek: The Next Generation' l'equipaggio dell'USS Enterprise è un gruppo inclusivo di umani e non umani. Inoltre quelli della Terra sono di culture diverse. Il capitano Picard è Inglese, Will Riker è cresciuto in Alaska e Geordi La Forge è nato in Somalia",
      answer: "Picard è francese, non inglese",
      categories: ["tv", "sci_fi"],
    },
    {
      text: "Ad oggi la versione di Dracula più rappresentata è quella di Bela Lugosi: un uomo elegante, pallido, coi capelli lisciati all'indietro canini appuntiti e mantello rosso. Tuttavia, nel libro originale di Bram Stocker Dracula è descritto molto più simile a Nosferatu: un uomo brutto, con i denti da ratto, lunghe dita e orecchie a punta",
      answer:
        "Nel libro è descritto come un uomo alto e vecchio. Ben lavato e sbarbato salvo lunghi baffi bianchi e un vestito toalmente nero senza altri colori",
      categories: ["books", "cinema", "fantasy"],
    },
    {
      text: "Molte delle specie giocabili in D&D sono ispirate dall'ambientazione di Tolkien, come elfi e nani. Nel tempo sono state aggiunte però specie più originali come i Tiefling, i Genasi e gli Aasimar che discendono rispettivamente da Diavoli, Draghi ed Angeli",
      answer: "I Genasi discendono dagli elementi, non dai draghi",
      categories: ["boardgames", "fantasy"],
    },
    {
      text: "Nei libri della saga Dune, Shai'hulud significa 'Vecchio uomo del deserto' ed è una aproal fremen usata per idicare il vecchio guerriero Gurney Halleck, un vassallo della casa Atreides",
      answer: "Shai'hulud viene usato per indicare il verme del deserto",
      categories: ["sci_fi", "books"],
    },
    {
      text: "In Star Trek i colori delle divise servono a indicare i differenti reparti: rosso per gli INgegneri, blu per gli scienziati e medici, giallo per comandanti e sicurezza",
      answer:
        "Il rosso è per la sicurezza, il giallo per il comando e il blu per la scienza",
      categories: ["sci_fi", "tv"],
    },
    {
      text: "Nel libro 'IT' di Stephen King, i membri del Club dei Perdenti si perde nelle fogne dopo aver combattutto 'IT' e riesce e fuggire solo dopo essersi calmati dopo aver compiuto l'antico rituale di Chud",
      answer:
        "Dopo aver fatto il rutiale di Chud hanno un orgia che gli permette di ricordarsi al via d'uscita",
      categories: ["books"],
    },
    {
      text: "Superman, noto originariamente come Kal-El, è nato sul pianeta Krypton, che fu distrutto in seguito ad un terribile cataclisma. Anche se l'esplosione non avrebbe danneggiato l'invuknerabile Kal-El infante, il terribile Generale Zod sicuramente l'avrebbe fatto",
      answer:
        "I poteri di Superman derivano dal nostro Sole quindi sarebbe morto anche lui",
      categories: ["comics", "sci_fi", "cinema"],
    },
    {
      text: "Denethor, Re di Gondor, è padre di Faramir e Boromir, uno dei quali muore sulle cascate di Rauros, mentre l'altro viene ferito gravemente durante l'assedio di Osgiliath",
      answer: "Denethor non è re, ma soprintendente",
      categories: ["fantasy", "books", "cinema"],
    },
    {
      text: "Ne 'La Principessa Mononoke', Ashitaka e il suo alce rosso Yakul partono dal loro villaggio in seguito all'attacco di un demone. Scoprono quindi che c'è una guerra tra gli spiriti della foresta e gli umani della Città di Ferro. Mentre i lupi e i chinghiali sono combattivi, un gruppo di donne chiassose inventano armi da fuoco con cui respingerli",
      answer: "Le armi sono create da lebbrosi",
      categories: ["fantasy", "anime", "cinema"],
    },
    {
      text: "Il principale antagonista della serie Zelda è Ganondorf, membro della specie dei Gerudo, ladri del deserto. Addestrato dal padre nella magia, Ganondorf spesso possiede il potere della Triforza, rendendolo quasi invincibile",
      answer:
        "Ganondorf non ha padre, I gerudo sono una specie di sole donne e ogni 100 anni ne nasce un maschio che diventa re",
      categories: ["videogames"],
    },
    {
      text: "Nel racconto di Philip K. Dick 'Blade Runner', Rick Deckard usa una macchina Voight-Kampff per determinare se un sospetto sia davvero umano misurando la sua capacità di risposta fisiologica",
      answer: "Il Libro si chiama 'Do the androids dream of electric sheep?'",
      categories: ["sci_fi", "books", "cinema"],
    },
    {
      text: "Nel primo libro della serie del Mondo Disco di Terry Pratchett, i lettori scoprono che il colore della magia pura è l'ottarino, un colore visibile solo ai maghi",
      answer: "Anche i gatti possono vederlo",
      categories: ["fantasy", "books"],
    },
    {
      text: "IN Doctor Who, il Dottore è un Signore del Tempo di 900 anni del pianeta Gallyfrey che attraverso il tempo e lo spazio con il suo fidato cacciavite sonico e il suo TARDIS ultimo modello",
      answer: "Il TARDIS è un MArk 40, un vecchio modello",
      categories: ["sci_fi", "tv"],
    },
    {
      text: "Una delle relazioni più iconiche mai fatte è quella tra Han Solo e il suo co-pilota ChewBacca. Questi si espime solo in Shyriiwook, ma può comprendere l'inglese, mentre Han parla solo in inglese poichè lo Shryiiwook è troppo difficile per gli umani",
      answer:
        "L'inglese non esiste nell'universo di Star Wars, il linguaggio è definito Basic",
      categories: ["sci_fi", "cinema"],
    },
    {
      text: "Anceh se il mondo dei Giochi di Ruolo è dominato da Dungeon And Dragons che è basato sul concetto di High Fantasy, altri giochi si focalizzano su altri generi: ad esempio World of Darkness ha un setting da urban horror, ShadowRun è una distopia cyberpunk e GURP si focalizza sulle storie di supereroi",
      answer:
        "GURP sta per Generic Universal Role Playing System ed è un gioco generico, non di supereroi",
      categories: ["boardgames"],
    },
    {
      text: "Anche se normalmente il titolo 'Super mario Brothers' è associato a Mario e Luigi, nel 1992 fa la comparsa Wario, il fratello perduto per il gioco per Game Boy 'Super Mario Land 2: 6 golden coins'",
      answer: "Wario è un amico d'infanzia non il fratello",
      categories: ["videogames"],
    },
    {
      text: "Mentre molte persone sannoche la kryptonite è il punto debole di Superman, non molti sanno che esiste in diversi colori, con vari effetti: la classica verde lo indebolisce, la rosa gli fa perdere i poteri, la rossa gli fa perdere le inibizioni",
      answer:
        "La kryptonite rosa lo rende gay. Quella oro gli fa perdere i poteri",
      categories: ["comics"],
    },
    {
      text: "In Futurama, i membri della Planet Express sono un gruppo eterogeneo di persone, ma nonostante le loro differenze solo Jhon Zoidberg non è originario della Terra",
      answer: "Amy viene da Marte",
      categories: ["tv"],
    },
    {
      text: "In Dungeons and Dragons le classi dei personaggi sono cambiate da edizione a edizione, Mentre alcune sono presenti fin dalla prima edizione, quali monaco, incantatore e bardo, altre sono state aggiunte in seguito, come il warlock, il ranger e il druido",
      answer: "L'incantatore è un termeine generico, esiste il mago",
      categories: ["boardgames"],
    },
    {
      text: "Nel libro 'American Gods', Odino ha due corvi, Huginn e Muninn (pensiero e memoria). Quando il protagonista, Shadow, si trova da solo con uno dei corvi, questi gli dice 'mai più', in citazione di Edgar Allan Poe",
      answer: "Il corvo gli dice 'vaffanculo'",
      categories: ["books", "fantasy"],
    },
    {
      text: "Anche se molti dei talenti di Xena sono tutto sommato normali, lei ha dimostrato anche capacità soprannaturali. In aggiunta alla sua competenza con la sua arma immaginaria, il chakram, può usare telecinesi e proiezioni di energia",
      answer: "Il chakram è una vera arma",
      categories: ["tv"],
    },
    {
      text: "Ne 'I monty python e il sacro graal', un narratore legge da un libro e ci informa di quattro cavalieri che si uniscono ad Artù nella sua missione: Sir Bedevere il Saggio, Sir Lancelot il Coraggioso, Sir Robin il Non Così Coraggioso e Sir Galahad il Puro",
      answer: "C'è anche Sir Not Appearing in this film",
      categories: ["cinema", "fantasy"],
    },
    {
      text: "Il gioco da tavolo pandemic è uno dei giochi cooperativi più popolari. I giocatori devono collaborare contro il gioco per curare ed eradicare quattro diverse malattie prima che sommergano il mondo",
      answer: "Non è necessario eradicarle, ma solo trovare le cure",
      categories: ["boardgames"],
    },
    {
      text: "L'originale Neon Genesis Evangelion riguarda un adolescente che pilota robot giganti chiamati Evangelion, o Eva, per combattere dei mostri denominati Angeli. Con un countdown all'apocalisse che serve per far avanzare la storia, i fans sono rimasti molto sorpresi quando gli ultimi due episodi della serie hanno esplorato la psiche dei personaggi invece di mostrare la battaglia finale",
      answer: "Gli eva sono creature organiche, non robot",
      categories: ["anime", "tv"],
    },
    {
      text: "Tutti i pokemon sono classificati in almeno uno dei 18 tipi disponibili. Uno dei più rari è il tipo Drago. Debole contro gli attacchi di ghiaccio, fatati e di altri draghi, questo tipo include Dragonite, Salamence e Charizard",
      answer: "Chariard non è un drago, ma un fuoco",
      categories: ["videogames"],
    },
    {
      text: "Il regista di 'Nightmare before Christmas', Tim burton ha basato il film su un poema che di tre apgine che aveva scritto diversi anni prima",
      answer: "Tim Burton non è il regista, ma lo era Henry Selick",
      categories: ["cinema"],
    },
    {
      text: "Ne 'Il Quinto Elemento' Korben Dallas e Leeloo si incontrano con la Diva Plavalaguna sulla nave da crocera di lusso Fhloston Paradise per recuperare le quattro pietre elementari. Dopo essere stata mortalmente ferita, la Diva rivela che le pietre sono nascoste nella sua cabina",
      answer: "Le pietre si trovano dentro di lei",
      categories: ["sci_fi", "cinema"],
    },
    {
      text: "E' difficile trovare buoni titoli e a volte devono rimanere segreti. Per questo motivo 'Halo' era inizialmente conosciuto come 'Monkey nuts', 'Chrash Bandicoot' come 'Sonic's Ass Game' e 'Doom' era 'It's Green and Pissed'",
      answer: "Doom era 'Attack of the Attackers'",
      categories: ["videogames"],
    },
    {
      text: "In 'Sailor Moon', ogni guerriera ha un potere elementale unico e prende il nome da un pianeta di riferimento",
      answer:
        "Sailor Moon prende il nome dalla Luna e Pluto non è più ufficialmente un pianeta",
      categories: ["anime", "tv"],
    },
    {
      text: "Nel Signore degli Anelli Frodo entra in possesso dell'Unico Anello durante il centesimo compleanno di Bilbo, in cui Bilbo annuncia che avrebbe lasciato la Contea",
      answer: "Era il 111esimo compleanno",
      categories: ["fantasy", "books", "cinema"],
    },
    {
      text: "Hunger Games ha luogo in un Nord America post apocalittico, ora chiamato Panem come semplificazione di Pan America",
      answer: "Deriva invece da panem et circenses",
      categories: ["cinema"],
    },
    {
      text: "Ne 'Guida galttica per autostoppisti' ci sono numerose navi spaziali alimentate da tecnologie assurde. Una di queste è la Bistromath che compie viaggi spaziali istantanei grazie al suo motore a 'improbabilità infinita', una tecnologia in grado di alterare la realtà che permette alla nave di attraversare ogni punto dell'universo contemporaneamente",
      answer: "La Bistromath è alimentata da un Motore Bistromatico. L'improbabilità infinita è il motore dell'Heart of Gold",
      categories: ["sci_fi", "books", "cinema"],
    },
    {
      text: "Ne 'I Monthy Python e il Sacro Grail', I Cavalieri che dicono Tiè rifiutano di lasciar passare Artù e i suoi uomini attraverso il ponte fino a quando non avranno portato loro un po' di verde. Dopo avergli portato un cespuglio, i cavalieri chiedono un'altra prova: un altro po' di verde da mettere leggermente sopra il primo, In seguito i cavaliere che dicono Tiè chiederanno di abbattere un albero con un aringa",
      answer: "Dopo essere tornato col primo po' di verde, non sono più Cavalieri che dicono Tiè, ma i Cavalieri che dicono 'Ecchi ecchi ecchi ecchi senef... otte'",
      categories: ["cinema", "fantasy"],
    },
    {
      text: "In buona parte del MondoDisco di Terry Pratchett, si festeggia una festa chiamata Hogswatch, che è molto simile al Natale. Si celebra il 25 dicembre, e la gente decora querce in vaso in attesa di Babbo Maiale che guida una slitta trainata da cinghiali selvatici per portare regali ",
      answer: "Si festeggia il 32 dicembre",
      categories: ["fantasy", "books"],
    },
    {
      text: "Nel Doctor Who, personalità ricche e distinte si raggruppano sulla stazione spaziale, Platform One, per osservare la Terra venir distrutta dal sole nell'anno 5 miliardi. Tra le persone c'è Lady Cassandra O'Brien Dot Delta 17, un alieno rappresentato come un volto umano su un foglio di pelle tenuto da una cornice di metallo che dev'essere costantemente umidificata",
      answer: "Cassandra è l'ultimo umano esistente, divenuto così in seguito a 708 operazioni chirurgiche",
      categories: ["sci_fi", "tv"],
    },
  ];
  
  export default questions;