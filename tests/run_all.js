const { spawn } = require('child_process');
const path = require('path');

const runScript = (scriptName, label) => {
  return new Promise((resolve, reject) => {
    console.log(`\n\x1b[36m=== Running ${label} ===\x1b[0m`);
    const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

    const child = spawn(npmCmd, ['run', scriptName], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`\x1b[32m✓ ${label} Passed\x1b[0m`);
        resolve();
      } else {
        console.error(`\x1b[31m✗ ${label} Failed (Exit Code: ${code})\x1b[0m`);
        reject(new Error(`${label} failed`));
      }
    });

    child.on('error', (err) => {
      console.error(`\x1b[31m✗ ${label} Error: ${err.message}\x1b[0m`);
      reject(err);
    });
  });
};

(async () => {
  const startTime = Date.now();

  try {
    // 1. Module Integration Tests (Medium)
    await runScript('test:modules', 'Module Integration Tests');

    // 2. E2E Smoke Test (Medium)
    await runScript('test:e2e', 'E2E Smoke Test');

    // 4. Bot Decision Tests (Integration)
    await runScript('test:saves', 'Bot Decision Tests');

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n\x1b[32mAll tests passed successfully in ${duration}s!\x1b[0m`);
    process.exit(0);

  } catch (error) {
    console.error('\n\x1b[31mTest Suite Failed.\x1b[0m');
    process.exit(1);
  }
})();
