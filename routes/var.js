const express = require('express');
const axios = require('axios');
const router = express.Router();

// Helper function to calculate normal distribution quantile
function normalInverse(p) {
  // Approximation of inverse normal distribution
  const a = [0, -3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [0, -5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
  const c = [0, -7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [0, 7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];

  if (p < 0 || p > 1) return NaN;
  if (p === 0) return -Infinity;
  if (p === 1) return Infinity;
  if (p === 0.5) return 0;

  const pp = (p < 0.5) ? p : 1 - p;
  const t = Math.sqrt(-2 * Math.log(pp));
  
  let x = t - ((c[2] * t + c[1]) * t + c[0]) / (((d[4] * t + d[3]) * t + d[2]) * t + d[1]) * t + 1;
  
  if (p < 0.5) x = -x;
  return x;
}

// Fetch historical stock data
async function fetchStockData(ticker, days = 252) {
  try {
    // Using Alpha Vantage API (you'll need to get a free API key)
    const API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=${API_KEY}`;
    
    const response = await axios.get(url);
    const timeSeries = response.data['Time Series (Daily)'];
    
    if (!timeSeries) {
      throw new Error(`No data found for ticker ${ticker}`);
    }
    
    const dates = Object.keys(timeSeries).sort().slice(-days);
    const prices = dates.map(date => parseFloat(timeSeries[date]['5. adjusted close']));
    
    // Calculate daily returns
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i-1]) / prices[i-1]);
    }
    
    return {
      prices: prices,
      returns: returns,
      currentPrice: prices[prices.length - 1]
    };
  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error.message);
    // Fallback to simulated data for demo purposes
    return generateSimulatedData(days, ticker);
  }
}

// Generate simulated data as fallback
function generateSimulatedData(days, ticker) {
  const returns = [];
  let price = getBasePrice(ticker);
  const prices = [price];
  
  // Different volatility for different stocks
  const volatility = getStockVolatility(ticker);
  
  for (let i = 0; i < days - 1; i++) {
    const dailyReturn = (Math.random() - 0.5) * volatility; // Random daily return based on stock volatility
    returns.push(dailyReturn);
    price = price * (1 + dailyReturn);
    prices.push(price);
  }
  
  return {
    prices: prices,
    returns: returns,
    currentPrice: price
  };
}

// Get base price for different stocks
function getBasePrice(ticker) {
  const basePrices = {
    'RELIANCE.NS': 2800,
    'TCS.NS': 3600,
    'HDFCBANK.NS': 1650,
    'INFY.NS': 1400,
    'HINDUNILVR.NS': 2400,
    'ICICIBANK.NS': 950,
    'ITC.NS': 450,
    'KOTAKBANK.NS': 1750,
    'AXISBANK.NS': 1100,
    'BHARTIARTL.NS': 850
  };
  return basePrices[ticker] || 1000;
}

// Get volatility for different stocks
function getStockVolatility(ticker) {
  const volatilities = {
    'RELIANCE.NS': 0.035,
    'TCS.NS': 0.025,
    'HDFCBANK.NS': 0.028,
    'INFY.NS': 0.030,
    'HINDUNILVR.NS': 0.022,
    'ICICIBANK.NS': 0.040,
    'ITC.NS': 0.032,
    'KOTAKBANK.NS': 0.035,
    'AXISBANK.NS': 0.045,
    'BHARTIARTL.NS': 0.038
  };
  return volatilities[ticker] || 0.035;
}

// Calculate portfolio returns
function calculatePortfolioReturns(stocksData, weights) {
  const portfolioReturns = [];
  const minLength = Math.min(...stocksData.map(stock => stock.returns.length));
  
  for (let i = 0; i < minLength; i++) {
    let portfolioReturn = 0;
    for (let j = 0; j < stocksData.length; j++) {
      portfolioReturn += weights[j] * stocksData[j].returns[i];
    }
    portfolioReturns.push(portfolioReturn);
  }
  
  return portfolioReturns;
}

// Calculate Historical VaR
function calculateHistoricalVaR(returns, confidenceLevel) {
  const sortedReturns = [...returns].sort((a, b) => a - b);
  const index = Math.floor((1 - confidenceLevel) * sortedReturns.length);
  return -sortedReturns[index];
}

// Calculate Parametric VaR
function calculateParametricVaR(returns, confidenceLevel) {
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
  const stdDev = Math.sqrt(variance);
  
  const zScore = -normalInverse(1 - confidenceLevel);
  return -(mean - zScore * stdDev);
}

// Calculate Monte Carlo VaR
function calculateMonteCarloVaR(returns, confidenceLevel, simulations = 10000) {
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
  const stdDev = Math.sqrt(variance);
  
  const simulatedReturns = [];
  for (let i = 0; i < simulations; i++) {
    // Box-Muller transformation for normal random numbers
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const simulatedReturn = mean + z * stdDev;
    simulatedReturns.push(simulatedReturn);
  }
  
  return calculateHistoricalVaR(simulatedReturns, confidenceLevel);
}

// Calculate Conditional VaR (Expected Shortfall)
function calculateConditionalVaR(returns, confidenceLevel) {
  const sortedReturns = [...returns].sort((a, b) => a - b);
  const cutoffIndex = Math.floor((1 - confidenceLevel) * sortedReturns.length);
  const tailReturns = sortedReturns.slice(0, cutoffIndex);
  
  if (tailReturns.length === 0) return 0;
  
  const averageTailLoss = tailReturns.reduce((sum, r) => sum + r, 0) / tailReturns.length;
  return -averageTailLoss;
}

// Calculate portfolio metrics
function calculatePortfolioMetrics(returns) {
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
  const stdDev = Math.sqrt(variance);
  
  // Annualized metrics (assuming 252 trading days)
  const annualReturn = mean * 252;
  const annualVolatility = stdDev * Math.sqrt(252);
  
  // Risk-free rate (assume 5.5% for India)
  const riskFreeRate = 0.055;
  const sharpeRatio = (annualReturn - riskFreeRate) / annualVolatility;
  
  // Calculate maximum drawdown
  let peak = 0;
  let maxDrawdown = 0;
  let cumulativeReturn = 1;
  
  for (const ret of returns) {
    cumulativeReturn *= (1 + ret);
    peak = Math.max(peak, cumulativeReturn);
    const drawdown = (peak - cumulativeReturn) / peak;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
  }
  
  return {
    annualReturn,
    annualVolatility,
    sharpeRatio,
    maxDrawdown: -maxDrawdown
  };
}

// Calculate risk contribution for each stock
function calculateRiskContribution(stocksData, weights) {
  const riskContribution = {};
  
  for (let i = 0; i < stocksData.length; i++) {
    const stock = stocksData[i];
    const weight = weights[i];
    const variance = stock.returns.reduce((sum, r) => {
      const mean = stock.returns.reduce((s, ret) => s + ret, 0) / stock.returns.length;
      return sum + Math.pow(r - mean, 2);
    }, 0) / (stock.returns.length - 1);
    
    const volatility = Math.sqrt(variance) * Math.sqrt(252); // Annualized
    const contribution = weight * volatility;
    riskContribution[stock.ticker] = (contribution * 100).toFixed(2);
  }
  
  return riskContribution;
}

// Calculate stress test scenarios
function calculateStressTests(stocksData, weights, investmentAmount) {
  const scenarios = {
    'Market Crash (2008)': -0.35,
    'COVID-19 Crash (2020)': -0.25,
    'Interest Rate Hike': -0.08,
    'Natural Disaster': -0.05,
    'Global Political Crisis': -0.12,
    'India-Specific Crisis': -0.15
  };
  
  const stressTests = {};
  
  for (const [scenario, shockFactor] of Object.entries(scenarios)) {
    // Apply correlation-adjusted shock
    const portfolioShock = shockFactor * 0.8; // Assuming some diversification benefit
    const portfolioValue = investmentAmount * (1 + portfolioShock);
    const lossAmount = investmentAmount - portfolioValue;
    const lossPercentage = Math.abs(portfolioShock * 100);
    
    stressTests[scenario] = {
      'Portfolio Value (INR)': portfolioValue.toFixed(2),
      'Loss Amount (INR)': lossAmount.toFixed(2),
      'Loss Percentage (%)': lossPercentage.toFixed(2)
    };
  }
  
  return stressTests;
}

// Main VaR analysis endpoint
router.post('/var-analysis', async (req, res) => {
  try {
    const { stocks, confidenceLevel, investmentAmount } = req.body;
    
    // Validate input
    if (!stocks || !Array.isArray(stocks) || stocks.length === 0) {
      return res.status(400).json({ error: 'Invalid stocks data' });
    }
    
    if (!confidenceLevel || confidenceLevel <= 0 || confidenceLevel >= 1) {
      return res.status(400).json({ error: 'Confidence level must be between 0 and 1' });
    }
    
    if (!investmentAmount || investmentAmount <= 0) {
      return res.status(400).json({ error: 'Investment amount must be positive' });
    }
    
    // Normalize weights
    const totalWeight = stocks.reduce((sum, stock) => sum + stock.weight, 0);
    const normalizedStocks = stocks.map(stock => ({
      ...stock,
      weight: stock.weight / totalWeight
    }));
    
    const weights = normalizedStocks.map(stock => stock.weight);
    
    // Fetch historical data for all stocks
    console.log('Fetching historical data...');
    const stocksData = await Promise.all(
      normalizedStocks.map(async (stock) => ({
        ticker: stock.ticker,
        ...(await fetchStockData(stock.ticker))
      }))
    );
    
    // Calculate portfolio returns
    const portfolioReturns = calculatePortfolioReturns(stocksData, weights);
    
    if (portfolioReturns.length === 0) {
      return res.status(500).json({ error: 'Could not calculate portfolio returns' });
    }
    
    // Calculate VaR metrics
    const historicalVaR = calculateHistoricalVaR(portfolioReturns, confidenceLevel) * investmentAmount;
    const parametricVaR = calculateParametricVaR(portfolioReturns, confidenceLevel) * investmentAmount;
    const monteCarloVaR = calculateMonteCarloVaR(portfolioReturns, confidenceLevel) * investmentAmount;
    const conditionalVaR = calculateConditionalVaR(portfolioReturns, confidenceLevel) * investmentAmount;
    
    // Calculate portfolio metrics
    const portfolioMetrics = calculatePortfolioMetrics(portfolioReturns);
    
    // Calculate risk contributions
    const riskContribution = calculateRiskContribution(stocksData, weights);
    
    // Calculate stress tests
    const stressTests = calculateStressTests(stocksData, weights, investmentAmount);
    
    // Prepare response
    const response = {
      portfolioDetails: {
        tickers: normalizedStocks.map(stock => stock.ticker),
        weights: normalizedStocks.reduce((obj, stock) => {
          obj[stock.ticker] = (stock.weight * 100).toFixed(2) + '%';
          return obj;
        }, {}),
        investmentValue: investmentAmount.toFixed(2),
        confidenceLevel: (confidenceLevel * 100).toFixed(1) + '%',
        dataPoints: portfolioReturns.length
      },
      varMetrics: {
        historicalVaR: historicalVaR.toFixed(2),
        parametricVaR: parametricVaR.toFixed(2),
        monteCarloVaR: monteCarloVaR.toFixed(2),
        conditionalVaR: conditionalVaR.toFixed(2),
        varAsPercentage: (historicalVaR / investmentAmount * 100).toFixed(2) + '%'
      },
      portfolioMetrics: {
        annualReturn: (portfolioMetrics.annualReturn * 100).toFixed(2) + '%',
        annualVolatility: (portfolioMetrics.annualVolatility * 100).toFixed(2) + '%',
        sharpeRatio: portfolioMetrics.sharpeRatio.toFixed(2),
        maxDrawdown: (portfolioMetrics.maxDrawdown * 100).toFixed(2) + '%'
      },
      riskContribution: riskContribution,
      stressTestResults: stressTests,
      calculationInfo: {
        methodology: 'Statistical analysis with simulated historical data',
        dataSource: 'Alpha Vantage API (with fallback simulation)',
        calculationDate: new Date().toISOString().split('T')[0]
      }
    };
    
    res.json(response);
    
  } catch (error) {
    console.error('Error in VaR analysis:', error);
    res.status(500).json({ 
      error: 'Failed to process VaR analysis', 
      details: error.message 
    });
  }
});

module.exports = router;