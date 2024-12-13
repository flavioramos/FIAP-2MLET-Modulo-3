import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder

from app.services import dataset_provider_service

# from sklearn.tree import DecisionTreeClassifier
# model = DecisionTreeClassifier()

# from sklearn.neighbors import KNeighborsClassifier
# model = KNeighborsClassifier()

from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=23)

column_names = [
    "class", "cap-shape", "cap-surface", "cap-color", "bruises", "odor",
    "gill-attachment", "gill-spacing", "gill-size", "gill-color", "stalk-shape", "stalk-root",
    "stalk-surface-above-ring", "stalk-surface-below-ring",
    "stalk-color-above-ring", "stalk-color-below-ring", "veil-type", "veil-color",
    "ring-number", "ring-type", "spore-print-color", "population", "habitat"
]

encoders = {}

def train():
    """
    Download dataset and train de model
    """
    dataset_provider_service.download()


    global model

    df = pd.read_csv('../dataset/mushrooms.csv')

    x = df.drop("class", axis=1)
    y = df["class"]

    for column in x.columns:
        le = LabelEncoder()
        x[column] = le.fit_transform(x[column])
        encoders[column] = le

    y_encoder = LabelEncoder()
    y_encoded = y_encoder.fit_transform(y)
    encoders["class"] = y_encoder

    x_train, x_test, y_train, y_test = train_test_split(x, y_encoded, test_size=0.3, random_state=23)

    model.fit(x_train, y_train)

    y_pred = model.predict(x_test)
    accuracy = accuracy_score(y_test, y_pred)

    return accuracy


def classify_mushroom(mushroom_data):
    """
    Classifies a single mushroom data point.

    Parameters:
    - mushroom_data: dict
        A dictionary where keys are feature names and values are feature values.

    Returns:
    - class_label: str
        The predicted class label ('e' for edible or 'p' for poisonous).
    - confidence: float
        The result confidence.
    """
    global model, encoders

    if not encoders or not model:
        train()

    input_df = pd.DataFrame([mushroom_data])

    for column in input_df.columns:
        if column in encoders:
            le = encoders[column]
            try:
                input_df[column] = le.transform(input_df[column])
            except ValueError:
                raise ValueError(f"Unknown value '{input_df[column].iloc[0]}' for feature '{column}'")
        else:
            raise ValueError(f"No encoder found for feature '{column}'")

    prediction_encoded = model.predict(input_df)

    y_encoder = encoders["class"]
    class_label = y_encoder.inverse_transform(prediction_encoded)[0]

    prediction_proba = model.predict_proba(input_df)[0]
    predicted_index = prediction_proba.argmax()

    confidence = prediction_proba[predicted_index] * 100  # Convert to percentage

    return class_label, confidence
