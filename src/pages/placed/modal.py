from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import joblib

# Assuming you have trained your Random Forest model and scaler
best_rf_model = RandomForestRegressor(n_estimators=300, max_depth=None, min_samples_split=2, min_samples_leaf=1, random_state=42)
scaler = StandardScaler()
# Train your model and scaler here

# Save the trained Random Forest model
joblib.dump(best_rf_model, "random_forest_model.pk2")

# Save the scaler for feature scaling
joblib.dump(scaler, "scaler.pk2")