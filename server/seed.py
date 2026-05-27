from app import create_app
from app.extensions import db

from app.models.user import User
from app.models.task import Task
from app.models.team import Team
from app.models.refresh_token import RefreshToken
from app.models.password_reset_token import PasswordResetToken
from app.models.email_log import EmailLog

app = create_app()

with app.app_context():
    print("Clearing existing data...")

    # Delete dependent records first
    EmailLog.query.delete()
    PasswordResetToken.query.delete()
    RefreshToken.query.delete()

    # Delete primary records
    Task.query.delete()
    Team.query.delete()
    User.query.delete()

    db.session.commit()

    print("Creating users...")

    admin = User(
        username="admin",
        email="admin@taskcollab.com",
        role="admin",
        must_reset_password=False,
        is_active=True
    )
    admin.set_password("Admin@123")

    user = User(
        username="user",
        email="user@taskcollab.com",
        role="user",
        must_reset_password=False,
        is_active=True
    )
    user.set_password("User@123")

    temp_user = User(
        username="tempuser",
        email="temp@taskcollab.com",
        role="user",
        must_reset_password=True,
        is_active=True
    )
    temp_user.set_password("Temp@123")

    db.session.add(admin)
    db.session.add(user)
    db.session.add(temp_user)
    db.session.commit()

    print("Creating teams...")

    engineering = Team(
        name="Engineering",
        description="Core software engineering team"
    )

    operations = Team(
        name="Operations",
        description="Operations and delivery team"
    )

    product = Team(
        name="Product",
        description="Product planning and execution"
    )

    db.session.add(engineering)
    db.session.add(operations)
    db.session.add(product)
    db.session.commit()

    print("Creating tasks...")

    task1 = Task(
        title="Set up production deployment",
        description="Configure deployment pipeline",
        completed=False,
        user_id=admin.id
    )

    task2 = Task(
        title="Prepare client onboarding",
        description="Create onboarding documentation",
        completed=True,
        user_id=user.id
    )

    task3 = Task(
        title="Database optimization",
        description="Improve PostgreSQL query performance",
        completed=False,
        user_id=admin.id
    )

    task4 = Task(
        title="Enterprise dashboard QA",
        description="Review analytics widgets",
        completed=False,
        user_id=temp_user.id
    )

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)

    db.session.commit()

    print("Database seeded successfully.")