
# Poker Payout Calculator

Poker Payout Calculator is a web application that helps poker players calculate their profit/loss and determine payout requirements after a cash game. This application is built with Next.js+React frameowrk and AWS services and is designed to provide a simple tool for managing poker game finances.

## Features

### Cashout Calculator
- **Add Players:** Easily add players with unique IDs to the game list.
- **Input Player Details:** Enter each player's name, buy-in amount, and cash-out amount.
- **Profit/Loss Calculation:** Automatically calculate the profit or loss for each player based on the difference between their buy-in and cash-out amounts.
- **Payout Requirements:** View a summary of payouts required to balance the game’s funds among players.

### State Persistence
- **Local Storage:** Player details are saved in local storage, allowing you to preserve data across sessions and refreshes.

### Validation and Warnings
- **Form Validation:** The application validates player inputs to ensure all required fields are filled correctly before calculations.
- **Invalid Value Warnings:** If the total cash out does not match the total buy-in, a warning is displayed to highlight discrepancies.

## Technology Stack

- **Frontend:** Next.js (React)
- **Backend:** Next.js (Node.js)
- **Deployment:** To Be Deployed with Docker on AWS using EC2 Virtual Machine.

## Getting Started

### Prerequisites

- **Node.js** - Ensure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/poker-payout-calculator.git
    cd poker-payout-calculator
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the application locally:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000` to use the app.

## Future Features

- **Authentication and User Profiles:** User management and personalized profiles.
- **Private Games Event Posts:** Join and host private games by adding your own private game to the event list or browse events near you to join.
- **Additional Calculators:** Expanding to support to tournament paysouts, specifically determining best structure for blinds and payouts. 

## Contact

For questions or suggestions, please reach out at james.kavazy@gmail.com

