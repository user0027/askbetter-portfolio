#!/usr/bin/env python3
"""모든 페이지의 본문 틀(.page·.wrap)이 헤더와 같은 좌우 선에 서는지 잰다.

기준은 헤더 .nav .page 의 안쪽(패딩 제외) 왼쪽·오른쪽 선이다. 본문 틀의 안쪽 선이
그 선과 어긋나면 페이지·폭·요소를 적고 1로 끝난다.

틀 안의 글줄도 잰다. 두 줄 이상인 문단(p·li)이 자기를 담은 칸의 오른쪽 끝보다
GAP 넘게 일찍 끝나면 어긋남으로 센다. 틀은 맞는데 글만 폭 제한에 걸려 중간에서
꺾이는 것을 잡으려는 것이다(2026-09-26, 이것을 안 재서 같은 지적을 세 번 받았다).
사용: python3 scripts/check-margins.py   (playwright + 크롬 필요)
"""
import pathlib, sys
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ['index.html', 'case-study.html', 'deep-dive.html']
WIDTHS = [1440, 1280, 900, 500]
TOL = 1
GAP = 40

JS = """() => {
  const inner = el => { const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    return [r.left + parseFloat(cs.paddingLeft), r.right - parseFloat(cs.paddingRight)]; };
  const nav = document.querySelector('.nav .page');
  const [L, R] = inner(nav);
  const out = [];
  document.querySelectorAll('main .page, body > section .wrap, section .page, section .wrap, footer .page, footer .wrap').forEach(el => {
    if (el.closest('.nav') || !el.offsetParent) return;
    const [l, r] = inner(el);
    const sel = el.tagName.toLowerCase() + '.' + [...el.classList].join('.') + ' in ' + (el.closest('section,footer')?.className || el.closest('section,footer')?.tagName || '');
    out.push({sel, l: Math.round(l), r: Math.round(r)});
  });
  const text = [];
  document.querySelectorAll('section p, section li').forEach(el => {
    if (el.closest('.nav') || !el.offsetParent) return;
    const cs = getComputedStyle(el), lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.6;
    const r = el.getBoundingClientRect();
    if (r.height < lh * 1.9) return;
    const pd = getComputedStyle(el.parentElement).display;
    if (pd.includes('grid') || pd.includes('flex')) return;  // 칸 나눔 안의 항목은 칸이 폭을 정한다
    const [, pr] = inner(el.parentElement);
    const gap = Math.round(pr - r.right);
    if (gap > __GAP__) text.push({sel: el.tagName.toLowerCase() + ' "' + el.textContent.trim().slice(0, 18) + '" in ' + (el.parentElement.className || el.parentElement.tagName), gap});
  });
  return {L: Math.round(L), R: Math.round(R), out, text, sw: document.documentElement.scrollWidth};
}"""

bad = 0
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    for name in PAGES:
        for w in WIDTHS:
            pg = b.new_page(viewport={'width': w, 'height': 900})
            pg.goto((ROOT / name).as_uri())
            d = pg.evaluate(JS.replace('__GAP__', str(GAP)))
            if d['sw'] > w:
                print(f'{name} @{w}: 가로 스크롤 생김 (문서 폭 {d["sw"]})'); bad += 1
            seen = set()
            for e in d['out']:
                if abs(e['l'] - d['L']) > TOL or abs(e['r'] - d['R']) > TOL:
                    key = (e['sel'], e['l'], e['r'])
                    if key in seen: continue
                    seen.add(key)
                    print(f"{name} @{w}: {e['sel']}  {e['l']}~{e['r']}  (헤더 {d['L']}~{d['R']})"); bad += 1
            for t in d['text']:
                print(f"{name} @{w}: 글줄이 칸 끝보다 {t['gap']}px 일찍 끝남  {t['sel']}"); bad += 1
            pg.close()
    b.close()
print('좌우 선 일치' if not bad else f'어긋남 {bad}건')
sys.exit(1 if bad else 0)
