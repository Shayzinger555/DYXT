import { useContext } from "react";
import { Navigate } from "react-router-dom";
import loginCTX from "../store/loginCTX";
import ROUTES from "../routes/ROUTES";

const MemberGuard = ({ children }) => {
  const { login } = useContext(loginCTX);
  if (login && login._id) {
    return children;
  } else {
    return <Navigate to={ROUTES.LANDINGPAGE} />;
  }
};

export default MemberGuard;
