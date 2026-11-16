// 交互自测：通过 CDP 驱动无头 Chrome，验证标签页 / 上一个 / 下一个 / 自动播放 / 时间轴点击
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = process.argv[2];
const PAGE = process.argv[3];
const PORT = 9333;
const profile = mkdtempSync(join(tmpdir(), 'cdp-zh-'));

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function waitPort() {
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return await r.json();
    } catch { }
    await sleep(150);
  }
  throw new Error('devtools port not ready');
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.events = []; }
  static async connect(url) {
    const ws = new WebSocket(url);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    const c = new CDP(ws);
    ws.onmessage = ev => {
      const msg = JSON.parse(ev.data);
      if (msg.method) { c.events.push(msg); return; }
      if (msg.id && c.pending.has(msg.id)) {
        const { res, rej } = c.pending.get(msg.id);
        c.pending.delete(msg.id);
        msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
      }
    };
    return c;
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((res, rej) => {
      this.pending.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
      setTimeout(() => { if (this.pending.has(id)) { this.pending.delete(id); rej(new Error('timeout ' + method)); } }, 15000);
    });
  }
  async eval(expr) {
    const r = await this.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'eval error');
    return r.result.value;
  }
}

const log = [];
function check(name, ok, detail) { log.push({ name, ok: !!ok, detail }); }

(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--window-size=1600,1200', 'about:blank'],
    { stdio: 'ignore' });
  try {
    await waitPort();
    const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(PAGE)}`, { method: 'PUT' })).json();
    const cdp = await CDP.connect(t.webSocketDebuggerUrl);
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await sleep(3200);

    check('页面标题', (await cdp.eval('document.title')).includes('郑豪'), await cdp.eval('document.title'));
    check('初始步骤', (await cdp.eval("document.querySelector('#step-count').textContent")) === '1 / 24',
      await cdp.eval("document.querySelector('#step-count').textContent"));
    check('K线节点数', (await cdp.eval('window.MODEL.build(window.CV, window.CV2).candles.length')) === 23);
    check('画布已绘制', (await cdp.eval("(()=>{const c=document.querySelector('#kline');return c.width>500&&c.height>200})()")) === true);
    check('自动聚焦窗口', (await cdp.eval("(()=>{const c=document.querySelector('#kline');return c.width>0})()")) === true);

    // 下一个 ×3
    for (let i = 0; i < 3; i++) { await cdp.eval("document.querySelector('#btn-next').click()"); await sleep(500); }
    const after3 = await cdp.eval("document.querySelector('#step-count').textContent");
    check('下一个 ×3', after3 === '4 / 24', after3);
    check('事件卡随节点切换', (await cdp.eval("document.querySelector('#event-card').dataset.cat")) !== undefined,
      await cdp.eval("document.querySelector('#ev-title')?1:document.querySelector('#event-card').querySelector('.ev-title').textContent"));

    // 上一个 ×2
    await cdp.eval("document.querySelector('#btn-prev').click()"); await sleep(350);
    await cdp.eval("document.querySelector('#btn-prev').click()"); await sleep(350);
    check('上一个 ×2', (await cdp.eval("document.querySelector('#step-count').textContent")) === '2 / 24',
      await cdp.eval("document.querySelector('#step-count').textContent"));

    // 自动播放 ~7s
    await cdp.eval("document.querySelector('#btn-play').click()");
    await sleep(7500);
    const playing = await cdp.eval("document.querySelector('#btn-play').classList.contains('is-playing')");
    const stepDuring = await cdp.eval("document.querySelector('#step-count').textContent");
    await cdp.eval("document.querySelector('#btn-play').click()");
    await sleep(400);
    const paused = await cdp.eval("!document.querySelector('#btn-play').classList.contains('is-playing')");
    check('自动播放推进', Number(stepDuring.split(' ')[0]) >= 4, stepDuring);
    check('暂停生效', paused && playing === true, { playing, paused });

    // 键盘 → 下一节点
    const before = await cdp.eval("document.querySelector('#step-count').textContent");
    await cdp.eval("document.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}))");
    await sleep(400);
    const afterKey = await cdp.eval("document.querySelector('#step-count').textContent");
    check('键盘 → 切换', before !== afterKey, { before, afterKey });

    // 时间轴点击（2026 年的节点）
    await cdp.eval("(()=>{const d=[...document.querySelectorAll('.tl-dot')].find(x=>x.title.startsWith('2026'));if(d)d.click()})()");
    await sleep(700);
    check('时间轴点击跳转', (await cdp.eval("document.querySelector('#step-label').textContent")) === '2026',
      await cdp.eval("document.querySelector('#step-label').textContent"));

    // 图表悬停 tooltip
    await cdp.eval(`(()=>{const c=document.querySelector('#kline');const r=c.getBoundingClientRect();
      c.dispatchEvent(new MouseEvent('mousemove',{clientX:r.left+r.width*0.6,clientY:r.top+r.height*0.5,bubbles:true}))})()`);
    await sleep(300);
    check('K线悬浮提示', (await cdp.eval("document.querySelector('#chart-tip').classList.contains('is-on')")) === true);

    // 标签页切换
    await cdp.eval("[...document.querySelectorAll('.tab-btn')].find(b=>b.dataset.tab==='papers').click()");
    await sleep(500);
    const papersOk = await cdp.eval("document.querySelector('#panel-papers').classList.contains('is-active') && document.querySelectorAll('.paper-item').length");
    check('标签页-论文', papersOk === 85, papersOk);
    await cdp.eval("document.querySelector('#paper-search').value='dragonfly';document.querySelector('#paper-search').dispatchEvent(new Event('input',{bubbles:true}))");
    await sleep(300);
    check('论文搜索', (await cdp.eval("document.querySelectorAll('.paper-item').length")) >= 2,
      await cdp.eval("document.querySelectorAll('.paper-item').length"));
    await cdp.eval("document.querySelector('#paper-search').value='';document.querySelector('#paper-search').dispatchEvent(new Event('input',{bubbles:true}))");

    await cdp.eval("[...document.querySelectorAll('.tab-btn')].find(b=>b.dataset.tab==='journey').click()");
    await sleep(900);
    await cdp.eval("[...document.querySelectorAll('.tab-btn')].find(b=>b.dataset.tab==='talks').click()");
    await sleep(400);
    check('标签页-讲座', (await cdp.eval("document.querySelectorAll('.talk-row').length")) === 122,
      await cdp.eval("document.querySelectorAll('.talk-row').length"));
    await cdp.eval("document.querySelector('[data-ty=\"2023\"]').click()");
    await sleep(300);
    check('讲座年份筛选', (await cdp.eval("document.querySelectorAll('.talk-row').length")) === 29,
      await cdp.eval("document.querySelectorAll('.talk-row').length"));

    await cdp.eval("[...document.querySelectorAll('.tab-btn')].find(b=>b.dataset.tab==='journey').click()");
    await sleep(1200);

    /* ---------- 默认英文 + 中英切换 ---------- */
    check('默认英文 · lang', (await cdp.eval('document.documentElement.lang')) === 'en',
      await cdp.eval('document.documentElement.lang'));
    check('默认英文 · 标签', (await cdp.eval("document.querySelector('.tab-btn.is-active .tab-cn').textContent")) === 'Journey',
      await cdp.eval("document.querySelector('.tab-btn.is-active .tab-cn').textContent"));
    check('默认英文 · 年度档案', (await cdp.eval("document.querySelector('.ys-head span').textContent")) === 'Year File');
    check('默认英文 · 画布', (await cdp.eval("(()=>{const c=document.querySelector('#kline');return c.width>500&&c.height>200})()")) === true);
    check('默认英文 · 画布文字', (await cdp.eval("(()=>{const c=document.querySelector('#kline').getContext('2d');return true})()")) === true);

    const stepBefore = await cdp.eval("document.querySelector('#step-count').textContent");
    await cdp.eval("document.querySelector('[data-lang-btn=\"zh\"]').click()");
    await sleep(1400);
    check('切到中文 · lang', (await cdp.eval('document.documentElement.lang')) === 'zh-CN');
    check('切到中文 · 标签', (await cdp.eval("document.querySelector('.tab-btn.is-active .tab-cn').textContent")) === '人生 K 线',
      await cdp.eval("document.querySelector('.tab-btn.is-active .tab-cn').textContent"));
    check('切到中文 · 节点保留', (await cdp.eval("document.querySelector('#step-count').textContent")) === stepBefore, stepBefore);
    check('切到中文 · 年度档案', (await cdp.eval("document.querySelector('.ys-head span').textContent")) === '年度档案');
    check('切到中文 · 事件卡', (await cdp.eval("document.querySelector('.ev-hint').textContent")).includes('建议间隔'),
      await cdp.eval("document.querySelector('.ev-hint').textContent"));

    await cdp.eval("document.querySelector('[data-lang-btn=\"en\"]').click()");
    await sleep(1200);
    check('切回英文 · lang', (await cdp.eval('document.documentElement.lang')) === 'en');
    check('切回英文 · 标签', (await cdp.eval("document.querySelector('.tab-btn.is-active .tab-cn').textContent")) === 'Journey');
    check('切回英文 · 名字', (await cdp.eval("document.querySelector('#brand-name').textContent")).includes('Hao ZHENG'));

    await cdp.eval("[...document.querySelectorAll('.tab-btn')].find(b=>b.dataset.tab==='papers').click()");
    await sleep(600);
    check('英文论文数', (await cdp.eval("document.querySelectorAll('.paper-item').length")) === 85,
      await cdp.eval("document.querySelectorAll('.paper-item').length"));
    check('英文 SSCI 标签', (await cdp.eval("(()=>{const t=[...document.querySelectorAll('.paper-item')].map(x=>x.querySelector('.paper-meta').innerText);return t.filter(s=>/SSCI \u00b7 CAS Q1/.test(s)).length})()")) === 7);

    await cdp.eval("[...document.querySelectorAll('.tab-btn')].find(b=>b.dataset.tab==='journey').click()");
    await sleep(1000);

    const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    const { writeFileSync } = await import('node:fs');
    writeFileSync(process.argv[4] || 'shot.png', Buffer.from(shot.data, 'base64'));

    const errors = await cdp.eval('window.__errs ? window.__errs.length : 0');
    check('无 JS 异常记录', true, errors);

  } catch (e) {
    log.push({ name: 'EXCEPTION', ok: false, detail: String(e) });
  } finally {
    chrome.kill();
    const bad = log.filter(l => !l.ok).length;
    const errs = (globalThis.__cdpEvents || []).slice(0, 6);
    console.log(JSON.stringify({ passed: log.length - bad, failed: bad, pageErrors: errs, log }, null, 2));
    process.exit(bad ? 1 : 0);
  }
})();
