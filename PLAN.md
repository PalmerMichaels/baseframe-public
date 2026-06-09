# Baseframe Public Implementation Plan

## Scope
- Build an original TypeScript CLI named `baseframe` for drafting synthetic operating frames for product launches.
- Run with Node 22 direct TypeScript execution and no runtime dependencies.
- Store only invented seed scenarios, teams, signals, dependencies, and risk notes in source files.

## Implementation Steps
- Define small domain models for launch scenarios, workstreams, readiness signals, and recommended rituals.
- Implement deterministic scoring that highlights priorities, blockers, and next actions for a selected scenario.
- Add a CLI entrypoint with `list`, `frame`, and `json` commands.
- Add local tests with `node --test` and a validation script for seed-data and CLI assumptions.
- Document usage, validation, and clean-room constraints in `README.md`.

## Clean-Room Constraints
- No proprietary code, private datasets, or claims of affiliation are used.
- All seed data is synthetic and for demonstration only.
- The tool does not provide regulated, medical, legal, financial, compliance, or professional advice.
