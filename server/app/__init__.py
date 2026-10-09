from flask import Flask
from dotenv import load_dotenv
import os


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    return app