/* nav.js — client-side routing and interactive behaviors */

const PAGES = ['home','gap','memory-types','knowledge-stack','decision-lineage','drift-register','decay-governance','moat'];
const PAGE_NUMS = {'home':'00','gap':'01','memory-types':'02','knowledge-stack':'03','decision-lineage':'04','drift-register':'05','decay-governance':'06','moat':'07'};

// ── ROUTER ─────────────────────────────────────────────
function navigateTo(pageId, pushState = true) {
  const file = pageId === 'home' ? 'index.html' : pageId + '.html';

  // If we're in a multi-file setup, navigate properly
  if (window.location.pathname.indexOf(file) === -1) {
    window.location.href = file;
    return;
  }

  // Single-file SPA fallback
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.nav-item').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  const num = PAGE_NUMS[pageId] || '00';
  const mobileNum = document.querySelector('.mobile-page-num');
  if (mobileNum) mobileNum.textContent = num;

  updateProgress(pageId);
  if (pushState) history.pushState({ page: pageId }, '', file);
}

function updateProgress(pageId) {
  const idx = PAGES.indexOf(pageId);
  const pct = idx < 0 ? 0 : Math.round((idx / (PAGES.length - 1)) * 100);
  const fill = document.querySelector('.progress-fill');
  if (fill) fill.style.width = pct + '%';
}

// ── RE PANEL TOGGLE ────────────────────────────────────
function toggleRE(sectionId) {
  const btn = document.querySelector(`[data-re-target="${sectionId}"]`);
  const panel = document.getElementById('re-' + sectionId);
  if (!panel || !btn) return;
  const isActive = panel.classList.toggle('active');
  btn.classList.toggle('active', isActive);
  btn.querySelector('.btn-dot').style.background = isActive ? 'var(--teal-light)' : '';
  if (isActive) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Global RE toggle — toggles all panels on page
function toggleAllRE() {
  const panels = document.querySelectorAll('.re-panel');
  const anyOpen = [...panels].some(p => p.classList.contains('active'));
  panels.forEach(p => {
    const id = p.id.replace('re-', '');
    const btn = document.querySelector(`[data-re-target="${id}"]`);
    p.classList.toggle('active', !anyOpen);
    if (btn) btn.classList.toggle('active', !anyOpen);
  });
}

// ── DRIFT REGISTER ACCORDION ──────────────────────────
function toggleDRE(el) {
  const dre = el.closest('.dre');
  dre.classList.toggle('open');
}

// ── KNOWLEDGE STACK EXPAND ────────────────────────────
function toggleLayer(el) {
  const block = el.closest('.layer-block');
  if (!block) return;
  const content = block.querySelector('.lb-expand-content');
  if (!content) return;
  block.classList.toggle('expanded');
  content.classList.toggle('visible');
}

// ── MOBILE MENU ───────────────────────────────────────
function toggleMobileMenu() {
  document.getElementById('sidebar').classList.toggle('mobile-open');
}

// Close mobile menu on nav click
document.querySelectorAll('.nav-item').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('mobile-open');
  });
});

// ── INIT ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Set active nav item based on current page
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  const pageId = file === 'index.html' ? 'home' : file.replace('.html', '');
  
  document.querySelectorAll('.nav-item').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });
  
  const num = PAGE_NUMS[pageId] || '00';
  const mobileNum = document.querySelector('.mobile-page-num');
  if (mobileNum) mobileNum.textContent = num;
  
  updateProgress(pageId);

  // Scroll-triggered fade-in
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in-visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

window.addEventListener('popstate', e => {
  if (e.state && e.state.page) navigateTo(e.state.page, false);
});
