use starknet::ContractAddress;

#[derive(Drop, Serde)]
struct TestStruct {
    int128: u128,
    felt: felt252,
    tuple: (u32, u32)
}

#[derive(Copy, Drop, Serde)]
enum TestEnum {
    int128: u128,
    felt: felt252,
    tuple: (u32, u32),
}

#[starknet::interface]
trait IExampleContract<TContractState> {
    fn fn_felt(self: @TContractState, felt: felt252);

    fn fn_felt_u8_bool(self: @TContractState, felt: felt252, int8: u8, b: bool);

    fn fn_felt_u8_bool_out_address_felt_u8_bool(
        self: @TContractState, felt: felt252, int8: u8, boolean: bool
    ) -> (ContractAddress, felt252, u8, bool);

    fn fn_felt_out_felt(self: @TContractState, felt: felt252) -> felt252;

    fn fn_out_simple_option(self: @TContractState) -> Option<u8>;

    fn fn_out_nested_option(self: @TContractState) -> Option<Option<u8>>;

    fn fn_simple_array(self: @TContractState, arg: Array<u8>);

    fn fn_out_simple_array(self: @TContractState) -> Array<u8>;

    fn fn_struct(self: @TContractState, arg: TestStruct);

    fn fn_struct_array(self: @TContractState, arg: Array<TestStruct>);

    fn fn_enum(self: @TContractState, arg: TestEnum);

    fn fn_enum_array(self: @TContractState, arg: Array<TestEnum>);

    fn fn_out_enum_array(self: @TContractState, ) -> Array<TestEnum>;
}

#[starknet::contract]
mod example_contract {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use example::TestStruct;
    use example::TestEnum;

    #[storage]
    struct Storage {}

    #[external(v0)]
    impl ExampleContract of super::IExampleContract<ContractState> {
        fn fn_felt(self: @ContractState, felt: felt252) {}

        fn fn_felt_u8_bool(self: @ContractState, felt: felt252, int8: u8, b: bool) {}

        fn fn_felt_u8_bool_out_address_felt_u8_bool(
            self: @ContractState, felt: felt252, int8: u8, boolean: bool
        ) -> (ContractAddress, felt252, u8, bool) {
            let caller = get_caller_address();
            (caller, felt, int8, boolean)
        }

        fn fn_felt_out_felt(self: @ContractState, felt: felt252) -> felt252 {
            felt
        }

        fn fn_out_simple_option(self: @ContractState) -> Option<u8> {
            Option::Some(1)
        }

        fn fn_out_nested_option(self: @ContractState) -> Option<Option<u8>> {
            Option::Some(Option::Some(1))
        }

        fn fn_simple_array(self: @ContractState, arg: Array<u8>) {
        }

        fn fn_out_simple_array(self: @ContractState) -> Array<u8> {
            let mut a = ArrayTrait::<u8>::new();
            a.append(0);
            a.append(1);
            a.append(2);
            ArrayTrait::new()
        }

        fn fn_struct(self: @ContractState, arg: TestStruct) {}

        fn fn_struct_array(self: @ContractState, arg: Array<TestStruct>) {}

        fn fn_enum(self: @ContractState, arg: TestEnum) {}

        fn fn_enum_array(self: @ContractState, arg: Array<TestEnum>) {}

        fn fn_out_enum_array(self: @ContractState, ) -> Array<TestEnum> {
            let mut messages: Array<TestEnum> = ArrayTrait::new();
            messages.append(TestEnum::int128(100_u128));
            messages.append(TestEnum::felt('hello world'));
            messages.append(TestEnum::tuple((10_u32, 30_u32)));
            messages
        }
    }
}
