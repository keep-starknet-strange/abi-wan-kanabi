// Types copied from starknet.js for integration
// This file should be deleted
export type BigNumberish = string | number | bigint

/**
 * Represents an integer in the range [0, 2^256)
 */
export interface Uint256 {
  // The low 128 bits of the value
  low: BigNumberish
  // The high 128 bits of the value
  high: BigNumberish
}

export interface InvokeFunctionResponse {
  transaction_hash: string
}

/**
 * Compiled calldata ready to be sent
 * decimal-string array
 */
export type Calldata = string[] & { readonly __compiled__?: boolean }

export type WeierstrassSignatureType = any
export type ArraySignatureType = string[]
export type Signature = ArraySignatureType | WeierstrassSignatureType

export enum BlockTag {
  pending = 'pending',
  latest = 'latest',
}

export type BlockNumber = BlockTag | null | number

/**
 * hex string and BN are detected as block hashes
 * decimal string and number are detected as block numbers
 * null appends nothing to the request url
 */
export type BlockIdentifier = BlockNumber | BigNumberish

export type ContractOptions = {
  blockIdentifier?: BlockIdentifier
  parseRequest?: boolean
  parseResponse?: boolean
  formatResponse?: { [key: string]: any }
  maxFee?: BigNumberish
  nonce?: BigNumberish
  signature?: Signature
  addressSalt?: string
}

export type CallOptions = Pick<
  ContractOptions,
  'blockIdentifier' | 'parseRequest' | 'parseResponse' | 'formatResponse'
>

export type InvokeOptions = Pick<
  ContractOptions,
  'maxFee' | 'nonce' | 'signature' | 'parseRequest'
>
