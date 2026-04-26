/* ---------- Live clock (Asia/Jakarta) ---------- */
(function () {
  const el = document.getElementById('clock');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  });
  function tick() {
    el.textContent = fmt.format(new Date()) + ' WIB';
  }
  tick();
  setInterval(tick, 1000);
})();

/* ---------- Footer year ---------- */
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ---------- Reveal-on-scroll ---------- */
(function () {
  const targets = document.querySelectorAll(
    '.section, .hero__title, .hero__lede, .datacard, .project, .timeline__item, .skill-block'
  );
  targets.forEach((el) => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => io.observe(el));
})();

/* ---------- Smooth nav active state ---------- */
(function () {
  const links = document.querySelectorAll('.nav__links a[href^="#"]');
  const map = new Map();
  links.forEach((a) => {
    const id = a.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) map.set(sec, a);
  });

  if (!('IntersectionObserver' in window) || map.size === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = map.get(entry.target);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.style.color = '');
          link.style.color = 'var(--accent)';
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  map.forEach((_, sec) => io.observe(sec));
})();
