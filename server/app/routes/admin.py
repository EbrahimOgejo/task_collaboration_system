from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from app.extensions import db
from app.models.user import User

from app.services.auth_service import (
    create_user
)

from app.services.token_service import (
    generate_password_reset_token
)

from app.services.email_service import (
    send_reset_password_email
)

admin_bp = Blueprint("admin", __name__)


# ADMIN CHECK
def admin_required():
    current_user = User.query.get(
        int(get_jwt_identity())
    )

    return (
        current_user
        and current_user.role == "admin"
    )


# GET USERS
@admin_bp.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    if not admin_required():
        return jsonify({
            "error": "Admin access required"
        }), 403

    users = User.query.all()

    return jsonify([
        user.to_dict()
        for user in users
    ])


# INVITE USER
@admin_bp.route("/users", methods=["POST"])
@jwt_required()
def create_user_by_admin():
    if not admin_required():
        return jsonify({
            "error": "Admin access required"
        }), 403

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    role = data.get("role", "user")

    temp_password = "StrongTemp@12345!"

    user, message = create_user(
        username=username,
        email=email,
        password=temp_password,
        role=role,
        must_reset=True
    )

    if not user:
        return jsonify({
            "error": message
        }), 400

    token = generate_password_reset_token(user)

    onboarding_link = (
        f"{current_app.config['FRONTEND_URL']}"
        f"/reset-password/{token}"
    )

    try:
        send_reset_password_email(
            user,
            onboarding_link
        )
    except Exception as e:
        print("EMAIL ERROR:", str(e))

    return jsonify({
        "message": "User invited successfully.",
        "user": user.to_dict()
    }), 201


# TOGGLE USER STATUS
@admin_bp.route(
    "/users/<int:user_id>/toggle-status",
    methods=["PATCH"]
)
@jwt_required()
def toggle_user_status(user_id):
    if not admin_required():
        return jsonify({
            "error": "Admin access required"
        }), 403

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    user.is_active = not user.is_active

    db.session.commit()

    return jsonify({
        "message": "User status updated",
        "user": user.to_dict()
    })


# DELETE USER
@admin_bp.route(
    "/users/<int:user_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_user(user_id):
    current_user = User.query.get(
        int(get_jwt_identity())
    )

    if (
        not current_user
        or current_user.role != "admin"
    ):
        return jsonify({
            "error": "Admin access required"
        }), 403

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    # Prevent deleting self
    if current_user.id == user.id:
        return jsonify({
            "error": "You cannot delete your own account."
        }), 400

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        "message": "User deleted successfully."
    }), 200