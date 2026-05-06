import React from 'react';
import './ResultCard.css';

function ResultCard({ result }) {
  const { winner, confidence } = result;

  const getConfidenceColor = (conf) => {
    if (conf > 65) return 'high';
    if (conf > 50) return 'medium';
    return 'low';
  };

  const getConfidenceLabel = (conf) => {
    if (conf > 65) return 'Very High';
    if (conf > 50) return 'Moderate';
    return 'Close Call';
  };

  const confidenceLevel = getConfidenceColor(confidence);
  const confidenceLabel = getConfidenceLabel(confidence);

  const getTeamEmoji = (team) => {
    const emojis = {
      'Mumbai Indians': '🔵',
      'Chennai Super Kings': '🟡',
      'Royal Challengers Bangalore': '🔴',
      'Kolkata Knight Riders': '🟣',
      'Delhi Capitals': '🔵',
      'Rajasthan Royals': '🟣',
      'Punjab Kings': '🔴',
      'Sunrisers Hyderabad': '🟠'
    };
    return emojis[team] || '🏏';
  };

  return (
    <div className={`result-card ${confidenceLevel}`}>
      <div className="result-decoration">
        <div className="decoration-circle"></div>
        <div className="decoration-circle decoration-circle-2"></div>
      </div>

      <div className="result-content">
        <div className="trophy-icon">🏆</div>
        <p className="result-label">PREDICTED WINNER</p>
        
        <div className="winner-display">
          <span className="team-emoji">{getTeamEmoji(winner)}</span>
          <h2 className="winner-name">{winner}</h2>
        </div>

        <div className={`confidence-section ${confidenceLevel}`}>
          <div className="confidence-circle">
            <svg viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                className="confidence-ring-bg"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                className="confidence-ring"
                style={{
                  strokeDasharray: `${(confidence / 100) * 339.29} 339.29`
                }}
              />
            </svg>
            <div className="confidence-value">
              <span className="number">{confidence.toFixed(1)}</span>
              <span className="percent">%</span>
            </div>
          </div>

          <div className="confidence-label-section">
            <p className="confidence-label">{confidenceLabel}</p>
            <p className="confidence-desc">Confidence Level</p>
          </div>
        </div>

        <div className="prediction-message">
          {confidence > 65 && (
            <div className="message high">
              <span className="emoji">⭐</span>
              <p>Our model is highly confident in this prediction</p>
            </div>
          )}
          {confidence > 50 && confidence <= 65 && (
            <div className="message medium">
              <span className="emoji">⚖️</span>
              <p>It's a competitive match - both teams have good chances</p>
            </div>
          )}
          {confidence <= 50 && (
            <div className="message low">
              <span className="emoji">⚡</span>
              <p>This is a very closely contested match!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
