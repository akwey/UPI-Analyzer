"""Parses raw bank/UPI transaction messages into structured data.

Designed to be defensive: any unrecognized format degrades gracefully to
'Unknown Merchant' / 'Unknown Category' rather than raising an error.
"""
import re
from typing import Optional, TypedDict


class ParsedTransaction(TypedDict):
    amount: float
    merchant: str
    transactionType: str  # Income | Expense | Unknown


# Keywords that indicate money leaving the account.
EXPENSE_KEYWORDS = ["paid", "sent", "debited", "spent", "withdrawn", "purchase"]

# Keywords that indicate money entering the account.
INCOME_KEYWORDS = ["received", "credited", "deposited", "credit"]

# Words that should never be captured as a merchant name.
MERCHANT_STOPWORDS = {
    "via", "upi", "using", "on", "for", "at", "with", "ref", "imps", "neft",
    "rtgs", "txn", "transaction", "no", "id", "a/c", "account", "bank",
}

# Matches amounts like "Rs.250", "Rs 250", "INR 400", "₹100", "12,000.50"
AMOUNT_PATTERN = re.compile(
    r"(?:rs\.?|inr|₹)\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)",
    re.IGNORECASE,
)

# Fallback: a bare number with optional decimals/commas, used only if the
# currency-prefixed pattern above finds nothing.
FALLBACK_AMOUNT_PATTERN = re.compile(r"\b([0-9][0-9,]*(?:\.[0-9]{1,2})?)\b")

# Captures a merchant name following "to <merchant>" or "from <merchant>",
# stopping at common trailing connector words.
MERCHANT_PATTERN = re.compile(
    r"\b(?:to|from)\s+([A-Za-z][A-Za-z0-9&'.\- ]*)",
    re.IGNORECASE,
)


def _extract_amount(message: str) -> float:
    match = AMOUNT_PATTERN.search(message)
    if not match:
        match = FALLBACK_AMOUNT_PATTERN.search(message)
    if not match:
        return 0.0

    cleaned = match.group(1).replace(",", "")
    try:
        value = float(cleaned)
    except ValueError:
        return 0.0

    # Negative or nonsensical amounts are treated as invalid -> 0.
    return value if value >= 0 else 0.0


def _clean_merchant_fragment(fragment: str) -> str:
    words = fragment.strip().split()
    cleaned_words = []
    for word in words:
        normalized = word.strip(".,").lower()
        if normalized in MERCHANT_STOPWORDS:
            break
        cleaned_words.append(word.strip(".,"))
    return " ".join(cleaned_words).strip()


def _extract_merchant(message: str) -> Optional[str]:
    match = MERCHANT_PATTERN.search(message)
    if not match:
        return None

    merchant = _clean_merchant_fragment(match.group(1))
    return merchant.title() if merchant else None


def _extract_transaction_type(message: str) -> str:
    lowered = message.lower()

    for keyword in EXPENSE_KEYWORDS:
        if keyword in lowered:
            return "Expense"

    for keyword in INCOME_KEYWORDS:
        if keyword in lowered:
            return "Income"

    return "Unknown"


def parse_transaction_message(raw_message: str) -> ParsedTransaction:
    """Parses a raw transaction message into amount, merchant, and type.

    Never raises; unparseable fields fall back to safe defaults so the
    caller can always persist a transaction record.
    """
    message = (raw_message or "").strip()

    if not message:
        return {"amount": 0.0, "merchant": "Unknown Merchant", "transactionType": "Unknown"}

    amount = _extract_amount(message)
    merchant = _extract_merchant(message) or "Unknown Merchant"
    transaction_type = _extract_transaction_type(message)

    return {
        "amount": amount,
        "merchant": merchant,
        "transactionType": transaction_type,
    }
