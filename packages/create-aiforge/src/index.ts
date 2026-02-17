#!/usr/bin/env node

/**
 * create-aiforge — Scaffold a new AIForge project in seconds.
 *
 * Usage:
 *   npx create-aiforge my-project
 *   npx create-aiforge my-project --template full
 *   npx create-aiforge my-project --template web-only
 *
 * Templates:
 *   full     — Web + Mobile + Backend (default)
 *   web-only — Next.js web app only
 *   api-only — FastAPI backend only
 */

import * as p from '@clack/prompts';
import pc from 'picocolors';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';

const REPO_URL = 'psypherai/AIForge';
const TEMPLATES = ['full', 'web-only', 'api-only'] as const;
type Template = (typeof TEMPLATES)[number];

async function main() {
  console.log('');
  p.intro(pc.bgMagenta(pc.white(' create-aiforge ')));

  const args = process.argv.slice(2);
  let projectName = args[0];
  let template: Template = 'full';

  // Parse --template flag
  const templateIdx = args.indexOf('--template');
  if (templateIdx !== -1 && args[templateIdx + 1]) {
    template = args[templateIdx + 1] as Template;
  }

  // Interactive prompts if no project name given
  if (!projectName) {
    const result = await p.group(
      {
        name: () =>
          p.text({
            message: 'What is your project name?',
            placeholder: 'my-ai-app',
            validate: (value) => {
              if (!value) return 'Project name is required';
              if (existsSync(value)) return `Directory "${value}" already exists`;
            },
          }),
        template: () =>
          p.select({
            message: 'Which template?',
            options: [
              { value: 'full', label: 'Full Stack', hint: 'Web + Mobile + Backend (recommended)' },
              { value: 'web-only', label: 'Web Only', hint: 'Next.js + AI packages' },
              { value: 'api-only', label: 'API Only', hint: 'FastAPI + LangGraph backend' },
            ],
          }),
        install: () =>
          p.confirm({
            message: 'Install dependencies?',
            initialValue: true,
          }),
      },
      {
        onCancel: () => {
          p.cancel('Operation cancelled.');
          process.exit(0);
        },
      }
    );

    projectName = result.name as string;
    template = result.template as Template;
  }

  if (!projectName) {
    p.cancel('Project name is required');
    process.exit(1);
  }

  const projectPath = resolve(process.cwd(), projectName);

  // Clone the template
  const s = p.spinner();
  s.start('Cloning AIForge template...');

  try {
    execSync(`npx --yes degit ${REPO_URL} ${projectName}`, {
      stdio: 'pipe',
      cwd: process.cwd(),
    });

    // Remove template-specific dirs based on selection
    if (template === 'web-only') {
      rmSync(join(projectPath, 'apps/mobile'), { recursive: true, force: true });
      rmSync(join(projectPath, 'apps/backend'), { recursive: true, force: true });
    } else if (template === 'api-only') {
      rmSync(join(projectPath, 'apps/web'), { recursive: true, force: true });
      rmSync(join(projectPath, 'apps/mobile'), { recursive: true, force: true });
    }

    s.stop('Template cloned!');

    // Update package.json name
    const pkgPath = join(projectPath, 'package.json');
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      pkg.name = projectName;
      writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    }

    // Create .env from .env.example
    const envExample = join(projectPath, '.env.example');
    const envLocal = join(projectPath, '.env');
    if (existsSync(envExample)) {
      execSync(`cp "${envExample}" "${envLocal}"`, { cwd: projectPath });
    }

    // Initialize git
    s.start('Initializing git...');
    execSync('git init && git add -A && git commit -m "Initial commit from create-aiforge"', {
      stdio: 'pipe',
      cwd: projectPath,
    });
    s.stop('Git initialized!');

    // Install dependencies
    s.start('Installing dependencies...');
    execSync('pnpm install', { stdio: 'pipe', cwd: projectPath });
    s.stop('Dependencies installed!');

  } catch (error: any) {
    s.stop('Failed');
    p.cancel(`Error: ${error.message}`);
    process.exit(1);
  }

  // Done!
  p.note(
    [
      `cd ${projectName}`,
      '',
      pc.dim('# Edit .env with your API keys'),
      pc.dim('# OPENAI_API_KEY, SUPABASE_URL, etc.'),
      '',
      'pnpm dev',
    ].join('\n'),
    'Next steps'
  );

  p.outro(pc.green(`${pc.bold('AIForge')} project created! Happy building.`));
  console.log(pc.dim(`  ${pc.bold('Web')}: http://localhost:3000`));
  console.log(pc.dim(`  ${pc.bold('Mobile')}: http://localhost:8081`));
  console.log(pc.dim(`  ${pc.bold('API')}: http://localhost:8000`));
  console.log('');
  console.log(pc.dim(`  Powered by ${pc.magenta('Psypher AI')} — https://psypher.ai`));
  console.log('');
}

main().catch(console.error);
