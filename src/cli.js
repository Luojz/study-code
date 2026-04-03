#!/usr/bin/env node

const { Command } = require('commander');
const path = require('path');
const fs = require('fs-extra');
const readline = require('readline');

const program = new Command();

program
  .name('study-code')
  .description('AI-powered code teaching system scaffolder for Claude Code')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize study-code learning system in current project')
  .option('-f, --force', 'Overwrite existing files without prompting')
  .action(async (options) => {
    await initCommand(options);
  });

async function initCommand(options) {
  const cwd = process.cwd();
  const templatesDir = path.join(__dirname, '..', 'templates');
  const targetClaudeDir = path.join(cwd, '.claude');

  // Check templates directory exists
  if (!await fs.pathExists(templatesDir)) {
    console.error('Error: templates/ directory not found. Package may be corrupted.');
    process.exit(1);
  }

  // Collect all template files
  const templateFiles = [];
  await collectFiles(templatesDir, '', templateFiles);

  if (templateFiles.length === 0) {
    console.error('Error: No template files found.');
    process.exit(1);
  }

  console.log(`\nstudy-code init — Installing ${templateFiles.length} files...\n`);

  let created = 0;
  let skipped = 0;
  let overwritten = 0;

  for (const { srcPath, relativePath } of templateFiles) {
    const destPath = path.join(targetClaudeDir, relativePath);

    const fileExists = await fs.pathExists(destPath);

    if (fileExists && !options.force) {
      const shouldOverwrite = await promptOverwrite(relativePath);
      if (!shouldOverwrite) {
        console.log(`  ⏭  Skipped: ${relativePath}`);
        skipped++;
        continue;
      }
      overwritten++;
    } else if (fileExists && options.force) {
      overwritten++;
    } else {
      created++;
    }

    // Ensure target directory exists
    await fs.ensureDir(path.dirname(destPath));

    // Copy file
    await fs.copy(srcPath, destPath);
    console.log(`  ✓  ${relativePath}`);
  }

  console.log(`\nDone! ${created} created, ${overwritten} overwritten, ${skipped} skipped.`);
  console.log('\nNext steps:');
  console.log('  1. Open Claude Code in this project');
  console.log('  2. Run /teach:init to start learning');
  console.log('');
}

async function collectFiles(dir, base, results) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = base ? path.join(base, entry.name) : entry.name;

    if (entry.isDirectory()) {
      await collectFiles(fullPath, relPath, results);
    } else if (entry.isFile()) {
      results.push({ srcPath: fullPath, relativePath: relPath });
    }
  }
}

function promptOverwrite(relativePath) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`  File exists: ${relativePath} Overwrite? (y/N) `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

program.parse();
