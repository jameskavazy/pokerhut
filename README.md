# PokerHut

PokerHut is a community-driven web application designed for poker players to connect, organise games, and manage their poker communities. Built with the Next.js+React framework it provides tools for managing poker home games - with the payout calculator for cash games and the ability to advertise events to your local poker community.

## Features

### Home Game Events
- **Create Events:** Advertise your private poker games, adding event details such as title, location, time, and game type to attract players to your home game.
- **Join Events:** Browse and join existing events created by other players.
- **Event Filtering:** Use intuitive filters to find events by date, location, or host.
- **User Profiles and Attendee Lists:** View who’s attending an event and access attendee profiles. Follow your favourite poker players.

### Cashout Calculator
- **Add Players:** Easily add players with unique IDs to the game list.
- **Input Player Details:** Enter each player's name, buy-in amount, and cash-out amount.
- **Profit/Loss Calculation:** Automatically calculate the profit or loss for each player based on the difference between their buy-in and cash-out amounts.
- **Payout Requirements:** View a summary of payouts required to balance the game’s funds among players.

### Authentication and User Management
- **Google Authentication:** Secure login using Google accounts.
- **Personalized Profiles:** Users can update their profiles, including profile images and usernames.
- **Follow System:** Follow other players to stay connected and keep track of their events.

### **State Persistence**
- **Local Storage:** Player and event details persist across sessions using local storage.
- **Dynamic Query Parameters:** Event filters and user preferences are maintained via URL query parameters.

### Validation and Warnings
- **Form Validation:** The application validates player inputs to ensure all required fields are filled correctly before calculations.
- **Invalid Value Warnings:** If the total cash out does not match the total buy-in, a warning is displayed to highlight discrepancies.

## Technology Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js API routes (Node.js)
- **Database:** Prisma with a Postgres database
- **Authentication:** Auth.js with Google provider
- **Validation:** Zod for input validation and schema enforcement
- **Deployment:** Dockerized on AWS EC2


## Getting Started

### Prerequisites

- **Node.js** - Ensure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/jameskavazy/poker-payout-calculator.git
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


## Contact

For questions or suggestions, please reach out at james.kavazy@gmail.com

