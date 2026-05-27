from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from app.models.task import Task
from app.models.team import Team

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/stats", methods=["GET"])
@jwt_required()
def dashboard_stats():
    total_tasks = Task.query.count()
    completed_tasks = Task.query.filter_by(
        completed=True
    ).count()

    pending_tasks = Task.query.filter_by(
        completed=False
    ).count()

    teams = Team.query.count()

    return jsonify({
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "teams": teams
    })