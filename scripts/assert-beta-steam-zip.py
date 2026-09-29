#!/usr/bin/env python3
"""Assert the beta Steam archive and its documented browser/Steam target."""

from hashlib import sha256
from pathlib import Path
import re
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "CookieBotBeta4Steam.zip"
BETA_URL = "https://lbr88-labs.github.io/CookieBot/cookieAutoPlayBeta.js"
PAGE_BASE = "https://lbr88-labs.github.io/CookieBot/"
ROOT_USERSCRIPT_URL = f"{PAGE_BASE}CookieBot.user.js"
ROOT_BETA_URL = f"{PAGE_BASE}cookieAutoPlayBeta.js"
EXPECTED_MEMBERS = ("CookieBot Beta/info.txt", "CookieBot Beta/main.js")
INFO_SHA256 = "ea09e948bd659945f5799209b955486265548db589d9d3b0d776c20ceb12dcca"
STABLE_ZIP_SHA256 = "3d5ae6cd423c6b281c362248d7d31eef9d4e3d0fba02afe30a53da15637a424e"


def section(markdown: str, heading: str) -> str:
    start = markdown.index(heading)
    following = re.search(r"\n## ", markdown[start + len(heading) :])
    end = start + len(heading) + following.start() if following else len(markdown)
    return markdown[start:end]


readme = (ROOT / "README.md").read_text(encoding="utf-8")
browser_docs = section(readme, "## Beta browser bookmarklet")
steam_docs = section(readme, "## Steam")
assert BETA_URL in browser_docs, "README browser beta URL differs from the packaged target"
assert BETA_URL in steam_docs, "README Steam beta URL differs from the packaged target"
assert PAGE_BASE in (ROOT / "BUILD_SYSTEM.md").read_text(encoding="utf-8")
assert PAGE_BASE in (ROOT / "README-TYPESCRIPT.md").read_text(encoding="utf-8")

root_userscript = (ROOT / "CookieBot.user.js").read_text(encoding="utf-8")
for target in ("@updateURL", "@downloadURL"):
    line = next((line for line in root_userscript.splitlines() if target in line), "")
    assert line.strip().endswith(ROOT_USERSCRIPT_URL), f"root beta userscript {target} URL changed"
runtime_line = next((line for line in root_userscript.splitlines() if "Game.LoadMod(" in line), "")
assert ROOT_BETA_URL in runtime_line, "root beta userscript does not load the canonical beta URL"

with ZipFile(ARCHIVE, "r") as archive:
    names = tuple(archive.namelist())
    assert names == EXPECTED_MEMBERS, f"unexpected beta ZIP layout: {names!r}"
    info = archive.read("CookieBot Beta/info.txt")
    assert sha256(info).hexdigest() == INFO_SHA256, "historical info.txt changed"
    main_js = archive.read("CookieBot Beta/main.js").decode("utf-8")

match = re.fullmatch(r"Game\.LoadMod\(['\"]([^'\"]+)['\"]\);\s*", main_js)
assert match, f"unexpected beta Steam main.js: {main_js!r}"
assert match.group(1) == BETA_URL, "beta Steam main.js does not load the canonical beta URL"

stable_zip = ROOT / "CookieBot4Steam.zip"
assert sha256(stable_zip.read_bytes()).hexdigest() == STABLE_ZIP_SHA256, "stable Steam ZIP changed"

print("PASS: beta Steam ZIP has the exact two-file layout and canonical browser target")
print("PASS: README browser and Steam URLs match the packaged beta target")
print("PASS: root beta userscript metadata and runtime target use canonical Pages URLs")
print("PASS: historical beta info.txt and stable CookieBot4Steam.zip are unchanged")
