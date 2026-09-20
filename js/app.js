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

// Ne garde que les entrées dont les données ont bien été chargées (au cas où
// un fichier js/data/*.js manquerait ou échouerait à charger) : un onglet
// groupé disparaît si aucun de ses enfants n'a de données, un onglet simple
// disparaît s'il n'a pas de données du tout.
const NAV = NAV_RAW.filter(entry => {
  if (entry.children) {
    entry.children = entry.children.filter(id => !!D[id]);
    return entry.children.length > 0;
  }
  return !!D[entry.id];
});

// Références vers les éléments du DOM manipulés par le reste du fichier.
const tabsEl = document.getElementById('tabs');
const subtabsEl = document.getElementById('subtabs');
const panelsEl = document.getElementById('panels');
const searchEl = document.getElementById('search');
const searchRowEl = document.querySelector('.search-row');
const emptyEl = document.getElementById('empty');
const countBadgeEl = document.getElementById('count-badge');
const totalCountEl = document.getElementById('total-count');

// État courant de la navigation : l'onglet principal affiché (ou 'accueil'),
// et le sous-onglet affiché quand l'onglet principal a des enfants (ex : "web").
let active = NAV.length ? NAV[0].id : null;
let activeSub = null;

// Échappe les caractères spéciaux HTML avant de les insérer via innerHTML,
// pour que le contenu des fiches (issu des fichiers de données) ne casse jamais
// le HTML et ne puisse pas injecter de balises.
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

// Retrouve une entrée de NAV (onglet principal) à partir de son id.
function navEntry(id) {
  return NAV.find(e => e.id === id);
}

// Liste les langages "feuilles" (ceux qui ont réellement des fiches à afficher),
// en dépliant les onglets groupés comme "web" en leurs enfants (html, css, js).
// Sert pour le total de fiches et pour la recherche globale.
function leafLangs() {
  const result = [];
  NAV.forEach(entry => {
    if (entry.id === 'accueil') return;
    if (entry.children) entry.children.forEach(id => D[id] && result.push(D[id]));
    else if (D[entry.id]) result.push(D[entry.id]);
  });
  return result;
}

// Nombre total de fiches, toutes langues confondues (affiché sous le titre).
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

// Construit une fois pour toutes les boutons de la barre d'onglets principale
// (Accueil, C, C++, ..., Site Web, ...) et branche leur clic.
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
    // Info-bulle : nombre de fiches (et langages regroupés, pour "Site Web").
    if (entry.children) {
      const nb = entry.children.reduce((s, id) => s + D[id].groups.reduce((s2, g) => s2 + g.cards.length, 0), 0);
      btn.title = entry.children.map(id => D[id].label).join(' / ') + ' — ' + nb + ' fiches';
    } else if (entry.id !== 'accueil') {
      const nb = data.groups.reduce((s, g) => s + g.cards.length, 0);
      btn.title = nb + ' fiches';
    }
    btn.addEventListener('click', () => {
      active = entry.id;
      // En entrant dans un onglet groupé, on garde le sous-onglet déjà choisi
      // s'il appartient à ce groupe, sinon on retombe sur le premier enfant.
      activeSub = entry.children ? (entry.children.includes(activeSub) ? activeSub : entry.children[0]) : null;
      render();
    });
    tabsEl.appendChild(btn);
  });
  const langs = leafLangs();
  totalCountEl.textContent = totalCards() + ' fiches au total, réparties sur ' + langs.length + ' langages';
}

// Construit les sous-onglets (HTML / CSS / JavaScript) d'un onglet groupé,
// en reconstruisant entièrement la barre à chaque appel (elle est petite).
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

// Construit une fiche de code (titre, description, extrait, bouton copier).
function makeCard(card) {
  const div = document.createElement('div');
  div.className = 'card';
  // dataset.search n'est pas utilisé par la recherche actuelle (qui relit t/d/code
  // directement), mais reste dispo pour une future recherche côté CSS/attribut.
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
      // Chemin moderne : l'API Clipboard (nécessite un contexte sécurisé/HTTPS).
      await navigator.clipboard.writeText(card.code);
    } catch (e) {
      // Repli pour file:// ou navigateurs sans API Clipboard : on sélectionne
      // le texte dans un <textarea> invisible et on utilise execCommand.
      const ta = document.createElement('textarea');
      ta.value = card.code;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e2) {}
      document.body.removeChild(ta);
    }
    // Retour visuel temporaire sur le bouton ("Copié !") avant de revenir à l'état normal.
    const original = btn.textContent;
    btn.textContent = 'Copié !';
    btn.dataset.copied = 'true';
    setTimeout(() => { btn.textContent = original; btn.dataset.copied = 'false'; }, 1400);
  });
  return div;
}

// Construit une carte de présentation de langage pour la page d'accueil
// (emoji, accroche, texte, bouton "En savoir plus" qui renvoie vers les fiches).
function makeIntroCard(intro) {
  const div = document.createElement('div');
  div.className = 'intro-card';
  // --card-color : couleur du langage (voir accueil.js), reprise par le CSS
  // pour teinter la bande du haut, l'icône, le sous-titre et le bouton.
  if (intro.color) div.style.setProperty('--card-color', intro.color);
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

  const lead = document.createElement('div');
  lead.className = 'accueil-lead';
  lead.innerHTML = `
    <h2>Choisis un langage pour commencer</h2>
    <p>Chaque carte mène vers ses fiches : syntaxe expliquée simplement, pièges classiques et exemples à copier-coller.</p>
  `;
  panelsEl.appendChild(lead);

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

// Affiche les fiches d'UN SEUL langage (celui de l'onglet/sous-onglet actif),
// groupées par thème, en filtrant par la recherche si elle est non vide.
// N'est appelée que quand la recherche est vide ou ne contient que des mots
// vides (render() bascule sinon vers renderGlobalSearch).
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

// Point d'entrée du rendu : rappelé à chaque frappe dans la recherche et à
// chaque changement d'onglet. Décide quelle vue afficher, dans cet ordre de
// priorité : recherche globale > accueil > langage (avec ses sous-onglets).
function render() {
  [...tabsEl.children].forEach((btn, i) => {
    btn.setAttribute('aria-selected', NAV[i].id === active ? 'true' : 'false');
  });

  const query = searchEl.value.trim();
  const tokens = query ? searchTokens(query) : [];

  // Une recherche non vide prend toujours le dessus, même sur l'accueil :
  // elle porte sur tous les langages, pas seulement sur l'onglet affiché.
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
    // Onglet groupé (Site Web) : on affiche ses sous-onglets, puis le langage
    // actuellement sélectionné parmi eux (par défaut, le premier).
    if (!activeSub || !entry.children.includes(activeSub)) activeSub = entry.children[0];
    buildSubtabs(entry);
    renderLang(D[activeSub]);
  } else {
    subtabsEl.hidden = true;
    renderLang(D[active]);
  }
}

// Recherche "live" : un rendu complet à chaque caractère tapé, sans debounce
// (le site est petit, ça reste instantané).
searchEl.addEventListener('input', render);

buildTabs();
render();
