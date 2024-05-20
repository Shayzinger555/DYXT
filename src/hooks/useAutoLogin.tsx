import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../store/loginCTX";
import tokenCTX from "../store/tokenCTX";
import { jwtDecode } from "jwt-decode";

const useAutoLogin = () => {
  const { login, setLogin } = useContext(LoginContext);
  const [finishAutoLogin, setFinishAutoLogin] = useState(false);
  const { token, setToken } = useContext(tokenCTX);
  const [tokenFromStorage, setTokenFromStorage] = useState(null);
  useEffect(() => {
    const LocalToken = localStorage.getItem("DYXTtoken");

    if (!LocalToken) {
      localStorage.removeItem("DYXTtoken");
      sessionStorage.removeItem("DYXTtoken");
      setFinishAutoLogin(true);
      return;
    }
    let userData = jwtDecode(LocalToken);
    if (!userData || !userData._id) {
      setFinishAutoLogin(true);
      return;
    }
    axios
      .get(`/users/${userData._id}`)
      .then(({ data }) => {
        setLogin(data);
        setToken(LocalToken);
        setFinishAutoLogin(true);
        setTokenFromStorage(LocalToken);
      })
      .catch((err) => {
        setFinishAutoLogin(true);
      });
  }, []);

  useEffect(() => {
    setToken(tokenFromStorage);
  }, [tokenFromStorage]);

  return finishAutoLogin;
};

export default useAutoLogin;
