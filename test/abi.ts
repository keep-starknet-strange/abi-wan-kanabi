import { call } from "../index";

export const ABI = [
  {
    "type": "function",
    "name": "say_hello",
    "inputs": [
      {
        "name": "message",
        "type": "core::felt252"
      }
    ],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "type": "function",
    "name": "say_hello_again",
    "inputs": [
      {
        "name": "message",
        "type": "core::felt252"
      },
      {
        "name": "n",
        "type": "core::integer::u8"
      },
      {
        "name": "b",
        "type": "core::bool"
      }
    ],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "type": "function",
    "name": "say_hello_view",
    "inputs": [
      {
        "name": "message",
        "type": "core::felt252"
      },
      {
        "name": "n",
        "type": "core::integer::u8"
      },
      {
        "name": "b",
        "type": "core::bool"
      }
    ],
    "outputs": [
      {
        "type": "(core::starknet::contract_address::ContractAddress, core::felt252, core::integer::u8, core::bool, core::array::Array::<hello_starknet::hello_starknet::HelloStarknet::TestStruct>)"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "func",
    "inputs": [
      {
        "name": "message",
        "type": "core::felt252"
      }
    ],
    "outputs": [
      {
        "type": "core::felt252"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "simple_option",
    "inputs": [],
    "outputs": [
      {
        "type": "core::option::Option::<core::integer::u8>"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "nested_option",
    "inputs": [],
    "outputs": [
      {
        "type": "core::option::Option::<core::option::Option::<core::integer::u8>>"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "simple_array",
    "inputs": [
      {
        "name": "arg",
        "type": "core::array::Array::<core::integer::u8>"
      }
    ],
    "outputs": [],
    "state_mutability": "view"
  },
  {
    "type": "enum",
    "name": "hello_starknet::hello_starknet::HelloStarknet::TestEnum",
    "variants": [
      {
        "name": "Integer",
        "type": "core::integer::u128"
      },
      {
        "name": "Felt",
        "type": "core::felt252"
      },
      {
        "name": "Tuple",
        "type": "(core::integer::u32, core::integer::u32)"
      }
    ]
  },
  {
    "type": "function",
    "name": "test_enum",
    "inputs": [
      {
        "name": "arg",
        "type": "hello_starknet::hello_starknet::HelloStarknet::TestEnum"
      }
    ],
    "outputs": [],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "test_enum_array",
    "inputs": [
      {
        "name": "arg",
        "type": "core::array::Array::<hello_starknet::hello_starknet::HelloStarknet::TestEnum>"
      }
    ],
    "outputs": [],
    "state_mutability": "view"
  },
  {
    "type": "struct",
    "name": "hello_starknet::hello_starknet::HelloStarknet::TestStruct",
    "members": [
      {
        "name": "integer",
        "type": "core::integer::u128"
      },
      {
        "name": "felt",
        "type": "core::felt252"
      },
      {
        "name": "felt2",
        "type": "core::felt252"
      },
      {
        "name": "tuple",
        "type": "(core::integer::u32, core::integer::u32)"
      }
    ]
  },
  {
    "type": "function",
    "name": "test_struct_array",
    "inputs": [
      {
        "name": "arg",
        "type": "core::array::Array::<hello_starknet::hello_starknet::HelloStarknet::TestStruct>"
      }
    ],
    "outputs": [],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "test_struct",
    "inputs": [
      {
        "name": "arg",
        "type": "hello_starknet::hello_starknet::HelloStarknet::TestStruct"
      }
    ],
    "outputs": [],
    "state_mutability": "view"
  },
  {
    "type": "event",
    "name": "Hello",
    "inputs": [
      {
        "name": "from",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "value",
        "type": "core::felt252"
      }
    ]
  },
  {
    "type": "function",
    "name": "test_unknown_types",
    "inputs": [
      {
        "name": "arg",
        "type": "no_type_is_here"
      }
    ],
    "outputs": [{ "type": "another_no_type" }],
    "state_mutability": "view"
  }
] as const;
