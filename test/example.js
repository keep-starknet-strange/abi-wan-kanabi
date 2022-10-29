"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
//import abi from './abi_demo.json';
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
    }
];
const [balance] = (0, index_1.call)(ABI, 'balanceOf', [123]);
