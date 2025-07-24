# Counter DApp - Complete Web3 Stack

A full-stack decentralized application (DApp) featuring a simple counter smart contract with a modern React frontend and GraphQL indexing via The Graph Protocol.

## 🎯 **What This Project Does**

This is a **learning-focused Web3 project** that demonstrates:
- ✅ **Smart Contract Development** with Solidity
- ✅ **Frontend Web3 Integration** with React + ethers.js
- ✅ **Blockchain Data Indexing** with The Graph Protocol
- ✅ **Full DevOps Pipeline** from development to production

## 🏗️ **Project Structure**

```
smartcontracttest/
├── smartcontract/          # Solidity smart contract
│   ├── contracts/
│   │   └── counter.sol     # Main Counter contract with events
│   ├── ignition/           # Deployment scripts
│   └── hardhat.config.js   # Hardhat configuration
│
├── frontend/               # React.js frontend DApp
│   ├── pages/
│   │   └── index.js        # Main Counter interface
│   └── package.json        # Frontend dependencies
│
└── graph/                  # The Graph Protocol subgraph
    └── countertest/
        ├── schema.graphql   # GraphQL schema
        ├── subgraph.yaml   # Subgraph configuration
        └── src/            # Event handlers
```

## 🚀 **Live Deployments**

### **Smart Contract**
- **Network**: OP Sepolia Testnet
- **Address**: `0xF170237160314f5D8526f981b251b56e25347Ed9`
- **Explorer**: [View on OP Sepolia Explorer](https://sepolia-optimism.etherscan.io/address/0xF170237160314f5D8526f981b251b56e25347Ed9)

### **Subgraph**
- **Endpoint**: https://api.studio.thegraph.com/query/116984/marcustest/v1
- **Studio**: [View on The Graph Studio](https://thegraph.com/studio/subgraph/marcustest)

## 🎮 **How to Use**

### **Frontend DApp**
1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**: http://localhost:3000

4. **Connect MetaMask**:
   - Make sure you're on OP Sepolia testnet
   - Get testnet ETH from [OP Sepolia Faucet](https://faucet.sepolia.dev/)

5. **Interact with Counter**:
   - ✅ **Increment** (+1)
   - ✅ **Decrement** (-1) 
   - ✅ **Reset** (back to 0)
   - ✅ **Refresh** (fetch latest from blockchain)

## 📊 **Query Blockchain Data**

### **GraphQL Playground**
Visit: https://thegraph.com/studio/subgraph/marcustest

### **Sample Queries**

**Get Recent Counter Changes**:
```graphql
{
  countIncrementeds(first: 10, orderBy: blockTimestamp, orderDirection: desc) {
    newCount
    incrementedBy
    blockTimestamp
    transactionHash
  }
  countDecrementeds(first: 10, orderBy: blockTimestamp, orderDirection: desc) {
    newCount
    decrementedBy
    blockTimestamp
    transactionHash
  }
}
```

**Get Events by Specific User**:
```graphql
{
  countIncrementeds(where: { incrementedBy: "0xYourWalletAddress" }) {
    newCount
    blockTimestamp
    transactionHash
  }
}
```

**Get All Reset Events**:
```graphql
{
  countResets {
    resetBy
    blockTimestamp
    transactionHash
  }
}
```

## 🔧 **Smart Contract Functions**

```solidity
contract Counter {
    int256 public count;
    
    function increment() public;    // +1 to counter
    function decrement() public;    // -1 to counter  
    function reset() public;        // Reset to 0
    function getCount() public view returns (int256);
}
```

### **Events Emitted**
- `CountIncremented(int256 newCount, address incrementedBy)`
- `CountDecremented(int256 newCount, address decrementedBy)`
- `CountReset(address resetBy)`

## 🛠️ **Development Setup**

### **Prerequisites**
- Node.js 18+
- MetaMask browser extension
- OP Sepolia testnet ETH

### **Smart Contract Development**
```bash
cd smartcontract
npm install
npx hardhat compile
npx hardhat test
```

### **Deploy to OP Sepolia**
```bash
npx hardhat ignition deploy ignition/modules/Counter.js --network op-sepolia
```

### **Verify Contract**
```bash
npx hardhat verify --network op-sepolia <CONTRACT_ADDRESS>
```

### **Subgraph Development**
```bash
cd graph/countertest
npm install
graph codegen && graph build
graph deploy marcustest
```

## 🎓 **Learning Objectives**

This project teaches:

1. **Smart Contract Basics**
   - Solidity syntax and patterns
   - Event emission for indexing
   - Contract deployment and verification

2. **Frontend Web3 Integration**
   - Connecting to MetaMask
   - Reading from blockchain
   - Sending transactions
   - Handling different network states

3. **Blockchain Data Indexing**
   - Creating GraphQL schemas
   - Writing event handlers
   - Querying historical data
   - Real-time blockchain monitoring

4. **Full-Stack Architecture**
   - Contract → Frontend → Subgraph workflow
   - Development to production pipeline
   - Web3 UX best practices

## 🌟 **Key Features**

- ✅ **Global Counter** - Single counter shared by all users
- ✅ **Real-time Updates** - Auto-refresh from blockchain
- ✅ **Transaction History** - Complete audit trail via subgraph
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **Error Handling** - Graceful failure management
- ✅ **Network Detection** - Auto-switch to OP Sepolia

## 📝 **Technical Stack**

- **Blockchain**: OP Sepolia (Optimism Layer 2)
- **Smart Contract**: Solidity 0.8.28
- **Development**: Hardhat
- **Frontend**: Next.js + React
- **Web3 Library**: ethers.js
- **Styling**: Tailwind CSS
- **Indexing**: The Graph Protocol
- **Query Language**: GraphQL

## 🚧 **Future Improvements**

- [ ] Add user-specific counters (mapping-based)
- [ ] Implement counter limits/permissions
- [ ] Add transaction cost optimization
- [ ] Create mobile app version
- [ ] Add real-time notifications
- [ ] Implement counter leaderboards

## 📄 **License**

This project is for educational purposes. Feel free to fork, modify, and learn from it!

---

**Built with ❤️ for Web3 learning and development**
