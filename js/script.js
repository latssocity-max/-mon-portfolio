const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    galleryItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.borderBottomColor = 'rgba(124, 58, 237, 0.4)';
  } else {
    navbar.style.borderBottomColor = 'rgba(124, 58, 237, 0.2)';
  }
});

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current + (target >= 1000 ? '+' : '+');
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString('fr-FR') + '+';
    }
  }

  requestAnimationFrame(update);
}

function startCounters(container) {
  const counters = container.querySelectorAll('.stat-number[data-target]');
  counters.forEach(c => animateCounter(c));
}

let countersAnimated = false;

function triggerCounters() {
  if (countersAnimated) return;
  const section = document.getElementById('a-propos');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    countersAnimated = true;
    startCounters(section);
  }
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });
  const aboutSection = document.getElementById('a-propos');
  if (aboutSection) observer.observe(aboutSection);
}

window.addEventListener('scroll', triggerCounters, { passive: true });
triggerCounters();

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const btn = contactForm.querySelector('.btn');
    btn.disabled = true;
    btn.textContent = 'Envoi en cours...';
    if (formMessage) {
      formMessage.className = 'form-message';
      formMessage.textContent = '';
    }
  });
}


