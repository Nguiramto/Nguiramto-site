// Mobile nav toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn) menuBtn.addEventListener('click', ()=> navLinks.classList.toggle('show'));

// Page enter transition
window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.page').forEach(el=>el.classList.add('show'));
});

// Smooth scroll for same-page anchors
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (target){
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth'});
  }
});

async function loadJSON(path){
  try{ const r = await fetch(path); if(!r.ok) throw new Error(); return await r.json(); }
  catch(e){ console.warn('Failed to load', path); return null; }
}

// Render projects
(async ()=>{
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const data = await loadJSON('assets/data/projects.json');
  if (!data?.projects?.length){ grid.innerHTML = '<p>Projects coming soon.</p>'; return; }
  grid.innerHTML = data.projects.map(p=>`
    <article class="card">
      <img src="${p.image || 'assets/images/placeholder.svg'}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.description||''}</p>
      <div>${(p.tech||[]).map(t=>`<span class="badge">${t}</span>`).join('')}</div>
      <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;">
        ${p.repo?`<a class="btn secondary" target="_blank" href="${p.repo}"><i class="fa-brands fa-github"></i> Repo</a>`:''}
        ${p.demo?`<a class="btn" target="_blank" href="${p.demo}">Live Demo</a>`:''}
        ${p.docs?`<a class="btn secondary" target="_blank" href="${p.docs}">Docs</a>`:''}
      </div>
    </article>
  `).join('');
})();

// Render products
(async ()=>{
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  const data = await loadJSON('assets/data/products.json');
  if (!data?.products?.length){ grid.innerHTML = '<p>Products will appear here.</p>'; return; }
  grid.innerHTML = data.products.map(p=>`
    <article class="card">
      <img src="${p.image || 'assets/images/placeholder.svg'}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.description||''}</p>
      <div>${(p.tags||[]).map(t=>`<span class="badge">${t}</span>`).join('')}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;">
        <strong>${p.price||''}</strong>
        ${p.buy?`<a class="btn" target="_blank" href="${p.buy}">Buy</a>`:''}
      </div>
    </article>
  `).join('');
})();

