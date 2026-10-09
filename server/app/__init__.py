from flask import Flask
from dotenv import load_dotenv
import os
from .extensions import cors
from .routes.incidents import incidents_bp
def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    cors.init_app(app)

    app.register_blueprint(incidents_bp, url_prefix="/incidents")
    return app