import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import { FaRegEdit } from "react-icons/fa";
import PopUpComponent from "../../../components/PopUpComponent";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { Report } from "../../../validation/reportValidatonZOD";
import axios from "axios";
import { toast } from "sonner";
const ReportsHistory = ({
  reportsDates,
  matchingReports,
  entriesToRenderInHistory,
  fetchData,
}) => {
  const isSM = useMediaQuery({ maxWidth: 700 });
  const [initialDataForEdit, setInitialDataForEdit] = useState();
  const [editPopUp, setEditPopUp] = useState(false);
  const [dateToEdit, setDateToEdit] = useState(null);
  const reportInputs = {
    placeholders: ["Main Balance", "investments balance", "savings balance"],
    titles: ["main", "investments", "savings"],
  };

  const handleStartEdit = (date, matchingReport) => {
    setDateToEdit(date);
    setInitialDataForEdit(matchingReport);
    setEditPopUp(true);
  };
  const handleSubmitPopUp = async (collection, item_Id, newData) => {
    try {
      if (initialDataForEdit) {
        const response = await axios.put(`/${collection}/${item_Id}`, newData);
        console.log(response);
        fetchData();
      }
    } catch (error) {
      toast.error("Something went wrong editting the report");
    }
  };
  useEffect(() => {
    console.log(initialDataForEdit);
  }, [initialDataForEdit]);

  const handleClosePopUp = () => {
    setEditPopUp(false);
    setInitialDataForEdit(undefined);
    setDateToEdit(null);
  };

  useEffect(() => {
    if (reportsDates.length < 1) {
      toast.info("Wait for next saturday to start filling reports!");
    }
  }, [reportsDates]);
  return (
    <div className="w-full min-h-[80vh] mb-[10vh] xl:mt-32 flex flex-col">
      {editPopUp && (
        <PopUpComponent
          onClose={handleClosePopUp}
          inputs={reportInputs}
          onEdit={handleSubmitPopUp}
          numbersInputs
          buttonText="Save Changes"
          initialDataForEdit={initialDataForEdit}
          setInitialDataForEdit={setInitialDataForEdit}
          schema={Report}
          collection="reports"
          popUpTitle={`Edit report from ${dayjs(dateToEdit)
            .toDate()
            .toDateString()}`}
        />
      )}
      <h2 className="text-white md:text-[5rem] text-[2.5rem] ml-16 xl:pt-0 pt-16 ">
        Reports History
      </h2>
      <div className="flex items-center w-full justify-center mt-24 sm:text-[1rem] text-[0.85rem] ">
        <table className="w-[90vw]  border border-gray-300 rounded-xl mb-5">
          <thead>
            <tr className="bg-gray-200 flex w-full justify-evenly  ">
              <th className="border w-full flex ">Date</th>
              <th className="border w-full flex ">Main</th>
              <th className="border w-full flex ">Investments</th>
              <th className="border w-full flex ">Savings</th>
              <th className="border w-1/4 flex">Edit</th>
            </tr>
          </thead>
          <tbody className="w-full bg-blue-200">
            {reportsDates.map((date, index) => {
              const matchingReport = matchingReports.find((report) =>
                dayjs(report.date).isSame(date, "day")
              );

              return (
                <tr
                  key={index}
                  className="flex w-full justify-evenly bg-blue-200"
                >
                  <td className="border sm:p-2 bg-slate-500 w-full">
                    {dayjs(date).toDate().toDateString()}
                  </td>
                  {entriesToRenderInHistory &&
                    entriesToRenderInHistory.map((key) => (
                      <td
                        key={key}
                        className="border sm:p-2 bg-slate-500 w-full"
                      >
                        {matchingReport ? (
                          matchingReport[key] // Display data if available
                        ) : (
                          <div>
                            {!isSM ? (
                              <Alert
                                severity="warning"
                                className="bg-red-200 xl:w-[80%] w-1/2 "
                              >
                                Missing Data
                              </Alert>
                            ) : (
                              <div>No data</div>
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                  <td className="border sm:p-2 bg-slate-500 w-1/4">
                    {matchingReport && (
                      <button
                        onClick={() => {
                          handleStartEdit(date, matchingReport);
                        }}
                      >
                        <FaRegEdit />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsHistory;
