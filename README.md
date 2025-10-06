# Stacks Tic-Tac-Toe 🎮

A decentralized tic-tac-toe game built on the Stacks blockchain with smart contracts written in Clarity. Players can create games with STX bets, join existing games, and play against each other with automatic winner determination and prize distribution.

## 🌟 Features

- **Decentralized Gaming**: Fully on-chain tic-tac-toe with transparent game logic
- **STX Betting**: Players can bet STX tokens on game outcomes
- **Timeout Protection**: Games automatically expire after 45 minutes of inactivity
- **Winner Takes All**: Automatic prize distribution to the winning player
- **Modern Frontend**: Built with Next.js and React
- **Wallet Integration**: Compatible with popular Stacks wallets (Leather, Xverse)
- **Real-time Updates**: Live game state tracking and updates

## 🏗️ Architecture

This project consists of three main components:

### Smart Contract (`/contracts`)
- **Language**: Clarity
- **File**: `tic-tac-toe.clar`
- **Features**:
  - Game creation with betting
  - Move validation and turn management
  - Automatic win detection
  - Timeout-based game cancellation
  - STX escrow and distribution

### Frontend (`/frontend`)
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS
- **Wallet**: Stacks Connect integration
- **Features**:
  - Create and join games
  - Interactive game board
  - Wallet connection and management
  - Game history and state

### Testing (`/tests`)
- **Framework**: Vitest with Clarinet SDK
- **Coverage**: Comprehensive unit tests for all contract functions
- **File**: `tic-tac-toe.test.ts`

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Clarinet](https://github.com/hirosystems/clarinet) (for contract development)
- A Stacks wallet (Leather, Xverse, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/oderahub/stacks-tic-tac-toe.git
   cd stacks-tic-tac-toe
   ```

2. **Install contract dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Development

#### Running Contract Tests
```bash
# In project root
npm run test                    # Run tests once
npm run test:report            # Run with coverage report
npm run test:watch             # Watch mode for development
```

#### Running the Frontend
```bash
# In /frontend directory
cd frontend
npm run dev                    # Start development server
npm run build                  # Build for production
npm run start                  # Start production server
```

The frontend will be available at `http://localhost:3000`

## 🎯 How to Play

1. **Connect Wallet**: Click "Connect Wallet" and approve the connection
2. **Create Game**: Set your bet amount and make your first move (X)
3. **Share Game**: Share the game ID with your opponent
4. **Join Game**: Your opponent joins with the game ID and makes their move (O)
5. **Play**: Take turns making moves until someone wins or the board is full
6. **Win**: The winner automatically receives both players' bet amounts!

## 📋 Game Rules

### Basic Rules
- Standard tic-tac-toe: get 3 in a row (horizontal, vertical, or diagonal)
- Player 1 (game creator) is always **X**
- Player 2 (joiner) is always **O**
- Minimum bet: 0.0001 STX (100 microSTX)

### Timeout Rules
- Games timeout after **45 minutes** of inactivity
- The waiting player can cancel and get their bet refunded
- Both players receive their original bet amounts back on timeout

### Smart Contract Functions

#### Public Functions
- `create-game(bet-amount, move-index, move)` - Create a new game with a bet
- `join-game(game-id, move-index, move)` - Join an existing game
- `play(game-id, move-index, move)` - Make a move in an active game
- `cancel-game-timeout(game-id)` - Cancel a timed-out game

#### Read-Only Functions
- `get-game(game-id)` - Get game state
- `get-latest-game-id()` - Get the most recent game ID
- `is-game-timed-out(game-id)` - Check if a game has timed out
- `get-blocks-since-last-move(game-id)` - Get blocks since last activity

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
npm run test
```

### Test Coverage
- ✅ Game creation with valid bets
- ✅ Game joining mechanics
- ✅ Move validation and turn management
- ✅ Win condition detection
- ✅ Invalid move prevention
- ✅ Timeout functionality
- ✅ Error handling for edge cases

## 🛠️ Development Setup

### Project Structure
```
├── contracts/
│   └── tic-tac-toe.clar          # Main smart contract
├── deployments/
│   ├── default.simnet-plan.yaml  # Simnet deployment plan
│   └── default.testnet-plan.yaml # Testnet deployment plan
├── frontend/
│   ├── app/                      # Next.js app directory
│   ├── components/               # React components
│   ├── hooks/                    # Custom React hooks
│   └── lib/                      # Utility functions
├── tests/
│   └── tic-tac-toe.test.ts      # Contract unit tests
├── settings/                     # Network configurations
├── Clarinet.toml                # Clarinet configuration
└── package.json                 # Project dependencies
```

### Key Configuration Files

- **`Clarinet.toml`**: Defines the smart contract and project settings
- **`vitest.config.js`**: Test configuration for contract testing
- **`frontend/next.config.ts`**: Next.js configuration
- **`deployments/`**: Network-specific deployment configurations

## 🌐 Deployment

### Testnet Deployment
1. Configure your deployment settings in `deployments/default.testnet-plan.yaml`
2. Deploy using Clarinet:
   ```bash
   clarinet deployments generate --testnet
   clarinet deployments apply --testnet
   ```

### Mainnet Deployment
1. Update `deployments/default.mainnet-plan.yaml`
2. Deploy with proper security reviews:
   ```bash
   clarinet deployments generate --mainnet
   clarinet deployments apply --mainnet
   ```

## 🔧 Configuration

### Environment Variables (Frontend)
Create a `.env.local` file in the `/frontend` directory:

```env
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
```

### Network Settings
Configure networks in `/settings/`:
- `Testnet.toml` - Testnet configuration
- `Mainnet.toml` - Mainnet configuration
- `Devnet.toml` - Local development network

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run tests: `npm run test`
5. Commit changes: `git commit -am 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Submit a Pull Request

### Development Guidelines
- Write comprehensive tests for contract changes
- Follow Clarity best practices
- Ensure frontend accessibility
- Add documentation for new features

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Tournament mode with multiple players
- [ ] ELO rating system for players
- [ ] Game replay functionality
- [ ] Mobile app development
- [ ] Integration with other Stacks DeFi protocols
- [ ] NFT rewards for winners

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/oderahub/stacks-tic-tac-toe/issues)
- **Discussions**: [GitHub Discussions](https://github.com/oderahub/stacks-tic-tac-toe/discussions)
- **Stacks Community**: [Discord](https://discord.gg/stacks)

## 🙏 Acknowledgments

- [Stacks Foundation](https://stacks.org/) for the blockchain platform
- [Hiro Systems](https://www.hiro.so/) for development tools
- The Stacks community for support and feedback

---

**Happy Gaming! 🎮**

*Built with ❤️ on Stacks*