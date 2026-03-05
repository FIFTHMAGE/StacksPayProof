// Production configuration - Update after mainnet deployment
export const CONFIG = {
  // TODO: Update this with your mainnet contract address after deployment
  CONTRACT_ADDRESS: 'SP000000000000000000002Q6VF78', // ← CHANGE THIS!
  CONTRACT_NAME: 'stacks-pay-proof',
  
  // Set to 'mainnet' for production, 'testnet' for testing
  NETWORK: 'mainnet' as 'testnet' | 'mainnet',
  
  // Stacks network endpoints
  TESTNET_API: 'https://api.testnet.hiro.so',
  MAINNET_API: 'https://api.hiro.so',
};

export const getNetworkUrl = () => {
  return CONFIG.NETWORK === 'mainnet' 
    ? CONFIG.MAINNET_API 
    : CONFIG.TESTNET_API;
};
