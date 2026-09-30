'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pagesBase = 'https://lbr88-labs.github.io/CookieBot';

function metadataValue(source, key) {
  const match = source.match(new RegExp(`^// @${key}\\s+(\\S+)\\s*$`, 'm'));
  assert.ok(match, `userscript metadata must include @${key}`);
  return match[1];
}

function runtimeUrl(source, filePath) {
  const match = source.match(/Game\.LoadMod\(['"]([^'"]+)['"]\)/);
  assert.ok(match, `${filePath} must load its payload through Game.LoadMod`);
  return match[1];
}

const betaPath = path.join(root, 'CookieBot.user.js');
const beta = fs.readFileSync(betaPath, 'utf8');
const betaUrl = `${pagesBase}/CookieBot.user.js`;
assert.equal(metadataValue(beta, 'version'), '2.052-44');
assert.equal(metadataValue(beta, 'updateURL'), betaUrl);
assert.equal(metadataValue(beta, 'downloadURL'), betaUrl);
assert.equal(metadataValue(beta, 'grant'), 'none');
assert.equal(runtimeUrl(beta, betaPath), `${pagesBase}/cookieAutoPlayBeta.js`);

const typescriptPath = path.join(root, 'dist', 'CookieBot.user.js');
const typescript = fs.readFileSync(typescriptPath, 'utf8');
const typescriptVersion = require('../package.json').version;
const typescriptUrl = `${pagesBase}/dist/CookieBot.user.js`;
const payloadPath = path.join(root, 'dist', 'cookieAutoPlayBeta-latest.js');
assert.equal(metadataValue(typescript, 'version'), typescriptVersion);
assert.equal(metadataValue(typescript, 'updateURL'), typescriptUrl);
assert.equal(metadataValue(typescript, 'downloadURL'), typescriptUrl);
assert.equal(metadataValue(typescript, 'grant'), 'none');
assert.equal(runtimeUrl(typescript, typescriptPath), `${pagesBase}/dist/cookieAutoPlayBeta-latest.js`);
assert.ok(fs.existsSync(payloadPath), `stable payload must exist: ${path.relative(root, payloadPath)}`);

console.log('Userscript metadata and runtime URLs match canonical Pages; stable payload exists.');
