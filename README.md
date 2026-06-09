# Baseframe

Baseframe is an original TypeScript CLI demo that builds synthetic launch baseline frames for fictional products. It summarizes readiness signals, dependency status, and next actions so a team can rehearse a launch review using safe sample data.

## Clean-Room Disclaimer

This project is a clean-room public implementation demo. It is not affiliated with, endorsed by, or representative of any real company, accelerator, or YC. All product names, teams, dependencies, audiences, and launch windows are fictional synthetic seed data.

Baseframe is not a production system, regulated workflow, compliance engine, medical device, financial advisor, legal advisor, safety-critical tool, or source of operational truth. Do not use it for regulated, legal, medical, financial, employment, safety, customer, or production decisions.

## Quick Start

```bash
npm install
npm start
```

Render JSON:

```bash
npm start -- --json
```

Render one synthetic product:

```bash
npm start -- --product atlas-pulse
```

List synthetic product IDs:

```bash
npm start -- --list
```

## Scripts

- `npm run build` compiles TypeScript into `dist/`.
- `npm test` builds and runs deterministic validation tests.
- `npm start` builds and runs the CLI.

## What It Outputs

Each launch baseline frame includes:

- A fictional product and team.
- Synthetic launch window and audience.
- Readiness score and readiness level.
- Dependency counts by `clear`, `watch`, and `blocked`.
- Prioritized next actions generated from the weakest readiness signal and dependency status.

The CLI output includes the same clean-room/non-regulated-use disclaimer shown above.
