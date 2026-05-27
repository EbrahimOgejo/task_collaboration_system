import secrets
import string

from flask import Blueprint, request, jsonify

from app.models.user import User
from app.extensions import db
from app.utils.decorators import admin_required
from app.services.email_service import send_temp_password_email

admin_bp = Blueprint("admin", __name__)


def generate_temp_password():
    chars = string.ascii_letters + string.digits + "!@#$%"
    return "".join(secrets.choice(chars) for _ in range(10))


@admin_bp.route("/users", methods=["GET"])
@admin_required
def get_users():
    users = User.query.all()

    return jsonify([user.to_dict() for user in users])


@admin_bp.route("/create-user", methods=["POST"])
@admin_required
def create_admin_user():
    data = request.get_json()

    temp_password = generate_temp_password()

    user = User(
        username=data.get("username"),
        email=data.get("email"),
        role=data.get("role", "user"),
        must_reset_password=True
    )

    user.set_password(temp_password)

    db.session.add(user)
    db.session.commit()

    send_temp_password_email(user, temp_password)

    return jsonify(user.to_dict()), 201


@admin_bp.route("/deactivate/<int:user_id>", methods=["PUT"])
@admin_required
def deactivate_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    user.is_active = False
    db.session.commit()

    return jsonify({"message": "User deactivated"})