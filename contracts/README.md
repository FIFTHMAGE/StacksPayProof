# StacksPayProof Smart Contract

Clarity smart contract for recording payment receipts onchain.

## Contract Functions

### Public Functions

#### `register-merchant`
Register a new merchant profile.

**Parameters:**
- `name` (string-ascii 64): Merchant name

**Returns:** Merchant ID (uint)

#### `record-payment`
Record a payment receipt onchain.

**Parameters:**
- `merchant-id` (uint): Merchant identifier
- `amount` (uint): Payment amount
- `currency` (string-ascii 10): Currency code (e.g., "STX")
- `payment-reference` (string-ascii 128): Transaction reference

**Returns:** Receipt ID (uint)

### Read-Only Functions

#### `verify-receipt`
Get receipt details for verification.

**Parameters:**
- `receipt-id` (uint): Receipt identifier

**Returns:** Receipt data or none

#### `get-merchant`
Get merchant profile information.

**Parameters:**
- `merchant-id` (uint): Merchant identifier

**Returns:** Merchant data or none

#### `get-merchant-payments`
Get total payment count for a merchant.

**Parameters:**
- `merchant-id` (uint): Merchant identifier

**Returns:** Payment count (uint)

#### `get-counters`
Get current merchant and receipt counters.

**Returns:** Object with merchant and receipt counts

## Events

The contract emits a `payment-recorded` event when a payment is recorded:

```clarity
{
  event: "payment-recorded",
  merchant-id: uint,
  receipt-id: uint,
  amount: uint,
  currency: string-ascii,
  timestamp: uint
}
```

## Testing

Run tests with Clarinet:

```bash
clarinet test
```

## Deployment

Deploy to testnet:

```bash
clarinet deploy --testnet
```

Deploy to mainnet:

```bash
clarinet deploy --mainnet
```
