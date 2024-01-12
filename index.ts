import {
  Abi,
  ContractFunctions,
  ContractFunctionsPopulateTransaction,
  ExtractAbiFunctionNames,
  FunctionArgs,
  FunctionRet,
} from './kanabi'
import { Call } from './starknet'

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

type TypedContractActions<TAbi extends Abi> = {
  call<TFunctionName extends ExtractAbiFunctionNames<TAbi>>(
    method: TFunctionName,
    args?: FunctionArgs<TAbi, TFunctionName>,
  ): Promise<FunctionRet<TAbi, TFunctionName>>
  populate<TFunctionName extends ExtractAbiFunctionNames<TAbi>>(
    method: TFunctionName,
    args?: FunctionArgs<TAbi, TFunctionName>,
  ): Call
  populateTransaction: ContractFunctionsPopulateTransaction<TAbi>
}

export type TypedContract<TAbi extends Abi> = TypedContractActions<TAbi> &
  ContractFunctions<TAbi>
