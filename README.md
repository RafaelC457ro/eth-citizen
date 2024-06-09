# ETH Citizen

## Overview

ETH Citizen is a decentralized application (dApp) built using React and Vite, leveraging the Ethereum blockchain to store and retrieve citizen information. This application interacts directly with a deployed smart contract on the Sepolia testnet, allowing users to view a list of citizens and add new citizens to the registry. Metamask is used for managing transactions and signing them with the user's wallet.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server for modern web projects.
- **shadcn/ui**: A collection of UI components for building clean and modern user interfaces.
- **web3.js**: A JavaScript library for interacting with the Ethereum blockchain.
- **TypeScript**: A statically typed superset of JavaScript.
- **npm**: Node package manager for managing project dependencies.
- **tailwindcss**: A utility-first CSS framework for rapidly building custom designs.

## Smart Contract Details

- **ABI**: [Smart Contract ABI](https://gist.github.com/IhorYermakovSecurrency/6b246d769154b145d730b98b5b61e883)
- **Source Code**: [Smart Contract Source Code](https://gist.github.com/IhorYermakovSecurrency/651202f46b90be531e95bca2b41d7571)
- **Deployed Address**: [0xa011799d9467d2b33768fb1a3512f1b468b87e96](https://sepolia.etherscan.io/address/0xa011799d9467d2b33768fb1a3512f1b468b87e96)

## Important Notes

1. **City Display Issue**:

   - The city field in the citizen data is displayed as a hex string. This is because the city is an indexed string in the event, which results in a Keccak-256 hash of the value that cannot be directly parsed into a readable string.
   - A potential workaround involves mapping cities to their Keccak-256 hashes, but this would require maintaining an extensive list. More information can be found in this [discussion](https://github.com/ethers-io/ethers.js/discussions/2171#discussioncomment-1481119).

2. **shadcn/ui Components**:
   - The majority of components within `src/components/ui` were generated using shadcn/ui. This approach ensures a consistent and modern design while saving development time. It also promotes reuse and adherence to best practices in UI development.

## How to Run Locally

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Metamask**: Install the Metamask browser extension from [metamask.io](https://metamask.io/).

### Steps

1. **Clone the Repository**:

   ```sh
   git clone <repository_url>
   cd eth-citizen
   ```

2. **Install Dependencies**:

   ```sh
   npm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory based on the `.env.example` file.
   - The `.env` file should contain:
     ```
      VITE_CHAIN_ID=0xaa36a7
      VITE_CONTRACT_ADDRESS=0xa011799d9467d2b33768fb1a3512f1b468b87e96
     ```

4. **Run the Development Server**:

   ```sh
   npm run dev
   ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:9001`.

### Test Ether

To interact with the smart contract, you will need test ether on the Sepolia testnet. You can obtain test ether from the [Sepolia Faucet](https://sepoliafaucet.net/).

## Contributors

Rafael Castro
