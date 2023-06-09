#[contract]
mod HelloStarknet {
    use starknet::ContractAddress;
    use starknet::get_caller_address;

    use core::traits::TryInto;
    use traits::Into;
    use option::OptionTrait;
    use array::ArrayTrait;

    #[derive(Copy, Drop, Serde)]
    enum TestEnum {
        int128: u128,
        felt: felt252,
        tuple: (u32, u32),
    }

    #[derive(Drop, Serde)]
    struct TestStruct {
        int128: u128,
        felt: felt252,
        tuple: (u32, u32)
    }

    #[event]
    fn TestEvent(from: ContractAddress, value: felt252) {}

    #[external]
    fn fn_felt(felt: felt252) {}

    #[external]
    fn fn_felt_u8_bool(felt: felt252, int8: u8, b: bool) {}

    #[view]
    fn fn_felt_u8_bool_out_address_felt_u8_bool(
        felt: felt252, int8: u8, boolean: bool
    ) -> (ContractAddress, felt252, u8, bool) {
        let caller = get_caller_address();
        (caller, felt, int8, boolean)
    }

    #[view]
    fn fn_felt_out_felt(felt: felt252) -> felt252 {
        felt
    }

    #[view]
    fn fn_out_simple_option() -> Option<u8> {
        Option::Some(1)
    }

    #[view]
    fn fn_out_nested_option() -> Option<Option<u8>> {
        Option::Some(Option::Some(1))
    }

    #[view]
    fn fn_simple_array(arg: Array<u8>) {}

    #[view]
    fn fn_out_simple_array() -> Array<u8> {
        let mut a = ArrayTrait::<u8>::new();
        a.append(0);
        a.append(1);
        a.append(2);
        ArrayTrait::new()
    }

    #[view]
    fn fn_struct_array(arg: Array<TestStruct>) {}

    #[view]
    fn fn_struct(arg: TestStruct) {}

    #[view]
    fn fn_enum(arg: TestEnum) {}

    #[view]
    fn fn_enum_array(arg: Array<TestEnum>) {}

    #[view]
    fn fn_out_enum_array() -> Array<TestEnum> {
        let mut messages: Array<TestEnum> = ArrayTrait::new();
        messages.append(TestEnum::int128(100_u128));
        messages.append(TestEnum::felt('hello world'));
        messages.append(TestEnum::tuple((10_u32, 30_u32)));
        messages
    }
}
