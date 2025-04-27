# Hotel Management API

This project provides an API for managing a hotel with the following features:
- Add new guests.
- Book rooms for guests.
- View available rooms for a specific date.
- Calculate hotel revenue for a specified month.

## 🚀 Features
1. **Find all available rooms for a specific date.**
2. **Add a new guest.**
3. **Book a room for a specific guest.**
4. **Calculate the hotel's revenue for a specific month.**

## 🛠 Installation and Setup
```bash
# 1. Clone the repository:
git clone https://your-repo-url.git
cd hotel

# 2. Install dependencies:
npm install

# 3. Setup environment variables:
# Create a .env file in the root of the project and add the following:
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=hotel_db
PORT=3000

# 4. Start the server:
node server.js

# 5. Verify the server is running:
# You should see the following message in the terminal:
# Server is running on http://localhost:3000
```

## REST API Usage

**All detailed information is on SWAGGER page**
```
http://localhost:3000/api-docs/
```


## Project Structure
```
hotel/
├── controllers
│   ├── bookingsController.js
│   ├── guestsController.js
│   └── roomsController.js
├── db
│   └── db.js
├── logs
│   └── server.log
├── middleware
│   ├── logger.js
│   └── swagger.json
├── models
│   ├── Booking.js
│   ├── Guest.js
│   └── Room.js
├── routes
│   ├── bookingsRoutes.js
│   ├── guestsRoutes.js
│   ├── roomsRoutes.js
│   └── swagger.js
├── docker-compose.yml
├── Dockerfile
├── README.md
└── server.js
```

## Using Docker

Create a `docker-compose.yml` file for the project.  
Start the containers:

```bash
docker-compose up --build
```
