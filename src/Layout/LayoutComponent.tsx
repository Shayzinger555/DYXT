import sideNavStateCTX from "../store/sideNavStateCTX";
import SideNavBar from "./SideNavBar";
import MainComponent from "./MainComponent";
import TopNav from "./TopNav/TopNav";
import { useContext } from "react";
const LayoutComponent = ({ children }) => {
  const { sideNavOpen, setSideNavOpen } = useContext(sideNavStateCTX);

  return (
    <div style={{ overflowX: "hidden" }} className="bg-gray-900 ">
      <TopNav />
      {sideNavOpen ? <SideNavBar /> : null}
      <MainComponent>{children}</MainComponent>
    </div>
  );
};

export default LayoutComponent;
