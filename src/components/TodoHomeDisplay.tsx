import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiTodoFill } from "react-icons/ri";
const ProjectHomeDisplay = ({ data }) => {
  const navigate = useNavigate();

  const variants = {};
  return (
    <motion.div variants={variants}>
      To-Do:
      <div className="bg-blue-400 rounded-xl border min-h-[7vh] p-3 mt-1 flex items-center justify-between">
        <h2 className="text-white">{data.todo}</h2>
        {data.project_id ? (
          <button
            onClick={() => {
              navigate(`/member/projects/${data.project_id}`);
            }}
          >
            <IoDocumentTextOutline />
          </button>
        ) : (
          <button
            onClick={() => {
              navigate(`/member/todos/${data._id}`);
            }}
          >
            <RiTodoFill />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectHomeDisplay;
