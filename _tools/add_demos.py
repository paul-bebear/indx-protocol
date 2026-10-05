"""Copy tattoo demo builds into /demos and make their thumbnails.

Usage: python3 _tools/add_demos.py            # all demos below
       python3 _tools/add_demos.py hachasketch # one

Source: ~/projects/tattoo-website-skeleton/dist/<handle>/ (run `python3 build.py <handle>` there first).
Each page gets a thin "back to indexable.pro" bar; thumbnails (phone, first screen) go to assets/demos/<slug>.jpg.
To add a demo: add a line here, run this, then add a card in tatuadores.html and en/tattoo-artists.html.
"""
import io, pathlib, sys
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SKEL = pathlib.Path.home() / 'projects/tattoo-website-skeleton/dist'
DEMOS = {  # slug (URL folder): skeleton handle
    'necr0lin333sss': 'necr0lin333sss',
    'bricetattooer': 'bricetattooer',
    'naotis': 'nao.tis',
    'hachasketch': 'hachasketch',
}
BAR = ('<div style="background:#F4F5F2;border-bottom:1px solid #DCDFE4;font:600 14px/1.2 system-ui,-apple-system,\'Segoe UI\',sans-serif">'
       '<a href="/tatuadores#ejemplos" style="display:flex;align-items:center;justify-content:center;min-height:44px;padding:0 16px;color:#1E3F8F;text-decoration:none">'
       '← indexable.pro · web de ejemplo</a></div>')

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
            copy(slug, DEMOS[slug]); thumb(page, slug); print('ok', slug)
        b.close()
