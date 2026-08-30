// 线上全链接 / HTTP 200 复核 v3（针对 github.io/zenspace-design 实际地址）
// 关键修正:
//  - 跟随重定向 -> /tech 301 重定向到 /tech/ 视为真实 200
//  - 内链按"当前页 URL"作为 base 解析(模拟浏览器): 根绝对 /service/... -> github.io/service/... (缺子路径) -> 404, 暴露 base 路径 bug
//  - 资源 href 已是 /zenspace-design/assets/... -> 正确全址 = ORIGIN + href
const ORIGIN = 'https://linlaytop.github.io';
const BASE = ORIGIN + '/zenspace-design';

const visitedPages = new Set();
const pageRows = [];        // {path, finalStatus}
const brokenPages = [];      // sitemap 中真实 404 的页
const assetRows = [];        // {url, status}
const assetSeen = new Set();
const brokenInternalLinks = []; // 站内死链(含 base 路径 bug)

function norm(pageUrl, href) {
  if (!href) return null;
  if (/^(https?:)?\/\//i.test(href)) return href.startsWith(ORIGIN) ? href : null;
  if (href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) return null;
  try {
    // 相对链接按"文档最终 URL"解析；base 若无结尾斜杠则补上，避免 ../ 多退一级
    const base = !pageUrl.endsWith('/') ? pageUrl + '/' : pageUrl;
    return new URL(href, base).href;
  } catch { return null; }
}

async function get(url) {
  try { const r = await fetch(url); return { status: r.status, text: await r.text(), finalUrl: r.url }; }
  catch (e) { return { status: 'ERR:' + e.message, text: '', finalUrl: url }; }
}

async function main() {
  // 1) sitemap 种子（改写为 github.io 地址）
  let seeds = [BASE + '/'];
  try {
    const sm = await (await fetch(BASE + '/sitemap.xml')).text();
    const locs = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].trim())
      .map(u => u.replace('https://zenspace-design.cn', BASE));
    seeds = [...new Set([...seeds, ...locs])];
    console.log(`sitemap 收录 ${locs.length} 条 URL（已改写 github.io）`);
  } catch (e) { console.log('sitemap 抓取失败: ' + e.message); }

  const queue = [...seeds];

  while (queue.length) {
    const url = queue.shift();
    if (visitedPages.has(url)) continue;
    visitedPages.add(url);

    const res = await get(url);
    const isPageSeed = url.startsWith(BASE);
    pageRows.push({ url, status: res.status });
    console.log(`  页面 [${res.status}] ${url.replace(BASE, '') || '/'}`);

    if (res.status !== 200) {
      if (isPageSeed) brokenPages.push({ url, status: res.status });
      continue;
    }

    // 解析资源 + 内链
    const html = res.text;
    const aRe = /<a[^>]+href=["']([^"']+)["']/gi;
    const sRe = /<script[^>]+src=["']([^"']+)["']/gi;
    const lRe = /<link[^>]+href=["']([^"']+)["']/gi;
    const iRe = /<img[^>]+src=["']([^"']+)["']/gi;

    let m;
    const baseUrl = res.finalUrl || url;
    const internal = [];
    while ((m = aRe.exec(html))) { const n = norm(baseUrl, m[1]); if (n) internal.push(n); }
    const assets = [];
    while ((m = sRe.exec(html))) { const n = norm(baseUrl, m[1]); if (n) assets.push(n); }
    while ((m = lRe.exec(html))) { const n = norm(baseUrl, m[1]); if (n) assets.push(n); }
    while ((m = iRe.exec(html))) { const n = norm(baseUrl, m[1]); if (n) assets.push(n); }

    for (const a of internal) {
      if (!visitedPages.has(a) && a.startsWith(BASE)) queue.push(a);
      if (!a.startsWith(BASE)) {
        // 同源但缺子路径 -> base 路径 bug，单独记录待查
        brokenInternalLinks.push({ from: url, url: a });
      } else {
        // 已含正确子路径的站内链, 入队检查(已在 queue 处理)
      }
    }
    for (const a of assets) {
      if (assetSeen.has(a)) continue;
      assetSeen.add(a);
      const ar = await get(a);
      assetRows.push({ url: a, status: ar.status });
      console.log(`  资源 [${ar.status}] ${a.replace(ORIGIN, '')}`);
    }
  }

  // 校验"缺子路径"的站内死链是否真 404
  const baseBugChecked = [];
  for (const b of brokenInternalLinks) {
    const r = await get(b.url);
    baseBugChecked.push({ ...b, status: r.status });
  }

  // 汇总
  console.log('\n========== 复核结果 ==========');
  const okPages = pageRows.filter(r => r.status === 200).length;
  const okAssets = assetRows.filter(r => r.status === 200).length;
  console.log(`页面: 请求 ${pageRows.length} 个, 200 OK ${okPages} 个, 非200 ${pageRows.length - okPages} 个`);
  console.log(`资源(JS/CSS/Img): 检查 ${assetRows.length} 个, 200 OK ${okAssets} 个, 非200 ${assetRows.length - okAssets} 个`);
  console.log(`站内根绝对内链(缺 /zenspace-design 子路径, base bug): ${baseBugChecked.length} 条`);

  if (brokenPages.length) {
    console.log('\n--- sitemap 中真实 404 页面 ---');
    for (const p of brokenPages) console.log(`  [${p.status}] ${p.url.replace(BASE, '')}`);
  }
  if (baseBugChecked.length) {
    console.log('\n--- base 路径 bug：内链 404（缺 /zenspace-design）---');
    const uniq = [...new Set(baseBugChecked.map(b => b.url))];
    for (const u of uniq) {
      const ex = baseBugChecked.find(b => b.url === u);
      console.log(`  [${ex.status}] ${u.replace(ORIGIN, '')}  (例: 来自 ${ex.from.replace(BASE, '') || '/'})`);
    }
  }
  if (assetRows.length - okAssets > 0) {
    console.log('\n--- 异常静态资源 ---');
    for (const a of assetRows.filter(r => r.status !== 200)) console.log(`  [${a.status}] ${a.url.replace(ORIGIN, '')}`);
  }
  const allGood = brokenPages.length === 0 && baseBugChecked.length === 0 && (assetRows.length - okAssets) === 0;
  if (allGood) console.log('\n✅ 全部页面、资源、内链 HTTP 200，无死链。');
  else console.log('\n⚠️ 存在上述问题，见上方明细。');
}

main();
