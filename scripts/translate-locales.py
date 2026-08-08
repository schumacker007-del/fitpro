#!/usr/bin/env python3
"""Translate en-dict.json into zh, ja, hi using deep-translator (Google)."""
import json
import re
import time
from pathlib import Path

try:
    from deep_translator import GoogleTranslator
except ImportError:
    raise SystemExit("Run: pip3 install deep-translator")

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / ".tmp/en-dict.json"
OUT_DIR = ROOT / ".tmp/translations"
OUT_DIR.mkdir(parents=True, exist_ok=True)

TARGETS = {
    "zh": "zh-CN",
    "ja": "ja",
    "hi": "hi",
}

PLACEHOLDER_RE = re.compile(r"\{[^}]+\}")


def protect(text: str):
    tokens = {}

    def repl(m):
        key = f"__PH_{len(tokens)}__"
        tokens[key] = m.group(0)
        return key

    protected = PLACEHOLDER_RE.sub(repl, text)
    return protected, tokens


def restore(text: str, tokens: dict) -> str:
    for key, val in tokens.items():
        text = text.replace(key, val)
    return text


def translate_dict(en: dict, dest: str) -> dict:
    translator = GoogleTranslator(source="en", target=dest)
    out = {}
    items = list(en.items())
    for i, (key, value) in enumerate(items, 1):
        if not value.strip():
            out[key] = value
            continue
        protected, tokens = protect(value)
        try:
            translated = translator.translate(protected)
            out[key] = restore(translated, tokens)
        except Exception as e:
            print(f"WARN {dest} {key}: {e}")
            out[key] = value
        if i % 25 == 0:
            print(f"  {dest}: {i}/{len(items)}")
            time.sleep(0.5)
    return out


def main():
    en = json.loads(SRC.read_text(encoding="utf-8"))
    for code, google_code in TARGETS.items():
        out_path = OUT_DIR / f"{code}.json"
        if out_path.exists():
            print(f"Skip {code} (exists)")
            continue
        print(f"Translating -> {code} ({google_code})")
        translated = translate_dict(en, google_code)
        out_path.write_text(json.dumps(translated, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Saved {out_path} ({len(translated)} keys)")


if __name__ == "__main__":
    main()
