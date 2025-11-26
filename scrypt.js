
// Simple dark/light mode toggle with local storage
(function () {
  const root = document.documentElement; // <html>
  const btn = document.getElementById('theme-toggle');

  if (!btn) {
    console.error('Theme toggle button not found');
    return;
  }

  // Load saved preference, or detect browser preference
  const saved = localStorage.getItem('theme');
  if (saved) {
    root.setAttribute('data-theme', saved);
    console.log('Loaded saved theme:', saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
    console.log('Applied dark theme based on browser preference');
  } else {
    console.log('Using default light theme');
  }

  function updateButtonLabel() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    console.log('Button updated. Current theme:', root.getAttribute('data-theme'));
  }

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateButtonLabel();
    console.log('Theme toggled to:', next);
  });

  updateButtonLabel();
})();
