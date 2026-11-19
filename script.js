// Small helpers for the site: mobile menu, work filters and the image lightbox.
// You don't need to edit this file to change any text or projects.

// ----- Mobile menu -----
const toggle = document.querySelector('.menu-toggle');
const links = document.getElementById('nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? 'Close' : 'Menu';
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    }
  });
}

// ----- Work filters -----
const filters = document.querySelectorAll('.filter');
const items = [...document.querySelectorAll('.work-item')];
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filters.forEach((b) => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', b === btn);
    });
    items.forEach((it) => { it.hidden = f !== 'all' && it.dataset.category !== f; });
  });
});

// ----- Lightbox -----
const box = document.querySelector('.lightbox');
if (box) {
  const img = box.querySelector('.lightbox-img img');
  const meta = box.querySelector('.lightbox-text small');
  const title = box.querySelector('.lightbox-text h3');
  const desc = box.querySelector('.lightbox-text p');
  let current = null;

  const visible = () => items.filter((it) => !it.hidden);

  function show(item) {
    current = item;
    const btn = item.querySelector('button');
    const thumb = item.querySelector('.thumb img');
    img.src = btn.dataset.full;
    img.alt = thumb.alt;
    meta.textContent = item.querySelector('.cap small').textContent;
    title.textContent = item.querySelector('.cap strong').textContent;
    desc.textContent = item.querySelector('.desc').textContent;
  }

  function step(dir) {
    const list = visible();
    const i = list.indexOf(current);
    show(list[(i + dir + list.length) % list.length]);
  }

  items.forEach((item) => {
    item.querySelector('button').addEventListener('click', () => {
      show(item);
      box.showModal();
    });
  });

  box.querySelector('.lightbox-close').addEventListener('click', () => box.close());
  box.querySelector('.prev').addEventListener('click', () => step(-1));
  box.querySelector('.next').addEventListener('click', () => step(1));
  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  box.addEventListener('close', () => { if (current) current.querySelector('button').focus(); });
}
