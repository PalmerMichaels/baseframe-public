#!/usr/bin/env node
import { buildLaunchFrame } from "./frameBuilder";
import { formatJsonReport, formatTextReport } from "./format";
import { productSeeds } from "./seed";

interface CliOptions {
  json: boolean;
  list: boolean;
  productId?: string;
  help: boolean;
}

export function run(argv: string[] = process.argv.slice(2)): string {
  const options = parseArgs(argv);

  if (options.help) {
    return usage();
  }

  if (options.list) {
    return productSeeds.map((product) => `${product.id}\t${product.name}`).join("\n");
  }

  const products = options.productId ? productSeeds.filter((product) => product.id === options.productId) : productSeeds;

  if (products.length === 0) {
    throw new Error(`Unknown product id: ${options.productId}. Run with --list to see synthetic options.`);
  }

  const frames = products.map(buildLaunchFrame);
  return options.json ? formatJsonReport(frames) : formatTextReport(frames);
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = { json: false, list: false, help: false };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--json") {
      options.json = true;
    } else if (arg === "--list") {
      options.list = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--product") {
      const productId = argv[index + 1];
      if (!productId) {
        throw new Error("Missing value for --product.");
      }
      options.productId = productId;
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function usage(): string {
  return [
    "Baseframe - synthetic launch baseline frame builder",
    "",
    "Usage:",
    "  baseframe                 Render all synthetic launch frames",
    "  baseframe --product <id>  Render one synthetic launch frame",
    "  baseframe --json          Render JSON",
    "  baseframe --list          List synthetic product ids",
    "",
    "This clean-room demo uses fictional synthetic data only and is not affiliated with any real company, accelerator, or YC."
  ].join("\n");
}

if (require.main === module) {
  try {
    process.stdout.write(`${run()}\n`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  }
}
