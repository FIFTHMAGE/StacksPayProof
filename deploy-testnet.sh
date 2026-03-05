#!/bin/bash

echo "=== StacksPayProof Testnet Deployment ==="
echo ""
echo "This script will help you deploy to Stacks testnet."
echo ""

# Check if clarinet is installed
if ! command -v clarinet &> /dev/null; then
    echo "❌ Clarinet not found. Please install it first."
    exit 1
fi

echo "✓ Clarinet found"
echo ""

# Check contract syntax
echo "Checking contract syntax..."
if clarinet check; then
    echo "✓ Contract syntax valid"
else
    echo "❌ Contract has syntax errors"
    exit 1
fi

echo ""
echo "📋 Deployment Options:"
echo ""
echo "1. Clarinet CLI (requires wallet setup)"
echo "2. Hiro Platform (web UI - easiest)"
echo "3. Stacks Explorer (web UI)"
echo ""
echo "For easiest deployment, visit:"
echo "https://explorer.hiro.so/sandbox/deploy?chain=testnet"
echo ""
echo "Or use Hiro Platform:"
echo "https://platform.hiro.so/"
echo ""
echo "Contract file: contracts/stacks-pay-proof.clar"
echo "Contract name: stacks-pay-proof"
echo ""
echo "After deployment, update your SDK config with the deployed address!"
