import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Contract details from your deployment
const CONTRACT_ADDRESS = '0xb7a66cda5A21E3206f0Cb844b7938790D6aE807c';
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "count",
    "outputs": [{"internalType": "int256", "name": "", "type": "int256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decrement",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCount",
    "outputs": [{"internalType": "int256", "name": "", "type": "int256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "increment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// OP Sepolia network details
const OP_SEPOLIA_CHAIN_ID = '0xaa37dc'; // 11155420 in hex
const OP_SEPOLIA_RPC = 'https://sepolia.optimism.io';

export default function Home() {
  // State management
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [count, setCount] = useState('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contract, setContract] = useState(null);

  // Connect to wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError('Please install MetaMask to use this app');
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // Switch to OP Sepolia if not already connected
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: OP_SEPOLIA_CHAIN_ID }],
        });
      } catch (switchError) {
        // Chain doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: OP_SEPOLIA_CHAIN_ID,
              chainName: 'OP Sepolia Testnet',
              nativeCurrency: {
                name: 'Sepolia Ether',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: [OP_SEPOLIA_RPC],
              blockExplorerUrls: ['https://sepolia-optimism.etherscan.io/']
            }]
          });
        }
      }

      // Set up provider and contract
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setAccount(accounts[0]);
      setConnected(true);
      setContract(contractInstance);
      setError('');

      // Load current count
      await loadCount(contractInstance);

    } catch (err) {
      setError(`Connection failed: ${err.message}`);
    }
  };

  // Load current count from contract
  const loadCount = async (contractInstance = contract) => {
    try {
      if (!contractInstance) return;
      
      const currentCount = await contractInstance.getCount();
      setCount(currentCount.toString());
    } catch (err) {
      setError(`Failed to load count: ${err.message}`);
    }
  };

  // Increment counter
  const incrementCount = async () => {
    try {
      setLoading(true);
      setError('');
      
      const tx = await contract.increment();
      await tx.wait(); // Wait for transaction confirmation
      
      await loadCount(); // Reload count after transaction
    } catch (err) {
      setError(`Transaction failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Decrement counter
  const decrementCount = async () => {
    try {
      setLoading(true);
      setError('');
      
      const tx = await contract.decrement();
      await tx.wait();
      
      await loadCount();
    } catch (err) {
      setError(`Transaction failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Reset counter
  const resetCount = async () => {
    try {
      setLoading(true);
      setError('');
      
      const tx = await contract.reset();
      await tx.wait();
      
      await loadCount();
    } catch (err) {
      setError(`Transaction failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh count every 10 seconds
  useEffect(() => {
    if (connected && contract) {
      const interval = setInterval(() => {
        loadCount();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [connected, contract]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Counter DApp
        </h1>
        
        {/* Connection Status */}
        {!connected ? (
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Connect your wallet to interact with the smart contract
            </p>
            <button
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div>
            {/* Account Info */}
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Connected Account:</p>
              <p className="font-mono text-sm break-all">{account}</p>
              <p className="text-sm text-gray-600 mt-2">Network: OP Sepolia</p>
            </div>

            {/* Current Count Display */}
            <div className="text-center mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-600 mb-2">Current Count:</p>
                <p className="text-4xl font-bold text-blue-600">{count}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={incrementCount}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                {loading ? 'Processing...' : '+ Increment'}
              </button>

              <button
                onClick={decrementCount}
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                {loading ? 'Processing...' : '- Decrement'}
              </button>

              <button
                onClick={resetCount}
                disabled={loading}
                className="w-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                {loading ? 'Processing...' : '🔄 Reset'}
              </button>

              <button
                onClick={loadCount}
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                🔄 Refresh Count
              </button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Contract Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Contract Address: {CONTRACT_ADDRESS}
          </p>
        </div>
      </div>
    </div>
  );
}
