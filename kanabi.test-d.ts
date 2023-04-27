import { FunctionArgs, FunctionRet } from "./kanabi";
import { test, expectTypeOf, assertType } from "vitest";
import { ABI } from "./test/example";

type TAbi = typeof ABI;

test("FunctionArgs", () => {
    // inputs: felt, felt, u8, u256, ContractAddress
    assertType<FunctionArgs<TAbi, 'constructor'>>([5n, 2n, 4, 2n, 1n]);

    // inputs: []
    assertType<FunctionArgs<TAbi, 'get_name'>>([]);
    assertType<FunctionArgs<TAbi, 'get_symbol'>>([]);
    assertType<FunctionArgs<TAbi, 'get_decimals'>>([]);
    assertType<FunctionArgs<TAbi, 'get_total_supply'>>([]);

    // inputs: ContractAddress
    assertType<FunctionArgs<TAbi, 'balance_of'>>(5n);

    // inputs: ContractAddress, ContractAddress, u256
    assertType<FunctionArgs<TAbi, 'transfer_from'>>([1n, 2n, 3n]);

    // inputs: ContractAddress, u256
    assertType<FunctionArgs<TAbi, 'transfer'>>([1n, 2n]);
    assertType<FunctionArgs<TAbi, 'approve'>>([1n, 2n]);
    assertType<FunctionArgs<TAbi, 'increase_allowance'>>([1n, 2n]);
    assertType<FunctionArgs<TAbi, 'decrease_allowance'>>([1n, 2n]);

    // inputs: ContractAddress, ContractAddress
    assertType<FunctionArgs<TAbi, 'allowance'>>([1n, 2n]);
})

test("FunctionRet", () => {
    // TODO: find a way to assert a type is void
    // output: ()
    // assertType<FunctionRet<TAbi, 'constructor'>>();
    // assertType<FunctionRet<TAbi, 'transfer'>>();
    // assertType<FunctionRet<TAbi, 'approve'>>();
    // assertType<FunctionRet<TAbi, 'increase_allowance'>>();
    // assertType<FunctionRet<TAbi, 'decrease_allowance'>>();
    // assertType<FunctionRet<TAbi, 'transfer_from'>>();

    // output: felt
    assertType<FunctionRet<TAbi, 'get_name'>>(10n);
    assertType<FunctionRet<TAbi, 'get_symbol'>>(6n);

    // output: u8
    assertType<FunctionRet<TAbi, 'get_decimals'>>(1);

    // output: u256
    assertType<FunctionRet<TAbi, 'get_total_supply'>>(1n);

    // inputs: u256
    assertType<FunctionRet<TAbi, 'balance_of'>>(5n);

    // output: u256
    assertType<FunctionRet<TAbi, 'allowance'>>(50n);
})
