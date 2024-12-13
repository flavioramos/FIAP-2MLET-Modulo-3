url_prefix = "/api/v1"


def register_routes(app):
    from .user_routes import user_bp
    from .auth_routes import auth_bp
    from .mushroom_routes import mushroom_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(mushroom_bp)
