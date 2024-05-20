import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import PopUpComponent from "../../../components/PopUpComponent";
import axios from "axios";
import tokenCTX from "../../../store/tokenCTX";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { Report } from "../../../validation/reportValidatonZOD";
import ReportsHistory from "./ReportsHistory";
import SideReminder from "./SideReminder";
import CurrentBalance from "./CurrentBalance";
import { useMediaQuery } from "react-responsive";
const BalancePage = () => {
  //* states and contexts
  const [reportsFromDB, setReportsFromDB] = useState([]);
  const [reportPopUP, setReportPopUP] = useState(false);
  const [missingReports, setMissingReports] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [matchingReports, setMatchingReports] = useState([]);
  const { token, setToken } = useContext(tokenCTX);
  const [createdAt, setCreatedAt] = useState(dayjs());
  const [reportsDates, setReportsDate] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const [userData, setUserData] = useState({
    labels: ["0", "", "1"],

    datasets: [
      {
        label: "Main",
        data: [0, 0, 0],
        order: 1,
      },
      {
        label: "Investments",
        data: [0, 0, 0],
        order: 1,
      },
      {
        label: "Savings",
        data: [0, 0, 0],
        order: 1,
      },
    ],
  });
  //* static texts
  const reportInputs = {
    placeholders: ["Main Balance", "investments balance", "savings balance"],
    titles: ["main", "investments", "savings"],
  };
  const entriesToRenderInHistory = ["main", "savings", "investments"];
  //* Functions
  const fetchData = async () => {
    // Getting Reports From DB, Getting the Date User Joined To know When To start Tracking
    // and with that logic setting all the relevant dates that supposed to have reports
    try {
      const response = await axios.get("/reports");
      setReportsFromDB(response.data);
      const tokenData = jwtDecode(token);
      const userData = await axios.get(`/users/${tokenData._id}`);
      setCreatedAt(userData.data.createdAt);
      if (userData.data.createdAt) {
        const startDate = dayjs(userData.data.createdAt);
        const endDate = dayjs();
        const saturdays = [];
        let currentDate = startDate;
        while (
          currentDate.isBefore(endDate) ||
          currentDate.isSame(endDate, "day")
        ) {
          if (currentDate.day() === 6) {
            saturdays.push(currentDate);
          }
          currentDate = currentDate.add(1, "day");
        }
        setReportsDate(saturdays);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const findReports = () => {
    // Finding inside the reports from the DB that match by day to the reports Dates we found earlier, setting states for both missing and matching reports dates
    if (reportsDates.length > 0 && reportsFromDB.length > 0) {
      const matchings = reportsFromDB.filter((report) =>
        reportsDates.some((date) => dayjs(report.date).isSame(date, "day"))
      );
      setMatchingReports(matchings);
      const missing = reportsDates.filter(
        (date) =>
          !matchings.some((report) => dayjs(report.date).isSame(date, "day"))
      );
      setMissingReports(missing);
    } else {
      // if there arent reports from the DB
      setMissingReports(reportsDates);
    }
  };

  useEffect(() => {
    console.log(missingReports);
  }, [missingReports]);

  useEffect(() => {
    console.log(reportsFromDB);
    findReports();
  }, [reportsDates, reportsFromDB, token]);

  useEffect(() => {
    updateGraph();
  }, [matchingReports, reportsDates]);

  const updateGraph = () => {
    // Updated grapph staate for displaying relevant data + formatting
    if (matchingReports.length > 0) {
      const labels = reportsDates.map((date, index) => {
        if (index === 0 || index === reportsDates.length - 1) {
          return dayjs(date).toDate().toDateString(); // Keep first and last dates
        } else {
          return ""; // Empty string for middle labels
        }
      });
      const datasets = entriesToRenderInHistory.map((key) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        order: 1,
        data: matchingReports.map((report) => report[key]),
      }));

      setUserData({ labels, datasets });
    }
  };

  const handleSubmitReport = async (values, collection) => {
    // Submit Report
    const fixedValues = { ...values, date: date };
    try {
      const response = await axios.post(`/${collection}`, fixedValues);
      fetchData();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] overflow-hidden  ">
      {reportPopUP && (
        <PopUpComponent
          numbersInputs
          inputs={reportInputs}
          popUpTitle={`Report for ${dayjs(date).format("MMMM DD YYYY")}`}
          buttonText="Submit"
          collection="reports"
          popUpFunction={handleSubmitReport}
          onClose={() => setReportPopUP(false)}
          schema={Report}
        />
      )}
      <div className="md:pt-[5rem]">
        <header>
          <h1 className="text-white md:text-[5rem] text-[2.5rem] ml-16 xl:pt-0 pt-16 ">
            My Balance
          </h1>
        </header>
        <div className="flex w-[100vw] min-h-[66vh] flex flex-col xl:flex-row items-center">
          <div className="xl:w-[80vw] xl:h-[65vh] w-[95vw] pt-5  flex ">
            <Line
              data={userData}
              options={{
                scales: {
                  x: {
                    ticks: {
                      color: "white",
                    },
                    grid: {
                      color: "white",
                    },
                  },
                  y: {
                    ticks: {
                      color: "lightgreen",
                      autoSkip: true,
                      maxTicksLimit: isMobile ? 2 : 4,
                    },
                    grid: {
                      color: "white",
                    },
                  },
                },
              }}
            />
          </div>
          {missingReports.length > 0 &&
            missingReports[0].date &&
            reportsDates.length > 0 && (
              <SideReminder
                missingReports={missingReports}
                setDate={setDate}
                setReportPopUP={setReportPopUP}
              />
            )}
        </div>
      </div>
      <CurrentBalance lastReport={reportsFromDB[reportsFromDB.length - 1]} />
      <ReportsHistory
        entriesToRenderInHistory={entriesToRenderInHistory}
        reportsDates={reportsDates}
        matchingReports={matchingReports}
        fetchData={fetchData}
      />
    </div>
  );
};

export default BalancePage;
