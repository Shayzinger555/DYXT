import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import SearchAppBar from "../../../components/SearchBarComponent";
import UserDisplayComponent from "../../../components/UserDisplayComponent";
import ConfirmComponent from "../../../components/ConfirmActionComponent";

const CRMPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const usersFromDB = await axios.get("/users");
      setAllUsers(usersFromDB.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col xl:flex-row justify-between w-screen px-[5vw]">
        <div className="border rounded-3xl h-[80vh] xl:w-[30vw] ">
          <div className="h-[7vh]">
            <SearchAppBar
              allValues={allUsers}
              setFilteredValues={setFilteredUsers}
            />
          </div>
          <ul className="flex flex-col gap-2  h-[71vh]">
            {filteredUsers && filteredUsers.length > 0
              ? filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className="border text-white bg-gray-400 text-[1.5rem] rounded-3xl p-2  hover:bg-gray-200"
                  >
                    {`${user.firstName} ${user.middleName} ${user.lastName}`}
                  </li>
                ))
              : allUsers.map((user) => (
                  <li
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className="border text-white bg-gray-400 text-[1.2rem] rounded-3xl p-2 hover:bg-gray-200"
                  >
                    {`${user.firstName} ${user.middleName} ${user.lastName}`}
                  </li>
                ))}
          </ul>
        </div>
        <div className=" h-[80vh] xl:w-[50vw] w-full overflow-hidden">
          <div>
            {selectedUser && selectedUser.firstName ? (
              <UserDisplayComponent
                user_id={selectedUser._id}
                profilePage
                updateData={getAllUsers}
              /> // profile page prop is for  styling
            ) : (
              <p
                className="bg-gray-200 rounded-3xl text-[2rem]
               p-8"
              >
                Please Select a user to display data
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMPage;
