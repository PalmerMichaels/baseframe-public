# Baseframe

Baseframe is a clean-room public TypeScript CLI demo that summarizes a synthetic portfolio of fictional initiatives. It provides a small "portfolio pulse" with deterministic scoring, risk flags, and text or JSON output.

This project is original demo software for the `baseframe` entry. It does not copy or depend on any private YC, customer, proprietary, scraped, or regulated dataset.

## Disclaimers

- Clean-room public demo using synthetic data only.
- Not a regulated, production, compliance, medical, financial, legal, employment, safety-critical, or customer-facing decision system.
- Output is illustrative and should not be used for real operational, regulated, or production decisions.
- Seed data is fictional and intentionally small.

## Requirements

- Node.js 20 or newer
- npm

## Install

```bash
npm install
```

## Run

Print a readable synthetic portfolio pulse:

```bash
npm start
```

Print JSON output:

```bash
npm run start:json
```

After building, the CLI can also be run directly:

```bash
node dist/cli.js --help
```

## Test And Validate

Run TypeScript compilation and validation checks:

```bash
npm test
```

The validation script checks scoring behavior, CLI output, synthetic seed bounds, and clean-room disclaimer text.

## Project Structure

- `src/cli.ts` - CLI entry point.
- `src/core.ts` - scoring, portfolio summary, and text rendering logic.
- `src/data.ts` - synthetic fictional seed initiatives and clean-room notice.
- `tests/validate.mjs` - Node-based validation checks run after compilation.
- `PLAN.md` - implementation plan and clean-room constraints.

## License

MIT
