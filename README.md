# 🏏 Cricket Match Winner Prediction Dashboard

A full-stack machine learning application that predicts the winner of IPL cricket matches using Random Forest classification. Built with Python Flask backend and React frontend.

## 📋 Features

- **ML Model**: Random Forest classifier trained on IPL historical data
- **REST API**: Flask backend with CORS support for predictions
- **Interactive Dashboard**: React frontend with real-time predictions
- **Beautiful UI**: Dark navy and green cricket-themed design
- **Win Probability Chart**: Visual representation of prediction confidence
- **Mobile Responsive**: Works seamlessly on all devices

## 🛠️ Tech Stack

### Backend
- **Python 3.8+**
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin support
- **Pandas** - Data processing
- **Scikit-learn** - ML model
- **NumPy** - Numerical computing

### Frontend
- **React 18** - UI framework
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **CSS3** - Styling

## 📁 Project Structure

```
cricket-dashboard/
├── backend/
│   ├── data/
│   │   └── matches.csv          # IPL dataset
│   ├── model/
│   │   ├── cricket_model.pkl    # Trained model
│   │   └── encoders.pkl         # Label encoders
│   ├── train_model.py           # ML training script
│   ├── app.py                   # Flask API
│   └── requirements.txt          # Backend dependencies
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── components/
│   │       ├── PredictForm.jsx
│   │       ├── PredictForm.css
│   │       ├── ResultCard.jsx
│   │       ├── ResultCard.css
│   │       ├── WinChart.jsx
│   │       └── WinChart.css
│   └── package.json
├── notebooks/
│   └── analysis.ipynb           # EDA notebook
└── README.md
```

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 14+ and npm
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Prepare the dataset**
   - Place your `matches.csv` file in the `data/` folder
   - Ensure it has columns: `team1`, `team2`, `toss_winner`, `toss_decision`, `venue`, `winner`

6. **Train the model**
   ```bash
   python train_model.py
   ```
   - This generates `cricket_model.pkl` and `encoders.pkl` in the `model/` folder
   - You'll see the model accuracy printed to console

7. **Run the Flask API**
   ```bash
   python app.py
   ```
   - API will be available at `http://localhost:5000`
   - You should see: "Cricket API Running" when you visit the root endpoint

### Frontend Setup

1. **In a new terminal, navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the React app**
   ```bash
   npm start
   ```
   - Dashboard will open at `http://localhost:3000`
   - The app will automatically reload on code changes

## 🚀 Running the Application

### Quick Start (With Both Backend & Frontend)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The application is now running! Open `http://localhost:3000` in your browser.

## 📊 Using the Dashboard

1. **Select Match Details**
   - Choose Team 1 and Team 2 (must be different)
   - Select the Toss Winner
   - Choose Toss Decision (Bat or Field)
   - Select the Venue

2. **Get Prediction**
   - Click "🔮 Predict Winner" button
   - The model will predict the match winner

3. **View Results**
   - See the predicted winner in large text
   - Check confidence percentage (color-coded):
     - 🟢 Green: >65% confidence
     - 🟠 Orange: 50-65% confidence
     - 🔴 Red: <50% confidence
   - View win probability chart

## 🤖 Model Details

- **Algorithm**: Random Forest Classifier
- **Features**: Team 1, Team 2, Toss Winner, Toss Decision, Venue
- **Target**: Winner (predicted team name)
- **Encoding**: LabelEncoder applied to all categorical features
- **Test Size**: 20%
- **Random State**: 42
- **Number of Trees**: 100

## 📈 Dataset Requirements

Your CSV file should contain:
- `team1` - First team name
- `team2` - Second team name
- `toss_winner` - Team that won the toss
- `toss_decision` - "bat" or "field"
- `venue` - Match venue
- `winner` - Winning team (target variable)

**Available Teams:**
- Mumbai Indians
- Chennai Super Kings
- Royal Challengers Bangalore
- Kolkata Knight Riders
- Delhi Capitals
- Rajasthan Royals
- Punjab Kings
- Sunrisers Hyderabad

**Sample Venues:**
- Wankhede Stadium
- Eden Gardens
- M Chinnaswamy Stadium
- Feroz Shah Kotla
- Sawai Mansingh Stadium
- MA Chidambaram Stadium

## 🔗 API Endpoints

### GET /
Returns API status
```bash
curl http://localhost:5000/
```

Response:
```json
{
  "status": "Cricket API Running"
}
```

### POST /predict
Makes a match winner prediction
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "team1": "Mumbai Indians",
    "team2": "Chennai Super Kings",
    "toss_winner": "Mumbai Indians",
    "toss_decision": "bat",
    "venue": "Wankhede Stadium"
  }'
```

Response:
```json
{
  "winner": "Mumbai Indians",
  "confidence": 72.5
}
```

## 📝 Environment Variables

No environment variables required for basic setup. The app uses default ports:
- Backend: 5000
- Frontend: 3000

## 🐛 Troubleshooting

### Backend Issues

**"Module not found" errors**
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again
- Check Python version (3.8+)

**Model not found errors**
- Ensure `cricket_model.pkl` and `encoders.pkl` exist in `backend/model/`
- Run `python train_model.py` to train the model

**CORS errors in frontend**
- Ensure backend is running on port 5000
- Check that flask-cors is installed

### Frontend Issues

**API calls failing**
- Verify backend is running at `http://localhost:5000`
- Check browser console for detailed errors
- Ensure all form fields are filled before prediction

**Dependencies not installing**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (14+)

## 📚 Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Scikit-learn Documentation](https://scikit-learn.org/)
- [Recharts Documentation](https://recharts.org/)

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Built as a demonstration of full-stack ML engineering with Python, Flask, and React.

## ✨ Future Enhancements

- [ ] Authentication system
- [ ] Historical predictions tracking
- [ ] Player statistics integration
- [ ] Match statistics visualization
- [ ] Prediction confidence intervals
- [ ] Model performance metrics dashboard
- [ ] Database integration for predictions storage
- [ ] Deployment to cloud (AWS/GCP/Azure)

---

**Happy Predicting! 🏏** 🎯
