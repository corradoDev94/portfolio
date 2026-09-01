# Portfolio - Cristofer Corrado

Portfolio personale sviluppato per presentare le competenze come sviluppatore
web freelance, con 3 siti demo reali e cliccabili a supporto dei progetti.

## Struttura

```
portfolio/
│
├── index.html
├── style.css
├── legal.css
├── script.js
├── download-immagini.sh    → scarica in locale le 30 foto usate nel sito (vedi sotto)
├── 404.html
├── privacy.html             → Privacy Policy (finalizzata)
├── cookie.html               → Cookie Policy (finalizzata)
├── grazie.html
├── robots.txt
├── sitemap.xml
├── manifest.json
├── images/
│   ├── projects/            → foto delle 4 card progetto (portfolio, palestra, barbiere, ristorante)
│   ├── avatar.png, favicon*, og-cover.png
│   └── mockup-*.svg          → non più usati nelle card, tenuti come backup
├── demo-palestra/
│   ├── index.html, style.css, script.js
│   └── images/               → hero + 6 foto galleria
├── demo-ristorante/
│   ├── index.html, style.css, script.js
│   └── images/               → hero + 9 foto galleria
├── demo-barbiere/
│   ├── index.html, style.css, script.js
│   └── images/               → hero + 8 foto galleria
└── README.md
```

## Novità di questa versione

**Struttura e leggibilità**
- Ogni sezione della homepage ora occupa almeno l'altezza dello schermo,
  con il contenuto centrato verticalmente: non si vede più un pezzo della
  sezione successiva finché non scorri di proposito.
- Rimossa completamente la sezione "Come lavoro" (metodo + "perché
  scegliermi"), incluso tutto il CSS collegato.
- Rimossa la sezione Recensioni dal portfolio (nessuna recensione reale
  ancora disponibile).
- Rimossa la CTA extra "Hai un'attività?": resta solo la sezione Contatti,
  già sufficiente, subito sotto.

**Progetti**
- Aggiunta una foto reale alla card "Portfolio Personale" (prima non
  l'aveva).
- Riordinati: Portfolio Personale, Officina Fitness (palestra), Distretto
  Barber Co. (barbiere) subito sotto la palestra, poi Osteria Bottega
  (ristorante). Griglia forzata a 2 colonne perché l'ordine resti sempre
  quello, anche su schermi larghi.

**Immagini**
- Tutte le immagini (30 in totale: 4 card progetto + gallerie/hero delle
  3 demo) ora puntano prima di tutto a un **percorso locale** dentro
  `images/`. Se il file locale non è ancora presente, il sito carica
  automaticamente la stessa immagine da Pexels come fallback: il sito
  funziona comunque, da subito, anche senza fare nulla.
- **Per rendere le immagini davvero locali** (nessuna dipendenza da URL
  esterni): apri il terminale nella cartella `portfolio/` ed esegui
  `bash download-immagini.sh`. Scarica tutte e 30 le foto nei percorsi
  giusti in pochi secondi. Richiede `curl` (già presente su Mac/Linux; su
  Windows usa Git Bash o WSL).

**Testi e coerenza**
- Email nello Schema.org uniformata a `cristofer.corrado@gmail.com`
  (prima era diversa da quella usata nel resto del sito).
- Privacy Policy e Cookie Policy riscritte per intero e finalizzate:
  descrivono i servizi realmente usati dal sito (Formspree, Google Fonts,
  Font Awesome, hosting GitHub Pages), non sono più etichettate come
  "bozza". Restano comunque un testo di buon livello ma non una
  consulenza legale professionale: per un uso continuativo, soprattutto
  se in futuro aggiungerai analytics o raccolta dati più ampia, fai una
  verifica con un consulente privacy.
- URL del sito aggiornati ovunque (canonical, sitemap.xml, robots.txt,
  Schema.org, og:url/og:image) da `cristofercorrado.it` (dominio che non
  possiedi) a `https://corradodev94.github.io/portfolio/`, l'URL che
  avrà il sito se lo pubblichi con GitHub Pages da un repository chiamato
  `portfolio`. **Se chiami il repository in modo diverso, sostituisci
  `portfolio` con il nome reale del repository in questi 3 file:**
  `index.html`, `sitemap.xml`, `robots.txt` (cerca
  `github.io/portfolio`).

**Controlli effettuati**
- Controllati uno per uno tutti i link (`href`) di portfolio, demo e
  pagine legali (privacy, cookie, grazie, 404): nessun link vuoto, rotto
  o con `#` placeholder.
- Controllate tutte le ancore di navigazione interne (`#about`,
  `#projects`, `#corsi`, ecc.): puntano tutte a sezioni realmente
  presenti nella pagina, comprese quelle rimosse (nessun link "morto"
  rimasto).
- Tag HTML bilanciati su tutti i file modificati.

## Cose che restano da fare tu

1. **Formspree** — `FORMSPREE_ENDPOINT` in `script.js` è ancora vuoto: non
   posso creare un account al posto tuo. Vai su
   [formspree.io](https://formspree.io), crea un form gratuito, copia
   l'endpoint e incollalo al posto di `''` in `script.js` (istruzioni
   dettagliate già nel commento sopra la riga). Finché non lo fai, il
   form usa il fallback `mailto:` e funziona comunque.
2. **Scaricare le immagini in locale** — esegui `bash download-immagini.sh`
   una volta, dalla cartella `portfolio/` (vedi sopra).
3. **Pubblicare online** — crea un repository GitHub chiamato `portfolio`
   (o aggiorna gli URL come spiegato sopra se lo chiami diversamente) e
   attiva GitHub Pages: portfolio e demo saranno raggiungibili con un
   link pubblico, senza bisogno di scaricare nulla.
4. **Test su dispositivi reali** — apri il sito pubblicato su PC
   (Chrome), telefono (Chrome/Safari) e se possibile tablet. Ho rivisto
   il CSS responsive (menu mobile, griglie che collassano a 1 colonna,
   pulsanti WhatsApp/telefono) ma non posso aprire un browser reale su un
   tuo dispositivo: fai comunque un giro completo prima di mandarlo a un
   cliente.
5. **Dati fittizi nelle demo** — nome attività, indirizzo, email e
   recensioni nelle 3 demo restano di esempio (dichiarati chiaramente nel
   banner di ogni demo). Aggiornali solo se userai una demo per una prova
   con un cliente reale.
6. **Privacy/Cookie Policy** — finalizzate e coerenti con il sito attuale;
   se in futuro aggiungi Google Analytics, mappe o altri servizi,
   aggiornale di conseguenza (indicato anche nei rispettivi testi).

## Pubblicazione

Il sito è pensato per essere pubblicato con GitHub Pages: basta caricare
l'intera cartella `portfolio/` (comprese le sottocartelle `demo-*`) in un
repository chiamato `portfolio`.

## Contatti

Email: cristofer.corrado@gmail.com
WhatsApp: +39 351 014 4331

GitHub:
https://github.com/corradodev94
