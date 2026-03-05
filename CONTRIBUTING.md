# Contributing to StacksPayProof

We welcome contributions! Here's how you can help:

## Areas for Contribution

### Smart Contract
- Add new features (batch payments, refunds)
- Optimize gas usage
- Improve security
- Add more validation

### SDK
- Add TypeScript types
- Improve error handling
- Add more helper functions
- Write better documentation
- Add unit tests

### Web Interface
- Improve UI/UX
- Add merchant dashboard
- Add payment analytics
- Mobile responsiveness
- Accessibility improvements

### Documentation
- API documentation
- Tutorial videos
- Integration guides
- Use case examples

### Tooling
- Receipt indexer
- Analytics dashboard
- CLI tools
- Browser extensions

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/stacks-pay-proof.git
cd stacks-pay-proof
```

2. Install dependencies
```bash
# Smart contract
clarinet check

# SDK
cd sdk && npm install

# Web app
cd web && npm install
```

3. Run tests
```bash
clarinet test
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## Code Style

- Use TypeScript for SDK and web app
- Follow Clarity best practices for smart contracts
- Add comments for complex logic
- Write tests for new features

## Questions?

Open an issue or reach out to the maintainers.
