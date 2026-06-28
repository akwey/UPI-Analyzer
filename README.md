# Smart UPI Transaction Analyzer

A full-stack app that turns raw UPI/bank SMS text into a categorized, analyzed
transaction feed — built like the transaction screen of a modern banking app.

```
upi-analyzer/
├── backend/   Flask REST API (parsing, categorization, analytics)
└── frontend/  React + TypeScript + Tailwind dashboard
```

## Architecture

**Backend** follows MVC + Service + Repository layers:

- `models/` — SQLAlchemy `Transaction` model
- `repositories/` — all direct DB queries (filtering, sorting, dedup lookup)
- `services/` — business logic, isolated by concern:
  - `parser_service.py` — extracts amount, merchant, transaction type from raw text
  - `category_service.py` — keyword-based auto-categorization
  - `cashback_service.py` — detects cashback/reward mentions
  - `transaction_service.py` — orchestrates the above + business rules (dedup, manual overrides)
  - `analytics_service.py` — builds dashboard totals and chart data
- `controllers/` — Flask blueprints/routes; thin, no business logic
- `routes/api.py` — blueprint registration

**Frontend** is a pure rendering layer — all calculations happen on the backend:

- `services/api.ts` — typed API client
- `hooks/useTransactions.ts` — React Query hooks (fetch + mutate + cache invalidation)
- `components/` — `TransactionCard`, `SummaryCards`, `CategoryPieChart`,
  `CategoryProgressBars`, `FilterBar`, `SearchBar`, `AddTransactionForm`, etc.
- `pages/Dashboard.tsx` — assembles everything into the main screen

## Setup

### 1. Backend (Python 3.10+)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py                    # runs on http://localhost:5000
```

Optional — populate sample data:

```bash
python seed.py
```

The SQLite database file is created automatically at `backend/database/app.db`
on first run.

### 2. Frontend (Node 18+)

```bash
cd frontend
npm install
npm run dev                      # runs on http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `http://localhost:5000`, so
just run both servers side by side and open `http://localhost:5173`.

### Production build

```bash
cd frontend
npm run build       # outputs static files to frontend/dist
```

Serve `frontend/dist` with any static host, and run the Flask API behind a
production WSGI server (e.g. gunicorn) with `CORS` origins locked to your
frontend's domain.

## Sample API requests

**Add a transaction**

```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"message": "Paid Rs.250 to Zomato via UPI"}'
```

Response:

```json
{
  "id": 1,
  "merchant": "Zomato",
  "amount": 250.0,
  "transactionType": "Expense",
  "category": "Food",
  "isManualCategory": false,
  "cashback": null,
  "description": "Paid Rs.250 to Zomato via UPI",
  "createdAt": "2026-06-28T10:15:00",
  "updatedAt": "2026-06-28T10:15:00"
}
```

**List transactions (with filters)**

```bash
curl "http://localhost:5000/api/transactions?dateFilter=7days&type=Expense&sortBy=highest"
```

**Search transactions**

```bash
curl "http://localhost:5000/api/transactions?search=zomato"
```

**Update a transaction's category**

```bash
curl -X PUT http://localhost:5000/api/transactions/1 \
  -H "Content-Type: application/json" \
  -d '{"category": "Entertainment"}'
```

**Dashboard summary**

```bash
curl http://localhost:5000/api/dashboard
```

```json
{
  "totalIncome": 65000.0,
  "totalExpense": 4974.0,
  "balance": 60026.0,
  "totalCashback": 560.0,
  "categoryTotals": { "Food": 700.0, "Travel": 300.0 }
}
```

**Analytics (charts)**

```bash
curl http://localhost:5000/api/analytics
```

```json
{
  "pieChartData": [{ "category": "Food", "amount": 700.0, "percentage": 14.1 }],
  "progressBarData": [{ "category": "Food", "amount": 700.0, "percentage": 14.1 }],
  "topSpendingCategory": "Food",
  "highestExpenseTransaction": { "merchant": "Apollo Pharmacy", "amount": 1500.0, "...": "..." },
  "averageTransaction": 414.5
}
```

## Notes on edge-case handling

- Empty/unparsable messages never crash the parser — they fall back to
  `Unknown Merchant` / `Miscellaneous` / `Unknown` type with amount `0`.
- Negative amounts are treated as invalid and clamped to `0`.
- Identical raw messages submitted within a 5-second window are rejected as
  duplicates (`409 Conflict`).
- Cashback mentions without a parsable amount still create a cashback entry
  with `amount: null`, so the UI can show "reward earned" without a figure.
- Manual category edits set `isManualCategory: true` and are never
  overwritten by re-parsing.
# UPI-Analyzer
# UPI-Analyzer
