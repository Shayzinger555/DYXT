import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const ProjectHomeDisplay = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1> Due project:</h1>
      <div className="bg-purple-200 rounded-xl border min-h-[7vh] p-3 mt-1 flex items-center justify-between">
        {data.title}
        <button
          onClick={() => {
            navigate(`/member/projects/${data._id}`);
          }}
        >
          <IoDocumentTextOutline />
        </button>
      </div>
    </div>
  );
};

export default ProjectHomeDisplay;
