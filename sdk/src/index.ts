import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  stringAsciiCV,
  uintCV,
  callReadOnlyFunction,
  cvToJSON,
} from '@stacks/transactions';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

export interface StacksPayProofConfig {
  network: 'testnet' | 'mainnet';
  contractAddress: string;
  contractName: string;
}

export class StacksPayProof {
  private network: StacksTestnet | StacksMainnet;
  private contractAddress: string;
  private contractName: string;

  constructor(config: StacksPayProofConfig) {
    this.network = config.network === 'mainnet' 
      ? new StacksMainnet() 
      : new StacksTestnet();
    this.contractAddress = config.contractAddress;
    this.contractName = config.contractName;
  }

  async registerMerchant(name: string, senderKey: string) {
    const txOptions = {
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'register-merchant',
      functionArgs: [stringAsciiCV(name)],
      senderKey,
      network: this.network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeContractCall(txOptions);
    const broadcastResponse = await broadcastTransaction(transaction, this.network);
    return broadcastResponse;
  }

  async recordPayment(
    merchantId: number,
    amount: number,
    currency: string,
    paymentReference: string,
    senderKey: string
  ) {
    const txOptions = {
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'record-payment',
      functionArgs: [
        uintCV(merchantId),
        uintCV(amount),
        stringAsciiCV(currency),
        stringAsciiCV(paymentReference),
      ],
      senderKey,
      network: this.network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeContractCall(txOptions);
    const broadcastResponse = await broadcastTransaction(transaction, this.network);
    return broadcastResponse;
  }

  async verifyReceipt(receiptId: number, senderAddress: string) {
    const options = {
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'verify-receipt',
      functionArgs: [uintCV(receiptId)],
      network: this.network,
      senderAddress,
    };

    const result = await callReadOnlyFunction(options);
    return cvToJSON(result);
  }

  async getMerchant(merchantId: number, senderAddress: string) {
    const options = {
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'get-merchant',
      functionArgs: [uintCV(merchantId)],
      network: this.network,
      senderAddress,
    };

    const result = await callReadOnlyFunction(options);
    return cvToJSON(result);
  }

  async getMerchantPayments(merchantId: number, senderAddress: string) {
    const options = {
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'get-merchant-payments',
      functionArgs: [uintCV(merchantId)],
      network: this.network,
      senderAddress,
    };

    const result = await callReadOnlyFunction(options);
    return cvToJSON(result);
  }

  async getCounters(senderAddress: string) {
    const options = {
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'get-counters',
      functionArgs: [],
      network: this.network,
      senderAddress,
    };

    const result = await callReadOnlyFunction(options);
    return cvToJSON(result);
  }
}

export default StacksPayProof;
