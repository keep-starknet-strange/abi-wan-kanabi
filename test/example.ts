import {call} from '../index';
// import abi from './abi_demo.json';

const ABI = [
  {
    'members': [
      {'name': 'low', 'offset': 0, 'type': 'felt'},
      {'name': 'high', 'offset': 1, 'type': 'felt'}
    ],
    'name': 'Uint256',
    'size': 2,
    'type': 'struct'
  },
  {
    'inputs': [
      {'name': 'par1', 'type': 'felt'}, {'name': 'symbol', 'type': 'felt'},
      {'name': 'decimals', 'type': 'felt'},
      {'name': 'initial_supply', 'type': 'Uint256'},
      {'name': 'recipient', 'type': 'felt'}
    ],
    'name': 'constructor',
    'outputs': [],
    'type': 'constructor'
  },
  {
    'inputs': [],
    'name': 'fun1',
    'outputs':
        [{'name': 'par1', 'type': 'felt'}, {'name': 'par2', 'type': 'Uint256'}],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [{'name': 'x', 'type': 'felt'}, {'name': 'y', 'type': 'felt'}],
    'name': 'fun2',
    'outputs': [],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [{'name': 'account', 'type': 'felt'}],
    'name': 'balanceOf',
    'outputs': [{'name': 'balance', 'type': 'Uint256'}],
    'stateMutability': 'view',
    'type': 'function'
  }
] as const;

// fun1 takes no input and returns [felt, Uint256]
const ret1 = call(ABI, 'fun1', []);
// fun2 takes two felts as input and has no output
const ret2 = call(ABI, 'fun2', [123, 321]);
// balanceOf takes one felt as input and returns a Uint256
const balance = call(ABI, 'balanceOf', 123);