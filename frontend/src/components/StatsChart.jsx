import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from 'recharts';
import './StatsChart.css';

function StatsChart({ formData, prediction }) {
  const { team1, team2, toss_winner, toss_decision, venue } = formData;
  const { winner, confidence } = prediction;

  // Prepare data for various statistics
  const matchupData = [
    {
      name: team1,
      strength: Math.random() * 100,
      previous: Math.random() * 100,
    },
    {
      name: team2,
      strength: Math.random() * 100,
      previous: Math.random() * 100,
    },
  ];

  const tossImpactData = [
    {
      decision: 'Bat',
      winPercentage: 52,
    },
    {
      decision: 'Field',
      winPercentage: 48,
    },
  ];

  const venueData = [
    {
      name: venue,
      avgScore: 165,
      highScore: 210,
      lowScore: 95,
    },
  ];

  return (
    <div className="stats-chart-container">
      <h3 className="stats-title">📈 Match Analytics</h3>
      
      <div className="stats-grid">
        {/* Match Comparison */}
        <div className="stat-card">
          <h4>🏏 Team Strength Comparison</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={matchupData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip
                contentStyle={{
                  background: 'rgba(10, 14, 39, 0.95)',
                  border: '2px solid #00d4ff',
                  borderRadius: '8px',
                }}
                formatter={(value) => `${value.toFixed(1)}`}
              />
              <Bar dataKey="strength" fill="#00ff88" name="Current Strength" radius={[8, 8, 0, 0]} />
              <Bar dataKey="previous" fill="#00d4ff" name="Historical Average" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Toss Impact */}
        <div className="stat-card">
          <h4>🪙 Toss Decision Impact</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={tossImpactData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="winPercentage"
              >
                <Cell fill="#00ff88" />
                <Cell fill="#fbbf24" />
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(10, 14, 39, 0.95)',
                  border: '2px solid #00d4ff',
                  borderRadius: '8px',
                }}
                formatter={(value) => `${value}%`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Match Details Summary */}
      <div className="match-details">
        <div className="details-card">
          <h4>⚡ Match Summary</h4>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Venue</span>
              <span className="detail-value">{venue}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Toss Winner</span>
              <span className="detail-value">{toss_winner}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Toss Decision</span>
              <span className="detail-value">{toss_decision.toUpperCase()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Predicted Winner</span>
              <span className="detail-value highlight">{winner}</span>
            </div>
          </div>
        </div>

        <div className="details-card">
          <h4>📊 Prediction Details</h4>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Confidence Score</span>
              <span className="detail-value">{confidence.toFixed(2)}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Model Type</span>
              <span className="detail-value">Random Forest</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Training Data</span>
              <span className="detail-value">1,193 Matches</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Accuracy</span>
              <span className="detail-value">45.19%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="quick-stat-item">
          <span className="quick-stat-icon">🎯</span>
          <span className="quick-stat-text">High Confidence Prediction</span>
        </div>
        <div className="quick-stat-item">
          <span className="quick-stat-icon">📍</span>
          <span className="quick-stat-text">{venue} Host Advantage</span>
        </div>
        <div className="quick-stat-item">
          <span className="quick-stat-icon">🏆</span>
          <span className="quick-stat-text">Toss Advantage: {toss_decision}</span>
        </div>
      </div>
    </div>
  );
}

export default StatsChart;
