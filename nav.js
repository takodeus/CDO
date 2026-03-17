/* nav.js — routing, RE toggles, theme switching */

const PAGE_NUMS = {
  'home':'00','gap':'01','memory-types':'02','knowledge-stack':'03',
  'decision-lineage':'04','drift-register':'05','decay-governance':'06','moat':'07'
};

/* ── THEME ──────────────────────────────────────── */
function getTheme() {
  return localStorage.getItem('ma-theme') || 'dark';
}

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

function toggleTheme() {
  applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

/* ── RE PANEL TOGGLE ────────────────────────────── */
function toggleRE(sectionId) {
  const btn   = document.querySelector(`[data-re-target="${sectionId}"]`);
  const panel = document.getElementById('re-' + sectionId);
  if (!panel || !btn) return;
  const isActive = panel.classList.toggle('active');
  btn.classList.toggle('active', isActive);
  if (isActive) setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}

/* ── DRIFT ACCORDION ────────────────────────────── */
function toggleDRE(el) {
  el.closest('.dre').classList.toggle('open');
}

/* ── KNOWLEDGE STACK EXPAND ─────────────────────── */
function toggleLayer(el) {
  const block   = el.closest('.layer-block');
  if (!block) return;
  const content = block.querySelector('.lb-expand-content');
  if (!content) return;
  block.classList.toggle('expanded');
  content.classList.toggle('visible');
}

/* ── MOBILE MENU ────────────────────────────────── */
function toggleMobileMenu() {
  document.getElementById('sidebar').classList.toggle('mobile-open');
}

/* ── INIT ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme immediately
  applyTheme(getTheme());

  // Mark active nav item
  const file   = window.location.pathname.split('/').pop() || 'index.html';
  const pageId = file === 'index.html' ? 'home' : file.replace('.html', '');
  document.querySelectorAll('.nav-item').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });
  const mobileNum = document.querySelector('.mobile-page-num');
  if (mobileNum) mobileNum.textContent = PAGE_NUMS[pageId] || '00';

  // Close mobile menu on nav click
  document.querySelectorAll('.nav-item').forEach(a => {
    a.addEventListener('click', () => document.getElementById('sidebar').classList.remove('mobile-open'));
  });
});
