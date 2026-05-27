import secrets
from flask_jwt_extended import create_access_token, create_refresh_token

from app.extensions import db
from app.models.refresh_token import RefreshToken
from app.models.password_reset_token import PasswordResetToken


def generate_access_token(user):
    return create_access_token(identity=str(user.id))


def generate_refresh_token(user):
    token = create_refresh_token(identity=str(user.id))

    saved = RefreshToken(
        token=token,
        user_id=user.id
    )

    db.session.add(saved)
    db.session.commit()

    return token


def generate_password_reset_token(user):
    token = secrets.token_urlsafe(32)

    reset = PasswordResetToken(
        token=token,
        user_id=user.id
    )

    db.session.add(reset)
    db.session.commit()

    return token