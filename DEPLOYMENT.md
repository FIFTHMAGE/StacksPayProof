# Deployment Guide

## Prerequisites

1. Install Clarinet: https://github.com/hirosystems/clarinet
2. Install Node.js and npm
3. Install uv (for Python): https://docs.astral.sh/uv/getting-started/installation/

## Smart Contract Deployment

### 1. Test the Contract

```bash
clarinet test
```

### 2. Deploy to Testnet

```bash
clarinet deploy --testnet
```

Note the deployed contract address for SDK configuration.

### 3. Deploy to Mainnet

```bash
clarinet deploy --mainnet
```

## SDK Publishing

### 1. Build the SDK

```bash
cd sdk
npm install
npm run build
```

### 2. Publish to npm

```bash
npm login
npm publish --access public
```

## Web App Deployment

### 1. Update Configuration

Edit `web/src/config.ts` with your deployed contract address:

```typescript
export const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
export const CONTRACT_NAME = 'stacks-pay-proof';
export const NETWORK = 'testnet'; // or 'mainnet'
```

### 2. Build the Web App

```bash
cd web
npm install
npm run build
```

### 3. Deploy to Vercel/Netlify

```bash
# Vercel
vercel deploy

# Netlify
netlify deploy --prod
```

Or use their web interfaces to connect your GitHub repository.

## Post-Deployment

1. Update README with deployed contract address
2. Update SDK documentation with real examples
3. Create example transactions on testnet
4. Share receipt URLs for verification
5. Monitor contract activity

## Environment Variables

Create `.env` files for local development:

### SDK `.env`
```
STACKS_NETWORK=testnet
CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
CONTRACT_NAME=stacks-pay-proof
```

### Web `.env`
```
VITE_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
VITE_CONTRACT_NAME=stacks-pay-proof
VITE_NETWORK=testnet
```

## Verification

After deployment, verify:
- Contract is deployed and accessible
- SDK can interact with contract
- Web app connects to wallet
- Receipts are recorded onchain
- Receipt viewer displays correct data
