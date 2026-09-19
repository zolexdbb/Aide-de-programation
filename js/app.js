// Logique de l'application : onglets, sous-onglets, recherche, rendu des fiches, copier le code.
// Les données de chaque langage sont chargées AVANT ce fichier par index.html
// (des scripts classiques, pas des modules, pour fonctionner même en ouvrant
// index.html directement depuis l'explorateur de fichiers, sans serveur).

const D = window.CHEATSHEET_DATA || {};

// Structure de la navigation : "web" regroupe HTML/CSS/JS sous un seul onglet
// (avec des sous-onglets) pour ne pas surcharger la barre principale.
const NAV_RAW = [
  { id: 'accueil' },
  { id: 'c' },
  { id: 'cpp' },
  { id: 'arduino' },
  { id: 'web', label: 'Site Web', color: 'var(--web-color)', children: ['html', 'css', 'js'] },
  { id: 'python' },
  { id: 'git' }
];

const NAV = NAV_RAW.filter(entry => {
  if (entry.children) {
    entry.children = entry.children.filter(id => !!D[id]);
    return entry.children.length > 0;
  }
  return !!D[entry.id];
});

const tabsEl = document.getElementById('tabs');
const subtabsEl = document.getElementById('subtabs');
const panelsEl = document.getElementById('panels');
const searchEl = document.getElementById('search');
const searchRowEl = document.querySelector('.search-row');
const emptyEl = document.getElementById('empty');
const countBadgeEl = document.getElementById('count-badge');
const totalCountEl = document.getElementById('total-count');

let active = NAV.length ? NAV[0].id : null;
let activeSub = null;

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

// Mots vides ignorés dans la recherche, pour que taper une vraie question
// ("comment centrer une div en css ?") fonctionne comme une recherche par mots-clés.
const STOPWORDS = new Set([
  'comment', 'pourquoi', 'quand', 'est', 'ce', 'que', 'qu', 'qui', 'quoi',
  'quel', 'quelle', 'quels', 'quelles', 'un', 'une', 'des', 'le', 'la', 'les',
  'de', 'du', 'au', 'aux', 'a', 'à', 'et', 'ou', 'pour', 'avec', 'sur', 'dans',
  'par', 'en', 'se', 'ne', 'pas', 'on', 'je', 'tu', 'il', 'elle', 'on', 'nous',
  'vous', 'ils', 'elles', 'y', 'ai', 'as', 'avons', 'avez', 'ont', 'fait',
  'faire', 'faut', 'dois', 'doit', 'peut', 'peux', 'veux', 'veut', 'dont', 'mon',
  'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'si', 'sa', 'c', 'd', 'l'
]);

// Découpe une requête en mots-clés ; les mots vides sont retirés sauf si la
// requête n'était composée QUE de mots vides (dans ce cas on garde tout).
function searchTokens(query) {
  const all = query.toLowerCase().split(/[^a-zà-ÿ0-9+]+/i).filter(Boolean);
  const meaningful = all.filter(t => !STOPWORDS.has(t));
  return meaningful.length ? meaningful : all;
}

// Vrai si CHAQUE mot-clé apparaît quelque part dans le texte, peu importe l'ordre.
function matchesAllTokens(text, tokens) {
  return tokens.every(t => text.includes(t));
}

function navEntry(id) {
  return NAV.find(e => e.id === id);
}

function leafLangs() {
  const result = [];
  NAV.forEach(entry => {
    if (entry.id === 'accueil') return;
    if (entry.children) entry.children.forEach(id => D[id] && result.push(D[id]));
    else if (D[entry.id]) result.push(D[entry.id]);
  });
  return result;
}

function totalCards() {
  return leafLangs().reduce((sum, lang) => sum + lang.groups.reduce((s, g) => s + g.cards.length, 0), 0);
}

// Bascule vers un langage donné (utilisé par les boutons "En savoir plus" de l'accueil),
// en gérant le cas où ce langage est en fait un sous-onglet (ex : "html" sous "web").
function goTo(id) {
  const entry = NAV.find(e => e.id === id || (e.children && e.children.includes(id)));
  if (!entry) return;
  active = entry.id;
  activeSub = entry.children ? id : null;
  render();
  document.querySelector('.controls').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function buildTabs() {
  NAV.forEach(entry => {
    const data = D[entry.id];
    const label = entry.label || data.label;
    const color = entry.color || data.color;
    const btn = document.createElement('button');
    btn.className = 'tab';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', entry.id === active ? 'true' : 'false');
    btn.style.setProperty('--tab-color', color);
    btn.dataset.id = entry.id;
    btn.innerHTML = `<span class="dot"></span>${escapeHtml(label)}`;
    if (entry.children) {
      const nb = entry.children.reduce((s, id) => s + D[id].groups.reduce((s2, g) => s2 + g.cards.length, 0), 0);
      btn.title = entry.children.map(id => D[id].label).join(' / ') + ' — ' + nb + ' fiches';
    } else if (entry.id !== 'accueil') {
      const nb = data.groups.reduce((s, g) => s + g.cards.length, 0);
      btn.title = nb + ' fiches';
    }
    btn.addEventListener('click', () => {
      active = entry.id;
      activeSub = entry.children ? (entry.children.includes(activeSub) ? activeSub : entry.children[0]) : null;
      render();
    });
    tabsEl.appendChild(btn);
  });
  const langs = leafLangs();
  totalCountEl.textContent = totalCards() + ' fiches au total, réparties sur ' + langs.length + ' langages';
}

function buildSubtabs(entry) {
  subtabsEl.innerHTML = '';
  subtabsEl.hidden = false;
  entry.children.forEach(id => {
    const lang = D[id];
    const btn = document.createElement('button');
    btn.className = 'subtab';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', id === activeSub ? 'true' : 'false');
    btn.style.setProperty('--tab-color', lang.color);
    btn.textContent = lang.label;
    btn.addEventListener('click', () => {
      activeSub = id;
      render();
    });
    subtabsEl.appendChild(btn);
  });
}

function makeCard(card) {
  const div = document.createElement('div');
  div.className = 'card';
  div.dataset.search = (card.t + ' ' + card.d + ' ' + card.code).toLowerCase();
  div.innerHTML = `
    <div class="card-head">
      <h3>${escapeHtml(card.t)}</h3>
      <p>${escapeHtml(card.d)}</p>
    </div>
    <div class="code-wrap">
      <pre>${escapeHtml(card.code)}</pre>
      <button class="copy-btn" type="button">Copier</button>
    </div>
  `;
  const btn = div.querySelector('.copy-btn');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(card.code);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = card.code;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e2) {}
      document.body.removeChild(ta);
    }
    const original = btn.textContent;
    btn.textContent = 'Copié !';
    btn.dataset.copied = 'true';
    setTimeout(() => { btn.textContent = original; btn.dataset.copied = 'false'; }, 1400);
  });
  return div;
}

function makeIntroCard(intro) {
  const div = document.createElement('div');
  div.className = 'intro-card';
  div.dataset.search = (intro.label + ' ' + intro.tag + ' ' + intro.text).toLowerCase();
  div.innerHTML = `
    <div class="intro-emoji" aria-hidden="true">${intro.emoji}</div>
    <h3>${escapeHtml(intro.label)}</h3>
    <p class="intro-tag">${escapeHtml(intro.tag)}</p>
    <p class="intro-text">${escapeHtml(intro.text)}</p>
    ${intro.badge ? `<p class="intro-badge">${escapeHtml(intro.badge)}</p>` : ''}
    <button class="intro-btn" type="button">En savoir plus →</button>
  `;
  div.querySelector('.intro-btn').addEventListener('click', () => goTo(intro.target));
  return div;
}

// N'est appelée que lorsque la recherche est vide (render() bascule sinon vers
// renderGlobalSearch), donc affiche toujours les 8 présentations de langage.
function renderAccueil() {
  searchRowEl.hidden = false;
  subtabsEl.hidden = true;
  panelsEl.innerHTML = '';

  const groupEl = document.createElement('div');
  groupEl.className = 'section-group';
  const grid = document.createElement('div');
  grid.className = 'intro-grid';
  D.accueil.intros.forEach(i => grid.appendChild(makeIntroCard(i)));
  groupEl.appendChild(grid);
  panelsEl.appendChild(groupEl);

  countBadgeEl.textContent = '';
  emptyEl.classList.remove('visible');
}

function renderLang(lang) {
  searchRowEl.hidden = false;
  panelsEl.innerHTML = '';
  const query = searchEl.value.trim();
  const tokens = query ? searchTokens(query) : [];
  let anyVisible = false;
  let shown = 0;
  let total = 0;

  lang.groups.forEach(group => {
    total += group.cards.length;
    const matchingCards = tokens.length
      ? group.cards.filter(c => matchesAllTokens((c.t + ' ' + c.d + ' ' + c.code).toLowerCase(), tokens))
      : group.cards;
    if (matchingCards.length === 0) return;
    anyVisible = true;
    shown += matchingCards.length;

    const groupEl = document.createElement('div');
    groupEl.className = 'section-group';
    groupEl.style.setProperty('--group-color', lang.color);
    const h2 = document.createElement('h2');
    h2.textContent = group.name;
    const cardsEl = document.createElement('div');
    cardsEl.className = 'cards';
    matchingCards.forEach(c => cardsEl.appendChild(makeCard(c)));
    groupEl.appendChild(h2);
    groupEl.appendChild(cardsEl);
    panelsEl.appendChild(groupEl);
  });

  countBadgeEl.textContent = query ? `${shown} / ${total} fiches` : `${total} fiches`;
  emptyEl.classList.toggle('visible', !anyVisible);
}

// Recherche dans TOUS les langages à la fois (pas seulement l'onglet actif),
// regroupée par langage, pour ne pas avoir à deviner où se trouve la réponse.
function renderGlobalSearch(tokens) {
  searchRowEl.hidden = false;
  subtabsEl.hidden = true;
  panelsEl.innerHTML = '';

  let shown = 0;
  let total = 0;

  leafLangs().forEach(lang => {
    const matchingCards = [];
    lang.groups.forEach(group => {
      total += group.cards.length;
      group.cards.forEach(c => {
        if (matchesAllTokens((c.t + ' ' + c.d + ' ' + c.code).toLowerCase(), tokens)) {
          matchingCards.push(c);
        }
      });
    });
    if (matchingCards.length === 0) return;
    shown += matchingCards.length;

    const groupEl = document.createElement('div');
    groupEl.className = 'section-group';
    groupEl.style.setProperty('--group-color', lang.color);
    const h2 = document.createElement('h2');
    h2.textContent = lang.label;
    const cardsEl = document.createElement('div');
    cardsEl.className = 'cards';
    matchingCards.forEach(c => cardsEl.appendChild(makeCard(c)));
    groupEl.appendChild(h2);
    groupEl.appendChild(cardsEl);
    panelsEl.appendChild(groupEl);
  });

  countBadgeEl.textContent = `${shown} / ${total} fiches`;
  emptyEl.classList.toggle('visible', shown === 0);
}

function render() {
  [...tabsEl.children].forEach((btn, i) => {
    btn.setAttribute('aria-selected', NAV[i].id === active ? 'true' : 'false');
  });

  const query = searchEl.value.trim();
  const tokens = query ? searchTokens(query) : [];

  if (tokens.length) {
    renderGlobalSearch(tokens);
    return;
  }

  if (active === 'accueil') {
    renderAccueil();
    return;
  }

  const entry = navEntry(active);
  if (entry.children) {
    if (!activeSub || !entry.children.includes(activeSub)) activeSub = entry.children[0];
    buildSubtabs(entry);
    renderLang(D[activeSub]);
  } else {
    subtabsEl.hidden = true;
    renderLang(D[active]);
  }
}

searchEl.addEventListener('input', render);

buildTabs();
render();
