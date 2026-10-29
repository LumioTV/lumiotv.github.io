/* Original animated genre scenes, drawn live on <canvas>. One shared animation loop,
   only canvases that are on screen are drawn (cheap on battery). */
(function () {
  const TAU = Math.PI * 2;
  const PERIOD = { tv_kw: 3200, tv_sa: 3200, tv_ae: 3200, tv_qa: 3200, tv_bh: 3200, tv_om: 3200, tv_eg: 3200, tv_iq: 3200, tv_jo: 3200, tv_lb: 3200, tv_tr: 3200, thriller: 1600, crime: 1200, music: 1400, reality: 1500, documentary: 5000, history: 5000, western: 5000, drama: 4200, war: 4200 };
  const items = new Set();
  const visible = new WeakSet();
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target))) : null;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function seeds(key) { let h = 0; for (const c of key) h = (h * 31 + c.charCodeAt(0)) | 0; return Array.from({ length: 28 }, (_, i) => (((h * 31 + i * 7919) & 0xffff) / 65535)); }
  const sin = Math.sin, cos = Math.cos, abs = Math.abs;
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
  function circle(c, x, y, r, fill) { c.beginPath(); c.arc(x, y, Math.max(r, .1), 0, TAU); c.fillStyle = fill; c.fill(); }
  function ring(c, x, y, r, stroke, lw) { c.beginPath(); c.arc(x, y, Math.max(r, .1), 0, TAU); c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); }
  function line(c, x1, y1, x2, y2, col, lw) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.stroke(); }
  function oval(c, x, y, w, h, fill, stroke) { c.beginPath(); c.ellipse(x + w / 2, y + h / 2, Math.max(w / 2, .1), Math.max(h / 2, .1), 0, 0, TAU); if (stroke) { c.strokeStyle = fill; c.lineWidth = stroke; c.stroke(); } else { c.fillStyle = fill; c.fill(); } }
  function heart(c, x, y, s, fill) { c.beginPath(); c.moveTo(x, y + s * .35); c.bezierCurveTo(x - s * .9, y - s * .25, x - s * .45, y - s * .95, x, y - s * .45); c.bezierCurveTo(x + s * .45, y - s * .95, x + s * .9, y - s * .25, x, y + s * .35); c.fillStyle = fill; c.fill(); }
  function sparkle(c, x, y, r, fill) { c.beginPath(); c.moveTo(x, y - r); c.quadraticCurveTo(x, y, x + r, y); c.quadraticCurveTo(x, y, x, y + r); c.quadraticCurveTo(x, y, x - r, y); c.quadraticCurveTo(x, y, x, y - r); c.fillStyle = fill; c.fill(); }

  const tri = x => { const f = x - Math.floor(x); return 1 - abs(2 * f - 1); };
  const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16); return `rgb(${(n >> 16 & 255) * k | 0},${(n >> 8 & 255) * k | 0},${(n & 255) * k | 0})`; };
  /** Waving flag: a grid of tiles shifted and shaded by a travelling wave. */
  function flag(c, w, h, v, colorAt) {
    const cols = 30, rows = 12, cw = w / cols, rh = h / rows, amp = h * .05;
    for (let i = 0; i < cols; i++) { const u = (i + .5) / cols, ph = v * TAU - u * 5.5, dy = sin(ph) * amp * (.35 + u), k = .82 + .18 * cos(ph);
      for (let j = 0; j < rows; j++) { c.fillStyle = shade(colorAt(u, (j + .5) / rows), k); c.fillRect(i * cw, j * rh + dy - 1, cw + 1, rh + 2); } }
    const g = c.createLinearGradient(w * (v * 2 - .6), 0, w * (v * 2 - .1), 0); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.5, 'rgba(255,255,255,.14)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, h * .45, 0, h); d.addColorStop(0, 'rgba(0,0,0,0)'); d.addColorStop(1, 'rgba(0,0,0,.45)'); c.fillStyle = d; c.fillRect(0, 0, w, h);
  }
  /** Kuwait Towers: tall tower with two spheres, one with a single sphere, and the needle; tiles shimmer, beacon blinks. */
  function towers(c, w, h, v) {
    const sh = c.createLinearGradient(w * .45, 0, w, 0); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,.55)'); c.fillStyle = sh; c.fillRect(0, 0, w, h);
    const dark = '#0B1B2B', x0 = w * .74;
    const sphere = (x, cy, r, seed) => { circle(c, x, cy, r, dark); circle(c, x, cy, r * .86, 'rgba(63,167,181,.85)');
      for (let k = 0; k < 7; k++) { const a = k / 7 * TAU + v * TAU * .2; circle(c, x + cos(a) * r * .55, cy + sin(a) * r * .35, r * .09, `rgba(255,255,255,${.25 + .55 * (.5 + .5 * sin(v * TAU * 2 + k + seed))})`); } };
    line(c, x0, h, x0, h * .06, dark, w * .012); sphere(x0, h * .5, h * .17, 0); sphere(x0, h * .27, h * .085, 3);
    const x1 = x0 + w * .12; line(c, x1, h, x1, h * .3, dark, w * .01); sphere(x1, h * .58, h * .11, 5);
    const x2 = x0 - w * .09; line(c, x2, h, x2, h * .38, dark, w * .007);
    circle(c, x0, h * .06, h * .025, `rgba(255,59,59,${.3 + .7 * (sin(v * TAU * 3) + 1) / 2})`);
  }
  function burj(c, w, h, v) {
    const sh = c.createLinearGradient(w * .5, 0, w, 0); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,.5)'); c.fillStyle = sh; c.fillRect(0, 0, w, h);
    const x = w * .82; [[.3, 1], [.22, .82], [.15, .62], [.09, .44], [.05, .28]].forEach(([wf, top]) => { const ww = w * wf * .35; c.fillStyle = 'rgba(221,230,240,.92)'; c.fillRect(x - ww / 2, h * (1 - top * .92), ww, h * top * .92); });
    line(c, x, h * .12, x, -h * .05, '#DDE6F0', w * .006);
    for (let k = 0; k < 6; k++) circle(c, x + (k % 2 - .5) * w * .02, h * (1 - ((v + k / 6) % 1) * .85), h * .012, 'rgba(255,224,138,.8)');
  }
  function pyramids(c, w, h, v) {
    circle(c, w * (.62 + .04 * sin(v * TAU)), h * .32, h * .12, 'rgba(255,210,122,.9)');
    [[.78, .42, '#D9A441'], [.62, .30, '#C8913A'], [.92, .24, '#B98232']].forEach(([cx, s, col]) => { const X = w * cx, S2 = h * s; c.beginPath(); c.moveTo(X - S2, h); c.lineTo(X, h - S2 * 1.1); c.lineTo(X + S2, h); c.fillStyle = col; c.fill(); c.beginPath(); c.moveTo(X, h - S2 * 1.1); c.lineTo(X + S2, h); c.lineTo(X + S2 * .25, h); c.fillStyle = 'rgba(0,0,0,.25)'; c.fill(); });
  }

  const S = {
    action(c, w, h, v, s) {
      for (let k = 0; k < 3; k++) {
        const q = (v + k / 3) % 1, x = w * (.45 + .5 * s[k]), y = h * (.15 + .5 * s[k + 3]);
        const r = Math.min(w, h) * .55 * ease(q), a = 1 - q;
        const g = c.createRadialGradient(x, y, 0, x, y, Math.max(r, 1));
        g.addColorStop(0, `rgba(255,243,176,${a})`); g.addColorStop(.6, `rgba(255,122,0,${a * .6})`); g.addColorStop(1, 'rgba(255,122,0,0)');
        circle(c, x, y, r, g);
        for (let i = 0; i < 8; i++) { const an = i / 8 * TAU + k; line(c, x + cos(an) * r * .6, y + sin(an) * r * .6, x + cos(an) * r * 1.15, y + sin(an) * r * 1.15, `rgba(255,224,138,${a})`, 2.5); }
      }
    },
    adventure(c, w, h, v) {
      circle(c, w * .78, h * (.32 + .05 * sin(v * TAU)), h * .16, 'rgba(255,226,154,.8)');
      c.beginPath(); c.moveTo(0, h); c.lineTo(w * .22, h * .45); c.lineTo(w * .38, h * .7); c.lineTo(w * .6, h * .3); c.lineTo(w * .85, h * .75); c.lineTo(w, h * .55); c.lineTo(w, h); c.fillStyle = 'rgba(0,0,0,.35)'; c.fill();
      c.beginPath(); c.moveTo(w * .6, h * .3); c.lineTo(w * .53, h * .42); c.lineTo(w * .67, h * .42); c.fillStyle = 'rgba(255,255,255,.7)'; c.fill();
      for (let k = 0; k < 2; k++) oval(c, ((v + k * .5) % 1) * w * 1.4 - w * .2, h * (.12 + .15 * k), w * .22, h * .1, 'rgba(255,255,255,.35)');
      const bx = w * (.1 + .8 * v), by = h * (.25 + .06 * sin(v * TAU * 3)), f = 4 * sin(v * TAU * 8);
      line(c, bx - 6, by - f, bx, by, '#fff', 2); line(c, bx + 6, by - f, bx, by, '#fff', 2);
    },
    comedy(c, w, h, v) {
      const hop = abs(sin(v * Math.PI * 2)), r = h * .26, x = w * .72, y = h * .72 - hop * h * .4;
      const sq = hop < .12 ? (.12 - hop) / .12 * .2 : 0;
      c.save(); c.translate(x, y); c.scale(1 + sq, 1 - sq);
      circle(c, 0, 0, r, '#FFE066');
      const bl = (v * 3) % 1 > .9 ? .15 : 1;
      oval(c, -r * .45, -r * .35, r * .22, r * .3 * bl, '#5C4A00'); oval(c, r * .23, -r * .35, r * .22, r * .3 * bl, '#5C4A00');
      c.beginPath(); c.ellipse(0, r * .18, r * .55, r * .47, 0, .17, 2.97); c.strokeStyle = '#5C4A00'; c.lineWidth = r * .14; c.lineCap = 'round'; c.stroke();
      c.restore();
    },
    drama(c, w, h, v) {
      [[.15, 1], [.85, -1]].forEach(([x, d]) => {
        c.save(); c.translate(w * x, -h * .1); c.rotate((d * (20 + 25 * sin(v * TAU))) * Math.PI / 180);
        const g = c.createLinearGradient(0, 0, 0, h * 1.2); g.addColorStop(0, 'rgba(255,255,255,.45)'); g.addColorStop(1, 'rgba(255,255,255,0)');
        c.beginPath(); c.moveTo(-4, 0); c.lineTo(4, 0); c.lineTo(w * .22, h * 1.2); c.lineTo(-w * .22, h * 1.2); c.fillStyle = g; c.fill(); c.restore();
      });
      oval(c, w * .25, h * .82, w * .5, h * .18, `rgba(255,255,255,${.15 + .1 * sin(v * TAU * 2)})`);
    },
    scifi(c, w, h, v, s) {
      for (let i = 0; i < 12; i++) { const sp = .6 + s[i], x = w - ((v * sp * 2 + s[(i + 5) % 12]) % 1) * w * 1.2, y = h * s[(i + 3) % 12]; line(c, x, y, x + 10 * sp, y, `rgba(255,255,255,${.4 + .5 * s[i]})`, 1.6); }
      const x = w * .78, y = h * .38, g = c.createLinearGradient(x - 10, y - 10, x + 10, y + 10); g.addColorStop(0, '#9BE7FF'); g.addColorStop(1, '#1B6CA8');
      circle(c, x, y, h * .2, g);
      c.save(); c.translate(x, y); c.rotate((-18 + 6 * sin(v * TAU)) * Math.PI / 180); oval(c, -h * .36, -h * .07, h * .72, h * .14, 'rgba(255,255,255,.75)', 2.5); c.restore();
    },
    horror(c, w, h, v) {
      const fl = v > .08 && v < .12 ? .55 : v > .16 && v < .19 ? .3 : 0;
      if (fl) { c.fillStyle = `rgba(255,255,255,${fl})`; c.fillRect(0, 0, w, h); }
      const gx = w * .72 + w * .05 * sin(v * TAU), gy = h * .42 + h * .08 * sin(v * TAU * 2), r = h * .22;
      c.beginPath(); c.moveTo(gx - r, gy + r); c.lineTo(gx - r, gy); c.arc(gx, gy, r, Math.PI, 0); c.lineTo(gx + r, gy + r);
      for (let k = 0; k < 4; k++) { const x0 = gx + r - (k + 1) * r / 2; c.quadraticCurveTo(x0 + r / 4, gy + r * (k % 2 ? 1.25 : .7), x0, gy + r); }
      c.fillStyle = 'rgba(255,255,255,.85)'; c.fill();
      oval(c, gx - r * .45, gy - r * .2, r * .28, r * .38, '#000'); oval(c, gx + r * .15, gy - r * .2, r * .28, r * .38, '#000');
      for (let k = 0; k < 3; k++) oval(c, ((v + k / 3) % 1) * w * 1.3 - w * .3, h * (.78 + k * .06), w * .45, h * .14, 'rgba(255,255,255,.12)');
    },
    thriller(c, w, h, v) {
      const mid = h * .45; c.beginPath();
      for (let i = 0; i <= 60; i++) {
        const x = i / 60 * w, ph = ((i / 60) - v + 1) % 1;
        const y = ph > .4 && ph < .44 ? mid - (ph - .4) / .04 * h * .35 : ph >= .44 && ph < .48 ? mid - h * .35 + (ph - .44) / .04 * h * .55 : ph >= .48 && ph < .52 ? mid + h * .2 - (ph - .48) / .04 * h * .2 : mid;
        i ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.lineJoin = c.lineCap = 'round'; c.strokeStyle = 'rgba(255,77,77,.25)'; c.lineWidth = 7; c.stroke(); c.strokeStyle = '#FF4D4D'; c.lineWidth = 2.5; c.stroke();
    },
    anime(c, w, h, v, s) {
      for (let i = 0; i < 9; i++) {
        const q = (v + s[i]) % 1, x = w * (s[(i + 2) % 12] + .15 * sin(q * TAU + i)), y = q * h * 1.2 - h * .1;
        c.save(); c.translate(x, y); c.rotate(q * TAU * (i % 2 ? -1 : 1)); oval(c, -5, -3, 10, 6, 'rgba(255,193,218,.9)'); c.restore();
      }
    },
    animation(c, w, h, v) {
      c.globalCompositeOperation = 'screen';
      ['#7CFFCB', '#FFD166', '#4CC9F0'].forEach((col, k) => { const a = v * TAU + k * 2.1; circle(c, w * (.68 + .16 * cos(a)), h * (.42 + .18 * sin(a)), h * (.22 + .07 * sin(a * 2)), rgba(col, .6)); });
      c.globalCompositeOperation = 'source-over';
    },
    family(c, w, h, v) {
      ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'].forEach((col, i) => {
        const q = (v + i / 4) % 1, x = w * (.45 + .13 * i) + 4 * sin(q * TAU * 2), y = h * 1.2 - q * h * 1.6;
        line(c, x, y + 9, x + 3 * sin(q * TAU * 3), y + 24, 'rgba(255,255,255,.6)', 1.2);
        oval(c, x - 7, y - 9, 14, 18, col); circle(c, x - 3, y - 4, 2, 'rgba(255,255,255,.5)');
      });
    },
    romance(c, w, h, v, s) {
      for (let i = 0; i < 6; i++) { const q = (v + s[i]) % 1; heart(c, w * (.35 + .6 * s[(i + 4) % 12]) + 6 * sin(q * TAU), h * (1.1 - q * 1.2), 7 + 7 * s[(i + 1) % 12], `rgba(255,143,171,${(1 - q) * .95})`); }
    },
    crime(c, w, h, v) {
      const red = v < .5, p = sin((v % .5) / .5 * Math.PI);
      [[.15, '255,45,45', red], [.85, '45,107,255', !red]].forEach(([x, col, on]) => {
        const g = c.createRadialGradient(w * x, 0, 0, w * x, 0, w * .6); g.addColorStop(0, `rgba(${col},${on ? .75 * p : .1})`); g.addColorStop(1, `rgba(${col},0)`);
        c.fillStyle = g; c.fillRect(0, 0, w, h);
      });
    },
    mystery(c, w, h, v) {
      const a = v * TAU, x = w * (.65 + .18 * sin(a)), y = h * (.42 + .15 * sin(a * 2)), r = h * .2;
      circle(c, x, y, r, 'rgba(255,255,255,.18)'); ring(c, x, y, r, '#fff', 3);
      c.beginPath(); c.arc(x, y, r * .7, 3.49, 4.54); c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 2; c.stroke();
      line(c, x + r * .7, y + r * .7, x + r * 1.5, y + r * 1.5, '#fff', 5);
    },
    fantasy(c, w, h, v, s) {
      const mx = w * .8, my = h * .32, mr = h * .18;
      circle(c, mx, my, mr, '#FFF4C2'); circle(c, mx + mr * .45, my - mr * .2, mr, 'rgba(34,3,58,.85)');
      for (let i = 0; i < 7; i++) { const t = (sin((v + s[i]) * TAU * 2) + 1) / 2; sparkle(c, w * (.3 + .65 * s[(i + 3) % 12]), h * (.1 + .7 * s[(i + 6) % 12]), 2 + 5 * t, `rgba(255,255,255,${.3 + .7 * t})`); }
    },
    documentary(c, w, h, v) {
      const x = w * .75, y = h * .45, r = h * .3;
      circle(c, x, y, r, 'rgba(127,224,212,.25)'); ring(c, x, y, r, 'rgba(255,255,255,.8)', 1.8);
      for (let k = 0; k < 4; k++) { const wd = abs(cos(((v + k / 4) % 1) * Math.PI)) * r; oval(c, x - wd, y - r, wd * 2, r * 2, 'rgba(255,255,255,.55)', 1.2); }
      [-.5, 0, .5].forEach(f => { const yy = y + f * r, hf = Math.sqrt(1 - f * f) * r; line(c, x - hf, yy, x + hf, yy, 'rgba(255,255,255,.5)', 1.2); });
    },
    war(c, w, h, v, s) {
      [[.3, 1], [.8, -1]].forEach(([x, d]) => {
        c.save(); c.translate(w * x, h); c.rotate((d * 30 * sin(v * TAU) + d * 10) * Math.PI / 180);
        const g = c.createLinearGradient(0, -h, 0, 0); g.addColorStop(0, 'rgba(255,246,213,.45)'); g.addColorStop(1, 'rgba(255,246,213,0)');
        c.beginPath(); c.moveTo(-3, 0); c.lineTo(3, 0); c.lineTo(18, -h - 10); c.lineTo(-18, -h - 10); c.fillStyle = g; c.fill(); c.restore();
      });
      for (let i = 0; i < 6; i++) { const q = (v * 1.5 + s[i]) % 1; circle(c, w * s[(i + 7) % 12], h * (1 - q), 1.6, `rgba(255,179,71,${1 - q})`); }
    },
    history(c, w, h, v) {
      const x = w * .76, y = h * .45, hh = h * .32, hw = hh * .65, flip = v > .88, rot = flip ? (v - .88) / .12 * Math.PI : 0, fill = flip ? 1 : v / .88;
      c.save(); c.translate(x, y); c.rotate(rot);
      c.beginPath(); c.moveTo(-hw, -hh); c.lineTo(hw, -hh); c.lineTo(-hw, hh); c.lineTo(hw, hh); c.closePath(); c.fillStyle = 'rgba(255,255,255,.18)'; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2; c.stroke();
      const top = (1 - fill) * hh * .85;
      if (top > 1) { c.beginPath(); c.moveTo(-hw * top / hh, -top); c.lineTo(hw * top / hh, -top); c.lineTo(0, 0); c.fillStyle = '#FFC46B'; c.fill(); }
      const bot = fill * hh * .85;
      c.beginPath(); c.moveTo(-hw, hh); c.lineTo(hw, hh); c.lineTo(hw * (1 - bot / hh), hh - bot); c.lineTo(-hw * (1 - bot / hh), hh - bot); c.fillStyle = '#FFC46B'; c.fill();
      if (!flip) line(c, 0, 0, 0, hh - bot, '#FFC46B', 1.5);
      c.restore();
    },
    western(c, w, h, v) {
      const g = c.createRadialGradient(w * .8, h * .55, 0, w * .8, h * .55, h * .45); g.addColorStop(0, '#FFD27F'); g.addColorStop(1, 'rgba(255,140,66,0)');
      circle(c, w * .8, h * .55, h * .45, g); circle(c, w * .8, h * .6, h * .18, '#FFB347');
      c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(0, h * .78, w, h * .22);
      const x = v * w * 1.3 - w * .15, r = h * .12, y = h * .78 - r - abs(sin(v * TAU * 3)) * h * .1;
      c.save(); c.translate(x, y); c.rotate(v * TAU * 3);
      ring(c, 0, 0, r, '#C8A26B', 1.5); oval(c, -r, -r * .5, r * 2, r, '#C8A26B', 1.5);
      for (let k = 0; k < 4; k++) { c.rotate(Math.PI / 4); line(c, -r, 0, r, 0, '#C8A26B', 1.5); }
      c.restore();
    },
    music(c, w, h, v) {
      const bw = w * .05;
      for (let i = 0; i < 6; i++) { const hg = h * (.2 + .45 * abs(sin((v + i * .17) * TAU))); c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); (c.roundRect ? c.roundRect(w * .52 + i * bw * 1.6, h * .85 - hg, bw, hg, bw / 2) : c.rect(w * .52 + i * bw * 1.6, h * .85 - hg, bw, hg)); c.fill(); }
      const ny = h * (.35 - .1 * sin(v * TAU)), nx = w * .42; oval(c, nx - 6, ny + 8, 9, 7, '#fff'); line(c, nx + 2.5, ny + 11, nx + 2.5, ny - 6, '#fff', 2);
    },
    reality(c, w, h, v) {
      const m = 6, l = h * .2;
      [[m, m, 1, 1], [w - m, m, -1, 1], [m, h - m, 1, -1], [w - m, h - m, -1, -1]].forEach(([x, y, dx, dy]) => { line(c, x, y, x + l * dx, y, 'rgba(255,255,255,.8)', 2); line(c, x, y, x, y + l * dy, 'rgba(255,255,255,.8)', 2); });
      if (v < .6) circle(c, w - m - h * .25, m + h * .2, h * .07, '#FF3B30');
    },
    // ---- Live Sports (original drawings)
    // ---------- Live TV: waving flags + landmarks, and category scenes
    tv_kw(c, w, h, v) { flag(c, w, h, v, (x, y) => { const k = Math.min(1, x / .25); if (x <= .25 && y >= k / 3 && y <= 1 - k / 3) return '#000000'; return y < 1 / 3 ? '#007A3D' : y < 2 / 3 ? '#FFFFFF' : '#CE1126'; }); towers(c, w, h, v); },
    tv_sa(c, w, h, v) { flag(c, w, h, v, () => '#006C35'); c.beginPath(); for (let i = 0; i <= 40; i++) { const x = w * (.25 + .55 * i / 40), y = h * .22 + sin(i * .9 + v * TAU) * h * .035 + sin(v * TAU - x / w * 5.5) * h * .03; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.strokeStyle = '#fff'; c.lineWidth = h * .035; c.lineCap = 'round'; c.stroke(); const sy = h * .38 + sin(v * TAU - 2.5) * h * .03; line(c, w * .3, sy, w * .75, sy, '#fff', h * .03); },
    tv_ae(c, w, h, v) { flag(c, w, h, v, (x, y) => x < .25 ? '#CE1126' : y < 1 / 3 ? '#00732F' : y < 2 / 3 ? '#FFFFFF' : '#000000'); burj(c, w, h, v); },
    tv_qa(c, w, h, v) { flag(c, w, h, v, (x, y) => x < .3 + .06 * tri(y * 9) ? '#FFFFFF' : '#8A1538'); },
    tv_bh(c, w, h, v) { flag(c, w, h, v, (x, y) => x < .25 + .07 * tri(y * 5) ? '#FFFFFF' : '#CE1126'); },
    tv_om(c, w, h, v) { flag(c, w, h, v, (x, y) => x < .33 ? '#DB161B' : y < .34 ? '#FFFFFF' : y > .66 ? '#008000' : '#DB161B'); },
    tv_eg(c, w, h, v) { flag(c, w, h, v, (x, y) => y < 1 / 3 ? '#CE1126' : y < 2 / 3 ? '#FFFFFF' : '#000000'); pyramids(c, w, h, v); },
    tv_iq(c, w, h, v) { flag(c, w, h, v, (x, y) => (y > .42 && y < .58 && x > .3 && x < .7 && ((x * 20) | 0) % 2 === 0) ? '#007A3D' : y < 1 / 3 ? '#CE1126' : y < 2 / 3 ? '#FFFFFF' : '#000000'); },
    tv_jo(c, w, h, v) { flag(c, w, h, v, (x, y) => x < .5 * (1 - abs(2 * y - 1)) ? '#CE1126' : y < 1 / 3 ? '#000000' : y < 2 / 3 ? '#FFFFFF' : '#007A3D'); },
    tv_lb(c, w, h, v) { flag(c, w, h, v, (x, y) => (y < .25 || y > .75) ? '#ED1C24' : '#FFFFFF'); const cx = w * .5 + sin(v * TAU) * w * .01; for (let k = 0; k < 4; k++) { const y = h * (.28 + k * .12), s = w * (.07 + k * .035); c.beginPath(); c.moveTo(cx, y - h * .08); c.lineTo(cx - s, y + h * .06); c.lineTo(cx + s, y + h * .06); c.fillStyle = '#00A651'; c.fill(); } },
    tv_tr(c, w, h, v) {
      flag(c, w, h, v, () => '#E30A17');
      const u = .36, dy = sin(v * TAU - u * 5.5) * h * .05 * (.35 + u), cx = w * u, cy = h * .5 + dy, r = h * .25;
      circle(c, cx, cy, r, '#fff'); circle(c, cx + r * .25, cy, r * .8, '#E30A17');
      const sx = cx + r * 1.05, sr = r * .36; c.beginPath();
      for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5 + v * .6, rr = k % 2 ? sr * .42 : sr; const x = sx + cos(a) * rr, y = cy + sin(a) * rr; k ? c.lineTo(x, y) : c.moveTo(x, y); }
      c.closePath(); c.fillStyle = '#fff'; c.fill();
    },
    tv_kr(c, w, h, v) {
      c.fillStyle = '#F4F4F5'; c.fillRect(0, 0, w, h);
      const cx = w * .5, cy = h * .5, r = h * .26; c.save(); c.translate(cx, cy); c.rotate(v * TAU);
      c.beginPath(); c.arc(0, 0, r, Math.PI, 0); c.fillStyle = '#CD2E3A'; c.fill(); c.beginPath(); c.arc(0, 0, r, 0, Math.PI); c.fillStyle = '#0047A0'; c.fill();
      circle(c, r / 2, 0, r / 2, '#CD2E3A'); circle(c, -r / 2, 0, r / 2, '#0047A0'); c.restore();
      [[.22, .25, -33], [.78, .25, 33], [.22, .75, 33], [.78, .75, -33]].forEach(([x, y, a]) => { c.save(); c.translate(w * x, h * y); c.rotate(a * Math.PI / 180); c.fillStyle = '#111'; for (let k = -1; k <= 1; k++) c.fillRect(-h * .09, k * h * .045 - h * .015, h * .18, h * .03); c.restore(); });
      const d = c.createLinearGradient(0, h * .45, 0, h); d.addColorStop(0, 'rgba(0,0,0,0)'); d.addColorStop(1, 'rgba(0,0,0,.45)'); c.fillStyle = d; c.fillRect(0, 0, w, h);
    },
    tv_ramadan(c, w, h, v) {
      const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1F0B05'); g.addColorStop(1, '#3B1A0A'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      for (let k = 0; k < 10; k++) circle(c, w * ((k * .19 + .03) % 1), h * ((k * .29) % .45), h * .01, `rgba(255,255,255,${.3 + .7 * (sin(v * TAU * 2 + k * 1.9) + 1) / 2})`);
      const mr = h * .12; circle(c, w * .18, h * .24, mr, '#FFE9A8'); circle(c, w * .18 + mr * .42, h * .24 - mr * .1, mr * .85, '#241006');
      [[.55, 0], [.72, .35], [.88, .7]].forEach(([x, ph], k) => {
        const tx = w * x, len = h * (.28 + .1 * k), bw = h * .13, bh = h * .22, glow = .6 + .4 * (sin(v * TAU * 3 + k) + 1) / 2;
        c.save(); c.translate(tx, 0); c.rotate(sin(v * TAU + ph * TAU) * 10 * Math.PI / 180);
        line(c, 0, 0, 0, len, '#D4A64A', 2); circle(c, 0, len + bh / 2, bh, `rgba(255,179,71,${.25 * glow})`);
        c.fillStyle = '#D4A64A'; c.beginPath(); c.moveTo(-bw * .3, len); c.lineTo(bw * .3, len); c.lineTo(bw * .5, len + bh * .2); c.lineTo(-bw * .5, len + bh * .2); c.fill();
        c.fillStyle = `rgba(255,197,107,${glow})`; c.fillRect(-bw / 2, len + bh * .2, bw, bh * .6);
        for (let j = 0; j < 3; j++) line(c, -bw / 2 + j * bw / 2, len + bh * .2, -bw / 2 + j * bw / 2, len + bh * .8, '#8A5A1A', 1.5);
        c.fillStyle = '#D4A64A'; c.beginPath(); c.moveTo(-bw * .5, len + bh * .8); c.lineTo(bw * .5, len + bh * .8); c.lineTo(0, len + bh); c.fill(); c.restore();
      });
    },
    tv_ara(c, w, h, v) {
      const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0B1230'); g.addColorStop(1, '#1E3A8A'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      for (let k = 0; k < 14; k++) circle(c, w * ((k * .137 + .05) % 1), h * ((k * .311) % .6), h * .012, `rgba(255,255,255,${.3 + .7 * (sin(v * TAU * 2 + k * 1.7) + 1) / 2})`);
      const r = h * .14; circle(c, w * .78, h * .28, r, '#FFE9A8'); circle(c, w * .78 + r * .42 + sin(v * TAU) * r * .05, h * .28 - r * .12, r * .92, '#13245A');
      c.beginPath(); c.moveTo(0, h); for (let i = 0; i <= 20; i++) c.lineTo(w * i / 20, h * .78 + sin(i * .6 + v * TAU * .5) * h * .05); c.lineTo(w, h); c.fillStyle = '#3A2A12'; c.fill();
    },
    tv_news(c, w, h, v) {
      const cx = w * .72, cy = h * .42, r = h * .3; circle(c, cx, cy, r, 'rgba(255,255,255,.12)'); ring(c, cx, cy, r, 'rgba(255,255,255,.55)', 2);
      for (let k = 0; k < 4; k++) { const ew = abs(cos(((v + k / 4) % 1) * Math.PI)) * r * 2; oval(c, cx - ew / 2, cy - r, ew, r * 2, 'rgba(255,255,255,.45)', 1.5); }
      c.fillStyle = '#B91C1C'; c.fillRect(0, h * .8, w, h * .12);
      for (let k = 0; k < 8; k++) { const x = (((k * .22 - v) % 1) + 1) % 1 * w * 1.3 - w * .15; c.fillStyle = 'rgba(255,255,255,.8)'; c.fillRect(x, h * .835, w * .12, h * .05); }
    },
    tv_sports(c, w, h, v) {
      line(c, w / 2, 0, w / 2, h, 'rgba(255,255,255,.25)', 2); ring(c, w / 2, h / 2, h * .25, 'rgba(255,255,255,.25)', 2);
      const x = w * (.15 + .7 * tri(v)), y = h * .62 - abs(sin(v * TAU * 2)) * h * .35; oval(c, x - h * .08, h * .8, h * .16, h * .04, 'rgba(0,0,0,.25)');
      circle(c, x, y, h * .09, '#fff'); circle(c, x, y, h * .03, '#000'); for (let k = 0; k < 5; k++) { const a = k / 5 * TAU + v * TAU * 2; circle(c, x + cos(a) * h * .062, y + sin(a) * h * .062, h * .018, '#000'); }
    },
    tv_kids(c, w, h, v) { const cols = ['#FF5A5F', '#3B82F6', '#FFD43B', '#22C55E', '#A855F7']; for (let k = 0; k < 5; k++) { const p = (v + k * .21) % 1, x = w * (.45 + k * .11) + sin(p * TAU + k) * w * .03, y = h * (1.15 - p * 1.3); line(c, x, y + h * .1, x + sin(p * TAU * 2) * 6, y + h * .3, 'rgba(255,255,255,.5)', 1.5); oval(c, x - h * .07, y - h * .1, h * .14, h * .2, cols[k]); circle(c, x - h * .03, y - h * .05, h * .02, 'rgba(255,255,255,.45)'); } },
    tv_movies(c, w, h, v) {
      const y0 = h * .22, sh = h * .42, fw = sh * 1.1; c.fillStyle = 'rgba(0,0,0,.7)'; c.fillRect(0, y0, w, sh);
      let x = -fw + (v * fw * 3) % fw, k = 0; while (x < w) { c.fillStyle = `rgba(124,58,237,${.35 + .12 * (k % 3)})`; c.fillRect(x + 6, y0 + sh * .18, fw - 12, sh * .64); for (let j = 0; j < 4; j++) { c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(x + j * fw / 4 + 4, y0 + 3, fw / 8, sh * .08); c.fillRect(x + j * fw / 4 + 4, y0 + sh * .9, fw / 8, sh * .08); } x += fw; k++; }
    },
    tv_series(c, w, h, v) { const l = w * .55, t = h * .18, sw = w * .36, sh = h * .46, bars = ['#fff', '#FFD43B', '#22D3EE', '#22C55E', '#DB2777', '#EF4444', '#3B82F6'], sft = (v * bars.length) | 0; c.fillStyle = 'rgba(0,0,0,.6)'; c.fillRect(l - 6, t - 6, sw + 12, sh + 12); bars.forEach((_, i) => { c.fillStyle = bars[(i + sft) % bars.length]; c.fillRect(l + i * sw / bars.length, t, sw / bars.length + 1, sh); }); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(l, t + sh * ((v * 3) % 1), sw, sh * .06); },
    tv_music(c, w, h, v) { const n = 9, bw = w * .5 / n; for (let i = 0; i < n; i++) { const amp = .25 + .65 * abs(sin(v * TAU * 2 + i * .8) * cos(v * TAU + i * .3)); c.fillStyle = i % 2 ? '#EC4899' : '#FFC2E0'; c.fillRect(w * .45 + i * bw * 1.15, h * (.8 - amp * .6), bw, h * amp * .6); } },
    tv_religious(c, w, h, v) {
      for (let k = 0; k < 9; k++) circle(c, w * ((k * .17 + .05) % 1), h * ((k * .23) % .4 + .05), h * .012, `rgba(255,255,255,${.3 + .7 * (sin(v * TAU * 2 + k * 1.3) + 1) / 2})`);
      const r = h * .1; circle(c, w * .2, h * .25, r, '#FFE9A8'); circle(c, w * .2 + r * .4, h * .25 - r * .1, r * .85, '#0F766E');
      const cx = w * .7, col = '#042420'; c.beginPath(); c.arc(cx, h * .58, h * .2, Math.PI, 0); c.fillStyle = col; c.fill(); c.fillRect(cx - h * .22, h * .58, h * .44, h * .42); c.fillRect(cx + h * .3, h * .22, h * .06, h * .78); circle(c, cx + h * .33, h * .22, h * .045, col);
      c.fillStyle = `rgba(255,210,122,${.4 + .4 * (sin(v * TAU) + 1) / 2})`; c.fillRect(cx - h * .04, h * .72, h * .08, h * .14);
    },
    tv_documentary(c, w, h, v) { circle(c, w * .7, h * (.5 - .15 * sin(v * Math.PI)), h * .12, '#FFD27A'); c.beginPath(); c.moveTo(w * .35, h); c.lineTo(w * .6, h * .45); c.lineTo(w * .85, h); c.fillStyle = '#0B3A52'; c.fill(); c.beginPath(); c.moveTo(w * .55, h); c.lineTo(w * .82, h * .35); c.lineTo(w * 1.1, h); c.fillStyle = '#07263A'; c.fill(); const bx = w * (.3 + .6 * v), by = h * .25 + sin(v * TAU * 2) * h * .04, f = sin(v * TAU * 6) * h * .03; line(c, bx - h * .05, by - f, bx, by, '#fff', 2); line(c, bx, by, bx + h * .05, by - f, '#fff', 2); },
    tv_entertainment(c, w, h, v) { [.55, .9].forEach((x, k) => { const a = sin(v * TAU + k * 2) * .25, tx = w * x; c.beginPath(); c.moveTo(tx, h); c.lineTo(tx + (a - .18) * h * 2, -h * .1); c.lineTo(tx + (a + .18) * h * 2, -h * .1); const g = c.createLinearGradient(0, h, 0, 0); g.addColorStop(0, 'rgba(255,255,255,.28)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fill(); }); for (let k = 0; k < 8; k++) { const p = (v * 1.5 + k * .13) % 1; circle(c, w * (.5 + .45 * ((k * .37) % 1)), h * (.7 - p * .6), h * .015 * (1 + p), `rgba(255,224,138,${1 - p})`); } },
    tv_general(c, w, h, v) { const cx = w * .72, cy = h * .62; c.save(); c.translate(cx, cy); c.rotate(-Math.PI / 6); c.beginPath(); c.arc(0, 0, h * .2, 0, Math.PI); c.fillStyle = 'rgba(255,255,255,.85)'; c.fill(); c.restore(); line(c, cx, cy, cx + h * .12, cy - h * .2, 'rgba(255,255,255,.85)', 3); for (let k = 0; k < 3; k++) { const p = (v + k / 3) % 1; c.beginPath(); c.arc(cx + h * .12, cy - h * .2, Math.max(.1, h * .3 * p), -Math.PI * .45, -Math.PI * .05); c.strokeStyle = `rgba(255,255,255,${(1 - p) * .7})`; c.lineWidth = 2.5; c.stroke(); } },
    tv_business(c, w, h, v) { const pts = [.7, .62, .66, .5, .55, .38, .42, .25], n = Math.min(1, v * 1.2) * (pts.length - 1); c.beginPath(); for (let i = 0; i <= (n | 0); i++) { const x = w * (.4 + .55 * i / (pts.length - 1)), y = h * pts[i]; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.strokeStyle = '#86EFAC'; c.lineWidth = 3; c.stroke(); for (let i = 0; i < 6; i++) { const bh = h * (.12 + .08 * i) * (.8 + .2 * sin(v * TAU + i)); c.fillStyle = 'rgba(255,255,255,.15)'; c.fillRect(w * (.42 + i * .09), h * .9 - bh, w * .05, bh); } },
    tv_culture(c, w, h, v) { const cx = w * .75, cy = h * .5, r = h * .32; c.save(); c.translate(cx, cy); c.rotate(v * Math.PI / 2); for (let k = 0; k < 2; k++) { c.save(); c.rotate(k * Math.PI / 4); c.strokeStyle = 'rgba(255,255,255,.3)'; c.lineWidth = 2.5; c.strokeRect(-r * .7, -r * .7, r * 1.4, r * 1.4); c.restore(); } c.restore(); ring(c, cx, cy, r * .45, 'rgba(255,255,255,.35)', 2); circle(c, cx, cy, r * .12, `rgba(233,213,255,${.6 + .3 * sin(v * TAU)})`); },
    tv_playlist(c, w, h, v) { const cx = w * .75, cy = h * .7; circle(c, cx, cy, h * .04, '#fff'); for (let k = 0; k < 3; k++) { const p = (v + k / 3) % 1; c.beginPath(); c.arc(cx, cy, Math.max(.1, h * .5 * p), Math.PI * 1.22, Math.PI * 1.78); c.strokeStyle = `rgba(255,255,255,${(1 - p) * .8})`; c.lineWidth = 3; c.stroke(); } },
  };

  function frame(now) {
    for (const it of items) {
      if (!it.canvas.isConnected) { items.delete(it); continue; }
      if (io && !visible.has(it.canvas)) continue;
      const { canvas: cv } = it, dpr = Math.min(devicePixelRatio || 1, 2);
      const w = cv.clientWidth, h = cv.clientHeight;
      if (!w || !h) continue;
      if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
      const c = it.ctx; c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, h);
      const v = reduce ? .3 : (((now + it.offset) % it.period) / it.period);
      try { S[it.key](c, w, h, v, it.seeds); } catch (e) { /* never break the loop */ }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  window.GenreScenes = {
    has: key => key in S,
    /** Extra scene packs (franchise.js) plug in here. */
    register(map, periods) { Object.assign(S, map); Object.assign(PERIOD, periods || {}); },
    attach(canvas, key, index = 0) {
      if (!(key in S)) return;
      items.add({ canvas, key, ctx: canvas.getContext('2d'), period: PERIOD[key] || 3200, offset: index * 170, seeds: seeds(key) });
      io && io.observe(canvas);
    },
  };
})();
