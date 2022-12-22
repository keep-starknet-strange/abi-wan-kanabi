type Felt = 'felt';
type CairoFunction = 'function';

type MAX_TUPLE_SIZE = 3;

type _BuildTuple<R extends unknown = never, A extends string = '', D extends
                     readonly number[] = []> =
    D['length'] extends MAX_TUPLE_SIZE ? `${A})`|R : A extends '' ?
    _BuildTuple<R, `(${string}`, [...D, 1]>:
    _BuildTuple<`${A})`|R, `${A}, ${string}`, [...D, 1]>;

type CairoTuple = _BuildTuple;

type AbiType = Felt|CairoFunction|CairoTuple;

type ResolvedAbiType = AbiType;

type AbiParameter = {
  type: string,
  name: string,
}

type AbiStateMutability = 'view'|'external';

type AbiFunction = {
  name: string,
  inputs: readonly AbiParameter[],
  outputs: readonly AbiParameter[]
}&(|{type: 'function', stateMutability?: AbiStateMutability}|
   {type: 'constructor'});

type AbiMember = {
  name: string,
  offset: number,
  type: string
};

type AbiStruct = {
  type: 'struct',
  name: string,
  size: number,
  members: readonly AbiMember[]
};

export type Abi = readonly(AbiFunction|AbiStruct)[];

/// Implement
type _BuildArgs<TAbi extends Abi, TAbiParam extends readonly AbiParameter[],
                                                    R extends unknown[]> =
    R['length'] extends TAbiParam['length'] ? R : _BuildArgs<TAbi, TAbiParam, [
  ...R, AbiParameterToPrimitiveType<TAbi, TAbiParam[R['length']]>
]>;

export type FunctionArgs<
    TAbi extends Abi, TFunctionName extends ExtractAbiFunctionName<TAbi>> =
    ExtractAbiFunction<TAbi, TFunctionName>['inputs'] extends readonly[] ?
    [] :
    _BuildArgs<
        TAbi, ExtractAbiFunction<TAbi, TFunctionName>['inputs'],
        []> extends [infer T] ?
    T :
    _BuildArgs<TAbi, ExtractAbiFunction<TAbi, TFunctionName>['inputs'], []>;

export type FunctionRet<
    TAbi extends Abi, TFunctionName extends ExtractAbiFunctionName<TAbi>> =
    ExtractAbiFunction<TAbi, TFunctionName>['outputs'] extends readonly[] ?
    void :
    _BuildArgs<
        TAbi, ExtractAbiFunction<TAbi, TFunctionName>['outputs'],
        []> extends [infer T] ?
    T :
    _BuildArgs<TAbi, ExtractAbiFunction<TAbi, TFunctionName>['outputs'], []>;

export type ExtractAbiFunctions<TAbi extends Abi> =
    Extract<TAbi[number], {type: 'function'}>;

export type ExtractAbiFunctionName<TAbi extends Abi> =
    ExtractAbiFunctions<TAbi>['name'];

export type ExtractAbiFunction<
    TAbi extends Abi, TFunctionName extends ExtractAbiFunctionName<TAbi>> =
    Extract<ExtractAbiFunctions<TAbi>, {name: TFunctionName}>;

export type ExtractAbiStructs<TAbi extends Abi> =
    Extract<TAbi[number], {type: 'struct'}>;

export type ExtractAbiStructNames<TAbi extends Abi> =
    ExtractAbiStructs<TAbi>['name'];

export type ExtractAbiStruct<
    TAbi extends Abi, TStructName extends ExtractAbiStructNames<TAbi>> =
    Extract<ExtractAbiStructs<TAbi>, {name: TStructName}>;

type PrimitiveTypeLookup<TAbi extends Abi> = {
  [_ in Felt]: number
}&{[_ in CairoFunction]: number}&{
  [_ in CairoTuple]: [number, number]
}
export type AbiTypeToPrimitiveType<TAbi extends Abi, TAbiType extends AbiType> =
    PrimitiveTypeLookup<TAbi>[TAbiType];

export type AbiParameterToPrimitiveType<
    TAbi extends Abi, TAbiParameter extends AbiParameter> =
    TAbiParameter['type'] extends AbiType ?
    AbiTypeToPrimitiveType<TAbi, TAbiParameter['type']>:
    ExtractAbiStruct<TAbi, TAbiParameter['type']> extends {
  type: 'struct', members: infer TMembers extends readonly AbiMember[]
} ?
    {
      [Member in TMembers[number] as Member['name']]:
          AbiParameterToPrimitiveType<TAbi, Member>
    } :
    unknown;