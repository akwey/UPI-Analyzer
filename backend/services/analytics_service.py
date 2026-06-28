"""Aggregates transactions into dashboard summaries and chart-ready analytics."""
from collections import defaultdict
from typing import List

from models.transaction import Transaction


class AnalyticsService:
    @staticmethod
    def build_dashboard(transactions: List[Transaction]) -> dict:
        total_income = 0.0
        total_expense = 0.0
        total_cashback = 0.0
        category_totals = defaultdict(float)

        for txn in transactions:
            if txn.transaction_type == "Income":
                total_income += txn.amount
            elif txn.transaction_type == "Expense":
                total_expense += txn.amount
                category_totals[txn.category] += txn.amount

            if txn.cashback_amount:
                total_cashback += txn.cashback_amount

        return {
            "totalIncome": round(total_income, 2),
            "totalExpense": round(total_expense, 2),
            "balance": round(total_income - total_expense, 2),
            "totalCashback": round(total_cashback, 2),
            "categoryTotals": {k: round(v, 2) for k, v in category_totals.items()},
        }

    @staticmethod
    def build_analytics(transactions: List[Transaction]) -> dict:
        expense_transactions = [t for t in transactions if t.transaction_type == "Expense"]

        category_totals = defaultdict(float)
        for txn in expense_transactions:
            category_totals[txn.category] += txn.amount

        total_expense = sum(category_totals.values())

        pie_chart_data = [
            {
                "category": category,
                "amount": round(amount, 2),
                "percentage": round((amount / total_expense) * 100, 1) if total_expense else 0,
            }
            for category, amount in sorted(category_totals.items(), key=lambda x: x[1], reverse=True)
        ]

        progress_bar_data = pie_chart_data  # Same shape; rendered differently on the frontend.

        top_category = pie_chart_data[0]["category"] if pie_chart_data else None

        highest_expense_txn = max(expense_transactions, key=lambda t: t.amount, default=None)
        average_transaction = (
            round(total_expense / len(expense_transactions), 2) if expense_transactions else 0
        )

        return {
            "pieChartData": pie_chart_data,
            "progressBarData": progress_bar_data,
            "topSpendingCategory": top_category,
            "highestExpenseTransaction": highest_expense_txn.to_dict() if highest_expense_txn else None,
            "averageTransaction": average_transaction,
        }
