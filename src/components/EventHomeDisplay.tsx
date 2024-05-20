import { MdDelete } from "react-icons/md";
const EventHomeDisplay = ({ data, deleteEvent }) => {
  return (
    <div>
      Event:
      <div className="bg-yellow-200 rounded-xl border min-h-[7vh] p-3 mt-1 flex items-center justify-between">
        <h2 className="text-white">{data.event}</h2>
        <MdDelete
          onClick={() => {
            deleteEvent(data._id);
          }}
          className="text-slate-400 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default EventHomeDisplay;
