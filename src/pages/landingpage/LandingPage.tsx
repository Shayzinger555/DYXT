import ROUTES from "../../routes/ROUTES";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm.tsx";
import Footer from "../../Layout/Footer.tsx";
import loginCTX from "../../store/loginCTX.ts";
import { useContext } from "react";

//? This is the Herosection page which contains introduction, Call to actions, and Log-in Form

const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(loginCTX);
  return (
    <motion.div
      className="min-h-[100vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex mt-[10vh] xl:p-12 p-4 xl:flex-row flex-col">
        <div className=" xl:w-[50%] min-h-[100vh] flex flex-col gap-4 ">
          <h1 className="text-purple-500 mt-[15vh] text-[2.2rem] ">Get on</h1>
          <h1 className="text-white  text-[3.8rem] font-extrabold">
            Track with DYXT<span className="text-purple-500">.</span>
          </h1>

          {!login._id ? (
            <div className=" xl:h-[20vh] flex items-center xl:w-[50vw] w-[100vw] xl:gap-12 gap-[3vw]">
              <button
                className="text-white bg-purple-500 duration-300 hover:bg-white hover:text-purple-500 text-[1.4rem] w-[40vw] border rounded-3xl xl:w-[10vw]  py-2"
                onClick={() => {
                  navigate(ROUTES.REGISTER);
                }}
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  navigate(ROUTES.ABOUT);
                }}
                className="text-white  duration-300 hover:bg-white hover:text-purple-500  text-[1.4rem] border rounded-3xl xl:w-[10vw] w-[40vw] py-2"
              >
                Learn More
              </button>
            </div>
          ) : (
            <div className=" xl:h-[20vh] flex items-center xl:w-[50vw] w-[100vw] xl:gap-12 gap-[3vw]">
              <button
                className="text-white bg-purple-500 duration-300 hover:bg-white hover:text-purple-500 text-[1.4rem] w-[40vw] border rounded-3xl xl:w-[10vw]  py-2"
                onClick={() => {
                  navigate(ROUTES.MEMBER);
                }}
              >
                Start Working
              </button>
            </div>
          )}
        </div>
        <div>{!login._id && <LoginForm />}</div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default LandingPage;
