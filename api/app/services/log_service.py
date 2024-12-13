from app.models.log_model import Log
from app.extensions import db
from sqlalchemy import desc

def get_all_logs():
    """
    Returns all logs.
    """

    return Log.query.order_by(desc(Log.datetime)).all()


def create_log(log_data):
    """
    Create log
    """
    log = Log(
        class_value = log_data['class_value'],
        cap_shape = log_data['cap-shape'],
        cap_surface = log_data['cap-surface'],
        cap_color = log_data['cap-color'],
        bruises = log_data['bruises'],
        odor = log_data['odor'],
        gill_attachment = log_data['gill-attachment'],
        gill_spacing = log_data['gill-spacing'],
        gill_size = log_data['gill-size'],
        gill_color = log_data['gill-color'],
        stalk_shape = log_data['stalk-shape'],
        stalk_root = log_data['stalk-root'],
        stalk_surface_above_ring = log_data['stalk-surface-above-ring'],
        stalk_surface_below_ring = log_data['stalk-surface-below-ring'],
        stalk_color_above_ring = log_data['stalk-color-above-ring'],
        stalk_color_below_ring = log_data['stalk-color-below-ring'],
        veil_type = log_data['veil-type'],
        veil_color = log_data['veil-color'],
        ring_number = log_data['ring-number'],
        ring_type = log_data['ring-type'],
        spore_print_color = log_data['spore-print-color'],
        population = log_data['population'],
        habitat = log_data['habitat'],
        confidence = log_data['confidence']
    )

    db.session.add(log)
    db.session.commit()
    return log
