# Food Delivery API

This is a backend service for a Food Delivery Application. It provides a RESTful API built with Node.js, Express, and MongoDB. The API supports multiple user roles including Admin, User, and Delivery Man, with functionality for managing food items, placing orders, and order tracking.

## Features
- **User Authentication & Authorization** using JWT.
- **Role-based Access Control** (Admin, User, Delivery Man).
- **Food Management** (Admin only): Add, update, delete food items.
- **Order Management**:
  - Users can place orders.
  - Admin can view and update order statuses.
  - Delivery Man can track and mark orders as delivered.
- **Database**: MongoDB with Mongoose for data storage.

## Prerequisites
To run this project locally, you need the following installed:
- **Node.js** (v14+ recommended)
- **MongoDB** (local or MongoDB Atlas)
- **npm** (Node Package Manager)

## Setup and Installation

### 1. Clone the repository
```bash
git clone https://github.com/AbhayKejriwal/fooddeliveryapi.git
cd fooddeliveryapi
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory of the project and add the following environment variables:
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

- Replace `your_mongodb_connection_string` with your MongoDB URI (can use MongoDB Atlas or a local MongoDB instance).
- Replace `your_jwt_secret_key` with a secret key used for signing JWT tokens.

### 4. Start the application
Run the app locally using:
```bash
npm start
```
This will start the server on `http://localhost:5000` (or the port specified in the `.env` file).

### 5. Testing with Postman
The results of API tests are stored in the **Postman Tests** folder. The following API endpoints have been tested.

### **Authentication & User Management**
- **POST /auth/login-admin**: Admin login
- **POST /auth/login-user**: User login
- **POST /auth/login-delivery-man**: Delivery Man login
- **POST /auth/register-user**: Create a new user (User registration)

### **Food Management (Admin only)**
- **GET /foods**: List all available food items
- **POST /foods**: Add a new food item (Admin only)
- **PUT /foods/:id**: Edit an existing food item (Admin only)
- **DELETE /foods/:id**: Delete a food item (Admin only)

### **Order Management**
- **POST /orders**: Place a new order (User only)
- **GET /orders**: View all orders (Admin only)
- **GET /orders/:id**: View order details (Admin and User can view their own orders)
- **PUT /orders/:id/status**: Update order status (Admin only)

### **Delivery Man Order Tracking**
- **GET /orders/assigned**: View orders assigned to a delivery man
- **PUT /orders/:id/delivered**: Mark an order as delivered (Delivery Man only)

## Folder Structure
```plaintext
fooddeliveryapi/
├── models/          # Mongoose models for User, Food, and Order
├── routes/          # API route definitions
├── controllers/     # Business logic for each route
├── services/        # Logic for interacting with the database
├── middlewares/     # Middleware for JWT authentication and role-based access
├── utils/           # Helper functions (e.g., JWT utility functions)
├── index.js         # Application setup and routing
├── .env             # Environment variables
├── package.json     # Project metadata and dependencies
└── README.md        # This file
```

## Technologies Used
- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for building the RESTful API.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: MongoDB ODM for interacting with the database.
- **JWT**: For secure user authentication and role-based access.
- **bcryptjs**: For hashing passwords.