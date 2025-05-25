// Display AIF results
  function displayAifResults(data) {
    // Show results container
    const resultsContainer = document.getElementById('results');
    resultsContainer.classList.remove('hidden');
    
    // Get asset allocation data for chart
    const assetClasses = Object.keys(data.assetAllocation);
    const allocationValues = Object.values(data.assetAllocation);
    
    // Display summary with improved UI for recommendations
    const summaryElement = document.getElementById('results-summary');
    summaryElement.innerHTML = `
      <div class="bg-purple-50 p-4 rounded-md">
        <h4 class="text-lg font-bold text-purple-700 mb-2">AIF Recommendation Summary</h4>
        <p class="mb-3"><strong>Investment Profile:</strong> ${data.investmentProfile.riskProfile} risk, ${data.investmentProfile.investmentHorizon} term</p>
        <p class="mb-3"><strong>Investment Amount:</strong> ₹${parseFloat(data.investmentProfile.investmentAmount).toLocaleString()}</p>
        
        <div class="grid grid-cols-3 gap-2 mb-4 text-center">
          <div class="bg-white rounded p-2 shadow-sm">
            <p class="text-purple-700 font-medium">Equity</p>
            <p class="text-lg font-bold">${data.assetAllocation.Equity}%</p>
          </div>
          <div class="bg-white rounded p-2 shadow-sm">
            <p class="text-purple-700 font-medium">Debt</p>
            <p class="text-lg font-bold">${data.assetAllocation.Debt}%</p>
          </div>
          <div class="bg-white rounded p-2 shadow-sm">
            <p class="text-purple-700 font-medium">Gold</p>
            <p class="text-lg font-bold">${data.assetAllocation.Gold}%</p>
          </div>
          <div class="bg-white rounded p-2 shadow-sm">
            <p class="text-purple-700 font-medium">Real Estate</p>
            <p class="text-lg font-bold">${data.assetAllocation.RealEstate}%</p>
          </div>
          <div class="bg-white rounded p-2 shadow-sm col-span-2">
            <p class="text-purple-700 font-medium">Alternative Investment</p>
            <p class="text-lg font-bold">${data.assetAllocation.Alternative}%</p>
            <p class="text-xs text-gray-600">₹${Math.round(data.investmentProfile.investmentAmount * data.assetAllocation.Alternative / 100).toLocaleString()}</p>
          </div>
        </div>
        
        <h5 class="text-md font-semibold text-purple-800 mt-6 mb-3 border-b border-purple-200 pb-1">Recommended Alternative Investment Funds</h5>
        <div class="grid grid-cols-1 md:grid-cols-${Math.min(data.aifRecommendations.length, 3)} gap-4">
          ${data.aifRecommendations.map((item, index) => `
            <div class="recommendation-card bg-white rounded-lg shadow-md p-4 border-l-4 ${index === 0 ? 'border-purple-600' : index === 1 ? 'border-purple-500' : 'border-purple-400'}">
              <div class="flex justify-between items-start mb-2">
                <h6 class="font-bold text-purple-800 text-lg">${item.aif.name}</h6>
                <span class="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">${Math.round(item.allocationPercentage)}%</span>
              </div>
              <p class="text-sm text-gray-600 mb-3">${item.aif.category}</p>
              <div class="flex justify-between items-center bg-purple-50 p-2 rounded mb-3">
                <span class="text-sm font-medium">Allocation:</span>
                <span class="font-bold text-purple-800">₹${Math.round(item.allocationAmount).toLocaleString()}</span>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Historic Return:</span>
                  <span class="font-medium text-green-600">${item.aif.historicReturn}%</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Sharpe Ratio:</span>
                  <span class="font-medium">${item.aif.sharpeRatio}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Volatility:</span>
                  <span class="font-medium">${item.aif.volatility}%</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Min Investment:</span>
                  <span>₹${item.aif.minInvestment.toLocaleString()}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Lock-in Period:</span>
                  <span>${item.aif.lockInPeriod} months</span>
                </div>
              </div>
              <div class="mt-3 text-xs bg-gray-100 p-2 rounded">
                <span class="block font-medium text-gray-700">Focus Area:</span>
                <span class="block">${item.aif.focusArea}</span>
              </div>
              <div class="mt-2 text-xs text-right text-gray-500">
                <span>AUM: ₹${item.aif.aumCrores} Cr | Manager Exp: ${item.aif.managerExperience} yrs</span>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="mt-5 text-purple-100 p-3 rounded-md bg-purple-700 shadow-sm">
          <h6 class="font-semibold mb-1 text-white">Market Insights</h6>
          <ul class="list-disc pl-5 space-y-1 text-white text-sm">
            ${data.marketInsights ? data.marketInsights.map(insight => `<li>${insight}</li>`).join('') : ''}
          </ul>
        </div>
        
        <div class="mt-5 bg-purple-100 p-3 rounded-md border border-purple-300">
          <h6 class="font-semibold text-purple-800 mb-1">Tailored AIF Strategy Recommendations</h6>
          <ul class="list-disc pl-5 text-sm space-y-1">
            ${data.additionalRecommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
        
        <div class="mt-5 bg-blue-50 p-3 rounded-md border border-blue-200">
          <h6 class="font-semibold text-blue-800 mb-2">Current Market Conditions</h6>
          <div class="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p class="text-gray-600">Inflation:</p>
              <p class="font-medium">${data.marketConditions.inflation}%</p>
            </div>
            <div>
              <p class="text-gray-600">G-Sec Yield:</p>
              <p class="font-medium">${data.marketConditions.gsecYield}%</p>
            </div>
            <div>
              <p class="text-gray-600">GDP Growth:</p>
              <p class="font-medium">${data.marketConditions.gdpGrowth}%</p>
            </div>
            <div>
              <p class="text-gray-600">Nifty 1Y Return:</p>
              <p class="font-medium">${data.marketConditions.nifty1YrReturn}%</p>
            </div>
            <div>
              <p class="text-gray-600">Gold 1Y Return:</p>
              <p class="font-medium">${data.marketConditions.gold1YrReturn}%</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Show chart container
    document.getElementById('chart-container').classList.remove('hidden');
    
    // Create smaller asset allocation pie chart
    createPieChart(assetClasses, allocationValues, 'Recommended Asset Allocation', 'purple', true);
  }
                // paivest Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize portfolio stocks for VaR analysis
  const defaultStocks = [
    { ticker: 'RELIANCE.NS', weight: 10 },
    { ticker: 'TCS.NS', weight: 10 },
    { ticker: 'HDFCBANK.NS', weight: 10 },
    { ticker: 'INFY.NS', weight: 10 },
    { ticker: 'HINDUNILVR.NS', weight: 10 },
    { ticker: 'ICICIBANK.NS', weight: 10 },
    { ticker: 'ITC.NS', weight: 10 },
    { ticker: 'KOTAKBANK.NS', weight: 10 },
    { ticker: 'AXISBANK.NS', weight: 10 },
    { ticker: 'BHARTIARTL.NS', weight: 10 }
  ];

  // Variables for chart
  let resultsChart = null;

  // Tab switching
  const tabs = document.querySelectorAll('#tabs button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Get the tab ID
      const tabId = tab.id.replace('tab-', '');
      
      // Hide all tab contents
      tabContents.forEach(content => {
        content.classList.add('hidden');
      });
      
      // Remove active class from all tabs
      tabs.forEach(t => {
        t.classList.remove('tab-active');
        t.classList.add('text-gray-500');
      });
      
      // Show selected tab content
      document.getElementById(`content-${tabId}`).classList.remove('hidden');
      
      // Set active tab
      tab.classList.add('tab-active');
      tab.classList.remove('text-gray-500');
      
      // Hide results and error
      hideResults();
    });
  });

  // Populate VaR stocks inputs
  function populateVarStocks() {
    const stocksContainer = document.getElementById('var-stocks');
    stocksContainer.innerHTML = '';
    
    defaultStocks.forEach((stock, index) => {
      const stockRow = document.createElement('div');
      stockRow.className = 'flex items-center mb-2';
      stockRow.innerHTML = `
        <div class="w-1/2">
          <span class="text-gray-700">${stock.ticker}</span>
        </div>
        <div class="w-1/2">
          <input
            type="number"
            id="var-stock-weight-${index}"
            value="${stock.weight}"
            class="shadow border rounded w-full py-1 px-2 text-gray-700 focus:outline-none focus:shadow-outline"
            min="0"
            max="100"
            data-index="${index}"
          />
        </div>
      `;
      stocksContainer.appendChild(stockRow);
      
      // Add event listener for weight change
      stockRow.querySelector(`#var-stock-weight-${index}`).addEventListener('change', updateTotalWeight);
    });
    
    // Initial weight total
    updateTotalWeight();
  }

  // Update total weight display
  function updateTotalWeight() {
    const weights = Array.from(document.querySelectorAll('#var-stocks input[type="number"]'))
      .map(input => parseInt(input.value) || 0);
    
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const totalElement = document.getElementById('var-weight-total');
    
    totalElement.textContent = `Total Weight: ${totalWeight}%`;
    
    if (totalWeight === 100) {
      totalElement.classList.remove('text-red-600');
      totalElement.classList.add('text-green-600');
    } else {
      totalElement.classList.remove('text-green-600');
      totalElement.classList.add('text-red-600');
      totalElement.textContent += ' (Should be 100%)';
    }
    
    // Update stored weights
    weights.forEach((weight, index) => {
      defaultStocks[index].weight = weight;
    });
    
    return totalWeight;
  }

  // Form submission handlers
  document.getElementById('lstm-form').addEventListener('submit', handleLstmSubmit);
  document.getElementById('var-form').addEventListener('submit', handleVarSubmit);
  document.getElementById('aif-form').addEventListener('submit', handleAifSubmit);
  document.getElementById('sentiment-form').addEventListener('submit', handleSentimentSubmit);

  // LSTM form submission
  async function handleLstmSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const stock = document.getElementById('lstm-stock').value;
    const startDate = document.getElementById('lstm-start-date').value;
    const endDate = document.getElementById('lstm-end-date').value;
    const investmentAmount = parseFloat(document.getElementById('investment-amount').value);
    
    // Validate form
    if (!stock || !startDate || !endDate || isNaN(investmentAmount)) {
      showError('Please fill all fields with valid values.');
      return;
    }
    
    // Show loading indicator
    showLoading();
    
    try {
      // Call API
      const response = await fetch('/api/lstm-prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stock,
          startDate,
          endDate,
          investmentAmount
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }
      
      const data = await response.json();
      
      // Display results
      displayLstmResults(data);
    } catch (error) {
      showError(error.message);
    } finally {
      hideLoading();
    }
  }

  // VaR form submission
  async function handleVarSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const totalWeight = updateTotalWeight();
    const confidenceLevel = parseFloat(document.getElementById('var-confidence').value) / 100;
    const investmentAmount = parseFloat(document.getElementById('investment-amount').value);
    
    // Validate form
    if (totalWeight !== 100 || confidenceLevel < 0.8 || confidenceLevel > 0.99 || isNaN(investmentAmount)) {
      showError('Please ensure weights sum to 100% and confidence level is between 80% and 99%.');
      return;
    }
    
    // Show loading indicator
    showLoading();
    
    try {
      // Call API
      const response = await fetch('/api/var-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stocks: defaultStocks,
          confidenceLevel,
          investmentAmount
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get VaR analysis');
      }
      
      const data = await response.json();
      
      // Display results
      displayVarResults(data);
    } catch (error) {
      showError(error.message);
    } finally {
      hideLoading();
    }
  }

  // AIF form submission
  async function handleAifSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const riskProfile = document.getElementById('aif-risk-profile').value;
    const investmentHorizon = document.getElementById('aif-investment-horizon').value;
    const age = parseInt(document.getElementById('aif-age').value);
    const incomeStability = document.getElementById('aif-income-stability').value;
    const investmentAmount = parseFloat(document.getElementById('investment-amount').value);
    
    // Validate form
    if (!riskProfile || !investmentHorizon || isNaN(age) || !incomeStability || isNaN(investmentAmount)) {
      showError('Please fill all fields with valid values.');
      return;
    }
    
    // Show loading indicator
    showLoading();
    
    try {
      // Call API
      const response = await fetch('/api/aif-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          riskProfile,
          investmentHorizon,
          age,
          incomeStability,
          investmentAmount
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AIF recommendations');
      }
      
      const data = await response.json();
      
      // Display results
      displayAifResults(data);
    } catch (error) {
      showError(error.message);
    } finally {
      hideLoading();
    }
  }

  // Sentiment form submission
  async function handleSentimentSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const stock = document.getElementById('sentiment-stock').value;
    const startDate = document.getElementById('sentiment-start-date').value;
    const endDate = document.getElementById('sentiment-end-date').value;
    const investmentAmount = parseFloat(document.getElementById('investment-amount').value);
    
    // Validate form
    if (!stock || !startDate || !endDate || isNaN(investmentAmount)) {
      showError('Please fill all fields with valid values.');
      return;
    }
    
    // Show loading indicator
    showLoading();
    
    try {
      // Call API
      const response = await fetch('/api/sentiment-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stock,
          startDate,
          endDate,
          investmentAmount
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get sentiment analysis');
      }
      
      const data = await response.json();
      
      // Display results
      displaySentimentResults(data);
    } catch (error) {
      showError(error.message);
    } finally {
      hideLoading();
    }
  }

  // Display LSTM results
  function displayLstmResults(data) {
    // Show results container
    const resultsContainer = document.getElementById('results');
    resultsContainer.classList.remove('hidden');
    
    // Display summary
    const summaryElement = document.getElementById('results-summary');
    summaryElement.innerHTML = `
      <div class="bg-blue-50 p-4 rounded-md">
        <h4 class="text-lg font-bold text-blue-700 mb-2">LSTM Prediction Summary</h4>
        <p class="mb-2"><strong>Stock:</strong> ${data.stock}</p>
        <p class="mb-2"><strong>Investment Amount:</strong> ₹${data.investmentAmount.toLocaleString()}</p>
        <p class="mb-2"><strong>Prediction Period:</strong> ${data.summary.predictionStart} to ${data.summary.predictionEnd}</p>
        <p class="mb-2"><strong>Predicted Starting Price:</strong> ₹${data.summary.startPrice}</p>
        <p class="mb-2"><strong>Predicted Ending Price:</strong> ₹${data.summary.endPrice}</p>
        <p class="mb-2"><strong>Expected Return:</strong> ${data.summary.returnPercentage}%</p>
        <p><strong>Potential Profit:</strong> ₹${parseFloat(data.summary.potentialProfit).toLocaleString()}</p>
      </div>
    `;
    
    // Create chart
    createPriceChart(data.details.dates, data.details.predictions, 'Stock Price Prediction', 'blue');
  }

  // Display VaR results
  function displayVarResults(data) {
    // Show results container
    const resultsContainer = document.getElementById('results');
    resultsContainer.classList.remove('hidden');
    
    // Create weights array for chart
    const tickers = Object.keys(data.portfolioDetails.weights);
    const weightValues = tickers.map(ticker => parseFloat(data.portfolioDetails.weights[ticker]));
    
    // Display summary
    const summaryElement = document.getElementById('results-summary');
    summaryElement.innerHTML = `
      <div class="bg-green-50 p-4 rounded-md">
        <h4 class="text-lg font-bold text-green-700 mb-2">VaR Analysis Summary</h4>
        <p class="mb-2"><strong>Investment Amount:</strong> ₹${parseFloat(data.portfolioDetails.investmentValue).toLocaleString()}</p>
        <p class="mb-2"><strong>Confidence Level:</strong> ${data.portfolioDetails.confidenceLevel}</p>
        <p class="mb-2"><strong>Historical VaR:</strong> ₹${parseFloat(data.varMetrics.historicalVaR).toLocaleString()} (${data.varMetrics.varAsPercentage})</p>
        <p class="mb-2"><strong>Conditional VaR (Expected Shortfall):</strong> ₹${parseFloat(data.varMetrics.conditionalVaR).toLocaleString()}</p>
        <div class="mt-4">
          <p class="font-bold mb-2">Portfolio Metrics:</p>
          <p class="mb-1"><strong>Annual Return:</strong> ${data.portfolioMetrics.annualReturn}</p>
          <p class="mb-1"><strong>Annual Volatility:</strong> ${data.portfolioMetrics.annualVolatility}</p>
          <p class="mb-1"><strong>Sharpe Ratio:</strong> ${data.portfolioMetrics.sharpeRatio}</p>
        </div>
      </div>
    `;
    
    // Create portfolio weights chart
    createBarChart(tickers, weightValues, 'Portfolio Weights (%)', 'green');
  }

  // Display AIF results
  function displayAifResults(data) {
    // Show results container
    const resultsContainer = document.getElementById('results');
    resultsContainer.classList.remove('hidden');
    
    // Get asset allocation data for chart
    const assetClasses = Object.keys(data.assetAllocation);
    const allocationValues = Object.values(data.assetAllocation);
    
    // Display summary
    const summaryElement = document.getElementById('results-summary');
    summaryElement.innerHTML = `
      <div class="bg-purple-50 p-4 rounded-md">
        <h4 class="text-lg font-bold text-purple-700 mb-2">AIF Recommendation Summary</h4>
        <p class="mb-3"><strong>Investment Profile:</strong> ${data.investmentProfile.riskProfile} risk, ${data.investmentProfile.investmentHorizon} term</p>
        <p class="mb-3"><strong>Investment Amount:</strong> ₹${parseFloat(data.investmentProfile.investmentAmount).toLocaleString()}</p>
        
        <div class="grid grid-cols-2 gap-2 mb-3">
          <p><strong>Equity:</strong> ${data.assetAllocation.Equity}%</p>
          <p><strong>Debt:</strong> ${data.assetAllocation.Debt}%</p>
          <p><strong>Gold:</strong> ${data.assetAllocation.Gold}%</p>
          <p><strong>Real Estate:</strong> ${data.assetAllocation.RealEstate}%</p>
          <p><strong>Alternative:</strong> ${data.assetAllocation.Alternative}%</p>
        </div>
        
        <h5 class="text-md font-semibold text-purple-700 mt-5 mb-3">AIF Recommendations</h5>
        <div class="grid grid-cols-1 md:grid-cols-${Math.min(data.aifRecommendations.length, 3)} gap-4">
          ${data.aifRecommendations.map((item, index) => `
            <div class="recommendation-card bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
              <h6 class="font-bold text-purple-800 text-lg">${item.aif.name}</h6>
              <p class="text-sm text-gray-600 mb-2">${item.aif.category}</p>
              <div class="flex justify-between text-sm font-medium mb-1">
                <span>Allocation:</span>
                <span>₹${Math.round(item.allocationAmount).toLocaleString()}</span>
              </div>
              <div class="flex justify-between text-sm mb-1">
                <span>Historic Return:</span>
                <span class="font-medium text-green-600">${item.aif.historicReturn}%</span>
              </div>
              <div class="flex justify-between text-sm mb-1">
                <span>Sharpe Ratio:</span>
                <span class="font-medium">${item.aif.sharpeRatio}</span>
              </div>
              <div class="flex justify-between text-sm mb-1">
                <span>Min Investment:</span>
                <span>₹${item.aif.minInvestment.toLocaleString()}</span>
              </div>
              <div class="flex justify-between text-sm mb-1">
                <span>Lock-in Period:</span>
                <span>${item.aif.lockInPeriod} months</span>
              </div>
              <div class="mt-2 text-xs bg-gray-100 p-2 rounded">
                <span class="block font-medium">Focus Area:</span>
                <span class="block">${item.aif.focusArea}</span>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="mt-5 text-xs bg-yellow-50 p-3 rounded-md border-l-2 border-yellow-400">
          <h6 class="font-semibold mb-1">Notes:</h6>
          <ul class="list-disc pl-5 space-y-1">
            ${data.notes.map(note => `<li>${note}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    
    // Show chart container
    document.getElementById('chart-container').classList.remove('hidden');
    
    // Create smaller asset allocation pie chart
    createPieChart(assetClasses, allocationValues, 'Recommended Asset Allocation', 'purple', true);
  }

  // Display sentiment results
  function displaySentimentResults(data) {
    // Show results container
    const resultsContainer = document.getElementById('results');
    resultsContainer.classList.remove('hidden');
    
    // Display summary
    const summaryElement = document.getElementById('results-summary');
    summaryElement.innerHTML = `
      <div class="bg-orange-50 p-4 rounded-md">
        <h4 class="text-lg font-bold text-orange-700 mb-2">Sentiment Analysis Summary</h4>
        <p class="mb-2"><strong>Stock:</strong> ${data.stockData.ticker}</p>
        <p class="mb-2"><strong>Investment Amount:</strong> ₹${parseFloat(data.stockData.investmentAmount).toLocaleString()}</p>
        <p class="mb-2"><strong>Period:</strong> ${data.stockData.period.start} to ${data.stockData.period.end}</p>
        <p class="mb-2"><strong>Overall Sentiment:</strong> ${data.insightSummary.overallSentiment}</p>
        <p class="mb-2"><strong>Model Accuracy:</strong> ${data.performanceMetrics.modelAccuracy}</p>
        <p class="mb-2"><strong>Strategy Return:</strong> ${data.performanceMetrics.strategyReturn}</p>
        <p><strong>Buy & Hold Return:</strong> ${data.performanceMetrics.buyAndHoldReturn}</p>
        <p><strong>Outperformance:</strong> ${data.performanceMetrics.outperformance}</p>
        <div class="mt-4">
          <p class="font-bold mb-2">Insight:</p>
          <p>${data.insightSummary.trendAnalysis}</p>
        </div>
      </div>
    `;
    
    // Create sentiment vs price chart
    createDualChart(
      data.sentimentAnalysis.dates,
      data.sentimentAnalysis.prices,
      data.sentimentAnalysis.sentimentScores,
      'Stock Price vs Sentiment',
      'Price (₹)',
      'Sentiment Score',
      'orange'
    );
  }

  // Chart creation functions
  function createPriceChart(dates, prices, title, color) {
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    // Destroy previous chart if exists
    if (resultsChart) {
      resultsChart.destroy();
    }
    
    // Create new chart
    resultsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Predicted Price',
          data: prices,
          backgroundColor: `rgba(${color === 'blue' ? '59, 130, 246' : color === 'green' ? '16, 185, 129' : color === 'purple' ? '139, 92, 246' : '249, 115, 22'}, 0.2)`,
          borderColor: `rgba(${color === 'blue' ? '59, 130, 246' : color === 'green' ? '16, 185, 129' : color === 'purple' ? '139, 92, 246' : '249, 115, 22'}, 1)`,
          borderWidth: 2,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: 14
            }
          },
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              font: {
                size: 11
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date',
              font: {
                size: 11
              }
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              font: {
                size: 10
              }
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Price (₹)',
              font: {
                size: 11
              }
            },
            ticks: {
              font: {
                size: 10
              }
            }
          }
        }
      }
    });
  }

  function createBarChart(labels, values, title, color) {
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    // Destroy previous chart if exists
    if (resultsChart) {
      resultsChart.destroy();
    }
    
    // Create new chart
    resultsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Weight (%)',
          data: values,
          backgroundColor: `rgba(${color === 'blue' ? '59, 130, 246' : color === 'green' ? '16, 185, 129' : color === 'purple' ? '139, 92, 246' : '249, 115, 22'}, 0.7)`,
          borderColor: `rgba(${color === 'blue' ? '59, 130, 246' : color === 'green' ? '16, 185, 129' : color === 'purple' ? '139, 92, 246' : '249, 115, 22'}, 1)`,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: 14
            }
          },
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              font: {
                size: 11
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              font: {
                size: 10
              }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 10
              }
            }
          }
        }
      }
    });
  }

  function createPieChart(labels, values, title, color, isSmall = false) {
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    // Destroy previous chart if exists
    if (resultsChart) {
      resultsChart.destroy();
    }
    
    // Create color array based on main color
    const colorBase = color === 'blue' ? [59, 130, 246] : 
                      color === 'green' ? [16, 185, 129] : 
                      color === 'purple' ? [139, 92, 246] : 
                      [249, 115, 22];
    
    // Generate colors with varying opacity
    const backgroundColors = [
      `rgba(${colorBase[0]}, ${colorBase[1]}, ${colorBase[2]}, 0.9)`,
      `rgba(${colorBase[0]}, ${colorBase[1]}, ${colorBase[2]}, 0.7)`,
      `rgba(${colorBase[0]}, ${colorBase[1]}, ${colorBase[2]}, 0.5)`,
      `rgba(${colorBase[0]}, ${colorBase[1]}, ${colorBase[2]}, 0.3)`,
      `rgba(${colorBase[0]}, ${colorBase[1]}, ${colorBase[2]}, 0.2)`
    ];
    
    // Create new chart
    resultsChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Allocation (%)',
          data: values,
          backgroundColor: backgroundColors,
          borderColor: `rgba(${colorBase[0]}, ${colorBase[1]}, ${colorBase[2]}, 1)`,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: isSmall ? 2.2 : 2, // Further increased from 2.0 to 2.2
        layout: {
          padding: {
            left: 25,
            right: 25,
            top: 20,
            bottom: 20
          }
        },
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: 16  // Larger title
            },
            padding: {
              top: 10,
              bottom: 15
            }
          },
          legend: {
            position: isSmall ? 'right' : 'right', // Changed from bottom to right for more space
            align: 'center',
            labels: {
              boxWidth: 15, // Larger legend items
              padding: 15, // More spacing between legend items
              font: {
                size: 12  // Larger font size
              }
            }
          },
          tooltip: {
            titleFont: {
              size: 14
            },
            bodyFont: {
              size: 13
            },
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}%`;
              }
            }
          }
        }
      }
    });
  }

  function createDualChart(dates, prices, sentiments, title, yLabel1, yLabel2, color) {
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    // Destroy previous chart if exists
    if (resultsChart) {
      resultsChart.destroy();
    }
    
    // Create new chart
    resultsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Stock Price',
            data: prices,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            tension: 0.2,
            yAxisID: 'y'
          },
          {
            label: 'Sentiment Score',
            data: sentiments,
            backgroundColor: 'rgba(249, 115, 22, 0.2)',
            borderColor: 'rgba(249, 115, 22, 1)',
            borderWidth: 2,
            tension: 0.2,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: 14
            }
          },
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              font: {
                size: 11
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date',
              font: {
                size: 11
              }
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              font: {
                size: 10
              }
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: yLabel1,
              font: {
                size: 11
              }
            },
            ticks: {
              font: {
                size: 10
              }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: yLabel2,
              font: {
                size: 11
              }
            },
            min: 0,
            max: 1,
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              font: {
                size: 10
              }
            }
          }
        }
      }
    });
  }

  // Utility functions
  function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('error').classList.add('hidden');
    document.getElementById('results').classList.add('hidden');
  }

  function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
  }

  function showError(message) {
    document.getElementById('error').classList.remove('hidden');
    document.getElementById('error-message').textContent = message;
    document.getElementById('results').classList.add('hidden');
  }

  function hideResults() {
    document.getElementById('error').classList.add('hidden');
    document.getElementById('results').classList.add('hidden');
    
    // Destroy chart if exists
    if (resultsChart) {
      resultsChart.destroy();
      resultsChart = null;
    }
  }

  // Initialize VaR stocks
  populateVarStocks();
});