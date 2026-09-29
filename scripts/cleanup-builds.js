const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const distDir = path.join(__dirname, '../dist');

// Get all build files
const files = fs.readdirSync(distDir).filter(f => f.startsWith('cookieAutoPlayBeta-v') && f.endsWith('.js'));

const hashes = {};

files.forEach(file => {
    const filePath = path.join(distDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Normalize version strings to ignore them in comparison
    content = content.replace(/AutoPlay_AutoPlay\.version = '.*?';/g, "AutoPlay_AutoPlay.version = 'VERSION_PLACEHOLDER';");
    content = content.replace(/static readonly version = '.*?';/g, "static readonly version = 'VERSION_PLACEHOLDER';");
    
    const hash = crypto.createHash('sha256').update(content).digest('hex');

    if (!hashes[hash]) {
        hashes[hash] = [];
    }
    hashes[hash].push(file);
});

// Delete duplicates
console.log('Cleaning up duplicate builds...');
let deletedCount = 0;

Object.keys(hashes).forEach(hash => {
    const group = hashes[hash];
    if (group.length > 1) {
        // Sort by version number
        group.sort((a, b) => {
            const verA = parseInt(a.match(/-(\d+)\.js$/)[1]);
            const verB = parseInt(b.match(/-(\d+)\.js$/)[1]);
            return verA - verB;
        });
        
        // Keep the last one (highest version)
        const toKeep = group.pop();
        console.log(`\nGroup (Hash: ${hash.substring(0, 8)}...):`);
        console.log(`  Keeping: ${toKeep}`);
        
        // Delete the rest
        group.forEach(file => {
            console.log(`  Deleting: ${file}`);
            fs.unlinkSync(path.join(distDir, file));
            deletedCount++;
        });
    }
});

if (deletedCount === 0) {
    console.log('No duplicate builds found to delete.');
} else {
    console.log(`\nDeleted ${deletedCount} duplicate build files.`);
}
