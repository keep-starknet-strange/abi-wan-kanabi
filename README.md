# ABI-WAN-KANABI

<a href="https://badge.fury.io/js/abi-wan-kanabi"><img src="https://badge.fury.io/js/abi-wan-kanabi.svg" alt="npm version" height="18"></a>

<details>
<summary>Table of Contents</summary>

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Cairo versions](#cairo-versions)
  - [Build](#build)
  - [Demo](#demo)
  - [Warning](#warning)
- [Supported Cairo Types](#supported-cairo-types)
- [Contributing](#contributing)
- [Authors \& contributors](#authors--contributors)
- [Acknowledgements](#acknowledgements)

</details>

## About

Abi-wan-kanabi is an UNLICENSE standalone TypeScript parser for Cairo smart contracts.
It enables on the fly typechecking and autocompletion for contract calls directly in TypeScript.
Developers can now catch typing mistakes early, prior to executing the call on-chain, and thus enhancing the overall Dapp development experience.

## Getting Started

### Prerequisites

Abiwan is a standalone typescript library. Its only dependence is on typescript version 4.9.5 or higher.
Also, it makes use of BigInt, so the tsconfig.json should target at least ES2020:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "ESNext"]
  }
}
```

### Cairo versions

abiwan will support multiple Cairo compiler versions, but not in parallel - different package versions will support consecutive Cairo versions.

Currently supported:

| Abi-Wan npm                                                   | Cairo compiler                                                                                                                                               |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [1.0.3](https://www.npmjs.com/package/abi-wan-kanabi/v/1.0.3) | [Cairo v1.0.0](https://github.com/starkware-libs/cairo/releases/tag/v1.0.0) <br> [Cairo v1.1.0](https://github.com/starkware-libs/cairo/releases/tag/v1.1.0) |
| [2.0.0](https://www.npmjs.com/package/abi-wan-kanabi/v/2.0.0) | [Cairo v2.3.0-rc0](https://github.com/starkware-libs/cairo/releases/tag/v2.3.0-rc0)                                                                          |

### Usage with `starknet.js`

Let's say you want to interact with the [Ekubu: Core](https://starkscan.co/contract/0x00000005dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b) contract using starknet.js, using abiwan you can get the correct types for the contract's functions

You need to first get the **Abi** of the contract and export it in a typescript file, you can do so using one command combining both [`starkli`](https://github.com/xJonathanLEI/starkli) (tested with version 0.2.3) and `npx abi-wan-kanabi`:
```bash
starkli class-at "0x0000000dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b" --network mainnet | npx abi-wan-kanabi --input /dev/stdin --output abi.ts
```

The command will get the contract class from the network, and pipe it to abiwan, which will generate  `abi.ts` with `export const ABI = [YOUR ABI HERE]` that we'll import later to get type information, the command will also print a helpful snippet that you can use to get started

```javascript
import { Contract, RpcProvider, constants } from 'starknet';
import { ABI } from './abi';

async function main() {
    const address = "CONTRACT_ADDRESS_HERE";
    const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });
    const contract = new Contract(ABI, address, provider).typedv2(ABI);

    const version = await contract.getVersion();
    console.log("version", version)

    // Abiwan is now successfully installed, just start writing your contract
    // function calls (`const ret  = contract.your_function()`) and you'll get
    // helpful editor autocompletion, linting errors ...
}
main().catch(console.error)
```

### Build

To use abiwan, you must first generate types from your contracts' ABI json files, you can use the helper script:

```bash
npm run generate -- --input /path/to/abi.json --output /path/to/abi.ts
```

This will create a typescript file for the abi.
You can then import it in any script and you are set to go:

```typescript
import abi from "./path/to/abi";
import { call } from "./kanabi";
const balance = call(abi, "balance_of", 5n);
```

> If you think that we should be able to import types directly from the json files, we think so too!
> See this typescript [issue](https://github.com/microsoft/TypeScript/issues/32063) and thumb it up!

### Run tests

```bash
npm run typecheck
```

### Generate `test/example.ts`

```bash
# First build the example project with `scarb`
cd test/example
scarb build
# Then generate test/example.ts
cd ../..
npm run generate -- --input test/example/target/dev/example_example_contract.contract_class.json --output test/example.ts
```

### Demo

https://drive.google.com/file/d/1OpIgKlk-okvwJn-dkR2Pq2FvOVwlXTUJ/view?usp=sharing

### Warning

Abiwan is still very young and has not yet been subject to an official release. We do not recommend using it in production yet.

##  Supported Cairo Types

Abi-wan-kanabi supports all of Cairo types, here's the mapping between Cairo types and Typescript types

### Primitive Types

| Cairo              | TypeScript                     |
| ------------------ | ------------------------------ |
| `felt252`          | `string \| number \| bigint`   |
| `u8 - u32`         | `number \| bigint`             |
| `u64 - u256`       | `number \| bigint \| Uint256`  |
| `ContractAddress`  | `string`                       |
| `ClassHash`        | `string`                       |
| `bool`             | `boolean`                      |
| `()`               | `void`                         |

###  Complex Types

| Cairo                     | TypeScript                                          |
| ------------------------- | --------------------------------------------------- |
| `Option<T>`               | `T \| undefined`                                    |
| `Array<T>`                | `T[]`                                               |
| `tuple (T1, T2, ..., Tn)` | `[T1, T2, ..., Tn]`                                 |
| `struct`                  | an object where keys are struct member names        |
| `enum`                    | a union of objects, each enum variant is an object  |

#### Struct example

**Cairo:**

```cairo
struct TestStruct {
  int128: u128,
  felt: felt252,
  tuple: (u32, u32)
}
```

**Typescript:**

```typescript
{
  int128: number | bigint | Uint256;
  felt: string | number | bigint;
  tuple: [number | bigint, number | bigint];
}
```

#### Enum example

**Cairo:**

```cairo
enum TestEnum {
  int128: u128,
  felt: felt252,
  tuple: (u32, u32),
}
```

**Typescript:**

```typescript
{ int128: number | bigint | Uint256 } |
{ felt: string | number | bigint } |
{ tuple: [number | bigint, number | bigint]}
```

## Contributing

Contributions on abiwan are most welcome!
If you are willing to contribute, please get in touch with one of the project lead or via the repositories [Discussions](https://github.com/keep-starknet-strange/abi-wan-kanabi/discussions/categories/general)

## Acknowledgements

### Authors and Contributors

For a full list of all authors and contributors, see [the contributors page](https://github.com/keep-starknet-strange/abi-wan-kanabi/contributors).

### Special mentions

Big thanks and shoutout to [Francesco](https://github.com/fracek)! :clap: who is at the origin of the project!

Also thanks to the awesome Haroune ([@haroune-mohammedi](https://github.com/haroune-mohammedi)) and Thomas ([@thomas-quadratic](https://github.com/thomas-quadratic)) from [Quadratic](https://en.quadratic-labs.com/)!

### Other projects

Abiwan is greatly influenced by the similar project for EVM-compatible contracts [wagmi/abitype](https://github.com/wagmi-dev/abitype).
