import { FaRegEdit } from "react-icons/fa";
import { statusTypes } from "./projectsStaticData";
import { useEffect, useState } from "react";
import DatePickerComponent from "../../../components/DatePickerComponent";
import dayjs from "dayjs";
import axios from "axios";
const DynamicPageTopSection = ({
  dataFromDB,
  setIsEdittingTitle,
  isEdittingTitle,
  handleTitleChange,
  handleTitleSubmit,
  isEdittingDescription,
  handleDescriptionChange,
  setIsEdittingDescription,
  handleStatusClick,
  handleDescriptionSubmit,
  project_id,
  getProjectDataFromDb,
}) => {
  const [picker, setPicker] = useState(false);
  const [selectedDeadline, setSelectedDeadline] = useState(dayjs());
  const [selectStatus, setSelectStatus] = useState(false);
  const [status, setStatus] = useState("");
  const patchDeadline = async () => {
    try {
      await axios.patch(`/projects/${project_id}/date`, {
        value: selectedDeadline,
      });
      getProjectDataFromDb();
      setPicker(false);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatusInDB = async () => {
    try {
      const response = await axios.patch(`/projects/${project_id}/status`, {
        value: status,
      });
      setSelectStatus(false);
      getProjectDataFromDb();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <div>
      {picker && (
        <div className="w-[100vw] h-[100vh] bg-black bg-opacity-50 fixed">
          <div className="bg-purple-400 fixed flex flex-col justify-around top-[15vh] right-[5vw] min-h-[30vh] rounded-xl">
            <DatePickerComponent
              date={selectedDeadline}
              setDate={setSelectedDeadline}
            />
            <div className="flex w-full justify-end p-4 gap-4">
              <button
                onClick={() => {
                  setPicker(false);
                  setSelectedDeadline(dayjs());
                }}
                className="border rounded-md border-black p-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  patchDeadline();
                }}
                className="border rounded-md border-black p-2 hover:bg-purple-600 hover:text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {selectStatus && (
        <div className=" flex flex-col bg-gray-400 p-4 rounded-xl justify-between w-96 fixed right-0 h-[70vh]">
          {statusTypes.map((value, i) => {
            return (
              <div
                className={`border rounded-3xl min-h-[5vh] p-4 transition-all ease-in-out duration-75 cursor-pointer ${
                  value === status
                    ? "bg-gray-500 text-white"
                    : "hover:bg-gray-500 hover:text-white"
                }`}
                key={value}
                onClick={() => {
                  setStatus(value);
                }}
                value={value}
              >
                <h2>{statusTypes[i]}</h2>
              </div>
            );
          })}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setSelectStatus(false);
                setStatus("");
              }}
              className="border rounded-xl p-3 hover:bg-gray-600 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                changeStatusInDB();
                setSelectStatus(false);
                setStatus("");
              }}
              className="border rounded-xl p-3 hover:bg-gray-600 hover:text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="Top Area flex justify-between sm:flex-row flex-col">
        <div>
          {dataFromDB.title && (
            <div className="flex items-center ml-[2.4vw] w-[45vw] h-[15vh] ">
              {!isEdittingTitle ? (
                <div className="flex">
                  <h1 className="text-white  xl:text-[5rem] text-[2.5rem]">
                    {dataFromDB.title}
                  </h1>
                  <button
                    onClick={() => {
                      setIsEdittingTitle(true);
                    }}
                  >
                    <FaRegEdit color="white" className=" w-[5vw] h-[3vh]" />
                  </button>
                </div>
              ) : (
                <div className="">
                  <input
                    className="rounded-3xl p-3"
                    placeholder="New Title"
                    onChange={(e) => handleTitleChange(e.target.value)}
                  />
                  <div className=" flex justify-end mt-[3vh] gap-4">
                    <button
                      onClick={() => {
                        setIsEdittingTitle(false);
                      }}
                      className="bg-white bg-opacity-20 text-white border rounded-md px-4 h-[4vh]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        handleTitleSubmit();
                      }}
                      className="bg-white border rounded-md px-4 h-[4vh]"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {!isEdittingDescription ? (
            <div className="flex ml-[2.4vw] mt-[5vh] w-[40vw] ">
              <h1 className=" text-purple-400 xl:text-[2rem] text-[1rem]">
                {dataFromDB.description}
              </h1>
              <button
                onClick={() => {
                  setIsEdittingDescription(true);
                }}
              >
                <FaRegEdit color="white" className=" w-[5vw] h-[3vh]" />
              </button>
            </div>
          ) : (
            <div className="ml-[2.4vw] w-[20vw]">
              <input
                className="rounded-3xl p-3"
                placeholder="New Title"
                onChange={(e) => handleDescriptionChange(e.target.value)}
              />
              <div className=" flex justify-end mt-[3vh] gap-4">
                <button
                  onClick={() => {
                    setIsEdittingDescription(false);
                  }}
                  className="bg-white bg-opacity-20 text-white border rounded-md px-4 h-[4vh]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDescriptionSubmit();
                  }}
                  className="bg-white border rounded-md px-4 h-[4vh]"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between items-center sm:w-[15vw] sm:gap-[0vh] gap-8 sm:mt-[0vh] mt-[8vh] w-[100vw]">
          <div
            className="bg-purple-400 flex items-center sm:w-full w-[80vw] justify-center p-[1rem] min-w-[8vw] rounded-l-[20vh] rounded-r-[20vh] sm:rounded-r-[0vh]"
            onClick={() => {
              setSelectStatus(true);
            }}
          >
            <h2>{dataFromDB.status}</h2>
          </div>

          <div
            onClick={() => {
              setPicker(true);
            }}
            className="bg-white flex items-center sm:w-full w-[80vw] justify-center p-[1rem] min-ww-[8vw] rounded-l-[20vh] rounded-r-[20vh] sm:rounded-r-[0vh]"
          >
            {dataFromDB.date ? (
              <h2>{dayjs(dataFromDB.date).format("DD/MM/YYYY")}</h2>
            ) : (
              <h2>no Deadline</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPageTopSection;
