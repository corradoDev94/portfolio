document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  const setActive = () => {
    let current = sections[0]?.id;
    const pos = window.scrollY + 140;
    sections.forEach(s => { if (pos >= s.offsetTop) current = s.id; });
    navItems.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  const tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  const form = document.getElementById('restaurantForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const date = form.date.value;
      if (!name || !phone || !date) {
        status.textContent = 'Compila nome, telefono e data prima di inviare.';
        status.className = 'form-status error';
        return;
      }
      const people = form.people.value;
      const notes = form.notes.value.trim();
      const body = encodeURIComponent(`Nome: ${name}\nTelefono: ${phone}\nData: ${date}\nPersone: ${people}\n\n${notes}`);
      window.location.href = `mailto:info@osteriabottega-demo.it?subject=Prenotazione tavolo&body=${body}`;
      status.textContent = 'Apro il tuo client email con la prenotazione pronta da inviare.';
      status.className = 'form-status success';
      form.reset();
    });
  }
});
