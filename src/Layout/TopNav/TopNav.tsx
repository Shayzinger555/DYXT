import { useNavigate } from "react-router-dom";
import DYXTLOGO from "../../assets/DYXTLOGO.png";
import ROUTES from "../../routes/ROUTES";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import sideNavStateCTX from "../../store/sideNavStateCTX";
import { LuUserCircle2 } from "react-icons/lu";
import loginCTX from "../../store/loginCTX";
import { useMediaQuery } from "react-responsive";

const TopNav = () => {
  const isMobile = useMediaQuery({ maxWidth: 650 });
  const navigate = useNavigate();
  const { sideNavOpen, setSideNavOpen } = useContext(sideNavStateCTX);
  const { login, setLogin } = useContext(loginCTX);
  const handleSideNavToggle = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const links = login._id
    ? {
        titles: ["About", "Contact", "Workspace"],
        to: ["/about", "/contact", "/member"],
      }
    : {
        titles: ["About", "Contact"],
        to: ["/about", "/contact"],
      };
  const handleLogOut = () => {
    localStorage.removeItem("DYXTtoken");
    navigate("/");
    window.location.reload();
  };
  return (
    <nav className="topNav absolute flex right-0 left-0 items-center justify-between text-white h-[7vh]">
      <div className="flex h-full w-[10vw]  gap-4 items-center">
        <div
          onClick={() => handleSideNavToggle()}
          className="flex align-items-center justify-center aspect-[1/1]"
        >
          <MenuIcon className="w-[7vw] cursor-pointer" />
        </div>
        <div
          onClick={() => {
            navigate(ROUTES.LANDINGPAGE);
          }}
          className="flex h-[7vh] items-center cursor-pointer"
        >
          <img
            src={DYXTLOGO}
            alt="DYXT logo"
            className="h-[4vh] min-w-[4vh] rounded-md"
          />
        </div>
      </div>
      <div className=" flex justify-between  items-center h-[7vh] ">
        {!isMobile && (
          <ul className="flex justify-between gap-4  items-center h-[7vh]">
            {links.titles.map((title, i) => (
              <li
                className="w-full h-[7vh] cursor-pointer hover:text-gray-200 duration-100 transition flex items-center justify-center"
                onClick={() => {
                  navigate(links.to[i]);
                }}
              >
                {title}
              </li>
            ))}
          </ul>
        )}
        <div className="h-full w-[10vw] aspect-[1/1] flex items-center justify-center">
          <LuUserCircle2
            className=" md:w-[20%]  w-[60%] cursor-pointer h-[7vh]"
            onClick={() => {
              navigate(ROUTES.PROFILE);
            }}
          />
        </div>
        {login._id ? (
          <button
            onClick={() => {
              handleLogOut();
            }}
            className="mr-[3vw] bg-purple-500 p-3 rounded-3xl hover:opacity-90 hover:bg-purple-800  transition duration-300 ease-in-out"
          >
            Log-out
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="mr-[3vw] bg-purple-500 p-3 rounded-3xl hover:opacity-90 hover:bg-purple-800  transition duration-300 ease-in-out"
          >
            Sign Up
          </button>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
