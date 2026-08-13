"""Frame and grade the Our Story plate to the reference direction.

The source is the brass dheepam photograph the section already used (previously
pulled from Unsplash at runtime). Two things had to change to match the
reference: the frame ratio (a near-square 14:15 instead of a 4:5 portrait) and
the light. The photograph is shot flat, cool and pale; the reference is a warm
cinematic still with the brass glowing out of a dark surround.

Nothing is retouched or re-drawn - the lamp is cropped whole, then graded:
a warm per-channel curve, a radial fall-off to warm brown so the pale studio
background reads as depth, and a soft bloom lifted off the photo's own
highlights around the flame.

Run after any source swap, then eyeball tools/story-plate-preview.png before
wiring it in.
"""
import os
from pathlib import Path

from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageOps

# See build-hero-plate.py — paths resolve from this file, not from a fixed drive.
REPO = Path(__file__).resolve().parents[1]                  # Dheepam Website\
SRC_DIR = Path(os.environ.get("DHEEPAM_IMAGES") or REPO.parent / "Images")

SRC = SRC_DIR / "story-dheepam-source.jpg"
OUT = REPO / "src" / "imports" / "story-dheepam.webp"
PREVIEW = Path(__file__).resolve().parent / "story-plate-preview.png"

W, H = 1400, 1500          # delivered plate - 14:15, matching `.story-plate`
CROP_CX = 1500             # lamp centre in the 2800px source, nudged right so
                           # the wicker basket keeps to the far edge where the
                           # fall-off swallows it
SKY = 430                  # invented bokeh headroom - see below
FEATHER = 150              # cross-fade depth between headroom and photograph
BAND = 260                 # photo rows used to extrapolate it
SKY_BLUR = 30
VIGNETTE = (32, 16, 6)     # warm brown the surround falls off to
VIG_START = 0.42           # normalised radius where the fall-off begins
VIG_MAX = 0.92             # strength at the frame edge
VIG_NORM = 1.15            # < corner radius (1.414), so the mid-edges darken
                           # too rather than only the four corners - the pale
                           # studio wall reads either side of the bowl
BLOOM = 0.42               # warm bloom lifted off the photo's own highlights

src = Image.open(SRC).convert("RGB")

# ── Headroom ──────────────────────────────────────────────────────────────
# A 14:15 window cut from the source's own height is only 1742px wide, and the
# lamp bowl alone measures 1680 of that: the bowl would touch both edges. The
# reference leaves it roughly 14% of margin, so the canvas is grown upward
# first and the wider window taken from that.
#
# Safe to invent here, and only here: the top of the frame is entirely
# out-of-focus bokeh (a brass jar, a terracotta pot, a pale wall). The band is
# mirrored so the bottom row of the extension matches row 0 of the photograph
# exactly, then stretched and blurred until it reads as continued bokeh -
# the same construction as the hero plate.
sky = ImageOps.flip(src.crop((0, 0, src.width, BAND))).resize((src.width, SKY), Image.LANCZOS)
sky = sky.filter(ImageFilter.GaussianBlur(SKY_BLUR))
lap = src.crop((0, 0, src.width, FEATHER)).filter(ImageFilter.GaussianBlur(SKY_BLUR))
sky_full = Image.new("RGB", (src.width, SKY + FEATHER))
sky_full.paste(sky, (0, 0))
sky_full.paste(lap, (0, SKY))

tall = Image.new("RGB", (src.width, SKY + src.height))
tall.paste(src, (0, SKY))
seam = Image.new("L", (src.width, SKY + FEATHER), 255)
sp = seam.load()
for y in range(FEATHER):                     # 255 -> 0 across the seam
    v = round(255 * (1 - y / FEATHER) ** 1.4)
    for x in range(src.width):
        sp[x, SKY + y] = v
tall.paste(sky_full, (0, 0), seam)

# ── Frame ─────────────────────────────────────────────────────────────────
# Full canvas height, width derived from it, so the crop is the widest 14:15
# window available and the lamp is never cut.
cw = round(tall.height * W / H)
left = min(max(CROP_CX - cw // 2, 0), tall.width - cw)
plate = tall.crop((left, 0, left + cw, tall.height)).resize((W, H), Image.LANCZOS)

# ── Warm curve ────────────────────────────────────────────────────────────
# Red opened up, blue pulled back and deepened: the studio background goes from
# grey-lavender to warm sand, and the brass recovers the amber it lost to the
# flat lighting.
r, g, b = plate.split()
r = r.point(lambda v: min(255, round(255 * (v / 255) ** 0.88 * 1.03)))
g = g.point(lambda v: round(255 * (v / 255) ** 1.02 * 0.98))
b = b.point(lambda v: round(255 * (v / 255) ** 1.30 * 0.86))
plate = Image.merge("RGB", (r, g, b))
plate = ImageEnhance.Color(plate).enhance(1.22)
plate = ImageEnhance.Contrast(plate).enhance(1.14)

# ── Radial fall-off ───────────────────────────────────────────────────────
# Built small and scaled up rather than looped per pixel (2.1M pixels in pure
# Python is minutes, not seconds) - LANCZOS on a 140x150 ramp is smooth to the
# eye at this size.
gw, gh = 140, 150
ramp = Image.new("L", (gw, gh))
rp = ramp.load()
for y in range(gh):
    dy = (y + 0.5) / gh * 2 - 1
    for x in range(gw):
        dx = (x + 0.5) / gw * 2 - 1
        d = min(1.0, (dx * dx + dy * dy) ** 0.5 / VIG_NORM)
        t = max(0.0, (d - VIG_START) / (1 - VIG_START))
        rp[x, y] = round(255 * VIG_MAX * t ** 1.7)
ramp = ramp.resize((W, H), Image.LANCZOS)
plate = Image.composite(Image.new("RGB", (W, H), VIGNETTE), plate, ramp)

# ── Flame bloom ───────────────────────────────────────────────────────────
# The photo's own highlights, blurred and screened back warm, so the flame
# pools light onto the brass the way the reference does.
lum = plate.convert("L").point(lambda v: max(0, v - 168) * 3)
glow = Image.merge("RGB", (
    lum.point(lambda v: round(v * 1.00)),
    lum.point(lambda v: round(v * 0.72)),
    lum.point(lambda v: round(v * 0.34)),
)).filter(ImageFilter.GaussianBlur(46))
glow = ImageEnhance.Brightness(glow).enhance(BLOOM)
plate = ImageChops.screen(plate, glow)

plate.save(OUT, "WEBP", quality=88, method=6)
plate.save(PREVIEW)
print(f"{W}x{H}  ratio {W / H:.4f}  crop x {left}..{left + cw} of {src.width}")
