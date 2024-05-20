import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { useContext, useEffect, useState } from "react";
import tokenCTX from "../../../store/tokenCTX";
import UserDisplayComponent from "../../../components/UserDisplayComponent";
import Footer from "../../../Layout/Footer";

const ProfilePage = () => {
  const [userDataFromDB, setUserDataFromDB] = useState({});
  const { token } = useContext(tokenCTX);

  const getMyDataFromDB = async () => {
    try {
      const tokenData = jwtDecode(token);
      const response = await axios.get(`/users/${tokenData._id}`);
      setUserDataFromDB(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getMyDataFromDB();
    }
  }, [token]);

  return (
    <>
      {userDataFromDB._id && (
        <UserDisplayComponent user_id={userDataFromDB._id} profilePage />
      )}
      <Footer />
    </>
  );
};

export default ProfilePage;
