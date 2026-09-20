# Modifiche v4 — pronto per la pubblicazione

## Bug corretti

1. **Menu che non si evidenziava correttamente**
   - `script.js`: lo scroll-spy considerava anche le sezioni senza voce nel
     menu (Percorso, Servizi, FAQ). Attraversandole, TUTTE le voci del menu
     si spegnevano. Ora vengono considerate solo le sezioni collegate a un
     link del menu.
   - `style.css`: c'era un doppio offset di scroll (`scroll-padding-top`
     su `html` + `scroll-margin-top` su ogni `section`, che si sommavano a
     ~193px). Questo causava sia lo sfasamento del link evidenziato sia il
     grande spazio vuoto sopra i titoli quando si arrivava a una sezione
     tramite il menu. Consolidato in un unico offset coerente.

2. **Spazio vuoto sopra i titoli delle sezioni**
   - Vedi punto precedente: era causato dal doppio offset di scroll, non
     dalla struttura delle sezioni stesse.

## Contenuti resi più onesti

- Rimossa la voce "2026 — Primi clienti" dal Percorso (non ci sono ancora
  clienti reali, meglio non lasciarlo intendere).
- "Progetti realizzati" → "Demo disponibili" nella sezione statistiche,
  con l'elenco dei tre progetti demo mostrato sotto.

## Form contatti

- Aggiunti `action="https://formspree.io/f/mbgjgynb"` e `method="POST"`
  al form come fallback nativo, nel caso lo script non parta (JS
  disabilitato, errore di rete sullo script, ecc.). L'invio via `fetch`
  in `script.js` resta il metodo principale (mostra lo stato "Invio in
  corso..." e i messaggi di successo/errore senza ricaricare la pagina).
- Aggiunto redirect (`_next`) verso `grazie.html`, un oggetto email
  predefinito (`_subject`) e un campo honeypot anti-spam (`_gotcha`).
- ⚠️ Da fare tu: dopo la pubblicazione, invia un messaggio di prova dal
  sito live e verifica che arrivi all'email/dashboard Formspree. Non è
  stato possibile verificare l'endpoint da questo ambiente (nessun
  accesso a formspree.io).

## Nuova sezione "Prezzi"

- Aggiunta la sezione `#pricing` tra Progetti e FAQ, con tre fasce
  indicative (Landing Page da €250, Sito per attività da €450, Restyling
  da €200), lista di cosa è incluso e pulsante WhatsApp diretto per
  ciascuna. Aggiunta voce "Prezzi" nel menu e nel footer.
  I prezzi sono indicativi: modificali liberamente in `index.html`
  (cerca `<!-- PREZZI -->`) in base a quello che vuoi davvero offrire.

## Verifiche responsive effettuate

Testato con un browser automatizzato a più risoluzioni (1440px desktop,
820px tablet, 390px e 320px mobile): nessun overflow orizzontale, menu
mobile funzionante, nessuno spazio vuoto anomalo, scroll-spy corretto su
tutte le dimensioni.

Non ancora testato: dispositivi fisici reali (iPhone/Android). Il
comportamento su un vero dispositivo può differire leggermente da un
emulatore, quindi un controllo finale su un telefono reale prima della
pubblicazione resta consigliato.
