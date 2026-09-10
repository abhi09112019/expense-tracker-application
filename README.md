# Ledger — Expense Tracker

A full-stack expense tracking application built with **MongoDB, Express.js, React.js, and Node.js (MERN)**. Log, categorize, and monitor daily spending in real time, with a clean summary view and a category breakdown chart.

## Features

- **Log expenses** with a title, amount, category, date, and optional notes
- **Categorize** spending across 10 built-in categories (Food & Dining, Transportation, Housing, etc.)
- **Filter and search** expenses by category or title
- **Live summary** showing total spend, spend this month, entry count, and top category
- **Category breakdown chart** built with Recharts
- **Full CRUD** REST API backed by MongoDB/Mongoose, with server-side validation
- **Optimistic UI updates** with toast feedback and graceful error handling

## Tech stack

| Layer      | Technology                              |
| ---------- | ---------------------------------------- |
| Frontend   | React 18, Vite, Recharts, Axios          |
| Backend    | Node.js, Express.js                      |
| Database   | MongoDB with Mongoose ODM                |
| Validation | express-validator                        |

## Project structure

```
expense-tracker/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── models/Expense.js         # Mongoose schema
│   ├── controllers/expenseController.js
│   ├── routes/expenseRoutes.js
│   ├── middleware/                # validation + error handling
│   ├── server.js                 # Express app entrypoint
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/expenseApi.js     # Axios client
    │   ├── components/           # Header, Summary, Form, List, Filters, Chart
    │   ├── App.jsx
    │   └── index.css
    └── .env.example
```

## Getting started

### Prerequisites

- Node.js 18+
- A MongoDB instance — either [local](https://www.mongodb.com/try/download/community) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/expense-tracker.git
cd expense-tracker

# Backend
cd backend
npm install
cp .env.example .env   # then edit MONGO_URI if needed

# Frontend
cd ../frontend
npm install
cp .env.example .env   # defaults to http://localhost:5000/api
```

### 2. Run it

```bash
# Terminal 1 — from /backend
npm run dev

# Terminal 2 — from /frontend
npm run dev
```

The API runs on `http://localhost:5000` and the app on `http://localhost:5173`.

## API reference

| Method | Endpoint               | Description                              |
| ------ | ---------------------- | ----------------------------------------- |
| GET    | `/api/expenses`        | List expenses (`?category=`, `?month=YYYY-MM`, `?search=`) |
| GET    | `/api/expenses/:id`    | Get a single expense                      |
| POST   | `/api/expenses`        | Create an expense                         |
| PUT    | `/api/expenses/:id`    | Update an expense                         |
| DELETE | `/api/expenses/:id`    | Delete an expense                         |
| GET    | `/api/expenses/summary`| Aggregate totals by category and by month |
| GET    | `/api/health`          | Health check                              |

Example request body for `POST /api/expenses`:

```json
{
  "title": "Grocery run",
  "amount": 42.5,
  "category": "Food & Dining",
  "date": "2026-09-10",
  "notes": "Weekly shop"
}
```

## Possible next steps

- User authentication (JWT) so each person has their own ledger
- Recurring expenses and monthly budgets with alerts
- CSV export of filtered expenses
- Deploy: frontend to Vercel/Netlify, backend to Render/Railway, database on MongoDB Atlas

## License

MIT — see [LICENSE](LICENSE).
