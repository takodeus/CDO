/* nav.js — routing, RE toggles, theme switching */

const PAGES = ['home','gap','memory-types','knowledge-stack','decision-lineage','drift-register','decay-governance','moat'];
const PAGE_NUMS = {'home':'00','gap':'01','memory-types':'02','knowledge-stack':'03','decision-lineage':'04','drift-register':'05','decay-governance':'06','moat':'07'};

/* ── THEME ──────────────────────────────────────────── */
function initTheme() {
  const saved = localStorage.getItem('ma-theme') || 'dark';
  applyTheme(saved, false);
}

function applyTheme(theme, save = true) {
  document.documentElement.setAttribute('data-theme', theme);
  if (save) localStorage.setItem('ma-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const label = btn.querySelector('.theme-toggle-label');
  if (label) label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ── RE PANEL TOGGLE ─────────────────────────────────── */
function toggleRE(sectionId) {
  const btn = document.querySelector(`[data-re-target="${sectionId}"]`);
  const panel = document.getElementById('re-' + sectionId);
  if (!panel || !btn) return;
  const isActive = panel.classList.toggle('active');
  btn.classList.toggle('active', isActive);
  if (isActive) {
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }
}

/* ── DRIFT REGISTER ACCORDION ────────────────────────── */
function toggleDRE(el) {
  el.closest('.dre').classList.toggle('open');
}

/* ── KNOWLEDGE STACK EXPAND ──────────────────────────── */
function toggleLayer(el) {
  const block = el.closest('.layer-block');
  if (!block) return;
  const content = block.querySelector('.lb-expand-content');
  if (!content) return;
  block.classList.toggle('expanded');
  content.classList.toggle('visible');
}

/* ── MOBILE MENU ─────────────────────────────────────── */
function toggleMobileMenu() {
  document.getElementById('sidebar').classList.toggle('mobile-open');
}

/* ── INIT ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Theme
  initTheme();

  // Active nav from URL
  const file = window.location.pathname.split('/').pop() || 'index.html';
  const pageId = file === 'index.html' ? 'home' : file.replace('.html', '');
  document.querySelectorAll('.nav-item').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });
  const mobileNum = document.querySelector('.mobile-page-num');
  if (mobileNum) mobileNum.textContent = PAGE_NUMS[pageId] || '00';

  // Close mobile menu on nav click
  document.querySelectorAll('.nav-item').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('sidebar').classList.remove('mobile-open');
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in-visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
