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
  console.log(goal["start_date"]);
  console.log(goal["end_date"]);
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
  console.log(goal["start_date"]);
  console.log(goal["end_date"]);
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