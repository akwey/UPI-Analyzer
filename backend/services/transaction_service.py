"""Orchestrates parsing, categorization, and cashback detection,
and applies all transaction-related business rules.
"""
from typing import List, Optional

from models.transaction import Transaction
from repositories.transaction_repository import TransactionRepository
from services.cashback_service import detect_cashback
from services.category_service import VALID_CATEGORIES, categorize_transaction
from services.parser_service import parse_transaction_message


class DuplicateTransactionError(Exception):
    """Raised when the same raw message is submitted again within a short window."""


class InvalidCategoryError(Exception):
    """Raised when a manual category update uses an unrecognized category."""


class TransactionService:
    def __init__(self, repository: TransactionRepository = None):
        self.repository = repository or TransactionRepository()

    def create_transaction(self, raw_message: str) -> Transaction:
        raw_message = (raw_message or "").strip()

        if not raw_message:
            raise ValueError("Transaction message cannot be empty.")

        duplicate = self.repository.find_duplicate(raw_message)
        if duplicate:
            raise DuplicateTransactionError(
                "An identical transaction was just recorded. Skipping duplicate."
            )

        parsed = parse_transaction_message(raw_message)
        category = categorize_transaction(parsed["merchant"], raw_message)
        cashback = detect_cashback(raw_message)

        transaction = Transaction(
            raw_message=raw_message,
            description=raw_message,
            merchant=parsed["merchant"],
            amount=parsed["amount"],
            transaction_type=parsed["transactionType"],
            category=category,
            cashback_amount=cashback["amount"] if cashback else None,
            reward_type=cashback["rewardType"] if cashback else None,
        )

        return self.repository.create(transaction)

    def get_transactions(
        self,
        date_filter: Optional[str] = None,
        type_filter: Optional[str] = None,
        category_filter: Optional[str] = None,
        search: Optional[str] = None,
        sort_by: Optional[str] = None,
    ) -> List[Transaction]:
        return self.repository.get_all(
            date_filter=date_filter,
            type_filter=type_filter,
            category_filter=category_filter,
            search=search,
            sort_by=sort_by,
        )

    def update_category(self, transaction_id: int, new_category: str) -> Transaction:
        if new_category not in VALID_CATEGORIES:
            raise InvalidCategoryError(f"'{new_category}' is not a recognized category.")

        transaction = self.repository.get_by_id(transaction_id)
        if not transaction:
            raise LookupError(f"Transaction {transaction_id} was not found.")

        transaction.category = new_category
        transaction.is_manual_category = True
        return self.repository.update(transaction)
