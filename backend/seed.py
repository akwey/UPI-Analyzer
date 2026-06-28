"""Optional helper to populate the database with sample transactions.

Run with: python seed.py
"""
from app import create_app
from services.transaction_service import DuplicateTransactionError, TransactionService

SAMPLE_MESSAGES = [
    "Paid Rs.250 to Zomato via UPI",
    "Paid Rs.450 to Swiggy via UPI",
    "Sent ₹120 to Uber",
    "Paid Rs.1200 to Amazon, cashback of Rs.60 credited as SuperCoins",
    "Debited INR 899 for Netflix subscription",
    "Received Rs 65,000 Salary credited from Acme Company Payroll",
    "Paid Rs.300 to Electricity Board for Electricity bill",
    "Sent ₹2,500 to Flipkart for Shopping",
    "Paid Rs.180 to Ola",
    "Received Rs 500 cashback Reward Points from PhonePe",
    "Paid Rs.75 to Mobile Recharge",
    "Debited INR 1500 at Apollo Pharmacy",
]


def run():
    app = create_app()
    service = TransactionService()

    with app.app_context():
        for message in SAMPLE_MESSAGES:
            try:
                txn = service.create_transaction(message)
                print(f"Added: {txn.merchant} | {txn.amount} | {txn.category}")
            except DuplicateTransactionError:
                print(f"Skipped duplicate: {message}")


if __name__ == "__main__":
    run()
