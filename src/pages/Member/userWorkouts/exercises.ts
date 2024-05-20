interface Exercise {
  title: string;
  primary: string;
  group: string[];
  type: string;
}

const exercises: Exercise[] = [
  {
    title: "Treadmill",
    primary: "Cardiovascular",
    group: ["Cardiovascular"],
    type: "Cardio",
  },
  {
    title: "Bench Press (Barbell)",
    primary: "Chest",
    group: ["Chest", "Shoulders", "Triceps", "Push"],
    type: "Weights",
  },
  {
    title: "Overhead Press (Barbell)",
    primary: "Shoulders",
    group: ["Shoulders", "Triceps", "Push"],
    type: "Weights",
  },
  {
    title: "Cable Fly Crossovers",
    primary: "Chest",
    group: ["Chest", "Push"],
    type: "Weights",
  },
  {
    title: "Lateral Raise (Dumbbell)",
    primary: "Shoulders",
    group: ["Shoulders", "Push"],
    type: "Weights",
  },
  {
    title: "Triceps Pushdown",
    primary: "Triceps",
    group: ["Triceps", "Push"],
    type: "Weights",
  },
  {
    title: "Pull Up",
    primary: "Back",
    group: ["Back", "Pull"],
    type: "Bodyweight",
  },
  {
    title: "Leg Press (Machine)",
    primary: "Legs",
    group: ["Legs", "Push"],
    type: "Weights",
  },
  {
    title: "T Bar Row",
    primary: "Back",
    group: ["Back", "Pull"],
    type: "Weights",
  },
  {
    title: "Squat (Barbell)",
    primary: "Legs",
    group: ["Legs", "Push"],
    type: "Weights",
  },
  {
    title: "Tricep Rope PushDown",
    primary: "Triceps",
    group: ["Triceps", "Push"],
    type: "Weights",
  },
  {
    title: "Bench Press (Dumbbell)",
    primary: "Chest",
    group: ["Chest", "Push"],
    type: "Weights",
  },
  {
    title: "Triceps Dip (Weighted)",
    primary: "Triceps",
    group: ["Triceps", "Push"],
    type: "Weights",
  },
  {
    title: "Decline Crunch (Weighted)",
    primary: "Abdominals",
    group: ["Abdominals", "Core"],
    type: "Weights",
  },
  {
    title: "Butterfly (Pec Deck)",
    primary: "Chest",
    group: ["Chest", "Push"],
    type: "Weights",
  },
  {
    title: "Cable Twist (Up to down)",
    primary: "Core",
    group: ["Core"],
    type: "Weights",
  },
  {
    title: "Plank",
    primary: "Core",
    group: ["Core"],
    type: "Bodyweight",
  },
  {
    title: "Pull Up (Weighted)",
    primary: "Back",
    group: ["Back", "Pull"],
    type: "Weights",
  },
  {
    title: "Seated Incline Curl (Dumbbell)",
    primary: "Biceps",
    group: ["Biceps", "Pull"],
    type: "Weights",
  },
  {
    title: "Spider Curl (Dumbbell)",
    primary: "Biceps",
    group: ["Biceps", "Pull"],
    type: "Weights",
  },
  {
    title: "Seated Palms Up Wrist Curl",
    primary: "Forearms",
    group: ["Forearms"],
    type: "Weights",
  },
  {
    title: "Bicep Curl",
    primary: "Biceps",
    group: ["Biceps", "Pull"],
    type: "Weights",
  },
  {
    title: "Calf Extension",
    primary: "Calves",
    group: ["Calves"],
    type: "Weights",
  },
  {
    title: "Hammer Curl",
    primary: "Biceps",
    group: ["Biceps", "Pull"],
    type: "Weights",
  },
  {
    title: "Ab Wheel",
    primary: "Abdominals",
    group: ["Abdominals", "Core"],
    type: "Bodyweight",
  },
  {
    title: "Arnold Press",
    primary: "Shoulders",
    group: ["Shoulders", "Push"],
    type: "Weights",
  },
  {
    title: "Pistol Squats",
    primary: "Legs",
    group: ["Legs", "Push"],
    type: "Bodyweight",
  },
  {
    title: "Bench Dip",
    primary: "Triceps",
    group: ["Triceps", "Push"],
    type: "Bodyweight",
  },
  {
    title: "Bent Over Row",
    primary: "Back",
    group: ["Back", "Pull"],
    type: "Weights",
  },
  {
    title: "Cable Crunch",
    primary: "Abdominals",
    group: ["Abdominals", "Core"],
    type: "Weights",
  },
  {
    title: "Calf Extension",
    primary: "Calves",
    group: ["Calves"],
    type: "Weights",
  },
  {
    title: "Chest Dip",
    primary: "Chest",
    group: ["Chest", "Push"],
    type: "Bodyweight",
  },
  {
    title: "Chest Fly (Band)",
    primary: "Chest",
    group: ["Chest", "Push"],
    type: "Weights",
  },
  {
    title: "Chest Fly (Machine)",
    primary: "Chest",
    group: ["Chest", "Push"],
    type: "Weights",
  },
  {
    title: "Chest Press (Machine)",
    primary: "Chest",
    group: ["Chest", "Push"],
    type: "Weights",
  },
  {
    title: "Chin Up",
    primary: "Back",
    group: ["Back", "Pull"],
    type: "Bodyweight",
  },
  {
    title: "Concentration Curl",
    primary: "Biceps",
    group: ["Biceps", "Pull"],
    type: "Weights",
  },
  {
    title: "Dead Hang",
    primary: "Forearms",
    group: ["Forearms"],
    type: "Bodyweight",
  },
  {
    title: "Deadlift (Barbell)",
    primary: "Back",
    group: ["Back", "Legs", "Pull"],
    type: "Weights",
  },
  {
    title: "Decline Bench Press (Dumbbell)",
    primary: "Chest",
    group: ["Chest", "Push"],
    type: "Weights",
  },
];

export default exercises;
