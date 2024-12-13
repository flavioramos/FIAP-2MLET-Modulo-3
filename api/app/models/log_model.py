from werkzeug.security import generate_password_hash

from app.extensions import db
from sqlalchemy.sql import func


class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.DateTime(timezone=True), default=func.now())
    class_value = db.Column(db.String[1])
    cap_shape = db.Column(db.String[1])
    cap_surface = db.Column(db.String[1])
    cap_color = db.Column(db.String[1])
    bruises = db.Column(db.String[1])
    odor = db.Column(db.String[1])
    gill_attachment = db.Column(db.String[1])
    gill_spacing = db.Column(db.String[1])
    gill_size = db.Column(db.String[1])
    gill_color = db.Column(db.String[1])
    stalk_shape = db.Column(db.String[1])
    stalk_root = db.Column(db.String[1])
    stalk_surface_above_ring = db.Column(db.String[1])
    stalk_surface_below_ring = db.Column(db.String[1])
    stalk_color_above_ring = db.Column(db.String[1])
    stalk_color_below_ring = db.Column(db.String[1])
    veil_type = db.Column(db.String[1])
    veil_color = db.Column(db.String[1])
    ring_number = db.Column(db.String[1])
    ring_type = db.Column(db.String[1])
    spore_print_color = db.Column(db.String[1])
    population = db.Column(db.String[1])
    habitat = db.Column(db.String[1])
    confidence = db.Column(db.Float)

    def to_dict(self):
        return {
            "id": self.id,
            "datetime": self.datetime,
            "class_value": self.class_value,
            "cap-shape": self.cap_shape,
            "cap-surface": self.cap_surface,
            "cap-color": self.cap_color,
            "bruises": self.bruises,
            "odor": self.odor,
            "gill-attachment": self.gill_attachment,
            "gill-spacing": self.gill_spacing,
            "gill-size": self.gill_size,
            "gill-color": self.gill_color,
            "stalk-shape": self.stalk_shape,
            "stalk-root": self.stalk_root,
            "stalk-surface-above-ring": self.stalk_surface_above_ring,
            "stalk-surface-below-ring": self.stalk_surface_below_ring,
            "stalk-color-above-ring": self.stalk_color_above_ring,
            "stalk-color-below-ring": self.stalk_color_below_ring,
            "veil-type": self.veil_type,
            "veil-color": self.veil_color,
            "ring-number": self.ring_number,
            "ring-type": self.ring_type,
            "spore-print-color": self.spore_print_color,
            "population": self.population,
            "habitat": self.habitat,
            "confidence": self.confidence
        }
    

