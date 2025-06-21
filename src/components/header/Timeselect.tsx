import { useState, useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { useDateSelectWebsite } from "@/features/websites/hooks/use-dateselect-websites";

const Timeselect = () => {
  const { date, onDateChange } = useDateSelectWebsite();

  const [startDate, setStartDate] = useState<Dayjs | null>(null); // default 09:00 AM
  const [endDate, setEndDate] = useState<Dayjs | null>(null); // default 09:00 AM

  useEffect(() => {
    if (date.from) setStartDate(dayjs(date.from));
    if (date.to) setEndDate(dayjs(date.to));
  }, [date]);

  const handleTimeChange = (
    newValue: Dayjs | null,
    selectedTime: "start" | "end"
  ) => {
    console.log(newValue, selectedTime);

    if (selectedTime === "start" && newValue) {
      setStartDate(newValue);
    } else {
      setEndDate(newValue);
    }
  };

  const handleFilterDate = () => {
    if (!startDate || !endDate) return;

    const OriginalFrom = new Date(startDate.toDate());
    OriginalFrom.setSeconds(0);
    OriginalFrom.setMilliseconds(0);

    const OriginalTo = new Date(endDate.toDate());
    OriginalTo.setSeconds(0);
    OriginalTo.setMilliseconds(0);

    console.log(OriginalFrom, OriginalTo);

    onDateChange({
      from: OriginalFrom,
      to: OriginalTo,
    });
  };

  return (
    <div className="flex items-center gap-3 justify-center w-[330px] sm:w-[300px]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          value={startDate}
          onChange={(startValue) => handleTimeChange(startValue, "start")}
          onClose={handleFilterDate}
          className="bg-white rounded-lg text-black px-3 py-2 "
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              variant: "outlined",
              className: "text-black",
              sx: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#669cff88",
                  color: "black",
                  fontWeight: 500,
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              },
            },
          }}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          value={endDate}
          onChange={(endValue) => handleTimeChange(endValue, "end")}
          onClose={handleFilterDate}
          className="bg-white rounded-lg text-black px-3 py-2 "
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              variant: "outlined",
              className: "text-black",
              sx: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#669cff88",
                  color: "black",
                  fontWeight: 500,
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Timeselect;
