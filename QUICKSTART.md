# StacksPayProof Quick Start Guide

## ✅ What's Ready

Your complete StacksPayProof project is set up and tested!

- ✅ Smart contract with all functions
- ✅ 9 passing tests
- ✅ JavaScript SDK built and ready
- ✅ Web interface configured

## 🚀 Next Steps

### 1. Test the Smart Contract

```bash
npm test
```

All 9 tests should pass ✓

### 2. Deploy to Testnet

```bash
clarinet deployments generate --testnet
clarinet deployments apply -p deployments/default.testnet-plan.yaml
```

### 3. Update SDK Configuration

After deployment, update the contract address in your SDK usage:

```javascript
const client = new StacksPayProof({
  network: 'testnet',
  contractAddress: 'YOUR_DEPLOYED_ADDRESS',
  contractName: 'stacks-pay-proof'
});
```

### 4. Run the Web App

```bash
cd web
npm run dev
```

Visit http://localhost:5173 to see your app!

### 5. Publish SDK to npm

```bash
cd sdk
npm login
npm publish --access public
```

## 📁 Project Structure

```
/contracts              - Clarity smart contract
  stacks-pay-proof.clar - Main contract
  
/sdk                    - JavaScript SDK
  /src/index.ts         - SDK implementation
  /dist                 - Built SDK (ready for npm)
  
/web                    - React web interface
  /src/pages            - All pages (Home, Register, Record, Receipt)
  /src/App.tsx          - Main app component
  
/tests                  - Contract tests (all passing!)
  stacks-pay-proof.test.ts
  
/settings               - Clarinet configuration
```

## 🎯 Core Features Implemented

### Smart Contract
- ✅ Merchant registration
- ✅ Payment recording
- ✅ Receipt verification
- ✅ Payment tracking
- ✅ Event emission
- ✅ Error handling

### SDK
- ✅ registerMerchant()
- ✅ recordPayment()
- ✅ verifyReceipt()
- ✅ getMerchant()
- ✅ getMerchantPayments()
- ✅ getCounters()

### Web App
- ✅ Home page
- ✅ Merchant registration
- ✅ Payment recording
- ✅ Receipt viewer
- ✅ Wallet integration ready

## 📊 Generate Activity

To maximize onchain activity for the leaderboard:

1. Deploy contract to testnet
2. Register multiple merchants
3. Record test payments
4. Share receipt URLs
5. Encourage others to use it
6. Publish SDK to npm
7. Create GitHub repo and push code
8. Add documentation and examples

## 🔗 Useful Commands

```bash
# Check contract syntax
clarinet check

# Run tests
npm test

# Build SDK
cd sdk && npm run build

# Run web app locally
cd web && npm run dev

# Build web app for production
cd web && npm run build
```

## 📝 Example Usage

### Register a Merchant
```javascript
const result = await client.registerMerchant('My Coffee Shop', senderKey);
```

### Record a Payment
```javascript
await client.recordPayment(
  1,              // merchantId
  1000,           // amount
  'STX',          // currency
  'tx-ref-123',   // payment reference
  senderKey
);
```

### Verify a Receipt
```javascript
const receipt = await client.verifyReceipt(1, senderAddress);
```

## 🎉 You're Ready!

Your StacksPayProof protocol is complete and ready to deploy. Start generating onchain activity and building your presence on Stacks!

For deployment details, see DEPLOYMENT.md
For contributing, see CONTRIBUTING.md
