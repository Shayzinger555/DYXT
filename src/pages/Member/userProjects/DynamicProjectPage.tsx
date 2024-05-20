import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TodoList from "../../../components/TodoList";
import { toDoInputs, notesInputs, statusTypes } from "./projectsStaticData";
import PopUpComponent from "../../../components/PopUpComponent";
import NotesList from "./NotesList";
import { Note } from "../../../validation/noteValidationZOD";
import { Todo } from "../../../validation/todoValidationZOD";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";
import DynamicPageTopSection from "./DynamicPageTopSection";
const DynamicProjectPage = () => {
  // Like the name suggests this is a dynamic page that fetches it's project data via the project id in the params.
  const { project_id } = useParams();
  const conditionForSubItems = JSON.stringify({ project_id: project_id });
  const [dataFromDB, setDataFromDB] = useState({});
  const [todoInputsValue, setTodoInputsValue] = useState({
    todo: "",
  });
  const [selectStatus, setSelectStatus] = useState(false);
  const [toDoPopUp, setToDoPopUp] = useState(false);
  const [notesPopUp, setNotesPopUp] = useState(false);
  const [popUpEdit, setPopUpEdit] = useState(false);
  const [initialDataForEdit, setInitialDataForEdit] = useState({});
  const [isEdittingTitle, setIsEdittingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [isEdittingDescription, setIsEdittingDescription] = useState(false);
  const [description, setDescription] = useState("");
  const toggleNotesPopUp = () => {
    setNotesPopUp(!notesPopUp);
    setPopUpEdit(!popUpEdit);
  };
  const toggleTodosPopUp = () => {
    setToDoPopUp(!toDoPopUp);
    setPopUpEdit(!popUpEdit);
  };

  //Project fetching
  const getProjectDataFromDb = async () => {
    try {
      const data = await axios.get(`/projects/${project_id}`);
      setDataFromDB(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjectDataFromDb();
  }, []);

  // Title Logic
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };
  const handleTitleSubmit = async () => {
    try {
      if (title.length > 2) {
        const response = await axios.patch(`/projects/${project_id}/title`, {
          value: title,
        });
        getProjectDataFromDb();
        setTitle("");
        setIsEdittingTitle(false);
      } else {
        toast.warning("Title must be at least 3 letters long.");
      }
    } catch (error) {
      toast.error("Something went wrong editting the title");
    }
  };
  // description Logic
  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
  };

  const handleDescriptionSubmit = async () => {
    try {
      if (description.length > 2) {
        const response = await axios.patch(
          `/projects/${project_id}/description`,
          {
            value: description,
          }
        );
        getProjectDataFromDb();
        setDescription("");
        setIsEdittingDescription(false);
      } else {
        toast.warning("Description must be at least 3 letters long.");
      }
    } catch (error) {
      toast.error("Something went wrong editting the description");
    }
  };

  //Project Status

  // *Sub Items Logic
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);

  const createNewSubItem = async (values, collection, date) => {
    try {
      let fixedValues;
      if (date) {
        fixedValues = { ...values, date: date.toDate() };
      } else {
        fixedValues = { ...values };
      }

      const response = await axios.post(`/${collection}/`, {
        ...values,
        project_id: project_id,
      });
      setToDoPopUp(false);
      setNotesPopUp(false);

      console.log(collection);
      collection === "notes"
        ? setNotes((prevNotes) => [...prevNotes, response.data])
        : setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  // get
  const getSubItems = async (collection) => {
    const response = await axios.get(
      `/projects/${collection}/${project_id}/${conditionForSubItems}`
    );
    collection == "todos" ? setTodos(response.data) : setNotes(response.data);
  };
  useEffect(() => {
    getSubItems("todos");
    getSubItems("notes");
  }, []);

  const deleteSubItem = async (collection, item_id) => {
    try {
      const response = await axios.delete(`/${collection}/${item_id}`);
      if (collection == "todos") {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== response.data)
        );
      } else {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== response.data)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const startSubItemEdit = async (collection, item_id) => {
    try {
      const response = await axios.get(`/${collection}/${item_id}`);
      setInitialDataForEdit(response.data);
      if (collection == "todos") {
        setToDoPopUp(true);
        setPopUpEdit(!popUpEdit);
      } else if (collection == "notes") {
        setNotesPopUp(true);
        setPopUpEdit(!popUpEdit);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitSubItemEdit = async (collection, item_id, newData, date) => {
    try {
      let fixedValues;
      if (date) {
        fixedValues = { ...newData };
        fixedValues.date = date.toDate();
      } else {
        fixedValues = { ...newData };
      }
      const response = await axios.put(
        `/${collection}/${item_id}`,
        fixedValues
      );
      const updatedItem = response.data;
      const index =
        collection === "todos"
          ? todos.findIndex((item) => item._id === updatedItem._id)
          : notes.findIndex((item) => item._id === updatedItem._id);
      if (index !== -1) {
        const updatedArray = collection === "todos" ? [...todos] : [...notes];
        updatedArray[index] = updatedItem;
        collection === "todos"
          ? setTodos(updatedArray)
          : setNotes(updatedArray);
      }
      setNotesPopUp(false);
      setToDoPopUp(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusClick = () => {
    setSelectStatus(!selectStatus);
  };
  useEffect(() => {
    console.log(description);
  }, [description]);
  return (
    <div className="dynamicProject w-full mt-[5vh] ">
      <DynamicPageTopSection
        dataFromDB={dataFromDB}
        handleTitleChange={handleTitleChange}
        handleStatusClick={handleStatusClick}
        handleTitleSubmit={handleTitleSubmit}
        handleDescriptionSubmit={handleDescriptionSubmit}
        handleDescriptionChange={handleDescriptionChange}
        isEdittingTitle={isEdittingTitle}
        isEdittingDescription={isEdittingDescription}
        setIsEdittingDescription={setIsEdittingDescription}
        setIsEdittingTitle={setIsEdittingTitle}
        project_id={project_id}
        getProjectDataFromDb={getProjectDataFromDb}
      />
      {toDoPopUp && (
        <PopUpComponent
          onClose={toggleTodosPopUp}
          inputs={toDoInputs}
          buttonText="Save"
          popUpFunction={createNewSubItem}
          initialDataForEdit={initialDataForEdit}
          setInitialDataForEdit={setInitialDataForEdit}
          onEdit={submitSubItemEdit}
          collection="todos"
          schema={Todo}
          withDatePicker
          pickerText="Is the todo due?"
        />
      )}
      {notesPopUp && (
        <PopUpComponent
          onClose={toggleNotesPopUp}
          inputs={notesInputs}
          buttonText="Save"
          popUpFunction={createNewSubItem}
          initialDataForEdit={initialDataForEdit}
          setInitialDataForEdit={setInitialDataForEdit}
          onEdit={submitSubItemEdit}
          collection="notes"
          schema={Note}
        />
      )}

      <div>
        <div className=" xl:h-[60vh] w-[100vw] flex xl:flex-row flex-col mt-16 justify-between items-center xl:gap-0 gap-[10vh]">
          <TodoList
            todos={todos}
            toDoPopUp={toDoPopUp}
            setToDoPopUp={setToDoPopUp}
            onDelete={deleteSubItem}
            onStartEdit={startSubItemEdit}
            condition={conditionForSubItems}
            project_id={project_id}
            displayUpdatedData={() => getSubItems("todos")}
          />

          <NotesList
            notes={notes}
            notesPopUp={notesPopUp}
            setNotesPopUp={setNotesPopUp}
            onDelete={deleteSubItem}
            onStartEdit={startSubItemEdit}
            condition={conditionForSubItems}
            project_id={project_id}
            displayUpdatedData={() => getSubItems("notes")}
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicProjectPage;
