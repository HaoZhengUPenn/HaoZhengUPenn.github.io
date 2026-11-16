/* ============================================================
   年度聚合模型 + 人生 K 线指数模型
   ------------------------------------------------------------
   指数（人生轨迹）：
     活动分 S(y) = 3·SCI + 1.6·EI + 1·会议 + 2·专利 + 0.5·讲座
                 + 4·新任职 + 3·获奖 + 2·新立项 + 1.2·√(经费万元)
     A(y) = √( S(y) / max S )                     （压缩极值，0–1）
     L(y) = 120 + 860·A(y) + 28·(y − 2011)        （成长基准项保证长期抬升）
     蜡烛：开盘 = L(y−1)，收盘 = L(y)，影线由事件在年内的月度分布决定。
   预测：以 2024–2026 复合增速为基准并逐年收敛，配合不确定性扇形区。
   ============================================================ */
window.MODEL = (function () {
  'use strict';

  const W = { sci: 3.0, ei: 1.6, conf: 1.0, patent: 2.0, talk: 0.5, role: 4.0, award: 3.0, proj: 2.0, fund: 1.2 };
  const BASE = 210, AMP = 620, SLOPE = 30, BASE_YEAR = 2011;
  const SMOOTH = 0.25;
  const START_YEAR = 2009, LAST_ACTUAL = 2026, LAST_FORECAST = 2031;
  const PARTIAL_YEAR_FACTOR = { 2026: 1.2 };   // 简历截至 2026.10，按 12/10 折算

  const yearOfTalk = d => parseInt(d.slice(0, 4), 10);
  const monthOfTalk = d => parseInt(d.slice(5, 7), 10);
  function startMonthOf(v) {
    const y = Math.floor(v);
    const m = Math.round((v - y) * 12) + 1;
    return { y, m: Math.max(1, Math.min(12, m)) };
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function build(CV, CV2) {
    CV = CV || window.CV;
    CV2 = CV2 || window.CV2;
    const years = [];
    for (let y = START_YEAR; y <= LAST_FORECAST; y++) years.push(y);

    const monthsBucket = {};
    years.forEach(y => { monthsBucket[y] = new Array(12).fill(0); });
    function add(y, m, w) {
      const arr = monthsBucket[y];
      if (!arr) return;
      const mi = clamp((m || 6) - 1, 0, 11);
      arr[mi] += w;
    }

    CV2.papers.forEach(p => add(p.y, 6, W[p.type === 'thesis' ? 'conf' : p.type]));
    CV.patents.forEach(p => add(p.year, parseInt(p.date.slice(5, 7), 10), W.patent));
    CV2.talks.forEach(t => add(yearOfTalk(t.d), monthOfTalk(t.d), W.talk));
    CV.awards.forEach(a => add(a.year, 6, W.award));
    CV.positions.forEach(pos => pos.roles.forEach(r => {
      const s = startMonthOf(r.start);
      add(s.y, s.m, W.role);
    }));
    CV.education.forEach(e => { add(e.start, 9, 2.0); add(e.end, 6, 2.0); });
    CV.projects.forEach(p => {
      const s = startMonthOf(p.start);
      add(s.y, s.m, W.proj + W.fund * Math.sqrt(p.cny || 0));
    });

    /* ---------- 年度统计 ---------- */
    const table = years.map(y => {
      const papers = CV2.papers.filter(p => p.y === y);
      const byType = { sci: 0, ei: 0, conf: 0, thesis: 0 };
      papers.forEach(p => byType[p.type]++);
      const patents = CV.patents.filter(p => p.year === y).length;
      const talks = CV2.talks.filter(t => yearOfTalk(t.d) === y).length;
      const awards = CV.awards.filter(a => a.year === y);
      const newRoles = [];
      CV.positions.forEach(pos => pos.roles.forEach(r => {
        if (startMonthOf(r.start).y === y) newRoles.push({ org: pos.org, title: r.title, period: r.period });
      }));
      const eduStart = CV.education.filter(e => e.start === y);
      const eduEnd = CV.education.filter(e => e.end === y);
      const projStart = CV.projects.filter(p => startMonthOf(p.start).y === y);
      const projEnd = CV.projects.filter(p => startMonthOf(p.end).y === y);
      const projActive = CV.projects.filter(p => p.start <= y + 0.99 && p.end >= y);
      const fundingNew = projStart.reduce((s, p) => s + (p.cny || 0), 0);

      const rawScore = byType.sci * W.sci + byType.ei * W.ei + byType.conf * W.conf
        + (byType.thesis ? W.conf : 0)
        + patents * W.patent + talks * W.talk + newRoles.length * W.role
        + awards.length * W.award + projStart.length * W.proj
        + projStart.reduce((s, p) => s + W.fund * Math.sqrt(p.cny || 0), 0);
      const score = rawScore * (PARTIAL_YEAR_FACTOR[y] || 1);

      const volume = byType.sci * 3 + byType.ei * 1.8 + byType.conf * 1.2
        + patents * 4 + talks * 1 + newRoles.length * 6 + projStart.length * 5 + awards.length * 3;

      return {
        year: y, sci: byType.sci, ei: byType.ei, conf: byType.conf, thesis: byType.thesis,
        papers: papers.length, patents, talks,
        awards: awards.length, awardList: awards,
        newRoles, eduStart, eduEnd, projStart, projEnd, projActive,
        fundingNew, score, rawScore, volume,
        months: monthsBucket[y]
      };
    });

    /* ---------- 指数水平 ---------- */
    const actualRows = table.filter(r => r.year <= LAST_ACTUAL);
    const maxScore = Math.max(...actualRows.map(r => r.score), 1);
    // 活动强度 A（线性归一） + 25% 上一年惯性，避免单年极端跳变
    const intensity = actualRows.map((r, i) => {
      const a = r.year <= 2010 ? 0 : r.score / maxScore;
      const prev = i > 0 ? (actualRows[i - 1].year <= 2010 ? 0 : actualRows[i - 1].score / maxScore) : a;
      return (1 - SMOOTH) * a + SMOOTH * prev;
    });
    const levelAt = (i) => BASE + AMP * intensity[i] + SLOPE * (actualRows[i].year - BASE_YEAR);

    function buildOHLC(open, close, months) {
      const total = months.reduce((a, b) => a + b, 0);
      let hi = Math.max(open, close), lo = Math.min(open, close);
      if (total > 0) {
        let cum = 0;
        const path = [];
        for (let m = 0; m < 12; m++) { cum += months[m]; path.push(open + (close - open) * (cum / total)); }
        hi = Math.max(hi, ...path); lo = Math.min(lo, ...path);
      }
      const body = Math.abs(close - open);
      const mid = (open + close) / 2;
      const minWick = mid * (0.008 + 0.035 * Math.min(1, body / Math.max(1, mid)));
      if (hi - Math.max(open, close) < minWick) hi = Math.max(open, close) + minWick * 1.3;
      if (Math.min(open, close) - lo < minWick) lo = Math.min(open, close) - minWick * 1.15;
      return { open, close, high: hi, low: lo };
    }

    const candles = actualRows.map((r, i) => {
      const close = levelAt(i);
      const open = i === 0 ? close - SLOPE : levelAt(i - 1);
      const o = buildOHLC(open, close, r.months);
      return Object.assign({
        year: r.year, volume: r.volume, level: close, actual: true,
        change: (close - open) / open, row: r
      }, o);
    });

    /* ---------- 预测 ---------- */
    const last = candles[candles.length - 1];
    const n = candles.length;
    const cagr = Math.pow(last.close / candles[n - 3].close, 1 / 2) - 1;   // 2024 → 2026
    const g0 = clamp(cagr * 0.75, 0.025, 0.075);
    const fc = [];
    let prevClose = last.close;
    for (let y = LAST_ACTUAL + 1; y <= LAST_FORECAST; y++) {
      const k = y - LAST_ACTUAL;
      const g = g0 - 0.006 * (k - 1) + (y === 2027 ? 0.02 : 0);            // 2027 ECS 立项小幅加成
      const close = prevClose * (1 + g);
      const open = prevClose;
      const width = close * (0.045 + 0.048 * (k - 1));
      fc.push({
        year: y, actual: false, open, close,
        high: close + width * 0.55, low: open - width * 0.5,
        change: (close - open) / open, volume: 0, level: close,
        band: { up: 1 + (0.045 + 0.048 * (k - 1)), down: 1 - (0.05 + 0.055 * (k - 1)) }
      });
      prevClose = close;
    }

    const all = candles.concat(fc);

    function ma(n2) {
      return all.map((c, i) => {
        if (i < n2 - 1) return null;
        let s = 0;
        for (let j = i - n2 + 1; j <= i; j++) s += all[j].close;
        return s / n2;
      });
    }

    const totals = {
      papers: actualRows.reduce((s, r) => s + r.papers, 0),
      sci: actualRows.reduce((s, r) => s + r.sci, 0),
      ei: actualRows.reduce((s, r) => s + r.ei, 0),
      conf: actualRows.reduce((s, r) => s + r.conf, 0),
      thesis: actualRows.reduce((s, r) => s + r.thesis, 0),
      patents: actualRows.reduce((s, r) => s + r.patents, 0),
      talks: actualRows.reduce((s, r) => s + r.talks, 0),
      awards: actualRows.reduce((s, r) => s + r.awards, 0),
      funding: CV.projects.reduce((s, p) => s + (p.cny || 0), 0),
      projects: CV.projects.length
    };

    return {
      years, table, candles: all, actualCount: candles.length,
      ma3: ma(3), ma5: ma(5), totals, W, maxScore,
      forecastMeta: { cagr, g0 }
    };
  }

  return { build: build };
})();
