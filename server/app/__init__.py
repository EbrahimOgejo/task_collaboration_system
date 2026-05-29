from flask import Flask

from .config import Config
from .extensions import db, migrate, jwt, mail, cors

from app.routes.auth import auth_bp
from app.routes.tasks import tasks_bp
from app.routes.teams import teams_bp
from app.routes.admin import admin_bp
from app.routes.dashboard import dashboard_bp


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)

    migrate.init_app(app, db)

    jwt.init_app(app)

    mail.init_app(app)

    cors.init_app(
        app,
        resources={
            r"/api/*": {
                "origins": "*"
            }
        },
        supports_credentials=True
    )

    app.register_blueprint(
        auth_bp,
        url_prefix="/api/auth"
    )

    app.register_blueprint(
        tasks_bp,
        url_prefix="/api/tasks"
    )

    app.register_blueprint(
        teams_bp,
        url_prefix="/api/teams"
    )

    app.register_blueprint(
        admin_bp,
        url_prefix="/api/admin"
    )

    app.register_blueprint(
        dashboard_bp,
        url_prefix="/api/dashboard"
    )

    return app