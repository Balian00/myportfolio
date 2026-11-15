
// Theme management with three states: light, dark, auto (system)
(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const systemBtn = document.getElementById('theme-system');
  if (!toggleBtn || !systemBtn) return;

  const PREF_KEY = 'themePreference'; // values: 'light' | 'dark' | 'auto'
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function currentSystemTheme() {
    return mediaQuery.matches ? 'dark' : 'light';
  }

  function getStoredPref() {
    const v = localStorage.getItem(PREF_KEY);
    if (v === 'light' || v === 'dark' || v === 'auto') return v;
    return 'auto';
  }

  function applyEffectiveTheme() {
    const pref = getStoredPref();
    const effective = pref === 'auto' ? currentSystemTheme() : pref;
    root.setAttribute('data-theme', effective);
    updateButtons(pref, effective);
    // Update favicon and header icon according to the effective theme
    const favicon = document.getElementById('favicon');
    const headerIcon = document.getElementById('theme-icon');
    const fav = effective === 'dark' ? 'dark-theme_icon.png' : 'light-theme_icon.png';
    if (favicon) favicon.href = fav;
    if (headerIcon) headerIcon.src = fav;
  }

  function updateButtons(pref, effective) {
    toggleBtn.textContent = effective === 'dark' ? '☀️ Light mode' : '🌙 Dark mode';
    toggleBtn.setAttribute('aria-pressed', effective === 'dark' ? 'true' : 'false');
    systemBtn.textContent = pref === 'auto' ? '🖥 System (active)' : '🖥 System';
  }

  // React to system changes only when in auto
  mediaQuery.addEventListener('change', () => {
    if (getStoredPref() === 'auto') applyEffectiveTheme();
  });

  // Toggle cycles only between light/dark manual modes
  toggleBtn.addEventListener('click', () => {
    const pref = getStoredPref();
    let next;
    if (pref === 'auto') {
      // Enter manual cycle starting from opposite of current effective
      next = currentSystemTheme() === 'dark' ? 'light' : 'dark';
    } else {
      next = pref === 'dark' ? 'light' : 'dark';
    }
    localStorage.setItem(PREF_KEY, next);
    applyEffectiveTheme();
  });

  // System button returns to auto mode
  systemBtn.addEventListener('click', () => {
    localStorage.setItem(PREF_KEY, 'auto');
    applyEffectiveTheme();
  });

  // Initialize
  applyEffectiveTheme();
})();


document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelectorAll('nav a').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});
