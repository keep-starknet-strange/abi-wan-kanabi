type Felt = 'core::felt';
type MBits = 8|16|32
type BigMBits = 64|128|256
type cairoInt = `${'core::integer::u'}${MBits}`
type CairoBigInt = `${'core::integer::u'}${BigMBits}`
type CairoAddress = 'core::starknet::ContractAddress'
type Option = 'core::option::Option<T>'
type CairoFunction = 'function';
type CairoVoid = '()';


/// Implementation of tuples
type MAX_TUPLE_SIZE = 3;

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

type CairoTuple = _BuildTuple;

type AbiType =
    Felt|CairoFunction|CairoTuple|cairoInt|CairoBigInt|CairoAddress|Option;

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
  TFunctionName extends ExtractAbiFunctionName<TAbi>
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
  TFunctionName extends ExtractAbiFunctionName<TAbi>
> =
  _BuildOutput<TAbi, ExtractAbiFunction<TAbi, TFunctionName>['output_ty']>;

export type ExtractAbiFunctions<TAbi extends Abi> =
    Extract<TAbi[number], {type: 'function'}>;

export type ExtractAbiFunctionName<TAbi extends Abi> =
    ExtractAbiFunctions<TAbi>['name'];

export type ExtractAbiFunction<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionName<TAbi>
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

type PrimitiveTypeLookup<TAbi extends Abi> = {
  [_ in Felt]: bigint
} & {
  [_ in CairoFunction]: number
} & {
  [_ in CairoTuple]: [number, number]  // TODO: implement tuples
} & {
  [_ in cairoInt]: number | bigint
} & {
  [_ in CairoBigInt]: bigint
} & {
  [_ in CairoAddress]: bigint
} & {
  [_ in Option]: any  // TODO: implement options with generics
} & {
  [_ in CairoVoid]: void
}

export type AbiTypeToPrimitiveType<TAbi extends Abi, TAbiType extends AbiType> =
    PrimitiveTypeLookup<TAbi>[TAbiType];

export type AbiParameterToPrimitiveType<
  TAbi extends Abi,
  TAbiParameter extends AbiParameter
> =
  TAbiParameter['ty'] extends AbiType
    ? AbiTypeToPrimitiveType<TAbi, TAbiParameter['ty']>
    : ExtractAbiStruct<TAbi, TAbiParameter['ty']> extends {
        type: 'struct', members: infer TMembers extends readonly AbiMember[]
      }
      ? {
          [Member in TMembers[number] as Member['name']]:
            AbiParameterToPrimitiveType<TAbi, Member>
        }
      : unknown;