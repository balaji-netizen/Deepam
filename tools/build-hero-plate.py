"""Re-frame the 2.67:1 campaign panorama into a 1.65:1 hero plate.

The product cluster is never cropped, stretched or re-drawn - the whole
photograph is scaled as one unit and anchored bottom-right. The extra
headroom that a 1.65:1 frame demands is filled by extrapolating the amber
temple glow upward from the photo's own top rows, so the seam is colour-exact.
"""
import os
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

# Paths are resolved from this file, never hard-coded — the repo root is
# `Deepam Website\`, and the uncompressed sources deliberately live one level
# above it (outside the repo). Set DHEEPAM_IMAGES to point elsewhere.
REPO = Path(__file__).resolve().parents[1]                  # Deepam Website\
SRC_DIR = Path(os.environ.get("DHEEPAM_IMAGES") or REPO.parent / "Images")

SRC = SRC_DIR / "Banner 2.png"
OUT = REPO / "src" / "imports" / "hero-banner.webp"
PREVIEW = Path(__file__).resolve().parent / "hero-plate-preview.png"  # eyeball before shipping

W = 1900          # delivered width
SCALE_W = 2200    # photo is scaled wider than the canvas...
BLEED_L = 300     # ...and the surplus is taken off the LEFT, which is empty
                  # gradient. The right edge stays flush, so nothing on the
                  # product side is lost.
SKY = 327         # invented headroom above the photograph
FEATHER = 170     # cross-fade depth between sky and photograph
BAND = 300        # photo rows used to extrapolate the sky
BLUR = 32

src = Image.open(SRC).convert("RGB")
photo = src.resize((SCALE_W, round(src.height * SCALE_W / src.width)), Image.LANCZOS)
photo = photo.crop((BLEED_L, 0, BLEED_L + W, photo.height))   # 1900 x 825
H = SKY + photo.height                                         # 1152 -> 1.649:1

# Sky: the top BAND rows mirrored, so the bottom row of the extension is an
# exact match for row 0 of the photograph, then stretched and blurred until it
# reads as continued bokeh rather than duplicated ornament.
sky = ImageOps.flip(photo.crop((0, 0, W, BAND))).resize((W, SKY), Image.LANCZOS)
sky = sky.filter(ImageFilter.GaussianBlur(BLUR))
lap = photo.crop((0, 0, W, FEATHER)).filter(ImageFilter.GaussianBlur(BLUR))
sky_full = Image.new("RGB", (W, SKY + FEATHER))
sky_full.paste(sky, (0, 0))
sky_full.paste(lap, (0, SKY))

canvas = Image.new("RGB", (W, H))
canvas.paste(photo, (0, SKY))

mask = Image.new("L", (W, SKY + FEATHER), 255)
px = mask.load()
for y in range(FEATHER):                     # 255 -> 0 across the seam
    v = round(255 * (1 - y / FEATHER) ** 1.4)
    for x in range(W):
        px[x, SKY + y] = v
canvas.paste(sky_full, (0, 0), mask)

# Settle the new headroom: a soft warm dim at the crown so the nav and the
# headline sit on a calmer field instead of a flat smear.
dim = Image.new("RGB", (1, H), (46, 14, 5))
alpha = Image.new("L", (1, H))
ap = alpha.load()
for y in range(H):
    t = max(0.0, 1 - y / (SKY * 1.25))
    ap[0, y] = round(255 * 0.17 * t * t)
canvas = Image.composite(dim.resize((W, H)), canvas, alpha.resize((W, H)))

canvas.save(OUT, "WEBP", quality=86, method=6)
canvas.save(PREVIEW)
print(f"{W}x{H}  ratio {W / H:.3f}")
