import {
  AbiTypeToPrimitiveType,
  CairoAddress,
  CairoBigInt,
  CairoFelt,
  CairoFunction,
  CairoInt,
  CairoTuple,
  CairoU256,
  CairoVoid,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
  FunctionArgs,
  FunctionRet,
  StringToPrimitiveType,
} from '../kanabi'
import { ABI } from './example'
import { assertType, expectTypeOf, test } from 'vitest'

type TAbi = typeof ABI

function returnVoid() {}

const voidValue = returnVoid()
const bigIntValue = 105n
const intValue = 10
const emptyArray: [] = []
const boolValue = true

test('Cairo Types', () => {
  assertType<CairoFelt>('core::felt252')
  assertType<CairoInt>('core::integer::u8')
  assertType<CairoInt>('core::integer::u16')
  assertType<CairoInt>('core::integer::u32')
  assertType<CairoBigInt>('core::integer::u64')
  assertType<CairoBigInt>('core::integer::u128')
  assertType<CairoU256>('core::integer::u256')
  assertType<CairoAddress>('core::starknet::contract_address::ContractAddress')
  assertType<CairoFunction>('function')
  assertType<CairoVoid>('()')
  assertType<CairoTuple>('()')
  assertType<CairoTuple>('(1)')
  assertType<CairoTuple>('(1, 2n)')
  assertType<CairoTuple>("(1, 2n, 'string')")
  assertType<CairoTuple>('(1, 2, 3, 4, 5)')
})

test('Cairo Types Errors', () => {
  // @ts-expect-error
  assertType<CairoFelt>('core::integer:u8')
  // @ts-expect-error
  assertType<CairoInt>('core::integer::u64')
  // @ts-expect-error
  assertType<CairoInt>('core::integer::u128')
  // @ts-expect-error
  assertType<CairoInt>('core::integer::u256')
  // @ts-expect-error
  assertType<CairoBigInt>('core::integer::u8')
  // @ts-expect-error
  assertType<CairoBigInt>('core::integer::u16')
  // @ts-expect-error
  assertType<CairoBigInt>('core::integer::u32')
  // @ts-expect-error
  assertType<CairoAddress>('core::felt')
  // @ts-expect-error
  assertType<CairoFunction>('core::integer::u8')
  // @ts-expect-error
  assertType<CairoVoid>('function')
  // @ts-expect-error
  assertType<CairoTuple>('(')
})

test('FunctionArgs', () => {
  assertType<FunctionArgs<TAbi, 'fn_felt'>>(bigIntValue)
  assertType<FunctionArgs<TAbi, 'fn_felt_u8_bool'>>([
    bigIntValue,
    intValue,
    boolValue,
  ])
  assertType<FunctionArgs<TAbi, 'fn_felt_u8_bool_out_address_felt_u8_bool'>>([
    bigIntValue,
    intValue,
    boolValue,
  ])

  assertType<FunctionArgs<TAbi, 'fn_struct'>>({
    felt: bigIntValue,
    int128: bigIntValue,
    tuple: [intValue, intValue],
  })
  assertType<FunctionArgs<TAbi, 'fn_struct_array'>>([
    { felt: bigIntValue, int128: bigIntValue, tuple: [intValue, intValue] },
  ])

  assertType<FunctionArgs<TAbi, 'fn_simple_array'>>([intValue, intValue])

  assertType<FunctionArgs<TAbi, 'fn_out_enum_array'>>([])

  assertType<FunctionArgs<TAbi, 'fn_enum'>>({ felt: bigIntValue })
  assertType<FunctionArgs<TAbi, 'fn_enum'>>({ int128: bigIntValue })
  assertType<FunctionArgs<TAbi, 'fn_enum'>>({ tuple: [intValue, intValue] })

  assertType<FunctionArgs<TAbi, 'fn_enum_array'>>([
    { felt: bigIntValue },
    { int128: bigIntValue },
    { tuple: [intValue, intValue] },
  ])
})

test('FunctionArgs Errors', () => {
  assertType<FunctionArgs<TAbi, 'fn_felt'>>(
    // @ts-expect-error
    [bigIntValue, bigIntValue],
  )
  // @ts-expect-error
  assertType<FunctionArgs<TAbi, 'fn_felt'>>(intValue)
  assertType<FunctionArgs<TAbi, 'fn_felt_u8_bool'>>([
    bigIntValue,
    intValue,
    // @ts-expect-error
    intValue,
  ])
  // @ts-expect-error
  assertType<FunctionArgs<TAbi, 'fn_felt_u8_bool_out_address_felt_u8_bool'>>([
    bigIntValue,
    intValue,
  ])
  assertType<FunctionArgs<TAbi, 'fn_struct'>>({
    felt: bigIntValue,
    int128: bigIntValue,
    // @ts-expect-error
    tuple: [intValue, boolValue],
  })
  // @ts-expect-error
  assertType<FunctionArgs<TAbi, 'fn_struct'>>({
    int128: bigIntValue,
    tuple: [intValue, intValue],
  })
  // @ts-expect-error
  assertType<FunctionArgs<TAbi, 'fn_out_enum_array'>>([intValue])
})

test('FunctionRet', () => {
  assertType<FunctionRet<TAbi, 'fn_felt_out_felt'>>(bigIntValue)

  assertType<FunctionRet<TAbi, 'fn_felt_u8_bool_out_address_felt_u8_bool'>>([
    bigIntValue,
    bigIntValue,
    intValue,
    boolValue,
  ])
  assertType<FunctionRet<TAbi, 'fn_out_simple_array'>>([intValue, intValue])

  assertType<FunctionRet<TAbi, 'fn_out_simple_option'>>(intValue)
  assertType<FunctionRet<TAbi, 'fn_out_simple_option'>>(undefined)

  assertType<FunctionRet<TAbi, 'fn_out_nested_option'>>(intValue)
  assertType<FunctionRet<TAbi, 'fn_out_nested_option'>>(undefined)

  assertType<FunctionRet<TAbi, 'fn_out_enum_array'>>([])
  assertType<FunctionRet<TAbi, 'fn_out_enum_array'>>([
    { felt: bigIntValue },
    { int128: bigIntValue },
    { tuple: [intValue, intValue] },
  ])
})

test('FunctionRet Errors', () => {
  // @ts-expect-error
  assertType<FunctionRet<TAbi, 'fn_felt'>>(intValue)
  // @ts-expect-error
  assertType<FunctionRet<TAbi, 'fn_felt_u8_bool'>>(bigIntValue)
  assertType<FunctionRet<TAbi, 'fn_felt_u8_bool_out_address_felt_u8_bool'>>(
    // @ts-expect-error
    emptyArray,
  )
  // @ts-expect-error
  assertType<FunctionRet<TAbi, 'fn_out_simple_array'>>(intValue)
  // @ts-expect-error
  assertType<FunctionRet<TAbi, 'fn_out_simple_option'>>(emptyArray)
  assertType<FunctionRet<TAbi, 'fn_out_enum_array'>>([
    { felt: bigIntValue },
    { int128: bigIntValue },
    { tuple: [intValue, intValue] },
    // @ts-expect-error
    { x: 1 },
  ])
  // @ts-expect-error
  assertType<FunctionRet<TAbi, 'fn_out_nested_option'>>([intValue, intValue])
  // @ts-expect-error
  assertType<FunctionRet<TAbi, 'fn_out_simple_option'>>(voidValue)
})

test('ExtractAbiFunction', () => {
  const fnValue = {
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
  } as const
  assertType<ExtractAbiFunction<TAbi, 'fn_felt_out_felt'>>(fnValue)
})

test('ExtractAbiFunctionName', () => {
  type Expected =
    | 'fn_felt'
    | 'fn_felt_u8_bool'
    | 'fn_felt_u8_bool_out_address_felt_u8_bool'
    | 'fn_felt_out_felt'
    | 'fn_out_simple_option'
    | 'fn_out_nested_option'
    | 'fn_simple_array'
    | 'fn_out_simple_array'
    | 'fn_struct_array'
    | 'fn_struct'
    | 'fn_enum'
    | 'fn_enum_array'
    | 'fn_out_enum_array'

  expectTypeOf<ExtractAbiFunctionNames<TAbi>>().toEqualTypeOf<Expected>()
})

test('AbiTypeToPrimitiveType', () => {
  assertType<AbiTypeToPrimitiveType<TAbi, CairoFelt>>(bigIntValue)
  assertType<AbiTypeToPrimitiveType<TAbi, CairoInt>>(intValue)
  assertType<AbiTypeToPrimitiveType<TAbi, CairoInt>>(bigIntValue)
  assertType<AbiTypeToPrimitiveType<TAbi, CairoBigInt>>(bigIntValue)
  assertType<AbiTypeToPrimitiveType<TAbi, CairoU256>>(intValue)
  assertType<AbiTypeToPrimitiveType<TAbi, CairoAddress>>(bigIntValue)
  assertType<AbiTypeToPrimitiveType<TAbi, CairoFunction>>(intValue)
  assertType<AbiTypeToPrimitiveType<TAbi, CairoVoid>>(voidValue)
})

test('AbiTypeToPrimitiveType Errors', () => {
  // @ts-expect-error CairoFelt should be bigint
  assertType<AbiTypeToPrimitiveType<TAbi, CairoFelt>>(intValue)
  // @ts-expect-error CairoInt should be number or bigint
  assertType<AbiTypeToPrimitiveType<TAbi, CairoInt>>(voidValue)
  // @ts-expect-error CairoBigInt should be bigint
  assertType<AbiTypeToPrimitiveType<TAbi, CairoBigInt>>(intValue)
  // @ts-expect-error CairoAddress should be bigint
  assertType<AbiTypeToPrimitiveType<TAbi, CairoAddress>>(intValue)
  // @ts-expect-error CairoFunction should be int
  assertType<AbiTypeToPrimitiveType<TAbi, CairoFunction>>(bigIntValue)
  // @ts-expect-error CairoVoid should be void
  assertType<AbiTypeToPrimitiveType<TAbi, CairoVoid>>(intValue)
})

test('StringToPrimitiveType', () => {
  // TODO: add tests for struct, enum and tuple
  assertType<StringToPrimitiveType<TAbi, CairoFelt>>(bigIntValue)
  assertType<StringToPrimitiveType<TAbi, CairoFelt>>(bigIntValue)
  assertType<StringToPrimitiveType<TAbi, CairoInt>>(intValue)
  assertType<StringToPrimitiveType<TAbi, CairoInt>>(bigIntValue)
  assertType<StringToPrimitiveType<TAbi, CairoBigInt>>(bigIntValue)
  assertType<StringToPrimitiveType<TAbi, CairoAddress>>(bigIntValue)
  assertType<StringToPrimitiveType<TAbi, CairoFunction>>(intValue)
  assertType<StringToPrimitiveType<TAbi, CairoVoid>>(voidValue)
})

test('StringToPrimitiveType Errors', () => {
  // TODO: add tests for struct, enum and tuple
  // @ts-expect-error CairoFelt should be bigint
  assertType<StringToPrimitiveType<TAbi, CairoFelt>>(intValue)
  // @ts-expect-error CairoInt should be number or bigint
  assertType<StringToPrimitiveType<TAbi, CairoInt>>(voidValue)
  // @ts-expect-error CairoBigInt should be bigint
  assertType<StringToPrimitiveType<TAbi, CairoBigInt>>(intValue)
  // @ts-expect-error CairoAddress should be bigint
  assertType<StringToPrimitiveType<TAbi, CairoAddress>>(intValue)
  // @ts-expect-error CairoFunction should be int
  assertType<StringToPrimitiveType<TAbi, CairoFunction>>(bigIntValue)
  // @ts-expect-error CairoVoid should be void
  assertType<StringToPrimitiveType<TAbi, CairoVoid>>(intValue)
})
