# Bus Booking System Backend

This repository contains the backend code for the Bus Booking System, a web application designed to facilitate online bus ticket reservations. The backend is built using Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure login and registration for users.
- **Bus Management**: Admins can add, update, and delete bus information.
- **Route Management**: Admins can manage routes for different buses.
- **Booking Management**: Users can book tickets for available routes.
- **Payment Integration**: Secure payment processing for ticket bookings.
- **Admin Panel**: Access for admins to manage users, buses, and routes.

## Prerequisites

- Node.js
- MongoDB
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ajmalebrahemi/Bus-Booking-System-Backend.git

Navigate to the project directory:
bash
Copy code
cd Bus-Booking-System-Backend
Install dependencies:
bash
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory.
Add the following variables:
env
Copy code
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the server:
bash
Copy code
npm start
## API Endpoints

### User Endpoints:
- `POST /api/users/register` - Register a new user.
- `POST /api/users/login` - Log in an existing user.
- `GET /api/users/profile` - Get user profile information.

### Bus Endpoints:
- `POST /api/buses` - Add a new bus (Admin only).
- `GET /api/buses` - Get a list of all buses.
- `PUT /api/buses/:id` - Update bus information (Admin only).
- `DELETE /api/buses/:id` - Delete a bus (Admin only).

### Route Endpoints:
- `POST /api/routes` - Add a new route (Admin only).
- `GET /api/routes` - Get a list of all routes.
- `PUT /api/routes/:id` - Update route information (Admin only).
- `DELETE /api/routes/:id` - Delete a route (Admin only).

### Booking Endpoints:
- `POST /api/bookings` - Create a new booking.
- `GET /api/bookings` - Get a list of bookings for the logged-in user.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please contact Mohammad Ajmal Ebrahimi at [ajmalebrahemi2020@gmail.com].
