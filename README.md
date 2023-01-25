# abi-wan-kanabi
Abi TypeScript parser for Cairo smart contracts, based on [wagmi/abitype](https://github.com/wagmi-dev/abitype).

## Setup
To use abiwan, you must first generate types from your contracts' ABI json files, for example using the helper script:
```bash
./scripts/extract_abi.sh <path>/<to>/<abi>.json <path>/<to>/<other_abi>.json ./
```
If you think that we should be able to import types directly from the json files, we think so too!
See this typescript [issue](https://github.com/microsoft/TypeScript/issues/32063) and thumb it up!

## Demo

https://drive.google.com/file/d/1OpIgKlk-okvwJn-dkR2Pq2FvOVwlXTUJ/view?usp=sharing

## Thanks!

Big thanks and shoutout to [Francesco](https://github.com/fracek)! :clap:
