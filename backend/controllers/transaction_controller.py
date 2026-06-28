"""HTTP controller layer for transaction-related endpoints.

Controllers translate between HTTP and the service layer; they hold no
business logic themselves.
"""
from flask import Blueprint, jsonify, request

from repositories.transaction_repository import TransactionRepository
from services.analytics_service import AnalyticsService
from services.transaction_service import (
    DuplicateTransactionError,
    InvalidCategoryError,
    TransactionService,
)

transaction_bp = Blueprint("transactions", __name__)

transaction_service = TransactionService()
repository = TransactionRepository()


@transaction_bp.route("/transactions", methods=["GET"])
def get_transactions():
    date_filter = request.args.get("dateFilter")
    type_filter = request.args.get("type")
    category_filter = request.args.get("category")
    search = request.args.get("search")
    sort_by = request.args.get("sortBy", "newest")

    transactions = transaction_service.get_transactions(
        date_filter=date_filter,
        type_filter=type_filter,
        category_filter=category_filter,
        search=search,
        sort_by=sort_by,
    )

    return jsonify([t.to_dict() for t in transactions]), 200


@transaction_bp.route("/transactions", methods=["POST"])
def create_transaction():
    payload = request.get_json(silent=True) or {}
    raw_message = payload.get("message", "")

    try:
        transaction = transaction_service.create_transaction(raw_message)
        return jsonify(transaction.to_dict()), 201
    except DuplicateTransactionError as exc:
        return jsonify({"error": str(exc)}), 409
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400


@transaction_bp.route("/transactions/<int:transaction_id>", methods=["PUT"])
def update_transaction(transaction_id: int):
    payload = request.get_json(silent=True) or {}
    new_category = payload.get("category", "")

    try:
        transaction = transaction_service.update_category(transaction_id, new_category)
        return jsonify(transaction.to_dict()), 200
    except InvalidCategoryError as exc:
        return jsonify({"error": str(exc)}), 400
    except LookupError as exc:
        return jsonify({"error": str(exc)}), 404


@transaction_bp.route("/dashboard", methods=["GET"])
def get_dashboard():
    transactions = repository.get_all()
    dashboard = AnalyticsService.build_dashboard(transactions)
    return jsonify(dashboard), 200


@transaction_bp.route("/analytics", methods=["GET"])
def get_analytics():
    transactions = repository.get_all()
    analytics = AnalyticsService.build_analytics(transactions)
    return jsonify(analytics), 200
