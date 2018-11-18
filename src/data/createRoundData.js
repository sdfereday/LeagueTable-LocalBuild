import { keyExists } from "../helpers/arrayHelpers";
import { createStore } from "redux";
import teamReducer from "../reducers/teamReducer";

import {
  addTeam,
  updateTeamScore,
  updateTeamMetrics,
  clearData,
  orderBy
} from "../actions/teamActions";

import {
  calculateScores,
  calculateGoalDifference,
  calculatePoints
} from "../calculation/functions";

import SCORE_VALUES from "../enums/scoreValues";

// We create a Redux store to provide a single source of truth when it comes to our team data.
const teamStore = createStore(teamReducer);

export default roundData => {
  // Reset data just in case it's changed.
  teamStore.dispatch(clearData());

  /* This relies on a particular data shape, and could cause issues if
  you suddenly decide to change the structure of the raw JSON.
  We first calculate the scores for each team. */
  roundData.forEach(({ matches }) => {
    matches.forEach(({ team1, team2, score1, score2 }) => {
      /* We get the exact current state of the Redux store to query whether a team has been added. This may be better
      as an action however... */
      const storeState = teamStore.getState();

      // Refer to 'calculation/functions' for this section.
      const team1ScoreData = calculateScores(score1, score2);
      const team2ScoreData = calculateScores(score2, score1);

      // Should a team not exist of the key 'n' in the redux store, we create it.
      if (!keyExists(storeState, team1.key)) {
        teamStore.dispatch(
          addTeam({
            key: team1.key,
            name: team1.name,
            code: team1.code
          })
        );
      }

      if (!keyExists(storeState, team2.key)) {
        teamStore.dispatch(
          addTeam({
            key: team2.key,
            name: team2.name,
            code: team2.code
          })
        );
      }

      /* Since we can be sure we have the team added (if not already), we dispatch an
      object of score data for each team so it can be incremented for this particular round. */
      teamStore.dispatch(
        updateTeamScore({
          key: team1.key,
          scoreData: team1ScoreData
        })
      );

      teamStore.dispatch(
        updateTeamScore({
          key: team2.key,
          scoreData: team2ScoreData
        })
      );
    });
  });

  /* Now we have the scores for each team sorted, we can run some last metrics to
  figure out the total points and goal differences. */
  teamStore
    .getState() // Again we grab a state of the store at this moment in time.
    .map(team => {
      const { key, totalWins, totalDraws, goalsFor, goalsAgainst } = team;

      const wins = totalWins * SCORE_VALUES.WIN,
        draws = totalDraws * SCORE_VALUES.DRAW;

      const points = calculatePoints(wins, draws),
        goalDifference = calculateGoalDifference(goalsFor, goalsAgainst);

      // Only return what we need to the sorting method.
      return {
        key,
        goalsFor,
        points,
        goalDifference
      };
    })
    .sort(
      /*Rank is determined by points, then goal difference, then goals scored.
    If value equal, then the next condition is used. This should apply the correct
    order in which the team should rank. */
      (a, b) =>
        b.points - a.points ||
        b.goalDifference - a.goalDifference ||
        b.goalsFor - a.goalsFor
    )
    .forEach(({ key, points, goalDifference }, i) => {
      /* Update the final metrics supplied and assign a ranking based on sorted index.
      The items at this point in the store won't be ordered however, so a final dispatch
      is sent to ensure they are. I almost just made the store do it automatically, but
      that's quite side-effectish and didn't seem like a good idea... */
      teamStore.dispatch(
        updateTeamMetrics({
          key,
          points,
          goalDifference,
          rank: i + 1
        })
      );
    });

  // And one final sorting action call (ascending by default)
  teamStore.dispatch(orderBy({ property: "rank" }));

  /* Since this is more a one-shot example, we just return the state of the store
  after calculations have been performed. You might want to wrap the app within redux
  to monitor the stores updates adn perform additional logic / requests. */
  return teamStore.getState();
};
