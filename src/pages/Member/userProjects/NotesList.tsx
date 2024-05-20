import { Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const NotesList = ({
  notes,
  notesPopUp,
  setNotesPopUp,
  onStartEdit,
  onDelete,
  condition,
  project_id,
  displayUpdatedData,
}) => {
  const [fullNote, setFullNote] = useState("");
  const [fullNotePopUp, setFullNotePopUp] = useState(false);

  useEffect(() => {
    console.log(fullNote);
  }, [fullNote]);
  return (
    <div className=" xl:w-[40vw] w-[90vw] xl:mr-[2.4vw] h-[60vh] bg-opacity-40 bg-gray-400 rounded-3xl overflow-y-auto p-[1vh]">
      {fullNotePopUp && (
        <div
          className="flex items-center justify-center z-[100] fixed top-0 left-0 right-0 min-h-[100vh]"
          style={{ backgroundColor: "rgba(156, 163, 175, 0.7)" }}
        >
          <div className="bg-purple-600  w-[85vw] text-white sm:w-2/4 text-wrap min-h-[30vh] rounded-[4vh]  p-6">
            <button
              onClick={() => {
                setFullNotePopUp(false);
              }}
            >
              <CloseIcon />
            </button>
            <p className="pt-4"> {fullNote && fullNote}</p>
          </div>
        </div>
      )}
      <div className="flex  h-[8vh]">
        <h1 className="text-white text-[3rem]">Notes</h1>
        <button
          onClick={() => setNotesPopUp(!notesPopUp)}
          className=" w-[4vw] h-[8vh]"
        >
          <AddCircleOutlineIcon className="text-white" />
        </button>
      </div>
      <ul className="grid xl:grid-cols-3 md:grid-cols-2  gap-4">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <li
              className="flex gap-2 bg-purple-500 border overflow-hidden  border-black rounded-3xl p-4 min-h-[20vh] "
              key={note.note}
            >
              <div className="flex w-full justify-between">
                <div className="flex-col">
                  <div className="flex">
                    <p className="flex overflow-hidden max-w-[4vw]  ">
                      {note.note}
                    </p>
                    ...
                  </div>
                  <button
                    onClick={() => {
                      setFullNote(note.note);
                      setFullNotePopUp(true);
                    }}
                    className="border border-black"
                  >
                    see full note
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => {
                    onStartEdit("notes", note._id);
                  }}
                >
                  <CiEdit />
                </button>
                <button onClick={() => onDelete("notes", note._id)}>
                  <MdDelete />
                </button>
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

export default NotesList;
