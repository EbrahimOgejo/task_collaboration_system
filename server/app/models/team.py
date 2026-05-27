from datetime import datetime
from app.extensions import db
from .team_membership import team_membership


class Team(db.Model):
    __tablename__ = "teams"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    members = db.relationship(
        "User",
        secondary=team_membership,
        back_populates="teams"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "member_count": len(self.members)
        }