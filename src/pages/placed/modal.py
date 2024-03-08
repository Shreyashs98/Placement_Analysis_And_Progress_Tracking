from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import joblib
# Load dataset
dataset = np.genfromtxt("final_dataset.csv", delimiter=",", skip_header=True)

# Split dataset into features and target
X = dataset[:, :-1]  # Features
y = dataset[:, -1]   # Target

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Define Random Forest regressor
rf_regressor = RandomForestRegressor(random_state=42)

# Define hyperparameters to tune
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [None, 3, 5, 7],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Perform GridSearchCV for hyperparameter tuning
grid_search = GridSearchCV(estimator=rf_regressor, param_grid=param_grid, cv=5, scoring='neg_mean_squared_error')
grid_search.fit(X_train_scaled, y_train)

# Get best Random Forest model
best_rf_model = grid_search.best_estimator_

# Evaluate model using cross-validation
cv_scores = cross_val_score(best_rf_model, X_train_scaled, y_train, cv=5, scoring='neg_mean_squared_error')
cv_mse = -cv_scores.mean()
print("Cross-validated Mean Squared Error:", cv_mse)

# Make predictions
y_pred = best_rf_model.predict(X_test_scaled)

# Calculate Mean Squared Error
mse = mean_squared_error(y_test, y_pred)
print("Random Forest Mean Squared Error:", mse)

# Get feature importance
feature_importance = best_rf_model.feature_importances_
sorted_indices = np.argsort(feature_importance)[::-1]
print("Feature Importance:")
for i in sorted_indices:
    print(f"Feature {i+1}: {feature_importance[i]}")
joblib.dump(best_rf_model, "random_forest_model.pk2")

# Save the scaler for feature scaling
joblib.dump(scaler, "scaler.pk2")