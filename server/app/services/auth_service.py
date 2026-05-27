from app.models.user import User
from app.extensions import db
from app.utils.validators import validate_password_strength


def create_user(username, email, password, role="user", must_reset=False):
    valid, message = validate_password_strength(password)

    if not valid:
        return None, message

    existing = User.query.filter(
        (User.email == email) | (User.username == username)
    ).first()

    if existing:
        return None, "User already exists."

    user = User(
        username=username,
        email=email,
        role=role,
        must_reset_password=must_reset
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return user, "User created successfully."


def authenticate_user(identifier, password):
    user = User.query.filter(
        (User.email == identifier) | (User.username == identifier)
    ).first()

    if not user:
        return None

    if not user.check_password(password):
        return None

    if not user.is_active:
        return None

    return user