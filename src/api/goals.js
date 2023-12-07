import store from "@/store";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { aggregateStats } from "@/api/getPolarActivities";

/**
 * Creates a goal in the database.
 * @param goal The goal data from the form of the dashboard
 * @returns {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>} Returns the response from firebase
 */
export function createGoal(goal) {
  // Convert the start_date to a firebase Timestamp
  const [day, month, year] = goal["start_date"].split(".");
  const formattedStartDate = `${year}-${month}-${day}`;
  goal["start_date"] = firebase.firestore.Timestamp.fromDate(
    new Date(formattedStartDate),
  );

  // Do the same for end_date
  const [endDay, endMonth, endYear] = goal["end_date"].split(".");
  const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;
  goal["end_date"] = firebase.firestore.Timestamp.fromDate(
    new Date(formattedEndDate),
  );

  // Add the goal
  return firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid)
    .collection("goals")
    .add(goal);
}

/**
 *  Get the coals that have their end date in the next seven days. To display it on the dashboard.
 * @returns {Promise<{data: *, id: *}[]>}
 */
export function getGoals() {
  // Initialize the dates
  let todayDate = new Date();
  let futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);

  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  // Filter for the goals  have their end date in the next seven days
  return userDocRef
    .collection("goals")
    .where("end_date", ">=", firebase.firestore.Timestamp.fromDate(todayDate))
    .where("end_date", "<=", firebase.firestore.Timestamp.fromDate(futureDate))
    .get()
    .then((res) => {
      // Iterate over the goals to get their data and id for later reference
      return res.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });
    });
}

/**
 * Gets the exercise data  for a goal. This is used to evaluate the goal.
 * @param goal The goal data from the getGoals function
 * @returns {Promise<firebase.firestore.DocumentData[]>} Returns the exercise data for the goal
 */
export function getGoalData(goal) {
  // Get the exercise data for the goal
  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  // Filter for the exercises that are in the time frame of the goal
  return userDocRef
    .collection("exercises")
    .where("start-time-sorting", ">=", goal.start_date)
    .where("start-time-sorting", "<=", goal.end_date)
    .get()
    .then((res) => {
      return res.docs.map((doc) => doc.data());
    });
}

/**
 * This function evalutates the goals, which is done by utilising the aggregateStats and getGoalData functions. Based on the goal type the goal value and the proper aggregated stat is compared.
 * @returns {Promise<Awaited<unknown>[]>} Returns the goal, with the completion and the stats as well as the id
 */
export async function evaluateGoals() {
  // Get all the goals
  const goals = await getGoals();
  return await Promise.all(
    goals.map(async (goal) => {
      // For every goal get the data
      const id = goal.id;
      goal = goal.data;
      // Get the stats of the goal
      const goalData = await getGoalData(goal);
      // If the goal has exercises, aggregate the stats and compare them to the goal value
      if (goalData) {
        const aggregatedStats = aggregateStats(goalData);
        let completed = false;
        if (goal.goal_type === "Distance") {
          completed = goal.goal_value <= aggregatedStats.total_distance;
        } else if (goal.goal_type === "Time") {
          // Convert the Duration (HH:MM:SS) to minutes
          let durationParts = aggregatedStats.total_duration.split(":");
          let totalMinutes =
            parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
          completed = goal.goal_value <= totalMinutes;
        } else if (goal.goal_type === "Calories") {
          completed = goal.goal_value <= aggregatedStats.total_calories;
        }
        return {
          id,
          ...goal,
          ...aggregatedStats,
          completed,
        };
      } else {
        // If the goal has no exercises, return the goal with the aggregate stats set to 0
        const aggregateStats = {
          total_distance: 0,
          total_duration: "00:00:00",
          total_calories: 0,
          total_exercises: 0,
          avg_hf: 0,
        };
        return {
          id,
          ...goal,
          ...aggregateStats,
          completed: false,
        };
      }
    }),
  );
}

/**
 * Deletes a goal by its id
 * @param id The Firestore ID of the Goal
 * @returns {Promise<void>}
 */
export async function deleteGoalById(id) {
  return firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid)
    .collection("goals")
    .doc(id)
    .delete();
}
