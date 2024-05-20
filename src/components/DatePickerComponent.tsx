//? This component will be featured when the user
//? needs to set an event of any type to be due to a specific date
//? used In the PopUpComponent.
//* Imports
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
export default function BasicDateTimePicker({ date, setDate }) {
  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          label="Basic date time picker"
          value={date}
          onChange={(newDate) => setDate(newDate)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
