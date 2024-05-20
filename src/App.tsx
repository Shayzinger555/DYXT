// import "./styles/main.scss";
import LayoutComponent from "./Layout/LayoutComponent";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import tokenCTX from "./store/tokenCTX";
import loginCTX from "./store/loginCTX";
import { useState } from "react";
import sideNavStateCTX from "./store/sideNavStateCTX";
// MUI Date
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from "sonner";

import "./utils/axiosBase";

function App() {
  const [token, setToken] = useState(null);
  const [login, setLogin] = useState({});
  const [sideNavOpen, setSideNavOpen] = useState(false);
  return (
    <>
      <Toaster position="top-right" richColors />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <sideNavStateCTX.Provider value={{ sideNavOpen, setSideNavOpen }}>
          <loginCTX.Provider value={{ login, setLogin }}>
            <tokenCTX.Provider value={{ token, setToken }}>
              <BrowserRouter>
                <LayoutComponent>
                  <Router />
                </LayoutComponent>
              </BrowserRouter>
            </tokenCTX.Provider>
          </loginCTX.Provider>
        </sideNavStateCTX.Provider>
      </LocalizationProvider>
    </>
  );
}

export default App;
