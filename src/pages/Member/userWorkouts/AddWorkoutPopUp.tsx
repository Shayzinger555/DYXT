import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { toast } from "sonner";
const AddWorkoutPopUp = ({ onClose, onSubmit, index, myWorkouts }) => {
  const overlayVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const [selectedWorkout, setSelectedWorkout] = useState({});
  const handleSubmit = () => {
    if (selectedWorkout && selectedWorkout.title) {
      onSubmit(selectedWorkout, index);
    } else {
      toast.warning("Please choose a workout to add");
    }
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 bg-[#00000080] flex justify-center items-center z-3"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-[#00000080] w-[85vw] sm:w-2/4 flex flex-col rounded-[4vh] p-4">
          <div className="flex w-full">
            <CloseIcon
              style={{ color: "white" }}
              onClick={onClose}
              className="cursor-pointer"
            />
          </div>
          <h1 className="text-[4.7rem] text-start text-gray-300">
            Add An Exercise
          </h1>
          <ul className="flex flex-col gap-4">
            {myWorkouts.map((workout) => (
              <li
                onClick={() => {
                  setSelectedWorkout(workout);
                }}
                className={
                  workout._id == selectedWorkout._id
                    ? "text-white text-[2rem] bg-slate-400 rounded-xl cursor-pointer"
                    : "text-white text-[2rem] bg-slate-800 rounded-xl cursor-pointer"
                }
              >
                {workout.title}
              </li>
            ))}
          </ul>
          <div className="w-full flex justify-end p-4">
            <button
              onClick={onClose}
              className="text-white mr-3 shadow border border-black border-2 rounded-lg p-2"
            >
              Cancel
            </button>
            <button
              className={
                selectedWorkout && selectedWorkout.title
                  ? "text-white shadow border border-black border-2 rounded-lg p-2 bg-blue-400"
                  : "text-white  border border-black border-2 rounded-lg p-2 "
              }
              onClick={() => {
                handleSubmit();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddWorkoutPopUp;
