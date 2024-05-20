import { Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TodoList = ({
  todos,
  toDoPopUp,
  setToDoPopUp,
  onStartEdit,
  onDelete,
  condition,
  project_id,
  fullPage,
  displayUpdatedData,
}) => {
  const { todo_id } = useParams();
  const toggleTodoState = async (todoId, oldStatus) => {
    try {
      const newStatus = !oldStatus;

      const response = await axios.patch(`/todos/${todoId}/completed/`, {
        value: newStatus,
      });
      displayUpdatedData();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`xl:w-${
        fullPage ? "[70vw]" : "[40vw]"
      } xl:ml-[2.4vw] bg-opacity-40 w-[90vw] bg-gray-400 rounded-3xl h-${
        fullPage ? "" : "[60vh]"
      } overflow-y-auto p-[1vh]`}
    >
      <div className="flex  h-[8vh]">
        <h1 className="text-white text-[3rem]">Todos </h1>
        <button
          onClick={() => setToDoPopUp(!toDoPopUp)}
          className=" w-[4vw] ml-[1vw] h-[8vh]"
        >
          <AddCircleOutlineIcon className="text-white" />
        </button>
      </div>
      <ul className="flex flex-col gap-4">
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <li
              className={`flex gap-2 ${
                todo_id == todo._id ? "bg-red-200" : "bg-purple-200"
              } border ${
                todo_id == todo._id ? "border-white" : "border-black"
              }rounded-3xl p-4`}
              key={todo}
            >
              <div className="flex w-full justify-between">
                <div className="flex items-center">
                  <p>{todo.todo}</p>
                  <button
                    onClick={() => toggleTodoState(todo._id, todo.completed)}
                  >
                    {!todo.completed ? (
                      <CheckBoxOutlineBlankIcon />
                    ) : (
                      <CheckBoxIcon />
                    )}
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      onStartEdit("todos", todo._id);
                    }}
                  >
                    <CiEdit />
                  </button>
                  <button onClick={() => onDelete("todos", todo._id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <Typography variant="body1" color="initial">
            No todos found.
          </Typography>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
