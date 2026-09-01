/* ==========================================================================
   PORTFOLIO — Cristofer Corrado
   Script unico: menu mobile, scroll-spy, back-to-top, form contatti.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     1. MENU MOBILE
  ------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Chiude il menu quando si clicca su un link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  /* ------------------------------------------------------------------
     1b. NAVBAR ALLO SCROLL — più piccola e più scura dopo un po' di scroll
  ------------------------------------------------------------------ */
  const toggleNavbarScrolled = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', toggleNavbarScrolled, { passive: true });
  toggleNavbarScrolled();

  /* ------------------------------------------------------------------
     2. SCROLL-SPY — evidenzia il link attivo nella navbar
  ------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let current = sections[0]?.id;
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        current = section.id;
      }
    });

    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ------------------------------------------------------------------
     3. BACK TO TOP
  ------------------------------------------------------------------ */
  const backToTop = document.getElementById('backToTop');

  const toggleBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  /* ------------------------------------------------------------------
     3b. SCROLL REVEAL — fa apparire gli elementi con un fade/slide
     quando entrano nel viewport, usando IntersectionObserver.
  ------------------------------------------------------------------ */
  const revealSelectors = [
    '.section-title',
    '.stat-card',
    '.timeline-item',
    '.service-card',
    '.skill-card',
    '.project-card',
    '.process-card',
    '.why-card',
    '.faq-item',
    '.info-card',
    '.about-text',
    '.contact-card',
    '.contact-form'
  ];

  const revealEls = document.querySelectorAll(revealSelectors.join(','));

  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: nessun IntersectionObserver disponibile, mostra tutto subito
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  /* ------------------------------------------------------------------
     3c. CONTATORI ANIMATI — anima i numeri delle statistiche quando
     la sezione "Chi sono" diventa visibile.
  ------------------------------------------------------------------ */
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  } else {
    counters.forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      el.textContent = target + suffix;
    });
  }

  /* ------------------------------------------------------------------
     4. FORM CONTATTI
     Validazione base lato client, poi invio tramite Formspree (endpoint
     gratuito, nessun backend da gestire). Se FORMSPREE_ENDPOINT non è
     stato configurato con il tuo vero ID, il form usa in automatico
     un fallback via mailto, così il sito funziona comunque.

     Per attivare Formspree:
     1. Crea un account gratuito su https://formspree.io
     2. Crea un nuovo form e copia il suo endpoint (es. https://formspree.io/f/xxxxxxx)
     3. Incolla l'endpoint qui sotto al posto di FORMSPREE_ENDPOINT
  ------------------------------------------------------------------ */
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbgjgynb'; 

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !subject || !message) {
        showStatus('Compila tutti i campi prima di inviare.', 'error');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showStatus('Inserisci un indirizzo email valido.', 'error');
        return;
      }

      // Fallback via mailto se Formspree non è ancora configurato
      if (!FORMSPREE_ENDPOINT) {
        const mailtoBody = encodeURIComponent(
          `Nome: ${name}\nEmail: ${email}\n\n${message}`
        );
        const mailtoLink = `mailto:cristofer.corrado@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

        window.location.href = mailtoLink;
        showStatus('Apro il tuo client email con il messaggio pronto da inviare.', 'success');
        contactForm.reset();
        return;
      }

      const submitBtn = contactForm.querySelector('.submit-btn');
      if (submitBtn) submitBtn.disabled = true;
      showStatus('Invio in corso...', '');

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(contactForm)
        });

        if (response.ok) {
          showStatus('Messaggio inviato! Ti risponderò il prima possibile.', 'success');
          contactForm.reset();
        } else {
          showStatus('Non sono riuscito a inviare il messaggio. Riprova o scrivimi via email.', 'error');
        }
      } catch (error) {
        showStatus('Errore di connessione. Riprova o scrivimi via email.', 'error');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  function showStatus(text, type) {
    if (!formStatus) return;
    formStatus.textContent = text;
    formStatus.className = `form-status ${type}`;
  }

});
