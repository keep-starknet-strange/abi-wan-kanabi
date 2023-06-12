export const ABI = [
  {
    type: 'function',
    name: 'fn_felt',
    inputs: [
      {
        name: 'felt',
        type: 'core::felt252',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'fn_felt_u8_bool',
    inputs: [
      {
        name: 'felt',
        type: 'core::felt252',
      },
      {
        name: 'int8',
        type: 'core::integer::u8',
      },
      {
        name: 'b',
        type: 'core::bool',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'fn_felt_u8_bool_out_address_felt_u8_bool',
    inputs: [
      {
        name: 'felt',
        type: 'core::felt252',
      },
      {
        name: 'int8',
        type: 'core::integer::u8',
      },
      {
        name: 'boolean',
        type: 'core::bool',
      },
    ],
    outputs: [
      {
        type: '(core::starknet::contract_address::ContractAddress, core::felt252, core::integer::u8, core::bool)',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'fn_felt_out_felt',
    inputs: [
      {
        name: 'felt',
        type: 'core::felt252',
      },
    ],
    outputs: [
      {
        type: 'core::felt252',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'fn_out_simple_option',
    inputs: [],
    outputs: [
      {
        type: 'core::option::Option::<core::integer::u8>',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'fn_out_nested_option',
    inputs: [],
    outputs: [
      {
        type: 'core::option::Option::<core::option::Option::<core::integer::u8>>',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'fn_simple_array',
    inputs: [
      {
        name: 'arg',
        type: 'core::array::Array::<core::integer::u8>',
      },
    ],
    outputs: [],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'fn_out_simple_array',
    inputs: [],
    outputs: [
      {
        type: 'core::array::Array::<core::integer::u8>',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'struct',
    name: 'example::example::HelloStarknet::TestStruct',
    members: [
      {
        name: 'int128',
        type: 'core::integer::u128',
      },
      {
        name: 'felt',
        type: 'core::felt252',
      },
      {
        name: 'tuple',
        type: '(core::integer::u32, core::integer::u32)',
      },
    ],
  },
  {
    type: 'function',
    name: 'fn_struct_array',
    inputs: [
      {
        name: 'arg',
        type: 'core::array::Array::<example::example::HelloStarknet::TestStruct>',
      },
    ],
    outputs: [],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'fn_struct',
    inputs: [
      {
        name: 'arg',
        type: 'example::example::HelloStarknet::TestStruct',
      },
    ],
    outputs: [],
    state_mutability: 'view',
  },
  {
    type: 'enum',
    name: 'example::example::HelloStarknet::TestEnum',
    variants: [
      {
        name: 'int128',
        type: 'core::integer::u128',
      },
      {
        name: 'felt',
        type: 'core::felt252',
      },
      {
        name: 'tuple',
        type: '(core::integer::u32, core::integer::u32)',
      },
    ],
  },
  {
    type: 'function',
    name: 'fn_enum',
    inputs: [
      {
        name: 'arg',
        type: 'example::example::HelloStarknet::TestEnum',
      },
    ],
    outputs: [],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'fn_enum_array',
    inputs: [
      {
        name: 'arg',
        type: 'core::array::Array::<example::example::HelloStarknet::TestEnum>',
      },
    ],
    outputs: [],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'fn_out_enum_array',
    inputs: [],
    outputs: [
      {
        type: 'core::array::Array::<example::example::HelloStarknet::TestEnum>',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'event',
    name: 'TestEvent',
    inputs: [
      {
        name: 'from',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'value',
        type: 'core::felt252',
      },
    ],
  },
] as const
