from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
from sklearn.exceptions import NotFittedError
import pandas as pd
from sklearn.preprocessing import StandardScaler


app = Flask(__name__)
CORS(app, origins='http://localhost:5173')
file_path = "grand_place.csv"
data = pd.read_csv(file_path)
training_data = data.values

# Load the trained model and scaler
model_file_path = 'random_forest_model.pk2'
scaler_file_path = 'scaler.pk2'

best_rf_model = joblib.load(model_file_path)  # Replace with the actual path to your joblib model file
scaler = joblib.load(scaler_file_path)  # Replace with the actual path to your scaler file

def predict_placement_chance(input_features):
    try:
        # Check if the scaler is already fitted
        if not hasattr(scaler, 'mean_') or not scaler.mean_:
            # Fit the scaler if it is not already fitted
            scaler.fit(training_data[:, :-1])  # Adjust to use only the first 8 columns (features)

        # Ensure the model is fitted
        if not hasattr(best_rf_model, 'estimators_') or not best_rf_model.estimators_:
            best_rf_model.fit(training_data[:, :-1], training_data[:, -1])  # Assuming the last column is the target variable

        input_features_scaled = scaler.transform(np.array([input_features]))
        placement_chance = best_rf_model.predict(input_features_scaled)[0]
        placement_chance_percentage = max(0, min(100, placement_chance))
        return placement_chance_percentage
    except NotFittedError as e:
        return str(e)

@app.route('/predict_placement', methods=['POST'])
def predict_placement():
    data = request.get_json()
    input_features = [data[key] for key in ['aptitude_marks', 'tenth_marks', 'twelfth_marks', 'degree_marks', 'internship', 'projects', 'backlogs', 'leetcode']]
    print("data received",input_features)
    placement_chance_percentage = predict_placement_chance(input_features)

    if isinstance(placement_chance_percentage, str):
        # Handle the case where the scaler is not fitted or the model is not fitted
        return jsonify({"error": placement_chance_percentage}), 500

    if placement_chance_percentage == 0:
        result = "Candidate cannot be placed based on qualification criteria."
    else:
        result = f"Predicted Placement Chance: {placement_chance_percentage:.2f}%"

    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
    app.run(port=5000)
