"""Copy tattoo demo builds into /demos and make their thumbnails.

Usage: python3 _tools/add_demos.py            # all demos below
       python3 _tools/add_demos.py hachasketch # one

Source: ~/projects/tattoo-website-skeleton/dist/<handle>/ (run `python3 build.py <handle>` there first).
Each page gets a thin "back to indexable.pro" bar; thumbnails (phone, first screen) go to assets/demos/<slug>.jpg.
To add a demo: add a line here, run this, then add a card in tatuadores.html and en/tattoo-artists.html.
"""
import io, pathlib, re, shutil, sys
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SKEL = pathlib.Path.home() / 'projects/tattoo-website-skeleton/dist'
DEMOS = {  # slug (URL folder): skeleton handle, or a dict for a multi-file build from elsewhere
    'necr0lin333sss': 'necr0lin333sss',
    'bricetattooer': 'bricetattooer',
    # nao.tis = the Codex bake-off entry, Version 4 (`npm run build` in that folder first; never versions/v1-v3)
    'naotis': {'dist': pathlib.Path.home() / 'projects/tattoo-bakeoff/codex/dist',
               'thumb': pathlib.Path.home() / 'projects/tattoo-bakeoff/codex/screenshots/home-390-viewport.png'},
    'hachasketch': 'hachasketch',
}
BAR = ('<div style="background:#F4F5F2;border-bottom:1px solid #DCDFE4;font:600 14px/1.2 system-ui,-apple-system,\'Segoe UI\',sans-serif">'
       '<a href="/tatuadores#ejemplos" style="display:flex;align-items:center;justify-content:center;min-height:44px;padding:0 16px;color:#1E3F8F;text-decoration:none">'
       '← indexable.pro · web de ejemplo</a></div>')

ROOTED = re.compile(r'(?<=["\'`\s,(])/(?=img/|fonts/|styles\.css|app\.js|en/|aftercare\.html|#|["\'])')

def copy_dist(slug, src):
    # A site built to live at "/": copy it under /demos/<slug>/ and prefix its root paths so links, images,
    # fonts and scripts resolve there instead of at indexable.pro's own root.
    out = ROOT / 'demos' / slug
    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(src, out, ignore=shutil.ignore_patterns('robots.txt', '.DS_Store'))
    base = f'/demos/{slug}/'
    for f in list(out.rglob('*.html')) + list(out.rglob('*.js')) + list(out.rglob('*.css')):
        text = ROOTED.sub(base, f.read_text(encoding='utf-8'))
        if f.suffix == '.html':
            i = text.index('<body') ; i = text.index('>', i) + 1
            text = text[:i] + '\n' + BAR + text[i:]
        f.write_text(text, encoding='utf-8')

def thumb_from(path, slug):
    im = Image.open(path).convert('RGB')
    im = im.resize((560, round(im.height * 560 / im.width)), Image.LANCZOS)
    im.save(ROOT / 'assets/demos' / f'{slug}.jpg', quality=78, optimize=True, progressive=True)

def copy(slug, handle):
    out = ROOT / 'demos' / slug
    out.mkdir(parents=True, exist_ok=True)
    for name in ('index.html', 'cuidados.html'):
        html = (SKEL / handle / name).read_text(encoding='utf-8')
        i = html.index('<body>') + len('<body>')
        (out / name).write_text(html[:i] + '\n' + BAR + html[i:], encoding='utf-8')

def thumb(page, slug):
    page.goto((ROOT / 'demos' / slug / 'index.html').as_uri())
    page.wait_for_timeout(3000)  # let the hero animation settle
    im = Image.open(io.BytesIO(page.screenshot())).convert('RGB')
    im = im.resize((560, round(im.height * 560 / im.width)), Image.LANCZOS)
    im.save(ROOT / 'assets/demos' / f'{slug}.jpg', quality=78, optimize=True, progressive=True)

if __name__ == '__main__':
    pick = sys.argv[1:] or list(DEMOS)
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page(viewport={'width': 375, 'height': 760}, device_scale_factor=2)
        for slug in pick:
            d = DEMOS[slug]
            if isinstance(d, dict):
                copy_dist(slug, d['dist']); thumb_from(d['thumb'], slug)
            else:
                copy(slug, d); thumb(page, slug)
            print('ok', slug)
        b.close()
