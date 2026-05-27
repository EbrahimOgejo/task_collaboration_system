from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db
from .team_membership import team_membership


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    password_hash = db.Column(db.String(255), nullable=False)

    role = db.Column(db.String(20), default="user")
    is_active = db.Column(db.Boolean, default=True)
    must_reset_password = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    tasks = db.relationship(
        "Task",
        backref="owner",
        lazy=True,
        cascade="all, delete-orphan"
    )

    teams = db.relationship(
        "Team",
        secondary=team_membership,
        back_populates="members"
    )

    refresh_tokens = db.relationship(
        "RefreshToken",
        backref="user",
        cascade="all, delete-orphan"
    )

    password_reset_tokens = db.relationship(
        "PasswordResetToken",
        backref="user",
        cascade="all, delete-orphan"
    )

    email_logs = db.relationship(
        "EmailLog",
        backref="user",
        cascade="all, delete-orphan"
    )

    def set_password(self, password):
        self.password_hash = generate_password_hash(
         password,
         method="pbkdf2:sha256"
    )

    def check_password(self, password):
        return check_password_hash(
            self.password_hash,
            password
        )

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role,
            "is_active": self.is_active,
            "must_reset_password": self.must_reset_password
        }