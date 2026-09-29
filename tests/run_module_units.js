const { spawn } = require('child_process');
const path = require('path');

const tests = [
  'tests/modules/DragonManager.test.js',
  'tests/modules/GardenManager.test.js',
  'tests/modules/GrimoireManager.test.js',
  'tests/modules/NightMode.test.js',
  'tests/modules/PantheonManager.test.js',
  'tests/modules/SeasonHandler.test.js',
  'tests/modules/StockMarketManager.test.js',
  'tests/modules/SugarLumpManager.test.js'
];

async function runTest(testFile) {
  return new Promise((resolve, reject) => {
    console.log(`\n=== Running ${testFile} ===`);
    const child = spawn('node', [testFile], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✓ ${testFile} Passed`);
        resolve();
      } else {
        console.error(`✗ ${testFile} Failed with code ${code}`);
        reject(new Error(`Test failed: ${testFile}`));
      }
    });
  });
}

(async () => {
  try {
    for (const test of tests) {
      await runTest(test);
    }
    console.log('\nAll module unit tests passed successfully!');
  } catch (error) {
    console.error('\nSome tests failed.');
    process.exit(1);
  }
})();
