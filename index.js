"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function call(abi, f, args) {
    throw new Error('todo');
}
const ABI = [
    {
        "members": [
            {
                "name": "low",
                "offset": 0,
                "type": "felt"
            },
            {
                "name": "high",
                "offset": 1,
                "type": "felt"
            }
        ],
        "name": "Uint256",
        "size": 2,
        "type": "struct"
    },
    {
        "inputs": [
            {
                "name": "par1",
                "type": "felt"
            },
            {
                "name": "symbol",
                "type": "felt"
            },
            {
                "name": "decimals",
                "type": "felt"
            },
            {
                "name": "initial_supply",
                "type": "Uint256"
            },
            {
                "name": "recipient",
                "type": "felt"
            }
        ],
        "name": "constructor",
        "outputs": [],
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "fun1",
        "outputs": [
            {
                "name": "par1",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "name": "x", "type": "felt" }, { "name": "y", "type": "felt" }],
        "name": "fun2",
        "outputs": [
            {
                "name": "par1",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "account",
                "type": "felt"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
];
const xxx = () => { return { low: 0, high: 0 }; };
let a;
let test;
let c = test.demo();
const Regions = {
    "": true,
    "eu-west-1": true,
    "eu-east-1": true,
    "us-west-1": true,
    "ap-southeast-1": true,
    "ap-east-1": true
};
const xxxx = call(ABI, 'balanceOf', [123]);
