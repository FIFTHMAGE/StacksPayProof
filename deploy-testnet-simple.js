// Simple testnet deployment script
// Run with: node deploy-testnet-simple.js

const { makeContractDeploy, broadcastTransaction, AnchorMode } = require('@stacks/transactions');
const { StacksTestnet } = require('@stacks/network');
const fs = require('fs');

// Configuration
const network = new StacksTestnet();
const contractName = 'stacks-pay-proof';
const contractCode = fs.readFileSync('contracts/stacks-pay-proof.clar', 'utf8');

// Your mnemonic from settings/Testnet.toml
const mnemonic = "jar pattern poem giraffe away toss catalog use garlic canyon disease couple";

async function deploy() {
  try {
    console.log('🚀 Deploying to testnet...');
    console.log('Contract:', contractName);
    
    // Note: You'll need to derive the private key from the mnemonic
    // For now, use the web interface or Clarinet
    
    console.log('\n⚠️  Please use one of these methods instead:');
    console.log('\n1. Hiro Platform (Easiest):');
    console.log('   https://platform.hiro.so/');
    console.log('\n2. Stacks Explorer:');
    console.log('   https://explorer.hiro.so/sandbox/deploy?chain=testnet');
    console.log('\n3. Copy contract from: contracts/stacks-pay-proof.clar');
    console.log('   Contract name: stacks-pay-proof');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

deploy();
