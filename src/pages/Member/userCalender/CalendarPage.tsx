import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DailyListComponent from "../../../components/DailyListComponent";
import ProjectHomeDisplay from "../../../components/ProjectHomeDisplay";
import EventHomeDisplay from "../../../components/EventHomeDisplay";
import TodoHomeDisplay from "../../../components/TodoHomeDisplay";
import PopUpComponent from "../../../components/PopUpComponent";
import axios from "axios";
import { Todo } from "../../../validation/todoValidationZOD";
import { Event } from "../../../validation/eventValidationsZOD";
import { toast } from "sonner";
const CalendarPage = () => {
  const [date, setDate] = useState(dayjs());
  const [routine, setRoutine] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);
  const [reports, setReports] = useState([]);
  const [toDoPopUp, setTodoPopUp] = useState(false);
  const [eventPopUp, setEventPopUp] = useState(false);
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

      setProjects(projectsData);
      setRoutine(routineResponse.data[0]);
      setTodos(todosData);
      setEvents(eventsData);
      setReports(reportsResponse.data);
    } catch (error) {
      toast.error("Error fetching data");
    }
  };
  useEffect(() => {
    getMyData();
  }, [date]);

  // Creation of Todos and Events
  const inputsForTodos = {
    titles: ["todo"],
    placeholders: ["What needs to be done?"],
  };
  const inputsForEvents = {
    titles: ["event"],
    placeholders: ["Type the event here!"],
  };

  const createTodoOrEvent = async (values, collection) => {
    try {
      const dataWithDate = { ...values, date };
      const response = axios.post(`/${collection}`, dataWithDate);
      getMyData();
      setDate(date);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-screen  xl:p-24 px-[5vw]  min-h-[100vh]  flex xl:flex-row flex-col justify-between">
      {toDoPopUp && (
        <PopUpComponent
          inputs={inputsForTodos}
          onClose={() => {
            setTodoPopUp(false);
          }}
          popUpFunction={createTodoOrEvent}
          schema={Todo}
          collection="todos"
          popUpTitle="Create To-do"
          buttonText="Submit"
        />
      )}
      {eventPopUp && (
        <PopUpComponent
          inputs={inputsForEvents}
          onClose={() => {
            setEventPopUp(false);
          }}
          popUpFunction={createTodoOrEvent}
          schema={Event}
          collection="events"
          popUpTitle="Create Event"
          buttonText="Submit"
        />
      )}
      <div>
        <DateCalendar
          referenceDate={dayjs()}
          className="bg-yellow-200 rounded-3xl text-black w-[70vw]"
          views={["year", "month", "day"]}
          value={date}
          onChange={(newDate) => setDate(newDate)}
        />
      </div>
      <div>
        <div className="bg-gray-600 rounded-t-3xl p-[2rem] h-[40vh] min-h-[50vh] overflow-y-auto min-w-[60vw] flex flex-col justify-between text-white">
          <DailyListComponent
            projects={projects}
            day={date}
            routine={routine}
            todos={todos}
            events={events}
            reports={reports}
          />
        </div>
        <div className="w-full flex xl:justify-end justify-center">
          <div className="xl:w-[50%]  gap-4 flex justify-around bg-gray-600 border-t border-yellow-200 rounded-b-3xl p-[2rem] overflow-y-auto min-w-[60vw] w-[90vw] flex-col  text-white">
            <button
              className="border rounded-3xl px-4 py-2 xl:text-[1.3rem] text-black  hover:opacity-80 bg-yellow-300"
              onClick={() => {
                setTodoPopUp(true);
              }}
            >
              Add To-do
            </button>
            <button
              className="border rounded-3xl px-4 py-2 xl:text-[1.3rem]  text-black  hover:opacity-80 bg-yellow-300"
              onClick={() => {
                setEventPopUp(true);
              }}
            >
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
