import {
    CairoFelt,
    CairoInt,
    CairoBigInt,
    CairoAddress,
    CairoFunction,
    CairoVoid,
    CairoTuple,
    FunctionArgs,
    FunctionRet,
    ExtractAbiFunction,
    ExtractAbiFunctionNames,
    AbiTypeToPrimitiveType,
    AbiParameterToPrimitiveType,
    ExtractAbiStruct
} from "./kanabi";
import { test, expectTypeOf, assertType } from "vitest";
import { ABI } from "./test/example";

type TAbi = typeof ABI;

function returnVoid() { }

const voidValue = returnVoid();
const bigIntValue = 105n;
const intValue = 10;
const emptyArray: [] = [];

test("Cairo Types", () => {
    assertType<CairoFelt>("core::felt");
    assertType<CairoInt>("core::integer::u8");
    assertType<CairoInt>("core::integer::u16");
    assertType<CairoInt>("core::integer::u32");
    assertType<CairoBigInt>("core::integer::u64");
    assertType<CairoBigInt>("core::integer::u128");
    assertType<CairoBigInt>("core::integer::u256");
    assertType<CairoAddress>("core::starknet::ContractAddress");
    assertType<CairoFunction>("function");
    assertType<CairoVoid>("()");
    assertType<CairoTuple>("()");
    assertType<CairoTuple>("(1)");
    assertType<CairoTuple>("(1, 2n)");
    assertType<CairoTuple>("(1, 2n, 'string')");
    assertType<CairoTuple>("(1, 2, 3, 4, 5)");
})

test("Cairo Types Errors", () => {
    // @ts-expect-error
    assertType<CairoFelt>("core::integer:u8");
    // @ts-expect-error
    assertType<CairoInt>("core::integer::u64");
    // @ts-expect-error
    assertType<CairoInt>("core::integer::u128");
    // @ts-expect-error
    assertType<CairoInt>("core::integer::u256");
    // @ts-expect-error
    assertType<CairoBigInt>("core::integer::u8");
    // @ts-expect-error
    assertType<CairoBigInt>("core::integer::u16");
    // @ts-expect-error
    assertType<CairoBigInt>("core::integer::u32");
    // @ts-expect-error
    assertType<CairoAddress>("core::felt");
    // @ts-expect-error
    assertType<CairoFunction>("core::integer::u8");
    // @ts-expect-error
    assertType<CairoVoid>("function");
    // @ts-expect-error
    assertType<CairoTuple>("(");
})

test("FunctionArgs", () => {
    // inputs: felt, felt, u8, u256, ContractAddress
    assertType<FunctionArgs<TAbi, 'constructor'>>(
        [bigIntValue, bigIntValue, intValue, bigIntValue, bigIntValue]
    );
    // inputs: []
    assertType<FunctionArgs<TAbi, 'get_name'>>(emptyArray);
    assertType<FunctionArgs<TAbi, 'get_symbol'>>(emptyArray);
    assertType<FunctionArgs<TAbi, 'get_decimals'>>(emptyArray);
    assertType<FunctionArgs<TAbi, 'get_total_supply'>>(emptyArray);
    // inputs: ContractAddress
    assertType<FunctionArgs<TAbi, 'balance_of'>>(bigIntValue);
    // inputs: ContractAddress, ContractAddress, u256
    assertType<FunctionArgs<TAbi, 'transfer_from'>>([bigIntValue, bigIntValue, bigIntValue]);
    // inputs: ContractAddress, u256
    assertType<FunctionArgs<TAbi, 'transfer'>>([bigIntValue, bigIntValue]);
    assertType<FunctionArgs<TAbi, 'approve'>>([bigIntValue, bigIntValue]);
    assertType<FunctionArgs<TAbi, 'increase_allowance'>>([bigIntValue, bigIntValue]);
    assertType<FunctionArgs<TAbi, 'decrease_allowance'>>([bigIntValue, bigIntValue]);
    // inputs: ContractAddress, ContractAddress
    assertType<FunctionArgs<TAbi, 'allowance'>>([bigIntValue, bigIntValue]);
})

test("FunctionArgs Errors", () => {
    // inputs: felt, felt, u8, u256, ContractAddress
    assertType<FunctionArgs<TAbi, 'constructor'>>(
        // @ts-expect-error constructor has 5 arguments
        [bigIntValue, bigIntValue, intValue, bigIntValue, bigIntValue, intValue]
    );
    // inputs: []
    // @ts-expect-error
    assertType<FunctionArgs<TAbi, 'get_name'>>(intValue);
    // @ts-expect-error
    assertType<FunctionArgs<TAbi, 'get_symbol'>>(voidValue);
    // @ts-expect-error
    assertType<FunctionArgs<TAbi, 'get_decimals'>>(intValue);
    // @ts-expect-error
    assertType<FunctionArgs<TAbi, 'get_total_supply'>>(bigIntValue);
    // inputs: ContractAddress
    // @ts-expect-error
    assertType<FunctionArgs<TAbi, 'balance_of'>>(voidValue);
    // inputs: ContractAddress, ContractAddress, u256
    // @ts-expect-error
    assertType<FunctionArgs<TAbi, 'transfer_from'>>([bigIntValue, intValue, intValue]);
    // inputs: ContractAddress, u256
    // @ts-expect-error
    assertType<FunctionArgs<TAbi, 'transfer'>>([intValue, bigIntValue]);
    // @ts-expect-error
    assertType<FunctionArgs<TAbi, 'approve'>>([bigIntValue, intValue]);
    // @ts-expect-error
    assertType<FunctionArgs<TAbi, 'increase_allowance'>>([bigIntValue, voidValue]);
    // @ts-expect-error
    assertType<FunctionArgs<TAbi, 'decrease_allowance'>>([bigIntValue, emptyArray]);
    // inputs: ContractAddress, ContractAddress
    // @ts-expect-error
    assertType<FunctionArgs<TAbi, 'allowance'>>([intValue, intValue]);
})

test("FunctionRet", () => {
    // output: ()
    assertType<FunctionRet<TAbi, 'constructor'>>(voidValue);
    assertType<FunctionRet<TAbi, 'transfer'>>(voidValue);
    assertType<FunctionRet<TAbi, 'approve'>>(voidValue);
    assertType<FunctionRet<TAbi, 'increase_allowance'>>(voidValue);
    assertType<FunctionRet<TAbi, 'decrease_allowance'>>(voidValue);
    assertType<FunctionRet<TAbi, 'transfer_from'>>(voidValue);
    // output: felt
    assertType<FunctionRet<TAbi, 'get_name'>>(bigIntValue);
    assertType<FunctionRet<TAbi, 'get_symbol'>>(bigIntValue);
    // output: u8
    assertType<FunctionRet<TAbi, 'get_decimals'>>(intValue);
    // output: u256
    assertType<FunctionRet<TAbi, 'get_total_supply'>>(bigIntValue);
    // inputs: u256
    assertType<FunctionRet<TAbi, 'balance_of'>>(bigIntValue);
    // output: u256
    assertType<FunctionRet<TAbi, 'allowance'>>(bigIntValue);
})

test("FunctionRet Errors", () => {
    // output: ()
    // @ts-expect-error
    assertType<FunctionRet<TAbi, 'constructor'>>(intValue);
    // @ts-expect-error
    assertType<FunctionRet<TAbi, 'transfer'>>(bigIntValue);
    // @ts-expect-error
    assertType<FunctionRet<TAbi, 'approve'>>(emptyArray);
    // @ts-expect-error
    assertType<FunctionRet<TAbi, 'increase_allowance'>>(intValue);
    // @ts-expect-error
    assertType<FunctionRet<TAbi, 'decrease_allowance'>>(emptyArray);
    // @ts-expect-error
    assertType<FunctionRet<TAbi, 'transfer_from'>>(intValue);
    // output: felt
    // @ts-expect-error
    assertType<FunctionRet<TAbi, 'get_name'>>([intValue, intValue]);
    // @ts-expect-error
    assertType<FunctionRet<TAbi, 'get_symbol'>>(voidValue);
    // output: u8
    // @ts-expect-error
    assertType<FunctionRet<TAbi, 'get_decimals'>>(emptyArray);
    // output: u256
    // @ts-expect-error
    assertType<FunctionRet<TAbi, 'get_total_supply'>>(intValue);
    // inputs: u256
    // @ts-expect-error
    assertType<FunctionRet<TAbi, 'balance_of'>>([intValue, bigIntValue]);
    // output: u256
    // @ts-expect-error
    assertType<FunctionRet<TAbi, 'allowance'>>([voidValue, intValue]);
})

test("ExtractAbiFunction", () => {
    type Expected = {
        readonly type: "function";
        readonly name: "balance_of";
        readonly inputs: readonly [{
            readonly name: "account";
            readonly ty: "core::starknet::ContractAddress";
        }];
        readonly output_ty: "core::integer::u256";
        readonly state_mutability: "view";
    };
    expectTypeOf<ExtractAbiFunction<TAbi, "balance_of">>().toEqualTypeOf<Expected>();
})

test("ExtractAbiFunctionName", () => {
    type Expected =
        | "balance_of"
        | "constructor"
        | "get_name"
        | "get_symbol"
        | "get_decimals"
        | "get_total_supply"
        | "allowance"
        | "transfer"
        | "transfer_from"
        | "approve"
        | "increase_allowance"
        | "decrease_allowance"
        | "test_option"
        | "test_array"
        | "test_array_of_options"
        | "test_array_of_options_of_arrays";

    expectTypeOf<ExtractAbiFunctionNames<TAbi>>().toEqualTypeOf<Expected>();
})

test("AbiTypeToPrimitiveType", () => {
    assertType<AbiTypeToPrimitiveType<TAbi, CairoFelt>>(bigIntValue);
    assertType<AbiTypeToPrimitiveType<TAbi, CairoInt>>(intValue);
    assertType<AbiTypeToPrimitiveType<TAbi, CairoInt>>(bigIntValue);
    assertType<AbiTypeToPrimitiveType<TAbi, CairoBigInt>>(bigIntValue);
    assertType<AbiTypeToPrimitiveType<TAbi, CairoAddress>>(bigIntValue);
    assertType<AbiTypeToPrimitiveType<TAbi, CairoFunction>>(intValue);
    assertType<AbiTypeToPrimitiveType<TAbi, CairoVoid>>(voidValue);

    // Tuple isn't implemented yet, it always returns any
    assertType<AbiTypeToPrimitiveType<TAbi, CairoTuple>>(intValue);
})

test("AbiTypeToPrimitiveType Errors", () => {
    // @ts-expect-error CairoFelt should be bigint
    assertType<AbiTypeToPrimitiveType<TAbi, CairoFelt>>(intValue);
    // @ts-expect-error CairoInt should be number or bigint
    assertType<AbiTypeToPrimitiveType<TAbi, CairoInt>>(voidValue);
    // @ts-expect-error CairoBigInt should be bigint
    assertType<AbiTypeToPrimitiveType<TAbi, CairoBigInt>>(intValue);
    // @ts-expect-error CairoAddress should be bigint
    assertType<AbiTypeToPrimitiveType<TAbi, CairoAddress>>(intValue);
    // @ts-expect-error CairoFunction should be int
    assertType<AbiTypeToPrimitiveType<TAbi, CairoFunction>>(bigIntValue);
    // @ts-expect-error CairoVoid should be void
    assertType<AbiTypeToPrimitiveType<TAbi, CairoVoid>>(intValue);
})

test("AbiParameterToPrimitiveType", () => {
    // TODO: add tests for struct AbiParameter
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoFelt, name: 'x'}>>(bigIntValue);
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoFelt, name: 'x'}>>(bigIntValue);
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoInt, name: 'x'}>>(intValue);
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoInt, name: 'x'}>>(bigIntValue);
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoBigInt, name: 'x'}>>(bigIntValue);
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoAddress, name: 'x'}>>(bigIntValue);
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoFunction, name: 'x'}>>(intValue);
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoVoid, name: 'x'}>>(voidValue);

    // Tuple ins't yet implemented, it always returns any
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoTuple, name: 'x'}>>(intValue);
})

test("AbiParameterToPrimitiveType Errors", () => {
    // TODO: add tests for struct AbiParameter
    // @ts-expect-error CairoFelt should be bigint
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoFelt, name: 'x'}>>(intValue);
    // @ts-expect-error CairoInt should be number or bigint
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoInt, name: 'x'}>>(voidValue);
    // @ts-expect-error CairoBigInt should be bigint
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoBigInt, name: 'x'}>>(intValue);
    // @ts-expect-error CairoAddress should be bigint
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoAddress, name: 'x'}>>(intValue);
    // @ts-expect-error CairoFunction should be int
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoFunction, name: 'x'}>>(bigIntValue);
    // @ts-expect-error CairoVoid should be void
    assertType<AbiParameterToPrimitiveType<TAbi, {ty: CairoVoid, name: 'x'}>>(intValue);
})
