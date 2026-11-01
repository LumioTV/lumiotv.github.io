/* Lumio web — iPhone-first web app (installable from Safari → Share → Add to Home Screen). */
'use strict';

// ============================================================================ config
const BUILT_IN_TMDB_KEY = 'a8c6c52b1e7ddcbb0a52c745d1712b82';
const IMG = 'https://image.tmdb.org/t/p/';
const BUILT_IN_ADDONS = [
  { url: 'https://catalog.nuvio.tv/manifest.json', name: 'Nuvio Catalogs', resources: ['catalog'], builtIn: true },
  { url: 'https://v3-cinemeta.strem.io/manifest.json', name: 'Cinemeta', resources: ['catalog', 'meta'], builtIn: true },
  { url: 'https://opensubtitles-v3.strem.io/manifest.json', name: 'OpenSubtitles', resources: ['subtitles'], builtIn: true },
  { url: 'https://subdl.strem.top/c3ViZGxfM1ZZYVFfcUVoa2d1a0hOZlBlSXBDTFVHNWczS0NfRTF1bFBJMzI2M2lOQS9BUi9oaUV4Y2x1ZGUv/manifest.json', name: 'SubDL Subtitles', resources: ['subtitles'], builtIn: true },
];
const ACCENTS = [
  ['midnight', 'Midnight', '#5A6080'], ['violet', 'Violet', '#7C5CFF'], ['cinema', 'Cinema', '#E3262F'], ['ocean', 'Ocean', '#2D8CFF'], ['emerald', 'Emerald', '#10B981'], ['ruby', 'Ruby', '#FF3B5C'],
  ['sunset', 'Sunset', '#FF7A1A'], ['gold', 'Gold', '#F5B700'], ['sakura', 'Sakura', '#FF5FA8'],
];
// Settings → Appearance (same choices as the phone and TV apps; saved in your account)
const TITLES = [['white', 'White', '#FFFFFF'], ['cinema', 'Cinema red', '#E3262F'], ['gold', 'Classic gold', '#F5C451'], ['cream', 'Cream', '#F3E5C0'], ['accent', 'Theme colour', null]];
const ICONS = [['classic', 'Classic', '#8A9B35', '#2E3A0E'], ['cinema', 'Cinema red', '#E3262F', '#5A0B0F'], ['violet', 'Violet', '#7C5CFF', '#2A1A66'],
  ['ocean', 'Ocean', '#2D8CFF', '#0A2A5C'], ['emerald', 'Emerald', '#10B981', '#064E3B'], ['gold', 'Gold', '#F5B700', '#5C4300'], ['midnight', 'Midnight', '#3A3A46', '#0B0B0F']];
const AR_FONTS = [['cinema', 'Classic cinema', 'سينما زمان', "'Lumio Cinema'"], ['clear', 'Easy to read', 'واضح ومريح', "'Lumio Clear'"], ['ruqaa', 'Ruqʿah', 'خط الرقعة', "'Lumio Ruqaa'"]];
const SERVICES = [
  ['netflix', 'Netflix', ['netflix'], 8, '#E50914', '#5A0408', 'heartbeat'],
  ['disney', 'Disney+', ['disney plus', 'disney+'], 337, '#1B3FD1', '#0A1A5C', 'orbit'],
  ['prime', 'Prime Video', ['amazon prime video', 'prime video'], 9, '#00A8E1', '#0B2B45', 'shine'],
  ['shahid', 'Shahid', ['shahid vip', 'shahid'], 1715, '#00C29A', '#003A2E', 'swing'],
  ['apple', 'Apple TV+', ['apple tv plus', 'apple tv+'], 350, '#8E8E93', '#1C1C1E', 'flip'],
  ['max', 'HBO Max', ['max', 'hbo max'], 1899, '#7B2FF7', '#1A0B4A', 'ripple'],
  ['hulu', 'Hulu', ['hulu'], 15, '#1CE783', '#0B4A2C', 'swing'],
  ['paramount', 'Paramount+', ['paramount plus', 'paramount+', 'paramount plus premium'], 531, '#0064FF', '#001E5C', 'tilt'],
  ['peacock', 'Peacock', ['peacock premium', 'peacock'], 386, '#FFB800', '#3A2A00', 'jelly'],
  ['crunchyroll', 'Crunchyroll', ['crunchyroll'], 283, '#F47521', '#4A1E05', 'bounce'],
  ['starz', 'Starz', ['starz'], 43, '#2D2D2D', '#000000', 'shine'],
  ['amc', 'AMC+', ['amc+', 'amc plus'], 526, '#00B2FF', '#002B40', 'ripple'],
  ['mgm', 'MGM+', ['mgm+', 'mgm plus'], 34, '#C8A24B', '#3A2C0C', 'flip'],
  ['discovery', 'Discovery+', ['discovery+', 'discovery plus'], 520, '#1A73E8', '#051C40', 'orbit'],
  ['osn', 'OSN+', ['osn+', 'osn plus'], 629, '#E2007A', '#420024', 'heartbeat'],
].map(([key, name, aliases, id, c1, c2, motion]) => ({ key, name, aliases, ids: String(id), c1, c2, motion, logo: null, home: { shahid: 'SA', osn: 'AE' }[key] || null }));
// Arabic & world catalogs (Discover → "Arabic & Turkish"); scene = animated Live TV scene
const WORLD = [
  ['arabic_series', 'Arabic Series', '🌙', 'ara', '#1E3A8A', '#0B1230', null, 'with_original_language=ar'],
  ['gulf_series', 'Gulf & Kuwaiti Series', '🇰🇼', 'kw', '#007A3D', '#0B2A18', null, 'with_origin_country=KW|SA|AE|QA|BH|OM&with_original_language=ar'],
  ['egyptian_series', 'Egyptian Series', '🇪🇬', 'eg', '#C8A24B', '#2E2208', null, 'with_origin_country=EG'],
  ['syrian_series', 'Syrian & Lebanese Series', '🇱🇧', 'lb', '#00A651', '#2A0505', null, 'with_origin_country=SY|LB'],
  ['turkish_series', 'Turkish Series', '🇹🇷', 'tr', '#E30A17', '#3A0507', null, 'with_original_language=tr'],
  ['ramadan_series', 'Ramadan 2026', '🏮', 'ramadan', '#7C2D12', '#1F0B05', null, 'with_original_language=ar&first_air_date.gte=2026-02-10&first_air_date.lte=2026-03-25'],
  ['korean_dramas', 'Korean Dramas', '🇰🇷', 'kr', '#1D4ED8', '#0A1440', null, 'with_original_language=ko&with_genres=18'],
  ['arabic_movies', 'Arabic Movies', '🎬', 'movies', '#7C3AED', '#1E0B3A', 'with_original_language=ar', null],
  ['egyptian_movies', 'Egyptian Movies', '🏜️', 'eg', '#B45309', '#2E1505', 'with_origin_country=EG', null],
  ['turkish_movies', 'Turkish Movies', '🎞️', 'tr', '#B91C1C', '#2A0606', 'with_original_language=tr', null],
].map(([key, name, emoji, scene, c1, c2, mq, tq]) => ({ key, name, emoji, scene, c1, c2, mq, tq }));
const GENRES = [
  ['action', 'Action', 'with_genres=28', 'with_genres=10759', '#FF5A36', '#6B1300'],
  ['adventure', 'Adventure', 'with_genres=12', 'with_genres=10759', '#FFA62B', '#5C3300'],
  ['comedy', 'Comedy', 'with_genres=35', 'with_genres=35', '#FFD43B', '#5C4A00'],
  ['drama', 'Drama', 'with_genres=18', 'with_genres=18', '#9B5DE5', '#2E0E5C'],
  ['scifi', 'Sci-Fi', 'with_genres=878', 'with_genres=10765', '#00BBF9', '#003A52'],
  ['horror', 'Horror', 'with_genres=27', null, '#8B0000', '#1A0000'],
  ['thriller', 'Thriller', 'with_genres=53', 'with_genres=80|9648', '#4A4E69', '#101222'],
  ['anime', 'Anime', 'with_genres=16&with_original_language=ja', 'with_genres=16&with_original_language=ja', '#FF70A6', '#5C0F30'],
  ['animation', 'Animation', 'with_genres=16', 'with_genres=16', '#06D6A0', '#004D3A'],
  ['family', 'Family', 'with_genres=10751', 'with_genres=10751', '#52B788', '#143D28'],
  ['romance', 'Romance', 'with_genres=10749', null, '#FF4D6D', '#5C0A1A'],
  ['crime', 'Crime', 'with_genres=80', 'with_genres=80', '#6C757D', '#1E2124'],
  ['mystery', 'Mystery', 'with_genres=9648', 'with_genres=9648', '#3A86FF', '#0A2252'],
  ['fantasy', 'Fantasy', 'with_genres=14', 'with_genres=10765', '#7209B7', '#22033A'],
  ['documentary', 'Documentary', 'with_genres=99', 'with_genres=99', '#2A9D8F', '#0A2E2A'],
  ['war', 'War', 'with_genres=10752', 'with_genres=10768', '#606C38', '#1C2010'],
  ['history', 'History', 'with_genres=36', null, '#BC6C25', '#3A1E05'],
  ['western', 'Western', 'with_genres=37', 'with_genres=37', '#D4A373', '#3D2A14'],
  ['music', 'Music', 'with_genres=10402', null, '#F72585', '#4A0325'],
  ['reality', 'Reality', null, 'with_genres=10764', '#FB8500', '#4A2700'],
  ['kids', 'Kids', null, 'with_genres=10762', '#8ECAE6', '#1B3A4A'],
].map(([key, name, mq, tq, c1, c2]) => ({ key, name, mq, tq, c1, c2 }));
// Home → Franchises / Production Studios / Decades (same ids as the apps, checked against TMDB on every build)
const FRANCHISES = [
  ['f_hp', 'Harry Potter', '#7F5A17', '#120B03', 'magic', [1241], null],
  ['f_hobbit', 'The Hobbit', '#8A3B12', '#1A0A04', 'ember', [121938], null],
  ['f_lotr', 'The Lord of the Rings', '#6B5418', '#100C04', 'ring', [119], null],
  ['f_marvel', 'Marvel Studios', '#C8102E', '#2A0309', 'comic', [], '420', 299534],
  ['f_dc', 'DC', '#0476F2', '#02122E', 'signal', [], '429|9993|128064|184898', 209112],
  ['f_avatar', 'Avatar', '#0E7C9E', '#031A24', 'biolume', [87096], null],
  ['f_fast', 'Fast & Furious', '#E0661A', '#1C0C02', 'speed', [9485], null],
  ['f_007', '007', '#9A7B3E', '#0B0A08', 'spotlight', [645], null],
  ['f_starwars', 'Star Wars', '#2B2F3A', '#000000', 'hyperspace', [10], null],
  ['f_jurassic', 'Jurassic Park', '#4E7A1F', '#0E1A05', 'ripple', [328], null],
  ['f_mi', 'Mission: Impossible', '#B3261E', '#140404', 'fuse', [87359], null],
  ['f_pirates', 'Pirates of the Caribbean', '#1F5E73', '#04121A', 'waves', [295], null],
  ['f_transformers', 'Transformers', '#5B6B7A', '#0A0E14', 'sheen', [8650], null],
  ['f_matrix', 'The Matrix', '#0F7A2E', '#010A03', 'code', [2344], null],
  ['f_wick', 'John Wick', '#3A1C5C', '#07020D', 'neon', [404609], null],
  ['f_indy', 'Indiana Jones', '#A0662A', '#1C0F04', 'dust', [84], null],
  ['f_bttf', 'Back to the Future', '#2F6FD6', '#0A1024', 'firetrail', [264], null],
  ['f_terminator', 'Terminator', '#8C1C13', '#0A0303', 'scan', [528], null],
  ['f_alien', 'Alien', '#2F4A3A', '#030705', 'fog', [8091], null],
  ['f_rocky', 'Rocky & Creed', '#B0302A', '#120404', 'flash', [1575, 553717], null],
  ['f_godfather', 'The Godfather', '#4A3424', '#050302', 'candle', [230], null],
  ['f_madmax', 'Mad Max', '#C2681D', '#1F0E02', 'sand', [8945], null],
  ['f_monsterverse', 'Godzilla', '#1E4B5E', '#02090D', 'roar', [535313], null],
  ['f_apes', 'Planet of the Apes', '#5E5A2A', '#0D0C04', 'dust', [173710], null],
  ['f_hunger', 'The Hunger Games', '#B5491B', '#140602', 'ember', [131635], null],
  ['f_twilight', 'Twilight', '#3D4B5C', '#05070A', 'mist', [33514], null],
  ['f_conjuring', 'The Conjuring Universe', '#3B2A2A', '#050303', 'fog', [313086], null],
  ['f_toystory', 'Toy Story', '#2E86DE', '#0A2140', 'bubbles', [10194], null],
  ['f_shrek', 'Shrek', '#6A9A1F', '#142005', 'bubbles', [2150], null],
  ['f_despicable', 'Despicable Me & Minions', '#E8B50E', '#2A2002', 'bubbles', [86066, 544669], null],
  ['f_iceage', 'Ice Age', '#4FA3C7', '#08202C', 'snow', [8354], null],
  ['f_kungfu', 'Kung Fu Panda', '#B8862B', '#1F1404', 'petals', [77816], null],
  ['f_frozen', 'Frozen', '#6EC1E4', '#0B2533', 'snow', [386382], null],
].map(([key, name, c1, c2, fx, cols, cos, art]) => ({ key, name, c1, c2, fx, cols, cos, art }));
const STUDIOS = [
  ['s_wb', 'Warner Bros.', '174', '#1A4FA3', '#06142E', 'clouds'],
  ['s_universal', 'Universal', '33', '#1C3D7A', '#02060F', 'globe'],
  ['s_columbia', 'Columbia Pictures', '5', '#6E8BB5', '#0D1626', 'torch'],
  ['s_20th', '20th Century Studios', '25|127928', '#3A2E14', '#050402', 'searchlights'],
  ['s_sony', 'Sony Pictures', '34|2251', '#2C2C30', '#000000', 'sheen'],
  ['s_paramount', 'Paramount', '4', '#0B4DA2', '#020B1C', 'stars'],
  ['s_disney', 'Walt Disney Pictures', '2', '#103E8C', '#030A1C', 'arc'],
  ['s_pixar', 'Pixar', '3', '#3F6E9A', '#0A1420', 'lamp'],
  ['s_dreamworks', 'DreamWorks Animation', '521', '#2B5DA8', '#050E22', 'moon'],
  ['s_marvel', 'Marvel Studios', '420', '#C8102E', '#2A0309', 'comic'],
  ['s_lucasfilm', 'Lucasfilm', '1', '#2B2F3A', '#000000', 'hyperspace'],
  ['s_lionsgate', 'Lionsgate', '1632|35', '#5C4A2E', '#0E0A05', 'gears'],
  ['s_mgm', 'Metro-Goldwyn-Mayer', '21', '#8C6A1E', '#140E02', 'rays'],
  ['s_newline', 'New Line Cinema', '12', '#3E3E46', '#060608', 'filmstrip'],
  ['s_legendary', 'Legendary', '923', '#2E3A44', '#040608', 'fog'],
  ['s_illumination', 'Illumination', '6704', '#E8B50E', '#2A2002', 'bubbles'],
  ['s_a24', 'A24', '41077', '#3A3A3A', '#050505', 'grain'],
  ['s_blumhouse', 'Blumhouse', '3172', '#4A1212', '#070202', 'fog'],
  ['s_amblin', 'Amblin Entertainment', '56', '#22305E', '#03050E', 'moon'],
  ['s_ghibli', 'Studio Ghibli', '10342', '#3B7A57', '#07160E', 'petals'],
  ['s_toho', 'Toho', '882', '#7A1F1F', '#120303', 'roar'],
  ['s_miramax', 'Miramax', '14', '#4A3A5E', '#09060D', 'rays'],
  ['s_focus', 'Focus Features', '10146', '#2E3D4F', '#05080B', 'sheen'],
  ['s_searchlight', 'Searchlight Pictures', '43|127929', '#3C3220', '#060503', 'searchlights'],
].map(([key, name, cos, c1, c2, fx]) => ({ key, name, cos, c1, c2, fx }));
const DECADES = [
  ['d_1960', '60s', 1960, '#E76F51', '#5C1A3A'],
  ['d_1970', '70s', 1970, '#D98E04', '#4A2004'],
  ['d_1980', '80s', 1980, '#FF2E93', '#1A0638'],
  ['d_1990', '90s', 1990, '#14B8A6', '#2A0F4A'],
  ['d_2000', '2000s', 2000, '#3BA7F5', '#0A2346'],
  ['d_2010', '2010s', 2010, '#8B5CF6', '#1A0B3A'],
  ['d_2020', '2020s', 2020, '#22D3EE', '#07263A'],
].map(([key, label, from, c1, c2]) => ({ key, label, from, c1, c2 }));
const DISCOVER = [
  { key: 'foryou', name: 'For You', sub: 'Picked from what you watch', emoji: '✨', c1: '#7C5CFF', c2: '#241466' },
  { key: 'trending', name: 'Trending', sub: 'Hot this week', emoji: '🔥', c1: '#FF6B35', c2: '#5C1A00' },
  { key: 'popular', name: 'Most Popular', sub: "What everyone's watching", emoji: '⭐', c1: '#FFC300', c2: '#5C4600' },
  { key: 'top_rated', name: 'Top Rated', sub: 'All-time best', emoji: '🏆', c1: '#2EC4B6', c2: '#0A403B' },
];
const SORTS = [['popular', 'Popular', 'popularity.desc', 'popularity.desc'], ['top', 'Top Rated', 'vote_average.desc', 'vote_average.desc'], ['new', 'Newest', 'primary_release_date.desc', 'first_air_date.desc']];
const ORDER_SORT = ['order', 'Release order', 'primary_release_date.asc', 'first_air_date.asc'];
const decadeQuery = d => { const today = new Date().toISOString().slice(0, 10), end = `${d.from + 9}-12-31`; return `primary_release_date.gte=${d.from}-01-01&primary_release_date.lte=${end > today ? today : end}&vote_count.gte=150`; };
const franchiseQuery = f => f.cos ? `with_companies=${f.cos}&vote_count.gte=150&primary_release_date.lte=${new Date().toISOString().slice(0, 10)}` : '';
/** Franchise backdrop / studio logo path from TMDB, remembered in this browser. */
let ART_ = null; const artCache = () => ART_ || (ART_ = raw.get('tile_art2', {}));
async function tileArt(key) {
  const ART = artCache(); if (ART[key]) return ART[key];
  let path = null;
  try {
    const f = FRANCHISES.find(x => x.key === key), st = STUDIOS.find(x => x.key === key);
    if (f && f.art) path = (await tmdb(`movie/${f.art}`)).backdrop_path;
    else if (f) path = f.cols.length ? (await api.collection(f.cols[0])).backdrop_path : ((await api.discover('movie', franchiseQuery(f), 'popularity.desc', 1)).find(x => x.backdrop_path) || {}).backdrop_path;
    else if (st) { for (const id of st.cos.split('|')) { path = (await api.company(id)).logo_path; if (path) break; } }
  } catch (e) { path = null; }
  if (path) { ART[key] = path; raw.set('tile_art2', ART); }
  return path;
}
const artObserver = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { artObserver.unobserve(e.target); fillArt(e.target); } }), { rootMargin: '300px' }) : null;
/** How to show a studio logo: one-colour → white; colourful (WB shield, Marvel box, MGM lion) → real colours; dark → on a light plate. */
const LOOK = {};
function logoLook(p) {
  const saved = raw.get('logo_look', {}); if (saved[p]) return Promise.resolve(saved[p]);
  return LOOK[p] || (LOOK[p] = new Promise(res => {
    const im = new Image(); im.crossOrigin = 'anonymous';
    im.onload = () => { try {
      const w = 64, h = Math.max(8, Math.min(160, Math.round(im.height * 64 / im.width))), cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      const c = cv.getContext('2d'); c.drawImage(im, 0, 0, w, h); const d = c.getImageData(0, 0, w, h).data;
      let n = 0, sl = 0, sl2 = 0, sc = 0, sc2 = 0;
      for (let i = 0; i < d.length; i += 4) { if (d[i + 3] < 160) continue; const r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255, l = .2126 * r + .7152 * g + .0722 * b, ch = Math.max(r, g, b) - Math.min(r, g, b); n++; sl += l; sl2 += l * l; sc += ch; sc2 += ch * ch; }
      const m = sl / n, sdL = Math.sqrt(Math.max(0, sl2 / n - m * m)), sdC = Math.sqrt(Math.max(0, sc2 / n - (sc / n) ** 2));
      const look = n < 20 || (sdL < .12 && sdC < .12) ? 'white' : m < .38 ? 'plate' : 'color';
      const all = raw.get('logo_look', {}); all[p] = look; raw.set('logo_look', all); res(look);
    } catch (e) { res('white'); } };
    im.onerror = () => res('white'); im.src = IMG + 'w300' + p;
  }));
}
async function fillArt(el) {
  const p = await tileArt(el.dataset.art); if (!p) return;
  if (el.tagName === 'IMG') { el.src = IMG + (el.dataset.size || 'w780') + p; }
  else { el.style.setProperty('--logo', `url("${IMG}w300${p}")`); el.classList.add('has'); logoLook(p).then(l => el.classList.add('look-' + l)); }
}
const franchiseTile = (f, i) => `<a class="tile fr" href="#/catalog/franchise/${f.key}" style="${tileStyle(f.c1, f.c2, i)}"><img class="kb" data-art="${f.key}" alt="" style="animation-delay:-${(i * 1.3) % 16}s" onload="this.classList.add('ok')"><i class="scrim"></i><canvas data-scene="fx_${f.fx}" data-i="${i}"></canvas><span class="lbl"><b>${esc(T(f.name))}</b></span></a>`;
const studioTile = (st, i) => `<a class="tile st" href="#/catalog/studio/${st.key}" style="${tileStyle(st.c1, st.c2, i)}" aria-label="${esc(st.name)}"><canvas data-scene="fx_${st.fx}" data-i="${i}"></canvas><span class="slogo" data-art="${st.key}" style="animation-delay:-${(i * .37) % 4}s"><i></i><b>${esc(st.name)}</b></span></a>`;
const decadeLabel = (d, big) => `<span class="dlbl ${d.key}${big ? ' big' : ''}"><b>${d.label}</b>${S.lang === 'ar' ? `<small>${esc(T(d.label))}</small>` : ''}</span>`;
const decadeTile = (d, i) => `<a class="tile dec ph" href="#/catalog/decade/${d.key}" style="${tileStyle(d.c1, d.c2, i)}">${photoBits('decades', d.key, null, i)}<i class="era" style="background:linear-gradient(135deg, ${d.c1}73, transparent, ${d.c2}8c)"></i><canvas class="era-fx" data-scene="dec_${d.key}" data-i="${i}"></canvas>${decadeLabel(d)}</a>`;
/** Discover / Genres / Decades tiles: the category's most iconic film (most-voted on TMDB, or today's #1), never twice in a row. */
const GENRE_FX = { action: 'ember', adventure: 'dust', comedy: 'bubbles', drama: 'candle', scifi: 'hyperspace', horror: 'fog', thriller: 'spotlight', anime: 'petals', animation: 'arc', family: 'stars',
  romance: 'hearts', crime: 'siren', mystery: 'mist', fantasy: 'magic', documentary: 'globe', war: 'searchlights', history: 'grain', western: 'sand', music: 'music', reality: 'flash', kids: 'bubbles' };
const DISCOVER_FX = { foryou: 'magic', trending: 'ember', popular: 'flash', top_rated: 'rays' };
const photoBits = (row, key, fx, i) => `<img class="kb" data-row="${row}" data-key="${key}" alt="" style="animation-delay:-${(i * 1.3) % 16}s" onload="this.classList.add('ok')"><i class="scrim"></i>${fx ? `<canvas data-scene="fx_${fx}" data-i="${i}"></canvas>` : ''}`;
const ROWART = {};
function rowArt(row) {
  const all = raw.get('row_art', {}), c = all[row], ttl = row === 'discover' ? 12 * 3600e3 : 14 * 86400e3;
  if (c && Date.now() - c.at < ttl) return Promise.resolve(c.map);
  return ROWART[row] || (ROWART[row] = (async () => {
    const picks = row === 'discover' ? [['foryou', async () => { const s = LIB.slice().sort((a, b) => b.updatedAt - a.updatedAt)[0]; return [...(s ? await api.recs(s.type, s.id) : []), ...await api.trending('all', 'day')]; }],
        ['trending', () => api.trending('all', 'week')], ['popular', () => api.list('movie', 'popular')], ['top_rated', () => api.list('movie', 'top_rated')]]
      : row === 'genres' ? GENRES.map(g => [g.key, () => api.discover(g.mq != null ? 'movie' : 'tv', (g.mq != null ? g.mq : g.tq) || '', 'vote_count.desc', 1)])
      : DECADES.map(d => [d.key, () => api.discover('movie', decadeQuery(d), 'vote_count.desc', 1)]);
    const lists = await Promise.all(picks.map(([, f]) => f().catch(() => [])));
    const used = new Set(), map = {};
    picks.forEach(([k], i) => { const x = (lists[i] || []).find(m => m.backdrop_path && !used.has(m.id)); if (x) { used.add(x.id); map[k] = x.backdrop_path; } });
    if (Object.keys(map).length) { const a = raw.get('row_art', {}); a[row] = { at: Date.now(), map }; raw.set('row_art', a); }
    return Object.keys(map).length ? map : (c ? c.map : {});
  })());
}
function fillRowArt(root) {
  ['discover', 'genres', 'decades'].forEach(row => { const imgs = root.querySelectorAll(`img[data-row="${row}"]`); if (!imgs.length) return;
    rowArt(row).then(map => imgs.forEach(im => { const p = map[im.dataset.key]; if (p && !im.src) im.src = IMG + (im.dataset.size || 'w780') + p; })); });
}

// ============================================================================ icons
const P = {
  user: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z',
  up: 'M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z', down: 'M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
  tune: 'M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z',
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  livetv: 'M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3c-1.1 0-2 .89-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.11-.9-2-2-2zm0 14H3V8h18v12zM9 10v8l7-4z',
  star: 'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  plus: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  search: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  library: 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z',
  settings: 'M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z',
  play: 'M8 5v14l11-7z', pause: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z',
  back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  bookmark: 'M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z',
  bookmarkO: 'M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z',
  subs: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z',
  audio: 'M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z',
  speed: 'M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z',
  pip: 'M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z',
  airplay: 'M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
  full: 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z',
  rew: 'M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z',
  fwd: 'M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z',
  close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  link: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z',
  folder: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
  eyeOff: 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z',
  info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  ffwd: 'M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z', next: 'M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z',
  playC: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z',
  group: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  sync: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
  palette: 'M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  ext: 'M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z',
  del: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  movie: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z',
  flag: 'M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z',
  aspect: 'M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z',
  phone: 'M15.5 1h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z',
  open: 'M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',
  lock: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
  unlock: 'M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z',
  replay: 'M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z',
  remove: 'M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  checkC: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  volOn: 'M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
  volOff: 'M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a9 9 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z',
  prevT: 'M6 6h2v12H6zm3.5 6l8.5 6V6z',
  lang: 'M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z',
};
const ic = (name, extra = '') => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" ${extra}><path d="${P[name]}"/></svg>`;
const ic10 = name => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${P[name]}"/><text x="12" y="16.3" text-anchor="middle" font-size="6.5" font-weight="700" fill="currentColor">10</text></svg>`;

// ============================================================================ storage
// ============================================================================ account data (shared with the Android app)
// One Lumio account works on the phone app, the Fold and this website: data is kept in the app's own format
// (profiles, settings.<id>, library.<id>, scene_filters.<id>) and synced through Supabase.
const SB_URL = 'https://rdkkkoypfkwjzceswhrq.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJka2trb3lwZmt3anpjZXN3aHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3ODc5NzEsImV4cCI6MjEwODM2Mzk3MX0.DUKI8PK7UjBqj7q9qmSqZd-3IXtLi5NMW7m0YkfJzC4';
const raw = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage full or blocked */ } },
  del(k) { try { localStorage.removeItem(k); } catch { /* ignore */ } },
};
const jparse = (str, d) => { try { return str == null ? d : JSON.parse(str); } catch { return d; } };
let SESSION = raw.get('lumio.session', null);   // { access, refresh, expires, uid, email }
let CD = {};                                      // account data: key → JSON string (same keys as the app)
const MAIN = 'main';
let PROFILE_ID = MAIN;
const kS = id => id === MAIN ? 'settings' : 'settings.' + id;
const kL = id => id === MAIN ? 'library' : 'library.' + id;
const kF = id => id === MAIN ? 'scene_filters' : 'scene_filters.' + id;
const cacheKey = () => 'lumio.cd.' + (SESSION?.uid || 'local');

// ---- profiles
const normProfile = p => ({ id: p.id, name: p.name || '', avatar: p.avatar || 'a:rocket', avatarUrl: p.avatarUrl || null, pinHash: p.pinHash || null, shareAddons: p.shareAddons !== false });
function profiles() {
  const list = jparse(CD.profiles, null);
  return Array.isArray(list) && list.length ? list.map(normProfile) : [normProfile({ id: MAIN, name: 'Me' })];
}
function saveProfiles(list) {
  CD.profiles = JSON.stringify(list.map(p => { const o = { id: p.id, name: p.name, avatar: p.avatar, shareAddons: p.shareAddons }; if (p.avatarUrl) o.avatarUrl = p.avatarUrl; if (p.pinHash) o.pinHash = p.pinHash; return o; }));
  dataChanged();
}
const activeProfile = () => profiles().find(p => p.id === PROFILE_ID) || profiles()[0];
const sharingAddons = () => { const p = activeProfile(); return p.id !== MAIN && p.shareAddons; };

// ---- settings: app format ↔ web
const hexToLong = h => 0xFF000000 + parseInt(String(h).replace('#', '').slice(0, 6) || '7C5CFF', 16);
const longToHex = n => '#' + ((Number(n) >>> 0) & 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
function rawSettings(id) { const v = jparse(CD[kS(id)], null); return v || (id === MAIN ? {} : rawSettings(MAIN)); }
const BUILT_IN_ADDONS_VERSION = 4;
/** The old Classic look's olive custom colour (yellow-green) — switched once to Midnight (v4, same as the apps). */
function isOliveHex(h) { const [r, g, b] = [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16) / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  if (mx === mn || mx === 0) return false; const s = (mx - mn) / mx; let hue = mx === r ? (g - b) / (mx - mn) : mx === g ? 2 + (b - r) / (mx - mn) : 4 + (r - g) / (mx - mn); hue = (hue * 60 + 360) % 360;
  return hue >= 50 && hue <= 90 && s > .25; }
function fromApp(a) {
  const ver = a.builtInAddonsVersion || 0;
  let addons = Array.isArray(a.addons) ? a.addons.map(x => ({ url: x.manifestUrl, name: x.name, resources: x.resources || [], builtIn: !!x.builtIn,
      enabled: x.enabled !== false, configurable: !!x.configurable, version: x.version || '', description: x.description || null, logo: x.logo || null }))
    : (ver ? [] : BUILT_IN_ADDONS.slice());
  // v2 (same as the apps): OpenSubtitles built in, and Arabic subtitles by default
  if (ver < BUILT_IN_ADDONS_VERSION && Array.isArray(a.addons)) addons = [...BUILT_IN_ADDONS.filter(b => !addons.some(x => x.url === b.url)), ...addons];
  const subLang = ver < 2 && (a.subtitleLanguage || 'en') === 'en' ? 'ar' : (a.subtitleLanguage || 'ar');
  // v3: Midnight is Lumio's icon colour (the old default was Classic olive)
  const iconColor = ver < 3 && (a.iconColor || 'classic') === 'classic' ? 'midnight' : a.iconColor;
  return {
    tmdbKey: a.tmdbKey || '', region: a.region || 'US',
    accent: ver < 4 && a.accentPreset === 'custom' && isOliveHex(longToHex(a.customAccent ?? 0xFF7C5CFF)) ? 'midnight' : (a.accentPreset || 'midnight'), customAccent: longToHex(a.customAccent ?? 0xFF7C5CFF), amoled: !!a.amoled,
    titleColor: a.titleColor || 'white', arabicFont: a.arabicFont || 'cinema', iconColor: iconColor || 'midnight',
    intro: a.introAnimation !== false, introSound: a.introSound !== false,
    skipIntro: (a.skipIntro || 'BUTTON').toLowerCase(), skipRecap: (a.skipRecap || 'BUTTON').toLowerCase(), skipCredits: (a.skipCredits || 'BUTTON').toLowerCase(),
    skipNudity: !!a.skipNudity, subLang, trailers: a.trailerPreviews || 'sound', subScale: a.subtitleScale ?? 1, subBg: a.subtitleBackground ?? true,
    autoNext: a.autoPlayNext ?? true, lang: a.language || raw.get('lumio.deviceLang', 'en'),
    iptv: Array.isArray(a.iptvSources) ? a.iptvSources : [], favs: Array.isArray(a.favChannels) ? a.favChannels : [], recents: Array.isArray(a.recentChannels) ? a.recentChannels : [],
    addons,
  };
}
function toApp(w, base) {
  return Object.assign({}, base, {
    tmdbKey: w.tmdbKey, region: w.region, accentPreset: w.accent, customAccent: hexToLong(w.customAccent), amoled: !!w.amoled,
    titleColor: w.titleColor || 'white', arabicFont: w.arabicFont || 'cinema', iconColor: w.iconColor || 'midnight',
    introAnimation: w.intro !== false, introSound: w.introSound !== false,
    skipIntro: w.skipIntro.toUpperCase(), skipRecap: w.skipRecap.toUpperCase(), skipCredits: w.skipCredits.toUpperCase(), skipNudity: !!w.skipNudity,
    subtitleLanguage: w.subLang, trailerPreviews: w.trailers || 'sound', subtitleScale: w.subScale, subtitleBackground: w.subBg, autoPlayNext: w.autoNext, language: w.lang,
    iptvSources: w.iptv || [], favChannels: w.favs || [], recentChannels: w.recents || [],
    addons: w.addons.map(x => ({ manifestUrl: x.url, name: x.name, resources: x.resources || [], builtIn: !!x.builtIn,
      enabled: x.enabled !== false, configurable: !!x.configurable, version: x.version || '', description: x.description || null, logo: x.logo || null })),
    builtInAddonsVersion: Math.max(base.builtInAddonsVersion || 0, BUILT_IN_ADDONS_VERSION),
  });
}
// ---- library entries: app format ↔ web
const fromEntry = e => ({ type: e.type, id: e.tmdbId, title: e.title || '', poster: e.posterPath || null, backdrop: e.backdropPath || null, watch: !!e.inWatchlist,
  pos: e.positionMs || 0, dur: e.durationMs || 0, season: e.season ?? null, episode: e.episode ?? null, url: e.lastStreamUrl || null, imdb: e.imdbId || null,
  addon: e.addonName || null, watched: !!e.watched, pin: e.pinHash || null, updatedAt: e.updatedAt || 0 });
const toEntry = x => ({ tmdbId: x.id, type: x.type, title: x.title || '', posterPath: x.poster || null, backdropPath: x.backdrop || null, inWatchlist: !!x.watch,
  positionMs: Math.round(x.pos || 0), durationMs: Math.round(x.dur || 0), season: x.season ?? null, episode: x.episode ?? null,
  lastStreamUrl: x.url && !String(x.url).startsWith('blob:') ? x.url : null, imdbId: x.imdb || null, addonName: x.addon || null,
  watched: !!x.watched, pinHash: x.pin || null, updatedAt: x.updatedAt || Date.now() });

const DEFAULT_SETTINGS = fromApp({});
let S, LIB;
function loadProfileData() {
  S = fromApp(rawSettings(PROFILE_ID));
  if (sharingAddons()) S.addons = fromApp(rawSettings(MAIN)).addons;
  LIB = jparse(CD[kL(PROFILE_ID)], []).map(fromEntry);
}
const saveSettings = () => {
  const base = rawSettings(PROFILE_ID);
  const next = toApp(S, base);
  if (sharingAddons()) {   // addon changes belong to the main profile
    const main = rawSettings(MAIN);
    CD[kS(MAIN)] = JSON.stringify(Object.assign({}, main, { addons: next.addons, builtInAddonsVersion: Math.max(main.builtInAddonsVersion || 0, 1) }));
    if ('addons' in base) next.addons = base.addons; else delete next.addons;
  }
  CD[kS(PROFILE_ID)] = JSON.stringify(next);
  dataChanged(); applyTheme(); applyLang();
};
const saveLib = () => { CD[kL(PROFILE_ID)] = JSON.stringify(LIB.slice(0, 500).map(toEntry)); dataChanged(); };
// Scene filters (only thing still read through `store`)
const store = {
  get(k, d) {
    if (k !== 'filters') return d;
    const out = {};
    for (const [key, list] of Object.entries(jparse(CD[kF(PROFILE_ID)], {}))) out[key] = list.map(x => ({ kind: x.kind || 'nudity', start: x.startMs, end: x.endMs, source: x.source || '' }));
    return out;
  },
  set(k, v) {
    if (k !== 'filters') return;
    const out = {};
    for (const [key, list] of Object.entries(v)) out[key] = list.map(x => ({ kind: x.kind, startMs: Math.round(x.start), endMs: Math.round(x.end), source: x.source || '' }));
    CD[kF(PROFILE_ID)] = JSON.stringify(out); dataChanged();
  },
};

// ---- Supabase auth + sync
let pushTimer = null, lastPushed = '';
function dataChanged() { raw.set(cacheKey(), CD); clearTimeout(pushTimer); pushTimer = setTimeout(() => cloudPush(), 2000); }
function friendlyAuth(m) {
  if (/Invalid login credentials/i.test(m)) return 'Wrong email or password';
  if (/already (been )?registered/i.test(m)) return 'An account with this email already exists. Sign in instead.';
  if (/Email not confirmed/i.test(m)) return 'Please confirm your email first (check your inbox).';
  if (/Password should be/i.test(m)) return 'Password must be at least 6 characters';
  if (/rate limit/i.test(m)) return 'Too many attempts. Try again in a minute.';
  return m;
}
async function authCall(path, body, tok) {
  const r = await fetch(`${SB_URL}/auth/v1/${path}`, { method: 'POST', headers: Object.assign({ apikey: SB_KEY, 'Content-Type': 'application/json' }, tok ? { Authorization: 'Bearer ' + tok } : {}), body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(friendlyAuth(j.msg || j.error_description || j.message || j.error || 'HTTP ' + r.status));
  return j;
}
function saveSession(j) {
  SESSION = { access: j.access_token, refresh: j.refresh_token, expires: Date.now() + (j.expires_in || 3600) * 1000, uid: j.user?.id || SESSION?.uid, email: j.user?.email || SESSION?.email };
  raw.set('lumio.session', SESSION);
}
async function sbToken() {
  if (!SESSION) throw new Error('Signed out');
  if (Date.now() > SESSION.expires - 60000) saveSession(await authCall('token?grant_type=refresh_token', { refresh_token: SESSION.refresh }));
  return SESSION.access;
}
// Versioned sync (same rules as the phone app): each upload names the cloud version it was based on.
// If another device wrote in between, the upload is refused → merge both copies → try again. Nothing gets wiped.
let BASE = null, PULLED = false, syncChain = Promise.resolve();
const baseKey = () => 'lumio.base.' + (SESSION?.uid || '');
const pushedKey = () => 'lumio.pushed.' + (SESSION?.uid || '');
function loadSyncState() { BASE = raw.get(baseKey(), null); lastPushed = raw.get(pushedKey(), ''); PULLED = false; }
function rememberSynced(at, data) {
  BASE = at; lastPushed = JSON.stringify(data);
  raw.set(baseKey(), BASE); raw.set(pushedKey(), lastPushed); raw.set('lumio.lastSync', Date.now());
}
const serial = fn => { const run = () => fn(); const p = syncChain.then(run, run); syncChain = p.catch(() => {}); return p; };
function mergeCD(remote, local) {
  const out = Object.assign({}, remote);
  for (const [k, lv] of Object.entries(local)) {
    const rv = remote[k];
    if (rv == null) { out[k] = lv; continue; }
    try {
      if (k === 'profiles') {
        const r = JSON.parse(rv), l = JSON.parse(lv);
        out[k] = JSON.stringify(r.concat(l.filter(p => !r.some(x => x.id === p.id))));
      } else if (k.startsWith('library')) {
        const m = new Map();
        for (const e of JSON.parse(rv).concat(JSON.parse(lv))) { const id = e.type + '-' + e.tmdbId, c = m.get(id); if (!c || (e.updatedAt || 0) > (c.updatedAt || 0)) m.set(id, e); }
        out[k] = JSON.stringify([...m.values()].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)).slice(0, 500));
      } else if (k.startsWith('scene_filters')) {
        const r = JSON.parse(rv), l = JSON.parse(lv), o = {};
        for (const key of new Set(Object.keys(r).concat(Object.keys(l)))) {
          const seen = new Set();
          o[key] = (r[key] || []).concat(l[key] || []).filter(x => { const id = x.startMs + ':' + x.endMs; if (seen.has(id)) return false; seen.add(id); return true; }).sort((a, b) => a.startMs - b.startMs);
        }
        out[k] = JSON.stringify(o);
      } else if (k.startsWith('settings')) {   // cloud wins, but keep every addon from every device
        const r = JSON.parse(rv), l = JSON.parse(lv);
        const ra = Array.isArray(r.addons) ? r.addons : [], la = Array.isArray(l.addons) ? l.addons : [];
        const extra = la.filter(a => !ra.some(x => x.manifestUrl === a.manifestUrl));
        if (extra.length) { r.addons = ra.concat(extra); out[k] = JSON.stringify(r); }
      }
    } catch { /* keep the cloud's copy */ }
  }
  return out;
}
async function fetchRow() {
  const t = await sbToken();
  const r = await fetch(`${SB_URL}/rest/v1/user_data?select=data,updated_at&user_id=eq.${SESSION.uid}`, { headers: { apikey: SB_KEY, Authorization: 'Bearer ' + t }, cache: 'no-store' });
  if (!r.ok) throw new Error('Sync failed');
  const row = (await r.json())[0];
  if (!row) return null;
  const data = {}; for (const [k, v] of Object.entries(row.data || {})) data[k] = typeof v === 'string' ? v : JSON.stringify(v);
  return { data, at: row.updated_at };
}
async function upload(data, at) {
  const t = await sbToken();
  const payload = { data, updated_at: new Date().toISOString() };
  if (!at) payload.user_id = SESSION.uid;
  const body = JSON.stringify(payload);
  const url = at ? `${SB_URL}/rest/v1/user_data?user_id=eq.${SESSION.uid}&updated_at=eq.${encodeURIComponent(at)}&select=updated_at`
                 : `${SB_URL}/rest/v1/user_data?select=updated_at`;
  const r = await fetch(url, { method: at ? 'PATCH' : 'POST', keepalive: body.length < 60000,
    headers: { apikey: SB_KEY, Authorization: 'Bearer ' + t, 'Content-Type': 'application/json', Prefer: 'return=representation' }, body });
  if (r.status === 409) return false;
  if (!r.ok) throw new Error('Sync failed');
  const j = await r.json();
  if (!j.length) return false;           // another device wrote first
  rememberSynced(j[0].updated_at, data);
  return true;
}
/** Returns true when the account has data (callers then refresh the screen). */
async function cloudPullNow(combine) {
  for (let i = 0; i < 4; i++) {
    const row = await fetchRow();
    const changed = JSON.stringify(CD) !== lastPushed;
    PULLED = true;
    if (!row || !Object.keys(row.data).length) {
      if (!Object.keys(CD).length) return false;   // nothing anywhere: never upload a blank starter profile
      if (await upload(CD, row?.at)) return true;
      continue;
    }
    let up = null;
    if (!combine && row.at === BASE) { if (changed) up = CD; }                 // only this browser changed
    else if (!combine && BASE && !changed) CD = row.data;                      // only other devices changed
    else { CD = mergeCD(row.data, CD); if (JSON.stringify(CD) !== JSON.stringify(row.data)) up = CD; }   // both: combine
    raw.set(cacheKey(), CD);
    if (!up) { rememberSynced(row.at, CD); return true; }
    if (await upload(up, row.at)) return true;
  }
  throw new Error('Sync conflict');
}
async function cloudPushNow(force) {
  if (!SESSION) return;
  if (!PULLED || !BASE) { const b = JSON.stringify(CD); await cloudPullNow(); if (JSON.stringify(CD) !== b) applyCloudChanges(); return; }   // never upload before seeing the cloud
  if (!force && JSON.stringify(CD) === lastPushed) return;
  if (!(await upload(CD, BASE))) { await cloudPullNow(); applyCloudChanges(); }
}
const cloudPull = () => serial(cloudPullNow);
const cloudPush = force => serial(() => cloudPushNow(force)).catch(() => { /* offline: retried on the next change */ });
const libEntry = (type, id) => LIB.find(e => e.type === type && e.id === id);
function updateLib(type, id, fn) {
  const i = LIB.findIndex(e => e.type === type && e.id === id);
  const cur = i >= 0 ? LIB[i] : null;
  const next = fn(cur);
  if (i >= 0) LIB.splice(i, 1);
  if (next) LIB.unshift(Object.assign(next, { updatedAt: Date.now() }));
  saveLib();
}
const isContinue = e => e && e.pos > 30000 && e.dur > 0 && e.pos / e.dur < .95;
const progressOf = e => e && e.dur > 0 ? Math.min(1, e.pos / e.dur) : 0;

/** The Lumio icon (gradient square + play mark) in one of the Appearance colours, as a PNG data URL. */
/** The app icon in any colour: a soft pool of light on the icon colour + the wand writing the L (icons/mark.png). */
const MARK_IMG = new Image();
MARK_IMG.onload = () => { applyTheme(); if (document.querySelector('.ap-icons')) appearanceView(); };
MARK_IMG.src = 'icons/mark.png';
function mixHex(a, b, t) {
  const pa = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16));
  return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
}
function iconURL(key, size = 180) {
  const p = ICONS.find(x => x[0] === key) || ICONS[0];
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d'), gr = g.createRadialGradient(size / 2, size * 0.42, 0, size / 2, size * 0.42, size * 0.8);
  gr.addColorStop(0, mixHex(p[2], p[3], 0.45)); gr.addColorStop(0.6, p[3]); gr.addColorStop(1, mixHex(p[3], '#000000', 0.55));
  g.fillStyle = gr; g.fillRect(0, 0, size, size);
  if (MARK_IMG.complete && MARK_IMG.naturalWidth) g.drawImage(MARK_IMG, 0, 0, size, size);
  return c.toDataURL('image/png');
}
const titleHex = () => { const t = TITLES.find(x => x[0] === S.titleColor) || TITLES[0]; return t[2] || getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#FFFFFF'; };
function applyTheme() {
  const a = ACCENTS.find(x => x[0] === S.accent);
  document.documentElement.style.setProperty('--accent', a ? a[2] : S.customAccent);
  document.documentElement.style.setProperty('--title', titleHex());
  const root = document.documentElement.classList;
  root.toggle('af-clear', S.arabicFont === 'clear'); root.toggle('af-ruqaa', S.arabicFont === 'ruqaa');
  // App icon colour: browser tab icon + iPhone home-screen icon (for new "Add to Home Screen")
  if (S.iconColor && S.iconColor !== 'midnight') {
    for (const [rel, size] of [['icon', 64], ['apple-touch-icon', 180]]) {
      let l = document.querySelector(`link[rel="${rel}"]`); if (!l) { l = document.createElement('link'); l.rel = rel; document.head.appendChild(l); }
      l.href = iconURL(S.iconColor, size);
    }
  } else { const l = document.querySelector('link[rel="apple-touch-icon"]'); if (l) l.href = 'icons/apple-touch-icon.png'; document.querySelector('link[rel="icon"]')?.remove(); }
  document.documentElement.classList.toggle('amoled', !!S.amoled);
  const bg = S.amoled ? '#000000' : '#0B0B0F';
  document.querySelector('meta[name=theme-color]').setAttribute('content', bg);
  let cue = document.getElementById('cue-style');
  if (!cue) { cue = document.createElement('style'); cue.id = 'cue-style'; document.head.appendChild(cue); }
  cue.textContent = `::cue { font-size: ${Math.round(S.subScale * 100)}%; }`;
}

// ============================================================================ language
/** Translate UI text to Arabic when chosen. Movie & show titles are never translated. */
const T = s => (S.lang === 'ar' && window.LUMIO_AR && window.LUMIO_AR[s]) || s;
function applyLang() {
  const ar = S.lang === 'ar';
  document.documentElement.lang = ar ? 'ar' : 'en';
  document.documentElement.dir = ar ? 'rtl' : 'ltr';
}

// ============================================================================ helpers
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const yearOf = x => (x.release_date || x.first_air_date || '').slice(0, 4);
const titleOf = x => x.title || x.name || '';
const fmt = ms => { const t = Math.max(0, Math.floor(ms / 1000)), h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s = t % 60; return h ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`; };
const langName = c => { if (!c || c === 'und') return null; try { return new Intl.DisplayNames(['en'], { type: 'language' }).of(c) || c; } catch { return c; } };
let toastTimer;
function toast(msg) { const t = $('#toast'); t.textContent = T(msg); t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200); }

async function getJSON(url, timeout = 15000) {
  const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), timeout);
  try { const r = await fetch(url, { signal: ctl.signal }); if (!r.ok) throw new Error('HTTP ' + r.status); return await r.json(); }
  finally { clearTimeout(tm); }
}
const cache = new Map();
function tmdb(path) {
  const key = (S.tmdbKey || '').trim() || BUILT_IN_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/${path}${path.includes('?') ? '&' : '?'}api_key=${key}&language=en-US`;
  if (!cache.has(url)) cache.set(url, getJSON(url).catch(e => { cache.delete(url); throw e; }));
  return cache.get(url);
}
const typed = (list, type) => (list || []).map(x => Object.assign(x, { media_type: x.media_type || type })).filter(x => x.media_type === 'movie' || x.media_type === 'tv');
const api = {
  trending: (type = 'all', win = 'week', page = 1) => tmdb(`trending/${type}/${win}?page=${page}`).then(r => typed(r.results, type)),
  list: (type, kind, page = 1) => tmdb(`${type}/${kind}?page=${page}`).then(r => typed(r.results, type)),
  search: q => tmdb(`search/multi?query=${encodeURIComponent(q)}&include_adult=false`).then(r => typed(r.results)),
  details: (type, id) => tmdb(`${type}/${id}?append_to_response=external_ids,credits,images,videos&include_image_language=ar,en,null&include_video_language=en,ar,null`),
  person: id => tmdb(`person/${id}?append_to_response=combined_credits`),
  season: (id, n) => tmdb(`tv/${id}/season/${n}`).then(r => r.episodes || []),
  collection: id => tmdb(`collection/${id}`),
  company: id => tmdb(`company/${id}`),
  /** Every film of these TMDB collections (a saga), de-duplicated. */
  async parts(ids) {
    const all = (await Promise.all(ids.map(id => api.collection(id).then(r => r.parts || []).catch(() => [])))).flat();
    const seen = new Set(); const today = new Date().toISOString().slice(0, 10);
    return all.filter(x => x.release_date && x.release_date <= today && !seen.has(x.id) && seen.add(x.id)).map(x => Object.assign(x, { media_type: 'movie' }));
  },
  recs: (type, id) => tmdb(`${type}/${id}/recommendations`).then(r => typed(r.results, type)).catch(() => []),
  discover(type, query, sort, page) {
    const region = S.region || 'US';
    let extra = sort.startsWith('vote_average') && !query.includes('vote_count.gte') ? '&vote_count.gte=300' : '';
    if ((sort.startsWith('primary_release_date') || sort.startsWith('first_air_date')) && !query.includes('_date.lte')) extra += `&${type === 'movie' ? 'primary_release_date' : 'first_air_date'}.lte=${new Date().toISOString().slice(0, 10)}`;
    return tmdb(`discover/${type}?sort_by=${sort}&page=${page}${query.includes('watch_region=') ? '' : '&watch_region=' + region}&include_adult=false${extra}&${query}`).then(r => typed(r.results, type));
  },
};

// ---- Title logos & trailers (same picks as the phone and TV apps)
const GENRE_NAMES = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie', 53: 'Thriller',
  10752: 'War', 37: 'Western', 10759: 'Action', 10762: 'Kids', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi', 10766: 'Soap', 10767: 'Talk', 10768: 'War' };
const mainGenre = x => (x.genre_ids || []).map(g => GENRE_NAMES[g]).find(Boolean) || (x.genres || [])[0]?.name || null;
/** Best logo: app language first, then English, then language-free art; most liked first. */
function pickLogo(logos) {
  const want = S.lang === 'ar' ? 'ar' : 'en', rank = l => l.iso_639_1 === want ? 0 : l.iso_639_1 === 'en' ? 1 : !l.iso_639_1 ? 2 : 3;
  return (logos || []).filter(l => !/\.svg$/i.test(l.file_path)).sort((a, b) => rank(a) - rank(b) || (b.vote_average || 0) - (a.vote_average || 0))[0]?.file_path || null;
}
const logoCache = new Map();
function logoPath(type, id) {
  const k = `${type}-${id}-${S.lang}`;
  if (!logoCache.has(k)) logoCache.set(k, tmdb(`${type}/${id}/images?include_image_language=ar,en,null`).then(r => pickLogo(r.logos)).catch(() => null));
  return logoCache.get(k);
}
/** Official trailer → teaser → anything, on YouTube. */
function bestTrailer(videos) {
  const rank = v => ({ Trailer: 0, Teaser: 1 }[v.type] ?? 2) * 4 + (v.official ? 0 : 2) + (v.iso_639_1 === 'en' ? 0 : 1);
  return ((videos && videos.results) || []).filter(v => v.site === 'YouTube' && v.key).sort((a, b) => rank(a) - rank(b))[0]?.key || null;
}
/** The title's logo art, or its name in type when there's none (or the picture fails). */
const titleArt = (path, title, cls = '') => path
  ? `<img class="tlogo ${cls}" src="${IMG}w500${path}" alt="${esc(title)}" onerror="this.outerHTML='<h1 class=&quot;tlogo-txt ${cls}&quot;>'+this.alt.replace(/[<&]/g,'')+'</h1>'">`
  : `<h1 class="tlogo-txt ${cls}">${esc(title)}</h1>`;
const metaLine = x => [T(x.media_type === 'tv' || x.first_air_date ? 'Series' : 'Movie'), mainGenre(x) && T(mainGenre(x)), yearOf(x)].filter(Boolean).join('  •  ');
/**
 * A trailer in the page (YouTube's privacy-friendly embed, no controls or suggestions), faded in once it really
 * plays. It reports back so the artwork can stay when a trailer can't be shown here.
 */
function mountTrailer(box, key, { muted = true, loop = false, onPlay, onFail, onEnd } = {}) {
  const f = document.createElement('iframe');
  f.className = 'yt'; f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.tabIndex = -1; f.setAttribute('aria-hidden', 'true');
  f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(key)}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&origin=${encodeURIComponent(location.origin)}${loop ? '&loop=1&playlist=' + encodeURIComponent(key) : ''}`;
  let played = false;
  const onMsg = e => {
    if (!f.isConnected) return removeEventListener('message', onMsg);
    if (e.source !== f.contentWindow) return;
    let d; try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch { return; }
    const state = d.event === 'onStateChange' ? d.info : d.event === 'infoDelivery' ? d.info?.playerState : undefined;
    if (d.event === 'onError') { removeEventListener('message', onMsg); f.remove(); onFail && onFail(); }
    else if (state === 1 && !played) { played = true; f.classList.add('on'); onPlay && onPlay(); }
    else if (state === 0) { f.classList.remove('on'); onEnd && onEnd(); }
  };
  addEventListener('message', onMsg);
  f.onload = () => f.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }), '*');
  box.appendChild(f);
  return { el: f, cmd: (func, args = []) => f.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*'), stop: () => { removeEventListener('message', onMsg); f.remove(); } };
}
/** Full-screen trailer with sound (Esc / Close). */
function trailerOverlay(key) {
  const bg = document.createElement('div'); bg.className = 'trailer-full';
  bg.innerHTML = `<div class="spinner"></div><button class="icon-btn tf-x" aria-label="${T('Close')}">${ic('close')}</button>`;
  document.body.appendChild(bg);
  const t = mountTrailer(bg, key, { muted: false, onPlay: () => $('.spinner', bg)?.remove(), onEnd: () => bg.remove(),
    onFail: () => { $('.spinner', bg)?.remove(); bg.insertAdjacentHTML('beforeend', `<p class="tf-msg">${T("This trailer isn't available right now")}</p>`); } });
  $('.tf-x', bg).onclick = () => { t.stop(); bg.remove(); };
  bg.onclick = e => { if (e.target === bg) { t.stop(); bg.remove(); } };
}

// Streaming services: resolve real ids & logos for the region
let servicesReady = null;
function loadServices() {
  if (servicesReady) return servicesReady;
  servicesReady = Promise.all(['movie', 'tv'].map(t => tmdb(`watch/providers/${t}?watch_region=${S.region || 'US'}`).then(r => r.results || []).catch(() => [])))
    .then(([a, b]) => {
      const all = [...a, ...b];
      if (!all.length) return SERVICES;
      const match = (s, list) => list.filter(p => s.aliases.includes(String(p.provider_name).trim().toLowerCase()));
      // Regional services (Shahid, OSN+) are always shown: outside their home region, browse that region's catalog
      const homes = [...new Set(SERVICES.filter(s => s.home && !match(s, all).length).map(s => s.home))];
      return Promise.all(homes.map(r => Promise.all(['movie', 'tv'].map(t => tmdb(`watch/providers/${t}?watch_region=${r}`).then(x => x.results || []).catch(() => [])))
        .then(([x, y]) => [r, [...x, ...y]]))).then(pairs => {
        const regional = Object.fromEntries(pairs);
        return SERVICES.map(s => {
          const m = match(s, all);
          if (m.length) return Object.assign({}, s, { ids: [...new Set(m.map(p => p.provider_id))].join('|'), logo: m[0].logo_path });
          if (!s.home) return null;
          const h = match(s, regional[s.home] || []);
          return Object.assign({}, s, { ids: h.length ? [...new Set(h.map(p => p.provider_id))].join('|') : s.ids, logo: h[0]?.logo_path || null, region: s.home });
        }).filter(Boolean);
      });
    });
  return servicesReady;
}

// Addons (Stremio protocol)
const addonBase = a => a.url.replace(/\/manifest\.json$/, '').replace(/\/$/, '');
const supports = (a, r) => a.enabled !== false && (!a.resources || !a.resources.length || a.resources.includes(r));
async function fetchManifest(url) {
  let clean = url.trim().replace(/^stremio:\/\//, 'https://');
  if (!clean.endsWith('manifest.json')) clean = clean.replace(/\/$/, '') + '/manifest.json';
  const m = await getJSON(clean);
  const resources = (m.resources || []).map(r => typeof r === 'string' ? r : r && r.name).filter(Boolean);
  const hint = k => !!(m.behaviorHints && m.behaviorHints[k]);
  return { url: clean, name: m.name || 'Addon', resources, enabled: true, configurable: hint('configurable') || hint('configurationRequired'),
    version: m.version || '', description: m.description || null, logo: m.logo || null };
}
const quality = s => { s = s.toUpperCase(); return /2160|4K|UHD/.test(s) ? '4K' : /1080/.test(s) ? '1080p' : /720/.test(s) ? '720p' : ''; };
const hdr = s => { s = s.toUpperCase(); return /DOLBY VISION|\bDV\b|DOVI/.test(s) ? 'Dolby Vision' : /HDR10\+/.test(s) ? 'HDR10+' : /HDR/.test(s) ? 'HDR' : ''; };
const AUDIO_RANK = ['Dolby Atmos', 'Dolby TrueHD', 'DTS:X', 'DTS-HD MA', 'Dolby Digital+', 'Dolby Digital'];
const audioTag = s => { s = s.toUpperCase();
  return /ATMOS/.test(s) ? 'Dolby Atmos' : /TRUE-?HD/.test(s) ? 'Dolby TrueHD' : /DTS[:-]?X/.test(s) ? 'DTS:X' : /DTS-HD|DTS HD|DTS-MA/.test(s) ? 'DTS-HD MA'
    : /\bDD\+|\bDDP|E-?AC-?3|DOLBY DIGITAL PLUS/.test(s) ? 'Dolby Digital+' : /\bDD\b|\bDD5|\bAC-?3\b|DOLBY DIGITAL/.test(s) ? 'Dolby Digital' : ''; };
const sizeGb = s => { const m = s.match(/(\d+(?:[.,]\d+)?)\s*GB/i); return m ? parseFloat(m[1].replace(',', '.')) : 0; };
/** What a source's description says, tidied up: instant (debrid cache), size, seeders, source, codec, channels, languages. */
function srcInfo(st) {
  const all = st.label + '\n' + st.details, up = all.toUpperCase();
  return {
    instant: /\[(RD|TB|AD|PM|DL|ED|OC|PK)\+]/.test(st.label) || st.label.includes('⚡'),
    size: (all.match(/💾\s*([\d.,]+\s*[GMT]B)/) || all.match(/([\d.,]+\s*GB)\b/i) || [])[1] || null,
    seeds: (all.match(/👤\s*(\d+)/) || [])[1] || null,
    site: (all.match(/⚙️\s*([^\s\n]+)/) || [])[1] || null,
    source: /REMUX/.test(up) ? 'Remux' : /BLU-?RAY|BDRIP/.test(up) ? 'Blu-ray' : /WEB-?DL/.test(up) ? 'WEB-DL' : /WEBRIP/.test(up) ? 'WEBRip' : /HDTV/.test(up) ? 'HDTV' : /\b(CAM|HDCAM|TS|TELESYNC)\b/.test(up) ? 'CAM' : null,
    codec: /X265|H\.?265|HEVC/.test(up) ? 'HEVC' : /AV1/.test(up) ? 'AV1' : /X264|H\.?264|AVC/.test(up) ? 'H.264' : null,
    channels: (up.match(/\b([257]\.1|2\.0)\b/) || [])[1] || null,
    multi: /MULTI|DUAL/.test(up),
    flags: [...new Set(st.details.match(/[\u{1F1E6}-\u{1F1FF}]{2}/gu) || [])],
    file: st.details.split('\n').map(x => x.trim()).find(x => x && !x.startsWith('👤')) || null,
  };
}
async function getStreams(type, imdb, season, episode) {
  const st = type === 'tv' ? 'series' : 'movie';
  const id = season != null ? `${imdb}:${season}:${episode}` : imdb;
  const lists = await Promise.all(S.addons.filter(a => supports(a, 'stream')).map(a =>
    getJSON(`${addonBase(a)}/stream/${st}/${id}.json`).then(r => (r.streams || []).filter(x => x.url).map(x => {
      const label = (x.name || a.name).replace(/\n/g, ' '), details = [x.title, x.description].filter(Boolean).join('\n');
      const all = label + ' ' + details;
      return { addon: a.name, label, details, url: x.url, q: quality(all), h: hdr(all), a: audioTag(all), gb: sizeGb(all) };
    })).catch(() => [])));
  // Best picture first, then the richest sound, then the biggest file (more bitrate at the same resolution)
  const rank = s => ({ '4K': 0, '1080p': 1, '720p': 2 }[s.q] ?? 3) * 100 + ({ 'Dolby Vision': 0, 'HDR10+': 1, HDR: 2 }[s.h] ?? 3) * 10 + (s.a ? AUDIO_RANK.indexOf(s.a) : 7);
  return lists.flat().sort((a, b) => rank(a) - rank(b) || b.gb - a.gb);
}
async function getSubtitles(type, imdb, season, episode) {
  const st = type === 'tv' ? 'series' : 'movie';
  const id = season != null ? `${imdb}:${season}:${episode}` : imdb;
  const lists = await Promise.all(S.addons.filter(a => supports(a, 'subtitles')).map(a =>
    getJSON(`${addonBase(a)}/subtitles/${st}/${id}.json`, 10000).then(r => r.subtitles || []).catch(() => [])));
  const seen = new Set();
  return lists.flat().filter(s => s.url && !seen.has(s.url) && seen.add(s.url));
}
async function introSegments(type, id, season, episode, durMs) {
  let q = `tmdb_id=${id}`;
  if (type === 'tv' && season != null) q += `&season=${season}&episode=${episode}`;
  if (durMs > 0) q += `&duration_ms=${Math.round(durMs)}`;
  try {
    const r = await getJSON(`https://api.theintrodb.org/v4/media?${q}`, 10000);
    const out = [];
    for (const k of ['recap', 'intro', 'credits', 'preview']) (r[k] || []).forEach(t => {
      const start = t.start_ms ?? ((k === 'intro' || k === 'recap') ? 0 : null);
      if (start == null || (t.end_ms == null && k !== 'credits' && k !== 'preview')) return;
      out.push({ kind: k, start, end: t.end_ms ?? null, source: 'TheIntroDB' });
    });
    return out;
  } catch { return []; }
}

// ============================================================================ views: shared pieces
function img(src, alt = '') { return src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" onload="this.classList.add('ok')">` : ''; }
const badgesHTML = e => `${e && e.watched ? `<span class="watched" title="${T('Watched')}">${ic('check')}</span>` : ''}${e && e.pin ? `<span class="locked">${ic('lock')}</span>` : ''}`;
function posterCard(x, i = 0, prog, cont) {
  const t = x.media_type || 'movie', e = libEntry(t, x.id);
  return `<a class="poster fly" style="animation-delay:${Math.min(i, 12) * 28}ms" href="#/details/${t}/${x.id}" data-k="${t}-${x.id}" data-type="${t}" data-id="${x.id}" ${cont ? 'data-cont="1"' : ''} data-title="${esc(titleOf(x))}" data-poster="${esc(x.poster_path || '')}" data-year="${yearOf(x)}">
    <div class="art">${img(x.poster_path && IMG + 'w342' + x.poster_path, titleOf(x))}
      ${x.vote_average ? `<span class="rate"><b>★</b> ${x.vote_average.toFixed(1)}</span>` : ''}
      <span class="badges">${badgesHTML(e)}</span>
      ${prog ? `<span class="prog"><i style="width:${prog * 100}%"></i></span>` : ''}</div>
    <div class="t">${esc(titleOf(x))}</div>${yearOf(x) ? `<div class="y">${yearOf(x)}</div>` : ''}</a>`;
}
const rail = (title, items, progress, cont) => items && items.length ? `<div class="rail-title gutter">${esc(T(title))}</div><div class="rail gutter">${items.map((x, i) => posterCard(x, i, progress && progress(x), cont)).join('')}</div>` : '';
const sectionH = (t, sub) => `<div class="section-h gutter"><div><h2>${esc(T(t))}</h2><div class="bar"></div>${sub ? `<p>${esc(T(sub))}</p>` : ''}</div></div>`;
const skeletonRows = () => Array.from({ length: 3 }, () => `<div class="gutter" style="padding-top:22px"><div class="sk" style="width:140px;height:18px;margin-bottom:10px"></div><div style="display:flex;gap:12px;overflow:hidden">${Array.from({ length: 6 }, () => '<div class="sk" style="flex:0 0 var(--poster);aspect-ratio:2/3"></div>').join('')}</div></div>`).join('');
const msg = (h, p, action = '') => `<div class="msg"><h3>${esc(T(h))}</h3><p>${esc(T(p))}</p>${action}</div>`;
const logoHTML = (s, i, size) => s.logo ? `<span class="logo m-${s.motion}" style="--c1:${s.c1};--d:${(i % 5) * .45}s;animation-delay:${100 + i * 60}ms${size ? `;width:${size}px;height:${size}px;border-radius:${size * .25}px` : ''}"><img src="${IMG}w154${s.logo}" alt=""><span class="sheen"></span></span>` : '';
const tileStyle = (c1, c2, i) => `--c1:${c1};--c2:${c2};--ang:${120 + (i * 37) % 120}deg;animation-delay:${i * 45}ms,0s`;

function discoverSections() {
  return `${sectionH('Discover', 'Curated lists, updated daily')}
  <div class="rail gutter">${DISCOVER.map((d, i) => `<a class="tile discover ph" href="#/catalog/discover/${d.key}" style="${tileStyle(d.c1, d.c2, i)}">${photoBits('discover', d.key, DISCOVER_FX[d.key], i)}<span class="emoji" style="animation-delay:${i * .3}s">${d.emoji}</span><span class="lbl"><b>${esc(T(d.name))}</b><small>${esc(T(d.sub))}</small></span></a>`).join('')}</div>
  ${sectionH('Streaming Services', 'Browse every catalog')}
  <div class="rail gutter" id="services-rail">${servicesHTML(SERVICES.filter(s => s.logo))}</div>
  ${sectionH('Genres', 'Something for every mood')}
  <div class="rail gutter">${GENRES.map((g, i) => `<a class="tile genre ph" href="#/catalog/genre/${g.key}" style="${tileStyle(g.c1, g.c2, i)}">${photoBits('genres', g.key, GENRE_FX[g.key] || 'sheen', i)}<span class="lbl"><b>${esc(T(g.name))}</b></span></a>`).join('')}</div>
  ${sectionH('Franchises', 'Every saga, film by film')}
  <div class="rail gutter">${FRANCHISES.map(franchiseTile).join('')}</div>
  ${sectionH('Production Studios', 'The studios behind the movies')}
  <div class="rail gutter">${STUDIOS.map(studioTile).join('')}</div>
  ${sectionH('Decades', 'Movies from every era')}
  <div class="rail gutter">${DECADES.map(decadeTile).join('')}</div>`;
}
const servicesHTML = list => list.map((s, i) => `<a class="tile service" href="#/catalog/service/${s.key}" style="${tileStyle(s.c1, s.c2, i)}">${logoHTML(s, i)}<b>${esc(s.name)}</b></a>`).join('');
function mountDiscover(root) {
  root.querySelectorAll('canvas[data-scene]').forEach(c => window.GenreScenes && GenreScenes.attach(c, c.dataset.scene, +c.dataset.i));
  root.querySelectorAll('[data-art]').forEach(el => artObserver ? artObserver.observe(el) : fillArt(el));
  fillRowArt(root);
  loadServices().then(list => { const r = $('#services-rail', root); if (r) r.innerHTML = servicesHTML(list); });
}

// ============================================================================ router
const view = $('#view');
let routeToken = 0;
const TABS = [['home', 'Home', 'home'], ['livetv', 'Live TV', 'livetv'], ['search', 'Search', 'search'], ['library', 'Library', 'library'], ['settings', 'Settings', 'settings']];
const scrollMemo = {};
function renderNav(active) {
  const nav = $('#nav');
  nav.innerHTML = TABS.map(([k, l, i]) => `<a class="nav-item ${k === active ? 'on' : ''}" href="#/${k}" aria-label="${T(l)}">${ic(i)}<span class="lbl">${T(l)}</span></a>`).join('');
  nav.classList.toggle('hidden', !active);
  view.classList.toggle('no-nav', !active);
}
let lastHash = '';
async function route() {
  if (!SESSION) { loginView(); return; }
  if (!PROFILE_CHOSEN) { profilesView(); return; }
  const hash = location.hash || '#/home';
  scrollMemo[lastHash] = scrollY; lastHash = hash;
  const [, name = 'home', ...args] = hash.slice(1).split('/');
  if (name !== 'play') closePlayer(true);
  const token = ++routeToken;
  const tab = TABS.some(t => t[0] === name) ? name : null;
  renderNav(tab);
  setTimeout(pPill, 0);
  view.classList.remove('view-enter'); void view.offsetWidth; view.classList.add('view-enter');
  closeSheet();
  try {
    switch (name) {
      case 'home': await homeView(token); break;
      case 'livetv': await liveTvView(token); break;
      case 'tv': await channelsView(args[0], args[1], token); break;
      case 'search': searchView(); break;
      case 'library': libraryView(args[0]); break;
      case 'settings': settingsView(args[0] || ''); break;
      case 'appearance': appearanceView(); break;
      case 'party': partyView(args[0]); break;
      case 'catalog': catalogView(args[0], args[1], token); break;
      case 'details': await detailsView(args[0], +args[1], token); break;
      case 'person': await personView(+args[0], token); break;
      case 'streams': await streamsView(args[0], +args[1], args[2] === '-' ? null : +args[2], args[3] === '-' ? null : +args[3], token); break;
      case 'play': if (!PLAYER.req) { location.replace('#/home'); return; } break;
      default: location.replace('#/home'); return;
    }
  } catch (e) {
    if (token === routeToken) view.innerHTML = msg("Couldn't load", e.message || 'Network error', `<button class="btn acc" onclick="route()">${T("Retry")}</button>`);
  }
  requestAnimationFrame(() => window.scrollTo(0, scrollMemo[hash] || 0));
}
window.addEventListener('hashchange', route);

// ============================================================================ home
async function homeView(token) {
  view.innerHTML = `<div class="sk" style="height:min(560px,78vh);border-radius:0"></div>${skeletonRows()}`;
  const [trend, popM, popT, now, air, topM, topT] = await Promise.all([
    api.trending(), api.list('movie', 'popular'), api.list('tv', 'popular'), api.list('movie', 'now_playing'),
    api.list('tv', 'on_the_air'), api.list('movie', 'top_rated'), api.list('tv', 'top_rated')]);
  if (token !== routeToken) return;
  const hero = trend.filter(x => x.backdrop_path).slice(0, 8);
  const cont = LIB.filter(isContinue).map(e => ({ id: e.id, media_type: e.type, title: e.title, poster_path: e.poster }));
  const wide = innerWidth >= 700;
  view.innerHTML = `
    <section class="hero">
      <div class="hero-track" id="hero-track">${hero.map(x => `<div class="hero-slide">${img(wide ? IMG + 'w1280' + x.backdrop_path : IMG + 'w780' + (x.poster_path || x.backdrop_path), titleOf(x))}</div>`).join('')}</div>
      <div class="hero-info gutter" id="hero-info"></div>
    </section>
    ${rail('Continue Watching', cont, x => progressOf(libEntry(x.media_type, x.id)), true)}
    ${discoverSections()}
    ${rail('Trending This Week', trend)}${rail('Popular Movies', popM)}${rail('Popular Shows', popT)}
    ${rail('In Theaters', now)}${rail('Airing Now', air)}${rail('Top Rated Movies', topM)}${rail('Top Rated Shows', topT)}`;
  mountDiscover(view);
  // hero carousel
  const track = $('#hero-track'), info = $('#hero-info');
  let idx = -1;
  const show = i => {
    if (i === idx || !hero[i]) return; idx = i; const x = hero[i];
    info.innerHTML = `<div class="hero-logo" id="hero-logo"></div><div class="meta hero-meta"><span>${esc(metaLine(x))}</span>${x.vote_average ? `<span class="star">★ ${x.vote_average.toFixed(1)}</span>` : ''}</div>
      ${wide ? `<p class="dim" style="margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${esc(x.overview)}</p>` : ''}
      <div class="row-btns" style="justify-content:${wide ? 'flex-start' : 'center'}"><a class="btn white" href="#/details/${x.media_type}/${x.id}">${ic('play')}${T("Play")}</a><a class="btn tonal" href="#/details/${x.media_type}/${x.id}">${ic('info')}${T("Details")}</a></div>
      <div class="dots">${hero.map((_, j) => `<i class="${j === i ? 'on' : ''}"></i>`).join('')}</div>`;
    info.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'ease-out' });
    // The title's own logo (held space while it's looked up, so the name never flashes first)
    logoPath(x.media_type, x.id).then(path => { const box = $('#hero-logo'); if (box && idx === i) box.innerHTML = titleArt(path, titleOf(x)); });
  };
  hero.forEach(x => logoPath(x.media_type, x.id));   // ready before their slide
  show(0);
  track.addEventListener('scroll', () => show(Math.round(track.scrollLeft / track.clientWidth)), { passive: true });
  const timer = setInterval(() => {
    if (!track.isConnected) return clearInterval(timer);
    if (document.hidden) return;
    track.scrollTo({ left: ((idx + 1) % hero.length) * track.clientWidth, behavior: 'smooth' });
  }, 7000);
}

// ============================================================================ search
function searchView() {
  view.innerHTML = `<div class="search gutter"><label>${ic('search')}<input id="q" type="search" placeholder="${T('Search movies & shows')}" autocomplete="off" enterkeyhint="search"></label></div><div id="results"></div>`;
  const input = $('#q'), out = $('#results');
  const empty = () => { out.innerHTML = discoverSections(); mountDiscover(out); };
  empty();
  let t, n = 0;
  input.addEventListener('input', () => {
    clearTimeout(t);
    const q = input.value.trim();
    if (q.length < 2) { empty(); return; }
    t = setTimeout(async () => {
      const my = ++n;
      out.innerHTML = `<div class="gutter" style="padding-top:12px"><div class="grid">${Array.from({ length: 9 }, () => '<div class="sk" style="aspect-ratio:2/3"></div>').join('')}</div></div>`;
      const res = await api.search(q).catch(() => []);
      if (my !== n) return;
      out.innerHTML = res.length ? `<div class="gutter" style="padding-top:12px"><div class="grid">${res.map(posterCard).join('')}</div></div>` : msg('No results', 'Try a different title.');
    }, 300);
  });
}

// ============================================================================ library
function libraryView(tab = 'watchlist') {
  const tabs = [['watchlist', 'Watchlist'], ['continue', 'Continue Watching'], ['history', 'History']];
  const list = tab === 'continue' ? LIB.filter(isContinue) : tab === 'history' ? LIB.filter(e => e.pos > 0) : LIB.filter(e => e.watch);
  view.innerHTML = `<h1 class="page-title gutter">${T("Library")}</h1>
    <div class="chips gutter">${tabs.map(([k, l]) => `<a class="chip ${k === tab ? 'on' : ''}" style="display:grid;place-items:center" href="#/library/${k}">${T(l)}</a>`).join('')}</div>
    ${list.length ? `<div class="gutter" style="padding-top:12px"><div class="grid">${list.map((e, i) => posterCard({ id: e.id, media_type: e.type, title: e.title, poster_path: e.poster }, i, tab === 'watchlist' ? 0 : progressOf(e), tab === 'continue')).join('')}</div></div>`
      : msg('Nothing here yet', tab === 'watchlist' ? 'Tap the bookmark on any title to save it.' : 'Start watching something!')}`;
}

// ============================================================================ catalog
function catalogInfo(kind, key) {
  if (kind === 'discover') { const d = DISCOVER.find(x => x.key === key); return d && { title: d.name, sub: d.sub, emoji: d.emoji, row: 'discover', scene: 'fx_' + DISCOVER_FX[key], c1: d.c1, c2: d.c2, mq: '', tq: key === 'foryou' ? null : '', sortable: false }; }
  if (kind === 'service') { const s = SERVICES.find(x => x.key === key); return s && { title: s.name, sub: `Streaming now on ${s.name}`, service: s, c1: s.c1, c2: s.c2, sortable: true }; }
  if (kind === 'world') { const w = WORLD.find(x => x.key === key); return w && { title: w.name, sub: w.tq ? 'Series everyone is watching' : 'The best films', scene: 'tv_' + w.scene, c1: w.c1, c2: w.c2, mq: w.mq, tq: w.tq, sortable: true }; }
  if (kind === 'franchise') { const f = FRANCHISES.find(x => x.key === key); return f && { title: f.name, sub: 'Every film, in release order', franchise: f, scene: 'fx_' + f.fx, c1: f.c1, c2: f.c2, mq: franchiseQuery(f), tq: null, sortable: true, sorts: [ORDER_SORT, ...SORTS] }; }
  if (kind === 'studio') { const st = STUDIOS.find(x => x.key === key); return st && { title: st.name, studio: st, scene: 'fx_' + st.fx, c1: st.c1, c2: st.c2, mq: `with_companies=${st.cos}&vote_count.gte=50&primary_release_date.lte=${new Date().toISOString().slice(0, 10)}`, tq: null, sortable: true }; }
  if (kind === 'decade') { const d = DECADES.find(x => x.key === key); return d && { title: d.label, decade: d, row: 'decades', scene: 'dec_' + d.key, c1: d.c1, c2: d.c2, mq: decadeQuery(d), tq: null, sortable: true }; }
  const g = GENRES.find(x => x.key === key); return g && { title: g.name, sub: `The best ${g.name.toLowerCase()} titles`, genre: g.key, row: 'genres', scene: 'fx_' + (GENRE_FX[g.key] || 'sheen'), c1: g.c1, c2: g.c2, mq: g.mq, tq: g.tq, sortable: true };
}
/** Actor / director page: photo, bio and every movie & series they're in. */
async function personView(id, token) {
  view.innerHTML = `<div class="gutter" style="padding-top:80px">${'<div class="sk" style="height:140px;border-radius:20px"></div>'}</div>`;
  const p = await api.person(id);
  if (token !== routeToken) return;
  const seen = new Map();
  [...(p.combined_credits?.cast || []), ...(p.combined_credits?.crew || []).filter(c => c.job === 'Director' || c.job === 'Creator')]
    .filter(c => c.poster_path && (c.media_type === 'movie' || c.media_type === 'tv'))
    .forEach(c => { const k = c.media_type + '-' + c.id; const role = c.character || c.job || ''; const cur = seen.get(k);
      if (cur) { if (role && !cur.role.includes(role)) cur.role += ' / ' + role; } else seen.set(k, Object.assign({}, c, { role })); });
  const all = [...seen.values()].sort((a, b) => (b.popularity * 0.6 + (b.vote_count || 0) / 400) - (a.popularity * 0.6 + (a.vote_count || 0) / 400));
  const movies = all.filter(c => c.media_type === 'movie').length, shows = all.length - movies;
  let filter = 'all';
  const facts = [p.known_for_department === 'Acting' ? T('Actor') : p.known_for_department, p.birthday ? (p.deathday ? `${p.birthday.slice(0, 4)} – ${p.deathday.slice(0, 4)}` : `${T('Born')} ${p.birthday.slice(0, 4)}`) : '', p.place_of_birth].filter(Boolean);
  const draw = () => {
    const list = filter === 'all' ? all : all.filter(c => c.media_type === filter);
    view.innerHTML = `<a class="icon-btn back" href="javascript:history.back()" aria-label="Back">${ic('back')}</a>
      <div class="gutter person-head">
        <div class="person-ph">${p.profile_path ? `<img src="${IMG}h632${p.profile_path}" alt="">` : ''}</div>
        <div><h1>${esc(p.name)}</h1>${facts.length ? `<p class="dim">${esc(facts.join('  ·  '))}</p>` : ''}
          <p class="acc-t">${movies} ${T('Movies')}  ·  ${shows} ${T('Shows')}</p>
          ${p.biography ? `<p class="dim bio">${esc(p.biography)}</p>` : ''}</div>
      </div>
      <div class="gutter chips" style="margin:14px 0">${[['all', T('All') + ' ' + all.length], ['movie', T('Movies') + ' ' + movies], ['tv', T('Shows') + ' ' + shows]]
        .filter(([k]) => k === 'all' || (k === 'movie' ? movies : shows)).map(([k, l]) => `<button class="chip ${filter === k ? 'on' : ''}" data-f="${k}">${l}</button>`).join('')}</div>
      <div class="gutter"><div class="grid">${list.map((c, i) => posterCard(c, i)).join('')}</div></div>`;
    view.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { filter = b.dataset.f; draw(); });
    view.querySelector('.bio')?.addEventListener('click', e => e.currentTarget.classList.toggle('open'));
  };
  draw();
}


// ============================================================================ Live TV
// Free, legal channels from iptv-org (streams the broadcasters publish themselves) + your own M3U / Xtream playlists.
const FREE_TV = 'https://iptv-org.github.io/iptv';
const TV_COUNTRIES = [['kw', 'Kuwait', '🇰🇼', '#007A3D', '#0B2A18'], ['sa', 'Saudi Arabia', '🇸🇦', '#006C35', '#032715'], ['ae', 'UAE', '🇦🇪', '#CE1126', '#2A0508'],
  ['qa', 'Qatar', '🇶🇦', '#8A1538', '#2A0612'], ['bh', 'Bahrain', '🇧🇭', '#CE1126', '#33060B'], ['om', 'Oman', '🇴🇲', '#DB161B', '#0A3B12'], ['eg', 'Egypt', '🇪🇬', '#C8A24B', '#2E2208'],
  ['iq', 'Iraq', '🇮🇶', '#007A3D', '#1A0505'], ['jo', 'Jordan', '🇯🇴', '#007A3D', '#140A0A'], ['lb', 'Lebanon', '🇱🇧', '#00A651', '#2A0505'], ['ara', 'All Arabic', '🌙', '#1E3A8A', '#0B1230']]
  .map(([key, name, emoji, c1, c2]) => ({ key, name, emoji, c1, c2, path: key === 'ara' ? 'languages/ara' : 'countries/' + key }));
const TV_CATS = [['news', 'News', '📰', '#B91C1C', '#2A0606'], ['sports', 'Sports', '⚽', '#16A34A', '#062A14'], ['kids', 'Kids', '🧸', '#F59E0B', '#3A2405'],
  ['movies', 'Movies', '🎬', '#7C3AED', '#1E0B3A'], ['series', 'Series', '📺', '#DB2777', '#3A0A20'], ['music', 'Music', '🎵', '#EC4899', '#3A0B26'],
  ['religious', 'Religious', '🕌', '#0F766E', '#04241F'], ['documentary', 'Documentary', '🌍', '#0EA5E9', '#052A3D'], ['entertainment', 'Entertainment', '✨', '#F97316', '#3A1805'],
  ['general', 'General', '📡', '#64748B', '#1A2230'], ['business', 'Business', '📈', '#22C55E', '#082A14'], ['culture', 'Culture', '🎭', '#A855F7', '#2A0B3A']]
  .map(([key, name, emoji, c1, c2]) => ({ key, name, emoji, c1, c2, group: name }));
const tvCache = {};
function parseM3U(text) {
  const out = []; let cur = null;
  const attr = (l, k) => { const m = l.match(new RegExp(k + '="([^"]*)"', 'i')); return m && m[1] ? m[1] : null; };
  for (const raw of text.split(/\r?\n/)) {
    const l = raw.trim();
    if (/^#EXTINF/i.test(l)) {
      const m = l.match(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/g); const idx = l.lastIndexOf(m ? m[m.length - 1] : ',');
      cur = { name: l.slice(idx + 1).trim(), logo: attr(l, 'tvg-logo'), groups: (attr(l, 'group-title') || '').split(';').map(x => x.trim()).filter(x => x && x !== 'Undefined') };
    } else if (/^#EXTGRP:/i.test(l) && cur && !cur.groups.length) cur.groups = [l.slice(8).trim()];
    else if (l && !l.startsWith('#') && cur) { out.push(Object.assign(cur, { url: l })); cur = null; }
  }
  return out;
}
const cleanName = n => n.replace(/\s*\[[^\]]*]/g, '').replace(/\s*\((\d{3,4}p|SD|HD)\)/g, '').trim();
const chNote = n => [...n.matchAll(/\[([^\]]*)]/g)].map(m => m[1]).join(' · ');
async function fetchText(url) { const r = await fetch(url, { cache: 'no-store' }); if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); }
async function tvList(key, load) { const c = tvCache[key]; if (c && Date.now() - c.t < 30 * 6e4) return c.v; const v = await load(); tvCache[key] = { t: Date.now(), v }; return v; }
async function freeChannels(cat) {
  if (cat.path) return tvList(cat.path, async () => parseM3U(await fetchText(`${FREE_TV}/${cat.path}.m3u`)));
  const lists = await Promise.all(['languages/ara', 'countries/kw', 'countries/sa', 'countries/ae'].map(p => tvList(p, async () => parseM3U(await fetchText(`${FREE_TV}/${p}.m3u`))).catch(() => [])));
  const seen = new Set(); return lists.flat().filter(ch => ch.groups.some(g => g.toLowerCase() === cat.group.toLowerCase()) && !seen.has(ch.url) && seen.add(ch.url));
}
const xtBase = s => { const b = s.server.trim().replace(/\/+$/, ''); return /^https?:\/\//.test(b) ? b : 'http://' + b; };
const xtApi = (s, action) => `${xtBase(s)}/player_api.php?username=${encodeURIComponent(s.username)}&password=${encodeURIComponent(s.password)}${action ? '&action=' + action : ''}`;
/** "…/get.php?username=X&password=Y" links are Xtream servers — read them through the API instead. */
function xtFromLink(src) {
  try { const u = new URL(src.url); if (!u.pathname.endsWith('get.php')) return null; const user = u.searchParams.get('username'), pass = u.searchParams.get('password');
    return user && pass ? Object.assign({}, src, { kind: 'xtream', server: u.origin, username: user, password: pass }) : null; } catch { return null; }
}
async function sourceChannels(src0) {
  const src = src0.kind === 'xtream' ? src0 : (xtFromLink(src0) || src0);
  return tvList('src:' + src.id + src.url + src.server + src.username, async () => {
    if (src.kind !== 'xtream') { const list = parseM3U(await fetchText(src.url)); if (!list.length) throw new Error("That link didn't return a channel list"); return list; }
    const [cats, streams] = await Promise.all([getJSON(xtApi(src, 'get_live_categories')).catch(() => []), getJSON(xtApi(src, 'get_live_streams'))]);
    const names = Object.fromEntries((cats || []).map(c => [String(c.category_id), c.category_name]));
    return (streams || []).map(o => ({ name: o.name || 'Channel ' + o.stream_id, logo: /^http/.test(o.stream_icon || '') ? o.stream_icon : null,
      groups: names[String(o.category_id)] ? [names[String(o.category_id)]] : [], url: `${xtBase(src)}/live/${src.username}/${src.password}/${o.stream_id}.m3u8` }));
  });
}
function playChannel(list, i) {
  const ch = list[i]; if (!ch) return;
  S.recents = [{ name: cleanName(ch.name), url: ch.url, logo: ch.logo || null, group: ch.groups[0] || '' }, ...(S.recents || []).filter(x => x.url !== ch.url)].slice(0, 20); saveSettings();
  PLAYER.channels = list; PLAYER.chIndex = i;
  startPlayer({ type: 'live', id: null, local: true, title: cleanName(ch.name), subtitle: `${i + 1} · ${ch.groups[0] || T('Live TV')}`, url: ch.url });
}
function toggleFav(ch) {
  const has = (S.favs || []).some(x => x.url === ch.url);
  S.favs = has ? S.favs.filter(x => x.url !== ch.url) : [...(S.favs || []), { name: cleanName(ch.name), url: ch.url, logo: ch.logo || null, group: ch.groups[0] || '' }];
  saveSettings(); toast(T(has ? 'Removed from Favourites' : 'Added to Favourites'));
}
const savedToCh = x => ({ name: x.name, url: x.url, logo: x.logo, groups: x.group ? [x.group] : [] });
function chCard(ch, i, favs) {
  const note = chNote(ch.name), sub = [ch.groups[0], note].filter(Boolean).map(x => T(x)).join(' · ');
  return `<button class="ch" data-i="${i}"><span class="ch-logo">${ch.logo ? `<img src="${esc(ch.logo)}" alt="" loading="lazy" onerror="this.remove()">` : ''}<b class="ch-ph">${esc(cleanName(ch.name).replace(/[^\p{L}\p{N}]/gu, '').slice(0, 3).toUpperCase())}</b><span class="ch-live">${T('LIVE')}</span>${favs.has(ch.url) ? `<span class="ch-fav">${ic('star')}</span>` : ''}</span>
    <span class="ch-name">${esc(cleanName(ch.name))}</span>${sub ? `<span class="dim ch-sub">${esc(sub)}</span>` : ''}</button>`;
}
function bindChannels(box, list) {
  box.querySelectorAll('.ch').forEach(b => {
    let t = null, long = false;
    b.onpointerdown = () => { long = false; t = setTimeout(() => { long = true; toggleFav(list[+b.dataset.i]); }, 550); };
    b.onpointerup = b.onpointerleave = () => clearTimeout(t);
    b.oncontextmenu = e => { e.preventDefault(); };
    b.onclick = () => { if (!long) playChannel(list, +b.dataset.i); };
  });
}
const tvTile = (c, i, href, label, emoji, scene, extra = '') => `<a class="tile genre tv" href="${href}" style="${tileStyle(c.c1, c.c2, i)}"><canvas data-scene="${scene}" data-i="${i}"></canvas>${extra}<span class="lbl"><b>${emoji} ${esc(label)}</b></span></a>`;

// ---- Football: live scores, fixtures and results (ESPN's public scoreboard, same leagues as the apps)
const LEAGUES = [['ksa.1', 'Saudi Pro League', 'دوري روشن السعودي'], ['afc.champions', 'AFC Champions League', 'دوري أبطال آسيا'], ['egy.1', 'Egyptian Premier League', 'الدوري المصري'],
  ['uefa.champions', 'Champions League', 'دوري أبطال أوروبا'], ['eng.1', 'Premier League', 'الدوري الإنجليزي'], ['esp.1', 'LaLiga', 'الدوري الإسباني'], ['ita.1', 'Serie A', 'الدوري الإيطالي'],
  ['ger.1', 'Bundesliga', 'الدوري الألماني'], ['fra.1', 'Ligue 1', 'الدوري الفرنسي'], ['uefa.europa', 'Europa League', 'الدوري الأوروبي'], ['uefa.europa.conf', 'Conference League', 'دوري المؤتمر الأوروبي'],
  ['por.1', 'Liga Portugal', 'الدوري البرتغالي'], ['ned.1', 'Eredivisie', 'الدوري الهولندي'], ['tur.1', 'Süper Lig', 'الدوري التركي'], ['eng.fa', 'FA Cup', 'كأس الاتحاد الإنجليزي'],
  ['eng.league_cup', 'Carabao Cup', 'كأس الرابطة الإنجليزية'], ['esp.copa_del_rey', 'Copa del Rey', 'كأس ملك إسبانيا'], ['ita.coppa_italia', 'Coppa Italia', 'كأس إيطاليا'],
  ['ger.dfb_pokal', 'DFB-Pokal', 'كأس ألمانيا'], ['fifa.world', 'FIFA World Cup', 'كأس العالم'], ['fifa.worldq.afc', 'World Cup Qualifiers (Asia)', 'تصفيات كأس العالم – آسيا'],
  ['fifa.worldq.uefa', 'World Cup Qualifiers (Europe)', 'تصفيات كأس العالم – أوروبا'], ['uefa.nations', 'UEFA Nations League', 'دوري الأمم الأوروبية'], ['fifa.cwc', 'FIFA Club World Cup', 'كأس العالم للأندية'],
  ['fifa.friendly', 'International Friendlies', 'مباريات ودية دولية'], ['usa.1', 'MLS', 'الدوري الأمريكي']].map(([key, name, ar]) => ({ key, name, ar }));
let matchCache = null;
async function soccerMatches() {
  if (matchCache && Date.now() - matchCache.t < 45000) return matchCache.v;
  const now = Date.now(), from = now - 3 * 864e5, to = now + 7 * 864e5;
  const months = [...new Set([from, now, to].map(t => new Date(t).toISOString().slice(0, 7).replace('-', '')))];
  const side = o => { const t = o.team || {}; return { id: String(t.id || ''), name: t.displayName || t.name || '', short: t.shortDisplayName || t.abbreviation || '', logo: t.logo || t.logos?.[0]?.href || null, score: o.score ?? null, winner: !!o.winner }; };
  const lists = await Promise.all(LEAGUES.flatMap(lg => months.map(m => getJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${lg.key}/scoreboard?dates=${m}`, 12000).then(j => (j.events || []).map(e => {
    try {
      const c = e.competitions[0], st = e.status || c.status, ty = st.type || {}, cs = c.competitors || [];
      const home = cs.find(x => x.homeAway === 'home') || cs[0], away = cs.find(x => x.homeAway === 'away') || cs[1];
      return { id: e.id, league: lg, start: Date.parse(e.date), state: ty.state, clock: st.displayClock || '', detail: ty.shortDetail || ty.detail || '',
        home: side(home), away: side(away), tv: [...new Set((c.broadcasts || []).flatMap(b => b.names || []))] };
    } catch { return null; }
  }).filter(Boolean)).catch(() => []))));
  const seen = new Set();
  const v = lists.flat().filter(m => m.start >= from && m.start <= to && !seen.has(m.id) && seen.add(m.id)).sort((a, b) => a.start - b.start);
  v.forEach(m => { m.live = m.state === 'in'; m.finished = m.state === 'post'; m.upcoming = m.state === 'pre' && !/postpon|cancel/i.test(m.detail); });
  if (v.length) matchCache = { t: Date.now(), v };
  return v;
}
function dayLabel(t) {
  const d = new Date(t), key = x => x.toDateString(), today = new Date();
  const shift = n => { const x = new Date(); x.setDate(x.getDate() + n); return key(x); };
  return key(d) === key(today) ? T('Today') : key(d) === shift(1) ? T('Tomorrow') : key(d) === shift(-1) ? T('Yesterday')
    : d.toLocaleDateString(S.lang === 'ar' ? 'ar' : undefined, { weekday: 'long', day: 'numeric', month: 'long' });
}
const hhmm = t => new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
/** Square card like the X app: league on top, crests and score (or kick-off) in the middle, status below. */
function matchCard(m) {
  const crest = sd => `<span class="mc-team"><img src="${esc(sd.logo || '')}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><b class="${sd.winner ? 'win' : ''}">${esc(sd.short || sd.name)}</b></span>`;
  const mid = m.upcoming || m.home.score == null ? `<span class="mc-time">${hhmm(m.start)}</span>` : `<span class="mc-score">${esc(m.home.score)}-${esc(m.away.score)}</span>`;
  const foot = m.live ? `<span class="mc-live"><i></i>${T('LIVE')} ${esc(m.clock || m.detail)}</span>` : m.finished ? `<span class="mc-ft">${esc(m.detail || 'FT')}</span>` : `<span class="mc-ft">${esc(dayLabel(m.start))}</span>`;
  return `<button class="match ${m.live ? 'is-live' : ''}" data-mid="${esc(m.id)}"><span class="mc-lg">${esc(S.lang === 'ar' ? m.league.ar : m.league.name)}</span>
    <span class="mc-mid">${crest(m.home)}${mid}${crest(m.away)}</span>${foot}</button>`;
}
/**
 * Channels in your playlists that should be showing this match: the broadcasters the feed lists, plus the usual
 * Arabic-region broadcaster of the competition (beIN SPORTS for the big European leagues, SSC / Thmanyah for the
 * Saudi league …). Best first: the exact channel name, then 4K / FHD / HD.
 */
function channelsForMatch(m, channels) {
  const norm = x => String(x).toLowerCase().replace(/sports/g, 'sport').replace(/[^\p{L}\p{N}]/gu, '');
  const k = m.league.key;
  const region = k === 'ksa.1' ? ['ssc', 'thmanyah', 'shahid'] : k === 'egy.1' ? ['ontime', 'on sport', 'ssc'] : k.startsWith('afc') || k.startsWith('fifa.worldq.afc') ? ['ssc', 'bein sport', 'alkass'] : k === 'tur.1' ? ['bein sport', 's sport'] : ['bein sport'];
  const names = [...new Set([...m.tv, ...region].map(norm).filter(x => x.length >= 3))];
  const teams = [m.home.name, m.away.name, m.home.short, m.away.short].map(norm).filter(x => x.length >= 4);
  const seen = new Set();
  return channels.map(ch => {
    const n = norm(cleanName(ch.name)); let score = 0;
    names.forEach((tv, i) => { const base = tv.replace(/\d+$/, ''); if (n.includes(tv)) score = Math.max(score, 30 - i); else if (base.length >= 3 && n.includes(base)) score = Math.max(score, 15 - i); });
    if (teams.some(t => n.includes(t))) score += 20;
    return score ? [ch, score * 10 + (/4k|uhd/.test(n) ? 4 : /fhd/.test(n) ? 3 : /hd/.test(n) ? 2 : 0) - (/sd/.test(n) ? 1 : 0)] : null;
  }).filter(Boolean).sort((a, b) => b[1] - a[1]).map(x => x[0]).filter(ch => !seen.has(ch.url) && seen.add(ch.url)).slice(0, 24);
}
/** Tap a live / upcoming match → the channels airing it (best first). */
async function watchMatch(m) {
  sheet(m.home.name + ' vs ' + m.away.name, [{ t: 'Finding the channel…' }]);
  const lists = await Promise.all([...(S.iptv || []).map(p => sourceChannels(p).catch(() => [])), freeChannels(TV_CATS.find(c => c.key === 'sports')).catch(() => [])]);
  const all = lists.flat(), picks = channelsForMatch(m, all);
  if (!$('.sheet')) return;
  if (!picks.length) return sheet(m.home.name + ' vs ' + m.away.name, [{ t: 'No channel found for this match', s: m.tv.length ? `${T('Shown on')}: ${m.tv.join(', ')}` : 'Add your TV provider\'s playlist in Live TV → My playlists' }]);
  if (picks.length === 1) { closeSheet(); return playChannel(picks, 0); }
  sheet(m.home.name + ' vs ' + m.away.name, picks.map((ch, i) => ({ t: cleanName(ch.name), s: ch.groups[0] || '', icon: 'livetv', fn: () => playChannel(picks, i) })));
}
let soccerState = { filter: null, league: null };
async function mountMatches(box) {
  const draw = list => {
    if (!box.isConnected) return;
    const st = soccerState, filter = st.filter || (list.some(m => m.live) ? 'live' : 'upcoming');
    const shown = list.filter(m => (!st.league || m.league.key === st.league) && (filter === 'live' ? m.live : filter === 'upcoming' ? m.upcoming : m.finished));
    if (filter === 'results') shown.reverse();
    const leagues = LEAGUES.filter(lg => list.some(m => m.league.key === lg.key)), live = list.filter(m => m.live).length;
    box.innerHTML = `<div class="chips gutter" id="mf">${[['live', `🔴 ${T('Live')}${live ? ' ' + live : ''}`], ['upcoming', `🗓️ ${T('Upcoming')}`], ['results', `🏁 ${T('Results')}`]].map(([k, l]) => `<button class="chip ${filter === k ? 'on' : ''}" data-f="${k}">${l}</button>`).join('')}</div>
      ${leagues.length > 1 ? `<div class="chips gutter" id="ml" style="padding-top:2px"><button class="chip sm ${!st.league ? 'on' : ''}" data-l="">${T('All competitions')}</button>${leagues.map(lg => `<button class="chip sm ${st.league === lg.key ? 'on' : ''}" data-l="${lg.key}">${esc(S.lang === 'ar' ? lg.ar : lg.name)}</button>`).join('')}</div>` : ''}
      ${shown.length ? `<div class="rail gutter match-rail">${shown.slice(0, 60).map(matchCard).join('')}</div>`
        : `<p class="gutter dim">${T(!list.length ? "Couldn't load the matches — check your internet connection." : filter === 'live' ? 'No matches are being played right now. See Upcoming.' : 'Nothing here for this competition.')}</p>`}`;
    box.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { st.filter = b.dataset.f; draw(list); });
    box.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { st.league = b.dataset.l || null; draw(list); });
    box.querySelectorAll('.match').forEach(b => b.onclick = () => { const m = list.find(x => x.id === b.dataset.mid); if (m && (m.live || m.upcoming)) watchMatch(m); });
  };
  box.innerHTML = `<div class="rail gutter match-rail">${'<div class="sk match"></div>'.repeat(6)}</div>`;
  const list = await soccerMatches().catch(() => []);
  draw(list);
  // keep live scores fresh while you're on the page
  const timer = setInterval(async () => { if (!box.isConnected) return clearInterval(timer); if (document.hidden) return; draw(await soccerMatches().catch(() => list)); }, list.some(m => m.live) ? 30000 : 120000);
}

/** Live TV tab: favourites, recently watched, countries (Kuwait first), categories and your playlists — all animated. */
async function liveTvView(token) {
  const favs = (S.favs || []).map(savedToCh), recents = (S.recents || []).map(savedToCh), favSet = new Set((S.favs || []).map(x => x.url));
  const cols = [['#2563EB', '#0B1E45'], ['#9333EA', '#2A0B45'], ['#0D9488', '#052A26'], ['#EA580C', '#3A1505']];
  view.innerHTML = `<div class="sports-head tv-head"><div class="gutter"><h1>${ic('livetv')} ${T('Live TV')}</h1><p class="dim">${T('Free channels from the Gulf and the Arab world, plus your own playlists')}</p></div></div>
    ${favs.length ? sectionH('Favourites') + `<div class="rail gutter ch-rail" id="tv-fav">${favs.map((c, i) => chCard(c, i, favSet)).join('')}</div>` : ''}
    ${recents.length ? sectionH('Recently watched') + `<div class="rail gutter ch-rail" id="tv-rec">${recents.map((c, i) => chCard(c, i, favSet)).join('')}</div>` : ''}
    ${sectionH('⚽ Matches', 'Live scores, fixtures and results — tap a match to watch it')}<div id="tv-matches"></div>
    ${sectionH('Countries', 'Free channels, streamed by the broadcasters themselves')}
    <div class="rail gutter">${TV_COUNTRIES.map((c, i) => tvTile(c, i, `#/tv/free/${c.key}`, T(c.name), c.emoji, 'tv_' + c.key)).join('')}</div>
    ${sectionH('Categories', 'Arabic and Gulf channels by type')}
    <div class="rail gutter">${TV_CATS.map((c, i) => tvTile(c, i, `#/tv/free/${c.key}`, T(c.name), c.emoji, 'tv_' + c.key)).join('')}</div>
    ${sectionH('My playlists', 'Add an M3U link or an Xtream Codes login from your TV provider')}
    <div class="rail gutter">${(S.iptv || []).map((p, i) => tvTile({ c1: cols[i % 4][0], c2: cols[i % 4][1] }, i, `#/tv/src/${p.id}`, p.name, p.kind === 'xtream' ? '🔐' : '📃', 'tv_playlist',
      `<span class="tile-x" data-del="${esc(p.id)}" title="${T('Remove')}">✕</span>`)).join('')}<button class="tile add-pl" id="add-pl">${ic('plus')}<b>${T('Add playlist')}</b><small class="dim">M3U · Xtream</small></button></div>
    <p class="gutter dim small-note">${T('Free channels come from iptv-org, an open list of streams the broadcasters publish themselves. Some may be offline or blocked outside their country.')}</p>`;
  view.querySelectorAll('canvas[data-scene]').forEach(c => window.GenreScenes && GenreScenes.attach(c, c.dataset.scene, +c.dataset.i));
  mountMatches($('#tv-matches'));
  if (favs.length) bindChannels($('#tv-fav'), favs);
  if (recents.length) bindChannels($('#tv-rec'), recents);
  $('#add-pl').onclick = addPlaylistSheet;
  view.querySelectorAll('[data-del]').forEach(x => x.onclick = e => { e.preventDefault(); e.stopPropagation();
    const p = (S.iptv || []).find(q => q.id === x.dataset.del); if (!p || !confirm(`${T('Remove this playlist from your account?')}\n${p.name}`)) return;
    S.iptv = S.iptv.filter(q => q.id !== p.id); saveSettings(); liveTvView(token); });
}

/** One country / category / playlist: search, category chips, channel grid. Long-press = favourite. */
async function channelsView(kind, key, token) {
  const cat = kind === 'free' ? [...TV_COUNTRIES, ...TV_CATS].find(c => c.key === key) : null;
  const src = kind === 'src' ? (S.iptv || []).find(p => p.id === key) : null;
  if (!cat && !src) { location.replace('#/livetv'); return; }
  const c1 = cat?.c1 || '#2563EB', c2 = cat?.c2 || '#0B1E45', title = cat ? T(cat.name) : src.name, emoji = cat?.emoji || (src.kind === 'xtream' ? '🔐' : '📃');
  view.innerHTML = `<a class="icon-btn back" href="javascript:history.back()" aria-label="Back">${ic('back')}</a>
    <div class="banner" style="--c1:${c1};--c2:${c2}"><canvas id="bn-scene"></canvas><div class="ttl"><span style="font-size:42px">${emoji}</span><div><h1>${esc(title)}</h1><p id="ch-count">${T('Loading channels…')}</p></div></div></div>
    <div id="ch-tools"></div><div class="gutter"><div class="grid ch-grid" id="ch-grid">${'<div class="sk" style="aspect-ratio:16/10;border-radius:16px"></div>'.repeat(8)}</div></div>`;
  GenreScenes.attach($('#bn-scene'), cat ? 'tv_' + cat.key : 'tv_playlist', 0);
  let all;
  try { all = cat ? await freeChannels(cat) : await sourceChannels(src); }
  catch (e) { if (token === routeToken) $('#ch-grid').outerHTML = msg("Couldn't load", src && src.kind === 'xtream' ? 'This server may not allow websites to read it. Xtream logins work best in the Lumio app.' : (e.message || 'Network error'), `<button class="btn acc" onclick="route()">${T('Retry')}</button>`); return; }
  if (token !== routeToken) return;
  $('#ch-count').textContent = `${all.length} ${T('channels')}`;
  const counts = {}; all.forEach(ch => ch.groups.forEach(g => { counts[g] = (counts[g] || 0) + 1; }));
  const groups = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 40).map(e => e[0]);
  let group = null, q = '';
  $('#ch-tools').innerHTML = `${all.length > 12 ? `<div class="gutter" style="margin-top:14px"><input class="field" id="ch-q" type="search" placeholder="${T('Search channels')}"></div>` : ''}
    ${groups.length > 1 ? `<div class="gutter chips" id="ch-g"><button class="chip on" data-g="">${T('All')} ${all.length}</button>${groups.map(g => `<button class="chip" data-g="${esc(g)}">${esc(T(g))}</button>`).join('')}</div>` : ''}`;
  const draw = () => {
    const favSet = new Set((S.favs || []).map(x => x.url));
    const list = all.filter(ch => (!group || ch.groups.includes(group)) && (!q || ch.name.toLowerCase().includes(q)));
    const box = $('#ch-grid');
    box.innerHTML = list.length ? list.map((ch, i) => chCard(ch, i, favSet)).join('') : `<p class="dim">${T(q ? 'Try a different name.' : 'This list has no channels right now.')}</p>`;
    bindChannels(box, list);
  };
  $('#ch-q')?.addEventListener('input', e => { q = e.target.value.trim().toLowerCase(); draw(); });
  $('#ch-g')?.querySelectorAll('.chip').forEach(b => b.onclick = () => { $('#ch-g').querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === b)); group = b.dataset.g || null; draw(); });
  draw();
}

/** Add an M3U link or an Xtream Codes login (checked before saving; synced to all your devices). */
function addPlaylistSheet() {
  let xt = false;
  const bg = document.createElement('div'); bg.className = 'pop-bg';
  const draw = () => {
    bg.innerHTML = `<div class="pop add-pl-pop" role="dialog"><h3>${T('Add playlist')}</h3>
      <div class="seg"><button data-m="0" class="${!xt ? 'on' : ''}">M3U</button><button data-m="1" class="${xt ? 'on' : ''}">Xtream Codes</button></div>
      <input class="field" id="pl-name" placeholder="${T('Name (optional)')}">
      ${xt ? `<input class="field" id="pl-server" inputmode="url" autocapitalize="off" placeholder="${T('Server (e.g. http://line.example.com:8080)')}">
        <input class="field" id="pl-user" autocapitalize="off" placeholder="${T('Username')}"><input class="field" id="pl-pass" type="password" placeholder="${T('Password')}">`
        : `<input class="field" id="pl-url" inputmode="url" autocapitalize="off" placeholder="${T('Playlist link (.m3u / .m3u8)')}">`}
      <div class="werr" id="pl-err"></div>
      <p class="dim" style="font-size:12px">${T("Use a playlist or login from a provider you subscribe to. It's saved in your account, so it appears on all your devices.")}</p>
      <div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn tonal" id="pl-cancel">${T('Cancel')}</button><button class="btn acc" id="pl-save">${T('Add')}</button></div></div>`;
    bg.querySelectorAll('.seg button').forEach(b => b.onclick = () => { xt = b.dataset.m === '1'; draw(); });
    $('#pl-cancel', bg).onclick = () => bg.remove();
    $('#pl-save', bg).onclick = async () => {
      const err = $('#pl-err', bg), val = id => ($('#' + id, bg)?.value || '').trim();
      const src = { id: 'p' + Date.now().toString(36), kind: xt ? 'xtream' : 'm3u', url: val('pl-url'), server: val('pl-server'), username: val('pl-user'), password: val('pl-pass') };
      src.name = val('pl-name') || (xt ? src.server.replace(/^https?:\/\//, '').split(/[/:]/)[0] : T('My playlist'));
      if (xt && (!src.server || !src.username || !src.password)) { err.textContent = T('Fill in the server, username and password'); return; }
      if (!xt && !/^https?:\/\//.test(src.url)) { err.textContent = T('Paste the full playlist link (starts with http)'); return; }
      const go = $('#pl-save', bg); go.disabled = true; go.innerHTML = '<span class="mini-spin"></span>';
      // Browsers can't read most IPTV servers (http:// links on a secure site, no cross-site permission).
      // In that case we still save it — it syncs to the Lumio apps, which can read it.
      const browserBlocked = e => e instanceof TypeError || /fetch|network|load failed|cors/i.test(e.message || '');
      let note = 'Playlist added';
      try {
        if (location.protocol === 'https:' && /^http:\/\//i.test(xt ? xtBase(src) : src.url)) throw new TypeError('mixed');
        if (xt) { const info = await getJSON(xtApi(src)); if (!info?.user_info) throw new Error("That server didn't answer like an Xtream Codes server"); if (String(info.user_info.auth) !== '1') throw new Error('Wrong username or password'); }
        else if (!(await sourceChannels(src)).length) throw new Error('That link has no channels');
      } catch (e) {
        if (browserBlocked(e)) note = 'Saved — this provider only works in the Lumio app (phone / TV)';
        else {
          const m = /HTTP (52\d)/.exec(e.message || '');
          err.textContent = m ? T(`This server address is up but your provider's server behind it isn't answering (HTTP ${m[1]}). If you have an M3U link that works, add that instead — Lumio reads it as Xtream, so movies, series and the TV guide still come with it.`) : T(e.message || 'Network error');
          go.disabled = false; go.textContent = T('Add'); return;
        }
      }
      S.iptv = [...(S.iptv || []), src]; saveSettings(); bg.remove(); toast(T(note)); route();
    };
  };
  draw(); document.body.appendChild(bg);
  bg.onclick = e => { if (e.target === bg) bg.remove(); };
}

async function catalogView(kind, key, token) {
  const info = catalogInfo(kind, key);
  if (!info) { location.replace('#/home'); return; }
  if (info.service) {
    const list = await loadServices(); const s = list.find(x => x.key === key) || info.service;
    const q = `with_watch_providers=${s.ids}&with_watch_monetization_types=flatrate${s.region ? '&watch_region=' + s.region : ''}`;
    Object.assign(info, { service: s, mq: q, tq: q });
  }
  if (token !== routeToken) return;
  const sorts = info.sorts || SORTS;
  const st = { type: info.mq == null ? 'tv' : 'movie', sort: sorts[0][0], page: 0, items: [], loading: false, end: false };
  const titleHTML = info.decade ? decadeLabel(info.decade, true) : `<h1>${esc(info.service || info.studio ? info.title : T(info.title))}</h1>`;
  const subText = info.studio ? `${T('Films from')} ${info.title}` : info.decade ? (S.lang === 'ar' ? `${T('The best films of the')} ${T(info.title)}` : `The best films of the ${info.title}`) : null;
  view.innerHTML = `<a class="icon-btn back" href="javascript:history.back()" aria-label="Back">${ic('back')}</a>
    <div class="banner" style="--c1:${info.c1};--c2:${info.c2}">${info.row ? `<img class="kb" data-row="${info.row}" data-key="${key}" data-size="w1280" alt="" onload="this.classList.add('ok')"><i class="scrim"></i>` : ''}${info.franchise ? `<img class="kb" id="bn-art" data-art="${info.franchise.key}" data-size="w1280" alt="" onload="this.classList.add('ok')"><i class="scrim"></i>` : ''}${info.genre || info.scene ? `<canvas id="bn-scene" class="${info.decade ? 'era-fx' : ''}"></canvas>` : ''}${info.studio ? `<span class="slogo bn" data-art="${info.studio.key}"><i></i></span>` : ''}
      <div class="ttl">${info.service ? logoHTML(info.service, 0, 58) : (!info.genre && info.emoji ? `<span style="font-size:44px" class="emoji-b">${info.emoji}</span>` : '')}
        <div>${titleHTML}<p>${esc(subText || (info.service ? `${T('Streaming now on')} ${info.title}` : info.genre ? (S.lang === 'ar' ? `أفضل عناوين ${T(info.title)}` : info.sub) : T(info.sub)))}</p></div></div></div>
    <div class="gutter">
      ${info.mq != null && info.tq != null ? `<div class="chips" id="types"><button class="chip on" data-t="movie">${T("Movies")}</button><button class="chip" data-t="tv">${T("Shows")}</button></div>` : ''}
      ${info.sortable ? `<div class="chips" id="sorts" style="padding-top:2px">${sorts.map(([k, l], i) => `<button class="chip sm ${i ? '' : 'on'}" data-s="${k}">${T(l)}</button>`).join('')}</div>` : ''}
      <div class="grid" id="cgrid" style="padding-top:12px"></div><div id="cmore" style="height:1px"></div>
    </div>`;
  if (info.genre || info.scene) GenreScenes.attach($('#bn-scene'), info.scene || info.genre, 0);
  fillRowArt(view);
  view.querySelectorAll('.banner [data-art]').forEach(fillArt);
  const grid = $('#cgrid');
  const load = async () => {
    if (st.loading || st.end) return; st.loading = true;
    const page = st.page + 1, myType = st.type, mySort = st.sort;
    if (!st.items.length) grid.innerHTML = Array.from({ length: 12 }, () => '<div class="sk" style="aspect-ratio:2/3"></div>').join('');
    let res = [];
    try {
      const sort = sorts.find(s => s[0] === mySort);
      if (info.franchise && info.franchise.cols.length) {
        if (page === 1) {
          const all = await api.parts(info.franchise.cols), by = {
            order: (a, b) => a.release_date.localeCompare(b.release_date), new: (a, b) => b.release_date.localeCompare(a.release_date),
            top: (a, b) => (b.vote_average || 0) - (a.vote_average || 0), popular: (a, b) => (b.popularity || 0) - (a.popularity || 0) };
          res = all.sort(by[mySort] || by.order);
        }
      } else if (kind === 'discover') {
        if (key === 'foryou') res = await forYou();
        else if (key === 'trending') res = await api.trending(myType, 'week', page);
        else res = await api.list(myType, key, page);
      } else res = await api.discover(myType, (myType === 'movie' ? info.mq : info.tq) || '', myType === 'movie' ? sort[2] : sort[3], page);
    } catch (e) { res = []; }
    if (myType !== st.type || mySort !== st.sort || !grid.isConnected) return;
    st.loading = false; st.page = page;
    const seen = new Set(st.items.map(x => x.media_type + x.id));
    const fresh = res.filter(x => !seen.has(x.media_type + x.id));
    if (!st.items.length) grid.innerHTML = '';
    st.items.push(...fresh);
    grid.insertAdjacentHTML('beforeend', fresh.map((x, i) => posterCard(x, i)).join(''));
    st.end = !res.length || key === 'foryou' || page >= 40;
    if (!st.items.length) grid.innerHTML = `<div style="grid-column:1/-1">${msg('Nothing here', 'Try another type, sort, or a different region in Settings.')}</div>`;
  };
  const reset = () => { st.page = 0; st.items = []; st.end = false; st.loading = false; grid.innerHTML = ''; load(); };
  view.querySelectorAll('#types .chip').forEach(b => b.onclick = () => { view.querySelectorAll('#types .chip').forEach(x => x.classList.toggle('on', x === b)); st.type = b.dataset.t; reset(); });
  view.querySelectorAll('#sorts .chip').forEach(b => b.onclick = () => { view.querySelectorAll('#sorts .chip').forEach(x => x.classList.toggle('on', x === b)); st.sort = b.dataset.s; reset(); });
  new IntersectionObserver(es => es[0].isIntersecting && load(), { rootMargin: '900px' }).observe($('#cmore'));
  load();
}
async function forYou() {
  const seeds = LIB.slice().sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 6);
  const owned = new Set(LIB.map(e => e.type + e.id));
  const lists = await Promise.all(seeds.map(e => api.recs(e.type, e.id)));
  const mixed = [], seen = new Set();
  for (let i = 0; i < Math.max(0, ...lists.map(l => l.length)); i++) lists.forEach(l => { const x = l[i]; if (x && !seen.has(x.media_type + x.id) && !owned.has(x.media_type + x.id)) { seen.add(x.media_type + x.id); mixed.push(x); } });
  return mixed.length ? mixed : api.trending('all', 'day');
}

// ============================================================================ details
async function detailsView(type, id, token) {
  view.innerHTML = `<div class="sk" style="height:min(560px,72vh);border-radius:0"></div>`;
  if (await lockGate(type, id, token)) return;
  const d = await api.details(type, id);
  if (token !== routeToken) return;
  const e = libEntry(type, id), resume = isContinue(e) ? e : null, wide = innerWidth >= 700;
  const seasons = (d.seasons || []).filter(s => s.season_number > 0);
  let season = resume?.season || seasons[0]?.season_number || 1;
  const runtime = d.runtime || (d.episode_run_time || [])[0];
  const playLabel = resume ? (type === 'tv' ? `${T('Resume')} S${resume.season}E${resume.episode}` : T('Resume')) : type === 'tv' ? `${T('Play')} S${season}E1` : T('Play');
  const playHref = type === 'tv' ? `#/streams/tv/${id}/${resume?.season || season}/${resume?.episode || 1}` : `#/streams/movie/${id}/-/-`;
  view.innerHTML = `<a class="icon-btn back" href="javascript:history.back()" aria-label="Back">${ic('back')}</a>
    <div class="backdrop" id="d-top">${img(d.backdrop_path && IMG + (wide ? 'original' : 'w1280') + d.backdrop_path)}<div class="trailer-box" id="d-trailer"></div>
      <button class="icon-btn mute-btn" id="d-mute" hidden aria-label="${T('Sound')}">${ic('volOff')}</button>
      <div class="d-info gutter"><div class="pst">${img(d.poster_path && IMG + 'w342' + d.poster_path)}</div>
        <div style="min-width:0;max-width:640px">${titleArt(pickLogo(d.images?.logos), titleOf(d), 'd-logo')}${d.tagline ? `<div class="tag">${esc(d.tagline)}</div>` : ''}
          <div class="meta">${yearOf(d) ? `<span class="badge">${yearOf(d)}</span>` : ''}${d.vote_average ? `<span class="badge">★ ${d.vote_average.toFixed(1)}</span>` : ''}${runtime ? `<span class="badge">${Math.floor(runtime / 60) ? Math.floor(runtime / 60) + 'h ' : ''}${runtime % 60}m</span>` : ''}${type === 'tv' ? `<span class="badge">${seasons.length} ${T("Seasons")}</span>` : ''}</div>
          <div class="genres">${esc((d.genres || []).map(g => g.name).join(' • '))}</div>
          <div class="row-btns"><a class="btn white" href="${playHref}">${ic('play')}${esc(playLabel)}</a>
          <button class="icon-btn" id="wl" style="background:rgba(255,255,255,.14)" aria-label="Watchlist">${ic(e?.watch ? 'bookmark' : 'bookmarkO')}</button>
          ${bestTrailer(d.videos) ? `<button class="btn tonal" id="d-tr">${ic('movie')}${T('Trailer')}</button>` : ''}</div>
        </div></div></div>
    <p class="overview gutter">${esc(d.overview)}</p>
    ${type === 'tv' ? `<div class="chips gutter" id="seasons">${seasons.map(s => `<button class="chip ${s.season_number === season ? 'on' : ''}" data-n="${s.season_number}">${esc(s.name)}</button>`).join('')}</div><div class="eps gutter" id="eps"></div>` : ''}
    ${(d.credits?.cast || []).length ? `<div class="rail-title gutter">${T("Cast")}</div><div class="rail gutter">${d.credits.cast.slice(0, 20).map(c => `<div class="cast" role="link" tabindex="0" onclick="location.hash='#/person/${c.id}'">${c.profile_path ? `<img src="${IMG}w185${c.profile_path}" alt="" loading="lazy">` : '<div class="ph"></div>'}<span>${esc(c.name)}</span><span class="dim">${esc(c.character || '')}</span></div>`).join('')}</div>` : ''}`;
  // The trailer starts by itself over the artwork (muted unless Settings → Appearance says sound; tap 🔇 for sound)
  const trKey = bestTrailer(d.videos);
  if (trKey) $('#d-tr').onclick = () => { detailTrailer?.stop(); $('#d-mute').hidden = true; trailerOverlay(trKey); };
  let detailTrailer = null;
  if (trKey && S.trailers !== 'off') setTimeout(() => {
    const box = $('#d-trailer'); if (!box || token !== routeToken) return;
    // Browsers only allow sound after you've clicked something on the page, which you have to get here
    let muted = S.trailers === 'muted' || !navigator.userActivation?.hasBeenActive;
    const mb = $('#d-mute');
    detailTrailer = mountTrailer(box, trKey, { muted,
      onPlay: () => { mb.hidden = false; box.classList.add('on'); },
      onFail: () => { mb.hidden = true; }, onEnd: () => { mb.hidden = true; box.classList.remove('on'); detailTrailer?.stop(); } });
    mb.innerHTML = ic(muted ? 'volOff' : 'volOn');
    mb.onclick = () => { muted = !muted; detailTrailer.cmd(muted ? 'mute' : 'unMute'); if (!muted) detailTrailer.cmd('setVolume', [100]); mb.innerHTML = ic(muted ? 'volOff' : 'volOn'); };
  }, 1200);
  $('#wl').onclick = () => {
    updateLib(type, id, cur => Object.assign(cur || { type, id, title: titleOf(d), poster: d.poster_path, backdrop: d.backdrop_path, pos: 0, dur: 0 }, { watch: !(cur && cur.watch) }));
    const on = libEntry(type, id)?.watch; $('#wl').innerHTML = ic(on ? 'bookmark' : 'bookmarkO'); toast(on ? 'Added to Watchlist' : 'Removed from Watchlist');
  };
  if (type === 'tv') {
    const showSeason = async n => {
      season = n; view.querySelectorAll('#seasons .chip').forEach(c => c.classList.toggle('on', +c.dataset.n === n));
      const box = $('#eps'); box.innerHTML = '<div class="sk" style="height:96px"></div><div class="sk" style="height:96px"></div>';
      const eps = await api.season(id, n).catch(() => []);
      if (!box.isConnected || season !== n) return;
      const le = libEntry(type, id);
      box.innerHTML = eps.map((ep, i) => {
        const p = le && le.season === ep.season_number && le.episode === ep.episode_number ? progressOf(le) : 0;
        return `<a class="ep fly" style="animation-delay:${i * 30}ms" href="#/streams/tv/${id}/${ep.season_number}/${ep.episode_number}"><div class="still">${img(ep.still_path && IMG + 'w300' + ep.still_path)}${p ? `<span class="prog" style="width:${p * 100}%"></span>` : ''}</div><div><b>${ep.episode_number}. ${esc(ep.name)}</b>${ep.runtime ? `<small class="dim">${ep.runtime}m</small>` : ''}<p>${esc(ep.overview || '')}</p></div></a>`;
      }).join('');
    };
    view.querySelectorAll('#seasons .chip').forEach(c => c.onclick = () => showSeason(+c.dataset.n));
    showSeason(season);
  }
}

// ============================================================================ streams
async function streamsView(type, id, season, episode, token) {
  if (await lockGate(type, id, token)) return;
  const d = await api.details(type, id);
  if (token !== routeToken) return;
  const imdb = d.imdb_id || d.external_ids?.imdb_id;
  const meta = [(d.genres || []).slice(0, 2).map(g => T(g.name)).join(' • '), yearOf(d)].filter(Boolean).join('  •  ');
  // Premium two-pane (wide screens): the title's artwork and logo on the left, compact sources on the right
  view.innerHTML = `<a class="icon-btn back" href="javascript:history.back()" aria-label="Back">${ic('back')}</a>
    <div class="src-page"><div class="src-bg">${img(d.backdrop_path && IMG + (innerWidth >= 900 ? 'original' : 'w1280') + d.backdrop_path)}</div>
      <div class="src-head gutter">${titleArt(pickLogo(d.images?.logos), titleOf(d), 's-logo')}
        ${meta ? `<div class="src-meta">${esc(meta)}</div>` : ''}${season != null ? `<div class="dim">${T('Season')} ${season} • ${T('Episode')} ${episode}</div>` : ''}
        <div class="row-btns" style="padding-top:14px"><button class="btn outline" id="purl">${ic('link')}${T("Play link")}</button>
          <label class="btn outline" style="cursor:pointer">${ic('folder')}${T("Local file")}<input type="file" accept="video/*" id="pfile" hidden></label></div></div>
      <div class="src-list gutter"><div class="chips" id="sfil"></div><div class="list" id="slist">${Array.from({ length: 6 }, () => '<div class="sk" style="height:84px;border-radius:16px"></div>').join('')}</div></div></div>`;
  const play = (url, extra = {}) => startPlayer(Object.assign({ url, title: titleOf(d), subtitle: season != null ? `S${season} • E${episode}` : yearOf(d), type, id, imdb, season, episode, poster: d.poster_path, backdrop: d.backdrop_path }, extra));
  $('#purl').onclick = () => promptSheet('Play a link', 'https://…/video.m3u8 or .mp4', url => play(url));
  $('#pfile').onchange = e => { const f = e.target.files[0]; if (f) play(URL.createObjectURL(f), { title: f.name, local: true }); };
  const list = $('#slist');
  if (!S.addons.some(a => supports(a, 'stream'))) { list.innerHTML = msg('No stream addon installed yet', 'Add one in Settings → Stream addons, or play a link / file above.', `<a class="btn acc" href="#/settings">${T("Open Settings")}</a>`); return; }
  if (!imdb) { list.innerHTML = msg('No streams', "This title has no IMDb id, so addons can't look it up."); return; }
  const streams = await getStreams(type, imdb, season, episode);
  if (!list.isConnected) return;
  if (!streams.length) { list.innerHTML = msg('No streams', 'Your addons returned no streams for this title.'); return; }
  let filter = 'All';
  const filters = ['All', ...new Set(streams.map(s => s.addon)), ...new Set(streams.map(s => s.q).filter(Boolean)),
    ...(streams.some(s => s.h === 'Dolby Vision') ? ['Dolby Vision'] : []), ...(streams.some(s => s.a === 'Dolby Atmos') ? ['Atmos'] : [])];
  const tag = (t, cls = '') => `<span class="stag ${cls}">${esc(T(t))}</span>`;
  const card = (s, i) => {
    const n = srcInfo(s);
    const line = [n.codec, n.channels && `${n.channels} ch`, n.multi && T('Multi audio'), n.seeds && `${n.seeds} ${T('seeds')}`].filter(Boolean).join('  ·  ');
    const mkv = /\.(mkv|avi)(\?|$)/i.test(s.url) || /\bmkv\b/i.test(s.details);
    return `<button class="source fly" style="animation-delay:${Math.min(i, 10) * 25}ms" data-i="${streams.indexOf(s)}">
      <div class="s-top">${n.instant ? '<span class="s-bolt">⚡</span>' : ''}<span class="s-tags">${s.q ? tag(s.q, 'q') : ''}${s.h ? tag(s.h, 'hdr') : ''}${s.a ? tag(s.a, 'aud') : ''}${n.source ? tag(n.source, n.source === 'Remux' ? 'rmx' : '') : ''}</span>${n.size ? `<b class="s-size">${esc(n.size)}</b>` : ''}</div>
      <div class="s-line"><span>${esc(line || s.label)}</span>${n.flags.length ? `<span class="s-flags">${n.flags.slice(0, 5).join(' ')}${n.flags.length > 5 ? ` +${n.flags.length - 5}` : ''}</span>` : ''}</div>
      <div class="s-from">${esc([s.addon, n.site].filter(Boolean).join('  ·  '))}${n.file ? `<span>${esc(n.file)}</span>` : ''}</div>
      ${mkv ? `<div class="warn">${T('MKV file: Safari may not play it. Use “Open in…” in the player for Infuse or VLC.')}</div>` : ''}</button>`;
  };
  const draw = () => {
    $('#sfil').innerHTML = filters.map(f => `<button class="chip sm ${f === filter ? 'on' : ''}">${esc(T(f))}</button>`).join('');
    $('#sfil').querySelectorAll('.chip').forEach((b, i) => b.onclick = () => { filter = filters[i]; draw(); });
    const shown = streams.filter(s => filter === 'All' || (filter === 'Dolby Vision' ? s.h === filter : filter === 'Atmos' ? s.a === 'Dolby Atmos' : s.addon === filter || s.q === filter));
    list.innerHTML = shown.map(card).join('');
    list.querySelectorAll('.source').forEach(b => b.onclick = () => { const s = streams[+b.dataset.i]; play(s.url, { addon: s.addon }); });
  };
  draw();
}

// ============================================================================ sheets
function closeSheet() { $('#sheet-root').innerHTML = ''; }
function sheet(title, opts, extraHTML = '') {
  const root = $('#sheet-root');
  root.innerHTML = `<div class="sheet-bg"></div><div class="sheet" role="dialog" aria-label="${esc(T(title))}"><div class="grab"></div><h3>${esc(T(title))}</h3>
    ${opts.map((o, i) => `<button class="opt ${o.on ? 'on' : ''}" data-i="${i}">${o.icon ? ic(o.icon) : ''}<div>${esc(T(o.t))}${o.s ? `<small>${esc(T(o.s))}</small>` : ''}</div>${o.on ? `<span class="chk">${ic('check', 'width="20" height="20"')}</span>` : ''}</button>`).join('')}${extraHTML}</div>`;
  $('.sheet-bg', root).onclick = closeSheet;
  root.querySelectorAll('.opt').forEach(b => b.onclick = () => { const o = opts[+b.dataset.i]; if (o.keep !== true) closeSheet(); o.fn && o.fn(); });
  return root;
}
function promptSheet(title, placeholder, onOk) {
  const root = sheet(title, [], `<form class="pad" id="pf"><input class="field" id="pv" type="url" placeholder="${esc(placeholder)}" autocomplete="off" required><button class="btn acc" type="submit">${T("OK")}</button></form>`);
  const f = $('#pf', root); setTimeout(() => $('#pv', root).focus(), 50);
  f.onsubmit = e => { e.preventDefault(); const v = $('#pv', root).value.trim(); closeSheet(); if (v) onOk(v); };
}

// ============================================================================ player
const PLAYER = { req: null, el: null, v: null };
function srtToVtt(t) {
  t = t.replace(/\r/g, '').replace(/^﻿/, '');
  if (/^WEBVTT/.test(t)) return t;
  return 'WEBVTT\n\n' + t.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2').replace(/^\d+\n(?=\d{2}:\d{2})/gm, '');
}
function assToVtt(t) {
  const out = ['WEBVTT', ''];
  const tm = s => { const [h, m, rest] = s.trim().split(':'); const [sec, cs = '0'] = rest.split('.'); return `${h.padStart(2, '0')}:${m}:${sec.padStart(2, '0')}.${(cs + '00').slice(0, 3)}`; };
  t.replace(/\r/g, '').split('\n').forEach(l => {
    if (!l.startsWith('Dialogue:')) return;
    const p = l.slice(9).split(','); if (p.length < 10) return;
    out.push(`${tm(p[1])} --> ${tm(p[2])}`, p.slice(9).join(',').replace(/\{[^}]*\}/g, '').replace(/\\N/gi, '\n'), '');
  });
  return out.join('\n');
}
const titleKey = r => r.type && r.id ? (r.season != null ? `${r.type}-${r.id}-s${r.season}e${r.episode}` : `${r.type}-${r.id}`) : null;
function parseFilter(text) {
  const out = [], lines = text.replace(/\r/g, '').split('\n');
  const tm = s => { const m = s.trim().match(/(?:(\d{1,2}):)?(\d{1,2}):(\d{2})[.,](\d{1,3})/); return m ? ((+(m[1] || 0)) * 3600 + +m[2] * 60 + +m[3]) * 1000 + +m[4].padEnd(3, '0') : null; };
  if (lines.some(l => l.includes('-->'))) {
    lines.forEach((l, i) => {
      if (!l.includes('-->')) return;
      const [a, b] = l.split('-->'); const s = tm(a), e = tm(b);
      let body = ''; for (let j = i + 1; j < lines.length && lines[j].trim(); j++) body += lines[j].toLowerCase() + ' ';
      if (s != null && e > s && (/nudity|sex|nude/.test(body) || !body.trim())) out.push({ kind: 'nudity', start: s, end: e, source: 'Filter file' });
    });
  } else lines.forEach(l => { const p = l.trim().split(/\s+/); const s = parseFloat(p[0]), e = parseFloat(p[1]), a = p[2] == null ? 0 : parseInt(p[2]); if (e > s && (a === 0 || a === 3)) out.push({ kind: 'nudity', start: s * 1000, end: e * 1000, source: 'Filter file' }); });
  return out.sort((a, b) => a.start - b.start);
}
const segLabel = k => ({ intro: 'Skip Intro', recap: 'Skip Recap', credits: 'Skip Credits', preview: 'Skip Preview' }[k] || 'Skip Scene');

function startPlayer(req) {
  const e = libEntry(req.type, req.id);
  req.start = e && e.season == req.season && e.episode == req.episode && isContinue(e) ? e.pos : 0;
  PLAYER.req = req;
  if (location.hash !== '#/play') location.hash = '#/play';
  openPlayer();
}
function closePlayer(fromRoute, skipSave) {
  if (!PLAYER.el) return;
  if (!skipSave) saveProgress();
  try { PLAYER.hls?.destroy(); PLAYER.hls = null; PLAYER.v.pause(); PLAYER.v.removeAttribute('src'); PLAYER.v.load(); } catch { /* ignore */ }
  clearInterval(PLAYER.saveT); clearInterval(PLAYER.partyT);
  PLAYER.el.remove(); PLAYER.el = null; PLAYER.v = null;
  if (isCtl()) pPublish();   // host closed the player → party pauses
  setTimeout(pPill, 0);
  document.body.style.overflow = '';
  if (!fromRoute && location.hash === '#/play') history.back();
}
function saveProgress() {
  const r = PLAYER.req, v = PLAYER.v; if (!r || !v || !r.id || r.local || !isFinite(v.duration) || !v.duration) return;
  updateLib(r.type, r.id, cur => Object.assign(cur || { type: r.type, id: r.id, title: r.title, poster: r.poster, backdrop: r.backdrop }, { pos: v.currentTime * 1000, dur: v.duration * 1000, season: r.season, episode: r.episode, url: r.url, imdb: r.imdb || (cur && cur.imdb), addon: r.addon || (cur && cur.addon) }));
}
function openPlayer() {
  if (PLAYER.el) closePlayer(true, true); // switching episode: progress already saved
  const r = PLAYER.req;
  const el = document.createElement('div'); el.className = 'player';
  const live = r.type === 'live';
  const zap = live && PLAYER.channels && PLAYER.channels.length > 1;
  // Clean, Nuvio-style: back on the left and a few icons on the right; a small smoked-glass play button in the
  // middle (a light ring turns around it while loading); title, guide line, seek bar and buttons along the bottom.
  el.innerHTML = `<video playsinline webkit-playsinline preload="auto" x-webkit-airplay="allow"></video>
    <div class="spinner" id="spin"></div>
    <div class="p-ui" id="pui">
      <div class="p-top"><button class="p-ic" id="pclose" aria-label="${T('Back')}">${ic('back')}</button><span class="p-sp"></span>
        ${r.id && !r.local && !live ? `<button class="p-ic pparty" id="pparty" aria-label="${T('Watch party')}">${ic('group')}</button>` : ''}<button class="p-ic" id="pair" aria-label="AirPlay">${ic('airplay')}</button><button class="p-ic" id="ppip" aria-label="Picture in picture">${ic('pip')}</button></div>
      <div class="p-mid">${zap ? `<button class="p-ic big" id="prew" aria-label="${T('Previous channel')}">${ic('prevT')}</button>` : live ? '<span class="p-gap"></span>' : `<button class="p-ic big" id="prew" aria-label="Back 10 seconds">${ic10('rew')}</button>`}
        <div class="p-pwrap"><button class="p-play" id="ppp" aria-label="Play or pause">${ic('play')}</button><i class="p-ring" id="pring"></i></div>
        ${zap ? `<button class="p-ic big" id="pfwd" aria-label="${T('Next channel')}">${ic('next')}</button>` : live ? '<span class="p-gap"></span>' : `<button class="p-ic big" id="pfwd" aria-label="Forward 10 seconds">${ic10('fwd')}</button>`}</div>
      <div class="p-bot">
        <div class="p-title">${live ? `<span class="p-live">${T('LIVE')}</span>` : ''}<b>${esc(r.title)}</b></div>
        <div class="p-meta" id="pmeta">${esc(r.subtitle || '')}</div><div class="p-next" id="pnext"></div>
        ${live ? '<div class="p-prog" id="pprog" hidden><i></i></div>' : `<div class="p-seek" id="seek"><div class="tr"><div class="buf" id="sbuf"></div><div class="cur" id="scur"></div></div><div class="th" id="sth"></div></div>`}
        <div class="p-row"><div class="p-btns"><button id="bsub">${ic('subs')}<span>${T("Subtitles")}</span></button><button id="baud">${ic('audio')}<span>${T("Audio")}</span></button>${live ? '' : `<button id="bspd">${ic('speed')}<span>${T("Speed")}</span></button>`}
          <button id="bsize">${ic('aspect')}<span>${T("Size")}</span></button>${live ? '' : `<button id="bscn">${ic('eyeOff')}<span>${T("Scenes")}</span></button>`}<button id="bopen">${ic('open')}<span>${T("Open in…")}</span></button><button id="bfull">${ic('full')}<span>${T("Full screen")}</span></button></div>
          <span class="p-clock" id="ptime">${live ? '' : '0:00 / 0:00'}</span></div></div>
    </div>`;
  document.body.appendChild(el); document.body.style.overflow = 'hidden';
  const v = $('video', el); PLAYER.el = el; PLAYER.v = v;
  const ui = $('#pui', el), spin = $('#spin', el);
  const st = { segs: [], filters: store.get('filters', {})[titleKey(r)] || [], handled: new Set(), markStart: null, size: 0, subs: [] };
  PLAYER.st = st;

  if (/\.m3u8(\?|$)/i.test(r.url) && !v.canPlayType('application/vnd.apple.mpegurl') && window.Hls && Hls.isSupported()) {
    PLAYER.hls = new Hls(); PLAYER.hls.loadSource(r.url); PLAYER.hls.attachMedia(v);
  } else v.src = r.url;
  v.addEventListener('loadedmetadata', () => {
    if (r.start) v.currentTime = r.start / 1000;
    if (r.id && !r.local) introSegments(r.type, r.id, r.season, r.episode, v.duration * 1000).then(s => { st.segs = s; st.introLoaded = true; });
    else st.introLoaded = true;
  }, { once: true });
  v.play().catch(() => { /* user taps play */ });

  // ---- controls visibility
  let hideT;
  const showUI = () => { ui.classList.remove('off'); clearTimeout(hideT); hideT = setTimeout(() => { if (!v.paused && !$('.sheet')) ui.classList.add('off'); }, 3800); };
  showUI();
  const setPP = () => { $('#ppp', el).innerHTML = ic(v.paused ? 'play' : 'pause'); };
  v.addEventListener('play', () => { setPP(); showUI(); pLocal('play'); });
  v.addEventListener('pause', () => { setPP(); ui.classList.remove('off'); saveProgress(); pLocal('pause'); });
  v.addEventListener('seeked', () => pLocal('seek'));
  v.addEventListener('waiting', () => { PLAYER.waitingSince = performance.now(); if (isCtl()) setTimeout(() => { if (PLAYER.waitingSince && PLAYER.v === v) pPublish(); }, 1100); });
  v.addEventListener('playing', () => { const was = PLAYER.waitingSince; PLAYER.waitingSince = 0; if (was && isCtl()) pPublish(); });
  PARTY.ourSeeks = r.start ? 1 : 0;   // the start position jump is ours too
  v.addEventListener('canplay', () => { if (isCtl()) pPublish(); }, { once: true });
  $('#pparty', el)?.addEventListener('click', e => { e.stopPropagation(); partySheet(); });
  PLAYER.partyT = setInterval(() => { if (PLAYER.v === v) pSync(); }, 500);
  if (isCtl()) setTimeout(pPublish, 300);
  setTimeout(pRender, 0);
  const loading = on => { el.classList.toggle('loading', on); };
  loading(true);
  v.addEventListener('waiting', () => loading(true));
  v.addEventListener('seeking', () => loading(true));
  v.addEventListener('playing', () => loading(false));
  v.addEventListener('canplay', () => { if (!v.paused || v.readyState >= 3) loading(false); });
  v.addEventListener('pause', () => loading(false));
  v.addEventListener('ended', onEnded);
  v.addEventListener('error', () => {
    const mkv = /\.(mkv|avi)(\?|$)/i.test(r.url);
    const box = document.createElement('div'); box.className = 'p-err';
    box.innerHTML = `<div><h3>Can't play this here</h3><p class="dim">${mkv ? "Safari can't play MKV files. Open it in Infuse or VLC instead (both free on the App Store)." : 'This source failed to load in Safari. Try another source, or open it in another player.'}</p>
      <div class="row-btns" style="justify-content:center"><button class="btn white" id="eopen">${ic('open')}${T("Open in…")}</button><button class="btn tonal" id="eclose">${T("Close")}</button></div></div>`;
    el.appendChild(box); loading(false);
    $('#eopen', box).onclick = openIn; $('#eclose', box).onclick = () => closePlayer();
  });

  // ---- buttons
  $('#pclose', el).onclick = () => closePlayer();
  $('#ppp', el).onclick = e => { e.stopPropagation(); v.paused ? v.play() : v.pause(); };
  const seekBy = s => { v.currentTime = Math.max(0, Math.min((v.duration || 0) - .5, v.currentTime + s)); flash(s); showUI(); };
  const zapBy = n => { const list = PLAYER.channels, i = (PLAYER.chIndex + n + list.length) % list.length; playChannel(list, i); };
  $('#prew', el) && ($('#prew', el).onclick = e => { e.stopPropagation(); zap ? zapBy(-1) : seekBy(-10); });
  $('#pfwd', el) && ($('#pfwd', el).onclick = e => { e.stopPropagation(); zap ? zapBy(1) : seekBy(10); });
  $('#pair', el).onclick = () => v.webkitShowPlaybackTargetPicker ? v.webkitShowPlaybackTargetPicker() : toast('AirPlay is available in Safari on iPhone');
  $('#ppip', el).onclick = async () => {
    try { if (v.webkitSupportsPresentationMode && v.webkitSupportsPresentationMode('picture-in-picture')) v.webkitSetPresentationMode(v.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture'); else if (document.pictureInPictureEnabled) await v.requestPictureInPicture(); else toast('Picture in Picture is not available here'); } catch { toast('Picture in Picture is not available here'); }
  };
  $('#bfull', el).onclick = () => { if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); else (el.requestFullscreen ? el.requestFullscreen() : null)?.catch?.(() => {}); };
  $('#bspd', el) && ($('#bspd', el).onclick = () => sheet('Playback speed', [.5, .75, 1, 1.25, 1.5, 1.75, 2].map(x => ({ t: x === 1 ? 'Normal' : x + 'x', on: v.playbackRate === x, fn: () => v.playbackRate = x }))));
  $('#bsize', el).onclick = () => sheet('Video size', [['Fit', 'Whole picture', ''], ['Zoom / Crop', 'Fills the screen', 'zoom'], ['Stretch', 'Fills screen, distorts picture', 'fill']].map(([t, s, c]) => ({ t, s, on: el.classList.contains(c) || (!c && !el.classList.contains('zoom') && !el.classList.contains('fill')), fn: () => { el.classList.remove('zoom', 'fill'); c && el.classList.add(c); } })));
  $('#baud', el).onclick = () => {
    const at = v.audioTracks;
    if (!at || at.length < 2) return sheet('Audio', [{ t: 'Default audio track', s: at && at.length === 1 ? (at[0].label || langName(at[0].language) || 'Track 1') : 'Only one audio track in this stream', on: true }]);
    sheet('Audio', Array.from(at).map((t, i) => ({ t: t.label || langName(t.language) || `Track ${i + 1}`, s: langName(t.language) || '', on: t.enabled, fn: () => { for (let j = 0; j < at.length; j++) at[j].enabled = j === i; } })));
  };
  $('#bsub', el).onclick = subtitlesSheet;
  $('#bscn', el) && ($('#bscn', el).onclick = scenesSheet);
  $('#bopen', el).onclick = openIn;

  function openIn() {
    if (r.local) return toast('Local files can only play here');
    const u = encodeURIComponent(r.url);
    sheet('Open in another player', [
      { t: 'Infuse', s: 'Best for MKV, Dolby Vision & Atmos', icon: 'open', fn: () => location.href = `infuse://x-callback-url/play?url=${u}` },
      { t: 'VLC', s: 'Plays almost anything', icon: 'open', fn: () => location.href = `vlc-x-callback://x-callback-url/stream?url=${u}` },
      { t: 'Outplayer', icon: 'open', fn: () => location.href = `outplayer://${r.url}` },
      { t: 'Copy link', icon: 'link', fn: () => navigator.clipboard?.writeText(r.url).then(() => toast('Link copied'), () => toast("Couldn't copy")) },
    ]);
  }

  // ---- subtitles
  function addTrack(vttText, label, lang, select = true) {
    if (!PLAYER.el || PLAYER.el !== el) return;
    const url = URL.createObjectURL(new Blob([vttText], { type: 'text/vtt' }));
    const tr = document.createElement('track'); tr.kind = 'subtitles'; tr.label = label; tr.srclang = lang || 'und'; tr.src = url;
    v.appendChild(tr);
    setTimeout(() => { if (select) selectText(v.textTracks.length - 1); }, 60);
    toast('Added subtitle: ' + label);
  }
  function selectText(idx) { for (let i = 0; i < v.textTracks.length; i++) v.textTracks[i].mode = i === idx ? 'showing' : 'disabled'; }
  async function addFromText(text, name, lang) { const vtt = /\.(ass|ssa)$/i.test(name) || /^\[Script Info\]/m.test(text) ? assToVtt(text) : srtToVtt(text); addTrack(vtt, name, lang); }
  function subtitlesSheet() {
    const tt = Array.from(v.textTracks).filter(t => t.kind === 'subtitles' || t.kind === 'captions');
    const opts = [{ t: 'Off', icon: 'close', on: tt.every(t => t.mode !== 'showing'), fn: () => selectText(-1) }];
    Array.from(v.textTracks).forEach((t, i) => { if (t.kind === 'subtitles' || t.kind === 'captions') opts.push({ t: t.label || langName(t.language) || `Track ${i + 1}`, s: langName(t.language) || '', on: t.mode === 'showing', fn: () => selectText(i) }); });
    opts.push({ t: 'Import subtitle file…', s: '.srt  .vtt  .ass  .ssa', icon: 'folder', fn: () => pickFile('.srt,.vtt,.ass,.ssa,.txt,text/*', f => f.text().then(t => addFromText(t, f.name, 'und'))) });
    opts.push({ t: 'Load subtitle from URL…', icon: 'link', fn: () => promptSheet('Subtitle URL', 'https://…/subtitle.srt', u => fetch(u).then(x => x.text()).then(t => addFromText(t, u.split('/').pop().split('?')[0] || 'Subtitle', 'und')).catch(() => toast("Couldn't load that subtitle (the site may block it)"))) });
    if (r.imdb) opts.push({ t: 'Search online subtitles', s: 'From your installed addons', icon: 'search', fn: onlineSubs });
    opts.push({ t: `${T('Subtitle size')}: ${Math.round(S.subScale * 100)}%`, s: 'Tap to cycle', icon: 'subs', keep: true, fn: () => { S.subScale = S.subScale >= 2 ? .6 : Math.round((S.subScale + .2) * 10) / 10; saveSettings(); subtitlesSheet(); } });
    sheet('Subtitles', opts);
  }
  async function onlineSubs() {
    sheet('Online subtitles', [{ t: 'Searching…' }]);
    const list = await getSubtitles(r.type, r.imdb, r.season, r.episode);
    const pref = (S.subLang || 'ar').slice(0, 2);
    list.sort((a, b) => (String(b.lang).startsWith(pref) ? 1 : 0) - (String(a.lang).startsWith(pref) ? 1 : 0));
    if (!list.length) return sheet('Online subtitles', [{ t: 'No subtitles found', s: 'Install a subtitles addon in Settings' }]);
    sheet('Online subtitles', list.slice(0, 60).map((s, i) => ({ t: `${langName(s.lang) || s.lang} #${i + 1}`, s: s.id || '', fn: () => fetch(s.url).then(x => x.text()).then(t => addFromText(t, `${langName(s.lang) || s.lang} #${i + 1}`, s.lang)).catch(() => toast("Couldn't load that subtitle")) })));
  }

  // ---- scenes (skip intro / nudity filters)
  const saveFilters = list => { st.filters = list.sort((a, b) => a.start - b.start); const k = titleKey(r); if (!k) return toast('Filters are saved only for catalog titles'); const all = store.get('filters', {}); if (list.length) all[k] = st.filters; else delete all[k]; store.set('filters', all); };
  function scenesSheet() {
    const opts = [
      { t: 'Auto-skip nudity scenes', s: S.skipNudity ? 'On – uses filter files and scenes you mark' : 'Off', icon: 'eyeOff', on: S.skipNudity, keep: true, fn: () => { S.skipNudity = !S.skipNudity; saveSettings(); scenesSheet(); } },
      st.markStart == null
        ? { t: 'Mark scene start', s: 'Now at ' + fmt(v.currentTime * 1000), icon: 'flag', fn: () => { st.markStart = v.currentTime * 1000; drawMark(); toast('Scene start marked'); } }
        : { t: 'Set scene end', s: 'Started at ' + fmt(st.markStart), icon: 'flag', fn: markEnd },
      { t: 'Import filter file…', s: 'EDL (.edl) or MovieContentFilter (.mcf)', icon: 'folder', fn: () => pickFile('.edl,.mcf,.txt,.vtt,text/*', f => f.text().then(importFilter)) },
      { t: 'Load filter from URL…', icon: 'link', fn: () => promptSheet('Filter file URL', 'https://…/movie.edl', u => fetch(u).then(x => x.text()).then(importFilter).catch(() => toast("Couldn't load that filter file"))) },
      { t: 'Intro & recap data', s: !st.introLoaded ? 'Looking up TheIntroDB…' : st.segs.length ? st.segs.map(s => s.kind + ' ' + fmt(s.start)).join(', ') : 'Not available for this title yet', icon: 'ffwd' },
    ];
    if (!st.filters.length) opts.push({ t: 'No scenes to skip yet', s: 'Mark one or import a filter file' });
    st.filters.forEach(f => opts.push({ t: `${fmt(f.start)} – ${fmt(f.end)}`, s: `${f.source} • tap to remove`, icon: 'del', fn: () => { saveFilters(st.filters.filter(x => x !== f)); toast('Scene removed'); } }));
    sheet('Skip scenes', opts);
  }
  function importFilter(text) { const p = parseFilter(text); if (!p.length) return toast('No nudity scenes found in that file'); saveFilters([...st.filters, ...p]); toast(`Loaded ${p.length} scenes to skip`); }
  function markEnd() {
    const s = st.markStart, e = v.currentTime * 1000; st.markStart = null; drawMark();
    if (s == null || e - s < 500) return toast('Scene too short');
    saveFilters([...st.filters, { kind: 'custom', start: s, end: e, source: 'Marked by you' }]); toast('Scene saved – it will be skipped from now on');
  }
  function drawMark() {
    $('.mark-chip', el)?.remove();
    if (st.markStart == null) return;
    const c = document.createElement('div'); c.className = 'mark-chip';
    c.innerHTML = `<i></i>Marking from ${fmt(st.markStart)}<button id="mend">${T("Set end")}</button><button id="mx" aria-label="Cancel">${ic('close', 'width="18" height="18"')}</button>`;
    el.appendChild(c); $('#mend', c).onclick = markEnd; $('#mx', c).onclick = () => { st.markStart = null; drawMark(); };
  }
  let pill = null;
  function showPill(seg) {
    if (pill && pill._seg === seg) return;
    pill?.remove(); pill = null; if (!seg) return;
    const nextEp = (seg.kind === 'credits' || seg.kind === 'preview') && r.type === 'tv' && S.autoNext;
    pill = document.createElement('button'); pill.className = 'skip-pill'; pill._seg = seg;
    pill.innerHTML = `${ic(nextEp ? 'next' : 'ffwd')}${nextEp ? 'Next Episode' : segLabel(seg.kind)}`;
    pill.onclick = e => { e.stopPropagation(); skipSeg(seg); };
    el.appendChild(pill);
  }
  function skipSeg(seg) {
    st.handled.add(seg); showPill(null);
    const dur = v.duration * 1000;
    if ((seg.kind === 'credits' || seg.kind === 'preview') && r.type === 'tv' && S.autoNext && (seg.end == null || seg.end >= dur - 5000)) return playNext();
    v.currentTime = Math.min(dur, seg.end ?? dur) / 1000;
  }
  v.addEventListener('timeupdate', () => {
    const pos = v.currentTime * 1000, dur = v.duration * 1000; if (!dur) return;
    if (PARTY.code && !isCtl() && !PARTY.detached) return showPill(null);   // in a party, the one in control skips
    const f = st.filters.find(f => (S.skipNudity || f.kind === 'custom') && pos >= f.start && pos < f.end - 300);
    if (f) { v.currentTime = f.end / 1000; toast('Scene skipped'); return; }
    const seg = st.segs.find(s => pos >= s.start && pos < (s.end ?? dur) - 300);
    const mode = seg ? (seg.kind === 'intro' ? S.skipIntro : seg.kind === 'recap' ? S.skipRecap : S.skipCredits) : 'off';
    if (!seg || mode === 'off') return showPill(null);
    if (mode === 'auto' && !st.handled.has(seg)) { skipSeg(seg); toast(segLabel(seg.kind).replace('Skip', 'Skipped')); return; }
    showPill(seg);
  });

  // ---- next episode
  async function onEnded() {
    saveProgress();
    if (r.type === 'tv' && S.autoNext && r.imdb && r.season != null) playNext(); else closePlayer();
  }
  async function playNext() {
    toast('Loading next episode…');
    const next = r.episode + 1;
    const streams = await getStreams('tv', r.imdb, r.season, next).catch(() => []);
    const pick = streams.find(s => s.addon === r.addon) || streams[0];
    if (!pick) { toast('No stream found for the next episode'); return closePlayer(); }
    saveProgress();
    PLAYER.req = Object.assign({}, r, { url: pick.url, addon: pick.addon, episode: next, subtitle: `S${r.season} • E${next}`, start: 0 });
    openPlayer();
  }

  // ---- seek bar
  const timeEl = $('#ptime', el);
  if (live) {
    const clock = () => { if (PLAYER.el !== el) return clearInterval(ct); timeEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); };
    const ct = setInterval(clock, 15000); clock();
    liveGuide(r.url, el);
  } else {
  const seek = $('#seek', el), scur = $('#scur', el), sbuf = $('#sbuf', el), sth = $('#sth', el);
  let scrubbing = false;
  const paint = frac => { scur.style.width = frac * 100 + '%'; sth.style.left = frac * 100 + '%'; };
  const tick = () => {
    if (!PLAYER.el || PLAYER.el !== el) return;
    const d = isFinite(v.duration) ? v.duration : 0;
    if (!scrubbing && d) { paint(v.currentTime / d); timeEl.textContent = `${fmt(v.currentTime * 1000)} / ${fmt(d * 1000)}`; }
    if (d && v.buffered.length) sbuf.style.width = (v.buffered.end(v.buffered.length - 1) / d) * 100 + '%';
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  const fracAt = e => { const b = seek.getBoundingClientRect(); return Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)); };
  seek.addEventListener('pointerdown', e => { e.stopPropagation(); scrubbing = true; seek.setPointerCapture(e.pointerId); paint(fracAt(e)); showUI(); });
  seek.addEventListener('pointermove', e => { if (!scrubbing) return; const f = fracAt(e); paint(f); timeEl.textContent = `${fmt(f * v.duration * 1000)} / ${fmt(v.duration * 1000)}`; showUI(); });
  seek.addEventListener('pointerup', e => { if (!scrubbing) return; scrubbing = false; v.currentTime = fracAt(e) * (v.duration || 0); });
  }

  // ---- keyboard (computers, TV browsers): Space/K play, ←/→ ±10 s, ↑/↓ volume, M mute, F full screen,
  // Esc / Back closes an open window in one press, otherwise leaves the player
  const onKey = e => {
    if (PLAYER.el !== el) return removeEventListener('keydown', onKey);
    if (e.target.closest && e.target.closest('input, textarea, select')) return;
    const k = e.key;
    if (k === 'Escape' || k === 'GoBack' || k === 'BrowserBack') {
      if ($('.sheet') || document.querySelector('.pop-bg')) { closeSheet(); closePop(); e.preventDefault(); return; }
      if (document.fullscreenElement) return;
      e.preventDefault(); closePlayer(); return;
    }
    if ($('.sheet')) return;
    if (k === ' ' || k === 'k' || k === 'MediaPlayPause') { e.preventDefault(); v.paused ? v.play() : v.pause(); showUI(); }
    else if (k === 'ArrowLeft' && !live) { e.preventDefault(); seekBy(-10); }
    else if (k === 'ArrowRight' && !live) { e.preventDefault(); seekBy(10); }
    else if ((k === 'ArrowLeft' || k === 'ChannelDown') && zap) { e.preventDefault(); zapBy(-1); }
    else if ((k === 'ArrowRight' || k === 'ChannelUp') && zap) { e.preventDefault(); zapBy(1); }
    else if (k === 'ArrowUp') { e.preventDefault(); v.volume = Math.min(1, v.volume + .1); v.muted = false; toast(`${T('Volume')} ${Math.round(v.volume * 100)}%`); }
    else if (k === 'ArrowDown') { e.preventDefault(); v.volume = Math.max(0, v.volume - .1); toast(`${T('Volume')} ${Math.round(v.volume * 100)}%`); }
    else if (k === 'm' || k === 'M') { v.muted = !v.muted; toast(v.muted ? 'Muted' : 'Sound on'); }
    else if (k === 'f' || k === 'F') $('#bfull', el).click();
    else showUI();
  };
  addEventListener('keydown', onKey);
  el.addEventListener('mousemove', () => showUI());

  // ---- Subtitles in your language, ready by themselves (Arabic by default — Settings → Subtitles)
  if (!live) v.addEventListener('loadedmetadata', () => setTimeout(autoSubs, 400), { once: true });
  async function autoSubs() {
    const pref = (S.subLang || 'ar').slice(0, 2).toLowerCase();
    const tt = Array.from(v.textTracks);
    const own = tt.findIndex(t => langIs(t.language, pref));
    if (own >= 0) { selectText(own); return; }
    if (!r.imdb || tt.some(t => t.mode === 'showing')) return;
    const list = (await getSubtitles(r.type, r.imdb, r.season, r.episode).catch(() => [])).filter(x => langIs(x.lang, pref));
    for (const sub of list.slice(0, 3)) {
      if (PLAYER.el !== el) return;
      try { const text = await fetch(sub.url).then(x => { if (!x.ok) throw 0; return x.text(); }); if (text.length < 40) continue;
        await addFromText(text, `${langName(pref) || pref} · ${T('auto')}`, pref); return; } catch { /* next one */ }
    }
  }

  // ---- tap / double-tap gestures
  let lastTap = 0, tapT;
  el.addEventListener('click', e => {
    if (e.target.closest('button, .p-seek, .sheet, .p-err, .mark-chip')) return;
    const now = Date.now();
    if (now - lastTap < 300) { clearTimeout(tapT); lastTap = 0; seekBy(e.clientX < innerWidth / 2 ? -10 : 10); return; }
    lastTap = now;
    tapT = setTimeout(() => { ui.classList.contains('off') ? showUI() : ui.classList.add('off'); }, 260);
  });
  function flash(s) {
    const f = document.createElement('div'); f.className = 'flash'; f.style[s < 0 ? 'left' : 'right'] = '64px';
    f.innerHTML = `${ic(s < 0 ? 'rew' : 'fwd')}${s < 0 ? '-' : '+'}10s`; el.appendChild(f); setTimeout(() => f.remove(), 700);
  }
  PLAYER.saveT = setInterval(saveProgress, 10000);
}
const LANG3 = { ar: ['ara'], en: ['eng'], fr: ['fre', 'fra'], es: ['spa'], de: ['ger', 'deu'], tr: ['tur'], it: ['ita'], pt: ['por', 'pob'], ru: ['rus'],
  fa: ['per', 'fas'], ur: ['urd'], hi: ['hin'], ko: ['kor'], ja: ['jpn'], zh: ['chi', 'zho'], nl: ['dut', 'nld'], id: ['ind'], ms: ['may', 'msa'] };
/** Is this track / subtitle language code (ar, ara, ar-SA, "Arabic"…) the language [p] (2 letters)? */
const langIs = (c, p) => { c = String(c || '').toLowerCase(); return !!c && (c === p || c.startsWith(p + '-') || c.startsWith(p + '_') || (LANG3[p] || []).includes(c.slice(0, 3)) || c === String(langName(p) || '').toLowerCase()); };
/** Live channel from an Xtream provider: what's on now and next (the provider's guide), refreshed every minute. */
async function liveGuide(url, el) {
  const m = String(url).match(/^(https?:\/\/[^/]+)\/live\/([^/]+)\/([^/]+)\/(\d+)/);
  if (!m || (location.protocol === 'https:' && m[1].startsWith('http:'))) return;   // browsers block http:// from a secure page
  const b64 = x => { try { return decodeURIComponent(escape(atob(x))); } catch { return x || ''; } };
  const hm = t => new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  while (PLAYER.el === el) {
    try {
      const j = await getJSON(`${m[1]}/player_api.php?username=${m[2]}&password=${m[3]}&action=get_short_epg&stream_id=${m[4]}&limit=3`, 10000);
      const list = (j.epg_listings || []).map(o => ({ title: b64(o.title), start: (+o.start_timestamp || Date.parse(o.start) / 1000) * 1000, end: (+o.stop_timestamp || Date.parse(o.end) / 1000) * 1000 }))
        .filter(p => p.end > Date.now()).sort((a, b) => a.start - b.start);
      const now = list[0], next = list[1];
      if (PLAYER.el !== el || !now) return;
      $('#pmeta', el).textContent = `${now.title}  ·  ${hm(now.start)}–${hm(now.end)}`;
      $('#pnext', el).textContent = next ? `${T('Next')}  ${hm(next.start)}  ${next.title}` : '';
      const bar = $('#pprog', el); bar.hidden = false; bar.firstElementChild.style.width = Math.max(0, Math.min(1, (Date.now() - now.start) / (now.end - now.start))) * 100 + '%';
    } catch { return; }
    await new Promise(res => setTimeout(res, 60000));
  }
}
// Esc / a remote's Back closes the open window or pop-up in one press (the player handles its own)
addEventListener('keydown', e => {
  if (e.key !== 'Escape' && e.key !== 'GoBack' && e.key !== 'BrowserBack') return;
  const tf = document.querySelector('.trailer-full'); if (tf) { tf.querySelector('.tf-x')?.click(); e.preventDefault(); return; }
  if (PLAYER.el) return;
  if ($('.sheet')) { closeSheet(); e.preventDefault(); } else if (document.querySelector('.pop-bg')) { closePop(); e.preventDefault(); }
});
function pickFile(accept, cb) { const i = document.createElement('input'); i.type = 'file'; i.accept = accept; i.onchange = () => i.files[0] && cb(i.files[0]); i.click(); }
document.addEventListener('visibilitychange', () => { if (document.hidden) saveProgress(); });
addEventListener('pagehide', saveProgress);

// ============================================================================ long-press menus, watched & PIN lock
const unlocked = new Set();
const lockKey = (t, id) => `${t}-${id}`;
async function pinHash(type, id, pin) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`lumio:${type}:${id}:${pin}`));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}
function refreshBadges(type, id) {
  const e = libEntry(type, id);
  document.querySelectorAll(`.poster[data-k="${type}-${id}"] .badges`).forEach(b => { b.innerHTML = badgesHTML(e); });
}
function closePop() { document.querySelectorAll('.pop-bg').forEach(x => x.remove()); }
/** Small centred window with a header and options (iOS-style context menu). */
function popup(header, opts) {
  closePop();
  const bg = document.createElement('div'); bg.className = 'pop-bg';
  bg.innerHTML = `<div class="pop" role="dialog">${header}<div class="pop-opts">${opts.map((o, i) => `<button class="opt" data-i="${i}" style="animation-delay:${i * 40}ms">${ic(o.icon)}<div>${esc(T(o.t))}${o.s ? `<small>${esc(T(o.s))}</small>` : ''}</div></button>`).join('')}</div></div>`;
  bg.onclick = e => { if (e.target === bg) closePop(); };
  bg.querySelectorAll('.opt').forEach(b => b.onclick = () => { closePop(); opts[+b.dataset.i].fn(); });
  document.body.appendChild(bg);
}
/** 4-digit PIN pad. setNew → enter + confirm, resolves with the PIN; otherwise resolves true once `check(pin)` passes. */
function pinPad({ title, setNew, check }) {
  return new Promise(resolve => {
    closePop();
    const bg = document.createElement('div'); bg.className = 'pop-bg';
    let pin = '', first = null;
    const head = () => T(setNew ? (first == null ? 'Enter a new PIN' : 'Re-enter the PIN to confirm') : 'Enter PIN');
    bg.innerHTML = `<div class="pop pin" role="dialog"><div class="pin-ic">${ic('lock')}</div><h3 id="pinh">${head()}</h3><small class="dim">${esc(title)}</small>
      <div class="dots4" id="dots">${'<i></i>'.repeat(4)}</div><div class="pin-err" id="perr">&nbsp;</div>
      <div class="pad">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map(k => k ? `<button data-k="${k}" aria-label="${k === 'del' ? T('Delete') : k}">${k === 'del' ? '⌫' : k}</button>` : '<span></span>').join('')}</div>
      <button class="btn tonal" id="pcancel" style="margin-top:6px">${T('Cancel')}</button></div>`;
    document.body.appendChild(bg);
    const dots = bg.querySelectorAll('#dots i'), err = $('#perr', bg);
    const paint = () => dots.forEach((d, i) => d.classList.toggle('on', i < pin.length));
    const done = v => { bg.remove(); document.removeEventListener('keydown', onKey); resolve(v); };
    const fail = m => { err.textContent = T(m); pin = ''; paint(); const box = $('.pop', bg); box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake'); navigator.vibrate?.(60); };
    const complete = async () => {
      if (setNew) {
        if (first == null) { first = pin; pin = ''; paint(); $('#pinh', bg).textContent = head(); err.innerHTML = '&nbsp;'; }
        else if (first === pin) done(pin);
        else { first = null; $('#pinh', bg).textContent = head(); fail("PINs don't match. Try again."); }
      } else if (await check(pin)) done(true); else fail('Wrong PIN');
    };
    const press = k => { if (k === 'del') { pin = pin.slice(0, -1); paint(); return; } if (pin.length < 4) { pin += k; paint(); if (pin.length === 4) setTimeout(complete, 120); } };
    bg.querySelectorAll('.pad button').forEach(b => b.onclick = () => press(b.dataset.k));
    const onKey = e => { if (/^\d$/.test(e.key)) press(e.key); else if (e.key === 'Backspace') press('del'); else if (e.key === 'Escape') done(null); };
    document.addEventListener('keydown', onKey);
    $('#pcancel', bg).onclick = () => done(null);
  });
}
const verifyPin = (type, id, title) => pinPad({ title, check: async p => (await pinHash(type, id, p)) === libEntry(type, id)?.pin });
async function unlockThen(type, id, title, fn) {
  const e = libEntry(type, id);
  if (!e?.pin || unlocked.has(lockKey(type, id))) return fn();
  if (await verifyPin(type, id, title)) { unlocked.add(lockKey(type, id)); fn(); }
}
/** Locked titles show this instead of their page until the PIN is entered. */
async function lockGate(type, id, token) {
  const e = libEntry(type, id);
  if (!e?.pin || unlocked.has(lockKey(type, id))) return false;
  view.innerHTML = `<a class="icon-btn back" href="javascript:history.back()" aria-label="${T('Back')}">${ic('back')}</a>
    <div class="msg" style="min-height:70dvh;align-content:center"><div class="pin-ic big">${ic('lock')}</div><h3>${T('This title is locked')}</h3><p>${T('Enter the 4-digit PIN to open it')}</p>
    <button class="btn acc" id="gpin">${T('Enter PIN')}</button></div>`;
  const ask = async () => { if (await verifyPin(type, id, e.title)) { unlocked.add(lockKey(type, id)); if (token === routeToken) route(); } };
  $('#gpin').onclick = ask; ask();
  return true;
}
function playEntry(e, fromStart) {
  if (fromStart) updateLib(e.type, e.id, cur => Object.assign(cur, { pos: 0 }));
  if (e.url && !e.url.startsWith('blob:')) startPlayer({ url: e.url, title: e.title, subtitle: e.season != null ? `S${e.season} • E${e.episode}` : '', type: e.type, id: e.id, imdb: e.imdb, season: e.season, episode: e.episode, poster: e.poster, backdrop: e.backdrop, addon: e.addon });
  else location.hash = `#/streams/${e.type}/${e.id}/${e.season ?? '-'}/${e.episode ?? '-'}`;
}
function openPosterMenu(p) {
  if (document.querySelector('.pop-bg')) return;
  const type = p.dataset.type, id = +p.dataset.id, title = p.dataset.title, poster = p.dataset.poster, cont = p.dataset.cont === '1';
  const e = libEntry(type, id);
  const header = `<div class="pop-head">${poster ? `<img src="${IMG}w154${poster}" alt="">` : '<span class="ph"></span>'}<div><b>${esc(title)}</b><small class="dim">${esc(p.dataset.year || '')}</small></div></div>`;
  const base = cur => cur || { type, id, title, poster, pos: 0, dur: 0 };
  let opts;
  if (cont && e) {
    opts = [
      { icon: 'play', t: 'Continue watching', s: e.season != null ? `S${e.season} • E${e.episode}` : '', fn: () => unlockThen(type, id, title, () => playEntry(libEntry(type, id), false)) },
      { icon: 'replay', t: 'Play from beginning', fn: () => unlockThen(type, id, title, () => playEntry(libEntry(type, id), true)) },
      { icon: 'remove', t: 'Remove from Continue Watching', fn: () => unlockThen(type, id, title, () => {
        updateLib(type, id, cur => { const n = Object.assign(cur, { pos: 0, dur: 0 }); return n.watch || n.watched || n.pin ? n : null; });
        document.querySelectorAll(`.poster[data-cont="1"][data-k="${type}-${id}"]`).forEach(x => { const r = x.parentElement; x.remove(); if (r && !r.querySelector('.poster')) { r.previousElementSibling?.remove(); r.remove(); } });
        toast('Removed from Continue Watching');
      }) },
      e.pin
        ? { icon: 'unlock', t: 'Unlock this title', fn: async () => { if (await verifyPin(type, id, title)) { updateLib(type, id, cur => { delete cur.pin; return cur; }); unlocked.delete(lockKey(type, id)); refreshBadges(type, id); toast('Title unlocked'); } } }
        : { icon: 'lock', t: 'Lock this title', s: 'Needs your 4-digit PIN to open', fn: async () => { const pin = await pinPad({ title, setNew: true }); if (!pin) return; const h = await pinHash(type, id, pin); updateLib(type, id, cur => Object.assign(base(cur), { pin: h })); refreshBadges(type, id); toast('Title locked'); } },
    ];
  } else {
    const inLib = !!(e && e.watch), watched = !!(e && e.watched);
    opts = [
      { icon: inLib ? 'bookmark' : 'bookmarkO', t: inLib ? 'Remove from Library' : 'Add to Library', fn: () => { updateLib(type, id, cur => Object.assign(base(cur), { watch: !inLib })); toast(inLib ? 'Removed from Library' : 'Added to Library'); } },
      { icon: 'checkC', t: watched ? 'Mark as unwatched' : 'Mark as watched', fn: () => { updateLib(type, id, cur => Object.assign(base(cur), { watched: !watched })); refreshBadges(type, id); toast(watched ? 'Marked as unwatched' : 'Marked as watched'); } },
    ];
  }
  popup(header, opts);
}
// Touch & hold on any poster (iPhone / Android), right-click on desktop
let lpTimer = null, lpFired = false, lpXY = null;
document.addEventListener('touchstart', e => {
  const p = e.target.closest('.poster'); if (!p) return;
  lpFired = false; const t = e.touches[0]; lpXY = [t.clientX, t.clientY];
  clearTimeout(lpTimer); lpTimer = setTimeout(() => { lpFired = true; navigator.vibrate?.(15); p.classList.add('pressed'); setTimeout(() => p.classList.remove('pressed'), 250); openPosterMenu(p); }, 480);
}, { passive: true });
document.addEventListener('touchmove', e => { if (!lpXY) return; const t = e.touches[0]; if (Math.hypot(t.clientX - lpXY[0], t.clientY - lpXY[1]) > 10) clearTimeout(lpTimer); }, { passive: true });
['touchend', 'touchcancel'].forEach(ev => document.addEventListener(ev, () => clearTimeout(lpTimer), { passive: true }));
document.addEventListener('click', e => { if (lpFired && e.target.closest('.poster')) { e.preventDefault(); e.stopPropagation(); lpFired = false; } }, true);
document.addEventListener('contextmenu', e => { const p = e.target.closest('.poster'); if (p) { e.preventDefault(); openPosterMenu(p); } });

// ============================================================================ sign-in, profiles & avatars
const AVATARS_ANIMATED = [
  ['a:rocket', '🚀', '#3A2D8F', '#120B3D', 'fly'], ['a:unicorn', '🦄', '#E66BD1', '#5B1E7A', 'bounce'], ['a:fire', '🔥', '#FF7A1A', '#5C1300', 'flicker'],
  ['a:alien', '👾', '#27C281', '#06402A', 'wobble'], ['a:dragon', '🐉', '#2F9E44', '#0D3316', 'sway'], ['a:butterfly', '🦋', '#3BA7FF', '#0B2F5C', 'flutter'],
  ['a:dino', '🦖', '#6B8E23', '#23300A', 'stomp'], ['a:star', '⭐', '#F5B700', '#5C4400', 'spin'], ['a:popcorn', '🍿', '#E63946', '#5C0A12', 'pop'],
  ['a:planet', '🪐', '#8E7CFF', '#221A5C', 'orbit'], ['a:whale', '🐳', '#1A8FE3', '#07304F', 'float'], ['a:wave', '👋', '#FFB86B', '#5C3300', 'wave'],
  ['a:ghost', '👻', '#6C63FF', '#1B1747', 'float'], ['a:clapper', '🎬', '#4A4E69', '#101222', 'wobble'],
];
const AVATARS_CLASSIC = [
  ['s:fox', '🦊', '#FF8C42', '#7A2E00'], ['s:panda', '🐼', '#9AA5B1', '#2B3138'], ['s:tiger', '🐯', '#FFA62B', '#6B3A00'], ['s:lion', '🦁', '#E9B949', '#5E4100'],
  ['s:frog', '🐸', '#52B788', '#143D28'], ['s:penguin', '🐧', '#4D96FF', '#0E2A57'], ['s:koala', '🐨', '#A0A0B0', '#33333F'], ['s:octopus', '🐙', '#FF6B9A', '#5C0F2E'],
  ['s:cat', '🐱', '#F4A261', '#5E2F0D'], ['s:dog', '🐶', '#D4A373', '#4A2F14'], ['s:robot', '🤖', '#00BBF9', '#003A52'], ['s:astronaut', '🧑‍🚀', '#5E60CE', '#1A1B4B'],
  ['s:ninja', '🥷', '#495057', '#121416'], ['s:wizard', '🧙', '#7209B7', '#22033A'], ['s:crown', '👑', '#FFC300', '#5C4600'], ['s:heart', '💜', '#B5179E', '#3D0636'],
];
const AVATAR_MAP = Object.fromEntries([...AVATARS_ANIMATED, ...AVATARS_CLASSIC].map(a => [a[0], a]));
function avatarHTML(id, url, size = 96) {
  const r = Math.round(size * .24);
  if (url) return `<span class="av" style="width:${size}px;height:${size}px;border-radius:${r}px"><img src="${esc(url)}" alt=""></span>`;
  const [, emoji, c1, c2, motion] = AVATAR_MAP[id] || AVATARS_ANIMATED[0];
  return `<span class="av ${motion ? 'av-anim m-' + motion : ''}" style="width:${size}px;height:${size}px;border-radius:${r}px;--c1:${c1};--c2:${c2};font-size:${Math.round(size * .52)}px"><i>${emoji}</i></span>`;
}
const profilePinHash = async (id, pin) => {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`lumio:profile:${id}:${pin}`));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
};
let PROFILE_CHOSEN = false;
function lumioLogo() { return `<div class="logo-row"><span class="olive-logo">${ic('play')}</span><b>Lumio</b></div>`; }

// ---- login (email + password, same account as the Android app)
async function loginView() {
  renderNav(null); view.innerHTML = ''; document.querySelectorAll('.welcome').forEach(x => x.remove());
  let creating = false;
  const w = document.createElement('div'); w.className = 'welcome';
  const draw = () => {
    w.querySelector('.wbox').innerHTML = `${lumioLogo()}
      <div class="seg"><button data-m="0" class="${!creating ? 'on' : ''}">${T('Sign in')}</button><button data-m="1" class="${creating ? 'on' : ''}">${T('Create account')}</button></div>
      <h1>${T(creating ? 'Create your Lumio account' : 'Welcome back')}</h1>
      <p class="dim">${T('Your profiles, library and history on every device')}</p>
      <form id="lf" novalidate>
        <input class="field" id="le" type="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" placeholder="${T('Email')}" aria-label="${T('Email')}">
        <div class="pw"><input class="field" id="lp" type="password" autocomplete="${creating ? 'new-password' : 'current-password'}" placeholder="${T('Password')}" aria-label="${T('Password')}"><button type="button" id="lshow" aria-label="Show password">${ic('eyeOff')}</button></div>
        <div class="werr" id="lerr"></div>
        <button class="btn wgo olive" type="submit" id="lgo">${T(creating ? 'Create account' : 'Sign in')}</button>
      </form>
      ${creating ? '' : `<button class="linkbtn" id="lforgot">${T('Forgot password?')}</button>`}
      <div class="wlang"><button data-l="en" class="${S.lang !== 'ar' ? 'on' : ''}">English</button><span>·</span><button data-l="ar" class="${S.lang === 'ar' ? 'on' : ''}">العربية</button></div>`;
    const err = $('#lerr', w), email = $('#le', w), pw = $('#lp', w);
    const shake = m => { err.textContent = T(m); err.style.color = '#FF6B6B'; const box = $('.wbox', w); box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake'); };
    w.querySelectorAll('.seg button').forEach(b => b.onclick = () => { creating = b.dataset.m === '1'; draw(); });
    w.querySelectorAll('.wlang button').forEach(b => b.onclick = () => { raw.set('lumio.deviceLang', b.dataset.l); S.lang = b.dataset.l; applyLang(); draw(); });
    $('#lshow', w).onclick = () => { pw.type = pw.type === 'password' ? 'text' : 'password'; };
    $('#lforgot', w)?.addEventListener('click', async () => {
      if (!validEmail(email.value)) return shake('Enter your email above, then tap “Forgot password?”');
      try { await authCall('recover', { email: normEmail(email.value) }); err.style.color = '#B5D46B'; err.textContent = T('Password reset email sent'); } catch (e) { shake(e.message); }
    });
    $('#lf', w).onsubmit = async e => {
      e.preventDefault();
      if (!validEmail(email.value)) return shake('Enter a valid email address');
      if (pw.value.length < 6) return shake('Password must be at least 6 characters');
      const go = $('#lgo', w); go.disabled = true; go.innerHTML = '<span class="mini-spin"></span>';
      try {
        const j = creating ? await authCall('signup', { email: normEmail(email.value), password: pw.value })
                           : await authCall('token?grant_type=password', { email: normEmail(email.value), password: pw.value });
        if (!j.access_token) { err.style.color = '#B5D46B'; err.textContent = T('Account created. Check your email to confirm it, then sign in.'); go.disabled = false; go.textContent = T('Sign in'); creating = false; return; }
        saveSession(j);
        await afterSignIn();
        w.remove();
      } catch (ex) { go.disabled = false; go.textContent = T(creating ? 'Create account' : 'Sign in'); shake(ex.message || 'Network error'); }
    };
  };
  w.innerHTML = `<div class="wall" id="wall"></div><div class="wshade"></div><div class="wbox"></div>`;
  document.body.appendChild(w); draw();
  try {
    const list = (await api.trending('all', 'week')).filter(x => x.poster_path).slice(0, 18);
    const col = k => `<div class="wcol" style="animation-duration:${38 + k * 7}s;animation-direction:${k % 2 ? 'reverse' : 'normal'}">${[...list, ...list].filter((_, i) => i % 4 === k).map(x => `<img src="${IMG}w342${x.poster_path}" alt="" loading="lazy">`).join('')}</div>`;
    const wall = $('#wall', w); if (wall) wall.innerHTML = [0, 1, 2, 3].map(col).join('');
  } catch { /* offline */ }
}
const normEmail = e => String(e || '').trim().toLowerCase();
const validEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normEmail(e));

/** Load the account: cloud first; if the cloud is empty, upload what this browser had before. */
async function afterSignIn() {
  CD = raw.get(cacheKey(), {}) || {};
  loadSyncState();
  let found = false;
  try { found = await cloudPull(); } catch { /* offline: use cached copy */ }
  if (!found && !Object.keys(CD).length) {
    // Bring over data from the older email-only website login, if any
    const oldId = (() => { let h = 0x811c9dc5; for (const c of normEmail(SESSION.email)) { h ^= c.charCodeAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(36); })();
    const oldS = raw.get(`lumio.u.${oldId}.settings`, null) || raw.get('lumio.settings', null);
    const oldL = raw.get(`lumio.u.${oldId}.library`, null) || raw.get('lumio.library', null);
    const oldF = raw.get(`lumio.u.${oldId}.filters`, null) || raw.get('lumio.filters', null);
    PROFILE_ID = MAIN;
    if (oldS) { S = Object.assign({}, DEFAULT_SETTINGS, oldS); CD[kS(MAIN)] = JSON.stringify(toApp(S, {})); }
    if (oldL) CD[kL(MAIN)] = JSON.stringify(oldL.map(toEntry));
    if (oldF) { const o = {}; for (const [k, l] of Object.entries(oldF)) o[k] = l.map(x => ({ kind: x.kind, startMs: Math.round(x.start), endMs: Math.round(x.end), source: x.source || '' })); CD[kF(MAIN)] = JSON.stringify(o); }
    // Only upload when there is real data to bring over — never a blank starter profile
    if (oldS || oldL || oldF) { raw.set(cacheKey(), CD); await cloudPush(true); }
  }
  PROFILE_ID = raw.get('lumio.activeProfile.' + SESSION.uid, MAIN);
  if (!profiles().some(p => p.id === PROFILE_ID)) PROFILE_ID = MAIN;
  loadProfileData(); applyTheme(); applyLang();
  PROFILE_CHOSEN = false;
  profilesView();
}
async function signOut() {
  closePlayer(true);
  await cloudPush(true);
  try { await authCall('logout', {}, SESSION?.access); } catch { /* ignore */ }
  raw.del(cacheKey()); raw.del(baseKey()); raw.del(pushedKey()); raw.del('lumio.session'); SESSION = null; CD = {}; PROFILE_ID = MAIN; PROFILE_CHOSEN = false;
  unlocked.clear(); loadProfileData(); applyTheme(); applyLang();
  loginView();
}

// ---- Sign in a TV (page opened by scanning the QR code on Lumio TV)
function tvLinkView() {
  renderNav(null); document.querySelectorAll('.welcome').forEach(x => x.remove());
  const clean = v => String(v || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  const pretty = c => c.length > 4 ? c.slice(0, 4) + '-' + c.slice(4) : c;
  let code = clean(new URLSearchParams(location.hash.split('?')[1] || '').get('c'));
  let creating = false;
  const w = document.createElement('div'); w.className = 'welcome';
  w.innerHTML = '<div class="wshade"></div><div class="wbox"></div>';
  const done = () => {
    w.querySelector('.wbox').innerHTML = `${lumioLogo()}<div class="tv-ok">${ic('check')}</div>
      <h1>${T('Your TV is signed in')}</h1><p class="dim">${T('You can close this page. Lumio on your TV opens in a moment.')}</p>
      <button class="btn wgo olive" id="thome">${T('Open Lumio here')}</button>`;
    $('#thome', w).onclick = () => { location.hash = '#/home'; location.reload(); };
  };
  const draw = () => {
    w.querySelector('.wbox').innerHTML = `${lumioLogo()}<div class="tv-ic">📺</div>
      <h1>${T('Sign in your TV')}</h1>
      <p class="dim">${T('Enter the code shown on your TV')}</p>
      <form id="tf" novalidate>
        <input class="field tvcode" id="tc" maxlength="9" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="ABCD-EFGH" aria-label="${T('TV code')}" value="${pretty(code)}">
        <div class="seg"><button type="button" data-m="0" class="${!creating ? 'on' : ''}">${T('Sign in')}</button><button type="button" data-m="1" class="${creating ? 'on' : ''}">${T('Create account')}</button></div>
        <input class="field" id="te" type="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" placeholder="${T('Email')}" aria-label="${T('Email')}" value="${esc(SESSION?.email || '')}">
        <div class="pw"><input class="field" id="tp" type="password" autocomplete="${creating ? 'new-password' : 'current-password'}" placeholder="${T('Password')}" aria-label="${T('Password')}"><button type="button" id="tshow" aria-label="Show password">${ic('eyeOff')}</button></div>
        <div class="werr" id="terr"></div>
        <button class="btn wgo olive" type="submit" id="tgo">${T('Sign in TV')}</button>
      </form>`;
    const err = $('#terr', w), tc = $('#tc', w), email = $('#te', w), pw = $('#tp', w);
    const shake = m => { err.textContent = T(m); err.style.color = '#FF6B6B'; const box = $('.wbox', w); box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake'); };
    tc.oninput = () => { code = clean(tc.value); tc.value = pretty(code); };
    w.querySelectorAll('.seg button').forEach(b => b.onclick = () => { code = clean(tc.value); creating = b.dataset.m === '1'; draw(); });
    $('#tshow', w).onclick = () => { pw.type = pw.type === 'password' ? 'text' : 'password'; };
    (code.length === 8 ? (email.value ? pw : email) : tc).focus();
    $('#tf', w).onsubmit = async e => {
      e.preventDefault();
      code = clean(tc.value);
      if (code.length !== 8) return shake('Enter the 8-character code from your TV');
      if (!validEmail(email.value)) return shake('Enter a valid email address');
      if (pw.value.length < 6) return shake('Password must be at least 6 characters');
      const go = $('#tgo', w); go.disabled = true; go.innerHTML = '<span class="mini-spin"></span>';
      try {
        // A fresh sign-in just for the TV (this page's own session is left alone)
        const j = creating ? await authCall('signup', { email: normEmail(email.value), password: pw.value })
                           : await authCall('token?grant_type=password', { email: normEmail(email.value), password: pw.value });
        if (!j.access_token) { err.style.color = '#B5D46B'; err.textContent = T('Account created. Check your email to confirm it, then sign in.'); creating = false; go.disabled = false; go.textContent = T('Sign in TV'); return; }
        const r = await fetch(`${SB_URL}/rest/v1/rpc/link_tv`, { method: 'POST',
          headers: { apikey: SB_KEY, Authorization: 'Bearer ' + j.access_token, 'Content-Type': 'application/json' },
          body: JSON.stringify({ p_code: code, p_refresh: j.refresh_token }) });
        if (r.status === 404) throw new Error("QR sign-in isn't set up on the server yet");
        if (!r.ok) throw new Error('Network error');
        if ((await r.json()) !== true) throw new Error('That code expired or is wrong. Check the TV and try again.');
        done();
      } catch (ex) { go.disabled = false; go.textContent = T('Sign in TV'); shake(ex.message || 'Network error'); }
    };
  };
  document.body.appendChild(w); draw();
}

// ---- Who's watching? / Manage Profiles
function profilesView(managing = false) {
  renderNav(null); closePop();
  document.querySelectorAll('.welcome').forEach(x => x.remove());
  const list = profiles();
  const w = document.createElement('div'); w.className = 'welcome profiles';
  w.innerHTML = `<div class="pbox">${lumioLogo()}
    <h1 class="who">${T(managing ? 'Manage Profiles' : "Who's watching?")}</h1>
    <div class="pgrid">${list.map((p, i) => `<button class="ptile ${managing ? 'managing' : ''}" data-id="${esc(p.id)}" style="animation-delay:${i * 70}ms">
        <span class="pav">${avatarHTML(p.avatar, p.avatarUrl, 96)}${p.pinHash && !managing ? `<span class="plock">${ic('lock')}</span>` : ''}${managing ? '<span class="pen">✏️</span>' : ''}</span>
        <span class="pname">${esc(p.name || T('Profile'))}</span></button>`).join('')}
      ${managing && list.length < 8 ? `<button class="ptile add" id="padd" style="animation-delay:${list.length * 70}ms"><span class="pav"><span class="addbox">+</span></span><span class="pname dim">${T('Add Profile')}</span></button>` : ''}</div>
    <button class="btn outline" id="pmanage">${ic(managing ? 'check' : 'settings')}${T(managing ? 'Done' : 'Manage Profiles')}</button>
    ${managing ? '' : `<button class="linkbtn" id="psignout">${T('Sign out')} · ${esc(SESSION?.email || '')}</button>`}</div>`;
  document.body.appendChild(w);
  w.querySelectorAll('.ptile[data-id]').forEach(b => b.onclick = async () => {
    const p = profiles().find(x => x.id === b.dataset.id);
    if (managing) return profileEditor(p, false);
    if (p.pinHash) {
      const ok = await pinPad({ title: p.name, check: async pin => (await profilePinHash(p.id, pin)) === p.pinHash });
      if (!ok) return;
    }
    enterProfile(p.id);
  });
  $('#padd', w)?.addEventListener('click', () => {
    const n = profiles().length;
    profileEditor({ id: 'p' + Date.now().toString(36), name: '', avatar: AVATARS_ANIMATED[n % AVATARS_ANIMATED.length][0], avatarUrl: null, pinHash: null, shareAddons: true }, true);
  });
  $('#pmanage', w).onclick = () => profilesView(!managing);
  $('#psignout', w)?.addEventListener('click', signOut);
}
function enterProfile(id) {
  PROFILE_ID = id; raw.set('lumio.activeProfile.' + SESSION.uid, id);
  unlocked.clear(); loadProfileData(); applyTheme(); applyLang();
  PROFILE_CHOSEN = true;
  document.querySelectorAll('.welcome').forEach(x => x.remove());
  if (PENDING_PARTY) { const c = PENDING_PARTY; PENDING_PARTY = null; location.hash = '#/party/' + c; return; }
  if (location.hash !== '#/home') location.hash = '#/home'; else route();
}

// ---- Edit / add profile
function profileEditor(orig, isNew) {
  document.querySelectorAll('.welcome').forEach(x => x.remove());
  const d = Object.assign({}, orig);
  let confirmDelete = false;
  const w = document.createElement('div'); w.className = 'welcome profiles editor';
  const grid = (list) => list.map(a => `<button class="avpick ${!d.avatarUrl && d.avatar === a[0] ? 'on' : ''}" data-av="${a[0]}">${avatarHTML(a[0], null, 60)}</button>`).join('');
  const draw = () => {
    w.innerHTML = `<div class="ebox">
      <div class="etop"><button class="icon-btn" id="eback" aria-label="${T('Back')}">${ic('back')}</button><b>${T(isNew ? 'Add Profile' : 'Edit Profile')}</b></div>
      <div class="epreview">${avatarHTML(d.avatar, d.avatarUrl, 120)}</div>
      <label class="elabel" for="ename">${T('Name')}</label>
      <input class="field" id="ename" maxlength="20" value="${esc(d.name)}" placeholder="${T('Profile name')}">
      ${d.id !== MAIN ? `<div class="card erow"><div><b>${T('Use primary addons')}</b><small>${T("Share the main profile's addon setup instead of managing a separate list")}</small></div><button class="switch ${d.shareAddons ? 'on' : ''}" id="eshare" role="switch" aria-checked="${d.shareAddons}"></button></div>` : ''}
      <label class="elabel" for="eurl">${T('Custom avatar URL')}</label>
      <input class="field" id="eurl" type="url" value="${esc(d.avatarUrl || '')}" placeholder="https://…/avatar.gif">
      <small class="dim">${T('Image or animated GIF link. Leave empty to use an avatar below.')}</small>
      <div class="elabel">${T('Choose an avatar')}</div>
      <small class="dim">${T('Animated')}</small><div class="avgrid">${grid(AVATARS_ANIMATED)}</div>
      <small class="dim">${T('Classic')}</small><div class="avgrid">${grid(AVATARS_CLASSIC)}</div>
      <div class="elabel">${T('Security')}</div>
      <div class="card erow"><span class="pin-ic">${ic('lock')}</span><div><b>${T('Profile PIN')}</b><small>${T(d.pinHash ? 'This profile needs a 4-digit PIN to open' : 'Anyone can open this profile')}</small></div><button class="switch ${d.pinHash ? 'on' : ''}" id="epin" role="switch" aria-checked="${!!d.pinHash}"></button></div>
      <button class="btn wgo olive" id="esave">${T('Save changes')}</button>
      ${d.id !== MAIN && !isNew ? `<button class="linkbtn danger" id="edel">${T(confirmDelete ? 'Tap again to delete this profile' : 'Delete profile')}</button>` : ''}
    </div>`;
    const keep = () => { d.name = $('#ename', w).value; d.avatarUrl = $('#eurl', w).value.trim() || null; };
    $('#eback', w).onclick = () => { w.remove(); profilesView(true); };
    $('#eurl', w).onchange = () => { keep(); draw(); };
    w.querySelectorAll('.avpick').forEach(b => b.onclick = () => { keep(); d.avatar = b.dataset.av; d.avatarUrl = null; draw(); });
    $('#eshare', w)?.addEventListener('click', () => { keep(); d.shareAddons = !d.shareAddons; draw(); });
    $('#epin', w).onclick = async () => {
      keep();
      if (!d.pinHash) { const pin = await pinPad({ title: d.name || T('Profile'), setNew: true }); if (pin) d.pinHash = await profilePinHash(d.id, pin); }
      else if (!orig.pinHash) d.pinHash = null;
      else if (await pinPad({ title: d.name, check: async p => (await profilePinHash(d.id, p)) === orig.pinHash })) d.pinHash = null;
      draw();
    };
    $('#esave', w).onclick = () => {
      keep();
      const list = profiles(); const p = { id: d.id, name: d.name.trim() || T('Profile'), avatar: d.avatar, avatarUrl: d.avatarUrl, pinHash: d.pinHash, shareAddons: d.shareAddons };
      const i = list.findIndex(x => x.id === p.id); if (i >= 0) list[i] = p; else list.push(p);
      saveProfiles(list); w.remove(); profilesView(true);
    };
    $('#edel', w)?.addEventListener('click', () => {
      keep();
      if (!confirmDelete) { confirmDelete = true; draw(); return; }
      saveProfiles(profiles().filter(x => x.id !== d.id));
      delete CD[kS(d.id)]; delete CD[kL(d.id)]; delete CD[kF(d.id)]; dataChanged();
      w.remove(); profilesView(true);
    });
  };
  document.body.appendChild(w); draw();
}

// ============================================================================ settings
/**
 * Settings, organised like the phone & TV apps: a hub (profile card, then Account / General / About groups — each row a
 * coloured icon, title, summary and chevron) and one page per topic at #/settings/<page>.
 */
let SET_PAGE = null;
// Android / desktop Chrome: keep the browser's install prompt so "Install Lumio" is one tap
let INSTALL_PROMPT = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); INSTALL_PROMPT = e; });
window.addEventListener('appinstalled', () => { INSTALL_PROMPT = null; toast('Lumio installed'); });
const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isIOSSafari = () => isIOS() && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS|GSA\//.test(navigator.userAgent);
const SET_PAGES = {
  account: ['Account', 'user', '#3B82F6'], party: ['Watch party', 'group', '#EC4899'], language: ['Language', 'lang', '#0EA5E9'],
  content: ['Catalog & region', 'movie', '#F59E0B'], addons: ['Stream addons', 'ext', '#8B5CF6'], playback: ['Playback', 'playC', '#22C55E'],
  install: ['Install the app', 'phone', '#14B8A6'], about: ['About Lumio', 'info', '#64748B'],
};
function settingsView(page) {
  if (page !== undefined) SET_PAGE = page || null;
  page = SET_PAGE;
  const standalone = navigator.standalone || matchMedia('(display-mode: standalone)').matches;
  const chev = `<span class="chev">${S.lang === 'ar' ? '‹' : '›'}</span>`;
  const row = (href, icon, tint, title, sub) => `<a class="hub-row" href="${href}"><span class="hub-ic" style="--t:${tint}">${ic(icon)}</span><div><b>${esc(T(title))}</b><small>${esc(sub)}</small></div>${chev}</a>`;
  const go = k => row('#/settings/' + k, SET_PAGES[k][1], SET_PAGES[k][2], SET_PAGES[k][0], settingsSummary(k));
  if (!page || !SET_PAGES[page]) {
    const p = activeProfile(), synced = raw.get('lumio.lastSync', 0);
    view.innerHTML = `<h1 class="page-title gutter">${T("Settings")}</h1><div class="gutter hub-wrap">
      <a class="card hub-profile" href="#/settings/account">${avatarHTML(p.avatar, p.avatarUrl, 56)}<div><b>${esc(p.name)}</b><small>${esc(SESSION?.email || '')}${synced ? ' · ' + T('Synced') : ''}</small></div>${chev}</a>
      <div class="hub-l">${T('Account')}</div>
      <div class="card hub">${go('account')}${go('party')}</div>
      <div class="hub-l">${T('General')}</div>
      <div class="card hub">${row('#/appearance', 'palette', '#A855F7', 'Appearance', T('Theme, title colour, Arabic font and app icon'))}${go('language')}${go('content')}${go('addons')}${go('playback')}${standalone ? '' : go('install')}</div>
      <div class="hub-l">${T('About')}</div>
      <div class="card hub">${go('about')}</div>
      <div style="height:30px"></div></div>`;
    return;
  }
  const [title] = SET_PAGES[page];
  const head = `<a class="icon-btn back" href="#/settings" aria-label="Back">${ic('back')}</a><h1 class="page-title gutter" style="padding-inline-start:64px">${T(title)}</h1><div class="gutter set-page">`;
  const body = settingsPage(page, standalone);
  view.innerHTML = head + body + '<div style="height:40px"></div></div>';
  bindSettings(page);
}
function settingsSummary(k) {
  switch (k) {
    case 'account': return T('Profile, sync status and sign out');
    case 'party': return PARTY.code ? `${T('In party')} ${PARTY.code}` : T('Watch together in sync, chat and reactions');
    case 'language': return S.lang === 'ar' ? 'العربية' : 'English';
    case 'content': return `TMDB · ${T('region')} ${S.region}`;
    case 'addons': return `${S.addons.filter(a => a.enabled !== false).length}/${S.addons.length} ${T('on')} · ${T('Configure, order and switch off')}`;
    case 'playback': return T('Player, subtitles, skipping and auto-play');
    case 'install': return T(isIOS() ? 'One tap, then confirm in Settings' : 'Add Lumio to your Home Screen');
    default: return T('Version and this browser');
  }
}
const sw = (id, on) => `<button class="switch ${on ? 'on' : ''}" id="${id}" role="switch" aria-checked="${!!on}"></button>`;
function settingsPage(page, standalone) {
  const modeChips = (id, val) => `<div class="chips" style="padding:8px 0 0">${['off', 'button', 'auto'].map(m => `<button class="chip sm ${val === m ? 'on' : ''}" data-mode="${id}:${m}">${T({ off: 'Off', button: 'Button', auto: 'Auto' }[m])}</button>`).join('')}</div>`;
  switch (page) {
    case 'account': return `<div class="card">
      <div class="set-row">${avatarHTML(activeProfile().avatar, activeProfile().avatarUrl, 48)}<div><b>${esc(activeProfile().name)}</b><small>${T(activeProfile().id === MAIN ? 'Main profile' : activeProfile().shareAddons ? "Uses the main profile's addons" : 'Own addon list')}</small></div><button class="btn tonal" id="pswitch" style="height:36px;padding:0 14px">${T('Switch profile')}</button></div>
      <div class="set-row"><span class="pin-ic">${ic('user')}</span><div><b>${esc(SESSION?.email || '')}</b><small>${raw.get('lumio.lastSync', 0) ? T('Synced') + ' ' + new Date(raw.get('lumio.lastSync', 0)).toLocaleString() : T('Not synced yet')}</small></div></div>
      <div class="set-row" style="gap:10px"><button class="btn tonal" id="psync" style="height:36px;padding:0 14px">${T('Sync now')}</button><button class="btn outline" id="signout" style="height:36px;padding:0 14px">${T('Sign out')}</button></div></div>`;
    case 'party': return `<div class="card"><div class="set-row" style="display:block">${PARTY.code ? `<b>🎉 ${T('In party')} ${esc(PARTY.code)} · ${PARTY.members.length} ${T('watching')}</b>`
      : `<small>${T("Start a party from the player while watching (the 👥 button), or join a friend's with their code.")}</small>
      <form id="sjoin" class="prow" style="padding-top:10px"><input class="field" id="sjc" placeholder="ABC123" maxlength="8" autocapitalize="characters" autocomplete="off"><button class="btn acc">${T('Join')}</button></form>`}</div></div>`;
    case 'language': return `<div class="card"><div class="set-row" style="display:block"><b>${T('App language')}</b><small>${T('Movie and show titles always stay in English')}</small>
      <div class="chips" style="padding:10px 0 0"><button class="chip ${S.lang !== 'ar' ? 'on' : ''}" data-lang="en">English</button><button class="chip ${S.lang === 'ar' ? 'on' : ''}" data-lang="ar">العربية</button></div></div></div>`;
    case 'content': return `<div class="card">
      <div class="set-row" style="display:block"><b>${T("Streaming region")}</b><small>${T("Which country's Netflix, Disney+, Prime Video… catalogs to show")} (US, KW, SA, AE, GB…)</small><input class="field" id="region" style="margin-top:8px" maxlength="2" value="${esc(S.region)}"></div>
      <div class="set-row" style="display:block"><b>${T("TMDB API key")}</b><small>${T(S.tmdbKey ? 'Using your own key. Clear the field and save to go back to the built-in key.' : 'Built-in key is active. Paste your own key only if you want to override it.')}</small><input class="field" id="tmdbKey" style="margin-top:8px" type="password" autocomplete="off" value="${esc(S.tmdbKey)}"></div></div>`;
    case 'addons': return `<div class="card"><form class="set-row" style="display:grid;gap:10px" id="addf"><small style="margin:0">${T("Paste a Stremio-compatible addon manifest URL (…/manifest.json). Only install sources you have the right to stream.")}</small>
      <input class="field" id="addu" type="url" placeholder="https://…/manifest.json" autocomplete="off"><button class="btn acc" type="submit" style="justify-self:start">${T("Install addon")}</button></form></div>
      <p class="dim" style="font-size:12px;margin:12px 4px">${T("Addons at the top are asked first. Switch one off to keep it without using it.")}</p>
      ${S.addons.map((a, i) => `<div class="card addon ${a.enabled === false ? 'off' : ''}">
        <div class="set-row"><span class="ad-logo">${a.logo ? `<img src="${esc(a.logo)}" alt="">` : ic('ext')}</span><div><b>${esc(a.name)}</b><small>${[a.builtIn ? T('Built-in') : '', a.version ? 'v' + esc(a.version) : '', (a.resources || []).map(r => T(r)).join(' · ')].filter(Boolean).join('  •  ')}</small></div>${sw('aon' + i, a.enabled !== false)}</div>
        ${a.description ? `<p class="ad-desc">${esc(a.description)}</p>` : ''}
        <div class="ad-acts">${a.builtIn ? '' : `<button class="btn tonal sm" data-cfg="${i}">${ic('tune')}${T('Configure')}</button><button class="icon-btn" data-link="${i}" title="${T('Update link')}">${ic('link')}</button>`}
          <button class="icon-btn" data-ref="${i}" title="${T('Refresh')}">${ic('sync')}</button><span style="flex:1"></span>
          <button class="icon-btn" data-mv="${i}:-1" ${i ? '' : 'disabled'} title="${T('Move up')}">${ic('up')}</button><button class="icon-btn" data-mv="${i}:1" ${i < S.addons.length - 1 ? '' : 'disabled'} title="${T('Move down')}">${ic('down')}</button>
          <button class="icon-btn danger" data-del="${i}" title="${T('Remove')}">${ic('del')}</button></div>
        <form class="ad-link hidden" data-lf="${i}"><small>${T("After saving your settings on the addon's page, copy its new install link (…/manifest.json) and paste it here.")}</small><div class="prow"><input class="field" value="${esc(a.url)}" autocomplete="off"><button class="btn acc">${T('Save')}</button></div></form>
      </div>`).join('') || `<div class="card"><div class="set-row"><small>${T("No addons installed")}</small></div></div>`}`;
    case 'playback': return `<div class="set-h">${ic('ffwd')}${T("Skipping")}</div><div class="card">
      <div class="set-row" style="display:block"><b>${T("Skip intros")}</b><small>${T("Opening titles and theme songs")}</small>${modeChips('skipIntro', S.skipIntro)}</div>
      <div class="set-row" style="display:block"><b>${T("Skip recaps")}</b><small>${T("“Previously on…” at the start of episodes")}</small>${modeChips('skipRecap', S.skipRecap)}</div>
      <div class="set-row" style="display:block"><b>${T("Skip credits")}</b><small>${T("Shows “Next Episode” on series")}</small>${modeChips('skipCredits', S.skipCredits)}</div>
      <div class="set-row"><div><b>${T("Auto-skip nudity scenes")}</b><small>${T("Skips scenes in filter files you import, and scenes you mark yourself in the player under Scenes")}</small></div>${sw('skipNudity', S.skipNudity)}</div></div>
      <div class="set-h">${ic('playC')}${T("Player")}</div><div class="card">
      <div class="set-row"><div><b>${T("Auto-play next episode")}</b></div>${sw('autoNext', S.autoNext)}</div>
      <div class="set-row" style="display:block"><b>${T('Subtitle size')}: <span id="ssv">${Math.round(S.subScale * 100)}%</span></b><input type="range" id="subScale" min="0.6" max="2" step="0.1" value="${S.subScale}"></div>
      <div class="set-row" style="display:block"><b>${T("Preferred subtitle language")}</b><small>${T("ISO code, e.g. en, ar")}</small><input class="field" id="subLang" style="margin-top:8px" maxlength="3" value="${esc(S.subLang)}"></div></div>`;
    case 'install': return installPage();
    default: return `<div class="card"><div class="set-row"><span class="pin-ic">${ic('info')}</span><div><b>Lumio web</b><small>${T('Version')} ${esc((document.querySelector('script[src^="app.js"]')?.getAttribute('src') || '').split('v=')[1] || '')}</small></div></div>
      <div class="set-row"><div><b>${T('This browser')}</b><small>${esc(navigator.userAgent.replace(/^Mozilla\/5\.0 /, '').slice(0, 120))}</small></div></div>
      <div class="set-row"><div><small>${T('Works best in Safari on iPhone. HDR & Dolby Vision play natively on supported iPhones for HLS/MP4 streams.')}</small></div></div></div>`;
  }
}
/** Settings → Install the app. iPhone: a one-tap installer profile (Settings → Install). Android/desktop: the browser's own install. */
function installPage() {
  const icon = `<img class="inst-ic" src="${iconURL(S.iconColor || 'classic', 120)}" alt="">`;
  const steps = list => `<ol class="inst-steps">${list.map(([e, t, d]) => `<li><span class="n">${e}</span><div><b>${T(t)}</b>${d ? `<small>${T(d)}</small>` : ''}</div></li>`).join('')}</ol>`;
  if (isIOS() && !isIOSSafari()) return `<div class="card inst">${icon}<h2>${T('Open this page in Safari')}</h2>
    <p class="dim">${T('iPhone only installs apps from Safari. Copy the link, open Safari and paste it, then come back here.')}</p>
    <button class="btn acc big" id="instcopy">${ic('link')}${T('Copy link')}</button></div>`;
  if (isIOS()) return `<div class="card inst">${icon}<h2>${T('Install Lumio on your iPhone')}</h2>
      <p class="dim">${T('Lumio opens full-screen from your Home Screen like a real app — with the icon you picked in Appearance.')}</p>
      <a class="btn acc big" id="instgo" href="${SB_URL}/functions/v1/install-profile?icon=${encodeURIComponent(S.iconColor || 'classic')}">${ic('phone')}${T('Install Lumio')}</a></div>
    <div class="card inst-how" id="insthow">${steps([
      ['1', 'Tap “Allow”', 'Safari asks to download a configuration profile.'],
      ['2', 'Open the Settings app', 'Tap “Profile Downloaded” at the top (or General → VPN & Device Management).'],
      ['3', 'Tap “Install”', 'Enter your passcode and tap Install again. It only adds the Lumio icon.'],
      ['✓', 'Open Lumio from your Home Screen', 'Sign in once inside the app.']])}</div>
    <details class="card inst-alt"><summary>${T('Prefer the classic way?')}</summary>${steps([
      ['1', 'Tap the Share button in Safari', null], ['2', 'Choose “Add to Home Screen”', null], ['3', 'Tap “Add”', null]])}</details>`;
  return `<div class="card inst">${icon}<h2>${T('Install Lumio')}</h2>
    <p class="dim">${T('Opens in its own window from your home screen or desktop, like a real app.')}</p>
    ${INSTALL_PROMPT ? `<button class="btn acc big" id="instprompt">${ic('phone')}${T('Install Lumio')}</button>`
      : `<p class="dim" style="font-size:13px">${T('In Chrome or Edge: open the browser menu (⋮) and choose “Install app” or “Add to Home screen”.')}</p>`}</div>`;
}

function bindSettings(page) {
  $('#instgo')?.addEventListener('click', () => setTimeout(() => $('#insthow')?.classList.add('lit'), 600));
  $('#instcopy')?.addEventListener('click', () => { navigator.clipboard?.writeText(location.origin + location.pathname).then(() => toast('Link copied'), () => toast('Copy failed')); });
  $('#instprompt')?.addEventListener('click', async () => { const p = INSTALL_PROMPT; if (!p) return; p.prompt(); const r = await p.userChoice.catch(() => null); INSTALL_PROMPT = null; if (r?.outcome === 'accepted') toast('Lumio installed'); settingsView(); });
  const re = () => settingsView();
  const on = (sel, ev, fn) => { const el = $(sel); if (el) el[ev] = fn; };
  on('#signout', 'onclick', signOut);
  on('#pswitch', 'onclick', () => { PROFILE_CHOSEN = false; profilesView(); });
  on('#psync', 'onclick', async () => { toast('Syncing…'); try { await serial(() => cloudPullNow(true)); loadProfileData(); applyTheme(); applyLang(); toast('Synced'); re(); } catch { toast('Network error'); } });
  view.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => { S.lang = b.dataset.lang; saveSettings(); renderNav(null); re(); renderNav('settings'); });
  const toggle = (id, key) => on('#' + id, 'onclick', () => { S[key] = !S[key]; saveSettings(); re(); });
  toggle('skipNudity', 'skipNudity'); toggle('autoNext', 'autoNext');
  $('#sjoin')?.addEventListener('submit', e => { e.preventDefault(); location.hash = '#/party/' + $('#sjc').value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
  view.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { const [k, m] = b.dataset.mode.split(':'); S[k] = m; saveSettings(); re(); });
  on('#subScale', 'oninput', e => { S.subScale = +e.target.value; $('#ssv').textContent = Math.round(S.subScale * 100) + '%'; saveSettings(); });
  on('#subLang', 'onchange', e => { S.subLang = e.target.value.trim().toLowerCase(); saveSettings(); });
  on('#region', 'onchange', e => { const v = e.target.value.trim().toUpperCase(); if (/^[A-Z]{2}$/.test(v)) { S.region = v; saveSettings(); servicesReady = null; cache.clear(); toast('Region set to ' + v); } else toast('Use a 2-letter country code'); });
  on('#tmdbKey', 'onchange', e => { S.tmdbKey = e.target.value.trim(); saveSettings(); cache.clear(); servicesReady = null; toast('Saved'); });
  if (page !== 'addons') return;
  const keep = (old, fresh) => Object.assign(fresh, { enabled: old.enabled !== false, builtIn: !!old.builtIn });
  on('#addf', 'onsubmit', async e => {
    e.preventDefault(); const u = $('#addu').value.trim(); if (!u) return;
    try { const a = await fetchManifest(u); S.addons = S.addons.filter(x => x.url !== a.url).concat(a); saveSettings(); toast('Installed ' + a.name); re(); }
    catch (err) { toast("Couldn't load that manifest"); }
  });
  S.addons.forEach((a, i) => on('#aon' + i, 'onclick', () => { a.enabled = a.enabled === false; saveSettings(); re(); }));
  view.querySelectorAll('[data-cfg]').forEach(b => b.onclick = () => window.open(addonBase(S.addons[+b.dataset.cfg]) + '/configure', '_blank', 'noopener'));
  view.querySelectorAll('[data-link]').forEach(b => b.onclick = () => view.querySelector(`[data-lf="${b.dataset.link}"]`).classList.toggle('hidden'));
  view.querySelectorAll('[data-lf]').forEach(f => f.onsubmit = async e => {
    e.preventDefault(); const i = +f.dataset.lf, u = f.querySelector('input').value.trim();
    try { const a = keep(S.addons[i], await fetchManifest(u)); S.addons[i] = a; S.addons = S.addons.filter((x, j) => j === i || x.url !== a.url); saveSettings(); toast('Addon updated'); re(); }
    catch { toast("Couldn't load manifest"); }
  });
  view.querySelectorAll('[data-ref]').forEach(b => b.onclick = async () => {
    const i = +b.dataset.ref; try { S.addons[i] = keep(S.addons[i], await fetchManifest(S.addons[i].url)); saveSettings(); toast('Addon updated'); re(); } catch { toast("Couldn't load manifest"); }
  });
  view.querySelectorAll('[data-mv]').forEach(b => b.onclick = () => { const [i, d] = b.dataset.mv.split(':').map(Number), j = i + d; if (j < 0 || j >= S.addons.length) return; const [x] = S.addons.splice(i, 1); S.addons.splice(j, 0, x); saveSettings(); re(); });
  view.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { const a = S.addons[+b.dataset.del]; S.addons.splice(+b.dataset.del, 1); saveSettings(); toast('Removed ' + a.name); re(); });
}

/** Settings → Appearance: theme colour, AMOLED, title colour, Arabic font, app icon colour (synced with the apps). */
function appearanceView() {
  const sw = (id, on) => `<button class="switch ${on ? 'on' : ''}" id="${id}" role="switch" aria-checked="${!!on}"></button>`;
  const cinemaOn = S.accent === 'cinema' && S.titleColor === 'cinema' && S.arabicFont === 'cinema' && S.iconColor === 'cinema';
  view.innerHTML = `<a class="icon-btn back" href="javascript:history.back()" aria-label="Back">${ic('back')}</a>
  <h1 class="page-title gutter" style="padding-inline-start:64px">${T("Appearance")}</h1><div class="gutter">
    <div class="card ap-preview"><img src="${iconURL(S.iconColor || 'classic', 112)}" alt=""><div><h2>${S.lang === 'ar' ? 'السينما الليلة' : T('Tonight at the movies')}</h2><div class="bar"></div>
      <span class="pill">${T('Play')}</span><span class="pill alt">${T('Details')}</span></div></div>
    <div style="padding-top:12px"><button class="ap-cinema ${cinemaOn ? 'on' : ''}" id="apcin"><span style="font-size:30px">🎞️</span><div><b>${T("Classic cinema look")}</b><small class="dim">${T("Red titles, film-poster Arabic lettering, red theme and icon — in one tap")}</small></div></button></div>
    <div class="card" style="margin-top:12px"><div class="set-row" style="display:block"><b>${T("Theme colour")}</b><small class="dim">${T("Buttons, highlights, the navigation pill and progress bars")}</small>
      <div class="colors" style="padding-top:14px">${ACCENTS.map(([k, n, c]) => `<button class="dot ${S.accent === k ? 'on' : ''}" data-acc="${k}"><i style="background:${c}">${ic('check')}</i>${T(n)}</button>`).join('')}
        <button class="dot custom ${S.accent === 'custom' ? 'on' : ''}" data-acc="custom"><i><span style="background:${esc(S.customAccent)}">${ic('check')}</span></i>${T("Custom")}</button></div>
      ${S.accent === 'custom' ? `<div style="padding-top:14px"><input type="color" id="custc" value="${esc(S.customAccent)}" aria-label="Custom colour"></div>` : ''}</div></div>
    <div class="card"><div class="set-row"><div><b>${T("AMOLED black")}</b><small>${T("Use pure black backgrounds for OLED screens")}</small></div>${sw('amoled', S.amoled)}</div></div>
    <div class="card"><div class="set-row"><div><b>${T("Startup animation")}</b><small>${T("The wand writes the L when Lumio opens (any key or tap skips it)")}</small></div>${sw('apintro', S.intro !== false)}</div>
      ${S.intro !== false ? `<div class="set-row"><div><b>${T("Startup sound")}</b><small>${T("Soft and short; plays at your media volume and never over your music")}</small></div>${sw('apintros', S.introSound !== false)}</div>` : ''}</div>
    <div class="card"><div class="set-row" style="display:block"><b>${T("Trailers")}</b><small class="dim">${T("Trailers play by themselves at the top of a title's page")}</small>
      <div class="chips" style="padding-top:12px">${[['sound', 'With sound'], ['muted', 'Muted'], ['off', 'Off']].map(([k, n]) => `<button class="chip ${S.trailers === k ? 'on' : ''}" data-trl="${k}">${T(n)}</button>`).join('')}</div></div></div>
    <div class="card"><div class="set-row" style="display:block"><b>${T("Title colour")}</b><small class="dim">${T("Page titles and section headings")}</small>
      <div class="colors" style="padding-top:14px">${TITLES.map(([k, n, c]) => `<button class="dot ${S.titleColor === k ? 'on' : ''}" data-title="${k}"><i style="background:${c || 'var(--accent)'}">${ic('check')}</i>${T(n)}</button>`).join('')}</div></div></div>
    <div class="card"><div class="set-row" style="display:block"><b>${T("Arabic font")}</b><small class="dim">${T("Used when the app is in Arabic. Movie titles stay in English letters.")}</small>
      <div class="ap-fonts">${AR_FONTS.map(([k, n, smp, fam]) => `<button class="ap-font ${S.arabicFont === k ? 'on' : ''}" data-font="${k}"><div style="flex:1"><b>${T(n)}</b><span class="smp" style="font-family:${fam};${k === 'cinema' ? 'color:var(--title)' : ''}">${smp} · أفلام ومسلسلات</span></div>${S.arabicFont === k ? ic('check') : ''}</button>`).join('')}</div></div></div>
    <div class="card"><div class="set-row" style="display:block"><b>${T("App icon")}</b><small class="dim">${T("Changes the browser and new Home Screen icon; the phone and TV apps follow too")}</small>
      <div class="ap-icons">${ICONS.map(([k, n]) => `<button class="ap-icon ${S.iconColor === k ? 'on' : ''}" data-icon="${k}"><img src="${iconURL(k, 116)}" alt="">${T(n)}</button>`).join('')}</div></div></div>
    <p class="dim" style="font-size:12px;padding:16px 0 40px">${T("Saved in your account — your phone, TV and the website all follow these choices.")}</p>
  </div>`;
  const set = patch => { Object.assign(S, patch); saveSettings(); appearanceView(); };
  $('#apcin').onclick = () => set({ accent: 'cinema', titleColor: 'cinema', arabicFont: 'cinema', iconColor: 'cinema' });
  $('#amoled').onclick = () => set({ amoled: !S.amoled });
  $('#apintro').onclick = () => set({ intro: S.intro === false });
  $('#apintros') && ($('#apintros').onclick = () => set({ introSound: S.introSound === false }));
  view.querySelectorAll('[data-acc]').forEach(b => b.onclick = () => set({ accent: b.dataset.acc }));
  $('#custc')?.addEventListener('input', e => { S.customAccent = e.target.value; saveSettings(); });
  $('#custc')?.addEventListener('change', () => appearanceView());
  view.querySelectorAll('[data-title]').forEach(b => b.onclick = () => set({ titleColor: b.dataset.title }));
  view.querySelectorAll('[data-trl]').forEach(b => b.onclick = () => set({ trailers: b.dataset.trl }));
  view.querySelectorAll('[data-font]').forEach(b => b.onclick = () => set({ arabicFont: b.dataset.font }));
  view.querySelectorAll('[data-icon]').forEach(b => b.onclick = () => set({ iconColor: b.dataset.icon }));
}


// ============================================================================ watch party
/**
 * Watch together with the phone and TV apps: same rooms (Supabase Realtime, nothing stored), same rules.
 * Whoever is in control sends the playback state; everyone else follows (±5% speed for small drift,
 * a jump for big drift). Guests play from their own add-ons, with the host's stream as a backup.
 */
const PARTY = {
  id: Array.from({ length: 10 }, () => 'abcdefghjkmnpqrstuvwxyz23456789'[Math.floor(Math.random() * 31)]).join(''),
  code: null, ws: null, joined: false, connected: false, ref: 0, joinRef: null, hb: null, retry: 0, closed: true,
  members: [], presence: {}, hostId: null, controllerId: null, title: null, remote: null, chat: [], unread: 0,
  requests: [], detached: false, asked: false, shareStream: true, opening: null, applyUntil: 0, joinedAt: 0, ticker: null, hostCheck: null,
};
const QUICK_MSGS = ['Ready! 👍', 'Pause please ⏸️', 'Wait for me ⏳', "Can't hear 🔇", 'Back in a minute', 'Good night 👋'];
const REACTS = ['❤️', '😂', '😮', '😢', '👏', '🔥'];
const isHost = () => PARTY.hostId === PARTY.id, isCtl = () => PARTY.controllerId === PARTY.id;
const pName = id => (PARTY.members.find(m => m.id === id) || {}).name || '?';
const myName = () => activeProfile().name || 'Me';
const inviteUrl = () => location.origin + location.pathname + '#/party/' + PARTY.code;
const pKey = t => t ? `${t.type}-${t.tmdbId}-${t.season || 0}-${t.episode || 0}` : '';
const reqKey = r => r && r.id && r.type ? `${r.type}-${r.id}-${r.season || 0}-${r.episode || 0}` : '';

function pSend(event, payload, topic) {
  const t = topic || 'realtime:lumio-party-' + PARTY.code;
  const msg = { topic: t, event, payload, ref: String(++PARTY.ref) };
  if (t !== 'phoenix' && PARTY.joinRef) msg.join_ref = PARTY.joinRef;
  try { PARTY.ws?.readyState === 1 && PARTY.ws.send(JSON.stringify(msg)); } catch { /* reconnects */ }
}
const pCast = (event, payload) => pSend('broadcast', { type: 'broadcast', event, payload });
function pTrack() { if (PARTY.joined) pSend('presence', { type: 'presence', event: 'track', payload: { id: PARTY.id, name: myName(), device: 'web', joinedAt: PARTY.joinedAt } }); }

function pConnect() {
  const ws = new WebSocket(SB_URL.replace('https://', 'wss://') + '/realtime/v1/websocket?apikey=' + SB_KEY + '&vsn=1.0.0');
  PARTY.ws = ws;
  ws.onopen = () => {
    PARTY.joinRef = String(++PARTY.ref);
    ws.send(JSON.stringify({ topic: 'realtime:lumio-party-' + PARTY.code, event: 'phx_join', ref: PARTY.joinRef, join_ref: PARTY.joinRef,
      payload: { config: { broadcast: { self: false, ack: false }, presence: { key: PARTY.id }, private: false }, access_token: SB_KEY } }));
    clearInterval(PARTY.hb); PARTY.hb = setInterval(() => pSend('heartbeat', {}, 'phoenix'), 25000);
  };
  ws.onmessage = e => { try { pOnMessage(JSON.parse(e.data)); } catch { /* ignore */ } };
  ws.onclose = () => {
    PARTY.joined = false; PARTY.connected = false; clearInterval(PARTY.hb); pRender();
    if (PARTY.closed) return;
    setTimeout(() => { if (!PARTY.closed) pConnect(); }, Math.min(15000, 1000 * 2 ** Math.min(4, PARTY.retry++)));
  };
}
function pOnMessage(m) {
  if (m.topic !== 'realtime:lumio-party-' + PARTY.code) return;
  const p = m.payload || {};
  if (m.event === 'phx_reply' && m.ref === PARTY.joinRef) {
    if (p.status === 'ok') { PARTY.joined = true; PARTY.connected = true; PARTY.retry = 0; pTrack(); if (!isCtl()) pCast('hello', { from: PARTY.id }); pRender(); }
  } else if (m.event === 'broadcast') pHandle(p.event, p.payload || {});
  else if (m.event === 'presence_state') { PARTY.presence = {}; for (const [k, v] of Object.entries(p)) PARTY.presence[k] = v.metas || []; pPresence(); }
  else if (m.event === 'presence_diff') {
    for (const [k, v] of Object.entries(p.joins || {})) PARTY.presence[k] = (PARTY.presence[k] || []).concat(v.metas || []);
    for (const [k, v] of Object.entries(p.leaves || {})) {
      const gone = new Set((v.metas || []).map(x => x.phx_ref));
      PARTY.presence[k] = (PARTY.presence[k] || []).filter(x => !gone.has(x.phx_ref)); if (!PARTY.presence[k].length) delete PARTY.presence[k];
    }
    pPresence();
  } else if (m.event === 'phx_error' || m.event === 'phx_close') PARTY.ws?.close();
}

function partyStart(code) {
  partyLeave(true);
  Object.assign(PARTY, { code, closed: false, joinedAt: Date.now(), members: [], presence: {}, hostId: null, controllerId: null, title: null, remote: null,
    chat: [], unread: 0, requests: [], detached: false, asked: false, opening: null });
  pConnect();
  clearInterval(PARTY.ticker); PARTY.ticker = setInterval(() => { if (isCtl()) pPublish(); }, 4000);
  pRender();
}
function partyCreate() {
  const r = PLAYER.req;
  if (!r || !r.id || !r.type || r.local || r.live) return toast('Watch parties work with movies and series from your add-ons');
  partyStart(Array.from({ length: 6 }, () => 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 31)]).join(''));
  PARTY.hostId = PARTY.controllerId = PARTY.id;
  pPublish(); pRender();
}
function partyJoin(raw) {
  const c = String(raw || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  if (c.length < 4) return toast('Enter the party code');
  if (PARTY.code === c && !PARTY.closed) return;
  partyStart(c); toast(T('Joining party') + ' ' + c + '…');
}
function partyLeave(quiet) {
  if (!PARTY.code) return;
  pCast('bye', { from: PARTY.id }); PARTY.closed = true; try { PARTY.ws?.close(); } catch { /* */ }
  clearInterval(PARTY.ticker); clearInterval(PARTY.hb); clearTimeout(PARTY.hostCheck);
  PARTY.code = null; PARTY.members = []; PARTY.hostId = PARTY.controllerId = null; PARTY.title = PARTY.remote = null; PARTY.detached = false;
  if (PLAYER.v) PLAYER.v.playbackRate = 1;
  if (!quiet) pRender();
}

const pExpected = () => { const r = PARTY.remote; return !r ? 0 : r.playing ? r.pos + Math.min(8000, performance.now() - r.at) * r.rate + 120 : r.pos; };
function pPublish(seek) {
  if (!PARTY.code || !isCtl()) return;
  const r = PLAYER.req, v = PLAYER.v;
  let t = PARTY.title;
  if (r && r.id && r.type && !r.local && !r.live) {
    t = { type: r.type, tmdbId: r.id, imdbId: r.imdb || null, season: r.season ?? null, episode: r.episode ?? null, title: r.title || '', subtitle: r.subtitle || '',
      poster: r.poster || null, backdrop: r.backdrop || null, addon: r.addon || null };
    if (PARTY.shareStream && r.addon) t.url = r.url;
  }
  PARTY.title = t;
  // "Playing" only when it really is: stuck loading for over a second counts as paused, so everyone waits together
  const playing = !!v && !v.paused && !v.ended && !(PLAYER.waitingSince && performance.now() - PLAYER.waitingSince > 1000), pos = v ? Math.round(v.currentTime * 1000) : pExpected(), rate = v ? v.playbackRate || 1 : 1;
  PARTY.remote = { playing, pos, rate, at: performance.now() };
  const payload = { from: PARTY.id, host: PARTY.hostId || PARTY.id, controller: PARTY.controllerId || PARTY.id, playing, pos, rate };
  if (seek) payload.seek = true;
  if (t) payload.title = t;
  pCast('state', payload);
}
function pHandle(ev, o) {
  const from = o.from;
  if (ev === 'state') {
    if (!from || from === PARTY.id) return;
    if (isHost() && o.host === from) { PARTY.hostId = from; PARTY.controllerId = o.controller || from; }
    if (PARTY.hostId && from !== PARTY.hostId && from !== PARTY.controllerId) return;
    if (o.host) PARTY.hostId = o.host;
    if (o.controller && o.controller !== PARTY.controllerId) { PARTY.controllerId = o.controller; if (isCtl()) { toast("You're in control"); PARTY.asked = false; PARTY.detached = false; if (PLAYER.v) PLAYER.v.playbackRate = 1; } }
    if (isCtl()) return;
    PARTY.remote = { playing: !!o.playing, pos: +o.pos || 0, rate: Math.min(3, Math.max(.25, +o.rate || 1)), at: performance.now() };
    if (o.seek) PARTY.forceNext = true;
    if (o.title && o.title.type && o.title.tmdbId) {
      PARTY.title = o.title;
      if (reqKey(PLAYER.el ? PLAYER.req : null) !== pKey(o.title)) pOpenTitle(o.title);
    }
    pSync(); pRender();
  } else if (ev === 'hello') { if (isCtl()) pPublish(); }
  else if (ev === 'control') {
    if (from !== PARTY.hostId || !o.controller) return;
    PARTY.controllerId = o.controller;
    if (isCtl()) { toast("You're in control"); PARTY.asked = false; PARTY.detached = false; if (PLAYER.v) PLAYER.v.playbackRate = 1; pPublish(); } else toast(pName(o.controller) + ' ' + T('is in control'));
    pRender();
  } else if (ev === 'ask') { if (isHost() && from && !PARTY.requests.some(m => m.id === from)) { PARTY.requests.push({ id: from, name: o.name || '?' }); pRender(); } }
  else if (ev === 'chat') {
    if (!o.id || PARTY.chat.some(c => c.id === o.id)) return;
    PARTY.chat.push({ id: o.id, from, name: o.name || '?', text: String(o.text || '').slice(0, 300), mine: false, at: Date.now() });
    if (PARTY.chat.length > 200) PARTY.chat.shift();
    if (!$('.sheet.party')) PARTY.unread++;
    pRender(); pSheetRefresh();
  } else if (ev === 'react') pFloat(o.emoji, o.name);
}
function pPresence() {
  const before = new Set(PARTY.members.map(m => m.id));
  PARTY.members = Object.entries(PARTY.presence).map(([k, metas]) => { const m = metas[metas.length - 1] || {}; return { id: m.id || k, name: m.name || '?', device: m.device || 'phone', joinedAt: +m.joinedAt || 0 }; })
    .sort((a, b) => a.joinedAt - b.joinedAt);
  const now = new Set(PARTY.members.map(m => m.id));
  if (before.size) for (const id of now) if (!before.has(id) && id !== PARTY.id) toast(pName(id) + ' ' + T('joined'));
  PARTY.requests = PARTY.requests.filter(m => now.has(m.id));
  const host = PARTY.hostId;
  if (host && !now.has(host) && now.has(PARTY.id)) {
    clearTimeout(PARTY.hostCheck);
    PARTY.hostCheck = setTimeout(() => {
      const ids = PARTY.members.map(m => m.id);
      if (!PARTY.code || PARTY.hostId !== host || ids.includes(host) || !ids.length) return;
      PARTY.hostId = ids[0];
      if (!PARTY.controllerId || !ids.includes(PARTY.controllerId)) PARTY.controllerId = ids[0];
      if (isHost()) { toast("You're now the host"); pPublish(); } else toast(pName(ids[0]) + ' ' + T('is now the host'));
      pRender();
    }, 10000);
  } else if (PARTY.controllerId && !now.has(PARTY.controllerId) && isHost()) { PARTY.controllerId = PARTY.id; pPublish(); }
  pRender(); pSheetRefresh();
}
function partyChat(text) {
  text = String(text || '').trim().slice(0, 300); if (!text || !PARTY.code) return;
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  PARTY.chat.push({ id, from: PARTY.id, name: myName(), text, mine: true, at: Date.now() });
  pCast('chat', { id, from: PARTY.id, name: myName(), text }); pRender(); pSheetRefresh();
}
function partyReact(e) { pFloat(e, myName()); pCast('react', { from: PARTY.id, name: myName(), emoji: e }); }
function partyGive(id) { if (!isHost()) return; PARTY.controllerId = id; PARTY.requests = PARTY.requests.filter(m => m.id !== id); pCast('control', { from: PARTY.id, controller: id }); if (id === PARTY.id) pPublish(); pRender(); pSheetRefresh(); }

/**
 * How a follower catches up (same rules as the apps): never act while the video is loading, wait a few seconds
 * after a jump, jump *ahead* by the time this device needs to load, and nudge the speed only for small drift.
 */
function pPlan(i) {
  const play = i.localPlaying !== i.remotePlaying ? i.remotePlaying : null;
  if (!i.ready || i.now - i.lastSeekAt < 3500) return { play, seekTo: null, speed: i.rate, strikes: 0 };
  const diff = i.expected - i.localPos;
  const jump = () => ({ play, seekTo: Math.max(0, i.expected + (i.remotePlaying ? i.seekLead : 0)), speed: i.rate, strikes: 0 });
  if (i.forceSeek && Math.abs(diff) > 800) return jump();
  const tol = !i.remotePlaying ? 800 : i.canChangeSpeed ? 4000 : 2500;
  if (Math.abs(diff) > tol) { const k = i.strikes + 1; return k >= 3 || !i.remotePlaying ? jump() : { play, seekTo: null, speed: i.rate, strikes: k }; }   // only drift that lasts ≈1.5 s
  if (i.canChangeSpeed && i.remotePlaying && Math.abs(diff) > 300) { const k = Math.abs(diff) > 1000 ? .08 : .04; return { play, seekTo: null, speed: i.rate * (diff > 0 ? 1 + k : 1 - k), strikes: 0 }; }
  return { play, seekTo: null, speed: i.rate, strikes: 0 };
}
PARTY.lastSeekAt = 0; PARTY.seekLead = 1000; PARTY.waitingSeek = false; PARTY.strikes = 0; PARTY.forceNext = false;
/** Called by the player: follow whoever's in control. */
function pSync() {
  const v = PLAYER.v, r = PARTY.remote;
  if (!v || !PARTY.code || isCtl() || PARTY.detached || !r || reqKey(PLAYER.req) !== pKey(PARTY.title)) { if (v && PARTY.code && !isCtl() && !r) v.playbackRate = 1; return; }
  const now = performance.now(), ready = v.readyState >= 3 && !v.seeking;
  // A jump landed: aim better next time by how far behind (+) or ahead (−) it landed
  if (PARTY.waitingSeek && ready && r.playing) { PARTY.waitingSeek = false; PARTY.seekLead = Math.min(8000, Math.max(0, PARTY.seekLead + (pExpected() - v.currentTime * 1000) * .7)); }
  const plan = pPlan({ ready, localPlaying: !v.paused, localPos: v.currentTime * 1000, remotePlaying: r.playing, expected: pExpected(), rate: r.rate,
    now, lastSeekAt: PARTY.lastSeekAt, seekLead: PARTY.seekLead, canChangeSpeed: true, strikes: PARTY.strikes, forceSeek: PARTY.forceNext });
  PARTY.strikes = plan.strikes;
  if (PARTY.forceNext && ready && now - PARTY.lastSeekAt >= 3500 && plan.seekTo == null && Math.abs(pExpected() - v.currentTime * 1000) <= 800) PARTY.forceNext = false;
  if (plan.play === true) { PARTY.applyUntil = Date.now() + 1500; v.play().catch(() => {}); }
  else if (plan.play === false) { PARTY.applyUntil = Date.now() + 1500; v.pause(); }
  if (plan.seekTo != null) { PARTY.ourSeeks++; PARTY.lastSeekAt = now; PARTY.waitingSeek = true; PARTY.forceNext = false; v.currentTime = plan.seekTo / 1000; }
  if (Math.abs(v.playbackRate - plan.speed) > .001) v.playbackRate = plan.speed;
}
PARTY.ourSeeks = 0;
function pLocal(kind) {
  if (!PARTY.code) return;
  if (kind === 'seek' && PARTY.ourSeeks > 0) { PARTY.ourSeeks--; return; }   // one of our own catch-up jumps finished
  if (kind !== 'seek' && Date.now() < PARTY.applyUntil) return;
  if (!isCtl() && PLAYER.v && PLAYER.v.readyState < 3 && kind !== 'seek') return;
  if (isCtl()) return pPublish(kind === 'seek');
  if (PARTY.remote) { PARTY.detached = true; pRender(); } }

async function pOpenTitle(t) {
  if (isCtl() || PARTY.opening === pKey(t)) return;
  PARTY.opening = pKey(t);
  try {
    let imdb = t.imdbId;
    if (!imdb) { const d = await api.details(t.type, t.tmdbId).catch(() => null); imdb = d && (d.imdb_id || d.external_ids?.imdb_id); }
    const streams = imdb ? await getStreams(t.type, imdb, t.season ?? undefined, t.episode ?? undefined).catch(() => []) : [];
    const pick = streams.find(s => s.addon === t.addon) || streams[0];
    if (pKey(PARTY.title) !== pKey(t) || !PARTY.code) return;
    const base = { title: t.title, subtitle: t.subtitle, type: t.type, id: t.tmdbId, imdb, season: t.season ?? undefined, episode: t.episode ?? undefined, poster: t.poster, backdrop: t.backdrop };
    const req = pick ? Object.assign(base, { url: pick.url, addon: pick.addon }) : t.url ? Object.assign(base, { url: t.url, addon: t.addon }) : null;
    if (!req) return toast('None of your add-ons has this title — ask the host to share their stream');
    req.start = pExpected();
    PLAYER.req = req;
    PARTY.applyUntil = Date.now() + 8000;   // the player's own start-up play/seek is not "you paused"
    if (location.hash !== '#/play') location.hash = '#/play';
    openPlayer();
  } finally { PARTY.opening = null; }
}

// ---- party UI (player overlay + sheet + floating reactions)
function pFloat(emoji, name) {
  const host = PLAYER.el || document.body;
  const f = document.createElement('div'); f.className = 'p-react';
  f.style.setProperty('--x', (Math.random() * 60 - 30) + 'px');
  f.innerHTML = `<span>${esc(String(emoji || '').slice(0, 8))}</span><small>${esc(name || '')}</small>`;
  host.appendChild(f); setTimeout(() => f.remove(), 2700);
}
function pRender() {
  // badge on the player's party button
  const b = $('#pparty'); if (b) b.dataset.badge = PARTY.code ? (PARTY.unread || PARTY.members.length || '') : '';
  const el = PLAYER.el;
  let ov = $('#pov');
  if (!el || !PARTY.code) { ov?.remove(); pPill(); return; }
  if (!ov) { ov = document.createElement('div'); ov.id = 'pov'; ov.className = 'p-ov'; el.appendChild(ov); }
  const recent = PARTY.chat.filter(c => Date.now() - c.at < 8000).slice(-3);
  ov.innerHTML = `<div class="p-who"><i class="${PARTY.connected ? 'on' : ''}"></i>🎉 ${esc(PARTY.code)} · ${PARTY.members.length}${PARTY.controllerId ? ` <small>🎮 ${esc(isCtl() ? T('you') : pName(PARTY.controllerId))}</small>` : ''}</div>
    <div class="p-chat">${recent.map(c => `<div><b>${esc(c.mine ? T('You') : c.name)}</b> ${esc(c.text)}</div>`).join('')}</div>
    ${PARTY.detached && !isCtl() ? `<button class="p-sync" id="psync">${ic('sync')}${T('Back in sync with the party')}</button>` : ''}
    ${isHost() && PARTY.requests.length ? `<div class="p-ask">🎮 ${esc(PARTY.requests[PARTY.requests.length - 1].name)} ${T('asks for control')} <button id="pallow">${T('Allow')}</button></div>` : ''}`;
  $('#psync', ov)?.addEventListener('click', e => { e.stopPropagation(); PARTY.detached = false; pSync(); pRender(); });
  $('#pallow', ov)?.addEventListener('click', e => { e.stopPropagation(); partyGive(PARTY.requests[PARTY.requests.length - 1].id); });
  pPill();
}
setInterval(() => { if (PARTY.code && PLAYER.el) pRender(); }, 2000);   // let chat bubbles fade
function pPill() {
  let pill = $('#ppill');
  if (!PARTY.code || PLAYER.el) { pill?.remove(); return; }
  if (!pill) { pill = document.createElement('div'); pill.id = 'ppill'; pill.className = 'party-pill'; document.body.appendChild(pill); }
  pill.innerHTML = `🎉 ${T('Watch party')} ${esc(PARTY.code)} · ${PARTY.members.length}<button id="ppopen">${T('Open')}</button><button id="ppx" aria-label="${T('Leave party')}">✕</button>`;
  $('#ppopen', pill).onclick = () => PARTY.title ? pOpenTitle(PARTY.title) : toast('Waiting for the host to start playing…');
  $('#ppx', pill).onclick = () => partyLeave();
}
function pSheetRefresh() { if ($('.sheet.party')) partySheet(); }
function partySheet() {
  const r = PLAYER.req, can = r && r.id && r.type && !r.local && !r.live;
  PARTY.unread = 0;
  const dev = d => d === 'tv' ? '📺' : d === 'web' ? '🌐' : '📱';
  const body = !PARTY.code ? `<div class="pbody">
      <p class="dim">${T("Watch together in sync. Everyone plays from their own add-ons; the host's stream is shared as a backup.")}</p>
      <button class="btn acc" id="pcreate" ${can ? '' : 'disabled'}>${T('Start a watch party')}</button>
      <b>${T('Join with a code')}</b><form id="pjoin" class="prow"><input class="field" id="pjc" placeholder="ABC123" maxlength="8" autocapitalize="characters" autocomplete="off"><button class="btn tonal">${T('Join')}</button></form></div>`
    : `<div class="pbody">
      <div class="pcode"><div><small class="dim">${T('Party code')}</small><b>${esc(PARTY.code.replace(/(.{3})/, '$1 '))}</b><small class="acc">${isHost() ? T("You're the host") : T('Host') + ': ' + esc(pName(PARTY.hostId))}</small></div>
        ${window.qrcode ? (() => { const q = qrcode(0, 'M'); q.addData(inviteUrl()); q.make(); return `<span class="pqr">${q.createSvgTag({ cellSize: 3, margin: 2, scalable: true })}</span>`; })() : ''}</div>
      <button class="btn tonal" id="pshare">${ic('open')}${T('Share invite')}</button>
      <div class="preacts">${REACTS.map(e => `<button data-re="${e}">${e}</button>`).join('')}</div>
      ${isHost() ? PARTY.requests.map(m => `<div class="preq">${esc(m.name)} ${T('asks for control')} <button data-give="${esc(m.id)}">${T('Allow')}</button></div>`).join('') : ''}
      <small class="dim">${T('Watching')} · ${PARTY.members.length}</small>
      ${PARTY.members.map(m => `<div class="pmem"><span class="av">${esc(m.name.slice(0, 1).toUpperCase())}</span><div><b>${esc(m.name)}${m.id === PARTY.id ? ` (${T('you')})` : ''}</b>
        <small>${dev(m.device)} ${m.id === PARTY.hostId ? `<em>${T('Host')}</em>` : ''} ${m.id === PARTY.controllerId ? `<em class="g">🎮 ${T('In control')}</em>` : ''}</small></div>
        ${isHost() && m.id !== PARTY.id ? `<button data-give="${esc(m.id === PARTY.controllerId ? PARTY.id : m.id)}">${T(m.id === PARTY.controllerId ? 'Take back' : 'Give control')}</button>` : ''}</div>`).join('')}
      ${!isCtl() ? `<button class="btn outline" id="pask" ${PARTY.asked ? 'disabled' : ''}>${T(PARTY.asked ? 'Asked the host…' : 'Ask for control')}</button>` : ''}
      ${isHost() ? `<div class="set-row" style="padding:0"><div><b>${T('Share my stream as a backup')}</b><small>${T("For friends whose add-ons can't find this title")}</small></div><button class="switch ${PARTY.shareStream ? 'on' : ''}" id="pss"></button></div>` : ''}
      <small class="dim">${T('Chat')}</small>
      <div class="pchat-list">${PARTY.chat.map(c => `<div class="${c.mine ? 'me' : ''}">${c.mine ? '' : `<b>${esc(c.name)}</b>`}<span>${esc(c.text)}</span></div>`).join('') || `<p class="dim">${T('Say hi 👋')}</p>`}</div>
      <div class="pquick">${QUICK_MSGS.map((m, i) => `<button data-q="${i}">${T(m)}</button>`).join('')}</div>
      <form id="pmsg" class="prow"><input class="field" id="pmt" placeholder="${T('Message')}" maxlength="300" autocomplete="off"><button class="btn acc">${T('Send')}</button></form>
      <button class="btn outline danger" id="pleave">${T('Leave party')}</button></div>`;
  const root = sheet('Watch party', [], body);
  $('.sheet', root).classList.add('party');
  const L = $('.pchat-list', root); if (L) L.scrollTop = L.scrollHeight;
  $('#pcreate', root)?.addEventListener('click', () => { partyCreate(); partySheet(); });
  $('#pjoin', root)?.addEventListener('submit', e => { e.preventDefault(); partyJoin($('#pjc', root).value); partySheet(); });
  $('#pshare', root)?.addEventListener('click', () => { const text = T('Join my Lumio watch party') + ': ' + PARTY.code; if (navigator.share) navigator.share({ title: 'Lumio', text, url: inviteUrl() }).catch(() => {}); else navigator.clipboard?.writeText(text + '\n' + inviteUrl()).then(() => toast('Link copied')); });
  root.querySelectorAll('[data-re]').forEach(b => b.onclick = () => partyReact(b.dataset.re));
  root.querySelectorAll('[data-give]').forEach(b => b.onclick = () => partyGive(b.dataset.give));
  $('#pask', root)?.addEventListener('click', () => { PARTY.asked = true; pCast('ask', { from: PARTY.id, name: myName() }); partySheet(); });
  $('#pss', root)?.addEventListener('click', () => { PARTY.shareStream = !PARTY.shareStream; pPublish(); partySheet(); });
  root.querySelectorAll('[data-q]').forEach(b => b.onclick = () => partyChat(T(QUICK_MSGS[+b.dataset.q])));
  $('#pmsg', root)?.addEventListener('submit', e => { e.preventDefault(); const i = $('#pmt', root); partyChat(i.value); i.value = ''; });
  $('#pleave', root)?.addEventListener('click', () => { partyLeave(); closeSheet(); });
}
/** "#/party/CODE" invite links (and the Settings join box). */
function partyView(code) {
  renderNav(null);
  if (code) partyJoin(code);
  view.innerHTML = `<div class="gutter" style="padding-top:calc(30px + var(--safe-t))"><h1 class="page-title" style="padding-top:0">🎉 ${T('Watch party')}</h1>
    <div class="card"><div class="set-row" style="display:block"><b>${PARTY.code ? T('Joining party') + ' ' + esc(PARTY.code) + '…' : T('Join with a code')}</b>
      <small>${T('Waiting for the host to start playing…')}</small>
      <form id="pjoin2" class="prow" style="padding-top:12px"><input class="field" id="pjc2" placeholder="ABC123" value="${esc(PARTY.code || '')}" maxlength="8" autocapitalize="characters"><button class="btn acc">${T('Join')}</button></form></div></div></div>`;
  $('#pjoin2').onsubmit = e => { e.preventDefault(); partyJoin($('#pjc2').value); partyView(); };
}

// ============================================================================ boot
CD = raw.get(cacheKey(), {}) || {};
if (SESSION) loadSyncState();
if (SESSION) { PROFILE_ID = raw.get('lumio.activeProfile.' + SESSION.uid, MAIN); if (!profiles().some(p => p.id === PROFILE_ID)) PROFILE_ID = MAIN; }
loadProfileData();
applyTheme(); applyLang();
playIntro();
if (location.hash === '#/play') history.replaceState(null, '', '#/home');
let PENDING_PARTY = (location.hash.match(/^#\/party\/([A-Za-z0-9]{4,8})/) || [])[1] || null;
if (location.hash.startsWith('#/tv')) tvLinkView();   // opened from the QR code on Lumio TV
else if (!SESSION) loginView();
else {
  profilesView();   // "Who's watching?" on every launch
  // Fetch the latest from the account (changes made on the phone app or another browser)
  refreshFromCloud();
}
/**
 * Startup animation: the wand writes the L and the light blooms (same video as the apps, portrait or landscape to
 * fit the screen). Once per visit, only when opening the site normally; any key, click or tap skips it.
 * Browsers don't allow sound before you've touched the page, so it plays muted when they say no.
 */
function playIntro() {
  try {
    if (S.intro === false || sessionStorage.getItem('lumio.intro')) return;
    if (location.hash && !/^#\/?(home)?$/.test(location.hash)) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    sessionStorage.setItem('lumio.intro', '1');
  } catch { return; }
  const wide = innerWidth > innerHeight;
  const box = document.createElement('div'); box.className = 'intro';
  box.innerHTML = `<video playsinline preload="auto" src="intro-${wide ? 'landscape' : 'portrait'}.mp4?v=midnight"></video>`;
  document.body.appendChild(box);
  const v = box.querySelector('video');
  let gone = false;
  const done = () => {
    if (gone) return; gone = true; v.pause();
    box.classList.add('out'); setTimeout(() => box.remove(), 340);
    removeEventListener('keydown', done, true);
  };
  v.onended = done; v.onerror = done;
  box.addEventListener('pointerdown', done);
  addEventListener('keydown', done, true);
  setTimeout(done, 7000);
  v.muted = S.introSound === false;
  v.play().catch(() => { v.muted = true; v.play().catch(done); });
}

/** Download the latest and, if anything changed, apply it right away (colours, language, profiles, history…). */
async function refreshFromCloud() {
  const before = JSON.stringify(CD);
  try { await cloudPull(); } catch { return; }
  if (JSON.stringify(CD) !== before) applyCloudChanges();
}
function applyCloudChanges() {
  if (!profiles().some(p => p.id === PROFILE_ID)) { PROFILE_ID = MAIN; if (PROFILE_CHOSEN) PROFILE_CHOSEN = false; }
  loadProfileData(); applyTheme(); applyLang();
  if (!PROFILE_CHOSEN) { if (document.querySelector('.welcome.profiles')) profilesView(); }
  else if (!PLAYER.el && !document.querySelector('.pop-bg, .sheet-bg, .welcome')) route();
}
// While the site is open, check for changes from other devices every minute
setInterval(() => { if (SESSION && !document.hidden && !PLAYER.el) refreshFromCloud(); }, 60000);
// Coming back to the tab after a while → pick up changes from other devices
let hiddenAt = 0;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { hiddenAt = Date.now(); cloudPush(); return; }
  if (SESSION && Date.now() - hiddenAt > 15000 && !PLAYER.el) refreshFromCloud();
});
