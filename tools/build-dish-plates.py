"""Build the five Neivedhyam slide plates from the supplied artwork.

Sources live in `Images/` and are named for the dish, exactly as the slider
lists them. They arrive at ~1450x1085 — 1.336:1 against the slide frame's 4:3
(1.3333) — so the only geometry here is a ~3px width trim to land the ratio
exactly. Everything else is the plain compress-to-WebP path.

Run this after any swap of the five source files, then look at the contact
sheet it writes before wiring anything in (CLAUDE.md §6).

    python tools/build-dish-plates.py
"""

import os
from pathlib import Path

from PIL import Image, ImageDraw

# See build-hero-plate.py — paths resolve from this file, not from a fixed drive.
REPO = Path(__file__).resolve().parents[1]                  # Dheepam Website\
SRC = Path(os.environ.get("DHEEPAM_IMAGES") or REPO.parent / "Images")
OUT = REPO / "src" / "imports" / "dishes"
SHEET = Path(__file__).resolve().parent / "dish-plates-preview.png"

# Slide order is the brief's order — the contact sheet reads left to right in it.
DISHES = [
    ("Paal Payasam", "paal-payasam"),
    ("Boondi Laddu", "boondi-laddu"),
    ("Puliyodarai", "puliyodarai"),
    ("Sakkarai Pongal", "sakkarai-pongal"),
    ("Kesari Bath", "kesari-bath"),
]

# The desktop frame is ~674px wide at 1440 and the srcSet's largest step is
# 1400w, so 1200x900 covers a 2x desktop plate with no upscale anywhere.
TARGET = (1200, 900)
QUALITY = 86


def frame(im: Image.Image) -> Image.Image:
    """Centre-crop to 4:3, then resize to TARGET."""
    w, h = im.size
    want = TARGET[0] / TARGET[1]
    if w / h > want:                       # too wide — trim the sides
        new_w = round(h * want)
        box = ((w - new_w) // 2, 0, (w - new_w) // 2 + new_w, h)
    else:                                  # too tall — trim top and bottom
        new_h = round(w / want)
        box = (0, (h - new_h) // 2, w, (h - new_h) // 2 + new_h)
    return im.crop(box).resize(TARGET, Image.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    plates = []
    for label, slug in DISHES:
        src = SRC / f"{label}.png"
        im = Image.open(src).convert("RGB")
        plate = frame(im)
        dest = OUT / f"{slug}.webp"
        plate.save(dest, "WEBP", quality=QUALITY, method=6)
        kb = dest.stat().st_size / 1024
        print(f"{label:16} {im.size} -> {plate.size}  {kb:6.1f} KB  {dest.name}")
        plates.append((label, plate))

    # Contact sheet at the crop the slide actually ships, so the five can be
    # read as a set rather than trusted from their filenames.
    cell_w, cell_h, pad, bar = 420, 315, 16, 28
    sheet = Image.new("RGB", (cell_w * 3 + pad * 4, (cell_h + bar) * 2 + pad * 3), "#F4E6C8")
    d = ImageDraw.Draw(sheet)
    for i, (label, plate) in enumerate(plates):
        col, row = i % 3, i // 3
        x = pad + col * (cell_w + pad)
        y = pad + row * (cell_h + bar + pad)
        sheet.paste(plate.resize((cell_w, cell_h), Image.LANCZOS), (x, y))
        d.text((x + 4, y + cell_h + 7), f"{i + 1}. {label}", fill="#111111")
    sheet.save(SHEET)
    print(f"\ncontact sheet -> {SHEET}")


if __name__ == "__main__":
    main()
