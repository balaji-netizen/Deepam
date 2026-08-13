"""Build the two supplied section plates into `src/imports/` as WebP.

Unlike `build-hero-plate.py` and `build-story-plate.py`, neither of these
*constructs* a frame — both sources were supplied already framed for the slot
they ship into, so this is the plain compress-to-WebP path from CLAUDE.md §6.
The only geometry here is a 2px height trim on the agarbatti scene to land it on
exactly 13:6, the ratio `.tile-plinth.fold-plinth.is-scene` asks for.

    python tools/build-section-plates.py
"""
import os
from pathlib import Path

from PIL import Image

# See build-hero-plate.py — paths resolve from this file, not from a fixed drive.
REPO = Path(__file__).resolve().parents[1]                  # Dheepam Website\
SRC = Path(os.environ.get("DHEEPAM_IMAGES") or REPO.parent / "Images")
OUT = REPO / "src" / "imports"


def report(path: Path, im: Image.Image) -> None:
    kb = path.stat().st_size / 1024
    print(f"  {path.relative_to(REPO)}  {im.width}x{im.height}  {kb:.1f}KB")


def our_story() -> None:
    """Our Story plate — 14:15 already, so zero crop at any breakpoint.

    The source is only 520x557, which is exactly the CSS size of the desktop
    frame (`--story-plate-max: 520px`) — i.e. this is a 1x asset where the old
    tool-built plate was 1400x1500. Nothing here can invent the missing detail;
    upscaling would only add bytes. Quality is pushed to 90 instead, since the
    asset is small enough that it costs almost nothing.
    """
    im = Image.open(SRC / "Our Story.png").convert("RGB")
    assert im.size == (520, 557), im.size
    dst = OUT / "our-story.webp"
    im.save(dst, "WEBP", quality=90, method=6)
    report(dst, im)


def agarbatti() -> None:
    """Agarbatti product tile — a full set photograph, so it ships as a scene.

    The source is 1844x853 (2.1618:1) against the tile's 13:6 (2.1667:1), so it
    is framed with essentially no crop: resized to 1400 wide, then two pixels of
    height taken off centred. 1400x646 is deliberately the same decode size as
    `lamp-oil-scene.webp` — the two are companion shots on the same gold set and
    they sit side by side in the section.
    """
    im = Image.open(SRC / "Agarbatti.png").convert("RGB")
    w = 1400
    h = round(im.height * w / im.width)          # 647
    im = im.resize((w, h), Image.LANCZOS)
    target_h = round(w * 6 / 13)                 # 646
    top = (h - target_h) // 2
    im = im.crop((0, top, w, top + target_h))
    dst = OUT / "products" / "agarbatti-scene.webp"
    im.save(dst, "WEBP", quality=86, method=6)
    report(dst, im)


if __name__ == "__main__":
    print("building section plates…")
    our_story()
    agarbatti()
