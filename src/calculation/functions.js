export const calculateScores = (scoreFor, scoreAgainst) => {
  return {
    win: scoreFor > scoreAgainst,
    lose: scoreFor < scoreAgainst,
    draw: scoreFor === scoreAgainst,
    scoreFor,
    scoreAgainst
  };
};

export const calculatePoints = (wins, draws) => wins + draws;

export const calculateGoalDifference = (goalsFor, goalsAgainst) =>
  goalsFor - goalsAgainst;
