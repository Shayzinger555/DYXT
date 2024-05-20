import { useEffect, useState } from "react";
import TodoList from "../../../components/TodoList";
import axios from "axios";
import PopUpComponent from "../../../components/PopUpComponent";
import { Todo } from "../../../validation/todoValidationZOD";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [toDoPopUp, setToDoPopUp] = useState(false);
  const [initialDataForEdit, setInitialDataForEdit] = useState({});
  const [popUpEdit, setPopUpEdit] = useState(false);
  const toDoInputs = {
    placeholders: ["What is to be done?"],
    titles: ["todo"],
  };
  //   Post
  const createNewSubItem = async (values, _, date) => {
    let fixedValues;
    if (date) {
      fixedValues = { ...values, date: date.toDate() };
    } else {
      fixedValues = { ...values };
    }

    try {
      const response = await axios.post(`/todos/`, fixedValues);
      setToDoPopUp(false);

      setTodos((prevTodos) => {
        if (prevTodos.length > 0) {
          return [...prevTodos, response.data];
        } else {
          return [response.data];
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  // get
  const getTodos = async () => {
    const response = await axios.get(`/todos`);
    setTodos(response.data);
  };
  useEffect(() => {
    getTodos();
  }, []);
  // delete
  const deleteTodo = async (collection, item_id) => {
    try {
      const response = await axios.delete(`/${collection}/${item_id}`);
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo._id !== response.data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Start Edit
  const startTodoEdit = async (_, item_id) => {
    try {
      const response = await axios.get(`/todos/${item_id}`);
      setInitialDataForEdit(response.data);
      setToDoPopUp(true);
      setPopUpEdit(!popUpEdit);
    } catch (error) {
      console.log(error);
    }
  };
  //   SubmitEdit
  const toDoEdit = async (_, item_id, newData, date) => {
    let fixedValues;
    if (date) {
      fixedValues = { ...newData };
      fixedValues.date = date.toDate();
    } else {
      fixedValues = { ...newData };
    }
    try {
      const response = await axios.put(`/todos/${item_id}`, fixedValues);
      const updatedItem = response.data;
      const index = todos.findIndex((item) => item._id === updatedItem._id);
      if (index !== -1) {
        const updatedArray = [...todos];
        updatedArray[index] = updatedItem;
        setTodos(updatedArray);
      }

      setToDoPopUp(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen flex justify-center min-h-screen">
      {toDoPopUp && (
        <PopUpComponent
          onClose={() => setToDoPopUp(false)}
          inputs={toDoInputs}
          buttonText="Save"
          popUpFunction={createNewSubItem}
          initialDataForEdit={initialDataForEdit}
          setInitialDataForEdit={setInitialDataForEdit}
          onEdit={toDoEdit}
          collection="todos"
          schema={Todo}
          withDatePicker
          pickerText="Is the todo due?"
        />
      )}
      <TodoList
        toDoPopUp={toDoPopUp}
        setToDoPopUp={setToDoPopUp}
        todos={todos}
        displayUpdatedData={getTodos}
        onDelete={deleteTodo}
        onStartEdit={startTodoEdit}
        fullPage
      />
    </div>
  );
};

export default TodosPage;
