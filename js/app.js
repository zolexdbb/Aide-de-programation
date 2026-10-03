// Logique du site : navigation, recherche, affichage des guides et des fiches.
// Les données de chaque page sont chargées AVANT ce fichier par index.html
// (des scripts classiques, pas des modules, pour fonctionner même en ouvrant
// index.html directement depuis l'explorateur de fichiers, sans serveur).

const D = window.CHEATSHEET_DATA || {};

// Structure de la barre latérale : des rubriques, chacune avec ses pages
// (les id correspondent aux fichiers de js/data/).
const NAV_RAW = [
  { items: ['accueil'] },
  { title: 'Langages', items: ['c', 'cpp', 'arduino', 'python'] },
  { title: 'Site web', items: ['web', 'html', 'css', 'js'] },
  { title: 'Outils', items: ['git', 'markdown'] }
];

// Ne garde que les pages dont les données ont bien été chargées (au cas où
// un fichier js/data/*.js manquerait ou échouerait à charger).
const NAV = NAV_RAW
  .map(group => ({ ...group, items: group.items.filter(id => D[id]) }))
  .filter(group => group.items.length);

// Toutes les pages dans l'ordre de la barre latérale, et celles qui ont des fiches.
const PAGES = NAV.flatMap(group => group.items);
const LANGS = PAGES.filter(id => id !== 'accueil').map(id => D[id]);

const navEl = document.getElementById('nav');
const mainEl = document.getElementById('contenu');
const searchEl = document.getElementById('search');
const themeBtn = document.getElementById('theme-toggle');

const SITE_TITLE = 'Le Codage pour les Nuls';

const ICONS = {
  copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  chevron: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>'
};

/* ---------- Petits outils ---------- */

// Échappe les caractères spéciaux HTML avant de les insérer via innerHTML,
// pour que le contenu des fiches ne casse jamais le HTML de la page.
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

// Mise en forme légère des textes de guide : `code` et **gras**.
function inline(str) {
  return escapeHtml(str)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function cardCount(lang) {
  return lang.groups.reduce((sum, group) => sum + group.cards.length, 0);
}

function plural(n, word) {
  return n + ' ' + word + (n > 1 ? 's' : '');
}

function swatch(color) {
  return `<span class="swatch" style="--swatch:${color}"></span>`;
}

// Rubrique de la barre latérale à laquelle appartient une page ("Site web"...).
function groupTitleOf(id) {
  const group = NAV.find(g => g.items.includes(id));
  return group && group.title ? group.title : '';
}

/* ---------- Commentaires dans le code ---------- */

// Les commentaires sont affichés en retrait (gris, italique) pour que le code
// lui-même ressorte. Chaque page indique quels styles de commentaire chercher.
const COMMENT_PATTERNS = {
  html: '(<!--[\\s\\S]*?-->)',
  block: '(\\/\\*[\\s\\S]*?\\*\\/)',
  // "//" et "#" seulement en début de ligne ou après un espace, pour ne pas
  // confondre avec une adresse (https://...) ou une couleur (#fff).
  slash: '(?:^|[ \\t])(\\/\\/.*)$',
  hash: '(?:^|[ \\t])(#[ !].*)$'
};
const COMMENT_STYLES = {
  c: ['block', 'slash'], cpp: ['block', 'slash'], arduino: ['block', 'slash'],
  js: ['block', 'slash'], css: ['block'], html: ['html', 'block'],
  python: ['hash'], git: ['hash'], markdown: ['html'],
  web: ['html', 'block', 'slash', 'hash']
};

function highlight(code, langId) {
  const styles = COMMENT_STYLES[langId];
  if (!styles) return escapeHtml(code);
  const re = new RegExp(styles.map(s => COMMENT_PATTERNS[s]).join('|'), 'gm');
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(code))) {
    const comment = m.slice(1).find(Boolean);
    const start = m.index + m[0].length - comment.length;
    out += escapeHtml(code.slice(last, start)) + '<span class="com">' + escapeHtml(comment) + '</span>';
    last = start + comment.length;
  }
  return out + escapeHtml(code.slice(last));
}

/* ---------- Recherche ---------- */

// Mots vides ignorés dans la recherche, pour que taper une vraie question
// ("comment centrer une div en css ?") fonctionne comme une recherche par mots-clés.
const STOPWORDS = new Set([
  'comment', 'pourquoi', 'quand', 'est', 'ce', 'que', 'qu', 'qui', 'quoi',
  'quel', 'quelle', 'quels', 'quelles', 'un', 'une', 'des', 'le', 'la', 'les',
  'de', 'du', 'au', 'aux', 'a', 'à', 'et', 'ou', 'pour', 'avec', 'sur', 'dans',
  'par', 'en', 'se', 'ne', 'pas', 'on', 'je', 'tu', 'il', 'elle', 'nous',
  'vous', 'ils', 'elles', 'y', 'ai', 'as', 'avons', 'avez', 'ont', 'fait',
  'faire', 'faut', 'dois', 'doit', 'peut', 'peux', 'veux', 'veut', 'dont', 'mon',
  'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'si', 'c', 'd', 'l'
]);

// Découpe une requête en mots-clés ; les mots vides sont retirés sauf si la
// requête n'était composée QUE de mots vides (dans ce cas on garde tout).
function searchTokens(query) {
  const all = query.toLowerCase().split(/[^a-zà-ÿ0-9+#]+/i).filter(Boolean);
  const meaningful = all.filter(t => !STOPWORDS.has(t));
  return meaningful.length ? meaningful : all;
}

// Vrai si CHAQUE mot-clé apparaît quelque part dans la fiche, peu importe l'ordre.
function cardMatches(card, tokens) {
  const text = (card.t + ' ' + card.d + ' ' + card.code).toLowerCase();
  return tokens.every(t => text.includes(t));
}

/* ---------- Navigation ---------- */

// La page affichée dépend de l'ancre de l'adresse : #/c, #/html... (#/ = accueil).
// Chaque page a donc sa propre adresse : on peut la partager, et les boutons
// Précédent / Suivant du navigateur fonctionnent.
function currentPage() {
  const id = location.hash.replace(/^#\/?/, '');
  return PAGES.includes(id) ? id : 'accueil';
}

function pageHref(id) {
  return id === 'accueil' ? '#/' : '#/' + id;
}

function renderNav(activeId) {
  navEl.innerHTML = NAV.map(group => {
    const links = group.items.map(id => {
      const page = D[id];
      const current = id === activeId ? ' aria-current="page"' : '';
      const count = page.groups ? `<span class="nav-count">${cardCount(page)}</span>` : '';
      // Sommaire des sections, seulement sous la page affichée.
      const sections = id === activeId && page.groups && page.groups.length
        ? `<div class="nav-sections">${page.groups.map((g, i) =>
            `<button type="button" data-section="sec-${i}">${escapeHtml(g.name)}</button>`).join('')}</div>`
        : '';
      return `<a class="nav-link" href="${pageHref(id)}"${current}>${swatch(page.color)}${escapeHtml(page.label)}${count}</a>${sections}`;
    }).join('');
    const title = group.title ? `<p class="label">${escapeHtml(group.title)}</p>` : '';
    return `<div class="nav-group">${title}${links}</div>`;
  }).join('');
}

navEl.addEventListener('click', event => {
  const btn = event.target.closest('[data-section]');
  if (!btn) return;
  const section = document.getElementById(btn.dataset.section);
  if (section) section.scrollIntoView();
});

/* ---------- Fiches ---------- */

async function copyText(text) {
  try {
    // Chemin moderne : l'API Clipboard (nécessite un contexte sécurisé/HTTPS).
    await navigator.clipboard.writeText(text);
  } catch (e) {
    // Repli pour file:// ou navigateurs sans API Clipboard : on sélectionne
    // le texte dans un <textarea> invisible et on utilise execCommand.
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e2) {}
    document.body.removeChild(ta);
  }
}

// Construit une fiche de code (titre, description, bouton copier, extrait).
function makeCard(card, langId) {
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <div class="card-head">
      <h3>${escapeHtml(card.t)}</h3>
      <button class="copy-btn" type="button" aria-label="Copier le code : ${escapeHtml(card.t)}">${ICONS.copy}<span>Copier</span></button>
      <p>${escapeHtml(card.d)}</p>
    </div>
    <pre><code>${highlight(card.code, langId)}</code></pre>
  `;
  const btn = el.querySelector('.copy-btn');
  const label = btn.querySelector('span');
  btn.addEventListener('click', async () => {
    await copyText(card.code);
    label.textContent = 'Copié';
    btn.dataset.copied = 'true';
    setTimeout(() => { label.textContent = 'Copier'; btn.dataset.copied = 'false'; }, 1400);
  });
  return el;
}

// Une section de fiches : titre, nombre de fiches, grille.
function makeBlock(title, cards, langId, id) {
  const section = document.createElement('section');
  section.className = 'block';
  if (id) section.id = id;
  section.innerHTML = `<h2>${title}<span class="count">${cards.length}</span></h2>`;
  const grid = document.createElement('div');
  grid.className = 'cards';
  cards.forEach(card => grid.appendChild(makeCard(card, langId)));
  section.appendChild(grid);
  return section;
}

/* ---------- Guide en tête de page ---------- */

function list(items, className) {
  return `<ul class="${className}">${items.map(item => `<li>${inline(item)}</li>`).join('')}</ul>`;
}

// Le guide est repliable ; son état (ouvert/fermé) est mémorisé pour toutes les pages.
function guideIsOpen() {
  try { return localStorage.getItem('guideOpen') !== '0'; } catch (e) { return true; }
}

function makeGuide(guide) {
  const el = document.createElement('details');
  el.className = 'guide';
  el.open = guideIsOpen();

  const parts = [];
  if (guide.role) {
    parts.push(`<div class="guide-part wide"><h2 class="label">À quoi ça sert vraiment</h2>${
      guide.role.split('\n\n').map(p => `<p>${inline(p)}</p>`).join('')}</div>`);
  }
  if (guide.pour) {
    parts.push(`<div class="guide-part"><h2 class="label">Fait pour</h2>${list(guide.pour, 'list-yes')}</div>`);
  }
  if (guide.pasPour) {
    parts.push(`<div class="guide-part"><h2 class="label">Pas fait pour</h2>${list(guide.pasPour, 'list-no')}</div>`);
  }
  if (guide.fichiers) {
    const f = guide.fichiers;
    parts.push(`<div class="guide-part wide"><h2 class="label">Organiser ses fichiers</h2>
      ${f.texte ? `<p>${inline(f.texte)}</p>` : ''}
      <pre class="tree">${highlight(f.arbre, 'web')}</pre>
      ${f.notes ? list(f.notes, 'list-note') : ''}</div>`);
  }
  if (guide.demarrer) {
    parts.push(`<div class="guide-part wide"><h2 class="label">Pour démarrer</h2>
      <ol class="steps">${guide.demarrer.map(step => `<li>${inline(step)}</li>`).join('')}</ol></div>`);
  }

  el.innerHTML = `
    <summary>${ICONS.chevron}Guide d'utilisation<span class="label">À lire une fois</span></summary>
    <div class="guide-body">${parts.join('')}</div>
  `;
  el.addEventListener('toggle', () => {
    try { localStorage.setItem('guideOpen', el.open ? '1' : '0'); } catch (e) {}
  });
  return el;
}

/* ---------- Vues ---------- */

function pageHead({ crumb, title, lead, meta }) {
  const head = document.createElement('header');
  head.className = 'page-head';
  head.innerHTML = `
    ${crumb ? `<p class="label">${escapeHtml(crumb)}</p>` : ''}
    <h1>${escapeHtml(title)}</h1>
    ${lead ? `<p class="lead">${inline(lead)}</p>` : ''}
    ${meta ? `<p class="meta">${escapeHtml(meta)}</p>` : ''}
  `;
  return head;
}

function pageLink(id) {
  const page = D[id];
  return `<a href="${pageHref(id)}">${swatch(page.color)}${escapeHtml(page.label)}</a>`;
}

function renderAccueil() {
  const data = D.accueil;
  const total = LANGS.reduce((sum, lang) => sum + cardCount(lang), 0);

  mainEl.appendChild(pageHead({
    title: SITE_TITLE,
    lead: data.lead,
    meta: plural(total, 'fiche') + ' · ' + plural(LANGS.length, 'page')
  }));

  const paths = document.createElement('section');
  paths.className = 'block';
  paths.innerHTML = `
    <h2>Par où commencer</h2>
    <div class="paths">${data.parcours.map(p => `
      <div class="path">
        <h3>${escapeHtml(p.titre)}</h3>
        <p>${inline(p.texte)}</p>
        <ol>${p.etapes.filter(id => D[id]).map(id => `<li>${pageLink(id)}</li>`).join('')}</ol>
      </div>`).join('')}
    </div>`;
  mainEl.appendChild(paths);

  const intros = document.createElement('section');
  intros.className = 'block';
  intros.innerHTML = `
    <h2>Tous les aide-mémoire</h2>
    <div class="intros">${data.intros.filter(i => D[i.target]).map(i => `
      <a class="intro" href="${pageHref(i.target)}">
        <span class="intro-top">${swatch(D[i.target].color)}<h3>${escapeHtml(D[i.target].label)}</h3><span class="nav-count">${plural(cardCount(D[i.target]), 'fiche')}</span></span>
        <span class="intro-tag">${escapeHtml(i.tag)}</span>
        <span class="intro-text">${escapeHtml(i.text)}</span>
      </a>`).join('')}
    </div>`;
  mainEl.appendChild(intros);

  const tips = document.createElement('section');
  tips.className = 'block';
  tips.innerHTML = `
    <h2>Utiliser le site</h2>
    <ul class="tips">
      <li><strong>Chercher partout</strong>Appuyez sur <kbd>/</kbd> puis tapez un mot ou une vraie question : la recherche porte sur toutes les pages à la fois.</li>
      <li><strong>Copier un extrait</strong>Chaque fiche a un bouton « Copier ». Les commentaires expliquent chaque ligne : supprimez-les une fois compris.</li>
      <li><strong>Lire le guide</strong>En haut de chaque page, un guide explique à quoi sert le langage et comment ranger ses fichiers. Il se replie une fois lu.</li>
    </ul>`;
  mainEl.appendChild(tips);
}

function renderLang(lang) {
  mainEl.appendChild(pageHead({
    crumb: groupTitleOf(lang.id),
    title: lang.titre || lang.label,
    lead: lang.guide && lang.guide.resume,
    meta: plural(cardCount(lang), 'fiche') + ' · ' + plural(lang.groups.length, 'section')
  }));

  if (lang.guide) mainEl.appendChild(makeGuide(lang.guide));

  lang.groups.forEach((group, i) => {
    mainEl.appendChild(makeBlock(escapeHtml(group.name), group.cards, lang.id, 'sec-' + i));
  });

  // Liens vers la page précédente et la suivante, dans l'ordre de la barre latérale.
  const index = PAGES.indexOf(lang.id);
  const prev = PAGES[index - 1];
  const next = PAGES[index + 1];
  const pager = document.createElement('nav');
  pager.className = 'pager';
  pager.setAttribute('aria-label', 'Page précédente et suivante');
  pager.innerHTML = `
    ${prev ? `<a href="${pageHref(prev)}"><span class="label">Précédent</span>${escapeHtml(D[prev].label)}</a>` : ''}
    ${next ? `<a class="next" href="${pageHref(next)}"><span class="label">Suivant</span>${escapeHtml(D[next].label)}</a>` : ''}
  `;
  mainEl.appendChild(pager);
}

// Recherche dans TOUTES les pages à la fois, regroupée par langage, pour ne
// pas avoir à deviner où se trouve la réponse.
function renderSearch(query, tokens) {
  const results = LANGS
    .map(lang => ({ lang, cards: lang.groups.flatMap(g => g.cards).filter(c => cardMatches(c, tokens)) }))
    .filter(r => r.cards.length);
  const shown = results.reduce((sum, r) => sum + r.cards.length, 0);

  mainEl.appendChild(pageHead({
    crumb: 'Recherche',
    title: '« ' + query + ' »',
    meta: shown ? plural(shown, 'fiche') + ' dans ' + plural(results.length, 'page') : ''
  }));

  if (!shown) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.innerHTML = '<strong>Aucune fiche ne correspond.</strong>Essayez un seul mot-clé, ou le nom exact de la fonction (par exemple <code>malloc</code>, <code>flexbox</code>, <code>rebase</code>).';
    mainEl.appendChild(empty);
    return;
  }

  results.forEach(({ lang, cards }) => {
    mainEl.appendChild(makeBlock(`${swatch(lang.color)}${escapeHtml(lang.label)}`, cards, lang.id));
  });
}

// Point d'entrée du rendu : rappelé à chaque frappe dans la recherche et à
// chaque changement de page. Une recherche non vide prend toujours le dessus.
function render() {
  const query = searchEl.value.trim();
  const tokens = query ? searchTokens(query) : [];
  const id = currentPage();

  mainEl.innerHTML = '';
  if (tokens.length) {
    renderNav(null);
    renderSearch(query, tokens);
    document.title = 'Recherche – ' + SITE_TITLE;
  } else if (id === 'accueil') {
    renderNav(id);
    renderAccueil();
    document.title = SITE_TITLE;
  } else {
    renderNav(id);
    renderLang(D[id]);
    document.title = D[id].label + ' – ' + SITE_TITLE;
  }
}

/* ---------- Évènements ---------- */

// Recherche "live" : un rendu complet à chaque caractère tapé, sans debounce
// (le site est petit, ça reste instantané).
searchEl.addEventListener('input', () => {
  render();
  window.scrollTo(0, 0);
});

window.addEventListener('hashchange', () => {
  // Le lien d'évitement (#contenu) ne change pas de page : on y place juste le focus.
  if (location.hash === '#contenu') {
    mainEl.focus();
    return;
  }
  searchEl.value = '';
  render();
  window.scrollTo(0, 0);
});

document.addEventListener('keydown', event => {
  // "/" place le curseur dans la recherche (sauf si on est déjà en train d'écrire).
  if (event.key === '/' && document.activeElement !== searchEl) {
    event.preventDefault();
    searchEl.focus();
  }
  if (event.key === 'Escape' && document.activeElement === searchEl) {
    searchEl.value = '';
    searchEl.blur();
    render();
  }
});

themeBtn.addEventListener('click', () => {
  const root = document.documentElement;
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch (e) {}
});

render();
