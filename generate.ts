#!/usr/bin/env node
import * as fs from 'fs-extra';
import * as yargs from 'yargs';

const argv = yargs
  .option('input', {
    alias: 'i',
    demandOption: true,
    describe: 'Input ABI file',
    type: 'string'
  })
  .option('output', {
    alias: 'o',
    demandOption: true,
    describe: 'Output TypeScript file',
    type: 'string'
  })
  .help()
  .alias('help', 'h')
  .argv;

async function run() {
  const json: {abi: any} = await fs.readJson(argv.input);
  const content = `export const ABI = ${JSON.stringify({"abi": json.abi}, null, 2)};\n`;
  await fs.writeFile(argv.output, content);
}

run().catch(console.error);
