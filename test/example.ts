import {call} from '../index';

export const ABI = [
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
    'type': 'function',
    'name': 'test_option',
    'inputs': [
      {'name': 'option', 'ty': 'core::option::Option<core::option::Option<core::integer::u8>>'},
    ],
    'output_ty': '()',
    'state_mutability': 'external'
  },
  {
    'type': 'function',
    'name': 'test_array',
    'inputs': [
      {'name': 'option', 'ty': 'core::array::Array::<core::integer::u8>'},
    ],
    'output_ty': '()',
    'state_mutability': 'external'
  },
  {
    'type': 'function',
    'name': 'test_array_of_options',
    'inputs': [
      {'name': 'option', 'ty': 'core::array::Array::<core::option::Option<core::integer::u8>>'},
    ],
    'output_ty': '()',
    'state_mutability': 'external'
  },
  {
    'type': 'function',
    'name': 'test_array_of_options_of_arrays',
    'inputs': [
      {'name': 'option', 'ty': 'core::array::Array::<core::option::Option<core::array::Array::<core::integer::u8>>>'},
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

// Setting output to core::option::Option<()> causes type check errors everywhere

// inputs: felt, felt, u8, u256, ContractAddress | output: ()
const ret1 =
    call(ABI, 'constructor', [5n, 2n, 4, 2n, 1n]);

// inputs: [] | output: felt
const ret2 = call(ABI, 'get_name', []);
const ret3 = call(ABI, 'get_symbol', []);
// inputs: [] | output: u8
const ret4 = call(ABI, 'get_decimals', []);
// inputs: [] | output: u256
const ret5 = call(ABI, 'get_total_supply', []);
// inputs: ContractAddress, ContractAddress | output: u256
const ret6 = call(ABI, 'balance_of', 5n);
// inputs: ContractAddress, ContractAddress, u256 | output: ()
const ret9 = call(ABI, 'transfer_from', [1n, 2n, 3n]);
// inputs: ContractAddress, u256 | output: ()
const ret8 = call(ABI, 'transfer', [1n, 2n]);
const ret10 = call(ABI, 'approve', [1n, 2n]);
const ret11 = call(ABI, 'increase_allowance', [1n, 2n]);
const ret12 = call(ABI, 'decrease_allowance', [1n, 2n]);
// inputs: ContractAddress, ContractAddress | output: u256
const ret7 = call(ABI, 'allowance', [1n, 2n]);

const ret13 = call(ABI, 'test_option', 5);
const ret14 = call(ABI, 'test_option', undefined);

const ret15 = call(ABI, 'test_array', [1, 2, 3, 4]);
const ret16 = call(ABI, 'test_array', [1n, 2n, 3n]);
const ret17 = call(ABI, 'test_array', [1n, 2n, 3]);

const ret18 = call(ABI, "test_array_of_options", [1, 2, undefined, undefined, 3]);

const ret19 = call(ABI, "test_array_of_options_of_arrays", [[1, 2], undefined, [5, 6]])
