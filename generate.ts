#!/usr/bin/env node
import colors from 'ansicolors'
import * as cardinal from 'cardinal'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as yargs from 'yargs'

const argv = yargs
  .option('input', {
    alias: 'i',
    demandOption: true,
    describe: 'Input ABI file',
    type: 'string',
  })
  .option('output', {
    alias: 'o',
    demandOption: true,
    describe: 'Output TypeScript file',
    type: 'string',
  })
  .help()
  .alias('help', 'h')
  .parseSync()

function usage(module: string) {
  return `import { Contract, RpcProvider, constants } from 'starknet';
import { ABI } from './${module}';

async function main() {
    const address = "CONTRACT_ADDRESS_HERE";
    const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });
    const contract = new Contract(ABI, address, provider).typedv2(ABI);

    const version = await contract.getVersion();
    console.log("version", version)

    // Abiwan is now successfully installed, just start writing your contract
    // function calls (\`const ret  = contract.your_function()\`) and you'll get
    // helpful editor autocompletion, linting errors ... for free ! Enjoy !
}
main().catch(console.error)`
}

async function run() {
  const json: { abi: object } = await fs.readJson(argv.input)
  let abi = json.abi

  if (typeof abi === 'string') {
    abi = JSON.parse(abi)
  }

  const content = `export const ABI = ${JSON.stringify(
    abi,
    null,
    2,
  )} as const;\n`
  await fs.writeFile(argv.output, content)

  const output_path = path.parse(argv.output)
  const usage_snippet = usage(output_path.name)
  const usage_snippet_highlighted = cardinal.highlight(usage_snippet)

  console.log(`✅ Successfully generated ${colors.red(argv.output)}`)
  console.log(`💡 Here's a code snippet to get you started:\n`)
  console.log(usage_snippet_highlighted)
}

run().catch(console.error)
