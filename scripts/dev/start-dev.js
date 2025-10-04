#!/usr/bin/env node

/**
 * Development server startup script
 * Ensures only one instance runs at a time
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function killExistingServers() {
  try {
    // Find processes using ports 3000-3002
    const { stdout } = await execAsync('netstat -ano | findstr ":300"');
    const lines = stdout.split('\n').filter(line => line.includes('LISTENING'));

    const pids = new Set();
    lines.forEach(line => {
      const match = line.match(/\s+(\d+)$/);
      if (match) {
        pids.add(match[1]);
      }
    });

    // Kill existing processes
    for (const pid of pids) {
      try {
        await execAsync(`taskkill /F /PID ${pid}`);
        console.log(`✅ Killed process ${pid}`);
      } catch (error) {
        // Process might already be dead
      }
    }
  } catch (error) {
    // No processes found, that's fine
  }
}

async function startDevServer() {
  console.log('🚀 Starting development server...');
  await execAsync('npm run dev');
}

async function main() {
  console.log('🧹 Cleaning up existing servers...');
  await killExistingServers();

  console.log('⏳ Waiting for cleanup...');
  await new Promise(resolve => setTimeout(resolve, 2000));

  await startDevServer();
}

main().catch(console.error);
