import React, { useState } from 'react';
import './PlacementForm.css';

const PlacementForm: React.FC = () => {
  const [formData, setFormData] = useState({
    aptitude_marks: 0,
    tenth_marks: 0,
    twelfth_marks: 0,
    degree_marks: 0,
    internship: 0,
    projects: 0,
    backlogs: 0,
    leetcode: 0,
  });

  const [result, setResult] = useState<string | null>(null);

  const submitForm = async () => {
    try {
      const response = await fetch('http://localhost:5000/predict_placement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const resultData = await response.json();
      setResult(resultData.result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="PlacementForm">
      <label>Aptitude Marks: <input type="number" onChange={(e) => setFormData({ ...formData, aptitude_marks: +e.target.value })} /></label>
      <label>Tenth Marks: <input type="number" onChange={(e) => setFormData({ ...formData, tenth_marks: +e.target.value })} /></label>
      <label>Twelfth Marks: <input type="number" onChange={(e) => setFormData({ ...formData, twelfth_marks: +e.target.value })} /></label>
      <label>Degree Marks: <input type="number" onChange={(e) => setFormData({ ...formData, degree_marks: +e.target.value })} /></label>
      <label>Internship: <input type="number" onChange={(e) => setFormData({ ...formData, internship: +e.target.value })} /></label>
      <label>Projects: <input type="number" onChange={(e) => setFormData({ ...formData, projects: +e.target.value })} /></label>
      <label>Backlogs: <input type="number" onChange={(e) => setFormData({ ...formData, backlogs: +e.target.value })} /></label>
      <label>LeetCode: <input type="number" onChange={(e) => setFormData({ ...formData, leetcode: +e.target.value })} /></label>
      <button onClick={submitForm}>Submit</button>

      {result && (
        <div className="result-container">
          <p className="result-text">{result}</p>
        </div>
      )}
    </div>
  );
};

export default PlacementForm;
