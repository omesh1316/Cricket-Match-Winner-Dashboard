import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import './WinChart.css';

function WinChart({ result }) {
  const { winner, confidence } = result;

  const data = [
    {
      name: winner,
      probability: confidence,
    },
  ];

  const getColor = (conf) => {
    if (conf > 65) return '#00ff88';
    if (conf > 50) return '#fbbf24';
    return '#f87171';
  };

  const barColor = getColor(confidence);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>📊 Win Probability</h2>
        <p className="chart-subtitle">Model Prediction Confidence</p>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 150, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              stroke="#cbd5e1"
              style={{ fontSize: '0.9rem', fontWeight: 600 }}
            />
            <YAxis 
              dataKey="name" 
              type="category"
              stroke="#cbd5e1"
              style={{ fontSize: '0.9rem', fontWeight: 600 }}
            />
            <Tooltip
              formatter={(value) => `${value.toFixed(2)}%`}
              labelFormatter={() => 'Win Probability'}
              contentStyle={{
                background: 'rgba(10, 14, 39, 0.95)',
                border: '2px solid #00d4ff',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
              }}
              cursor={{ fill: 'rgba(0, 255, 136, 0.1)' }}
            />
            <Bar 
              dataKey="probability" 
              fill={barColor}
              radius={[0, 12, 12, 0]}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-stats">
        <div className="stat-item">
          <span className="stat-label">Confidence</span>
          <span className="stat-value">{confidence.toFixed(1)}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Team</span>
          <span className="stat-value">{winner}</span>
        </div>
      </div>
    </div>
  );
}

export default WinChart;
