# Blockchain-based Charity Donation Platform

This project is a decentralized charity donation platform where the needy can submit their cases, and donors can contribute to approved cases directly using blockchain technology. The system ensures transparency and trust by leveraging smart contracts.

## Features

- **Home**: Landing page with information about the platform and navigation links.
  ![Home](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/75a4b970-2bd4-4586-9199-0de38ef98c36)

- **Signup**: Page for new users to create an account.
  ![Signup](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/f4d26e93-1326-423e-9d27-cd21982d0f1e)

- **Login**: Page for existing users to log in to their account.
![Login](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/0c52317d-8011-4893-a0c6-564028827660)

- **Create Profile (Needy)**: A profile for individuals who need help, allowing them to submit cases.
![Needyprofile](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/92114ce3-c529-4e64-8097-5d85e6018e30)

- **Request Help**: Needy individuals can submit their case details including the amount needed and necessary documents.
![Createcase](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/623351f1-65cb-4265-9a4f-f4fe1431fb27)

- **View Case Status**: Users can check the status of their submitted cases.
![View case status](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/1e8a884b-b6a8-4377-a33e-6976472da153)

- **View Raised Amount**: Donors,needy and charity can view the total amount raised for each case.
![View Raised amt](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/69ea8e6b-b5b9-4f4c-bb9b-62dcd54705fe)

- **Create Profile (Charity)**: A profile for charity organizations to review and approve cases.
![charityprofile](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/07c403fc-a05d-44f4-9663-fb2299b136d6)

 - **View Cases**: Charity can browse through all submitted cases.
![Viewcases](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/f2ad4b33-fb9d-4ef9-a82f-d6314091326c)

 - **Approve Case**: Charity reviews the submitted documents and approves the case if it meets the criteria.
![Approvecase](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/288bb06a-d4c8-48e4-b75f-46fbb0fe3328)

- **Create Profile (Donor)**: A profile for donors to browse and donate to approved cases.
![Donorprofile](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/5eead558-5463-4dc0-97cd-14405cd1bd50)

- **Donate to Case**: Donors can browse through approved cases and donate to the one they choose.
![donatetocase](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/dfef036a-c05f-4820-a45f-6083709fe7e1)

- **Connect to MetaMask**: Page to connect your MetaMask wallet to the platform.
![Connecttometamask](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/db517cb3-c1c8-40cb-b4e0-2fbfcf5f000f)

- **MetaMask Integration**: Seamless integration with MetaMask for transaction management.
![Metamask](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/05577a53-35e8-4791-927a-9a2bca95c440)

- **Block Explorer**: Track the transactions and status of cases on a blockchain explorer.
![Block_explorer](https://github.com/Bala1703/Blockchain-based-charity-donations/assets/138019223/9be060e3-4833-4706-a892-6406e51f2f44)

## Tech Stack

- **Frontend**: React.js
- **Backend**: SQL for signup and login
- **Smart Contracts**: Solidity
- **Wallet Integration**: MetaMask
- **Development and Testing**: Remix IDE

## Getting Started

### Prerequisites

- Node.js
- MetaMask extension installed in your browser

### Installation

1. Clone the repository:
   git clone https://github.com/Bala1703/Blockchain-based-charity-donations.git
   cd ReactApp

Install dependencies:
    npm install
Running the Application
Backend
   Navigate to the backend directory:

    cd backend
Start the backend server:

    npm run start
Frontend
  Navigate to the frontend directory:

    cd client
Start the frontend development server:

    npm run dev
    Open http://localhost:5173 in your browser.

Smart Contract Deployment
    Open Remix IDE.

    Load the smart contract files located in the contracts directory.

    Compile and deploy the smart contracts on your preferred Ethereum network.


MetaMask Configuration
    Install the MetaMask extension in your browser.

    Create or import a wallet.

    Connect to the same Ethereum network where the smart contracts are deployed.
