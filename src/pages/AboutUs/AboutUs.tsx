import Footer from "../../Layout/Footer";

const AboutUs = () => {
  return (
    <div className="w-full min-h-[100vh]">
      <header className="bg-purple-500 h-[30vh] flex w-full justify-center items-center text-[2.8rem]">
        About Us
      </header>
      <div className="flex flex-col w-screen ">
        <h1 className="w-full text-white text-center text-[3rem] mt-[10vh]">
          Our Story
        </h1>
        <div className="flex flex-col w-full">
          <div className="flex xl:justify-start justify-center w-screen px-5">
            <section className="md:w-[40vw] xl:ml-[5vw]  min-h-[40vh] text-purple-300   md:text-[2rem] leading-[6vh] mt-[24vh]">
              DYXT is a work management system that is made aspecially for
              freelancers/ individuals but it is expected to expande to a larger
              audience when DYXT Community will be released, and DYXT will
              become a cross-platforms app, which will be more relevant to
              companies and employers as well.
            </section>
          </div>
          <div className="flex xl:justify-end justify-center w-screen mr-[5vw] px-5">
            <section className="md:w-[40vw] xl:mr-[5vw] min-h-[40vh] text-white md:text-[2rem] md:leading-[6vh] mt-[12vh] ">
              But more about DYXT Workspace <br />
              Our Workspace was design and programmed <br />
              to utilise time managemt in many aspects such as : <br />
              <span className="text-purple-400"> Projects,</span>
              <span className="text-orange-400"> Workouts,</span>
              <span className="text-green-400"> Balance,</span>{" "}
              <span className="text-blue-400"> To-Dos </span>
              And
              <span className="text-yellow-400"> Events .</span>
            </section>
          </div>
          <div className="flex xl:justify-start justify-center w-screen px-5">
            <section className="md:w-[40vw] xl:ml-[5vw]  min-h-[40vh] text-purple-300  md:text-[2rem] md:leading-[6vh] mt-[12vh]">
              Via connection of data and relations throughout the whole app, we
              focused on easy navigation, understanding and performing what
              needs to be done, when it is needed, as easily and simple and
              possible with subtle and smooth design that keep you workflow our
              first priority!
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
