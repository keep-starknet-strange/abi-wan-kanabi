import {call} from '../index';

const ABI = [
  {
    'type': 'function',
    'name': 'constructor',
    'inputs': [
      {'name': 'name_', 'ty': 'core::felt'},
      {'name': 'symbol_', 'ty': 'core::felt'},
      {'name': 'decimals_', 'ty': 'core::integer::u8'},
      {'name': 'initial_supply', 'ty': 'core::integer::u256'},
      {'name': 'recipient', 'ty': 'core::starknet::ContractAddress'}
    ],
    'output_ty': '()',
    'state_mutability': 'external'
  },
  {
    'type': 'function',
    'name': 'get_name',
    'inputs': [],
    'output_ty': 'core::felt',
    'state_mutability': 'view'
  },
  {
    'type': 'function',
    'name': 'get_symbol',
    'inputs': [],
    'output_ty': 'core::felt',
    'state_mutability': 'view'
  },
  {
    'type': 'function',
    'name': 'get_decimals',
    'inputs': [],
    'output_ty': 'core::integer::u8',
    'state_mutability': 'view'
  },
  {
    'type': 'function',
    'name': 'get_total_supply',
    'inputs': [],
    'output_ty': 'core::integer::u256',
    'state_mutability': 'view'
  },
  {
    'type': 'function',
    'name': 'balance_of',
    'inputs': [{'name': 'account', 'ty': 'core::starknet::ContractAddress'}],
    'output_ty': 'core::integer::u256',
    'state_mutability': 'view'
  },
  {
    'type': 'function',
    'name': 'allowance',
    'inputs': [
      {'name': 'owner', 'ty': 'core::starknet::ContractAddress'},
      {'name': 'spender', 'ty': 'core::starknet::ContractAddress'}
    ],
    'output_ty': 'core::integer::u256',
    'state_mutability': 'view'
  },
  {
    'type': 'function',
    'name': 'transfer',
    'inputs': [
      {'name': 'recipient', 'ty': 'core::starknet::ContractAddress'},
      {'name': 'amount', 'ty': 'core::integer::u256'}
    ],
    'output_ty': '()',
    'state_mutability': 'external'
  },
  {
    'type': 'function',
    'name': 'transfer_from',
    'inputs': [
      {'name': 'sender', 'ty': 'core::starknet::ContractAddress'},
      {'name': 'recipient', 'ty': 'core::starknet::ContractAddress'},
      {'name': 'amount', 'ty': 'core::integer::u256'}
    ],
    'output_ty': '()',
    'state_mutability': 'external'
  },
  {
    'type': 'function',
    'name': 'approve',
    'inputs': [
      {'name': 'spender', 'ty': 'core::starknet::ContractAddress'},
      {'name': 'amount', 'ty': 'core::integer::u256'}
    ],
    'output_ty': '()',
    'state_mutability': 'external'
  },
  {
    'type': 'function',
    'name': 'increase_allowance',
    'inputs': [
      {'name': 'spender', 'ty': 'core::starknet::ContractAddress'},
      {'name': 'added_value', 'ty': 'core::integer::u256'}
    ],
    'output_ty': '()',
    'state_mutability': 'external'
  },
  {
    'type': 'function',
    'name': 'decrease_allowance',
    'inputs': [
      {'name': 'spender', 'ty': 'core::starknet::ContractAddress'},
      {'name': 'subtracted_value', 'ty': 'core::integer::u256'}
    ],
    'output_ty': '()',
    'state_mutability': 'external'
  },
  {
    'type': 'event',
    'name': 'Transfer',
    'inputs': [
      {'name': 'from', 'ty': 'core::starknet::ContractAddress'},
      {'name': 'to', 'ty': 'core::starknet::ContractAddress'},
      {'name': 'value', 'ty': 'core::integer::u256'}
    ]
  },
  {
    'type': 'event',
    'name': 'Approval',
    'inputs': [
      {'name': 'owner', 'ty': 'core::starknet::ContractAddress'},
      {'name': 'spender', 'ty': 'core::starknet::ContractAddress'},
      {'name': 'value', 'ty': 'core::integer::u256'}
    ]
  }
] as const;

// inputs: felt, felt, u8, u256, ContractAddress | output: ()
const ret1 =
    call(ABI, 'constructor', [BigInt(5), BigInt(2), 5, BigInt(1), BigInt(2)]);

// inputs: [] | output: felt
const ret2 = call(ABI, 'get_name', []);
const ret3 = call(ABI, 'get_symbol', []);
// inputs: [] | output: u8
const ret4 = call(ABI, 'get_decimals', []);
// inputs: [] | output: u256
const ret5 = call(ABI, 'get_total_supply', []);
// inputs: ContractAddress, ContractAddress | output: u256
const ret6 = call(ABI, 'balance_of', BigInt(5));
// inputs: ContractAddress, ContractAddress, u256 | output: ()
const ret9 = call(ABI, 'transfer_from', [BigInt(1), BigInt(2), BigInt(3)]);
// inputs: ContractAddress, u256 | output: ()
const ret8 = call(ABI, 'transfer', [BigInt(1), BigInt(2)]);
const ret10 = call(ABI, 'approve', [BigInt(1), BigInt(2)]);
const ret11 = call(ABI, 'increase_allowance', [BigInt(1), BigInt(2)]);
const ret12 = call(ABI, 'decrease_allowance', [BigInt(1), BigInt(2)]);
// inputs: ContractAddress, ContractAddress | output: u256
const ret7 = call(ABI, 'allowance', [BigInt(1), BigInt(2)]);