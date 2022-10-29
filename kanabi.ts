type Felt = 'felt'
type CairoFunction = 'function'

type MAX_TUPLE_SIZE = 3

type _BuildTuple<
 R extends unknown = never,
 A extends string = '',
 D extends readonly number[] = []
> = D['length'] extends MAX_TUPLE_SIZE
 ? `${A})` | R
 : A extends ''
 ? _BuildTuple<R, `(${string}`, [...D, 1]>
 : _BuildTuple<`${A})` | R, `${A}, ${string}`, [...D, 1]>

type CairoTuple = _BuildTuple

type _BuildArgs<TAbi extends Abi, TAbiParam extends readonly AbiParameter[], R extends unknown[]> = 
 R['length'] extends TAbiParam['length'] ? R : _BuildArgs<TAbi, TAbiParam, [...R, AbiParameterToPrimitiveType<TAbi, TAbiParam[R['length']]>]>

export type FunctionArgs<TAbi extends Abi, TFunctionName extends ExtractAbiFunctionName<TAbi>> =
 _BuildArgs<TAbi, ExtractAbiFunction<TAbi, TFunctionName>['inputs'], []>

export type FunctionRet<TAbi extends Abi, TFunctionName extends ExtractAbiFunctionName<TAbi>> = 
 _BuildArgs<TAbi, ExtractAbiFunction<TAbi, TFunctionName>['outputs'], []>

type Func = 'balanceOf'
type XXX = FunctionArgs<typeof ABI, Func>
type YYY = FunctionRet<typeof ABI, Func>

type AbiType = Felt | CairoFunction | CairoTuple

type ResolvedAbiType = AbiType

type AbiParameter = {
 type: string
 name: string
}

type AbiStateMutability = 'view' | 'external'

type AbiFunction = {
 name: string
 inputs: readonly AbiParameter[]
 outputs: readonly AbiParameter[]
} & (
 | {
     type: 'function'
     stateMutability?: AbiStateMutability
   }
 | {
     type: 'constructor'
   }
)

type AbiMember = {
 name: string
 offset: number
 type: string
}

type AbiStruct = {
 type: 'struct'
 name: string
 size: number
 members: readonly AbiMember[]
}

export type Abi = readonly (AbiFunction | AbiStruct)[]

/// Demo
type T1 = Extract<string | 1 | (() => void | (()=> string)), number>;

export type ExtractAbiFunctions<TAbi extends Abi> = Extract<TAbi[number], { type: 'function' }>

export type ExtractAbiFunctionName<TAbi extends Abi> = ExtractAbiFunctions<TAbi>['name']

export type ExtractAbiFunction<
 TAbi extends Abi,
 TFunctionName extends ExtractAbiFunctionName<TAbi>
> = Extract<ExtractAbiFunctions<TAbi>, { name: TFunctionName }>

export type ExtractAbiStructs<TAbi extends Abi> = Extract<TAbi[number], { type: 'struct' }>

export type ExtractAbiStructNames<TAbi extends Abi> = ExtractAbiStructs<TAbi>['name']

export type ExtractAbiStruct<
 TAbi extends Abi,
 TStructName extends ExtractAbiStructNames<TAbi>
> = Extract<ExtractAbiStructs<TAbi>, { name: TStructName }>

type PrimitiveTypeLookup<TAbi extends Abi> = {
 [_ in Felt]: number
} & {
 [_ in CairoFunction]: number
} & {
 [_ in CairoTuple]: [number, number]
}
export type AbiTypeToPrimitiveType<TAbi extends Abi, TAbiType extends AbiType> = PrimitiveTypeLookup<TAbi>[TAbiType]

export type AbiParameterToPrimitiveType<
 TAbi extends Abi,
 TAbiParameter extends AbiParameter
> =
 TAbiParameter['type'] extends AbiType
   ? AbiTypeToPrimitiveType<TAbi, TAbiParameter['type']>
   : ExtractAbiStruct<TAbi, TAbiParameter['type']> extends {
       type: 'struct',
       members: infer TMembers extends readonly AbiMember[]
     }
   ?
     {
       [Member in TMembers[number] as Member['name']]: AbiParameterToPrimitiveType<TAbi, Member>
     }
   : unknown


const ABI = [
     {
       "members": [
           {
               "name": "low",
               "offset": 0,
               "type": "felt"
           },
           {
               "name": "high",
               "offset": 1,
               "type": "felt"
           }
       ],
       "name": "Uint256",
       "size": 2,
       "type": "struct"
   },
     {
       "inputs": [
           {
               "name": "par1",
               "type": "felt"
           },
           {
               "name": "symbol",
               "type": "felt"
           },
           {
               "name": "decimals",
               "type": "felt"
           },
           {
               "name": "initial_supply",
               "type": "Uint256"
           },
           {
               "name": "recipient",
               "type": "felt"
           }
       ],
       "name": "constructor",
       "outputs": [],
       "type": "constructor"
   },
     {
       "inputs": [],
       "name": "fun1",
       "outputs": [
           {
               "name": "par1",
               "type": "felt"
           }
       ],
       "stateMutability": "view",
       "type": "function"
   },
   {
       "inputs": [{"name": "x", "type": "felt"}, {"name": "y", "type": "felt"}],
       "name": "fun2",
       "outputs": [
           {
               "name": "par1",
               "type": "felt"
           }
       ],
       "stateMutability": "view",
       "type": "function"
   },
   {
     "inputs": [
         {
             "name": "account",
             "type": "felt"
         }
     ],
     "name": "balanceOf",
     "outputs": [
         {
             "name": "balance",
             "type": "Uint256"
         }
     ],
     "stateMutability": "view",
     "type": "function"
   },
] as const

type T2 = ExtractAbiFunctions<typeof ABI>
type T3 = ExtractAbiFunctionName<typeof  ABI>
type T4 = ExtractAbiFunction<typeof ABI, 'balanceOf'>

type TPar = T4['inputs'][0]
type TRet = T4['outputs'][0]
type TFunc = (...x: [AbiParameterToPrimitiveType<typeof ABI, TPar>]) => AbiParameterToPrimitiveType<typeof ABI, TRet>
const xxx: TFunc = () => { return {low: 0, high: 0}}



type T5 = ExtractAbiStructs<typeof ABI>
type T6 = ExtractAbiStructNames<typeof ABI>
type T7 = ExtractAbiStruct<typeof ABI,T6>

type T8 = AbiTypeToPrimitiveType<typeof ABI, Felt>
type T9 = AbiParameterToPrimitiveType<typeof ABI, { name: 'balance'; type: 'Uint256' }>

let a: T2;

/// function defitnion Demo
type testOutput = {
    "name": "par1",
    "type": "felt"
}

type testInput = {
 "name": "account",
 "type": "felt"
}

type params = testInput['name']

type AbiFns = {
 demo: (name: string) => string,
 fn: (a: string) => void
}
