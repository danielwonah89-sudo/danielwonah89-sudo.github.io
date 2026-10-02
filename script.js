const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const noteMessage = document.querySelector('#note-message');
const characterCount = document.querySelector('#character-count');
noteMessage.addEventListener('input', () => {
  characterCount.textContent = `${noteMessage.value.length} / 500`;
});

document.querySelector('#note-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#note-name').value.trim();
  const message = noteMessage.value.trim();
  const subject = encodeURIComponent(name ? `A private note from ${name}` : 'A private note from your website');
  const body = encodeURIComponent(`${name ? `From: ${name}\n\n` : ''}${message}`);
  document.querySelector('#form-hint').textContent = 'Your email app is opening with the note addressed to Daniel. Send it there to deliver it privately.';
  window.location.href = `mailto:danielwonah89@gmail.com?subject=${subject}&body=${body}`;
});

const revealSections = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealSections.forEach((section) => revealObserver.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add('is-visible'));
}

const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const navSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  navSections.forEach((section) => activeSectionObserver.observe(section));
}
