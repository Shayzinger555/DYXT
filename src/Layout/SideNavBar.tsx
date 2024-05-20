import { useContext, useEffect } from "react";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import sideNavStateCTX from "../store/sideNavStateCTX";
import loginCTX from "../store/loginCTX";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { FaCalendarAlt, FaHome } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";
import { CiLogin } from "react-icons/ci";
import { GiWeightLiftingUp } from "react-icons/gi";
import { PiPiggyBank } from "react-icons/pi";
import { MdManageAccounts } from "react-icons/md";
import { CgLogIn, CgProfile } from "react-icons/cg";
import { IoCall } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
const SideNavBar = () => {
  const { sideNavOpen, setSideNavOpen } = useContext(sideNavStateCTX);
  const { login, setLogin } = useContext(loginCTX);
  const navigate = useNavigate();
  // Workspace
  const memeberLabels = [
    "Home",
    "calender",
    "Projects",
    "Todos",
    "Workouts",
    "Balance",
  ];
  const memeberRoutes = [
    ROUTES.MEMBER,
    `/member/${ROUTES.CALENDAR}`,
    `/member/${ROUTES.PROJECTS}`,
    `/member/${ROUTES.TODOS}`,
    `/member/${ROUTES.WORKOUTS}`,
    `/member/${ROUTES.BALANCE}`,
  ];
  const memberIcons = [
    <FaHome />,
    <FaCalendarAlt />,
    <GoProjectRoadmap />,
    <LuListTodo />,
    <GiWeightLiftingUp />,
    <PiPiggyBank />,
  ];
  const liStyle =
    "text-zinc-200 border rounded-2xl hover:bg-white hover:text-purple-800 transition ease-in-out duration:300 cursor-pointer text-[1.75em] flex items-center gap-3 px-2 w-full";
  // General
  const generalLabels = ["About", "Contact Us", "My Profile"];
  const generalRoutes = [
    `${ROUTES.ABOUT}`,
    `${ROUTES.CONTACT}`,
    `${ROUTES.PROFILE}`,
    "/",
  ];
  const generalIcons = [
    <IoIosInformationCircleOutline />,
    <IoCall />,
    <CgProfile />,
  ];
  const sideNavVariants = {
    hidden: {
      x: -100,
      opacity: 1,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.7 },
    },
  };
  return (
    <motion.div
      variants={sideNavVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <nav className="MemberNavBar h-[100vh] fixed flex flex-col xl:items-start items-center xl:w-[20vw] w-[100vw] rounded-3xl bg-purple-700 z-40 pt-[5vh]">
        <div className="w-full text-white pl-2">
          <CloseIcon
            onClick={() => {
              setSideNavOpen(!sideNavOpen);
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="p-4">
          {login._id && (
            <div className="flex flex-col items-start xl:w-[13vw]">
              <h2 className="text-gray-400 text-[2rem] pl-2 my-[2vh]">
                Workspace
              </h2>
              <ul className="flex justify-evenly flex-col gap-2 xl:items-start items-start xl:w-[13vw] w-[75vw] ">
                {memeberLabels.map((label, i) => {
                  return (
                    <li
                      className={liStyle}
                      onClick={() => {
                        setSideNavOpen(!sideNavOpen);
                        navigate(memeberRoutes[i]);
                      }}
                    >
                      {memberIcons[i]}
                      {label}
                    </li>
                  );
                })}
                {login && login.isAdmin && (
                  <li
                    className={liStyle}
                    style={{ fontSize: "2em" }}
                    onClick={() => {
                      setSideNavOpen(!sideNavOpen);
                      navigate("/member/crm");
                    }}
                  >
                    <MdManageAccounts /> CRM
                  </li>
                )}
              </ul>
            </div>
          )}
          <div className="flex flex-col items-start xl:w-[13vw]">
            <h2 className="text-gray-400 text-[2rem] pl-2 my-[2vh]">General</h2>
            <ul className="flex justify-evenly flex-col gap-2 xl:items-start items-start xl:w-[13vw] w-[75vw] ">
              {generalLabels.map((label, i) => {
                return (
                  <li
                    className={liStyle}
                    onClick={() => {
                      setSideNavOpen(!sideNavOpen);
                      navigate(generalRoutes[i]);
                    }}
                  >
                    {generalIcons[i]}
                    {label}
                  </li>
                );
              })}
              {!login._id && (
                <li
                  className={liStyle}
                  onClick={() => {
                    setSideNavOpen(!sideNavOpen);
                    navigate("/");
                  }}
                >
                  <CgLogIn /> Login
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default SideNavBar;
