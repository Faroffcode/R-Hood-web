const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navLinks.style.display = open ? '' : 'flex';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      navLinks.style.display = '';
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Keep the landing page aligned with the current RobinHood feature set.
const featureGrid = document.querySelector('.feature-grid');
if (featureGrid && !featureGrid.querySelector('[data-feature="recognition"]')) {
  const recognition = document.createElement('article');
  recognition.className = 'feature reveal delay-1';
  recognition.dataset.feature = 'recognition';
  recognition.innerHTML = `
    <div class="feature-number">07</div>
    <div class="feature-icon">⌕</div>
    <h3>Recognize music.</h3>
    <p>Identify music with RobinHood and jump straight into the track you want to hear.</p>
    <div style="position:absolute;bottom:28px;left:27px;right:27px;color:#666;font:12px 'Space Grotesk';letter-spacing:.08em;text-transform:uppercase;">
      <span style="color:var(--accent)">●</span> Music recognition
    </div>`;
  featureGrid.appendChild(recognition);
  revealObserver.observe(recognition);
}

// Quick-scan summary for visitors who want the essentials at a glance.
const sectionHeading = document.querySelector('#features .section-heading');
if (sectionHeading && !document.querySelector('[data-quick-features]')) {
  const quick = document.createElement('div');
  quick.dataset.quickFeatures = 'true';
  quick.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin:-32px 0 38px;';
  [
    '🎵 Background playback',
    '📥 Offline caching',
    '🎤 Synced lyrics',
    '👥 Listen together',
    '🎚️ Advanced audio',
    '🎨 Powerful theming'
  ].forEach((label) => {
    const item = document.createElement('span');
    item.textContent = label;
    item.style.cssText = 'border:1px solid var(--line);border-radius:999px;padding:9px 13px;color:#aaa;font-size:11px;background:#0d0d0d;';
    quick.appendChild(item);
  });
  sectionHeading.after(quick);
}

// Direct downloads use GitHub's latest-release endpoint, so these links
// automatically follow the newest stable release.
const downloadOptions = document.querySelector('.download-options');
if (downloadOptions) {
  downloadOptions.innerHTML = `
    <a href="https://github.com/Faroffcode/robinHood/releases/latest/download/RobinHood.apk">
      <strong>RobinHood.apk</strong><span>Recommended · FOSS ↓</span>
    </a>
    <a href="https://github.com/Faroffcode/robinHood/releases/latest/download/RobinHood-with-Google-Cast.apk">
      <strong>Google Cast build</strong><span>Cast support ↓</span>
    </a>
    <a href="https://github.com/Faroffcode/robinHood/releases/latest/download/RobinHood-izzy.apk">
      <strong>IzzyOnDroid build</strong><span>Izzy-compatible ↓</span>
    </a>`;
}

// Keep the primary CTA synchronized with the same direct stable APK URL.
const stableButton = document.querySelector('.download-copy .button.big');
if (stableButton) {
  stableButton.href = 'https://github.com/Faroffcode/robinHood/releases/latest/download/RobinHood.apk';
  stableButton.setAttribute('download', '');
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}
