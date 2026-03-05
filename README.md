# StacksPayProof

Onchain payment receipt protocol on Stacks blockchain.

## Overview

StacksPayProof is a lightweight protocol that records verifiable payment receipts for merchants on the Stacks blockchain.

## Features

- Record proof of payments onchain
- Generate public verifiable receipts
- Merchant registration and tracking
- JavaScript SDK for easy integration
- Web interface for receipt verification

## Project Structure

```
/contracts        - Clarity smart contracts
/sdk             - JavaScript SDK
/web             - Web interface
/tests           - Contract tests
```

## Quick Start

### Smart Contract
```bash
cd contracts
clarinet test
```

### SDK
```bash
cd sdk
npm install
npm run build
```

### Web App
```bash
cd web
npm install
npm run dev
```

## Documentation

See individual directories for detailed documentation.

## License

MIT
