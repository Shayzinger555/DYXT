import { useContext } from "react";
import loginCTX from "../store/loginCTX";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const BizGuard = ({ children }) => {
  const { login } = useContext(loginCTX);
  if (login) {
    return children;
  } else {
    return <Navigate to={ROUTES.LANDINGPAGE} />;
  }
};

export default BizGuard;
