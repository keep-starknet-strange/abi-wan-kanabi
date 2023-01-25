/**
 * Example testing the use of abi_demo.d.ts,
 * created via extract_abi.sh abi_demo.json ./
 */
import {call} from '../index';
import schema from './abi_demo'

call(schema, 'fun1', []);  // Ok
call(schema, 'fun1', ["ab", "e"]);  // Argument type error

call(schema, 'fun2', [1, 2]);  // Ok
call(schema, 'fun2', [1, "2"]);  // type error: string is not number
