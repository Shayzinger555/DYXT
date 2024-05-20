import useAutoLogin from "../hooks/useAutoLogin";
import Typography from "@mui/material/Typography";

const MainComponent = ({ children }) => {
  const finishAutoLogin = useAutoLogin();
  return (
    <div style={{ overflowX: "hidden" }}>
      {finishAutoLogin ? (
        children
      ) : (
        <Typography variant="h1">Loading...</Typography>
      )}
    </div>
  );
};
export default MainComponent;
