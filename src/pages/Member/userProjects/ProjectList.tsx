import { Typography } from "@mui/material";
import { useState, ChangeEvent, useContext, useEffect } from "react";
import axios from "axios";

import tokenCTX from "../../../store/tokenCTX";
import { useNavigate } from "react-router-dom";
import ListNav from "./ListNav";
import PopUpComponent from "../../../components/PopUpComponent";
import dayjs from "dayjs";
import { Project } from "../../../validation/projectValidationsZOD";
const ProjectsList = () => {
  const [modal, setModal] = useState(false);
  const [inputsValue, setInputsValue] = useState({
    title: "",
    description: "",
  });
  const { token, setToken } = useContext(tokenCTX);
  const [projectsFromDB, setProjectsFromDB] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [choosingState, setChoosingState] = useState(false);
  const [chosenProjects, setChosenProjects] = useState([]);
  const navigate = useNavigate();
  const createProjectInputs = {
    placeholders: ["Title", "Description"],
    titles: ["title", "description"],
    classNames: ["notesPopUpTitle", "notesPopUpNote"],
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  const getMyprojects = async () => {
    try {
      const myProjects = await axios.get(`/projects`);
      setProjectsFromDB(myProjects.data);
      setFilteredProjects(myProjects.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyprojects();
  }, [tokenCTX]);

  const createNewProject = () => {
    setModal(!modal);
    getMyprojects();
  };

  const handleCreateProject = async (values, collection, date) => {
    try {
      if (date) {
        const fixedDateFormat = date.toDate();
        const projectWithDeadline = { ...values, date: fixedDateFormat };
        console.log(projectWithDeadline);
        await axios.post(`/${collection}`, projectWithDeadline);
      } else {
        await axios.post(`/${collection}`, values);
      }
      getMyprojects();
      setModal(!modal);
    } catch (err) {
      console.log(err);
    }
  };
  const goToProject = (id: string) => {
    navigate(`${id}`);
  };
  return (
    <div className="w-full overflow-x-hidden ">
      {modal && (
        <PopUpComponent
          collection="projects"
          inputs={createProjectInputs}
          onClose={toggleModal}
          pickerText="Set a Deadline?"
          popUpFunction={handleCreateProject}
          buttonText="Create"
          withDatePicker
          schema={Project}
          popUpTitle="Create a Project"
        />
      )}

      <h1
        style={{
          fontSize: "4.2em",
          marginLeft: "4vw",
        }}
        className="text-white"
      >
        My projects
      </h1>
      <div style={{ padding: "4vh 4vw" }}>
        <div className="bg-gray-700 rounded-3xl ">
          <ListNav
            onAdd={createNewProject}
            setFilteredValues={setFilteredProjects}
            allValues={projectsFromDB}
          />
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 mt-12 gap-12 ">
            {projectsFromDB.length === 0 ? (
              <div className="p-4 rounded-2xl bg-purple-500 ">
                No projects found
              </div>
            ) : (
              filteredProjects &&
              filteredProjects.map((project, i) => (
                <div
                  className="pl-4 pt-4 rounded-2xl h-[50vh] bg-purple-800 overflow-hidden"
                  key={i}
                >
                  <div className="topSection flex justify-between">
                    <div>
                      <h2 className="text-[3rem] text-white">
                        {project.title}
                      </h2>
                    </div>
                    <div className="flex flex-col justify-between gap-4 mt-16">
                      <div className="flex items-center justify-center bg-purple-400 p-2 min-h-16 min-w-48  rounded-tl-[10vh] rounded-bl-[10vh] ">
                        {project.status}
                      </div>

                      <div className="flex items-center justify-center bg-purple-400 p-2 min-h-16 min-w-48  rounded-tl-[10vh] rounded-bl-[10vh] ">
                        {project.date
                          ? dayjs(project.date).format("DD/MM/YY")
                          : "No Deadline"}
                        {/* //todo IF TODAYS AFTER THE DUE DIFFERENT COLOR AND ALERT ICON */}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        goToProject(project._id);
                      }}
                      className="border rounded-[10vh] xl:w-[10vw] mt-[12vh] h-[6vh] hover:bg-purple-400 p-2 sm:w-[25vw] w-[30vw]"
                    >
                      Go to project
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
