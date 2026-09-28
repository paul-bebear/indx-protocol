"""Build a static bilingual menu page (ES/EN) with schema.org Menu markup.
Usage: python build_menu.py venue.json out_dir/
One JSON per venue; the output is a single index.html with no JavaScript."""
import json, sys, html, os
from datetime import date

ALLERGENS_EN = {"gluten":"gluten","crustáceos":"crustaceans","huevo":"egg","pescado":"fish","cacahuetes":"peanuts",
  "soja":"soy","leche":"milk","frutos de cáscara":"tree nuts","apio":"celery","mostaza":"mustard","sésamo":"sesame",
  "sulfitos":"sulphites","altramuces":"lupin","moluscos":"molluscs"}

def eur(p): return f"{p:.2f}".replace(".", ",") + " €"
def e(s): return html.escape(s, quote=True)

def build(v):
    color = v.get("color", "#24473A")
    upd = date.fromisoformat(v["updated"])
    months = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
    upd_es = f"{upd.day} de {months[upd.month-1]} de {upd.year}"
    upd_en = upd.strftime("%-d %B %Y")
    nav, body, ld_sections = [], [], []
    for i, s in enumerate(v["sections"]):
        sid = f"s{i+1}"
        nav.append(f'<a href="#{sid}">{e(s["es"])}</a>')
        rows, ld_items = [], []
        for it in s["items"]:
            al = it.get("allergens", [])
            tags = []
            if it.get("vegan"): tags.append('<span class="tag">vegano / vegan</span>')
            al_line = (f'<p class="al">Contiene: {e(", ".join(al))}<span lang="en">Contains: {e(", ".join(ALLERGENS_EN.get(a,a) for a in al))}</span></p>'
                       if al else "")
            rows.append(f'''<li class="dish">
  <div class="top"><h3>{e(it["es"])}</h3><i class="dots"></i><span class="price">{eur(it["price"])}</span></div>
  <p class="en" lang="en">{e(it["en"])}</p>{"".join(tags)}{al_line}
</li>''')
            mi = {"@type":"MenuItem","name":it["es"],"description":it["en"],
                  "offers":{"@type":"Offer","price":f'{it["price"]:.2f}',"priceCurrency":"EUR"}}
            if it.get("vegan"): mi["suitableForDiet"] = "https://schema.org/VeganDiet"
            ld_items.append(mi)
        body.append(f'<section id="{sid}"><h2>{e(s["es"])} <span lang="en">{e(s["en"])}</span></h2><ul>{"".join(rows)}</ul></section>')
        ld_sections.append({"@type":"MenuSection","name":s["es"],"alternateName":s["en"],"hasMenuItem":ld_items})
    ld = {"@context":"https://schema.org","@type":"Menu","name":f'Carta de {v["name"]}',"inLanguage":["es","en"],
          "dateModified":v["updated"],"hasMenuSection":ld_sections}
    demo = v.get("demo", False)
    ribbon = ('<div class="ribbon">Carta de ejemplo hecha por <a href="/">Indexable</a>. Este bar no existe.'
              '<span lang="en"> Sample menu by Indexable. This bar doesn\'t exist.</span></div>') if demo else ""
    robots = '<meta name="robots" content="noindex">' if demo else ""
    return f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Carta | {e(v["name"])}</title>
<meta name="description" content="Carta de {e(v["name"])} en español e inglés, con precios y alérgenos.">
{robots}
<meta name="theme-color" content="{color}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600&family=Young+Serif&display=swap" rel="stylesheet">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<style>
:root{{--c:{color};--ink:#20231F;--muted:#5F665F;--line:#E1E4DF}}
*{{box-sizing:border-box}}
body{{margin:0;background:#fff;color:var(--ink);font:400 1rem/1.5 "Public Sans",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}}
a{{color:var(--c)}}
.ribbon{{background:#FFF3C4;color:#4A3B00;font-size:.85rem;padding:.6rem 1rem;text-align:center}}
.ribbon span{{display:block}}
header{{background:var(--c);color:#fff;padding:1.75rem 1.25rem 1.5rem}}
header h1{{margin:0;font:400 2rem/1.1 "Young Serif",Georgia,serif}}
header p{{margin:.35rem 0 0;opacity:.9}}
nav{{position:sticky;top:0;background:#fff;border-bottom:1px solid var(--line);display:flex;gap:1.1rem;overflow-x:auto;padding:.8rem 1.25rem;white-space:nowrap;z-index:1}}
nav a{{text-decoration:none;font-weight:600}}
nav a:focus-visible{{outline:3px solid var(--c);outline-offset:2px}}
main{{max-width:40rem;margin:0 auto;padding:0 1.25rem 2rem}}
section{{scroll-margin-top:3.5rem}}
h2{{font:400 1.35rem/1.2 "Young Serif",Georgia,serif;margin:2rem 0 .25rem;color:var(--c)}}
h2 span{{font:400 .95rem system-ui,sans-serif;color:var(--muted);margin-left:.35rem}}
ul{{list-style:none;margin:0;padding:0}}
.dish{{padding:.9rem 0;border-bottom:1px solid var(--line)}}
.top{{display:flex;gap:.5rem;align-items:baseline}}
.dots{{flex:1;min-width:1rem;border-bottom:1.5px dotted #B9BEB6;transform:translateY(-.3rem)}}
.lt{{float:right;font:600 .8rem system-ui,sans-serif;background:transparent;color:#fff;border:1px solid rgba(255,255,255,.6);border-radius:99px;padding:.25rem .7rem;cursor:pointer;margin-top:.2rem}}
body[data-l=es] [lang=en],body[data-l=en] .es-only{{display:none!important}}
.lt:focus-visible{{outline:3px solid #fff;outline-offset:2px}}
h3{{margin:0;font-size:1.05rem;font-weight:600}}
.price{{white-space:nowrap;font-weight:600}}
.en{{margin:.15rem 0 0;color:var(--muted);font-size:.95rem}}
.al{{margin:.3rem 0 0;font-size:.8rem;color:var(--muted)}}
.al span{{display:block}}
.tag{{display:inline-block;margin-top:.35rem;font-size:.75rem;border:1px solid var(--c);color:var(--c);border-radius:999px;padding:.05rem .5rem}}
footer{{max-width:40rem;margin:0 auto;padding:1.5rem 1.25rem 2.5rem;color:var(--muted);font-size:.85rem}}
footer p{{margin:0 0 .5rem}}
</style>
</head>
<body>
{ribbon}
<header><button class="lt" type="button" hidden>English</button><h1>{e(v["name"])}</h1><p>{e(v["tagline_es"])}. {e(v["hours_es"])}.</p><p lang="en">{e(v["tagline_en"])}. {e(v["hours_en"])}.</p></header>
<nav aria-label="Secciones de la carta">{"".join(nav)}</nav>
<main>{"".join(body)}</main>
<footer>
<p>Precios con IVA incluido. Alérgenos confirmados por el local: si tienes alguna alergia o intolerancia, avisa al personal.</p>
<p lang="en">Prices include VAT. Allergens confirmed by the venue: please tell staff about any allergy or intolerance.</p>
<p>Actualizada el {upd_es}. <span lang="en">Updated {upd_en}.</span></p>
</footer>
<script>
(function(){{var b=document.querySelector('.lt');b.hidden=false;var l='es';document.body.dataset.l=l;
b.addEventListener('click',function(){{l=l==='es'?'en':'es';document.body.dataset.l=l;b.textContent=l==='es'?'English':'Español'}});}})();
</script>
</body>
</html>'''

if __name__ == "__main__":
    src, out = sys.argv[1], sys.argv[2]
    v = json.load(open(src, encoding="utf-8"))
    os.makedirs(out, exist_ok=True)
    open(os.path.join(out, "index.html"), "w", encoding="utf-8").write(build(v))
    print("wrote", os.path.join(out, "index.html"))
