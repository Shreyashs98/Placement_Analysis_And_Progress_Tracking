import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import PlacementForm from './placementForm';

function Predict() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (formData) => {
    setLoading(true);

    // Mock request to predict placement chance
    setTimeout(() => {
      // Add your actual API call here to predict placement chance
      const placementChancePercentage = Math.random() * 100;
      setResult(`Predicted Placement Chance: ${placementChancePercentage.toFixed(2)}%`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Placement Prediction</h1>
      <PlacementForm onSubmit={handleSubmit} />
      {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>}
      {result && <p className="mt-3 text-center">{result}</p>}
    </div>
  );
}

export default Predict;
