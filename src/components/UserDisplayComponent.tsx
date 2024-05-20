import { useContext, useEffect, useState } from "react";
import PopUpComponent from "./PopUpComponent";
import EditUserPopup from "./EditUserPopup";
import axios from "axios";
import ConfirmComponent from "./ConfirmActionComponent";
import { toast } from "sonner";
import loginCTX from "../store/loginCTX";
import { useNavigate } from "react-router-dom";
const UserDisplayComponent = ({ user_id, profilePage, updateData }) => {
  const [editUser, setEditUser] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [userData, setUserData] = useState({});
  const [confirm, setConfirm] = useState(false);
  const { login, setLogin } = useContext(loginCTX);
  const navigate = useNavigate();
  const getUserData = async () => {
    try {
      const data = await axios.get(`/users/${user_id}`);
      setUserData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, [user_id]);

  const handleDeleteUser = async () => {
    try {
      if (user_id) {
        if (userData.isAdmin) {
          throw new Error("Cant delete admins");
        }
        await axios.delete(`/users/${user_id}`);
        setConfirm(false);
      } else {
        throw new Error("Choose a user to delete");
      }
      if (login && login._id == user_id) {
        localStorage.removeItem("DYXTtoken");
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      toast.error("You can't delete this user");
    }
  };

  useEffect(() => {
    if (userData._id) {
      const copyOfData = { ...userData };
      setInitialData(copyOfData);
    }
  }, [userData]);
  const startEditingUser = () => {
    setEditUser(true);
  };
  const handeSaveChanges = async (newValues) => {
    try {
      const response = await axios.put(`/users/${user_id}`, newValues);
      setUserData(response.data);
      updateData && updateData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // todo
    // instead of getting the userData as props , get only the ID , then inside this component , fetch the data by id , in the CRM the data will be array of all the users ids
    getUserData();
  }, []);
  const closePopUp = () => {
    setEditUser(false);
  };
  const userInputs = {
    placeholders: [
      "First Name",

      "Last Name",
      "Username",
      "Title/Role",
      "email",
      "Phone Number",
      "Country",
      "City",
    ],
    titles: [
      "firstName",

      "lastName",
      "userName",
      "title",
      "email",
      "phone",
      "country",
      "city",
    ],
  };
  return (
    <div className="w-full  flex items-center justify-center ">
      {editUser && userData && initialData && (
        <EditUserPopup
          onClose={closePopUp}
          onSave={handeSaveChanges}
          initialUserData={initialData}
        />
      )}
      {confirm && (
        <ConfirmComponent
          text="Are you sure You want to delete user?"
          cancelFunction={() => setConfirm(false)}
          continueFunction={handleDeleteUser}
        />
      )}
      {userData && userData.firstName ? (
        <div
          className={` text-white border-none bg-gray-800 ${
            profilePage ? "w-[80vw] mt-12" : "w-full"
          } rounded-3xl min-h-[40vh] overflow-hidden`}
        >
          <div className="bg-gray-300 border-none xl:h-[18vh] h-[40vh] flex xl:flex-row flex-col w-full justify-between ">
            <div className="flex h-[16vh]">
              <div className="h-[100%] aspect-[1/1] flex  justify-between  xl:items-center xl:p-0 p-6">
                <div className="bg-white ml-1 xl:h-[80%] h-[100%] aspect-[1/1]  rounded-[17vh]"></div>
              </div>
              <div className="xl:h-[12vh] ml-2  flex gap-6  xl:mt-4">
                <div>
                  <h1 className="text-[2rem]">{userData.userName}</h1>
                  <h2 className="text-[1.3rem] text-gray-400">{`${userData.firstName} ${userData.lastName}`}</h2>
                  <h2 className="text-[1rem] mt-1 text-gray-600">
                    {userData.title}
                  </h2>
                </div>
              </div>
            </div>
            <div className="  flex flex-col  xl:justify-around mr-6 gap-6 p-4">
              <button
                onClick={startEditingUser}
                className="bg-gray-600 rounded-3xl h-12 w-32 hover:opacity-[0.9]"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setConfirm(true)}
                className="border border-gray-600 text-black bg-red-400 rounded-3xl h-12 w-32 hover:opacity-[0.9]"
              >
                Delete Profile
              </button>
            </div>
          </div>
          <div className="border min-h-[50vh] p-4">
            <ul className="gap-3 flex flex-col">
              <li className="text-[1.3rem]">{`Country: ${userData.country}`}</li>
              <li className="text-[1.3rem]">{`District: ${userData.city}`}</li>
              <li className="text-[1.3rem]">{`Email: ${userData.email}`}</li>
              <li className="text-[1.3rem]">{`Phone: ${userData.phone}`}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
};

export default UserDisplayComponent;
