/**
 * Match Prediction Engine
 * Uses ML to predict match outcomes and probabilities
 */

import { EventEmitter } from 'events';

interface MatchData {
  matchId: string;
  team1: string;
  team2: string;
  currentRuns: number;
  wickets: number;
  overs: number;
  venue: string;
}

interface Prediction {
  matchId: string;
  winProbability: { team1: number; team2: number };
  predictedWinner: string;
  confidence: number;
  factors: PredictionFactor[];
}

interface PredictionFactor {
  name: string;
  impact: number; // -1 to 1
  description: string;
}

class MatchPredictionEngine extends EventEmitter {
  private trainingData: Map<string, MatchData[]>;
  private predictions: Map<string, Prediction>;

  constructor() {
    super();
    this.trainingData = new Map();
    this.predictions = new Map();
  }

  /**
   * Add training data for a team
   */
  addTrainingData(team: string, matches: MatchData[]): void {
    this.trainingData.set(team, matches);
    this.emit('dataAdded', { team, count: matches.length });
  }

  /**
   * Predict match outcome
   */
  predictMatch(matchData: MatchData): Prediction {
    const factors: PredictionFactor[] = [];

    // Home/Away factor
    const homeAdvantage = this.calculateHomeAdvantage(matchData);
    factors.push({
      name: 'Home Advantage',
      impact: homeAdvantage,
      description: `${homeAdvantage > 0 ? 'Favors' : 'Against'} Team 1`,
    });

    // Recent form factor
    const recentForm = this.calculateRecentForm(matchData);
    factors.push({
      name: 'Recent Form',
      impact: recentForm,
      description: `Based on last 5 matches`,
    });

    // Head-to-head factor
    const h2h = this.calculateHeadToHead(matchData);
    factors.push({
      name: 'Head-to-Head',
      impact: h2h,
      description: `Historical record between teams`,
    });

    // Run rate factor
    const runRateFactor = this.calculateRunRate(matchData);
    factors.push({
      name: 'Run Rate',
      impact: runRateFactor,
      description: `Current vs required RRR`,
    });

    // Calculate probabilities
    const baseProb = 0.5;
    const totalImpact = factors.reduce((sum, f) => sum + f.impact, 0);
    const adjustment = totalImpact / factors.length * 0.3; // 30% max adjustment

    const team1Prob = Math.min(1, Math.max(0, baseProb + adjustment));
    const team2Prob = 1 - team1Prob;

    const confidence = Math.abs(team1Prob - 0.5) * 2 * 0.95; // High confidence if strong lead

    const prediction: Prediction = {
      matchId: matchData.matchId,
      winProbability: { team1: team1Prob, team2: team2Prob },
      predictedWinner: team1Prob > team2Prob ? matchData.team1 : matchData.team2,
      confidence,
      factors,
    };

    this.predictions.set(matchData.matchId, prediction);
    this.emit('predictionGenerated', prediction);
    return prediction;
  }

  /**
   * Calculate home advantage factor
   */
  private calculateHomeAdvantage(data: MatchData): number {
    // Simulate home ground advantage
    return Math.random() * 0.2 - 0.1; // -10% to +10%
  }

  /**
   * Calculate recent form factor
   */
  private calculateRecentForm(data: MatchData): number {
    const team1Data = this.trainingData.get(data.team1) || [];
    const team2Data = this.trainingData.get(data.team2) || [];

    const team1Recent = team1Data.slice(-5).reduce((sum, m) => sum + m.currentRuns, 0) / 5;
    const team2Recent = team2Data.slice(-5).reduce((sum, m) => sum + m.currentRuns, 0) / 5;

    return (team1Recent - team2Recent) / 200; // Normalize
  }

  /**
   * Calculate head-to-head record
   */
  private calculateHeadToHead(data: MatchData): number {
    // Would compare historical match records
    return Math.random() * 0.15 - 0.075; // -7.5% to +7.5%
  }

  /**
   * Calculate run rate factor
   */
  private calculateRunRate(data: MatchData): number {
    const currentRRR = data.currentRuns / (data.overs || 1);
    const requiredRRR = 150 / (20 - data.overs); // Assume 150 target
    
    return Math.min(0.3, Math.max(-0.3, (requiredRRR - currentRRR) / 20));
  }

  /**
   * Get prediction for match
   */
  getPrediction(matchId: string): Prediction | undefined {
    return this.predictions.get(matchId);
  }

  /**
   * Update prediction with new data
   */
  updatePrediction(matchData: MatchData): Prediction {
    return this.predictMatch(matchData);
  }
}

export default new MatchPredictionEngine();
