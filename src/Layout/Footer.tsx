import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GoProjectRoadmap } from "react-icons/go";
import { PiPiggyBank } from "react-icons/pi";
const Footer = () => {
  const generalLinks = {
    labels: ["About", "Contact Us", "My Profile", "Home"],
    icons: [
      <IoIosInformationCircleOutline />,
      <IoCall />,
      <CgProfile />,
      <FaHome />,
    ],
    links: ["/about", "/contact", "/member/profile", "/"],
  };
  const workspaceLinks = {
    labels: ["Home", "Calendar", "Projects", "To-Dos", "Workouts", "Balance"],
    icons: [
      <FaHome />,
      <FaCalendarAlt />,
      <GoProjectRoadmap />,
      <LuListTodo />,
      <GiWeightLiftingUp />,
      <PiPiggyBank />,
    ],
    links: [
      "/member/",
      "/member/calendar",
      "/member/projects",
      "/member/todos",
      "/member/workouts",
      "/member/balance",
    ],
  };
  const navigate = useNavigate();
  return (
    <div className=" min-h-[80vh] mt-[10vh] pb-[5vh]  w-screen bg-gray-700">
      <div className="border-b h-[17vh]  mx-[7vw]"></div>
      <h1 className="text-white mt-[5vh] text-[3.4rem] mx-[7vw]">
        More things to do
      </h1>
      <div className="w-full flex sm:flex-row flex-col  mt-[10vh] mx-[7vw] ">
        <div className="w-[43vw] flex flex-col items-start pt-[3vh] sm:border-r">
          <h2 className="text-gray-400 text-[2.8rem]">General</h2>
          <ul className="text-white mt-[4vh] flex flex-col gap-2 ">
            {generalLinks.labels.map((label, i) => (
              <li
                onClick={() => {
                  navigate(generalLinks.links[i]);
                }}
                className="flex items-center gap-2 cursor-pointer opacity-65 hover:opacity-100 "
              >
                {generalLinks.icons[i]} {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[43vw] flex flex-col sm:items-end  pt-[3vh]">
          <div>
            <h2 className="text-gray-400 text-[2.8rem]">Workspace</h2>
            <ul className="text-white mt-[4vh] flex flex-col gap-2 ">
              {workspaceLinks.labels.map((label, i) => (
                <li
                  onClick={() => {
                    navigate(workspaceLinks.links[i]);
                  }}
                  className="flex items-center gap-2 cursor-pointer opacity-65 hover:opacity-100 "
                >
                  {workspaceLinks.icons[i]} {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
