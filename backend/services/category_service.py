"""Automatic merchant categorization based on keyword matching."""
from typing import Dict, List

CATEGORY_KEYWORDS: Dict[str, List[str]] = {
    "Food": ["zomato", "swiggy", "dominos", "pizza hut", "starbucks", "mcdonald", "kfc", "restaurant", "cafe"],
    "Travel": ["uber", "ola", "rapido", "metro", "irctc", "indigo", "redbus", "fuel", "petrol", "diesel"],
    "Salary": ["salary", "payroll", "company", "employer", "wages"],
    "Shopping": ["amazon", "flipkart", "myntra", "ajio", "nykaa", "meesho"],
    "Bills": ["electricity", "gas", "water", "mobile recharge", "broadband", "dth", "wifi", "internet bill"],
    "Entertainment": ["netflix", "spotify", "hotstar", "prime video", "bookmyshow", "pvr", "inox"],
    "Medical": ["pharmacy", "hospital", "clinic", "apollo", "medplus", "diagnostics", "medical"],
}

DEFAULT_CATEGORY = "Miscellaneous"

VALID_CATEGORIES = list(CATEGORY_KEYWORDS.keys()) + [DEFAULT_CATEGORY]


def categorize_transaction(merchant: str, description: str) -> str:
    """Matches merchant/description text against keyword map, case-insensitively.

    Falls back to 'Miscellaneous' when no keyword matches.
    """
    haystack = f"{merchant} {description}".lower()

    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            if keyword.lower() in haystack:
                return category

    return DEFAULT_CATEGORY
