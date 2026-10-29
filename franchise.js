/* Home → Franchises / Production Studios / Decades: original animated light & particle overlays
   (drawn on top of real TMDB artwork). Same looks as the Android & TV apps. Plugs into GenreScenes. */
(function () {
  if (!window.GenreScenes) return;
  const TAU = Math.PI * 2, sin = Math.sin, cos = Math.cos, abs = Math.abs, fl = Math.floor;
  const fract = x => x - fl(x);
  const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${Math.max(0, Math.min(1, a))})`; };
  const W = a => `rgba(255,255,255,${Math.max(0, Math.min(1, a))})`;
  function circle(c, x, y, r, fill) { c.beginPath(); c.arc(x, y, Math.max(r, .1), 0, TAU); c.fillStyle = fill; c.fill(); }
  function ringS(c, x, y, r, stroke, lw) { c.beginPath(); c.arc(x, y, Math.max(r, .1), 0, TAU); c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); }
  function line(c, x1, y1, x2, y2, col, lw) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.stroke(); }
  function ellipse(c, cx, cy, rx, ry, col, lw) { c.beginPath(); c.ellipse(cx, cy, Math.max(rx, .1), Math.max(ry, .1), 0, 0, TAU); if (lw) { c.strokeStyle = col; c.lineWidth = lw; c.stroke(); } else { c.fillStyle = col; c.fill(); } }
  function star4(c, x, y, r, fill) { c.beginPath(); c.moveTo(x, y - r); c.quadraticCurveTo(x, y, x + r, y); c.quadraticCurveTo(x, y, x, y + r); c.quadraticCurveTo(x, y, x - r, y); c.quadraticCurveTo(x, y, x, y - r); c.fillStyle = fill; c.fill(); }
  function glow(c, x, y, r, hex, a) { if (r <= 0) return; const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(hex, a)); g.addColorStop(1, rgba(hex, 0)); c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r); }
  function vgrad(c, w, h, y0, y1, stops) { const g = c.createLinearGradient(0, y0, 0, y1); stops.forEach(([o, col]) => g.addColorStop(o, col)); c.fillStyle = g; c.fillRect(0, Math.min(y0, y1), w, Math.abs(y1 - y0)); }
  function sweep(c, w, h, pos, a, wf = .18) { const x = -h + pos * (w + h + w * wf * 2); const g = c.createLinearGradient(x - w * wf, 0, x + w * wf, h * .6); g.addColorStop(0, W(0)); g.addColorStop(.5, W(a)); g.addColorStop(1, W(0)); c.fillStyle = g; c.fillRect(0, 0, w, h); }
  function bolt(c, w, h, v, s) {
    sweep(c, w, h, fract(v), .18);
    const f = v >= .1 && v <= .14 ? 1 - (v - .1) / .04 : v >= .18 && v <= .22 ? 1 - (v - .18) / .04 : 0;
    if (f <= 0) return;
    c.fillStyle = `rgba(191,227,255,${.22 * f})`; c.fillRect(0, 0, w, h);
    const k = v < .16 ? 3 : 11; let x = w * (.25 + .5 * s[k]); c.beginPath(); c.moveTo(x, 0);
    for (let i = 1; i <= 6; i++) { x += (s[(k + i) % s.length] - .5) * w * .18; c.lineTo(x, h * i / 6); }
    const m = Math.min(w, h); c.strokeStyle = `rgba(124,196,255,${.6 * f})`; c.lineWidth = m * .05; c.stroke(); c.strokeStyle = W(f); c.lineWidth = m * .015; c.stroke();
  }
  function embers(c, w, h, v, s, hex) {
    const u = Math.min(w, h);
    vgrad(c, w, h, h * .45, h, [[0, rgba(hex, 0)], [1, rgba(hex, .22 + .06 * sin(v * TAU * 2))]]);
    for (let i = 0; i < 18; i++) { const p = fract(v + s[i]), x = s[i + 5] * w + sin((v * 2 + s[i]) * TAU) * u * .08, y = h * (1.05 - 1.15 * p), a = (1 - p) * (.6 + .4 * sin((v * 5 + s[i]) * TAU));
      glow(c, x, y, u * .05, hex, a * .5); circle(c, x, y, u * (.008 + .01 * s[i + 9]), `rgba(255,224,160,${Math.max(0, a)})`); }
  }
  function fog(c, w, h, v, s, moon) {
    const u = Math.min(w, h);
    if (moon) { glow(c, w * .8, h * .22, u * .55, '#E3ECFF', .25); circle(c, w * .8, h * .22, u * .1, 'rgba(239,244,255,.85)'); }
    for (let i = 0; i < 5; i++) glow(c, (fract(v + s[i]) * 1.6 - .3) * w, h * (.55 + .4 * s[i + 6]), w * (.35 + .2 * s[i + 3]), '#CFD8DC', .16);
    if (!moon) glow(c, w / 2, h / 2, u * .6, '#8BFFB0', .08 * (.5 + .5 * sin(v * TAU * 3)));
  }
  function gear(c, x, y, r, teeth, rot, col) { c.save(); c.translate(x, y); c.rotate(rot); c.beginPath(); for (let i = 0; i < teeth * 2; i++) { const a0 = i * Math.PI / teeth, a1 = (i + 1) * Math.PI / teeth, rr = i % 2 ? r * .8 : r; i ? c.lineTo(cos(a0) * rr, sin(a0) * rr) : c.moveTo(cos(a0) * rr, sin(a0) * rr); c.lineTo(cos(a1) * rr, sin(a1) * rr); } c.closePath(); c.fillStyle = col; c.fill(); c.restore(); }

  const FX = {
    magic(c, w, h, v, s) { const u = Math.min(w, h);
      for (let i = 0; i < 14; i++) { const y = h * (1.1 - 1.2 * fract(v + s[i + 7])), x = s[i] * w + sin((v * 2 + s[i]) * TAU) * u * .06, tw = .5 + .5 * sin((v * 3 + s[i]) * TAU);
        glow(c, x, y, u * .09, '#FFD27A', .25 * tw); star4(c, x, y, u * (.025 + .03 * tw), rgba('#FFD27A', .35 + .55 * tw)); }
      glow(c, w * (.8 + .04 * sin(v * TAU)), h * .25, u * .5, '#FFB347', .22 + .06 * sin(v * TAU * 6)); },
    ember(c, w, h, v, s) { embers(c, w, h, v, s, '#FF8A3D'); },
    ring(c, w, h, v, s) { const u = Math.min(w, h), cx = w * .8, cy = h * .38, r = u * .24;
      glow(c, cx, cy, r * 2.4, '#FFB13B', .28 + .1 * sin(v * TAU * 2));
      const sx = Math.max(.12, abs(cos(v * TAU))); const g = c.createLinearGradient(cx - r, cy - r, cx + r, cy + r); g.addColorStop(0, '#FFE9A8'); g.addColorStop(.35, '#B8860B'); g.addColorStop(.6, '#FFD54F'); g.addColorStop(1, '#8B5A00');
      ellipse(c, cx, cy, r * sx, r, g, u * .055); ellipse(c, cx, cy, r * sx, r, W(.5), u * .01); embers(c, w, h, v, s, '#FF7A1A'); },
    comic(c, w, h, v) { const step = Math.min(w, h) * .12, cx = w * (.5 + .45 * cos(v * TAU)), cy = h * (.5 + .4 * sin(v * TAU)), M = Math.max(w, h);
      c.fillStyle = W(.1); for (let y = step / 2; y < h; y += step) for (let x = step / 2; x < w; x += step) { const r = step * .32 * Math.max(0, Math.min(1, 1 - Math.hypot(x - cx, y - cy) / M * 1.4)); if (r > .6) { c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); } }
      sweep(c, w, h, fract(v * 2), .28); },
    bolt,
    hearts(c, w, h, v, s) { const u = Math.min(w, h); glow(c, w * .8, h * .3, u * .8, '#FF4D8D', .22 + .06 * sin(v * TAU * 2));
      for (let i = 0; i < 12; i++) { const p = fract(v + s[i]), x = s[i + 6] * w + sin((v * 2 + s[i]) * TAU) * u * .08, y = h * (1.1 - 1.2 * p), r = u * (.05 + .05 * s[i + 12]);
        c.beginPath(); c.moveTo(x, y + r * .35); c.bezierCurveTo(x - r * .9, y - r * .25, x - r * .45, y - r * .95, x, y - r * .45); c.bezierCurveTo(x + r * .45, y - r * .95, x + r * .9, y - r * .25, x, y + r * .35); c.fillStyle = `rgba(255,111,163,${(1 - p) * .85})`; c.fill(); } },
    siren(c, w, h, v) { const u = Math.min(w, h), red = Math.pow(sin(v * TAU) * .5 + .5, 2), blue = Math.pow(sin(v * TAU + Math.PI) * .5 + .5, 2);
      glow(c, w * .15, h * .1, u * 1.1, '#FF2A2A', .45 * red); glow(c, w * .85, h * .1, u * 1.1, '#2A6BFF', .45 * blue); sweep(c, w, h, fract(v), .1, .08); },
    music(c, w, h, v, s) { const n = 16, bw = w / n;
      for (let i = 0; i < n; i++) { const bh = h * (.12 + .3 * (.5 + .5 * sin((v * (2 + i % 3) + s[i]) * TAU))), g = c.createLinearGradient(0, h - bh, 0, h); g.addColorStop(0, 'rgba(255,79,216,.8)'); g.addColorStop(1, 'rgba(124,92,255,.5)'); c.fillStyle = g; c.fillRect(i * bw + bw * .2, h - bh, bw * .6, bh); }
      FX.searchlights(c, w, h, v); },
    signal(c, w, h, v, s) { const u = Math.min(w, h), a = -1.15 + .12 * sin(v * TAU), bx = w * .12, by = h * 1.05, L = Math.max(w, h) * 1.1, tx = bx + cos(a) * L * .62, ty = by + sin(a) * L * .62;
      c.beginPath(); c.moveTo(bx, by); c.lineTo(bx + cos(a - .09) * L, by + sin(a - .09) * L); c.lineTo(bx + cos(a + .09) * L, by + sin(a + .09) * L); c.closePath();
      const g = c.createRadialGradient(bx, by, 0, bx, by, L * .9); g.addColorStop(0, 'rgba(255,243,196,.35)'); g.addColorStop(1, 'rgba(255,243,196,0)'); c.fillStyle = g; c.fill();
      glow(c, tx, ty, u * .45, '#FFE08A', .45 + .1 * sin(v * TAU * 3)); ringS(c, tx, ty, u * .13, 'rgba(255,240,184,.55)', u * .02);
      for (let i = 0; i < 4; i++) glow(c, (fract(v + s[i]) * 1.6 - .3) * w, h * (.1 + .2 * s[i + 4]), w * .3, '#9FB4D6', .16);
      for (let i = 0; i < 20; i++) { const p = fract(v * 3 + s[i]), x = s[(i + 5) % s.length] * w * 1.2 - p * w * .1, y = -h * .1 + p * h * 1.2; line(c, x, y, x - w * .012, y + h * .09, 'rgba(207,227,255,.35)', u * .006); }
      const f = v >= .42 && v <= .46 ? 1 - (v - .42) / .04 : v >= .5 && v <= .52 ? 1 - (v - .5) / .02 : 0; if (f > 0) { c.fillStyle = `rgba(221,232,255,${.3 * f})`; c.fillRect(0, 0, w, h); } },
    biolume(c, w, h, v, s) { const u = Math.min(w, h);
      for (let i = 0; i < 16; i++) { const p = fract(v + s[i]), x = s[i + 6] * w + sin((v + s[i]) * TAU * 2) * u * .1, y = h * (1.1 - 1.2 * p), tw = .55 + .45 * sin((v * 4 + s[i]) * TAU);
        glow(c, x, y, u * .1, i % 3 ? '#5CF2FF' : '#B57CFF', .35 * tw); circle(c, x, y, u * .012, W(.7 * tw)); } },
    speed(c, w, h, v, s) { const u = Math.min(w, h);
      for (let i = 0; i < 18; i++) { const len = w * (.18 + .3 * s[i]), x = w + len - fract(v * (1 + i % 2) + s[i + 4]) * (w + 2 * len), y = h * s[i + 9];
        const g = c.createLinearGradient(x, 0, x + len, 0); g.addColorStop(0, i % 4 ? W(.7) : 'rgba(255,160,77,.7)'); g.addColorStop(1, W(0)); line(c, x, y, x + len, y, g, u * .012); }
      glow(c, w * .12, h * .75, u * .35, '#FFE6A0', .25 + .1 * sin(v * TAU * 4)); },
    spotlight(c, w, h, v) { const u = Math.min(w, h), x = w * (.5 + .38 * sin(v * TAU)), y = h * (.45 + .1 * sin(v * TAU * 2));
      const g = c.createRadialGradient(x, y, 0, x, y, u * .75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.5, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      ringS(c, x, y, u * .4, W(.05), u * .02); sweep(c, w, h, fract(v * 2), .16, .1); },
    hyperspace(c, w, h, v, s) { const maxR = Math.max(w, h) * .7, m = Math.min(w, h);
      for (let i = 0; i < 26; i++) { const a = s[i % s.length] * TAU + i, d = fract(v * 2 + s[(i + 5) % s.length]), r0 = d * d * maxR, r1 = r0 + d * maxR * .2;
        line(c, w / 2 + cos(a) * r0, h / 2 + sin(a) * r0, w / 2 + cos(a) * r1, h / 2 + sin(a) * r1, W(d), m * (.004 + .012 * d)); } },
    ripple(c, w, h, v) { const cx = w * .72, cy = h * .72, m = Math.min(w, h);
      for (let k = 0; k < 3; k++) { const p = fract(v + k / 3), r = w * .45 * p; ellipse(c, cx, cy, r, r * .35, W(.35 * (1 - p)), m * .012); }
      for (let k = 0; k < 3; k++) ellipse(c, w * (.15 + .3 * k) + sin((v + k * .3) * TAU) * w * .03 + w * .125, h * .055, w * .125, h * .175, 'rgba(0,0,0,.18)'); },
    fuse(c, w, h, v, s) { const m = Math.min(w, h), pt = t => [w * (.04 + .92 * t), h * (.84 + .07 * sin(t * TAU * 1.5))], p = fract(v);
      for (let i = 0; i < 40; i++) { const a = i / 40, b = (i + 1) / 40, [x1, y1] = pt(a), [x2, y2] = pt(b); line(c, x1, y1, x2, y2, a < p ? 'rgba(58,58,58,.6)' : 'rgba(242,227,198,.8)', m * .018); }
      const [x, y] = pt(p); glow(c, x, y, m * .3, '#FFA733', .6);
      for (let i = 0; i < 8; i++) { const a = s[i] * TAU + v * TAU * 7, l = m * (.06 + .06 * (.5 + .5 * sin((v * 9 + s[i]) * TAU))); line(c, x, y, x + cos(a) * l, y + sin(a) * l, '#FFE08A', m * .008); }
      circle(c, x, y, m * .02, '#fff'); },
    waves(c, w, h, v) { for (let k = 0; k < 3; k++) { const base = h * (.68 + .1 * k); c.beginPath(); c.moveTo(0, h); c.lineTo(0, base);
        for (let x = 0; x <= w + 8; x += 8) c.lineTo(x, base + sin((x / w * 2 + v * (k + 1)) * TAU) * h * .04); c.lineTo(w, h); c.closePath(); c.fillStyle = `rgba(127,211,232,${.1 + .06 * k})`; c.fill(); }
      glow(c, w * .82, h * .22, Math.min(w, h) * .35, '#FFF0C2', .25); },
    sheen(c, w, h, v) { sweep(c, w, h, fract(v), .22, .12); sweep(c, w, h, fract(v + .5), .12, .06);
      for (let k = 0; k < 2; k++) { const tw = Math.pow(sin((v * 2 + k * .5) * TAU) * .5 + .5, 6); star4(c, w * (.2 + .6 * k), h * .2, Math.min(w, h) * .1 * tw, W(.8 * tw)); } },
    code(c, w, h, v, s) { const cols = 14, cw = w / cols, gh = cw * .9;
      for (let k = 0; k < cols; k++) { const sp = 1 + k % 2, head = fract(v * sp + s[k]) * (h + gh * 9) - gh;
        for (let j = 0; j < 9; j++) { const y = head - j * gh; if (y < -gh || y > h) continue;
          c.fillStyle = j ? `rgba(57,255,106,${.6 * (1 - j / 9)})` : 'rgba(215,255,224,.95)';
          const bits = Math.imul(k * 31 + j * 17 + fl(v * 12 * sp), 2654435761 | 0), x = k * cw + cw * .25;
          if (bits & 1) c.fillRect(x, y, cw * .5, gh * .12); if (bits & 2) c.fillRect(x, y, cw * .1, gh * .7); if (bits & 4) c.fillRect(x + cw * .4, y, cw * .1, gh * .7);
          if (bits & 8) c.fillRect(x, y + gh * .35, cw * .5, gh * .1); if (!(bits & 48)) c.fillRect(x, y + gh * .6, cw * .5, gh * .1); } } },
    neon(c, w, h, v, s) { const m = Math.min(w, h);
      for (let i = 0; i < 22; i++) { const p = fract(v * 2 + s[i]), x = s[i + 3] * w * 1.2 - p * w * .15, y = -h * .2 + p * h * 1.4; line(c, x, y, x - w * .02, y + h * .12, i % 2 ? 'rgba(79,195,255,.55)' : 'rgba(255,79,216,.55)', m * .008); }
      glow(c, w * .25, h, m * .6, '#FF4FD8', .2); glow(c, w * .8, h, m * .6, '#4FC3FF', .2); },
    dust(c, w, h, v, s) { const ox = -w * .05, oy = -h * .1, rot = 6 * sin(v * TAU) * Math.PI / 180;
      for (let k = 0; k < 4; k++) { const a = .18 + k * .16 + rot, L = w * 1.6; c.beginPath(); c.moveTo(ox, oy); c.lineTo(ox + cos(a) * L, oy + sin(a) * L); c.lineTo(ox + cos(a + .06) * L, oy + sin(a + .06) * L); c.closePath(); c.fillStyle = 'rgba(255,226,168,.1)'; c.fill(); }
      for (let i = 0; i < 16; i++) circle(c, fract(s[i] + v) * w, s[i + 8] * h + sin((v * 2 + s[i]) * TAU) * h * .06, Math.min(w, h) * .01, `rgba(255,233,194,${.35 + .3 * sin((v * 3 + s[i]) * TAU)})`); },
    firetrail(c, w, h, v, s) { const p = fract(v), end = w * 1.3 * p, m = Math.min(w, h);
      for (let k = 0; k < 2; k++) { const y = h * (.8 + .09 * k), g = c.createLinearGradient(end - w * .7, 0, end, 0); g.addColorStop(0, 'rgba(255,106,0,0)'); g.addColorStop(.8, 'rgba(255,106,0,.85)'); g.addColorStop(1, '#FFE08A'); line(c, end - w * .7, y, end, y, g, m * .03); }
      if (p < .12) { const a = 1 - p / .12; for (let k = 0; k < 3; k++) { let x = w * .15, y = h * (.3 + .15 * k); c.beginPath(); c.moveTo(x, y); for (let j = 0; j < 6; j++) { x += w * .12; y += (s[(k * 6 + j) % s.length] - .5) * h * .2; c.lineTo(x, y); } c.strokeStyle = `rgba(154,216,255,${a})`; c.lineWidth = m * .012; c.stroke(); } c.fillStyle = `rgba(191,230,255,${.12 * a})`; c.fillRect(0, 0, w, h); } },
    scan(c, w, h, v) { const y = (.5 + .5 * sin(v * TAU)) * h, m = Math.min(w, h);
      vgrad(c, w, h, y - h * .12, y + h * .12, [[0, 'rgba(255,42,26,0)'], [.5, 'rgba(255,42,26,.35)'], [1, 'rgba(255,42,26,0)']]); line(c, 0, y, w, y, '#FF5A4A', m * .008);
      const g = m * .1, l = m * .14; c.strokeStyle = 'rgba(255,90,74,.7)'; c.lineWidth = m * .012; c.beginPath(); c.moveTo(g, g + l); c.lineTo(g, g); c.lineTo(g + l, g); c.stroke(); c.beginPath(); c.moveTo(w - g - l, h - g); c.lineTo(w - g, h - g); c.lineTo(w - g, h - g - l); c.stroke();
      circle(c, w * .72, h * .35, m * .03, `rgba(255,90,74,${.5 + .5 * sin(v * TAU * 6)})`); },
    fog(c, w, h, v, s) { fog(c, w, h, v, s, false); },
    mist(c, w, h, v, s) { fog(c, w, h, v, s, true); },
    flash(c, w, h, v, s) { c.beginPath(); c.moveTo(w * .45, 0); c.lineTo(w * .55, 0); c.lineTo(w * .85, h); c.lineTo(w * .15, h); c.closePath(); const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, W(.16)); g.addColorStop(1, W(0)); c.fillStyle = g; c.fill();
      for (let i = 0; i < 8; i++) { const p = fract(v * 2 + s[i]); if (p < .07) glow(c, s[i + 8] * w, h * (.55 + .4 * s[i + 16]), Math.min(w, h) * .25, '#FFFFFF', .9 * (1 - p / .07)); } },
    candle(c, w, h, v) { const f = .85 + .08 * sin(v * TAU * 7) + .05 * sin(v * TAU * 13), x = w * .78, y = h * .4; glow(c, x, y, Math.min(w, h) * .9 * f, '#FF9A3C', .3);
      const g = c.createRadialGradient(x, y, 0, x, y, Math.max(w, h) * .75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); c.fillStyle = g; c.fillRect(0, 0, w, h); },
    sand(c, w, h, v, s) { vgrad(c, w, h, 0, h, [[0, 'rgba(255,180,107,.18)'], [1, 'rgba(255,180,107,0)']]);
      for (let i = 0; i < 26; i++) { const x = fract(v * (1 + i % 3) + s[i % s.length]) * w * 1.2 - w * .1, y = s[(i + 7) % s.length] * h + sin((v * 3 + s[i % s.length]) * TAU) * h * .05; line(c, x, y, x + w * .04, y, 'rgba(255,217,160,.5)', Math.min(w, h) * .01); } },
    roar(c, w, h, v, s) { const m = Math.min(w, h), M = Math.max(w, h);
      for (let k = 0; k < 3; k++) { const p = fract(v + k / 3); ringS(c, w * .7, h * .55, M * .6 * p, `rgba(143,227,255,${.4 * (1 - p)})`, m * (.03 * (1 - p) + .004)); }
      bolt(c, w, h, v, s); },
    bubbles(c, w, h, v, s) { const cols = ['#FFE066', '#8CE99A', '#74C0FC', '#FFA8A8', '#E599F7'], m = Math.min(w, h);
      for (let i = 0; i < 14; i++) { const p = fract(v + s[i]), r = m * (.04 + .06 * s[i + 6]), x = s[i + 12] * w + sin((v * 2 + s[i]) * TAU) * r, y = h + r - p * (h + 2 * r), col = cols[i % 5];
        circle(c, x, y, r, rgba(col, .18)); ringS(c, x, y, r, rgba(col, .6), m * .008); circle(c, x - r * .35, y - r * .35, r * .22, W(.7)); } },
    snow(c, w, h, v, s) { const m = Math.min(w, h);
      for (let i = 0; i < 22; i++) { const p = fract(v + s[i]), x = s[i + 4] * w + sin((v * 2 + s[i]) * TAU) * w * .04, y = -h * .05 + p * h * 1.1, r = m * (.008 + .016 * s[(i + 9) % s.length]);
        i % 5 ? circle(c, x, y, r, W(.75)) : star4(c, x, y, r * 2.4, W(.85)); } },
    petals(c, w, h, v, s) { const m = Math.min(w, h);
      for (let i = 0; i < 14; i++) { const p = fract(v + s[i]), x = (s[i + 5] * 1.3 - .15 + p * .25) * w, y = -h * .1 + p * h * 1.2, r = m * (.03 + .02 * s[i + 11]);
        c.save(); c.translate(x, y); c.rotate((v * 2 + s[i]) * TAU); ellipse(c, 0, 0, r, r * .5, 'rgba(255,193,214,.75)'); c.restore(); } },
    clouds(c, w, h, v, s) { const m = Math.min(w, h);
      for (let i = 0; i < 4; i++) { const x = (fract(v + s[i]) * 1.6 - .3) * w, y = h * (.2 + .6 * s[i + 4]), r = m * (.18 + .1 * s[i + 8]); for (let k = -1; k <= 1; k++) glow(c, x + k * r * .8, y - (k ? 0 : r * .3), r, '#FFFFFF', .22); }
      glow(c, w / 2, h / 2, m * .8, '#FFE6A8', .12 + .05 * sin(v * TAU * 2)); },
    globe(c, w, h, v) { const cx = w / 2, cy = h / 2, r = Math.min(w, h) * .62, lw = Math.min(w, h) * .006, col = W(.22);
      glow(c, cx, cy, r * 1.4, '#9CC8FF', .22); ringS(c, cx, cy, r, col, lw);
      for (let k = 0; k < 6; k++) { const a = (k + v) / 6 * Math.PI; ellipse(c, cx, cy, r * abs(cos(a)), r, col, lw); }
      for (let k = -2; k <= 2; k++) { const yy = cy + r * k / 3, hw = Math.sqrt(Math.max(0, r * r - (yy - cy) * (yy - cy))); line(c, cx - hw, yy, cx + hw, yy, col, lw); }
      glow(c, cx + cos(v * TAU) * r * 1.15, cy + sin(v * TAU) * r * .3, r * .35, '#FFF3C4', .6); },
    torch(c, w, h, v) { const x = w / 2, y = h * .15, f = .9 + .06 * sin(v * TAU * 5) + .04 * sin(v * TAU * 11), rot = 8 * sin(v * TAU) * Math.PI / 180;
      for (let k = 0; k < 9; k++) { const a = Math.PI / 2 + (k - 4) * .22 + rot; c.beginPath(); c.moveTo(x, y); c.lineTo(x + cos(a - .05) * w, y + sin(a - .05) * w); c.lineTo(x + cos(a + .05) * w, y + sin(a + .05) * w); c.closePath(); c.fillStyle = 'rgba(255,241,201,.08)'; c.fill(); }
      glow(c, x, y, Math.min(w, h) * .7 * f, '#FFE3A3', .45); },
    searchlights(c, w, h, v) { const L = Math.max(w, h) * 1.2;
      for (let k = 0; k < 4; k++) { const bx = w * (.15 + .23 * k), by = h * 1.05, a = -Math.PI / 2 + sin((v + k * .25) * TAU) * .45; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx + cos(a - .07) * L, by + sin(a - .07) * L); c.lineTo(bx + cos(a + .07) * L, by + sin(a + .07) * L); c.closePath();
        const g = c.createRadialGradient(bx, by, 0, bx, by, L * .8); g.addColorStop(0, W(.22)); g.addColorStop(1, W(0)); c.fillStyle = g; c.fill(); } },
    stars(c, w, h, v) { const cx = w / 2, cy = h * .62, rx = w * .36, ry = h * .42, m = Math.min(w, h);
      for (let k = 0; k < 12; k++) { const a = Math.PI + k / 11 * Math.PI, tw = Math.pow(.5 + .5 * cos((v - k / 12) * TAU), 3); star4(c, cx + cos(a) * rx, cy + sin(a) * ry, m * (.03 + .03 * tw), W(.35 + .6 * tw)); } },
    arc(c, w, h, v) { const m = Math.min(w, h), pt = t => [w * (.08 + .84 * t), h * (.75 - .6 * sin(t * Math.PI))], p = fract(v);
      for (let j = 0; j < 14; j++) { const t = p - j * .02; if (t < 0) break; const [x, y] = pt(t); circle(c, x, y, m * (.02 - j * .0012), W(.7 * (1 - j / 14))); }
      const [x, y] = pt(p); glow(c, x, y, m * .2, '#DDEBFF', .6);
      for (let k = 0; k < 10; k++) { const t = k / 10; if (t < p) { const [a, b] = pt(t); star4(c, a, b + h * .05, m * .015, W(.4)); } } },
    lamp(c, w, h, v) { const x = w * (.2 + .6 * abs(sin(v * Math.PI))), f = h * .88; c.beginPath(); c.moveTo(x - w * .04, 0); c.lineTo(x + w * .04, 0); c.lineTo(x + w * .22, f); c.lineTo(x - w * .22, f); c.closePath();
      const g = c.createLinearGradient(0, 0, 0, f); g.addColorStop(0, 'rgba(255,244,214,.2)'); g.addColorStop(1, 'rgba(255,244,214,.05)'); c.fillStyle = g; c.fill(); ellipse(c, x, f, w * .22, h * .05, 'rgba(255,244,214,.3)'); },
    moon(c, w, h, v, s) { const m = Math.min(w, h);
      for (let i = 0; i < 14; i++) { const tw = .5 + .5 * sin((v * 2 + s[i]) * TAU); circle(c, s[i + 7] * w, s[i + 14] * h * .8, m * (.006 + .008 * tw), W(.25 + .6 * tw)); }
      const x = w * .78, y = h * .32, r = m * .2; glow(c, x, y, r * 3, '#FFF3C4', .25 + .05 * sin(v * TAU));
      c.save(); c.beginPath(); c.arc(x, y, r, 0, TAU); c.arc(x + r * .45, y - r * .2, r * .9, 0, TAU, true); c.fillStyle = 'rgba(255,246,214,.9)'; c.fill('evenodd'); c.restore(); },
    gears(c, w, h, v) { const m = Math.min(w, h), r1 = m * .42, x1 = w * .22, y1 = h * .78, r2 = m * .3, x2 = x1 + r1 * .9 + r2 * .9, y2 = y1 - r2 * .6;
      gear(c, x1, y1, r1, 12, v * TAU / 6, W(.1)); gear(c, x2, y2, r2, 9, -v * TAU / 4.5, W(.1)); sweep(c, w, h, fract(v * 2), .14, .1); },
    rays(c, w, h, v) { const cx = w / 2, cy = h / 2, M = Math.max(w, h);
      for (let k = 0; k < 12; k++) { const a = k / 12 * TAU + v * TAU / 12; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + cos(a) * M, cy + sin(a) * M); c.lineTo(cx + cos(a + .22) * M, cy + sin(a + .22) * M); c.closePath(); c.fillStyle = 'rgba(255,224,138,.07)'; c.fill(); }
      glow(c, cx, cy, Math.min(w, h) * .7, '#FFD36B', .22); },
    filmstrip(c, w, h, v) { const sh = h * .34, y = h * .66, hole = sh * .16, step = hole * 2.2, off = fract(v * 2) * step;
      c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(0, y, w, sh); c.fillStyle = W(.3);
      for (let x = -off; x < w; x += step) { c.fillRect(x, y + hole * .4, hole, hole * .8); c.fillRect(x, y + sh - hole * 1.2, hole, hole * .8); }
      sweep(c, w, h, fract(v), .14); },
    grain(c, w, h, v) { const f = fl(v * 24), m = Math.min(w, h); c.fillStyle = W(.18);
      for (let i = 0; i < 70; i++) { const h1 = (Math.imul(i, 73856093) ^ Math.imul(f, 19349663)) & 0xffff, h2 = (Math.imul(i, 83492791) ^ Math.imul(f, 50331653)) & 0xffff; c.beginPath(); c.arc(h1 / 65535 * w, h2 / 65535 * h, m * .006, 0, TAU); c.fill(); }
      const g = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * .7); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${.35 + .08 * sin(v * TAU)})`); c.fillStyle = g; c.fillRect(0, 0, w, h); },
  };

  function flower(c, x, y, r, col, rot) { c.save(); c.translate(x, y); c.rotate(rot); for (let k = 0; k < 5; k++) { const a = k / 5 * TAU; circle(c, cos(a) * r * .6, sin(a) * r * .6, r * .55, col); } circle(c, 0, 0, r * .4, '#FFF3B0'); c.restore(); }
  const DEC = {
    d_1960(c, w, h, v, s) { const cols = ['#FF6B9A', '#FFB627', '#9B5DE5', '#00BBF9'], m = Math.min(w, h);
      for (let i = 0; i < 5; i++) glow(c, w * (.2 + .6 * s[i] + .12 * sin((v + s[i]) * TAU)), h * (.5 + .4 * cos((v * (1 + i % 2) + s[i + 5]) * TAU)), m * (.45 + .15 * s[i + 9]), cols[i % 4], .45);
      flower(c, w * .82, h * .28, m * .2, 'rgba(255,107,154,.9)', v * TAU); flower(c, w * .66, h * .78, m * .12, 'rgba(255,182,39,.9)', -v * TAU); },
    d_1970(c, w, h, v) { const st = ['#F4A261', '#E76F51', '#B5541C', '#6B2E12'];
      st.forEach((col, k) => { const y = h * (.62 + .09 * k); c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(w * .3, y - h * .15 * sin((v + k * .1) * TAU), w * .6, y + h * .12, w, y); c.lineTo(w, y + h * .08); c.bezierCurveTo(w * .6, y + h * .2, w * .3, y - h * .07, 0, y + h * .08); c.closePath(); c.fillStyle = col; c.globalAlpha = .85; c.fill(); c.globalAlpha = 1; });
      const x = w * .8, y = h * .3, r = Math.min(w, h) * .22, n = 6; circle(c, x, y, r, '#B0B7C3');
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const px = x - r + (i + .5) * 2 * r / n, py = y - r + (j + .5) * 2 * r / n; if (Math.hypot(px - x, py - y) > r * .92) continue; const b = .5 + .5 * sin((v * 3 + (i + j * 2 + fl(v * 6)) * .37) * TAU); c.fillStyle = W(.25 + .6 * b); c.fillRect(px - r / n * .85, py - r / n * .85, r / n * 1.7, r / n * 1.7); }
      for (let k = 0; k < 5; k++) { const a = (v + k / 5) * TAU; star4(c, x + cos(a) * r * 2, y + sin(a) * r * 1.2, r * .2 * (.5 + .5 * sin(a * 2)), W(.8)); } },
    d_1980(c, w, h, v) { const hz = h * .58, cx = w / 2, r = Math.min(w, h) * .42, m = Math.min(w, h);
      const g = c.createLinearGradient(0, hz - r, 0, hz); g.addColorStop(0, '#FFE066'); g.addColorStop(1, '#FF4FA3'); circle(c, cx, hz, r, g);
      c.fillStyle = '#1A0638'; for (let k = 0; k < 4; k++) c.fillRect(0, hz - r * (.12 + .16 * k), w, r * .04 * (4 - k));
      c.fillStyle = '#14052E'; c.fillRect(0, hz, w, h - hz);
      for (let k = 0; k < 7; k++) { const p = fract(k / 7 + v), y = hz + (h - hz) * p * p; line(c, 0, y, w, y, `rgba(255,46,147,${.3 + .6 * p})`, m * .008); }
      for (let k = -6; k <= 6; k++) line(c, cx + k * w * .04, hz, cx + k * w * .3, h, 'rgba(255,46,147,.6)', m * .008); },
    d_1990(c, w, h, v, s) { const cols = ['#FFD23F', '#EE4266', '#3BCEAC', '#540D6E'], m = Math.min(w, h);
      for (let i = 0; i < 7; i++) { const x = w * (s[i] + .04 * sin((v + s[i]) * TAU)), y = h * (s[i + 7] + .06 * cos((v + s[i]) * TAU)), r = m * (.06 + .05 * s[i + 14]), col = cols[i % 4];
        c.save(); c.translate(x, y); c.rotate((v + s[i]) * TAU * (i % 2 ? -1 : 1));
        if (i % 3 === 0) { c.beginPath(); c.moveTo(0, -r); c.lineTo(r, r); c.lineTo(-r, r); c.closePath(); c.fillStyle = col; c.fill(); }
        else if (i % 3 === 1) { c.beginPath(); c.moveTo(-r * 1.5, 0); for (let j = 1; j <= 4; j++) c.quadraticCurveTo(-r * 1.5 + (j - .5) * r * .75, (j % 2 ? -r : r) * .7, -r * 1.5 + j * r * .75, 0); c.strokeStyle = col; c.lineWidth = r * .3; c.lineCap = 'round'; c.stroke(); }
        else circle(c, 0, 0, r * .6, col); c.restore(); }
      c.fillStyle = 'rgba(0,0,0,.12)'; for (let y = 0; y < h; y += 4) c.fillRect(0, y, w, 1.5);
      c.fillStyle = W(.1); c.fillRect(0, fract(v) * h * 1.3 - h * .15, w, h * .06); },
    d_2000(c, w, h, v, s) { const m = Math.min(w, h);
      for (let i = 0; i < 6; i++) { const r = m * (.12 + .12 * s[i]), x = w * s[i + 6], y = h * (.3 + .5 * s[i + 12]) + sin((v + s[i]) * TAU) * h * .08;
        const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, 'rgba(191,244,255,.6)'); g.addColorStop(.6, 'rgba(59,167,245,.25)'); g.addColorStop(1, 'rgba(59,167,245,0)'); circle(c, x, y, r, g); ellipse(c, x, y - r * .52, r * .5, r * .22, W(.55)); }
      c.beginPath(); c.moveTo(0, h * .75); c.bezierCurveTo(w * .3, h * (.4 + .1 * sin(v * TAU)), w * .7, h, w, h * .55); c.strokeStyle = W(.35); c.lineWidth = m * .03; c.lineCap = 'round'; c.stroke(); sweep(c, w, h, fract(v), .25, .12); },
    d_2010(c, w, h, v, s) { const m = Math.min(w, h);
      for (let i = 0; i < 9; i++) circle(c, w * s[i], h * s[i + 9], m * (.1 + .18 * s[i + 18]) * (.85 + .15 * sin((v + s[i]) * TAU)), W(.06 + .06 * s[i]));
      const x = fract(v) * w * 1.4 - w * .2; c.fillStyle = 'rgba(244,114,182,.5)'; c.beginPath(); c.roundRect ? c.roundRect(x, h * .15, m * .25, m * .25, m * .06) : c.rect(x, h * .15, m * .25, m * .25); c.fill();
      circle(c, w - x * .8, h * .75, m * .1, 'rgba(251,191,36,.6)'); },
    d_2020(c, w, h, v, s) { const cols = ['rgba(34,211,238,.55)', 'rgba(168,85,247,.55)', 'rgba(244,114,182,.55)'], m = Math.min(w, h);
      cols.forEach((col, k) => { c.beginPath(); for (let x = 0; x <= w + 6; x += 6) { const y = h * (.45 + .12 * k) + sin((x / w * 1.5 + v * (k + 1) + k * .3) * TAU) * h * .15; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.strokeStyle = col; c.lineWidth = m * .1; c.lineCap = 'round'; c.stroke(); });
      for (let i = 0; i < 12; i++) { const tw = .5 + .5 * sin((v * 2 + s[i]) * TAU); circle(c, s[i + 8] * w, s[i + 16] * h, m * .01, W(.3 + .6 * tw)); } },
  };

  const map = {}, periods = {};
  const P = e => e === 'siren' ? 1600 : ['speed', 'code', 'neon', 'sand', 'music'].includes(e) ? 2400 : ['bolt', 'roar', 'flash', 'scan'].includes(e) ? 3600 : ['globe', 'gears', 'rays', 'clouds', 'fog', 'mist', 'hyperspace'].includes(e) ? 9000 : ['ring', 'spotlight', 'candle', 'lamp', 'signal'].includes(e) ? 6000 : 4800;
  Object.keys(FX).forEach(k => { map['fx_' + k] = FX[k]; periods['fx_' + k] = P(k); });
  Object.keys(DEC).forEach(k => { map['dec_' + k] = DEC[k]; periods['dec_' + k] = k === 'd_1980' ? 3000 : 6000; });
  GenreScenes.register(map, periods);
})();
