### QuickChat Backend

This repository contains the backend code for **QuickChat**, a real-time chatting application. In addition to real-time communication via Socket.IO, the backend provides three RESTful APIs for user authentication and retrieval.

---

## Features

- **User Authentication**: Login and registration APIs for managing user accounts.
- **User Retrieval**: Fetch user details by username.
- **Real-Time Communication**: Handles live chat, typing indicators, and status updates via Socket.IO.
- **Offline Message Handling**: Queues messages for offline users and delivers them when they reconnect.
- **Delivery and Read Receipts**: Tracks message statuses.
- **Typing Indicators**: Notifies others when a user is typing.

---

## Technologies Used

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Real-Time Communication**: Socket.IO
- **Data Storage**: In-memory storage for user data and message queues (no database).

---

## RESTful APIs

The backend provides the following RESTful APIs for user management:

### 1. **Login**
- **Endpoint**: `POST /login`
- **Description**: Authenticates a user based on their email and password.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "pass": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "user": {
      "email": "user@example.com",
      "username": "user123",
      "lastOnline": "2025-01-04T12:34:56Z"
    }
  }
  ```

### 2. **Register**
- **Endpoint**: `POST /register`
- **Description**: Registers a new user with an email, username, and password.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "username": "user123",
    "pass": "password123",
    "frnds": [],
    "lastOnline": "2025-01-04T12:34:56Z"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully"
  }
  ```

### 3. **Get Users**
- **Endpoint**: `GET /users`
- **Description**: Fetches user details based on the provided username.
- **Query Parameters**:
  - `username` (required): The username to search for.
- **Example**:
  ```bash
  GET /users?username=johndoe
  ```
- **Response**:
  ```json
  {
    "success": true,
    "users": [
      {
        "email": "john@example.com",
        "username": "johndoe",
        "lastOnline": "2025-01-04T12:34:56Z"
      }
    ]
  }
  ```

---

## Setup Instructions

### Prerequisites
- Node.js installed
- A package manager like npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sagardubey14/quickchat-backend.git
   cd quickchat-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the server:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     ALLOWED_ORIGINS=http://localhost:5173
     ```

4. Start the server:
   ```bash
   node index.js
   ```

5. The server will start on the specified port (e.g., `http://localhost:5000`).

---

## Folder Structure

- **/src/**
  - **index.js**: Entry point of the application.
  - **routes/**: Contains API route handlers for login, register, and user retrieval.
  - **services/**: Core services for managing users, messages, and Socket.IO logic.
  - **handlers/**: Utility functions for handling timestamps, message queues, etc.

---

## Socket.IO Events

- **Connection**
  - Triggered when a user connects.
  - Sends acknowledgment and user list.
- **Message**
  - Handles message transmission and delivery.
  - Updates message status.
- **Typing**
  - Broadcasts typing indicators.
- **Disconnect**
  - Updates user status and broadcasts disconnection.

---

## Usage

1. Start the backend server.
2. Connect the frontend application to the backend.
3. Use the RESTful APIs for user management and enjoy real-time chatting.

---

## Future Enhancements

- Integration with a database for persistent user and message storage.
- Token-based authentication for APIs.
- Enhanced error handling and rate limiting for APIs.
- Push notification support.



## License

This project is licensed under the [MIT License](LICENSE).

---

Power the real-time experience of **QuickChat** with the robust **QuickChat Backend**! 🚀