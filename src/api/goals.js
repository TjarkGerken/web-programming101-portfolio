import store from "@/store";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { aggregateStats } from "@/api/getPolarActivities";

/*
const example_goal = {
  start_date: dateValue.value[0],
  end_date: dateValue.value[1],
  goal_type: selected_goal.value.name,
  goal_value: value.value,
};
*/

export function createGoal(goal) {
  goal["start_date"] = firebase.firestore.Timestamp.fromDate(
    new Date(goal.start_date),
  );
  goal["end_date"] = firebase.firestore.Timestamp.fromDate(
    new Date(goal.end_date),
  );
  return firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid)
    .collection("goals")
    .add(goal);
}

export function getGoals() {
  return firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid)
    .collection("goals")
    .get()
    .then((res) => {
      return res.docs.map((doc) => doc.data());
    });
}

export function getGoalData(goal) {
  return firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid)
    .collection("exercises")
    .where("start-time-sorting", ">=", goal.start_date)
    .where("start-time-sorting", "<=", goal.end_date)
    .get()
    .then((res) => {
      return res.docs.map((doc) => doc.data());
    });
}

export async function evaluateGoals() {
  const goals = await getGoals();
  return await Promise.all(
    goals.map(async (goal) => {
      const goalData = await getGoalData(goal);
      return {
        ...goal,
        ...aggregateStats(goalData),
      };
    }),
  );
}
