# Easy Purchase App

Welcome to the Easy Purchase App. This guide will help you set up and run the application locally on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- Yarn
- Git (for cloning the repository)

## Setup Instructions

1. **Clone the Repository:**
   - Open a terminal.
   - Clone the repository using Git:
     ```
     git clone <repository-url>
     ```
   - Navigate into the project directory:
     ```
     cd easy-purchase-app
     ```

2. **Build and Run the Frontend:**
   - Change to the frontend directory:
     ```
     cd frontend
     ```
   - Install dependencies and build the project:
     ```
     yarn install
     yarn build
     ```
   - Start the frontend:
     ```
     npm start
     ```
   - Ensure the frontend compiles successfully. It should run on **port 3000** by default. If it's not running on port 3000, adjust the settings as the backend strictly only accepts API calls from this port.

3. **Build and Run the Backend:**
   - Open a new terminal and navigate to the server directory:
     ```
     cd easy-purchase-app/server
     ```
   - Install dependencies and build the project:
     ```
     yarn install
     yarn build
     ```
   - Start the backend server:
     ```
     npm start
     ```
   - The command will initialize the database and its tables, indicating "Database connected and foreign key enforcement is on."

4. **Access the Application:**
   - Open a web browser and go to `localhost:3000`.
   - A login screen should be visible. You can log in using the following credentials:
     ```
     Email: test@example.com
     Password: safepass213
     ```
   - This will allow you to access the application with test data.

## Using the Application

- **Home Page:** After logging in, you will be directed to the home page where you can enter purchases you are agreeing to pay for. Select from the list of products to populate your cart. Enter a member name, then press 'Accept' to record the purchase.

- **Admin Page:**
  - Navigate to the admin page from the menu located at the top right.
  - **Manage Members and Products:** You can manage members and products on the 'Members and Products' tab.
  - **View Purchases:** View all the purchases that members have agreed to pay for and group by members to see the total amounts on the 'Purchases' tab.

## Note

This application is configured to run in a development environment. For production deployment, additional configuration may be required.



