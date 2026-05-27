from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.user import User
from app.models.password_reset_token import PasswordResetToken
from app.models.refresh_token import RefreshToken

from app.services.auth_service import (
    create_user,
    authenticate_user
)

from app.services.token_service import (
    generate_access_token,
    generate_refresh_token,
    generate_password_reset_token
)

from app.services.email_service import (
    send_welcome_email,
    send_reset_password_email,
    send_security_alert_email
)

from app.utils.validators import validate_password_strength
from flask import current_app

auth_bp = Blueprint("auth", __name__)


# REGISTER
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    user, message = create_user(
        username=username,
        email=email,
        password=password
    )

    if not user:
        return jsonify({"error": message}), 400
    
    try:
        send_welcome_email(user)
    except Exception as e:
        print("Email Error:", e)

    return jsonify({
        "message": "Registration successful."
    }), 201


# LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    identifier = data.get("email") or data.get("username")
    password = data.get("password")

    user = authenticate_user(identifier, password)

    if not user:
        return jsonify({
            "error": "Email/username and password are required"
        }), 400

    user = User.query.filter(
        (User.email == identifier) | (User.username == identifier)
    ).first()

    if not user:
        return jsonify({
            "error": "Invalid credentials"
        }), 401

    if not user.check_password(password):
        return jsonify({
            "error": "Invalid credentials"
        }), 401

    if not user.is_active:
        return jsonify({
            "error": "Account is inactive"
        }), 403

    access_token = generate_access_token(user)
    refresh_token = generate_refresh_token(user)

    return jsonify({
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": user.to_dict()
    }), 200


# REFRESH TOKEN
@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    new_access = generate_access_token(user)

    return jsonify({
        "access_token": new_access
    })


# LOGOUT
@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    user_id = int(get_jwt_identity())

    RefreshToken.query.filter_by(user_id=user_id).delete()
    db.session.commit()

    return jsonify({
        "message": "Logged out successfully."
    })


# FORGOT PASSWORD
@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json()

    email = data.get("email")

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "message": "If the email exists, reset instructions were sent."
        })

    token = generate_password_reset_token(user)

    reset_link = f"{current_app.config['FRONTEND_URL']}/reset-password/{token}"

    send_reset_password_email(user, reset_link)

    return jsonify({
        "message": "Reset email sent."
    })


# RESET PASSWORD
@auth_bp.route("/reset-password/<token>", methods=["POST"])
def reset_password(token):
    data = request.get_json()

    new_password = data.get("password")

    valid, message = validate_password_strength(new_password)

    if not valid:
        return jsonify({"error": message}), 400

    reset_record = PasswordResetToken.query.filter_by(
        token=token
    ).first()

    if not reset_record:
        return jsonify({"error": "Invalid token"}), 400

    user = User.query.get(reset_record.user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    user.set_password(new_password)
    user.must_reset_password = False

    db.session.delete(reset_record)
    db.session.commit()

    send_security_alert_email(user)

    return jsonify({
        "message": "Password reset successful."
    })


# FORCE PASSWORD RESET
@auth_bp.route("/force-reset-password", methods=["POST"])
@jwt_required()
def force_reset_password():
    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    new_password = data.get("password")

    valid, message = validate_password_strength(new_password)

    if not valid:
        return jsonify({"error": message}), 400

    user.set_password(new_password)
    user.must_reset_password = False

    db.session.commit()

    send_security_alert_email(user)

    return jsonify({
        "message": "Password updated successfully."
    })


# PROFILE
@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_me():
    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.to_dict())