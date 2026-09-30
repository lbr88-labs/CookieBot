# CookieBot TypeScript Experiment

This is a separate experimental browser channel in the maintained `lbr88-labs/CookieBot` fork. Its Pages base is `https://lbr88-labs.github.io/CookieBot/`. It is not the root beta monolith or root beta userscript, and this document does not announce a release. The root beta userscript's update/download metadata and `Game.LoadMod` now use the canonical Pages URLs, but it has no browser runtime or save validation and no stable designation.

At the checked-in version `2.052-128`, the experimental userscript file is [`dist/CookieBot.user.js`](https://lbr88-labs.github.io/CookieBot/dist/CookieBot.user.js). It is intended to load the pinned `dist/cookieAutoPlayBeta-v2.052-128.js` bundle; it does not use the `latest` alias. The checked-in generated file and its generator now use canonical Pages URLs for update/download metadata and the pinned bundle request. This URL correction has no browser runtime or save validation, and the TypeScript userscript remains experimental with no stable designation. Existing users should manually install or replace it from [`https://lbr88-labs.github.io/CookieBot/dist/CookieBot.user.js`](https://lbr88-labs.github.io/CookieBot/dist/CookieBot.user.js): the old `lbr88.github.io` `@updateURL` returns 404, so automatic updates from that host can fail.

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
│   ├── cookieAutoPlayBeta-v{version}.js
│   ├── cookieAutoPlayBeta-latest.js
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

# Versioning build: run version bump, compile a versioned bundle, update latest alias,
# and regenerate the TypeScript userscript
npm run build

npm run dev          # watch build
npm run type-check   # TypeScript checking only
```

`node scripts/build-userscript.js` rewrites only `dist/CookieBot.user.js` and reads the current version from `package.json`. It does not compile the TypeScript bundle and does not bump the version. `npm run build` runs the change-detection version step first, then webpack, the latest-copy step, and userscript generation. The version step increments the numeric suffix when tracked source changes are detected.

Webpack emits `dist/cookieAutoPlayBeta-v{version}.js`. `scripts/post-build.js` copies that file to `dist/cookieAutoPlayBeta-latest.js`. The generated `dist/CookieBot.user.js` pins the matching versioned bundle, so it does not follow the `latest` alias. In this candidate, the root beta and experimental TypeScript userscripts both use canonical Pages URLs; neither has browser runtime or save validation or a stable designation. Keep the root beta monolith, root beta userscript, and experimental TypeScript userscript as separate channels, and install only one supported channel at a time.

## Save and configuration caution

Before trying this experiment, export a save backup and use a disposable save or profile. The legacy beta and experimental TypeScript paths overlap in configuration keys (`autoplayConfig` and `CookieBot_Config`), but their settings parity has not been established. Do not assume configuration or save migration between channels.

The older `cookieAutoPlay.js` and `CookieBot4Steam.zip` are legacy stable delivery paths. They remain tied to the upstream release loader and its historical RawGit path; they are not part of the TypeScript build or beta channel.
