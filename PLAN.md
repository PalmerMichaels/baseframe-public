# BaseFrame Public Implementation Plan

## Concept
- Build an original clean-room TypeScript CLI named `baseframe` that helps teams inventory work and plan what AI could automate.
- Each assessment uses fictional onboarding, workflow, tool, and task data to score automation opportunities, estimate ROI, and recommend next steps.

## Scope
- Build an original TypeScript CLI named `baseframe` for synthetic AI automation discovery and planning.
- Run with Node 22 direct TypeScript execution and no runtime dependencies.
- Store only invented departments, workflows, tasks, onboarding notes, mocked integrations, and ROI assumptions in source files.
- Cover onboarding, app/workflow inventory, automation opportunity scoring, task recommendations, and effort/ROI views.

## Intended Files
- `package.json` and `tsconfig.json` for npm scripts and TypeScript settings.
- `src/data.ts` for synthetic teams, workflows, mocked integrations, and the clean-room disclaimer.
- `src/frame.ts` for deterministic automation scoring, ROI/effort views, and task recommendations.
- `src/cli.ts` for `list`, `assess`, and `json` CLI commands.
- `tests/frame.test.ts` for automated behavior tests.
- `scripts/validate.ts` for seed-data and disclaimer validation.
- `README.md` for usage, validation, and disclaimers.

## Implementation Steps
- Define small domain models for teams, workflows, task metrics, onboarding notes, and mocked app integrations.
- Implement deterministic scoring that balances repeatability, manual hours, app friction, data readiness, risk, effort, and confidence.
- Generate automation recommendations with ROI/effort estimates and suggested task sequencing.
- Add a CLI entrypoint with `list`, `assess`, and `json` commands.
- Add local tests with `node --test` and a validation script for seed-data and CLI assumptions.
- Document usage, validation, and clean-room constraints in `README.md`.

## Validation
- Run `npm run build` for TypeScript type-checking.
- Run `npm test` for Node test coverage.
- Run `npm run validate` for synthetic seed-data and disclaimer checks.
- Run representative `npm start -- assess <team-id>` and `npm start -- json <team-id>` commands to confirm app output includes disclaimers.

## Clean-Room Constraints
- No proprietary code, private datasets, or claims of affiliation are used.
- All seed data is synthetic and for demonstration only.
- Mocked integrations are static examples and never connect to private systems.
- The tool does not provide regulated, medical, legal, financial, compliance, procurement, employment, safety, or professional advice.
- The app is not affiliated with any real company, accelerator, or YC.
- The implementation does not require credentials, scraped data, or external services.
