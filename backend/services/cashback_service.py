"""Detects cashback and reward mentions in transaction text."""
import re
from typing import Optional, TypedDict

REWARD_TYPE_PATTERNS = [
    ("SuperCoins", re.compile(r"supercoins?", re.IGNORECASE)),
    ("Reward Points", re.compile(r"reward\s*points?", re.IGNORECASE)),
    ("Coins", re.compile(r"\bcoins?\b", re.IGNORECASE)),
    ("Cashback", re.compile(r"cash\s*back", re.IGNORECASE)),
]

# Looks for an amount specifically tied to the cashback mention, e.g.
# "cashback of Rs.20" or "Rs 20 cashback".
CASHBACK_AMOUNT_PATTERN = re.compile(
    r"(?:cash\s*back|reward\s*points?|supercoins?|coins?)[^0-9₹]{0,15}"
    r"(?:rs\.?|inr|₹)?\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)",
    re.IGNORECASE,
)


class CashbackInfo(TypedDict):
    rewardType: str
    amount: Optional[float]


def detect_cashback(message: str) -> Optional[CashbackInfo]:
    """Returns cashback info if the message mentions a reward, else None.

    If a reward keyword is found but no specific amount accompanies it,
    `amount` is None (handled as the 'cashback without amount' edge case).
    """
    for reward_type, pattern in REWARD_TYPE_PATTERNS:
        if pattern.search(message):
            amount_match = CASHBACK_AMOUNT_PATTERN.search(message)
            amount = None
            if amount_match:
                try:
                    amount = float(amount_match.group(1).replace(",", ""))
                except ValueError:
                    amount = None
            return {"rewardType": reward_type, "amount": amount}

    return None
