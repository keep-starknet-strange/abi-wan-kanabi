export type CairoFelt = 'core::felt';
type MBits = 8|16|32
type BigMBits = 64|128|256
export type CairoInt = `${'core::integer::u'}${MBits}`
export type CairoBigInt = `${'core::integer::u'}${BigMBits}`
export type CairoAddress = 'core::starknet::ContractAddress'
export type CairoFunction = 'function';
export type CairoVoid = '()';


/// Implementation of tuples
type MAX_TUPLE_SIZE = 3;

// Question: why do we need both R and A here ?
type _BuildTuple<
  R extends unknown = never,
  A extends string = '',
  D extends readonly number[] = []
> =
  D['length'] extends MAX_TUPLE_SIZE
    ? `${A})`|R
    : A extends ''
      ? _BuildTuple<R, `(${string}`, [...D, 1]>
      : _BuildTuple<`${A})`|R, `${A}, ${string}`, [...D, 1]>;

export type CairoTuple = _BuildTuple;

type AbiType =
    CairoFelt|CairoFunction|CairoTuple|CairoInt|CairoBigInt|CairoAddress;

// We have to use string to support nesting
type CairoOptionGeneric<T extends string> = `core::option::Option<${T}>`;
type CairoArrayGeneric<T extends string> = `core::array::Array::<${T}>`;
type CairoGeneric<T extends string> = CairoOptionGeneric<T> | CairoArrayGeneric<T>

// Note that Option<Option<number>> = T | undefined | undefined which is the same
// as Option<Option<number>, is this what we want for Option ?
export type Option<T> = T | undefined

type ResolvedAbiType = AbiType;

type AbiParameter = {
  ty: string,
  name: string,
}

type AbiStateMutability = 'view'|'external';

type AbiFunction = {
  name: string,
  inputs: readonly AbiParameter[],
  output_ty: AbiType,
  type: 'function',
  state_mutability: AbiStateMutability,
};

type AbiEvent = {
  name: string,
  inputs: readonly AbiParameter[],
  type: 'event',
};

type AbiMember = {
  name: string,
  offset: number,
  ty: string
};

type AbiStruct = {
  type: 'struct',
  name: string,
  size: number,
  members: readonly AbiMember[]
};

export type Abi = readonly(AbiFunction|AbiStruct|AbiEvent)[];


/// Implement
type _BuildArgs<
  TAbi extends Abi,
  TAbiParam extends readonly AbiParameter[],
  R extends unknown[]
> =
  R['length'] extends TAbiParam['length']
    ? R
    : _BuildArgs<
        TAbi,
        TAbiParam,
        [...R, AbiParameterToPrimitiveType<TAbi, TAbiParam[R['length']]>]
      >;

type _BuildOutput<
  TAbi extends Abi,
  TAbiType extends AbiType
> =
  AbiTypeToPrimitiveType<TAbi, TAbiType>;

export type FunctionArgs<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>
> =
  ExtractAbiFunction<TAbi, TFunctionName>['inputs'] extends readonly[]
    ? []
    : _BuildArgs<
        TAbi,
        ExtractAbiFunction<TAbi, TFunctionName>['inputs'],
        []
      > extends [infer T]
        ? T
        : _BuildArgs<TAbi, ExtractAbiFunction<TAbi, TFunctionName>['inputs'], []>;

export type FunctionRet<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>
> =
  _BuildOutput<TAbi, ExtractAbiFunction<TAbi, TFunctionName>['output_ty']>;

export type ExtractAbiFunctions<TAbi extends Abi> =
    Extract<TAbi[number], {type: 'function'}>;

export type ExtractAbiFunctionNames<TAbi extends Abi> =
    ExtractAbiFunctions<TAbi>['name'];

export type ExtractAbiFunction<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>
> =
  Extract<ExtractAbiFunctions<TAbi>, {name: TFunctionName}>;

export type ExtractAbiStructs<TAbi extends Abi> =
    Extract<TAbi[number], {type: 'struct'}>;

export type ExtractAbiStructNames<TAbi extends Abi> =
    ExtractAbiStructs<TAbi>['name'];

export type ExtractAbiStruct<
  TAbi extends Abi,
  TStructName extends ExtractAbiStructNames<TAbi>
> =
  Extract<ExtractAbiStructs<TAbi>, {name: TStructName}>;

// Question: why do we need TAbi extends Abi here, it's not used ?
type PrimitiveTypeLookup<TAbi extends Abi> = {
  [_ in CairoFelt]: bigint
} & {
  [_ in CairoFunction]: number
} & {
  [_ in CairoTuple]: any  // TODO: implement tuples
} & {
  [_ in CairoInt]: number | bigint // Question: Why not just number ?
} & {
  [_ in CairoBigInt]: bigint
} & {
  [_ in CairoAddress]: bigint
} & {
  [_ in CairoVoid]: void
}

export type AbiTypeToPrimitiveType<TAbi extends Abi, TAbiType extends AbiType> =
    PrimitiveTypeLookup<TAbi>[TAbiType];


export type GenericTypeToPrimitiveType<TAbi extends Abi, G extends string> =
  G extends CairoOptionGeneric<infer T>
    ? T extends AbiType
      ? Option<AbiTypeToPrimitiveType<TAbi, T>>
      : Option<GenericTypeToPrimitiveType<TAbi, T>>
    : G extends CairoArrayGeneric<infer T>
      ? T extends AbiType
        ? AbiTypeToPrimitiveType<TAbi, T>[]
        : GenericTypeToPrimitiveType<TAbi, T>[]
    : unknown;


// Question: AbiParameterToPrimitiveType<TAbi, {ty: "MissingStruct", name: 'x'}
//           doesn't raise an error although there is no struct named
//           'MissingStruct' defined in the ABI, is this the expected behavior?
export type AbiParameterToPrimitiveType<
  TAbi extends Abi,
  TAbiParameter extends AbiParameter
> =
  TAbiParameter['ty'] extends AbiType
    ? AbiTypeToPrimitiveType<TAbi, TAbiParameter['ty']>
    : TAbiParameter['ty'] extends CairoGeneric<infer _>
      ? GenericTypeToPrimitiveType<TAbi, TAbiParameter['ty']>
      : ExtractAbiStruct<TAbi, TAbiParameter['ty']> extends {
        type: 'struct', members: infer TMembers extends readonly AbiMember[]
      }
        ? {
          [Member in TMembers[number] as Member['name']]:
            AbiParameterToPrimitiveType<TAbi, Member>
        }
        : unknown;
