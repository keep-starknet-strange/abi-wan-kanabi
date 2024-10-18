import { ResolvedConfig } from './config'

export type CairoFelt = 'core::felt252'
type MBits = 8 | 16 | 32
type BigMBits = 64 | 128
export type CairoInt = `${'core::integer::u'}${MBits}`
export type CairoBigInt = `${'core::integer::u'}${BigMBits}`
export type CairoU256 = 'core::integer::u256'
export type CairoU512 = 'core::integer::u512'
export type CairoContractAddress =
  'core::starknet::contract_address::ContractAddress'
export type CairoEthAddress = 'core::starknet::eth_address::EthAddress'
export type CairoClassHash = 'core::starknet::class_hash::ClassHash'
export type CairoFunction = 'function'
export type CairoVoid = '()'
export type CairoBool = 'core::bool'
export type CairoBytes31 = 'core::bytes_31::bytes31'
export type CairoByteArray = 'core::byte_array::ByteArray'
export type CairoSecp256k1Point = 'core::starknet::secp256k1::Secp256k1Point'

/// Implementation of tuples
type MAX_TUPLE_SIZE = 20

// Question: why do we need both R and A here ?
type _BuildTuple<
  R extends unknown = never,
  A extends string = '',
  D extends readonly number[] = [],
> = D['length'] extends MAX_TUPLE_SIZE
  ? `${A})` | R
  : A extends ''
  ? _BuildTuple<R, `(${string}`, [...D, 1]>
  : _BuildTuple<`${A})` | R, `${A}, ${string}`, [...D, 1]>

export type CairoTuple = _BuildTuple

type AbiType =
  | CairoFelt
  | CairoFunction
  | CairoInt
  | CairoBigInt
  | CairoU256
  | CairoU512
  | CairoContractAddress
  | CairoEthAddress
  | CairoClassHash
  | CairoBool
  | CairoVoid
  | CairoBytes31
  | CairoByteArray
  | CairoSecp256k1Point

// We have to use string to support nesting
type CairoOptionGeneric<T extends string> = `core::option::Option::<${T}>`
type CairoArrayGeneric<T extends string> =
  | `core::array::Array::<${T}>`
  | `core::array::Span::<${T}>`
type CairoResultGeneric<
  T extends string,
  E extends string,
> = `core::result::Result::<${T}, ${E}>`
type CairoGeneric<T extends string, E extends string> =
  | CairoOptionGeneric<T>
  | CairoArrayGeneric<T>
  | CairoResultGeneric<T, E>

export type Option<T> = ResolvedConfig<T>['Option']
export type Tuple = ResolvedConfig['Tuple']
export type Result<T, E> = ResolvedConfig<any, T, E>['Result']
export type Enum = ResolvedConfig['Enum']
export type Calldata = ResolvedConfig['Calldata']
export type InvokeOptions = ResolvedConfig['InvokeOptions']
export type CallOptions = ResolvedConfig['CallOptions']
export type InvokeFunctionResponse = ResolvedConfig['InvokeFunctionResponse']
export type Call = ResolvedConfig['Call']

type AbiParameter = {
  name: string
  type: string
}

type AbiOutput = {
  type: string
}

type AbiStateMutability = 'view' | 'external'

type AbiImpl = {
  type: 'impl'
  name: string
  interface_name: string
}

type AbiInterface = {
  type: 'interface'
  name: string
  items: readonly AbiFunction[]
}

type AbiConstructor = {
  type: 'constructor'
  name: 'constructor'
  inputs: readonly AbiParameter[]
}

type AbiFunction = {
  type: 'function'
  name: string
  inputs: readonly AbiParameter[]
  outputs: readonly AbiOutput[]
  state_mutability: AbiStateMutability
}

// TODO: Do we need to handle 'key' and 'data' differently ?
// TODO: 'flat' is found in some ABIs but it's not mentioned in the ABI spec:
// https://github.com/starkware-libs/starknet-specs/blob/master/api/starknet_metadata.json#L507:L509
type AbiEventKind = 'nested' | 'data' | 'key' | 'flat'

export type AbiEventMember = {
  name: string
  type: string
  kind: AbiEventKind
}

type AbiEventStruct = {
  type: 'event'
  name: string
  kind: 'struct'
  members: readonly AbiEventMember[]
}

type AbiEventEnum = {
  type: 'event'
  name: string
  kind: 'enum'
  variants: readonly AbiEventMember[]
}

type AbiEvent = AbiEventStruct | AbiEventEnum

type AbiMember = {
  name: string
  type: string
}

type AbiStruct = {
  type: 'struct'
  name: string
  members: readonly AbiMember[]
}

type AbiEnum = {
  type: 'enum'
  name: string
  variants: readonly AbiParameter[]
}

export type Abi = readonly (
  | AbiImpl
  | AbiInterface
  | AbiConstructor
  | AbiFunction
  | AbiStruct
  | AbiEnum
  | AbiEvent
)[]

/// Implement
type _BuildArgs<
  TAbi extends Abi,
  TAbiParam extends readonly AbiParameter[],
  R extends unknown[],
> = R['length'] extends TAbiParam['length']
  ? R
  : _BuildArgs<
      TAbi,
      TAbiParam,
      [...R, StringToPrimitiveType<TAbi, TAbiParam[R['length']]['type']>]
    >

export type FunctionArgs<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
> = ExtractAbiFunction<TAbi, TFunctionName>['inputs'] extends readonly []
  ? []
  : _BuildArgs<
      TAbi,
      ExtractAbiFunction<TAbi, TFunctionName>['inputs'],
      []
    > extends [infer T]
  ? T
  : _BuildArgs<TAbi, ExtractAbiFunction<TAbi, TFunctionName>['inputs'], []>

export type FunctionRet<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
> = ExtractAbiFunction<TAbi, TFunctionName>['outputs'] extends readonly []
  ? void
  : StringToPrimitiveType<
      TAbi,
      ExtractAbiFunction<TAbi, TFunctionName>['outputs'][0]['type']
    >

export type ExtractAbiImpls<TAbi extends Abi> = Extract<
  TAbi[number],
  { type: 'impl' }
>

export type ExtractAbiInterfaces<TAbi extends Abi> = Extract<
  TAbi[number],
  { type: 'interface' }
>

export type ExtractAbiFunctions<TAbi extends Abi> =
  | Extract<ExtractAbiInterfaces<TAbi>['items'][number], { type: 'function' }>
  | Extract<TAbi[number], { type: 'function' }>

export type ExtractAbiFunctionNames<TAbi extends Abi> =
  ExtractAbiFunctions<TAbi>['name']

export type ExtractAbiFunction<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
> = Extract<ExtractAbiFunctions<TAbi>, { name: TFunctionName }>

export type ExtractAbiStructs<TAbi extends Abi> = Extract<
  TAbi[number],
  { type: 'struct' }
>

export type ExtractAbiStructNames<TAbi extends Abi> =
  ExtractAbiStructs<TAbi>['name']

export type ExtractAbiStruct<
  TAbi extends Abi,
  TStructName extends ExtractAbiStructNames<TAbi>,
> = Extract<ExtractAbiStructs<TAbi>, { name: TStructName }>

export type ExtractAbiEnums<TAbi extends Abi> = Extract<
  TAbi[number],
  { type: 'enum' }
>

export type ExtractAbiEnumNames<TAbi extends Abi> =
  ExtractAbiEnums<TAbi>['name']

export type ExtractAbiEnum<
  TAbi extends Abi,
  TEnumName extends ExtractAbiEnumNames<TAbi>,
> = Extract<ExtractAbiEnums<TAbi>, { name: TEnumName }>

export type ExtractAbiEvents<TAbi extends Abi> = Extract<
  TAbi[number],
  { type: 'event' }
>

export type ExtractAbiEventNames<TAbi extends Abi> =
  ExtractAbiEvents<TAbi>['name']

export type ExtractAbiEvent<
  TAbi extends Abi,
  TEventName extends ExtractAbiEventNames<TAbi>,
> = Extract<ExtractAbiEvents<TAbi>, { name: TEventName }>

// Question: why do we need TAbi extends Abi here, it's not used ?
type PrimitiveTypeLookup<_TAbi extends Abi> = {
  [_ in CairoFelt]: ResolvedConfig['FeltType']
} & {
  [_ in CairoFunction]: number
} & {
  [_ in CairoInt]: ResolvedConfig['IntType']
} & {
  [_ in CairoU256]: ResolvedConfig['U256Type']
} & {
  [_ in CairoU512]: ResolvedConfig['U512Type']
} & {
  [_ in CairoBigInt]: ResolvedConfig['BigIntType']
} & {
  [_ in CairoContractAddress]: ResolvedConfig['AddressType']
} & {
  [_ in CairoEthAddress]: ResolvedConfig['AddressType']
} & {
  [_ in CairoClassHash]: ResolvedConfig['ClassHashType']
} & {
  [_ in CairoVoid]: void
} & {
  [_ in CairoBool]: boolean
} & {
  [_ in CairoBytes31]: ResolvedConfig['Bytes31Type']
} & {
  [_ in CairoByteArray]: ResolvedConfig['ByteArray']
} & {
  [_ in CairoSecp256k1Point]: ResolvedConfig['Secp256k1PointType']
}

export type AbiTypeToPrimitiveType<
  TAbi extends Abi,
  TAbiType extends AbiType,
> = PrimitiveTypeLookup<TAbi>[TAbiType]

export type GenericTypeToPrimitiveType<
  TAbi extends Abi,
  G extends string,
> = G extends CairoOptionGeneric<infer T>
  ? T extends AbiType
    ? Option<AbiTypeToPrimitiveType<TAbi, T>>
    : Option<StringToPrimitiveType<TAbi, T>>
  : G extends CairoArrayGeneric<infer T>
  ? T extends AbiType
    ? AbiTypeToPrimitiveType<TAbi, T>[]
    : StringToPrimitiveType<TAbi, T>[]
  : G extends CairoResultGeneric<infer T, infer E>
  ? T extends AbiType
    ? E extends AbiType
      ? Result<AbiTypeToPrimitiveType<TAbi, T>, AbiTypeToPrimitiveType<TAbi, E>>
      : Result<AbiTypeToPrimitiveType<TAbi, T>, StringToPrimitiveType<TAbi, E>>
    : Result<StringToPrimitiveType<TAbi, T>, StringToPrimitiveType<TAbi, E>>
  : unknown

export type CairoTupleToPrimitive<
  TAbi extends Abi,
  T extends string,
> = T extends `(${infer first}, ${infer remaining})`
  ? [
      StringToPrimitiveType<TAbi, first>,
      ...CairoTupleToPrimitive<TAbi, `(${remaining})`>,
    ]
  : T extends `(${infer first})`
  ? [StringToPrimitiveType<TAbi, first>]
  : [unknown]

// Convert an object {k1: v1, k2: v2, ...} to a union type of objects with each
// a single element {k1: v1} | {k2: v2} | ...
type ObjectToUnion<T extends Record<string, any>> = {
  [K in keyof T]: { [Key in K]: T[K] }
}[keyof T]

export type EventToPrimitiveType<
  TAbi extends Abi,
  TEventName extends ExtractAbiEventNames<TAbi>,
> = ExtractAbiEvent<TAbi, TEventName> extends {
  type: 'event'
  kind: 'struct'
  members: infer TMembers extends readonly AbiEventMember[]
}
  ? {
      [Member in TMembers[number] as Member['name']]: StringToPrimitiveType<
        TAbi,
        Member['type']
      >
    }
  : ExtractAbiEvent<TAbi, TEventName> extends {
      type: 'event'
      kind: 'enum'
      variants: infer TVariants extends readonly AbiEventMember[]
    }
  ? ObjectToUnion<{
      [Variant in TVariants[number] as Variant['name']]: StringToPrimitiveType<
        TAbi,
        Variant['type']
      >
    }>
  : never

export type StringToPrimitiveTypeS<
  TAbi extends Abi,
  T extends string,
> = ExtractAbiEnum<TAbi, T>

export type StringToPrimitiveType<
  TAbi extends Abi,
  T extends string,
> = T extends AbiType
  ? AbiTypeToPrimitiveType<TAbi, T>
  : T extends CairoGeneric<infer _, infer _>
  ? GenericTypeToPrimitiveType<TAbi, T>
  : T extends CairoTuple
  ? Tuple extends never
    ? CairoTupleToPrimitive<TAbi, T>
    : Tuple
  : ExtractAbiStruct<TAbi, T> extends never
  ? ExtractAbiEnum<TAbi, T> extends never
    ? unknown
    : Enum extends never
    ? ExtractAbiEnum<TAbi, T> extends {
        type: 'enum'
        variants: infer TVariants extends readonly AbiParameter[]
      }
      ? ObjectToUnion<{
          [Variant in
            TVariants[number] as Variant['name']]: StringToPrimitiveType<
            TAbi,
            Variant['type']
          >
        }>
      : // We should never have a type T where ExtractAbiEnum<TAbi, T>
        // return something different than an enum
        never
    : Enum
  : ExtractAbiStruct<TAbi, T> extends {
      type: 'struct'
      members: infer TMembers extends readonly AbiMember[]
    }
  ? {
      [Member in TMembers[number] as Member['name']]: StringToPrimitiveType<
        TAbi,
        Member['type']
      >
    }
  : // We should never have a type T where ExtractAbiStruct<TAbi, T>
    // return something different than a struct
    never

type UnionToIntersection<Union> = (
  Union extends unknown
    ? (arg: Union) => unknown
    : never
) extends (arg: infer R) => unknown
  ? R
  : never

export type FunctionCallWithCallData<
  TAbi extends Abi,
  TAbiFunction extends AbiFunction,
> = (
  calldata: Calldata,
) => TAbiFunction['state_mutability'] extends 'view'
  ? Promise<FunctionRet<TAbi, TAbiFunction['name']>>
  : InvokeFunctionResponse

export type ExtractArgs<
  TAbi extends Abi,
  TAbiFunction extends AbiFunction,
> = TAbiFunction['inputs'] extends infer TInput extends readonly AbiParameter[]
  ? {
      [K3 in
        keyof TInput]: TInput[K3] extends infer TInputParam extends AbiParameter
        ? StringToPrimitiveType<TAbi, TInputParam['type']>
        : never
    }
  : never

export type FunctionCallWithArgs<
  TAbi extends Abi,
  TAbiFunction extends AbiFunction,
> = (
  ...args: ExtractArgs<TAbi, TAbiFunction>
) => TAbiFunction['state_mutability'] extends 'view'
  ? Promise<FunctionRet<TAbi, TAbiFunction['name']>>
  : InvokeFunctionResponse

export type FunctionCallWithOptions<
  TAbi extends Abi,
  TAbiFunction extends AbiFunction,
> = TAbiFunction['state_mutability'] extends 'view'
  ? (
      ...args: [...ExtractArgs<TAbi, TAbiFunction>, CallOptions]
    ) => Promise<FunctionRet<TAbi, TAbiFunction['name']>>
  : (
      ...args: [...ExtractArgs<TAbi, TAbiFunction>, InvokeOptions]
    ) => InvokeFunctionResponse

export type FunctionCall<
  TAbi extends Abi,
  TAbiFunction extends AbiFunction,
> = FunctionCallWithArgs<TAbi, TAbiFunction> &
  FunctionCallWithCallData<TAbi, TAbiFunction> &
  FunctionCallWithOptions<TAbi, TAbiFunction>

export type ContractFunctions<TAbi extends Abi> = {
  [K in ExtractAbiFunctionNames<TAbi>]: FunctionCall<
    TAbi,
    ExtractAbiFunction<TAbi, K>
  >
}

export type FunctionPopulateTransaction<
  TAbi extends Abi,
  TAbiFunction extends AbiFunction,
> = (...args: [...ExtractArgs<TAbi, TAbiFunction>]) => Call

export type ContractFunctionsPopulateTransaction<TAbi extends Abi> = {
  [K in ExtractAbiFunctionNames<TAbi>]: FunctionPopulateTransaction<
    TAbi,
    ExtractAbiFunction<TAbi, K>
  >
}
