#!/usr/bin/env python3
"""Render the homepage with the Python standard library: python3 _homepage/build.py."""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "_homepage"
publications = json.loads((SOURCE / "publications.json").read_text())
assert len({p["id"] for p in publications}) == len(publications)
assert len({p["title"] for p in publications}) == len(publications)
rows = []
for p in sorted(publications, key=lambda p: -p["year"]):
    esc = html.escape
    authors = esc(p["authors"]).replace("Tianrong Chen", "<strong>Tianrong Chen</strong>")
    note = f'<span class="paper-note">{esc(p["note"])}</span>' if p.get("note") else ""
    summary = f'<p class="paper-summary">{esc(p["summary"])}</p>' if p.get("summary") else ""
    code = f'<a href="{esc(p["code"])}">Code <span aria-hidden="true">↗</span></a>' if p.get("code") else ""
    rows.append(f'''<li class="paper" data-category="{esc(p['category'])}" data-selected="{str(p['selected']).lower()}">
  <div class="paper-year">{p['year']}</div>
  <div class="paper-body">
    <div class="paper-meta"><span>{esc(p['venue'])} {p['year']}</span>{note}</div>
    <h3><a href="{esc(p['url'])}">{esc(p['title'])}</a></h3>
    <p class="paper-authors">{authors}</p>
    {summary}
    <div class="paper-links"><a href="{esc(p['url'])}">Paper <span aria-hidden="true">↗</span></a>{code}</div>
  </div>
</li>''')
template = (SOURCE / "index.html").read_text()
assert template.count("<!-- PUBLICATIONS -->") == 1
result = template.replace("<!-- PUBLICATIONS -->", "\n".join(rows))
result = "\n".join(line.rstrip() for line in result.splitlines()) + "\n"
(ROOT / "index.html").write_text(result)
print(f"Built index.html with {len(publications)} publications.")
