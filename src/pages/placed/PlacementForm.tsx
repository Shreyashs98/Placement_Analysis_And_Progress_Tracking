import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
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

  const [percentage, setPercentage] = useState(0);

  const props = useSpring({ width: `${percentage}%`, from: { width: '0%' } });

  const submitForm = async () => {
    try {
      const response = await fetch('https://e6f17a7b-7c23-4357-ba4a-a3e0a5c424ec-00-1wekubp0leiy0.pike.replit.dev/predict_placement', {
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

      // Update the percentage with a delay for a smoother animation
      setTimeout(() => setPercentage(resultData.percentage), 500);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  // Reset the percentage when the form data changes
  useEffect(() => {
    setPercentage(0);
  }, [formData]);

  return (
    <div className="PlacementForm">
      <label>Aptitude Marks: <input type="number" placeholder='Minimum marks is 35' onChange={(e) => setFormData({ ...formData, aptitude_marks: +e.target.value })} /></label>
      <label>Tenth Marks: <input type="number" placeholder='Minimum marks is 35' onChange={(e) => setFormData({ ...formData, tenth_marks: +e.target.value })} /></label>
      <label>Twelfth Marks: <input type="number"placeholder='Minimum marks is 35' onChange={(e) => setFormData({ ...formData, twelfth_marks: +e.target.value })} /></label>
      <label>Degree Marks: <input type="number"placeholder='Minimum marks is 35' onChange={(e) => setFormData({ ...formData, degree_marks: +e.target.value })} /></label>
      <label>Internship: <input type="number"placeholder='Between 0 to 4' onChange={(e) => setFormData({ ...formData, internship: +e.target.value })} /></label>
      <label>Projects: <input type="number"placeholder='Between 0 to 7' onChange={(e) => setFormData({ ...formData, projects: +e.target.value })} /></label>
      <label>Backlogs: <input type="number"placeholder='Less than 3' onChange={(e) => setFormData({ ...formData, backlogs: +e.target.value })} /></label>
      <label>LeetCode: <input type="number" placeholder='Between 0 to 550' onChange={(e) => setFormData({ ...formData, leetcode: +e.target.value })} /></label>
      <button onClick={submitForm}>Submit</button>

      {result && (
        <div className="result-container">
          <p className="result-text">{result}</p>
          {/* <animated.div className="percentage-bar" style={props}></animated.div> */}
        </div>
      )}
    </div>
  );
};

export default PlacementForm;
