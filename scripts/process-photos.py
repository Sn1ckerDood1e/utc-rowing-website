#!/usr/bin/env python3
"""
Process UTC ARC photos for upload:
  - Convert HEIC -> JPEG (Website Build/Media/)
  - Bake EXIF rotation into Beverly's submission photos (writes .upload.jpg)

Idempotent: skips outputs that already exist.

Run before scripts/upload-photos.ts.
"""

from pathlib import Path

from PIL import Image, ImageOps
import pillow_heif

pillow_heif.register_heif_opener()

ARC = Path("/mnt/c/Users/hb/OneDrive/Desktop/UTC ARC")


def to_jpeg(src: Path, out: Path, quality: int = 92) -> None:
    if out.exists():
        print(f"  skip {out.name} (exists)")
        return
    img = Image.open(src)
    img = ImageOps.exif_transpose(img)
    if img.mode != "RGB":
        img = img.convert("RGB")
    img.save(out, "JPEG", quality=quality, optimize=True)
    print(f"  {src.name} -> {out.name}")


def main() -> None:
    print("Converting HEICs in Website Build/Media...")
    media = ARC / "Website Build" / "Media"
    for heic in sorted(media.glob("*.HEIC")):
        to_jpeg(heic, media / (heic.stem + ".jpg"))

    print("\nBaking EXIF rotation into Beverly's photos...")
    bev = ARC / "Submissions" / "2026-05-12 Beverly Newell"
    for fname in [
        "IMG_6907.jpeg",
        "IMG_9711.jpeg",
        "IMG_9712.jpeg",
        "IMG_9713.jpeg",
        "IMG_9714.jpeg",
        "IMG_9715.jpeg",
    ]:
        src = bev / fname
        if not src.exists():
            print(f"  MISSING {fname}")
            continue
        out = bev / fname.replace(".jpeg", ".upload.jpg")
        to_jpeg(src, out)

    print("\nBaking EXIF rotation into Chynna's photos...")
    chy = ARC / "Submissions" / "2026-05-25 Chynna Knight Cohen" / "photos"
    if chy.exists():
        for src in sorted(chy.iterdir()):
            if src.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
                continue
            if src.name.endswith(".upload.jpg"):
                continue
            out = chy / (src.stem + ".upload.jpg")
            to_jpeg(src, out)

    print("\nDone.")


if __name__ == "__main__":
    main()
