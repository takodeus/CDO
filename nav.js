/* nav.js — theme, series accordion, RE toggles, MA-site routing */

/* ── THEME ────────────────────────────────────────── */
function getTheme() { return localStorage.getItem('ma-theme') || 'dark'; }

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ma-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const label = btn.querySelector('.theme-label');
  const icon  = btn.querySelector('.theme-icon');
  if (theme === 'light') {
    if (label) label.textContent = 'Dark mode';
    if (icon)  icon.textContent  = '🌙';
    btn.setAttribute('aria-pressed', 'true');
  } else {
    if (label) label.textContent = 'Light mode';
    if (icon)  icon.textContent  = '☀';
    btn.setAttribute('aria-pressed', 'false');
  }
}

function toggleTheme() { applyTheme(getTheme() === 'dark' ? 'light' : 'dark'); }

/* ── SERIES ACCORDION ─────────────────────────────── */
function toggleSeriesPart(id) {
  const part = document.getElementById(id);
  if (!part) return;
  const wasActive = part.classList.contains('active-part');
  document.querySelectorAll('.series-part').forEach(p => p.classList.remove('active-part'));
  if (!wasActive) part.classList.add('active-part');
}

/* ── SECTION + NAV ACTIVE STATE ──────────────────── */
function setSSecActive(id) {
  document.querySelectorAll('.series-section-item').forEach(s => s.classList.remove('sec-active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('sec-active');
}

function setNavActive(id) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

/* ── RE PANEL TOGGLE ──────────────────────────────── */
function toggleRE(sectionId) {
  const btn   = document.querySelector('[data-re-target="' + sectionId + '"]');
  const panel = document.getElementById('re-' + sectionId);
  if (!panel || !btn) return;
  const isActive = panel.classList.toggle('active');
  btn.classList.toggle('active', isActive);
  if (isActive) setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}

/* ── DRIFT ACCORDION ──────────────────────────────── */
function toggleDRE(el) { el.closest('.dre').classList.toggle('open'); }

/* ── KNOWLEDGE STACK EXPAND ───────────────────────── */
function toggleLayer(el) {
  const block   = el.closest('.layer-block');
  if (!block) return;
  const content = block.querySelector('.lb-expand-content');
  if (!content) return;
  block.classList.toggle('expanded');
  content.classList.toggle('visible');
}

/* ── MOBILE MENU ──────────────────────────────────── */
function openSidebar() {
  document.getElementById('sidebar')?.classList.add('mobile-open');
  const ov = document.getElementById('sidebar-overlay');
  if (ov) ov.classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('mobile-open');
  const ov = document.getElementById('sidebar-overlay');
  if (ov) ov.classList.remove('visible');
  document.body.style.overflow = '';
}
function toggleMobileMenu() {
  const s = document.getElementById('sidebar');
  if (!s) return;
  s.classList.contains('mobile-open') ? closeSidebar() : openSidebar();
}

/* ── INIT ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getTheme());

  // Mark active page in sidebar nav (data-page attribute)
  const file   = window.location.pathname.split('/').pop() || 'index.html';
  const pageId = (file === 'index.html' || file === 'part-02.html') ? 'home' : file.replace('.html', '');
  document.querySelectorAll('.nav-item[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  // Mark active page in series section items (href-based, for Part II pages)
  document.querySelectorAll('.series-section-item[href]').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('sec-active', href === file || (file === '' && href === 'part-02.html'));
  });

  // Close mobile sidebar on any nav or section click
  document.querySelectorAll('.nav-item, .series-section-item, .series-part-header a').forEach(a => {
    a.addEventListener('click', closeSidebar);
  });
});
