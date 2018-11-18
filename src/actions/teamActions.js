/* Supplied actions for Redux to use when updating the store items. These are specifically for
anything related to teams. */
export const updateTeamScore = ({ key, scoreData }) => ({
  type: "UPDATE_TEAM_SCORE",
  key,
  scoreData
});

export const updateTeamMetrics = ({ key, goalDifference, points, rank }) => ({
  type: "UPDATE_TEAM_METRICS",
  key,
  goalDifference,
  points,
  rank
});

export const addTeam = ({ key, name, code }) => ({
  type: "ADD_TEAM",
  key,
  name,
  code
});

export const orderBy = ({ property, descending }) => ({
  type: "ORDER_BY",
  property,
  descending
});

export const clearData = () => ({
  type: "CLEAR_DATA"
});
