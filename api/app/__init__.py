from flask import Flask
from werkzeug.routing import BaseConverter
from flask_cors import CORS

from .extensions import db, migrate, jwt
from .routes import register_routes
from .services import user_service, mushroom_service


class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]


def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.config.from_object('app.config.Config')
    app.url_map.converters['regex'] = RegexConverter

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    register_routes(app)

    @app.cli.command("init-db")
    def init_db():
        """
        Create tables and admin user
        """
        db.create_all()
        user_service.init_db()

    @app.cli.command("train")
    def train():
        """
        Train the model
        """
        accuracy = mushroom_service.train()
        print(f'Trained with accuracy: {accuracy}')

    return app
