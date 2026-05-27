from flask_mail import Message
from flask import current_app

from app.extensions import mail, db
from app.models.email_log import EmailLog


def send_email(user, subject, body):
    msg = Message(
        subject=subject,
        recipients=[user.email],
        body=body
    )

    mail.send(msg)

    log = EmailLog(
        recipient=user.email,
        subject=subject,
        user_id=user.id
    )

    db.session.add(log)
    db.session.commit()


def send_welcome_email(user):
    send_email(
        user,
        "Welcome to Task Collaboration System",
        f"Hello {user.username}, welcome to the platform."
    )


def send_temp_password_email(user, temp_password):
    send_email(
        user,
        "Temporary Password",
        f"Your temporary password is: {temp_password}. Please reset it on first login."
    )


def send_reset_password_email(user, reset_link):
    send_email(
        user,
        "Reset Your Password",
        f"Reset your password here: {reset_link}"
    )


def send_security_alert_email(user):
    send_email(
        user,
        "Security Alert",
        "Your password has been changed successfully."
    )