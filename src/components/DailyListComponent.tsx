import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ProjectHomeDisplay from "./ProjectHomeDisplay";
import WorkoutHomeDisplay from "./WorkoutHomeDisplay";
import { dayStrings } from "../generalStaticData";
import TodoHomeDisplay from "../components/TodoHomeDisplay";
import EventHomeDisplay from "./EventHomeDisplay";
import { PiPiggyBank } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
const DailyListComponent = ({
  routine,
  reports,
  events,
  todos,
  projects,
  day,
}) => {
  const [todaysProjects, setTodayProjects] = useState([]);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [todaysTodos, setTodaysTodos] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const navigate = useNavigate();
  const getTodaysData = () => {
    // Find if today is a report day and if it has been filled
    const checkIfReportIsFilled = () => {
      if (reports && reports.length > 0) {
        const lastReport = reports[reports.length - 1];
        return dayjs(lastReport.date).isSame(day, "day");
      }
      return false;
    };

    setIsFilled(checkIfReportIsFilled());
    // Filter today's projects
    const filteredProjects = projects.filter(
      (project) => dayjs(project.date).isSame(day, "day") && project.date
    );
    // Fillter today's Todos
    const filteredTodos =
      todos &&
      todos.filter((todo) => dayjs(todo.date).isSame(day, "day") && todo.date);
    // Fillter today's Events
    const filteredEvents =
      events &&
      events.filter(
        (event) => dayjs(event.date).isSame(day, "day") && event.date
      );
    // Filter today's workouts
    const dayKey = dayStrings[day.day()];
    const filteredWorkouts =
      routine.schedule && routine.schedule[dayKey]
        ? routine.schedule[dayKey].map((workout) => ({
            ...workout,
            component: <WorkoutHomeDisplay key={workout._id} data={workout} />,
          }))
        : [];
    // Setting the states
    setTodayProjects(filteredProjects);
    setTodaysWorkouts(filteredWorkouts);
    setTodaysTodos(filteredTodos);
    setTodaysEvents(filteredEvents);
  };

  const deleteEvent = async (_id) => {
    try {
      const response = await axios.delete(`/events/${_id}`);
      getTodaysData();
    } catch (error) {
      toast.error("Something went wrong deleting the event");
    }
  };

  useEffect(() => {
    getTodaysData();
  }, [day, projects, routine]);

  return (
    <ul>
      {dayjs(day).day() === 6 && (
        <li className="bg-green-400 rounded-xl border min-h-[7vh] p-3 mt-1 flex items-center justify-between">
          Report Day
          <PiPiggyBank
            className="cursor-pointer"
            onClick={() => {
              navigate("/member/balance");
            }}
          />
        </li>
      )}
      {todaysProjects.length > 0 ? (
        todaysProjects.map((project) => (
          <li key={project._id}>
            <ProjectHomeDisplay data={project} />
          </li>
        ))
      ) : (
        <li></li>
      )}
      {todaysTodos.length > 0 ? (
        todaysTodos.map((todo) => (
          <li key={todo._id}>
            <TodoHomeDisplay data={todo} />
          </li>
        ))
      ) : (
        <li></li>
      )}
      {todaysEvents.length > 0 ? (
        todaysEvents.map((event) => (
          <li key={event._id}>
            <EventHomeDisplay deleteEvent={deleteEvent} data={event} />
          </li>
        ))
      ) : (
        <li></li>
      )}
      {todaysWorkouts.length > 0 ? (
        todaysWorkouts.map((workout) => (
          <li key={workout._id}>{workout.component}</li>
        ))
      ) : (
        <li></li>
      )}
      <li>
        {todaysWorkouts.length < 1 &&
          todaysEvents.length < 1 &&
          dayjs(day).day() !== 6 &&
          todaysTodos.length < 1 &&
          todaysProjects.length < 1 && (
            <p className="mt-[5vh] ml-[3vw] text-purple-300 text-[1.5rem]">
              Nothing today, Take A break!
            </p>
          )}
      </li>
    </ul>
  );
};

export default DailyListComponent;
