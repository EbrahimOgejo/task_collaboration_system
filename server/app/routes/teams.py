from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.team import Team
from app.models.user import User

teams_bp = Blueprint("teams", __name__)


# GET ALL TEAMS
@teams_bp.route("/", methods=["GET"])
@jwt_required()
def get_teams():
    teams = Team.query.all()

    return jsonify([
        team.to_dict()
        for team in teams
    ])


# CREATE TEAM
@teams_bp.route("/", methods=["POST"])
@jwt_required()
def create_team():
    data = request.get_json()

    team = Team(
        name=data.get("name"),
        description=data.get("description")
    )

    db.session.add(team)
    db.session.commit()

    return jsonify(team.to_dict()), 201


# JOIN TEAM
@teams_bp.route("/<int:team_id>/join", methods=["POST"])
@jwt_required()
def join_team(team_id):
    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)
    team = Team.query.get(team_id)

    if not team:
        return jsonify({
            "error": "Team not found"
        }), 404

    if user in team.members:
        return jsonify({
            "message": "Already a member"
        }), 200

    team.members.append(user)

    db.session.commit()

    return jsonify({
        "message": "Joined team successfully"
    }), 200


# LEAVE TEAM
@teams_bp.route("/<int:team_id>/leave", methods=["POST"])
@jwt_required()
def leave_team(team_id):
    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)
    team = Team.query.get(team_id)

    if not team:
        return jsonify({
            "error": "Team not found"
        }), 404

    if user not in team.members:
        return jsonify({
            "message": "Not a member"
        }), 200

    team.members.remove(user)

    db.session.commit()

    return jsonify({
        "message": "Left team successfully"
    }), 200


# GET TEAM MEMBERS
@teams_bp.route("/<int:team_id>/members", methods=["GET"])
@jwt_required()
def get_team_members(team_id):
    team = Team.query.get(team_id)

    if not team:
        return jsonify({
            "error": "Team not found"
        }), 404

    return jsonify([
        member.to_dict()
        for member in team.members
    ])


# ADMIN ADD MEMBER
@teams_bp.route("/<int:team_id>/members", methods=["POST"])
@jwt_required()
def add_member(team_id):
    current_user = User.query.get(
        int(get_jwt_identity())
    )

    if current_user.role != "admin":
        return jsonify({
            "error": "Admin access required"
        }), 403

    data = request.get_json()

    user_id = data.get("user_id")

    user = User.query.get(user_id)
    team = Team.query.get(team_id)

    if not user or not team:
        return jsonify({
            "error": "User or Team not found"
        }), 404

    if user in team.members:
        return jsonify({
            "message": "Already a member"
        }), 200

    team.members.append(user)

    db.session.commit()

    return jsonify({
        "message": "Member added successfully"
    }), 200