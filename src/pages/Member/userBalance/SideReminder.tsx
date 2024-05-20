import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";
const SideReminder = ({ missingReports, setDate, setReportPopUP }) => {
  const isMD = useMediaQuery({ maxWidth: 1300 });

  return (
    <div
      className={`xl:w-[25vw] h-[35vh] 
flex items-center flex-col xl:mr-[3vw]
${isMD && "justify-center"}
  w-[80vw] xl:mt-0 mt-16
  rounded-3xl text-white bg-green-500`}
    >
      <p className="p-4 text-[1.4rem]">
        {` please Fill the missing report from
      ${missingReports[0].format("MMMM DD YYYY")}`}
      </p>

      <button
        className="border rounded-[10vh] transition-all duration-400 ease-in-out min-w-[50%] xl:mt-[20%] hover:bg-white text-[1.4rem] hover:text-green-500 "
        onClick={() => {
          setDate(missingReports[0].toDate());
          setReportPopUP(true);
        }}
      >
        Fill report
      </button>
    </div>
  );
};

export default SideReminder;
