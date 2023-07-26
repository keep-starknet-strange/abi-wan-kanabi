import {
  BigNumberish,
  CallOptions,
  Calldata,
  InvokeFunctionResponse,
  InvokeOptions,
  Uint256,
} from './starknet'

export type CairoFelt = 'core::felt252'
type MBits = 8 | 16 | 32
type BigMBits = 64 | 128
export type CairoInt = `${'core::integer::u'}${MBits}`
export type CairoBigInt = `${'core::integer::u'}${BigMBits}`
export type CairoU256 = 'core::integer::u256'
export type CairoAddress = 'core::starknet::contract_address::ContractAddress'
export type CairoFunction = 'function'
export type CairoVoid = '()'
export type CairoBool = 'core::bool'

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
  | CairoAddress
  | CairoBool
  | CairoVoid

// We have to use string to support nesting
type CairoOptionGeneric<T extends string> = `core::option::Option::<${T}>`
type CairoArrayGeneric<T extends string> = `core::array::Array::<${T}>`
type CairoGeneric<T extends string> =
  | CairoOptionGeneric<T>
  | CairoArrayGeneric<T>

// Note that Option<Option<number>> = T | undefined | undefined which is the same
// as Option<Option<number>, is this what we want for Option ?
export type Option<T> = T | undefined

type AbiParameter = {
  name: string
  type: string
}

type AbiOutput = {
  type: string
}

type AbiStateMutability = 'view' | 'external'

type AbiFunction = {
  type: 'function'
  name: string
  inputs: readonly AbiParameter[]
  outputs: readonly AbiOutput[]
  state_mutability: AbiStateMutability
}

type AbiEvent = {
  type: 'event'
  name: string
  inputs: readonly AbiParameter[]
}

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

export type Abi = readonly (AbiFunction | AbiStruct | AbiEvent | AbiEnum)[]

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

export type ExtractAbiFunctions<TAbi extends Abi> = Extract<
  TAbi[number],
  { type: 'function' }
>

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

// Question: why do we need TAbi extends Abi here, it's not used ?
type PrimitiveTypeLookup<TAbi extends Abi> = {
  [_ in CairoFelt]: BigNumberish
} & {
  [_ in CairoFunction]: number
} & {
  [_ in CairoInt]: number | bigint
} & {
  [_ in CairoU256]: number | bigint | Uint256
} & {
  [_ in CairoBigInt]: number | bigint
} & {
  [_ in CairoAddress]: string
} & {
  [_ in CairoVoid]: void
} & {
  [_ in CairoBool]: boolean
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

export type StringToPrimitiveType<
  TAbi extends Abi,
  T extends string,
> = T extends AbiType
  ? AbiTypeToPrimitiveType<TAbi, T>
  : T extends CairoGeneric<infer _>
  ? GenericTypeToPrimitiveType<TAbi, T>
  : T extends CairoTuple
  ? CairoTupleToPrimitive<TAbi, T>
  : ExtractAbiStruct<TAbi, T> extends never
  ? ExtractAbiEnum<TAbi, T> extends never
    ? unknown
    : ExtractAbiEnum<TAbi, T> extends {
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
      options?: CallOptions,
      ...args: ExtractArgs<TAbi, TAbiFunction>
    ) => Promise<FunctionRet<TAbi, TAbiFunction['name']>>
  : (
      options?: InvokeOptions,
      ...args: ExtractArgs<TAbi, TAbiFunction>
    ) => InvokeFunctionResponse

export type ContractFunctions<TAbi extends Abi> = UnionToIntersection<
  {
    [K in keyof TAbi]: TAbi[K] extends infer TAbiFunction extends AbiFunction
      ? {
          [K2 in TAbiFunction['name']]: FunctionCallWithArgs<
            TAbi,
            TAbiFunction
          > &
            FunctionCallWithCallData<TAbi, TAbiFunction> &
            FunctionCallWithOptions<TAbi, TAbiFunction>
        }
      : never
  }[number]
>
