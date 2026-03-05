# Testnet Deployment Guide

## Prerequisites

You'll need:
1. A Stacks wallet with testnet STX
2. Your wallet's private key or mnemonic

## Get Testnet STX

Visit the Stacks Testnet Faucet:
https://explorer.hiro.so/sandbox/faucet?chain=testnet

Request testnet STX to your wallet address.

## Deployment Options

### Option 1: Using Clarinet (Recommended)

1. **Set up your deployer account**

Create or edit `settings/Testnet.toml`:

```toml
[network]
name = "testnet"

[accounts.deployer]
mnemonic = "YOUR_WALLET_MNEMONIC_HERE"
```

2. **Generate deployment plan**

```bash
clarinet deployments generate --testnet
```

3. **Apply deployment**

```bash
clarinet deployments apply -p deployments/default.testnet-plan.yaml
```

### Option 2: Using Stacks CLI

1. **Install Stacks CLI**

```bash
npm install -g @stacks/cli
```

2. **Deploy contract**

```bash
stx deploy_contract contracts/stacks-pay-proof.clar stacks-pay-proof 50000 0 \
  --testnet \
  --privateKey YOUR_PRIVATE_KEY
```

### Option 3: Using Hiro Platform (Web UI)

1. Visit https://platform.hiro.so/
2. Connect your wallet
3. Create new project
4. Upload `contracts/stacks-pay-proof.clar`
5. Deploy to testnet

### Option 4: Manual Deployment via Explorer

1. Visit https://explorer.hiro.so/sandbox/deploy?chain=testnet
2. Connect your wallet
3. Paste contract code from `contracts/stacks-pay-proof.clar`
4. Set contract name: `stacks-pay-proof`
5. Click "Deploy"

## After Deployment

1. **Note your contract address**

Your contract will be deployed at:
`YOUR_ADDRESS.stacks-pay-proof`

Example: `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacks-pay-proof`

2. **Update SDK configuration**

Edit `sdk/src/index.ts` or create a config file:

```javascript
const client = new StacksPayProof({
  network: 'testnet',
  contractAddress: 'YOUR_DEPLOYED_ADDRESS',
  contractName: 'stacks-pay-proof'
});
```

3. **Update web app configuration**

Create `web/src/config.ts`:

```typescript
export const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_ADDRESS';
export const CONTRACT_NAME = 'stacks-pay-proof';
export const NETWORK = 'testnet';
```

4. **Verify deployment**

Visit the explorer:
https://explorer.hiro.so/txid/YOUR_TX_ID?chain=testnet

## Test Your Deployment

### Using Clarinet Console

```bash
clarinet console --testnet
```

Then test functions:

```clarity
(contract-call? .stacks-pay-proof register-merchant "Test Merchant")
(contract-call? .stacks-pay-proof record-payment u1 u1000 "STX" "test-ref")
(contract-call? .stacks-pay-proof verify-receipt u1)
```

### Using SDK

```javascript
import StacksPayProof from '@stackspayproof/sdk';

const client = new StacksPayProof({
  network: 'testnet',
  contractAddress: 'YOUR_ADDRESS',
  contractName: 'stacks-pay-proof'
});

// Register merchant
const result = await client.registerMerchant('My Store', privateKey);
console.log('Merchant registered:', result);

// Record payment
const payment = await client.recordPayment(
  1, 1000, 'STX', 'tx-123', privateKey
);
console.log('Payment recorded:', payment);
```

## Troubleshooting

### "Insufficient balance"
- Get more testnet STX from the faucet
- Wait for previous transactions to confirm

### "Contract already exists"
- Change the contract name in deployment plan
- Or deploy from a different address

### "Invalid contract"
- Run `clarinet check` to verify syntax
- Ensure line endings are LF not CRLF

## Next Steps

1. ✅ Deploy contract
2. ✅ Verify on explorer
3. ✅ Update SDK config
4. ✅ Test with SDK
5. ✅ Deploy web app
6. ✅ Create example transactions
7. ✅ Share receipt URLs
8. ✅ Publish SDK to npm

## Useful Links

- Testnet Explorer: https://explorer.hiro.so/?chain=testnet
- Testnet Faucet: https://explorer.hiro.so/sandbox/faucet?chain=testnet
- Hiro Platform: https://platform.hiro.so/
- Stacks Documentation: https://docs.stacks.co/
- Clarinet Docs: https://docs.hiro.so/clarinet/

## Example Deployed Contract

Once deployed, your contract will be accessible at:
```
https://explorer.hiro.so/txid/CONTRACT_ID?chain=testnet
```

You can interact with it via:
- Stacks Explorer UI
- Your SDK
- Your web app
- Clarinet console
- Direct API calls

Good luck with your deployment! 🚀
