stops = []
for i in range(101):
    pct = i / 100.0
    t = pct ** 1.8
    r = int(round(t * 6.0))
    g = int(round(t * 27.0))
    b = int(round(t * 53.0))
    hex_col = f"#{r:02x}{g:02x}{b:02x}"
    stops.append(f'    <stop offset="{pct*100:.1f}%" stop-color="{hex_col}" />')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="none">
  <defs>
    <linearGradient id="smoothDarkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
{chr(10).join(stops)}
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#smoothDarkGradient)" />
</svg>'''

with open('public/gradient-16-9.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print("Saved vector SVG: public/gradient-16-9.svg")

