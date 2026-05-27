from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.team import Team
from app.models.user import User

teams_bp = Blueprint("teams", __name__)


@teams_bp.route("/", methods=["GET"])
@jwt_required()
def get_teams():
    teams = Team.query.all()

    return jsonify([team.to_dict() for team in teams])


@teams_bp.route("/", methods=["POST"])
@jwt_required()
def create_team():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    data = request.get_json()

    team = Team(
        name=data.get("name"),
        description=data.get("description")
    )

    team.members.append(user)

    db.session.add(team)
    db.session.commit()

    return jsonify(team.to_dict()), 201


@teams_bp.route("/<int:team_id>/join", methods=["POST"])
@jwt_required()
def join_team(team_id):
    user_id = get_jwt_identity()

    user = User.query.get(user_id)
    team = Team.query.get(team_id)

    if not team:
        return jsonify({"error": "Team not found"}), 404

    if user not in team.members:
        team.members.append(user)
        db.session.commit()

    return jsonify({"message": "Joined team"})


@teams_bp.route("/<int:team_id>/leave", methods=["POST"])
@jwt_required()
def leave_team(team_id):
    user_id = get_jwt_identity()

    user = User.query.get(user_id)
    team = Team.query.get(team_id)

    if not team:
        return jsonify({"error": "Team not found"}), 404

    if user in team.members:
        team.members.remove(user)
        db.session.commit()

    return jsonify({"message": "Left team"})