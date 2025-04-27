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
cd hotel-management

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

## 📡 API Usage

### 1. Find all available rooms for a specific date

**Request:**
```bash
curl -X GET "http://localhost:3000/rooms/available?date=2025-04-20"
```

**Expected Response:**
```json
[
    {
        "room_id": 2,
        "room_number": "102",
        "type": "Deluxe",
        "price": 120.00,
        "status": "available",
        "created_at": "2025-01-15T10:00:00.000Z"
    },
    {
        "room_id": 5,
        "room_number": "203",
        "type": "Standard",
        "price": 80.00,
        "status": "available",
        "created_at": "2025-02-05T14:00:00.000Z"
    }
]
```

### 2. Add a new guest

**Request:**
```bash
curl -X POST http://localhost:3000/guests \
-H "Content-Type: application/json" \
-d '{
    "first_name": "Alexander",
    "last_name": "Petrenko",
    "email": "alexander.petrenko@example.com",
    "phone": "+1234567890",
    "address": "Kyiv, Independence Street, 12"
}'
```

**Expected Response:**
```json
{
    "guest_id": 1,
    "first_name": "Alexander",
    "last_name": "Petrenko",
    "email": "alexander.petrenko@example.com",
    "phone": "+1234567890",
    "address": "Kyiv, Independence Street, 12",
    "created_at": "2025-04-27T14:00:00.000Z"
}
```

### 3. Book a room for a specific guest

**Request:**
```bash
curl -X POST http://localhost:3000/bookings \
-H "Content-Type: application/json" \
-d '{
    "guest_id": 1,
    "room_id": 2,
    "check_in": "2025-04-20",
    "check_out": "2025-04-25",
    "total_price": 500.00
}'
```

**Expected Response:**
```json
{
    "booking_id": 1,
    "guest_id": 1,
    "room_id": 2,
    "check_in": "2025-04-20",
    "check_out": "2025-04-25",
    "total_price": 500.00,
    "status": "confirmed",
    "created_at": "2025-04-27T14:00:00.000Z"
}
```

### 4. Calculate the hotel's revenue for a specific month

**Request:**
```bash
curl -X GET "http://localhost:3000/bookings/revenue?year=2025&month=4"
```

**Expected Response:**
```json
{
    "revenue": 5000.00
}
```

## 📂 Project Structure
```
hotel-management/
├── server.js
├── .env
├── package.json
├── package-lock.json
├── db/
│   └── db.js
├── models/
│   ├── Guest.js
│   ├── Room.js
│   └── Booking.js
├── controllers/
│   ├── guestsController.js
│   ├── roomsController.js
│   └── bookingsController.js
├── routes/
│   ├── guestsRoutes.js
│   ├── roomsRoutes.js
│   └── bookingsRoutes.js
└── logs/
```

## 🐳 Using Docker

Create a `docker-compose.yml` file for the project.  
Start the containers:

```bash
docker-compose up --build
```
