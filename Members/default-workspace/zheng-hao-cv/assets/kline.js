/* ============================================================
   K 线图引擎（Canvas，HiDPI，可动画视口 / 逐根绘制 / 预测扇形区）
   ============================================================ */
(function () {
  'use strict';

  const PALETTES = {
    dark: {
      grid: 'rgba(148,168,210,0.11)', gridStrong: 'rgba(148,168,210,0.2)',
      text: 'rgba(214,224,244,0.62)', textStrong: 'rgba(232,240,255,0.92)',
      up: '#ff5a67', upFill: 'rgba(255,90,103,0.85)', upGlow: 'rgba(255,90,103,0.35)',
      down: '#12c98b', downFill: 'rgba(18,201,139,0.85)', downGlow: 'rgba(18,201,139,0.3)',
      ma3: '#f5c86b', ma5: '#7fa6ff', fc: '#a78bfa',
      fcFill: 'rgba(167,139,250,0.13)', fcLine: 'rgba(167,139,250,0.55)',
      focus: 'rgba(245,200,107,0.10)', focusLine: 'rgba(245,200,107,0.55)',
      vol: 'rgba(148,168,210,0.35)'
    },
    light: {
      grid: 'rgba(20,32,60,0.07)', gridStrong: 'rgba(20,32,60,0.14)',
      text: 'rgba(38,50,74,0.62)', textStrong: 'rgba(18,28,48,0.92)',
      up: '#e23d4c', upFill: 'rgba(226,61,76,0.9)', upGlow: 'rgba(226,61,76,0.22)',
      down: '#0aa671', downFill: 'rgba(10,166,113,0.9)', downGlow: 'rgba(10,166,113,0.2)',
      ma3: '#c9912a', ma5: '#3b6ef0', fc: '#7c5cf0',
      fcFill: 'rgba(124,92,240,0.10)', fcLine: 'rgba(124,92,240,0.5)',
      focus: 'rgba(201,145,42,0.10)', focusLine: 'rgba(201,145,42,0.5)',
      vol: 'rgba(20,32,60,0.28)'
    }
  };

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  class KlineChart {
    constructor(canvas, series, opts) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.series = series;
      this.opts = Object.assign({ paddingLeft: 6, paddingRight: 52, paddingTop: 34, paddingBottom: 30, volumeRatio: 0.2 }, opts || {});
      this.labels = Object.assign({
        ma3: 'MA3', ma5: 'MA5', forecast: '预测', trend: '红涨绿跌 · 指数',
        volume: '年度事件密度 / 成交量', forecastArea: '预测区 · 不确定性扇形'
      }, (opts && opts.labels) || {});
      this.theme = 'dark';
      this.pal = PALETTES.dark;

      this.view = { start: 0, count: series.candles.length };
      this.viewTarget = Object.assign({}, this.view);
      this.viewAnim = null;

      this.range = { min: 0, max: 100 };
      this.rangeTarget = { min: 0, max: 100 };
      this.rangeAnim = null;

      this.visible = series.candles.length;   // 可见蜡烛数（浮点，用于逐根绘制）
      this.visibleAnim = null;
      this.active = -1;            // 高亮年份索引
      this.hover = -1;
      this.focusSpan = null;       // {from, to} 索引区间高亮

      this.dpr = 1;
      this.w = 0; this.h = 0;
      this._bindEvents();
      this.resize();
    }

    setTheme(theme) {
      this.theme = theme;
      this.pal = PALETTES[theme] || PALETTES.dark;
      this.draw();
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(280, Math.round(rect.width));
      const h = Math.max(200, Math.round(rect.height));
      this.dpr = dpr; this.w = w; this.h = h;
      this.canvas.width = Math.round(w * dpr);
      this.canvas.height = Math.round(h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this._computeRange(true);
      this.draw();
    }

    /* ---------- 视口 ---------- */
    setViewport(v, animate) {
      const total = this.series.candles.length;
      const count = Math.max(3, Math.min(total, v.count));
      const start = Math.max(-0.6, Math.min(total - count, v.start));
      this.viewTarget = { start, count };
      if (!animate) { this.view = { start, count }; this._computeRange(true); this.draw(); return; }
      this.viewAnim = { t0: performance.now(), from: { start: this.view.start, count: this.view.count }, to: this.viewTarget, dur: 720 };
      // 依据目标视口计算价格区间，避免动画过程中纵轴错位
      const saved = { start: this.view.start, count: this.view.count };
      this.view = { start, count };
      this._computeRange();
      this.view = saved;
      this._animate();
    }

    _computeRange(snap) {
      const c = this.series.candles;
      const s = Math.max(0, Math.floor(this.view.start));
      const e = Math.min(c.length, Math.ceil(this.view.start + this.view.count));
      let lo = Infinity, hi = -Infinity;
      for (let i = s; i < e; i++) {
        lo = Math.min(lo, c[i].low); hi = Math.max(hi, c[i].high);
        const band = c[i].band;
        if (band) { lo = Math.min(lo, c[i].close * band.down * 0.96); hi = Math.max(hi, c[i].close * band.up * 1.02); }
      }
      if (!isFinite(lo) || !isFinite(hi)) { lo = 0; hi = 100; }
      const pad = (hi - lo) * 0.14 || 10;
      this.rangeTarget = { min: lo - pad, max: hi + pad };
      if (snap) { this.range = Object.assign({}, this.rangeTarget); return; }
      this.rangeAnim = { t0: performance.now(), from: Object.assign({}, this.range), to: this.rangeTarget, dur: 520 };
    }

    _animate() {
      if (this._raf) return;
      const tick = () => {
        const now = performance.now();
        let busy = false;

        if (this.viewAnim) {
          const a = this.viewAnim, k = Math.min(1, (now - a.t0) / a.dur), e = easeOutCubic(k);
          this.view.start = a.from.start + (a.to.start - a.from.start) * e;
          this.view.count = a.from.count + (a.to.count - a.from.count) * e;
          if (k >= 1) this.viewAnim = null; else busy = true;
        }
        if (this.rangeAnim && !this._rangeLocked) {
          const a = this.rangeAnim, k = Math.min(1, (now - a.t0) / a.dur), e = easeOutCubic(k);
          this.range.min = a.from.min + (a.to.min - a.from.min) * e;
          this.range.max = a.from.max + (a.to.max - a.from.max) * e;
          if (k >= 1) this.rangeAnim = null; else busy = true;
        }
        if (this.visibleAnim) {
          const a = this.visibleAnim, k = Math.min(1, (now - a.t0) / a.dur);
          const e = a.ease ? easeOutCubic(k) : k;
          this.visible = a.from + (a.to - a.from) * e;
          if (k >= 1) { this.visible = a.to; this.visibleAnim = null; } else busy = true;
        }
        if (this._pulseUntil && now < this._pulseUntil) busy = true;
        this.draw();
        if (busy) this._raf = requestAnimationFrame(tick);
        else { this._raf = null; }
      };
      this._raf = requestAnimationFrame(tick);
    }

    /* ---------- 几何 ---------- */
    get plot() {
      const o = this.opts;
      const x0 = o.paddingLeft + 4, x1 = this.w - o.paddingRight;
      const y0 = o.paddingTop, y1 = this.h - o.paddingBottom;
      const volH = (y1 - y0) * o.volumeRatio;
      return { x0, x1, y0, y1, priceTop: y0, priceBottom: y1 - volH - 8, volTop: y1 - volH, volBottom: y1, volH };
    }
    xOf(i) { const p = this.plot; const slot = (p.x1 - p.x0) / this.view.count; return p.x0 + (i - this.view.start + 0.5) * slot; }
    slotW() { const p = this.plot; return (p.x1 - p.x0) / this.view.count; }
    yOf(v) { const p = this.plot; const r = this.range; return p.priceBottom - (v - r.min) / (r.max - r.min) * (p.priceBottom - p.priceTop); }

    indexAt(x) {
      const p = this.plot; const slot = this.slotW();
      const i = Math.floor((x - p.x0) / slot + this.view.start);
      return (i >= 0 && i < this.series.candles.length) ? i : -1;
    }

    /* ---------- 绘制 ---------- */
    draw() {
      const ctx = this.ctx, pal = this.pal, p = this.plot, c = this.series.candles;
      ctx.clearRect(0, 0, this.w, this.h);

      // 聚焦带
      if (this.focusSpan) {
        const a = Math.max(0, this.focusSpan.from), b = Math.min(c.length - 1, this.focusSpan.to);
        const xa = this.xOf(a) - this.slotW() / 2, xb = this.xOf(b) + this.slotW() / 2;
        ctx.save();
        const g = ctx.createLinearGradient(xa, 0, xb, 0);
        g.addColorStop(0, 'rgba(245,200,107,0)'); g.addColorStop(0.5, pal.focus); g.addColorStop(1, 'rgba(245,200,107,0)');
        ctx.fillStyle = g;
        ctx.fillRect(Math.max(p.x0, xa), p.priceTop, Math.min(p.x1, xb) - Math.max(p.x0, xa), p.priceBottom - p.priceTop);
        ctx.restore();
      }

      // 水平网格 + 价格轴
      const ticks = niceTicks(this.range.min, this.range.max, 6);
      ctx.save();
      ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
      ctx.font = '11px "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace';
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ticks.forEach(t => {
        const y = Math.round(this.yOf(t)) + 0.5;
        if (y < p.priceTop - 1 || y > p.priceBottom + 1) return;
        ctx.beginPath(); ctx.moveTo(p.x0, y); ctx.lineTo(p.x1, y); ctx.stroke();
        ctx.fillStyle = pal.text;
        ctx.fillText(formatNum(t), p.x1 + 8, y);
      });
      ctx.restore();

      // 年份竖线 + 标签
      const step = this.view.count > 14 ? 2 : 1;
      ctx.save();
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.font = '11px "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace';
      for (let i = Math.max(0, Math.floor(this.view.start)); i < Math.min(c.length, Math.ceil(this.view.start + this.view.count)); i++) {
        if (c[i].year % step !== 0 && c[i].year !== 2027) continue;
        const x = Math.round(this.xOf(i)) + 0.5;
        ctx.strokeStyle = c[i].actual ? pal.grid : 'rgba(167,139,250,0.14)';
        ctx.beginPath(); ctx.moveTo(x, p.priceTop); ctx.lineTo(x, p.volBottom); ctx.stroke();
        ctx.fillStyle = (this.active === i) ? pal.textStrong : pal.text;
        ctx.fillText(String(c[i].year), x, p.volBottom + 8);
      }
      ctx.restore();

      // 预测区背景 + 扇形
      const firstFc = c.findIndex(x => !x.actual);
      const lastVisible = Math.min(c.length - 1, Math.ceil(this.visible) - 1);
      if (firstFc > -1) {
        const xf = this.xOf(firstFc) - this.slotW() / 2;
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = pal.fcLine; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(xf, p.priceTop); ctx.lineTo(xf, p.volBottom); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(167,139,250,0.85)'; ctx.font = '600 10px "SF Mono", monospace'; ctx.textBaseline = 'top';
        if (xf + 132 < p.x1) { ctx.textAlign = 'left'; ctx.fillText(this.labels.forecastArea, xf + 6, p.priceTop + 4); }
        else { ctx.textAlign = 'right'; ctx.fillText(this.labels.forecastArea, xf - 6, p.priceTop + 4); }

        // 扇形带（仅绘制已揭示的预测段）
        if (lastVisible >= firstFc) {
          ctx.beginPath();
          const from = firstFc, to = lastVisible;
          ctx.moveTo(this.xOf(from), this.yOf(c[from].close * c[from].band.up));
          for (let i = from + 1; i <= to; i++) ctx.lineTo(this.xOf(i), this.yOf(c[i].close * c[i].band.up));
          for (let i = to; i >= from; i--) ctx.lineTo(this.xOf(i), this.yOf(c[i].close * c[i].band.down));
          ctx.closePath();
          ctx.fillStyle = pal.fcFill; ctx.fill();
        }
        ctx.restore();
      }

      // 蜡烛（按 visible 逐根出现）
      const visible = this.visible;
      const slot = this.slotW();
      const bw = Math.max(2, Math.min(30, slot * 0.56));
      ctx.save();
      ctx.beginPath();
      ctx.rect(p.x0 - slot * 0.5, p.priceTop - 6, (p.x1 - p.x0) + slot, p.volBottom - p.priceTop + 12);
      ctx.clip();
      for (let i = 0; i < c.length; i++) {
        const appear = Math.max(0, Math.min(1, visible - i));
        if (appear <= 0) break;
        const k = c[i];
        const x = this.xOf(i);
        if (x < p.x0 - slot || x > p.x1 + slot) continue;
        const up = k.close >= k.open;
        const color = k.actual ? (up ? pal.up : pal.down) : pal.fc;
        const hx = this.yOf(k.high), lx = this.yOf(k.low);
        const oy = this.yOf(k.open), cyRaw = this.yOf(k.close);
        // 生长动画：初期只画影线，随后实体从开盘延伸到收盘
        const cy = oy + (cyRaw - oy) * appear;
        const wickAlpha = Math.min(1, appear * 3);
        const isActive = this.active === i;

        ctx.globalAlpha = k.actual ? 1 : 0.85;
        // 影线
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.3;
        ctx.globalAlpha *= wickAlpha;
        ctx.beginPath(); ctx.moveTo(x, hx); ctx.lineTo(x, lx); ctx.stroke();
        ctx.globalAlpha = k.actual ? 1 : 0.85;

        const bodyTop = Math.min(oy, cy), bodyH = Math.max(1.6, Math.abs(cy - oy));
        if (k.actual) {
          ctx.fillStyle = up ? pal.upFill : pal.downFill;
          if (isActive) { ctx.shadowColor = up ? pal.upGlow : pal.downGlow; ctx.shadowBlur = 22; }
          ctx.fillRect(x - bw / 2, bodyTop, bw, bodyH);
          ctx.shadowBlur = 0;
        } else {
          // 预测：空心蜡烛
          ctx.strokeStyle = pal.fc; ctx.lineWidth = 1.4;
          ctx.strokeRect(x - bw / 2, bodyTop, bw, bodyH);
          ctx.fillStyle = 'rgba(167,139,250,0.16)';
          ctx.fillRect(x - bw / 2, bodyTop, bw, bodyH);
        }
        ctx.globalAlpha = 1;

        if (isActive) {
          const pulse = 0.55 + 0.45 * Math.sin(performance.now() / 260);
          ctx.save();
          ctx.strokeStyle = pal.focusLine; ctx.lineWidth = 1.2;
          ctx.globalAlpha = 0.35 + 0.4 * pulse;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(x - bw / 2 - 7, Math.min(hx, bodyTop) - 8, bw + 14, Math.max(lx, bodyTop + bodyH) - Math.min(hx, bodyTop) + 16, 6)
            : ctx.rect(x - bw / 2 - 7, Math.min(hx, bodyTop) - 8, bw + 14, Math.max(lx, bodyTop + bodyH) - Math.min(hx, bodyTop) + 16);
          ctx.stroke();
          ctx.restore();
        }
      }
      ctx.restore();

      // 均线
      this._drawMA(this.series.ma3, pal.ma3);
      this._drawMA(this.series.ma5, pal.ma5);

      // 成交量
      const vols = c.slice(0, c.length).map(k => k.volume || 0);
      const maxVol = Math.max(1, ...vols);
      ctx.save();
      ctx.beginPath();
      ctx.rect(p.x0 - slot * 0.5, p.volTop, (p.x1 - p.x0) + slot, p.volH);
      ctx.clip();
      for (let i = 0; i < c.length; i++) {
        const appear = Math.max(0, Math.min(1, visible - i));
        if (appear <= 0) break;
        const x = this.xOf(i);
        if (x < p.x0 - slot || x > p.x1 + slot) continue;
        const v = vols[i]; if (!v) continue;
        const hgt = (v / maxVol) * p.volH * appear;
        const up = c[i].close >= c[i].open;
        ctx.fillStyle = c[i].actual ? (up ? 'rgba(255,90,103,0.5)' : 'rgba(18,201,139,0.5)') : 'rgba(167,139,250,0.35)';
        ctx.fillRect(x - bw / 2, p.volBottom - hgt, bw, hgt);
      }
      ctx.strokeStyle = pal.grid;
      ctx.beginPath(); ctx.moveTo(p.x0, p.volTop); ctx.lineTo(p.x1, p.volTop); ctx.stroke();
      ctx.fillStyle = pal.text; ctx.font = '10px "SF Mono", monospace'; ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
      ctx.fillText(this.labels.volume, p.x0 + 2, p.volTop - 3);
      ctx.restore();

      // 图例（按实际文字宽度排布，中英文自适应）
      ctx.save();
      ctx.font = '11px "SF Mono", "JetBrains Mono", Menlo, monospace';
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      let lx = p.x0 + 2;
      [[pal.ma3, '— ' + this.labels.ma3], [pal.ma5, '— ' + this.labels.ma5],
      [pal.fc, '— ' + this.labels.forecast], [pal.text, this.labels.trend]].forEach(item => {
        ctx.fillStyle = item[0];
        ctx.fillText(item[1], lx, 6);
        lx += ctx.measureText(item[1]).width + 14;
      });
      ctx.restore();

      // 悬停十字线
      if (this.hover >= 0) this._drawCrosshair(this.hover);
    }

    _drawMA(arr, color) {
      const ctx = this.ctx, p = this.plot;
      const limit = Math.min(arr.length, Math.floor(this.visible));
      ctx.save();
      ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.9;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < limit; i++) {
        if (arr[i] == null) continue;
        const x = this.xOf(i);
        if (x < p.x0 - 20 || x > p.x1 + 20) { started = false; continue; }
        const y = this.yOf(arr[i]);
        if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    }

    _drawCrosshair(i) {
      const ctx = this.ctx, p = this.plot, c = this.series.candles[i];
      if (!c) return;
      const x = this.xOf(i), y = this.yOf(c.close);
      ctx.save();
      ctx.setLineDash([3, 5]); ctx.strokeStyle = this.pal.gridStrong; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, p.priceTop); ctx.lineTo(x, p.volBottom); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(p.x0, y); ctx.lineTo(p.x1, y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = this.pal.textStrong;
      ctx.font = '600 11px "SF Mono", monospace'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(formatNum(c.close), p.x1 + 8, y);
      ctx.restore();
    }

    /* ---------- 动画入口 ---------- */
    playDraw(dur) {
      this.visible = 0;
      this.visibleAnim = { t0: performance.now(), from: 0, to: this.series.actualCount, dur: dur || 1600, ease: true };
      this._animate();
    }
    revealTo(n, dur) {
      if (n <= this.visible + 0.01) return;
      this.visibleAnim = { t0: performance.now(), from: this.visible, to: n, dur: dur || 600, ease: true };
      this._animate();
    }
    setActive(i, span) {
      this.active = i;
      this.focusSpan = span || (i >= 0 ? { from: i - 0.5, to: i + 0.5 } : null);
      this._pulseUntil = performance.now() + 900;
      this.draw();
      this._animate();
    }
    _bindEvents() {
      this.canvas.addEventListener('mousemove', e => {
        const r = this.canvas.getBoundingClientRect();
        const i = this.indexAt(e.clientX - r.left);
        if (i !== this.hover) { this.hover = i; if (this.onHover) this.onHover(i, e.clientX, e.clientY); this.draw(); }
      });
      this.canvas.addEventListener('mouseleave', () => { this.hover = -1; if (this.onHover) this.onHover(-1); this.draw(); });
      this.canvas.addEventListener('click', e => {
        const r = this.canvas.getBoundingClientRect();
        const i = this.indexAt(e.clientX - r.left);
        if (i >= 0 && this.onPick) this.onPick(i);
      });
    }
  }

  /* 工具函数 */
  function niceTicks(min, max, count) {
    const span = max - min;
    if (!(span > 0)) return [min];
    const raw = span / count;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm = raw / mag;
    let step;
    if (norm <= 1) step = 1; else if (norm <= 2) step = 2; else if (norm <= 2.5) step = 2.5;
    else if (norm <= 5) step = 5; else step = 10;
    step *= mag;
    const out = [];
    for (let v = Math.ceil(min / step) * step; v <= max; v += step) out.push(v);
    return out;
  }
  function formatNum(v) {
    const a = Math.abs(v);
    if (a === 0) return '0';
    if (a >= 10000) return (v / 10000).toFixed(1) + 'w';
    if (a >= 1000) return v.toFixed(0);
    if (a >= 100) return v.toFixed(0);
    if (a >= 10) return v.toFixed(1);
    return v.toFixed(2);
  }

  window.KlineChart = KlineChart;
  window.PALETTES = PALETTES;
})();
