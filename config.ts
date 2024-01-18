export type Ok<T> = { Ok: T }
export type Err<E> = { Err: E }
export type Result<T, E> = Ok<T> | Err<E>
// Note that Option<Option<number>> = T | undefined | undefined which is the same
// as Option<number>, is this what we want for Option ?
export type Option<T> = T | undefined
export type U256 = {
  low: bigint
  high: bigint
}
export type Calldata = string[] & { readonly __compiled__?: boolean }
export type Call = {
  contractAddress: string
  entrypoint: string
  calldata?: Calldata
}

export type Config<OptionT = any, OkT = any, ErrT = any> = {}

export type ResolvedConfig<OptionT = any, OkT = any, ErrT = any> = {
  /**
   * TypeScript type to use for `ContractAddress` and `EthAddress` values
   * @default `0x${string}`
   */
  AddressType: Config extends { AddressType: infer type }
    ? type
    : DefaultConfig['AddressType']
  /**
   * TypeScript type to use for `ClassHash` values
   * @default `0x${string}`
   */
  ClassHashType: Config extends { ClassHashType: infer type }
    ? type
    : DefaultConfig['ClassHashType']
  /**
   * TypeScript type to use for `felt` values
   * @default `0x${string}`
   */
  FeltType: Config extends { FeltType: infer type }
    ? type
    : DefaultConfig['FeltType']
  /**
   * TypeScript type to use for `u64` and `u128` values
   * @default bigint
   */
  BigIntType: Config extends { BigIntType: infer type }
    ? type
    : DefaultConfig['BigIntType']
  /**
   * TypeScript type to use for `u265` values
   * @default bigint
   */
  U256Type: Config extends { U256Type: infer type }
    ? type
    : DefaultConfig['U256Type']
  /**
   * TypeScript type to use for `u8`, `u16` and `u32` values
   * @default number
   */
  IntType: Config extends { IntType: infer type }
    ? type
    : DefaultConfig['IntType']
  /**
   * TypeScript type to use for `Option::<T>` values
   * @default T | undefined
   */
  Option: Config<OptionT> extends { Option: infer type }
    ? type
    : DefaultConfig<OptionT>['Option']
  /**
   * TypeScript type to use for tuples `(T1, T2, ...)` values
   * @default infer the types of the tuple element and return a TS tuple
   */
  Tuple: Config extends { Tuple: infer type } ? type : DefaultConfig['Tuple']
  /**
   * TypeScript type to use for tuples `Result<T, E>` values
   * @default Ok<T> | Err<E>
   */
  Result: Config<OptionT, OkT, ErrT> extends { Result: infer type }
    ? type
    : DefaultConfig<OptionT, OkT, ErrT>['Result']
  /**
   * TypeScript type to use for enums
   * @default infer the types of the enum and return a union of objects
   */
  Enum: Config extends { Enum: infer type }
    ? type
    : DefaultConfig<OptionT>['Enum']
  /**
   * TypeScript type to use for Calldata used in function calls
   * @default decimal-string array
   */
  Calldata: Config extends { Calldata: infer type }
    ? type
    : DefaultConfig<OptionT>['Calldata']

  /**
   * TypeScript type to use for populate return values
   * @default {
      contractAddress: string
      entrypoint: string
      calldata?: Calldata
    }
   */
  Call: Config extends { Call: infer type }
    ? type
    : DefaultConfig<OptionT>['Call']

  /**
   * TypeScript type to use for CallOptions used in function calls
   * @default unknown
   */
  CallOptions: Config extends { CallOptions: infer type }
    ? type
    : DefaultConfig<OptionT>['CallOptions']

  /**
   * TypeScript type to use for InvokeOptions used in function calls
   * @default unknown
   */
  InvokeOptions: Config extends { InvokeOptions: infer type }
    ? type
    : DefaultConfig<OptionT>['InvokeOptions']

  /**
   * TypeScript type to use for invoke function return values
   * @default unknown
   */
  InvokeFunctionResponse: Config extends { InvokeFunctionResponse: infer type }
    ? type
    : DefaultConfig<OptionT>['InvokeFunctionResponse']
}

export type DefaultConfig<OptionT = any, OkT = any, ErrT = any> = {
  AddressType: string
  ClassHashType: string
  FeltType: number | bigint | string
  BigIntType: number | bigint
  U256Type: number | bigint | U256
  IntType: number | bigint
  Option: Option<OptionT>
  /** By default, abiwan infer the types of the tuple element and return a TS tuple */
  Tuple: never
  Result: Result<OkT, ErrT>
  /** By default, abiwan infer the types of the enum and return a union of objects */
  Enum: never

  Calldata: Calldata
  Call: Call
  CallOptions: unknown
  InvokeOptions: unknown
  InvokeFunctionResponse: unknown
}
