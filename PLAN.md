# Baseframe Public Implementation Plan

## Concept
- Build an original clean-room TypeScript CLI named `baseframe` that creates synthetic launch baseline operating frames.
- Each frame summarizes fictional launch readiness, workstream dependencies, review cadence, and next actions.

## Scope
- Build an original TypeScript CLI named `baseframe` for drafting synthetic operating frames for product launches.
- Run with Node 22 direct TypeScript execution and no runtime dependencies.
- Store only invented seed scenarios, teams, signals, dependencies, and risk notes in source files.

## Intended Files
- `package.json` and `tsconfig.json` for npm scripts and TypeScript settings.
- `src/data.ts` for synthetic seed scenarios and the clean-room disclaimer.
- `src/frame.ts` for deterministic frame scoring and next-action generation.
- `src/cli.ts` for `list`, `frame`, and `json` CLI commands.
- `tests/frame.test.ts` for automated behavior tests.
- `scripts/validate.ts` for seed-data and disclaimer validation.
- `README.md` for usage, validation, and disclaimers.

## Implementation Steps
- Define small domain models for launch scenarios, workstreams, readiness signals, and recommended rituals.
- Implement deterministic scoring that highlights priorities, blockers, and next actions for a selected scenario.
- Add a CLI entrypoint with `list`, `frame`, and `json` commands.
- Add local tests with `node --test` and a validation script for seed-data and CLI assumptions.
- Document usage, validation, and clean-room constraints in `README.md`.

## Validation
- Run `npm run build` for TypeScript type-checking.
- Run `npm test` for Node test coverage.
- Run `npm run validate` for synthetic seed-data and disclaimer checks.
- Run representative `npm start -- frame <scenario-id>` and `npm start -- json <scenario-id>` commands to confirm app output includes disclaimers.

## Clean-Room Constraints
- No proprietary code, private datasets, or claims of affiliation are used.
- All seed data is synthetic and for demonstration only.
- The tool does not provide regulated, medical, legal, financial, compliance, or professional advice.
- The app is not affiliated with any real company, accelerator, or YC.
- The implementation does not require credentials, scraped data, or external services.
