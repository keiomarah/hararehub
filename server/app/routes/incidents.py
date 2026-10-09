from flask import Blueprint

incidents_bp = Blueprint("incidents", __name__)

@incidents_bp.post("/")
def log_incident():
    pass