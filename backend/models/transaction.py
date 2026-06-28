"""Transaction model."""
from datetime import datetime

from database.db import db


class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    raw_message = db.Column(db.String(1000), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    merchant = db.Column(db.String(255), nullable=False, default="Unknown Merchant")
    amount = db.Column(db.Float, nullable=False, default=0.0)
    transaction_type = db.Column(db.String(20), nullable=False, default="Unknown")  # Income | Expense | Unknown
    category = db.Column(db.String(50), nullable=False, default="Miscellaneous")
    is_manual_category = db.Column(db.Boolean, nullable=False, default=False)
    cashback_amount = db.Column(db.Float, nullable=True)
    reward_type = db.Column(db.String(50), nullable=True)  # Cashback | Reward Points | SuperCoins | Coins
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        cashback = None
        if self.cashback_amount is not None:
            cashback = {
                "rewardType": self.reward_type,
                "amount": self.cashback_amount,
            }

        return {
            "id": self.id,
            "description": self.description,
            "merchant": self.merchant,
            "amount": self.amount,
            "transactionType": self.transaction_type,
            "category": self.category,
            "isManualCategory": self.is_manual_category,
            "cashback": cashback,
            "createdAt": self.created_at.isoformat(),
            "updatedAt": self.updated_at.isoformat(),
        }
