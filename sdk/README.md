# @stackspayproof/sdk

JavaScript SDK for StacksPayProof protocol.

## Installation

```bash
npm install @stackspayproof/sdk
```

## Usage

```javascript
import StacksPayProof from '@stackspayproof/sdk';

const client = new StacksPayProof({
  network: 'testnet',
  contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  contractName: 'stacks-pay-proof'
});

// Register a merchant
const result = await client.registerMerchant('My Store', senderKey);

// Record a payment
await client.recordPayment(
  1,              // merchantId
  1000,           // amount
  'STX',          // currency
  'tx-ref-123',   // payment reference
  senderKey
);

// Verify a receipt
const receipt = await client.verifyReceipt(1, senderAddress);

// Get merchant info
const merchant = await client.getMerchant(1, senderAddress);
```

## API

### `registerMerchant(name, senderKey)`
Register a new merchant.

### `recordPayment(merchantId, amount, currency, paymentReference, senderKey)`
Record a payment receipt onchain.

### `verifyReceipt(receiptId, senderAddress)`
Verify and retrieve receipt details.

### `getMerchant(merchantId, senderAddress)`
Get merchant information.

### `getMerchantPayments(merchantId, senderAddress)`
Get total payment count for a merchant.

## License

MIT
