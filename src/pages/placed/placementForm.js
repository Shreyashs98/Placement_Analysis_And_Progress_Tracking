import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

function PlacementForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    aptitude: '',
    tenth: '',
    twelfth: '',
    degree: '',
    internship: '',
    projects: '',
    backlogs: '',
    leetcode: ''
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      onSubmit(formData)
        .then((result) => {
          setResult(result);
          setLoading(false);
        });
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (formData) => {
    let errors = {};
    for (let field in formData) {
      if (formData[field] === '' || isNaN(formData[field])) {
        errors[field] = 'Please enter a valid number';
      }
    }
    return errors;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="aptitude" className="form-label">Aptitude Marks (0-100):</label>
              <input type="number" className={`form-control ${errors.aptitude && 'is-invalid'}`} id="aptitude" name="aptitude" min="0" max="100" value={formData.aptitude} onChange={handleChange} required />
              {errors.aptitude && <div className="invalid-feedback">{errors.aptitude}</div>}
            </div>
            {/* Add similar inputs for other fields */}
            <button type="submit" className="btn btn-primary">Predict Placement</button>
          </form>
          {loading && <div className="spinner-border mt-3" role="status"><span className="visually-hidden">Loading...</span></div>}
          {result && <p className={`mt-3 text-center ${result.includes('Cannot be placed') ? 'text-danger' : 'text-success'}`}>{result}</p>}
        </div>
      </div>
    </div>
  );
}

export default PlacementForm;
