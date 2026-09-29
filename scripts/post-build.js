#!/usr/bin/env node
/**
 * Post-build script to create "latest" version of the build
 * Copies the versioned file to cookieAutoPlayBeta-latest.js for stable URLs
 */

const fs = require('fs');
const path = require('path');

// Read version from package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = packageJson.version;

const distDir = path.resolve(__dirname, '../dist');
const versionedFile = path.join(distDir, `cookieAutoPlayBeta-v${version}.js`);
const latestFile = path.join(distDir, 'cookieAutoPlayBeta-latest.js');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy versioned file to latest
if (fs.existsSync(versionedFile)) {
  fs.copyFileSync(versionedFile, latestFile);
  console.log(`✓ Created ${path.basename(latestFile)} from v${version}`);

  // Handle Source Map
  const versionedMap = versionedFile + '.map';
  const latestMap = latestFile + '.map';

  if (fs.existsSync(versionedMap)) {
    // 1. Copy the map file
    fs.copyFileSync(versionedMap, latestMap);
    console.log(`✓ Created ${path.basename(latestMap)} from v${version}`);

    // 2. Update the sourceMappingURL comment in the latest JS file
    let jsContent = fs.readFileSync(latestFile, 'utf8');
    const oldMappingUrl = path.basename(versionedMap);
    const newMappingUrl = path.basename(latestMap);
    
    // Replace the source mapping URL at the end of the file
    if (jsContent.includes(oldMappingUrl)) {
      jsContent = jsContent.replace(oldMappingUrl, newMappingUrl);
      fs.writeFileSync(latestFile, jsContent);
      console.log(`✓ Updated source mapping URL in ${path.basename(latestFile)}`);
    }
  }
} else {
  console.error(`✗ Error: ${versionedFile} not found`);
  process.exit(1);
}
