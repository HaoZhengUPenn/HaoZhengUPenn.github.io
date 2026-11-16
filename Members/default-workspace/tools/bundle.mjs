/**
 * 打包为单文件 HTML（把 CSS / JS 内联进 index.html）
 * 用法：node tools/bundle.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'zheng-hao-cv');
const html = readFileSync(join(root, 'index.html'), 'utf8');

const css = readFileSync(join(root, 'assets', 'styles.css'), 'utf8');
const jsFiles = ['data.js', 'data2.js', 'data-en.js', 'model.js', 'kline.js', 'app.js'];
const js = jsFiles.map(f => `/* ===== ${f} ===== */\n` + readFileSync(join(root, 'assets', f), 'utf8')).join('\n');

let out = html
  .replace('<link rel="stylesheet" href="assets/styles.css" />', `<style>\n${css}\n</style>`)
  .replace(
    /<script src="assets\/[^"]+"><\/script>\s*/g,
    ''
  )
  .replace('</body>', `<script>\n${js}\n</script>\n</body>`);

const target = join(root, '郑豪-简历-交互版.html');
writeFileSync(target, out, 'utf8');
console.log('bundled ->', target, (out.length / 1024).toFixed(0) + ' KB');
