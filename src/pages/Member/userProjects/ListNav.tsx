import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAppBar from "../../../components/SearchBarComponent";

const ListNav = ({ onAdd, allValues, setFilteredValues }) => {
  return (
    <div className=" h-20 flex gap-4  mb-4 rounded-2xl justify-start">
      <div className="flex bg-gray-400 w-full rounded-t-xl px-4 flex items-center">
        <button variant="contained" onClick={onAdd}>
          <AddCircleIcon />
        </button>
        <div>
          <SearchAppBar
            allValues={allValues}
            setFilteredValues={setFilteredValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ListNav;
