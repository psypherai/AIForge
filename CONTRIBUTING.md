# Contributing to AIForge

First off, thank you for considering contributing to AIForge! Every contribution helps make this the best AI monorepo template for the community.

## Ways to Contribute

- **Star the repo** — The simplest way to support us
- **Report bugs** — Found something broken? [Open an issue](https://github.com/psypherai/AIForge/issues/new?template=bug_report.md)
- **Request features** — Have an idea? [Tell us about it](https://github.com/psypherai/AIForge/issues/new?template=feature_request.md)
- **Submit PRs** — Fix a bug, add a feature, improve docs
- **Improve documentation** — Typo fixes, better explanations, more examples
- **Share AIForge** — Blog about it, tweet about it, tell a friend

## Development Setup

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/AIForge.git
cd AIForge

# 2. Install dependencies
pnpm install

# 3. Set up Python backend
cd apps/backend && uv sync && cd ../..

# 4. Create your branch
git checkout -b feature/your-feature-name

# 5. Start developing
pnpm dev
```

## Project Structure

| Directory | Purpose | Language |
|-----------|---------|----------|
| `apps/web` | Next.js web application | TypeScript |
| `apps/mobile` | Expo mobile application | TypeScript |
| `apps/backend` | FastAPI backend | Python |
| `packages/ai` | AI layer (prompts, tools, RAG) | TypeScript |
| `packages/ui` | Shared UI components | TypeScript |
| `packages/core` | Types, schemas, utils | TypeScript |
| `packages/db` | Database types + pgvector | TypeScript |
| `packages/api-client` | Generated API client | TypeScript |
| `packages/observability` | Langfuse + LangSmith | TypeScript |
| `packages/evals` | Agent evaluation suite | TypeScript |

## Code Style

We use **Biome** as the primary linter and formatter:

```bash
# Check and auto-fix
pnpm check

# Format only
pnpm format

# Type checking
pnpm typecheck
```

For Python code in `apps/backend`, we use **Ruff** for linting and formatting.

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new RAG pipeline with reranking
fix: resolve metro bundler crash on iOS
docs: update deployment guide for Fly.io
refactor: simplify prompt factory API
test: add evaluation tests for chat agent
chore: bump turborepo to v2.8.10
```

## Pull Request Process

1. **Create a branch** from `develop` (not `main`)
2. **Make your changes** with clear, focused commits
3. **Run the checks**: `pnpm check && pnpm typecheck && pnpm test`
4. **Open a PR** using the PR template
5. **Describe your changes** — what, why, and how to test
6. **Wait for review** — we'll get back to you promptly

## Adding New Packages

If you're adding a new package to the monorepo:

1. Create the package directory under `packages/`
2. Add a `package.json` with the `@aiforge/` namespace
3. Add it to `pnpm-workspace.yaml` if needed
4. Update `turbo.json` if it has custom build/dev tasks
5. Document it in the README

## Reporting Security Issues

Please **do not** open a public issue for security vulnerabilities. Instead, email security@psypher.ai with details. We'll respond within 48 hours.

## Code of Conduct

Be kind, be respectful, be constructive. We're all here to build great software together.

---

Thank you for helping make AIForge better!
