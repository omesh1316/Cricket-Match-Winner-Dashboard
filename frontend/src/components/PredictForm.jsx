import React, { useState } from 'react';
import axios from 'axios';
import './PredictForm.css';

function PredictForm({ onPrediction, onLoading }) {
  const teams = [
    'Mumbai Indians',
    'Chennai Super Kings',
    'Royal Challengers Bangalore',
    'Kolkata Knight Riders',
    'Delhi Capitals',
    'Rajasthan Royals',
    'Punjab Kings',
    'Sunrisers Hyderabad'
  ];

  const venues = [
    'Wankhede Stadium',
    'Eden Gardens',
    'M Chinnaswamy Stadium',
    'Feroz Shah Kotla',
    'Sawai Mansingh Stadium',
    'MA Chidambaram Stadium'
  ];

  const [formData, setFormData] = useState({
    team1: '',
    team2: '',
    toss_winner: '',
    toss_decision: '',
    venue: ''
  });

  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.team1 || !formData.team2 || !formData.toss_winner || !formData.toss_decision || !formData.venue) {
      setError('Please fill all fields');
      return;
    }

    if (formData.team1 === formData.team2) {
      setError('Team 1 and Team 2 must be different');
      return;
    }

    try {
      onLoading(true);
      setError('');

      const response = await axios.post('http://localhost:5000/predict', formData);
      
      onPrediction(response.data, formData);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to make prediction. Ensure backend is running on port 5000');
      console.error('Prediction error:', err);
    } finally {
      onLoading(false);
    }
  };

  const getTeamLogo = (team) => {
    const logos = {
      'Mumbai Indians': '🔵',
      'Chennai Super Kings': '🟡',
      'Royal Challengers Bangalore': '🔴',
      'Kolkata Knight Riders': '🟣',
      'Delhi Capitals': '🔵',
      'Rajasthan Royals': '🟣',
      'Punjab Kings': '🔴',
      'Sunrisers Hyderabad': '🟠'
    };
    return logos[team] || '🏏';
  };

  const isFormValid = formData.team1 && formData.team2 && formData.toss_winner && formData.toss_decision && formData.venue;

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>⚡ Match Details</h2>
          <p className="form-subtitle">Enter your IPL match details for prediction</p>
        </div>
        
        <form onSubmit={handleSubmit} className="prediction-form">
          <div className="form-group">
            <label htmlFor="team1" className="form-label">
              <span className="label-icon">🏟️</span>
              Team 1
            </label>
            <select
              id="team1"
              name="team1"
              value={formData.team1}
              onChange={handleChange}
              onFocus={() => setFocusedField('team1')}
              onBlur={() => setFocusedField(null)}
              className={`form-select ${focusedField === 'team1' ? 'focused' : ''}`}
            >
              <option value="">Select Team 1</option>
              {teams.map(team => (
                <option key={team} value={team}>
                  {getTeamLogo(team)} {team}
                </option>
              ))}
            </select>
            {formData.team1 && (
              <span className="selected-badge">{getTeamLogo(formData.team1)}</span>
            )}
          </div>

          <div className="vs-divider">VS</div>

          <div className="form-group">
            <label htmlFor="team2" className="form-label">
              <span className="label-icon">🏟️</span>
              Team 2
            </label>
            <select
              id="team2"
              name="team2"
              value={formData.team2}
              onChange={handleChange}
              onFocus={() => setFocusedField('team2')}
              onBlur={() => setFocusedField(null)}
              className={`form-select ${focusedField === 'team2' ? 'focused' : ''}`}
            >
              <option value="">Select Team 2</option>
              {teams.map(team => (
                <option key={team} value={team}>
                  {getTeamLogo(team)} {team}
                </option>
              ))}
            </select>
            {formData.team2 && (
              <span className="selected-badge">{getTeamLogo(formData.team2)}</span>
            )}
          </div>

          <div className="form-divider"></div>

          <div className="form-group">
            <label htmlFor="toss_winner" className="form-label">
              <span className="label-icon">🪙</span>
              Toss Winner
            </label>
            <select
              id="toss_winner"
              name="toss_winner"
              value={formData.toss_winner}
              onChange={handleChange}
              onFocus={() => setFocusedField('toss_winner')}
              onBlur={() => setFocusedField(null)}
              className={`form-select ${focusedField === 'toss_winner' ? 'focused' : ''}`}
            >
              <option value="">Select Toss Winner</option>
              {teams.map(team => (
                <option key={team} value={team}>
                  {getTeamLogo(team)} {team}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="toss_decision" className="form-label">
                <span className="label-icon">🎯</span>
                Decision
              </label>
              <select
                id="toss_decision"
                name="toss_decision"
                value={formData.toss_decision}
                onChange={handleChange}
                onFocus={() => setFocusedField('toss_decision')}
                onBlur={() => setFocusedField(null)}
                className={`form-select ${focusedField === 'toss_decision' ? 'focused' : ''}`}
              >
                <option value="">Select Decision</option>
                <option value="bat">🏏 Bat</option>
                <option value="field">🛡️ Field</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label htmlFor="venue" className="form-label">
                <span className="label-icon">📍</span>
                Venue
              </label>
              <select
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                onFocus={() => setFocusedField('venue')}
                onBlur={() => setFocusedField(null)}
                className={`form-select ${focusedField === 'venue' ? 'focused' : ''}`}
              >
                <option value="">Select Venue</option>
                {venues.map(venue => (
                  <option key={venue} value={venue}>{venue}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>}

          <button 
            type="submit" 
            className={`predict-btn ${isFormValid ? 'active' : 'disabled'}`}
            disabled={!isFormValid}
          >
            <span className="btn-icon">🔮</span>
            <span className="btn-text">Predict Winner</span>
            <span className="btn-arrow">→</span>
          </button>

          <p className="form-hint">All fields are required for prediction</p>
        </form>
      </div>
    </div>
  );
}

export default PredictForm;
