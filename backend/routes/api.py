"""Registers all API blueprints onto the Flask app."""
from controllers.transaction_controller import transaction_bp


def register_routes(app):
    app.register_blueprint(transaction_bp, url_prefix="/api")
