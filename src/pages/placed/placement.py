from flask import Flask, request, jsonify
import numpy as np
import joblib

app = Flask(__name__)

# Load the trained Random Forest model and scaler
model_path = "/random_forest_model.pk2"
scaler_path = "/scaler.pk2"
best_rf_model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

# Function to predict placement chance
def predict_placement_chance(aptitude_marks, tenth_marks, twelfth_marks, degree_marks,
                             internship, projects, backlogs, leetcode):
    # Check if candidate is disqualified
    if (aptitude_marks < 50 or tenth_marks < 50 or twelfth_marks < 50 or degree_marks < 70):
        return 0  # Candidate cannot be placed

    # Scale the input features
    input_features = np.array([[aptitude_marks, tenth_marks, twelfth_marks, degree_marks,
                                 internship, projects, backlogs, leetcode]])
    input_features_scaled = scaler.transform(input_features)

    # Make prediction
    placement_chance = best_rf_model.predict(input_features_scaled)[0]

    # Convert placement chance to percentage
    placement_chance_percentage = max(0, min(100, placement_chance))

    return placement_chance_percentage

# Define a route to handle predictions
@app.route("/predict_placement", methods=["POST"])
def predict_placement():
    # Get input data from the request
    data = request.json
    
    # Extract input features from data
    aptitude_marks = data["aptitude_marks"]
    tenth_marks = data["tenth_marks"]
    twelfth_marks = data["twelfth_marks"]
    degree_marks = data["degree_marks"]
    internship = data["internship"]
    projects = data["projects"]
    backlogs = data["backlogs"]
    leetcode = data["leetcode"]

    # Predict placement chance
    placement_chance_percentage = predict_placement_chance(aptitude_marks, tenth_marks, twelfth_marks, degree_marks,
                                                           internship, projects, backlogs, leetcode)

    if placement_chance_percentage == 0:
        return jsonify({"message": "Candidate cannot be placed based on qualification criteria."}), 200
    else:
        return jsonify({"placement_chance_percentage": placement_chance_percentage}), 200

if __name__ == "__main__":
    app.run(debug=True)
