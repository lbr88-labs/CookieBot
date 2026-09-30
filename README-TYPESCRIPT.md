# CookieBot TypeScript Experiment

This is a separate experimental browser channel in the maintained `lbr88-labs/CookieBot` fork. Its Pages base is `https://lbr88-labs.github.io/CookieBot/`. It is not the root beta monolith or root beta userscript, The root beta userscript's update/download metadata and `Game.LoadMod` now use the canonical Pages URLs, but it has no browser runtime or save validation and no stable designation.

The experimental userscript is [`dist/CookieBot.user.js`](https://lbr88-labs.github.io/CookieBot/dist/CookieBot.user.js). It loads the current [`dist/cookieAutoPlayBeta-latest.js`](https://lbr88-labs.github.io/CookieBot/dist/cookieAutoPlayBeta-latest.js) bundle. These filenames stay the same across releases; the userscript metadata version advances so Violentmonkey can detect a new release. Both files must be published and verified together. Existing users whose `@updateURL` still points to the old `lbr88.github.io` host should manually reinstall from the linked userscript, because that old host returns 404. The TypeScript channel remains experimental; browser behavior and save compatibility need separate testing.

## Project structure

```
CookieBot/
├── src/                          # TypeScript source
│   ├── modules/                  # Browser/game behavior modules
│   ├── types/                    # Cookie Clicker and bot types
│   ├── utils/                    # Shared helpers
│   ├── AutoPlay.ts               # Main orchestrator
│   └── index.ts                  # Entry point
├── dist/                         # Generated TypeScript bundles/userscript
│   ├── cookieAutoPlayBeta-latest.js  # current compiled bundle
│   ├── cookieAutoPlayBeta-v*.js     # historical pinned bundles
│   └── CookieBot.user.js             # Experimental TypeScript userscript
├── cookieAutoPlayBeta.js         # Separate beta monolith
├── CookieBot.user.js             # Separate root beta userscript; embedded URLs use canonical Pages host
├── package.json
├── tsconfig.json
└── webpack.config.js
```

The TypeScript implementation contains modules for golden cookies, savings, purchases, seasons, garden, stock market, sugar lumps, wrinklers, achievements, ascension, dragon auras, dashboard, and night mode. `AutoPlay` coordinates those modules. The TypeScript channel remains experimental; no feature parity with the beta monolith is claimed.

## Build commands

```bash
npm install

# Generate dist/CookieBot.user.js from the current package version without a version bump
node scripts/build-userscript.js

# Release build: bump metadata version if source changed, compile the stable bundle,
# and regenerate the TypeScript userscript
npm run build

npm run dev          # watch build
npm run type-check   # TypeScript checking only
```

`node scripts/build-userscript.js` rewrites only `dist/CookieBot.user.js` and reads the current version from `package.json`. It does not compile the TypeScript bundle and does not bump the version. `npm run build` runs the change-detection version step first, then webpack and userscript generation. The version step increments the numeric suffix when tracked source changes are detected.

Webpack writes `dist/cookieAutoPlayBeta-latest.js` directly. The generated loader always requests that stable URL. Historical versioned bundles remain in the repository for old installed loaders; new releases do not create another versioned file. The root beta monolith and userscript are a separate channel. Install only one channel at a time.

## Release gate

A TypeScript source fix is released only after the rebuilt stable bundle and userscript are in the merged `master` commit, GitHub Pages has finished building that commit, and both public files match the commit bytes. The release issue stays open until this check passes; a code PR or completed unit test alone is not a deployed fix. The CI release check rebuilds the bundle and rejects stale checked-in output. `npm run verify:release` checks loader metadata, its stable URL, and the stock-market cooldown regression.

## Save and configuration caution

Before trying this experiment, export a save backup and use a disposable save or profile. The legacy beta and experimental TypeScript paths overlap in configuration keys (`autoplayConfig` and `CookieBot_Config`), but their settings parity has not been established. Do not assume configuration or save migration between channels.

The older `cookieAutoPlay.js` and `CookieBot4Steam.zip` are legacy stable delivery paths. They remain tied to the upstream release loader and its historical RawGit path; they are not part of the TypeScript build or beta channel.
