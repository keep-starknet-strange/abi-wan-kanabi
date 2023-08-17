import {
  Abi,
  ContractFunctions,
  ExtractAbiFunctionNames,
  FunctionArgs,
  FunctionRet,
} from './kanabi'

export { type Abi } from './kanabi'

export function call<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
>(
  abi: TAbi,
  f: TFunctionName,
  args: FunctionArgs<TAbi, TFunctionName>,
): FunctionRet<TAbi, TFunctionName> {
  throw new Error('todo')
}

type TypedCall<TAbi extends Abi> = {
  call<TFunctionName extends ExtractAbiFunctionNames<TAbi>>(
    method: TFunctionName,
    args?: FunctionArgs<TAbi, TFunctionName>,
  ): Promise<FunctionRet<TAbi, TFunctionName>>
}

export type TypedContract<TAbi extends Abi> = TypedCall<TAbi> &
  ContractFunctions<TAbi>
