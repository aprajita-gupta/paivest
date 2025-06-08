Paivest- Financial Analysis Platform
Overview
Paivest is a comprehensive financial analysis platform that provides AI-powered investment insights, portfolio risk assessment, and market sentiment analysis. The platform offers four main services:

LSTM Stock Price Prediction: AI-driven stock price forecasting

Value-at-Risk (VaR) Analysis: Portfolio risk assessment

Alternative Investment Fund (AIF) Recommendations: Personalized AIF suggestions

Sentiment Analysis: Market sentiment and news impact analysis

Live Demos
Frontend: https://paivest-git-main-aprajita-guptas-projects.vercel.app/

Backend API: https://paivest-backend.onrender.com

GitHub Repository: https://github.com/aprajita-gupta/paivest

Features
1. LSTM Stock Price Prediction
Technical indicators calculation (SMA, EMA, RSI, MACD)

AI-inspired price forecasting

Return potential calculation

Model performance metrics

2. Value-at-Risk (VaR) Analysis
Multiple VaR calculation methods (Historical, Parametric, Monte Carlo)

Portfolio risk metrics (Sharpe ratio, max drawdown)

Stress testing scenarios

Risk contribution analysis

3. AIF Recommendations
Personalized Alternative Investment Fund suggestions

Risk-profile based filtering

Asset allocation strategies

Market condition insights

4. Sentiment Analysis
News sentiment scoring

Trading signal generation

Performance backtesting

Sentiment-price correlation analysis

Technical Stack
Backend
Node.js with Express framework

Axios for API requests

Math.js for financial calculations

Dotenv for environment variables

Frontend
React.js

Chart.js for data visualization

Tailwind CSS for styling

API Endpoints
All endpoints are prefixed with /api

Endpoint	Method	Description
/health	GET	System health check
/docs	GET	API documentation
/lstm-prediction	POST	Stock price prediction
/var-analysis	POST	Portfolio risk analysis
/aif-recommendation	POST	AIF recommendations
/sentiment-analysis	POST	Market sentiment analysis
Installation
Clone the repository:

bash
git clone https://github.com/aprajita-gupta/paivest.git
cd paivest
Install dependencies:

bash
npm install
Create a .env file with your environment variables:

text
PORT=5000
ALPHA_VANTAGE_API_KEY=your_api_key
Start the development server:

bash
npm run dev
For production:

bash
npm start
Usage Examples
LSTM Prediction Request
json
POST /api/lstm-prediction
{
  "stock": "RELIANCE.NS",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "investmentAmount": 100000
}
VaR Analysis Request
json
POST /api/var-analysis
{
  "stocks": [
    {"ticker": "RELIANCE.NS", "weight": 40},
    {"ticker": "TCS.NS", "weight": 30},
    {"ticker": "HDFCBANK.NS", "weight": 30}
  ],
  "confidenceLevel": 0.95,
  "investmentAmount": 500000
}
AIF Recommendation Request
json
POST /api/aif-recommendation
{
  "riskProfile": "Moderate",
  "investmentHorizon": "Medium",
  "age": 35,
  "incomeStability": "High",
  "investmentAmount": 2000000
}
Sentiment Analysis Request
json
POST /api/sentiment-analysis
{
  "stock": "TCS.NS",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "investmentAmount": 75000
}
Deployment
The application is configured for easy deployment to platforms like Render, Vercel, or Heroku. The backend is currently deployed on Render, and the frontend on Vercel.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.
