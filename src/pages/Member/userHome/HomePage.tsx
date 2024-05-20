// Imports
import { useContext, useEffect, useState } from "react";
import loginCTX from "../../../store/loginCTX";
import axios from "axios";
import dayjs from "dayjs";
import ProjectHomeDisplay from "../../../components/ProjectHomeDisplay";
import TodoHomeDisplay from "../../../components/TodoHomeDisplay";
import WorkoutHomeDisplay from "../../../components/WorkoutHomeDisplay";
import { dayStrings } from "../../../generalStaticData";
import DailyListComponent from "../../../components/DailyListComponent";
import EventHomeDisplay from "../../../components/EventHomeDisplay";
import { toast } from "sonner";
const HomePage = () => {
  // component
  const { login } = useContext(loginCTX);
  const [allData, setAllData] = useState([]);
  const [today, setToday] = useState(dayjs());
  const [routine, setRoutine] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const getMyData = async () => {
      try {
        const [
          eventsResponse,
          todosResponse,
          projectsResponse,
          reportsResponse,
          routineResponse,
        ] = await Promise.all([
          axios.get("/events"),
          axios.get("/todos"),
          axios.get("/projects"),
          axios.get("/reports"),
          axios.get("/routines"),
        ]);

        const eventsData = eventsResponse.data.map((event) => ({
          ...event,
          component: <EventHomeDisplay data={event} />,
        }));

        const todosData = todosResponse.data.map((todo) => ({
          ...todo,
          component: <TodoHomeDisplay data={todo} />,
        }));

        const projectsData = projectsResponse.data.map((project) => ({
          ...project,
          component: <ProjectHomeDisplay data={project} />,
        }));

        // setting states
        setProjects(projectsData);
        setRoutine(routineResponse.data[0]);
        setTodos(todosData);
        setEvents(eventsData);
        setReports(reportsResponse.data);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    getMyData();
  }, [today]);

  return (
    <div className="min-h-[100vh] text-[white]">
      <h1 className="text-[3rem] ml-[3vw] mt-[4vh] flex ">
        {today && today.hour() < 12 && (
          <p>
            Good
            <span className="text-blue-300"> Morning </span>
            {login && login.firstName}!
          </p>
        )}
        {today && today.hour() > 12 && today.hour() < 18 && (
          <p>
            Good
            <span className="text-orange-200"> Afternoon </span>
            {login && login.firstName}!
          </p>
        )}
        {today && today.hour() > 18 && (
          <p>
            Good <span className="text-purple-400"> Evening </span>
            {login && login.firstName}!
          </p>
        )}
      </h1>
      <h2 className="text-[2.5rem] mt-[5vh] ml-[3vw]">Today's Plan:</h2>
      <div className="w-full px-[2%] mt-[5vh]">
        <DailyListComponent
          projects={projects}
          day={today}
          routine={routine}
          events={events}
          todos={todos}
          reports={reports}
        />
      </div>
    </div>
  );
};

export default HomePage;

// LOGIC
// const checkIfReportIsFilled = () => {
//   if (reportsResponse.data.length > 0) {
//     const lastReport =
//       reportsResponse.data[reportsResponse.data.length - 1];
//     return dayjs(lastReport.date).isSame(today, "day");
//   }
//   return false;
// };
// setIsFilled(checkIfReportIsFilled());
// const allData = [
//   ...eventsData,
//   ...todosData,
//   ...projectsData,
//   ...todaysWorkouts,
// ];
// setAllData(allData);

// old UL
{
  /* <ul className="text-gray-400 w-[50vw] ml-[3vw] mt-[4vh] ">
        {dayjs(today).day() === 6 && allData && allData.length > 0 && (
          <div>
            <div className="bg-red-200">
              Todays Report
              {isFilled ? (
                <div>You've filled today's Report!</div>
              ) : (
                <button>fill report please</button>
              )}
            </div>
          </div>
        )}
        {allData && allData.length > 0 ? (
          allData
            .filter((item) => dayjs(item.date).isSame(today, "day"))
            .map((item, index) => <li key={index}>{item.component}</li>)
        ) : (
          <p>Nothing's Today, take a Break!</p>
        )}
      </ul> */
}
