"""Application entrypoint."""
import os

from flask import Flask
from flask_cors import CORS

from config import Config
from database.db import db
from routes.api import register_routes


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    register_routes(app)

    with app.app_context():
        os.makedirs(os.path.join(os.path.dirname(__file__), "database"), exist_ok=True)
        db.create_all()

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return {"status": "ok"}, 200

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
