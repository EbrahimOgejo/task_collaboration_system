from flask_mail import Message
from flask import current_app

from app.extensions import mail, db
from app.models.email_log import EmailLog


def send_email(user, subject, body):
    msg = Message(
        subject=subject,
        recipients=[user.email],
        body=body,
        sender=current_app.config[
            "MAIL_DEFAULT_SENDER"
        ]
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
        f"""
Hello {user.username},

Welcome to Task Collaboration System.

Your account has been created successfully.

Regards,
TaskCollab Team
"""
    )


def send_temp_password_email(user, temp_password):
    send_email(
        user,
        "Temporary Password",
        f"""
Hello {user.username},

Your temporary password is:

{temp_password}

Please reset it after login.
"""
    )


def send_reset_password_email(
    user,
    reset_link
):
    send_email(
        user,
        "Set Up Your Account",
        f"""
Hello {user.username},

An account has been created for you.

Please click the link below to set your password and activate your account:

{reset_link}

If you did not expect this email, please ignore it.

Regards,
TaskCollab Team
"""
    )


def send_security_alert_email(user):
    send_email(
        user,
        "Security Alert",
        f"""
Hello {user.username},

Your password was changed successfully.

If this was not you, contact support immediately.
"""
    )