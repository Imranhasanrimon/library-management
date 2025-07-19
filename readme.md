# 📚 Library Management API

A RESTful API built with **Express.js**, **TypeScript**, and **MongoDB** (Mongoose) for managing a library's books and borrow records.

---

## 🚀 Features

- 📘 Book Management (CRUD)
- 📦 Borrow Book Logic with Quantity Tracking
- 🖁️ Book Availability Status Update
- 📊 Aggregated Borrow Summary
- ✅ Mongoose Validation and Instance Methods
- 🛡️ Centralized Error Handling

---


---

## ⚙️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Imranhasanrimon/library-management.git
   cd library-management
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables** Create a `.env` file:

   ```env
   PORT=3000
   DATABASE_URL=your_mongodb_connection_string
   ```

4. **Run the server**

   ```bash
   npm run dev
   ```

---

## 📌 API Endpoints

### 📘 Book Routes

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/books`         | Create a new book |
| GET    | `/api/books`         | Get all books     |
| GET    | `/api/books/:bookId` | Get a single book |
| PATCH  | `/api/books/:bookId` | Update book info  |
| DELETE | `/api/books/:bookId` | Delete a book     |

Supports:

- `?filter=genreName`
- `?sortBy=title&sort=desc`
- `?limit=5`

---

### 📦 Borrow Routes

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| POST   | `/api/borrow`         | Borrow a book (deduct copies) |
| GET    | `/api/borrow`         | Get total borrowed per book   |

---

## 🧠 Business Logic Highlights

- Only allows borrowing if enough copies are available.
- Automatically sets `available: false` when copies drop to 0.
- Uses Mongoose instance methods to update availability.
- Aggregation pipeline summarizes borrow records.

---

## 🧺 Sample Request

```http
POST /api/borrow
Content-Type: application/json

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

---

## ⚠️ Error Handling

All routes use centralized error handling with appropriate status codes.

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

---

## 🧩 Future Improvements

- User Authentication & Authorization
- Pagination
- Book return logic
- Admin panel (frontend)

---

## 🧑‍💻 Author

**Imran Hasan**\
📍 Rajshahi, Bangladesh 


---

