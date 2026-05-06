import React, { useState } from 'react';
import PredictForm from './components/PredictForm';
import ResultCard from './components/ResultCard';
import WinChart from './components/WinChart';
import StatsChart from './components/StatsChart';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const handlePrediction = (result, data) => {
    setPrediction(result);
    setFormData(data);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  const handleReset = () => {
    setPrediction(null);
    setFormData(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo">🏏</span>
            <div className="header-text">
              <h1>Cricket Match Winner Dashboard</h1>
              <p>AI-Powered Match Predictions</p>
            </div>
          </div>
          <div className="header-accent"></div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="form-section">
            <PredictForm 
              onPrediction={handlePrediction}
              onLoading={handleLoading}
            />
          </div>

          {loading && (
            <div className="loading-container">
              <div className="loading-content">
                <div className="animated-ball">🏏</div>
                <div className="spinner-ring"></div>
                <p className="loading-text">Analyzing match data...</p>
                <div className="loading-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}

          {prediction && !loading && (
            <div className="results-container">
              <button className="reset-btn" onClick={handleReset}>← New Prediction</button>
              
              <div className="results-grid">
                <div className="result-main">
                  <ResultCard result={prediction} />
                </div>
                
                <div className="result-secondary">
                  <WinChart result={prediction} />
                </div>
              </div>

              <div className="stats-section">
                <StatsChart formData={formData} prediction={prediction} />
              </div>
            </div>
          )}

          {!prediction && !loading && (
            <div className="welcome-section">
              <div className="welcome-content">
                <h2>Welcome to IPL Match Prediction</h2>
                <p>Select your match details to get AI-powered predictions backed by machine learning</p>
                <div className="features-grid">
                  <div className="feature-card">
                    <span className="feature-icon">🤖</span>
                    <h3>Smart Predictions</h3>
                    <p>Random Forest ML model</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">📊</span>
                    <h3>Data Insights</h3>
                    <p>Confidence scoring</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">⚡</span>
                    <h3>Real-time</h3>
                    <p>Instant results</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">🎯</span>
                    <h3>Accurate</h3>
                    <p>Trained on 1000+ matches</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>🏏 Cricket Match Winner Dashboard 2026</p>
          <p className="footer-sub">Powered by Machine Learning & React</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
