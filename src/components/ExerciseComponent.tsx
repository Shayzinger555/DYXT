import { useSortable } from "@dnd-kit/sortable";
import { MdDelete } from "react-icons/md";
import { CSS } from "@dnd-kit/utilities";
import { FaArrowUpLong } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";
import { motion } from "framer-motion";
const ExerciseComponent = ({
  exerciseData,
  id,
  showRemove,
  onRemove,
  index,
  moveItemUp,
  moveItemDown,
}) => {
  const exerciseVariants = {
    before: { x: 400 },
    after: { x: 0 },
  };
  return (
    <motion.li
      variants={exerciseVariants}
      initial="before"
      animate="after"
      id={id}
      className="bg-slate-600 w-[90%] rounded-3xl p-4  flex justify-between"
    >
      <div>
        <h1 className="text-[1.5rem]">{exerciseData.title}</h1>
        <h3 className="text-[1rem]">{exerciseData.primary}</h3>
      </div>
      {showRemove && (
        <div className="flex items-center xl:flex-row flex-col ">
          <div className=" flex h-[8vh] xl:w-[5vw] w-[20vw] gap-1    items-center justify-center">
            <FaArrowUpLong
              onClick={() => {
                moveItemUp(index, -1);
              }}
              className="h-full hover:text-white"
            />
            <FaArrowDownLong
              onClick={() => {
                moveItemDown(index, 1);
              }}
              className="h-full hover:text-white"
            />
          </div>

          <div
            className="h-[80%]    xl:w-[1.5vw] w-[5vw] flex items-center "
            onClick={() => onRemove(index)}
          >
            <MdDelete className="w-[5vw] h-full cursor-pointer" />
          </div>
        </div>
      )}
    </motion.li>
  );
};

export default ExerciseComponent;
