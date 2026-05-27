from datetime import datetime
from app.extensions import db


class EmailLog(db.Model):
    __tablename__ = "email_logs"

    id = db.Column(db.Integer, primary_key=True)

    recipient = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(255), nullable=False)

    sent_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )