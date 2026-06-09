# BaseFrame

BaseFrame is an original TypeScript CLI that turns synthetic team workflows into an AI automation planning frame. It inventories apps and workflows, scores automation opportunities, recommends candidate tasks, and estimates simple ROI/effort views using fictional seed data and mocked integrations.

## Usage

```bash
npm start -- list
npm start -- assess nova-ops
npm start -- json cobalt-people
```

Commands:

- `list` shows available synthetic team profiles.
- `assess <team-id>` prints a readable automation planning frame.
- `json <team-id>` prints the same frame as JSON.

## What It Plans

- Onboarding needs for each synthetic workflow.
- App and workflow inventory from mocked integrations.
- Automation opportunity scores for repeatable tasks.
- Task-level recommendations for drafts, routing, alerts, and guided assistants.
- ROI/effort views with estimated monthly hours saved, estimated monthly value, and effort points.

The generated text and JSON include an explicit scope-coverage list for onboarding/team context, inventory, scoring, recommendations, ROI/effort, synthetic data, and mocked integrations.

## Mocked Integrations

The CLI includes static mocked integrations such as `MockCRM`, `MockDesk`, `MockSheets`, `MockHRIS`, `MockWiki`, and `MockChat`. They are local synthetic records only; the app does not request credentials, call private APIs, scrape websites, or connect to external services.

## Validation

```bash
npm run build
npm test
npm run validate
```

The build script type-checks the TypeScript source. The test suite uses Node's built-in test runner. The validation script checks team identifiers, mocked integration markers, score ranges, synthetic-data markers, generated frame shape, ROI output, and clean-room disclaimer text.

## Synthetic Data

All teams, names, workflows, tasks, accounts, onboarding notes, app records, costs, scores, and recommendations in this repository are invented seed data. They are not derived from private systems, customer data, employee data, proprietary materials, or the named company's product.

## Clean-Room Disclaimer

This is a clean-room public implementation. It does not include proprietary code or private datasets, and it does not claim to reproduce any private product internals, branding, logos, marketing copy, integrations, or access patterns.

## Non-Regulated Disclaimer

This tool is for planning demonstrations only. It is not medical, legal, financial, compliance, employment, procurement, safety-critical, operational, or other regulated professional advice. Do not use it for production automation decisions without independent review.

The CLI text and JSON output also include this clean-room/non-regulated-use disclaimer.

## No Affiliation

This repository does not claim affiliation with, endorsement by, or sponsorship from any company, accelerator, institution, or product with a similar name.
