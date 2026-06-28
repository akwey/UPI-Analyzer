"""Repository layer for Transaction data access.

Encapsulates all direct database queries so services never touch
SQLAlchemy session/query objects directly.
"""
from datetime import datetime, timedelta
from typing import List, Optional

from database.db import db
from models.transaction import Transaction


class TransactionRepository:
    @staticmethod
    def create(transaction: Transaction) -> Transaction:
        db.session.add(transaction)
        db.session.commit()
        return transaction

    @staticmethod
    def get_by_id(transaction_id: int) -> Optional[Transaction]:
        return Transaction.query.get(transaction_id)

    @staticmethod
    def get_all(
        date_filter: Optional[str] = None,
        type_filter: Optional[str] = None,
        category_filter: Optional[str] = None,
        search: Optional[str] = None,
        sort_by: Optional[str] = None,
    ) -> List[Transaction]:
        query = Transaction.query

        if date_filter:
            now = datetime.utcnow()
            if date_filter == "today":
                start = now.replace(hour=0, minute=0, second=0, microsecond=0)
                query = query.filter(Transaction.created_at >= start)
            elif date_filter == "7days":
                query = query.filter(Transaction.created_at >= now - timedelta(days=7))
            elif date_filter == "30days":
                query = query.filter(Transaction.created_at >= now - timedelta(days=30))

        if type_filter:
            query = query.filter(Transaction.transaction_type == type_filter)

        if category_filter:
            query = query.filter(Transaction.category == category_filter)

        if search:
            like_term = f"%{search}%"
            conditions = [
                Transaction.merchant.ilike(like_term),
                Transaction.category.ilike(like_term),
                Transaction.description.ilike(like_term),
            ]
            # Allow numeric search to match amount too
            try:
                numeric_value = float(search)
                conditions.append(Transaction.amount == numeric_value)
            except ValueError:
                pass
            query = query.filter(db.or_(*conditions))

        sort_map = {
            "newest": Transaction.created_at.desc(),
            "oldest": Transaction.created_at.asc(),
            "highest": Transaction.amount.desc(),
            "lowest": Transaction.amount.asc(),
            "merchant": Transaction.merchant.asc(),
        }
        query = query.order_by(sort_map.get(sort_by, Transaction.created_at.desc()))

        return query.all()

    @staticmethod
    def update(transaction: Transaction) -> Transaction:
        db.session.commit()
        return transaction

    @staticmethod
    def find_duplicate(raw_message: str, window_seconds: int = 5) -> Optional[Transaction]:
        """Detects an identical message submitted within a short time window."""
        cutoff = datetime.utcnow() - timedelta(seconds=window_seconds)
        return (
            Transaction.query.filter(
                Transaction.raw_message == raw_message,
                Transaction.created_at >= cutoff,
            )
            .order_by(Transaction.created_at.desc())
            .first()
        )

    @staticmethod
    def delete(transaction: Transaction) -> None:
        db.session.delete(transaction)
        db.session.commit()
