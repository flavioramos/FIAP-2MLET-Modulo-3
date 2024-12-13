from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.routes import url_prefix
from app.services import mushroom_service, log_service

mushroom_bp = Blueprint('mushroom', __name__, url_prefix=f'{url_prefix}/mushroom')


@mushroom_bp.route('/train', methods=['GET'])
@jwt_required()
def train():
    """
        Train the model
    """
    accuracy = mushroom_service.train()

    return {
        "accurracy": f'{round(accuracy*100, 3)}%'
    }


@mushroom_bp.route('/classify', methods=['POST'])
@jwt_required()
def classify():
  """
      Classify mushroom based on received object
  """
  mushroom_data = request.get_json()

  class_label, confidence = mushroom_service.classify_mushroom(mushroom_data)

  mushroom_data["class_value"] = class_label
  mushroom_data["confidence"] = confidence

  log_service.create_log(mushroom_data)

  return {
     "class": class_label,
     "confidence": confidence
  }


@mushroom_bp.route('/history', methods=['GET'])
@jwt_required()
def get_history():
    """
        Returns all log history.
    """
    logs = log_service.get_all_logs()
    return jsonify([log.to_dict() for log in logs])
