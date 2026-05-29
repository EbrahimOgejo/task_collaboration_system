import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY"
    )

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAIL_SERVER = os.getenv(
        "MAIL_SERVER"
    )

    MAIL_PORT = int(
        os.getenv("MAIL_PORT", 465)
    )

    MAIL_USE_TLS = (
        os.getenv(
            "MAIL_USE_TLS",
            "False"
        ) == "True"
    )

    MAIL_USE_SSL = (
        os.getenv(
            "MAIL_USE_SSL",
            "True"
        ) == "True"
    )

    MAIL_USERNAME = os.getenv(
        "MAIL_USERNAME"
    )

    MAIL_PASSWORD = os.getenv(
        "MAIL_PASSWORD"
    )

    MAIL_DEFAULT_SENDER = os.getenv(
        "MAIL_DEFAULT_SENDER"
    )

    FRONTEND_URL = os.getenv(
        "FRONTEND_URL"
    )