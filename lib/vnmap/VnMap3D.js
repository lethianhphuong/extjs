/*!
 * VnMap3D – sa bàn 3D 34 tỉnh thành bằng SVG (không cần WebGL, không cần internet).
 * Dùng dữ liệu hình tỉnh của VnMap.js (phải nạp VnMap.js trước).
 *
 *   var sb = VnMap3D.create(el, {
 *     values: { '01': 1350, '79': 1480, ... },   // giá trị theo mã hành chính → chiều cao khối
 *     onClick: function (tinh) {}                 // { id, code, name, fullName, value }
 *   });
 *   sb.setView({ bearing: -20, tilt: 0.55 }, true);  sb.setActive('hanoi');  sb.destroy();
 */
(function (root) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var SCALE = ['#164e63', '#0e7490', '#14b8a6', '#5eead4', '#ccfbf1'];
  var ACTIVE = '#fbbf24';
  var HMAX = 70;                  // chiều cao khối lớn nhất (đơn vị bản đồ)

  function mk(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function hex(c) { var n = parseInt(c.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function rgb(a) { return 'rgb(' + a.map(function (v) { return Math.round(v); }).join(',') + ')'; }
  function scaleColor(t) {
    t = Math.max(0, Math.min(1, t)) * (SCALE.length - 1);
    var i = Math.min(SCALE.length - 2, Math.floor(t)), f = t - i, a = hex(SCALE[i]), b = hex(SCALE[i + 1]);
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
  }
  function shade(c, k) { return rgb(c.map(function (v) { return v * k; })); }
  function parseRings(d) {
    return d.split('M').filter(Boolean).map(function (ring) {
      return ring.replace('Z', '').split('L').map(function (q) { var a = q.split(','); return [+a[0], +a[1]]; });
    });
  }

  function create(target, opts) {
    opts = opts || {};
    var V = root.VnMap;
    if (!V || !V.getShapes) throw new Error('VnMap3D cần nạp VnMap.js trước');
    var SH = V.getShapes(), W = SH._size[0], H = SH._size[1], CX = W / 2, CY = H / 2;
    var values = opts.values || {}, activeId = null, grow = 1;
    var view = { bearing: opts.bearing != null ? opts.bearing : -18, tilt: opts.tilt || 0.58 };

    // Chỉ đùn phần đất liền (vòng lớn nhất); đảo nhỏ vẽ phẳng để không thành cột mảnh
    var items = V.PROVINCES.map(function (p) {
      var rings = parseRings(SH[p.id].d), main = 0, best = -1;
      rings.forEach(function (r, i) {
        var a = 0;
        for (var j = 0; j < r.length; j++) { var u = r[j], w = r[(j + 1) % r.length]; a += u[0] * w[1] - w[0] * u[1]; }
        if (Math.abs(a) > best) { best = Math.abs(a); main = i; }
      });
      return { p: p, rings: rings, main: main, lx: SH[p.id].lx, ly: SH[p.id].ly };
    });

    var wrap = document.createElement('div');
    wrap.className = 'vnmap3d';
    var svg = mk('svg', { role: 'img', 'aria-label': 'Sa bàn 3D 34 tỉnh thành Việt Nam', preserveAspectRatio: 'xMidYMid meet' }, wrap);
    var ground = mk('g', { 'class': 'vnmap3d-ground' }, svg);
    var gBlocks = mk('g', {}, svg);
    var gLabels = mk('g', { 'class': 'vnmap3d-labels' }, svg);
    var tip = document.createElement('div'); tip.className = 'vnmap3d-tip'; wrap.appendChild(tip);
    target.appendChild(wrap);

    var els = {};
    items.forEach(function (it) {
      var g = mk('g', { 'class': 'vnmap3d-prov', 'data-id': it.p.id, tabindex: 0, role: 'button', 'aria-label': it.p.fullName }, gBlocks);
      els[it.p.id] = {
        g: g,
        side: mk('path', { 'class': 'vnmap3d-side' }, g),
        top: mk('path', { 'class': 'vnmap3d-top' }, g),
        lbl: mk('text', { 'class': 'vnmap3d-lbl', 'data-for': it.p.id }, gLabels)
      };
      els[it.p.id].lbl.textContent = it.p.id === 'hcm' ? 'TP.HCM' : it.p.name;
    });
    var inset = mk('polygon', { 'class': 'vnmap3d-inset' }, ground);
    var hsLbl = mk('text', { 'class': 'vnmap3d-qd' }, gLabels); hsLbl.textContent = 'QĐ. Hoàng Sa (Đà Nẵng)';
    var tsLbl = mk('text', { 'class': 'vnmap3d-qd' }, gLabels); tsLbl.textContent = 'QĐ. Trường Sa (Khánh Hòa)';

    function maxValue() {
      var m = 0;
      for (var k in values) m = Math.max(m, values[k] || 0);
      return m || 1;
    }
    function projector() {
      var a = view.bearing * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a), t = view.tilt;
      return function (x, y) {
        var dx = x - CX, dy = y - CY;
        return [CX + dx * ca - dy * sa, CY + (dx * sa + dy * ca) * t];
      };
    }
    function fmt(v) { return (Math.round(v * 10) / 10).toString(); }

    function render() {
      var P = projector(), mv = maxValue(), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      var order = items.map(function (it) {
        var val = values[it.p.code] || 0, h = val / mv * HMAX * grow, sy = 0, n = 0;
        var rings = it.rings.map(function (r, ri) {
          var hh = ri === it.main ? h : 0;
          return r.map(function (pt) {
            var q = P(pt[0], pt[1]);
            if (ri === it.main) { sy += q[1]; n++; }
            x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1] - hh); y1 = Math.max(y1, q[1]);
            return q;
          });
        });
        return { it: it, rings: rings, h: h, val: val, depth: sy / n };
      });
      order.sort(function (a, b) { return a.depth - b.depth; });   // xa trước, gần sau

      order.forEach(function (o) {
        var e = els[o.it.p.id], side = '', top = '';
        o.rings.forEach(function (r, ri) {
          var area = 0, i, a, b, hh = ri === o.it.main ? o.h : 0;
          for (i = 0; i < r.length; i++) { a = r[i]; b = r[(i + 1) % r.length]; area += a[0] * b[1] - b[0] * a[1]; }
          top += 'M' + r.map(function (q) { return fmt(q[0]) + ',' + fmt(q[1] - hh); }).join('L') + 'Z';
          if (hh < 0.3) return;
          for (i = 0; i < r.length; i++) {
            a = r[i]; b = r[(i + 1) % r.length];
            var ny = area > 0 ? -(b[0] - a[0]) : (b[0] - a[0]);     // pháp tuyến hướng ra ngoài, thành phần y
            if (ny <= 0) continue;                                     // chỉ vẽ mặt bên quay về phía người xem
            side += 'M' + fmt(a[0]) + ',' + fmt(a[1]) + 'L' + fmt(b[0]) + ',' + fmt(b[1]) +
              'L' + fmt(b[0]) + ',' + fmt(b[1] - o.h) + 'L' + fmt(a[0]) + ',' + fmt(a[1] - o.h) + 'Z';
          }
        });
        e.side.setAttribute('d', side);
        e.top.setAttribute('d', top);
        gBlocks.appendChild(e.g);
        var c = o.it.p.id === activeId ? hex(ACTIVE) : scaleColor(o.val / mv);
        e.top.style.fill = rgb(c);
        e.side.style.fill = e.side.style.stroke = shade(c, 0.6);   // viền trùng màu: không lộ sọc giữa các mảnh
        var lp = P(o.it.lx, o.it.ly);
        e.lbl.setAttribute('x', fmt(lp[0])); e.lbl.setAttribute('y', fmt(lp[1] - o.h - 6));
        e.lbl.classList.toggle('is-active', o.it.p.id === activeId);
        o.screenR = SH[o.it.p.id].r;
      });

      var b = SH._box, c4 = [[b[0], b[1]], [b[0] + b[2], b[1]], [b[0] + b[2], b[1] + b[3]], [b[0], b[1] + b[3]]].map(function (q) { return P(q[0], q[1]); });
      inset.setAttribute('points', c4.map(function (q) { return fmt(q[0]) + ',' + fmt(q[1]); }).join(' '));
      var top4 = c4.reduce(function (m, q) { return q[1] < m[1] ? q : m; });
      tsLbl.setAttribute('x', fmt((c4[0][0] + c4[1][0]) / 2)); tsLbl.setAttribute('y', fmt(top4[1] - 8));
      var hs = V.getShapes()._islands.hs, hx = 0, hy = Infinity;
      hs.forEach(function (q) { var r = P(q[0], q[1]); hx += r[0]; hy = Math.min(hy, r[1]); });
      hsLbl.setAttribute('x', fmt(hx / hs.length)); hsLbl.setAttribute('y', fmt(hy - 10));

      var pad = 24;
      svg.setAttribute('viewBox', fmt(x0 - pad) + ' ' + fmt(y0 - pad - 20) + ' ' + fmt(x1 - x0 + pad * 2) + ' ' + fmt(y1 - y0 + pad * 2 + 20));
      updateLabels();
    }

    // Tên tỉnh 10.5–13px trên màn hình; ẩn tên chồng nhau
    function updateLabels() {
      var r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal;
      if (!r.width || !vb || !vb.width) return;
      var unit = 1 / Math.min(r.width / vb.width, r.height / vb.height);
      svg.style.setProperty('--vnmap3d-unit', unit);
      // ưu tiên: tỉnh đang chọn > giá trị lớn > tỉnh rộng
      var placed = [], list = items.slice().sort(function (a, b) {
        return (b.p.id === activeId) - (a.p.id === activeId) ||
          (values[b.p.code] || 0) - (values[a.p.code] || 0) || SH[b.p.id].r - SH[a.p.id].r;
      });
      list.forEach(function (it) {
        var t = els[it.p.id].lbl;
        t.style.fontSize = ((it.p.id === activeId ? 13 : 10.5) * unit).toFixed(3) + 'px';
        t.style.display = '';
        var bb = t.getBBox(), pad = 2 * unit;
        var box = { x0: bb.x - pad, y0: bb.y - pad, x1: bb.x + bb.width + pad, y1: bb.y + bb.height + pad };
        var hit = placed.some(function (q) { return box.x0 < q.x1 && box.x1 > q.x0 && box.y0 < q.y1 && box.y1 > q.y0; });
        if (hit && it.p.id !== activeId) t.style.display = 'none'; else placed.push(box);
      });
    }

    // Chuyển động mượt cho đổi góc nhìn và "mọc" khối khi mở
    var anim = null;
    function animate(fn, dur) {
      if (anim) { cancelAnimationFrame(anim.raf); clearTimeout(anim.timer); }
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) { fn(1); render(); anim = null; return; }
      var t0 = null;
      anim = {};
      function done() { if (anim) { cancelAnimationFrame(anim.raf); clearTimeout(anim.timer); } anim = null; fn(1); render(); }
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur), e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        fn(e); render();
        if (p < 1) anim.raf = requestAnimationFrame(step); else done();
      }
      anim.raf = requestAnimationFrame(step);
      anim.timer = setTimeout(done, dur + 200);
    }

    function setActive(id) {
      activeId = V.byId(id) ? id : null;
      render();
    }

    function onClick(e) {
      var g = e.target.closest && e.target.closest('.vnmap3d-prov');
      if (!g) return;
      var p = V.byId(g.getAttribute('data-id'));
      setActive(p.id);
      if (opts.onClick) opts.onClick({ id: p.id, code: p.code, name: p.name, fullName: p.fullName, value: values[p.code] || 0 });
    }
    function onKey(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } }
    function onMove(e) {
      var g = e.target.closest && e.target.closest('.vnmap3d-prov');
      if (!g) { tip.style.opacity = 0; return; }
      var p = V.byId(g.getAttribute('data-id')), r = wrap.getBoundingClientRect();
      tip.textContent = p.fullName + ': ' + (values[p.code] || 0).toLocaleString('vi-VN');
      tip.style.left = (e.clientX - r.left) + 'px'; tip.style.top = (e.clientY - r.top) + 'px'; tip.style.opacity = 1;
    }
    function onLeave() { tip.style.opacity = 0; }
    svg.addEventListener('click', onClick);
    svg.addEventListener('keydown', onKey);
    svg.addEventListener('pointermove', onMove);
    svg.addEventListener('pointerleave', onLeave);
    var ro = window.ResizeObserver ? new ResizeObserver(function () { updateLabels(); }) : null;
    if (ro) ro.observe(wrap);

    grow = 0;
    render();
    animate(function (e) { grow = e; }, 700);

    return {
      el: wrap,
      setValues: function (v) { values = v || {}; render(); },
      setView: function (v, smooth) {
        var from = { bearing: view.bearing, tilt: view.tilt };
        var to = { bearing: v.bearing != null ? v.bearing : view.bearing, tilt: v.tilt != null ? v.tilt : view.tilt };
        if (!smooth) { view = to; render(); return; }
        animate(function (e) {
          view = { bearing: from.bearing + (to.bearing - from.bearing) * e, tilt: from.tilt + (to.tilt - from.tilt) * e };
        }, 500);
      },
      getView: function () { return { bearing: view.bearing, tilt: view.tilt }; },
      setActive: setActive,
      getActive: function () { return activeId; },
      replay: function () { animate(function (e) { grow = e; }, 700); },
      destroy: function () {
        if (anim) { cancelAnimationFrame(anim.raf); clearTimeout(anim.timer); }
        svg.removeEventListener('click', onClick);
        svg.removeEventListener('keydown', onKey);
        svg.removeEventListener('pointermove', onMove);
        svg.removeEventListener('pointerleave', onLeave);
        if (ro) ro.disconnect();
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      }
    };
  }

  root.VnMap3D = { create: create };
})(typeof window !== 'undefined' ? window : this);
