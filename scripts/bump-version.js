const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.join(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const autoPlayPath = path.join(rootDir, 'src/AutoPlay.ts');
const hashFilePath = path.join(__dirname, '.last-build-hash');

// Files and directories to include in the hash calculation
const pathsToHash = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'scripts'),
  path.join(rootDir, 'package.json'),
  path.join(rootDir, 'tsconfig.json'),
  path.join(rootDir, 'webpack.config.js')
];

function calculateProjectHash() {
  const hash = crypto.createHash('sha256');
  
  // Collect all files
  let allFiles = [];
  for (const p of pathsToHash) {
    if (fs.existsSync(p)) {
      if (fs.statSync(p).isDirectory()) {
        allFiles = allFiles.concat(getAllFiles(p));
      } else {
        allFiles.push(p);
      }
    }
  }

  // Sort to ensure consistency
  allFiles.sort();

  for (const file of allFiles) {
    // Skip the hash file itself if it somehow gets included
    if (file === hashFilePath) continue;
    // Skip hidden files like .DS_Store
    if (path.basename(file).startsWith('.') && file !== hashFilePath) continue;

    let content = fs.readFileSync(file, 'utf8');
    
    // Special handling for AutoPlay.ts: ignore version string
    if (file === autoPlayPath) {
      content = content.replace(/static readonly version = '.*?';/, "static readonly version = 'VERSION_PLACEHOLDER';");
    }

    // Special handling for package.json: ignore version field
    if (file === packageJsonPath) {
      const json = JSON.parse(content);
      json.version = 'VERSION_PLACEHOLDER';
      content = JSON.stringify(json);
    }

    // Add relative path to hash to detect file moves/renames
    const relativePath = path.relative(rootDir, file);
    hash.update(relativePath);
    hash.update(content);
  }

  return hash.digest('hex');
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// 1. Calculate current hash
console.log('Checking for changes in project files...');
const currentHash = calculateProjectHash();

// 2. Read last hash
let lastHash = '';
if (fs.existsSync(hashFilePath)) {
  lastHash = fs.readFileSync(hashFilePath, 'utf8').trim();
}

// 3. Compare
if (currentHash === lastHash) {
  console.log('No changes detected. Skipping version bump.');
  process.exit(0);
}

console.log('Changes detected. Bumping version...');

// 4. Bump version
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;

const versionParts = currentVersion.match(/^(.*?)(\d+)$/);

if (!versionParts) {
  console.error(`Could not parse version: ${currentVersion}`);
  process.exit(1);
}

const prefix = versionParts[1];
const number = parseInt(versionParts[2], 10);
const newVersion = `${prefix}${number + 1}`;

console.log(`Bumping version: ${currentVersion} -> ${newVersion}`);

packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// 5. Update src/AutoPlay.ts
if (fs.existsSync(autoPlayPath)) {
  let autoPlayContent = fs.readFileSync(autoPlayPath, 'utf8');
  const autoPlayRegex = /(static readonly version = ')(.*?)(';)/;
  if (autoPlayRegex.test(autoPlayContent)) {
    autoPlayContent = autoPlayContent.replace(autoPlayRegex, `$1${newVersion}$3`);
    fs.writeFileSync(autoPlayPath, autoPlayContent);
    console.log(`Updated src/AutoPlay.ts`);
  } else {
    console.warn(`Could not find version string in src/AutoPlay.ts`);
  }
}

// 6. Save new hash
fs.writeFileSync(hashFilePath, currentHash);
