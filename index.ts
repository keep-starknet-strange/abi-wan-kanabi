import {Abi, ExtractAbiFunctionName, FunctionArgs, FunctionRet} from './kanabi';

export function
    call<TAbi extends Abi, TFunctionName extends ExtractAbiFunctionName<TAbi>>(
        abi: TAbi, f: TFunctionName, args: FunctionArgs<TAbi, TFunctionName>):
        FunctionRet<TAbi, TFunctionName>{throw new Error('todo')};