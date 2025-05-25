const express = require('express');
const router = express.Router();

// AIF recommendation endpoint
router.post('/aif-recommendation', (req, res) => {
  try {
    const { riskProfile, investmentHorizon, age, incomeStability, investmentAmount } = req.body;
    
    console.log("Received AIF recommendation request:", { 
      riskProfile, 
      investmentHorizon, 
      age, 
      incomeStability, 
      investmentAmount 
    });
    
    // Simulate processing time
    setTimeout(() => {
      // AIF data based on the detailed dataset
      const aifData = [
        {
          name: 'Avendus Absolute Return Fund',
          category: 'Equity: Long-Short',
          historicReturn: 15.2,
          volatility: 10.8,
          minInvestment: 1000000,
          lockInPeriod: 12,
          sharpeRatio: 1.12,
          riskScore: 6,
          focusArea: 'Absolute Returns',
          aumCrores: 2200,
          managerExperience: 18,
          assetClass: 'Equity'
        },
        {
          name: 'SageOne Investment Managers - Core Portfolio',
          category: 'Equity: Concentrated',
          historicReturn: 17.9,
          volatility: 13.5,
          minInvestment: 500000,
          lockInPeriod: 12,
          sharpeRatio: 1.05,
          riskScore: 8,
          focusArea: 'Small & Mid Cap',
          aumCrores: 1800,
          managerExperience: 22,
          assetClass: 'Equity'
        },
        {
          name: 'Edelweiss Long Short Fund',
          category: 'Equity: Market Neutral',
          historicReturn: 11.8,
          volatility: 8.7,
          minInvestment: 500000,
          lockInPeriod: 24,
          sharpeRatio: 1.17,
          riskScore: 5,
          focusArea: 'Low Correlation',
          aumCrores: 1500,
          managerExperience: 15,
          assetClass: 'Equity'
        },
        {
          name: 'White Oak India Equity Fund',
          category: 'Equity: Quality',
          historicReturn: 14.5,
          volatility: 11.2,
          minInvestment: 1000000,
          lockInPeriod: 18,
          sharpeRatio: 1.08,
          riskScore: 7,
          focusArea: 'Quality Companies',
          aumCrores: 2000,
          managerExperience: 20,
          assetClass: 'Equity'
        },
        {
          name: 'Motilal Oswal Focused Growth Opportunities Fund',
          category: 'Equity: Concentrated',
          historicReturn: 16.3,
          volatility: 12.8,
          minInvestment: 1000000,
          lockInPeriod: 24,
          sharpeRatio: 1.02,
          riskScore: 7,
          focusArea: 'Growth',
          aumCrores: 2400,
          managerExperience: 17,
          assetClass: 'Equity'
        },
        {
          name: 'ASK PMS Select India Portfolio',
          category: 'Equity: Multi-Cap',
          historicReturn: 14.8,
          volatility: 11.5,
          minInvestment: 500000,
          lockInPeriod: 12,
          sharpeRatio: 1.06,
          riskScore: 6,
          focusArea: 'Multi-Cap Quality',
          aumCrores: 1700,
          managerExperience: 19,
          assetClass: 'Equity'
        },
        {
          name: 'Marcellus Investment Managers - Consistent Compounders',
          category: 'Equity: Quality',
          historicReturn: 17.2,
          volatility: 10.5,
          minInvestment: 1000000,
          lockInPeriod: 18,
          sharpeRatio: 1.23,
          riskScore: 6,
          focusArea: 'Quality Compounders',
          aumCrores: 3200,
          managerExperience: 24,
          assetClass: 'Equity'
        },
        {
          name: 'IIFL Multi-Strategy Fund',
          category: 'Multi-Strategy',
          historicReturn: 13.1,
          volatility: 9.2,
          minInvestment: 500000,
          lockInPeriod: 12,
          sharpeRatio: 1.15,
          riskScore: 5,
          focusArea: 'Diversified Strategies',
          aumCrores: 1900,
          managerExperience: 16,
          assetClass: 'Multi-Asset'
        },
        {
          name: 'Nippon India Yield Maximizer Fund',
          category: 'Fixed Income: Structured',
          historicReturn: 12.2,
          volatility: 7.2,
          minInvestment: 1000000,
          lockInPeriod: 24,
          sharpeRatio: 1.28,
          riskScore: 4,
          focusArea: 'Fixed Income Plus',
          aumCrores: 1400,
          managerExperience: 14,
          assetClass: 'Debt'
        },
        {
          name: 'Kotak Alternate Strategies Fund',
          category: 'Multi-Strategy',
          historicReturn: 13.4,
          volatility: 9.8,
          minInvestment: 1000000,
          lockInPeriod: 18,
          sharpeRatio: 1.09,
          riskScore: 6,
          focusArea: 'Multiple Asset Classes',
          aumCrores: 2500,
          managerExperience: 21,
          assetClass: 'Multi-Asset'
        },
        {
          name: 'Quantum Long Short Equity Fund',
          category: 'Equity: Quant',
          historicReturn: 12.8,
          volatility: 8.8,
          minInvestment: 500000,
          lockInPeriod: 12,
          sharpeRatio: 1.21,
          riskScore: 5,
          focusArea: 'Quantitative Models',
          aumCrores: 1100,
          managerExperience: 16,
          assetClass: 'Equity'
        },
        {
          name: 'UTI Structured Debt Opportunities Fund',
          category: 'Fixed Income: Structured',
          historicReturn: 11.5,
          volatility: 6.5,
          minInvestment: 1000000,
          lockInPeriod: 36,
          sharpeRatio: 1.35,
          riskScore: 3,
          focusArea: 'Corporate Credit',
          aumCrores: 1600,
          managerExperience: 18,
          assetClass: 'Debt'
        },
        {
          name: 'Tata Absolute Return Fund',
          category: 'Multi-Asset',
          historicReturn: 12.5,
          volatility: 9.5,
          minInvestment: 1000000,
          lockInPeriod: 12,
          sharpeRatio: 1.11,
          riskScore: 5,
          focusArea: 'Multi-Asset Absolute Return',
          aumCrores: 1800,
          managerExperience: 15,
          assetClass: 'Multi-Asset'
        },
        {
          name: 'ICICI Prudential AMC Alternative Investment Fund',
          category: 'Multi-Asset',
          historicReturn: 13.8,
          volatility: 10.5,
          minInvestment: 1000000,
          lockInPeriod: 18,
          sharpeRatio: 1.08,
          riskScore: 6,
          focusArea: 'Diversified Strategies',
          aumCrores: 2700,
          managerExperience: 22,
          assetClass: 'Multi-Asset'
        },
        {
          name: 'SBI Long Short Equity Fund',
          category: 'Equity: Market Neutral',
          historicReturn: 11.9,
          volatility: 8.2,
          minInvestment: 1000000,
          lockInPeriod: 12,
          sharpeRatio: 1.19,
          riskScore: 4,
          focusArea: 'Market Neutral',
          aumCrores: 2100,
          managerExperience: 19,
          assetClass: 'Equity'
        }
      ];
      
      // Filter AIFs based on risk profile (removing investment amount restriction)
      let filteredAifs = aifData.filter(aif => {
        // Filter by risk profile
        if (riskProfile === 'Conservative' && aif.riskScore > 4) return false;
        if (riskProfile === 'Moderate' && (aif.riskScore < 3 || aif.riskScore > 6)) return false;
        if (riskProfile === 'Aggressive' && aif.riskScore < 5) return false;
        
        // Filter by investment horizon
        if (investmentHorizon === 'Short' && aif.lockInPeriod > 18) return false;
        
        return true;
      });
      
      console.log(`Filtered AIFs: ${filteredAifs.length} matches found`);
      
      // Calculate asset allocation percentages based on risk profile and age
      let assetAllocation = {};
      if (riskProfile === 'Conservative') {
        assetAllocation = {
          Equity: 20,
          Debt: 60, 
          Gold: 10,
          RealEstate: 5,
          Alternative: 5
        };
      } else if (riskProfile === 'Moderate') {
        assetAllocation = {
          Equity: 40,
          Debt: 40,
          Gold: 10,
          RealEstate: 5,
          Alternative: 5
        };
      } else { // Aggressive
        assetAllocation = {
          Equity: 65,
          Debt: 20,
          Gold: 5,
          RealEstate: 5,
          Alternative: 5
        };
      }
      
      // Age-based adjustments
      if (age < 30 && riskProfile !== 'Conservative') {
        // Younger investors can take more risk
        assetAllocation.Equity += 5;
        assetAllocation.Debt -= 5;
      } else if (age > 50 && riskProfile !== 'Aggressive') {
        // Older investors reduce risk
        assetAllocation.Equity -= 5;
        assetAllocation.Debt += 5;
      }
      
      // Sort by risk-adjusted returns (Sharpe ratio) for better recommendations
      filteredAifs.sort((a, b) => b.sharpeRatio - a.sharpeRatio);
      
      // Get the top 3 AIFs or all if fewer than 3
      const topAifs = filteredAifs.slice(0, 3);
      
      // Calculate allocation amounts for each AIF
      const alternativeAllocation = assetAllocation.Alternative / 100 * investmentAmount;
      const aifAllocations = [];
      
      if (topAifs.length === 1) {
        aifAllocations.push({ 
          aif: topAifs[0], 
          allocationPercentage: 100,
          allocationAmount: alternativeAllocation
        });
      } else if (topAifs.length === 2) {
        aifAllocations.push({ 
          aif: topAifs[0], 
          allocationPercentage: 60,
          allocationAmount: alternativeAllocation * 0.6
        });
        aifAllocations.push({ 
          aif: topAifs[1], 
          allocationPercentage: 40,
          allocationAmount: alternativeAllocation * 0.4
        });
      } else if (topAifs.length >= 3) {
        aifAllocations.push({ 
          aif: topAifs[0], 
          allocationPercentage: 50,
          allocationAmount: alternativeAllocation * 0.5
        });
        aifAllocations.push({ 
          aif: topAifs[1], 
          allocationPercentage: 30,
          allocationAmount: alternativeAllocation * 0.3
        });
        aifAllocations.push({ 
          aif: topAifs[2], 
          allocationPercentage: 20,
          allocationAmount: alternativeAllocation * 0.2
        });
      }
      
      // Current market conditions (for recommendation context)
      const marketConditions = {
        inflation: 5.1,
        gsecYield: 7.05,
        gdpGrowth: 6.7,
        nifty1YrReturn: 14.5,
        gold1YrReturn: 12.8
      };
      
      // Additional AIF recommendations based on risk profile
      let additionalRecommendations = [];
      
      if (riskProfile === 'Conservative') {
        additionalRecommendations = [
          "Consider debt-focused AIF strategies with lower volatility",
          "Structured credit funds may provide stable returns with lower risk",
          "Fixed income AIFs are aligned with your conservative risk profile",
          "AIF with lower volatility (under 8%) may be suitable"
        ];
      } else if (riskProfile === 'Moderate') {
        additionalRecommendations = [
          "Multi-asset AIFs can provide balanced exposure across asset classes",
          "Consider a mix of long-short equity and structured debt AIFs",
          "Market-neutral strategies may provide steady returns with moderate risk",
          "Focus on AIFs with Sharpe ratio above 1.1 for better risk-adjusted returns"
        ];
      } else { // Aggressive
        additionalRecommendations = [
          "Growth-focused equity AIFs can maximize returns for your risk appetite",
          "Consider concentrated equity strategies with higher return potential",
          "Small and mid-cap focused AIFs align with your aggressive risk profile",
          "AIFs with historic returns above 15% may suit your growth objectives"
        ];
      }
      
      // Investment insights based on market conditions
      const marketInsights = [
        `With inflation at ${marketConditions.inflation}%, alternative investments can provide inflation-beating returns`,
        `Current G-Sec yield of ${marketConditions.gsecYield}% makes certain AIFs attractive compared to traditional fixed income`,
        `Market-neutral strategies can help navigate volatility in the equity markets`,
        `AIFs can provide portfolio diversification beyond traditional asset classes`
      ];
      
      console.log("Sending successful AIF recommendation with", aifAllocations.length, "recommendations");
      
      // Prepare the response
      res.json({
        success: true,
        investmentProfile: {
          riskProfile,
          investmentAmount,
          investmentHorizon,
          age,
          incomeStability
        },
        assetAllocation,
        aifRecommendations: aifAllocations,
        additionalRecommendations,
        marketInsights,
        marketConditions,
        notes: [
          //"AIFs typically have high minimum investment requirements (₹5 lakhs to ₹1 crore).",
          "AIFs have lock-in periods during which redemption is not permitted.",
          "Past performance is not indicative of future results.",
          "AIFs are regulated by SEBI but carry higher risk than traditional mutual funds.",
          "Consider tax implications before investing in AIFs."
        ]
      });
      
    }, 1500);
    
  } catch (error) {
    console.error('Error in AIF recommendation:', error);
    res.status(500).json({ error: 'Failed to process AIF recommendation' });
  }
});

module.exports = router;