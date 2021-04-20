import { useState } from "react";

import WeekPicker from "./WeekPicker";
import DatePicker from "./DatePicker";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";

interface DateRangePickerProps {
  granularity?: "daily" | "weekly" | "monthly" | "yearly";
  onStartDateChange?: (startDate: Date) => void;
  onEndDateChange?: (endDate: Date) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

const DateRangePicker = ({
  granularity = "daily",
  initialStartDate = new Date(),
  initialEndDate = new Date(),
}: DateRangePickerProps) => {
  const [minEndDate, setMinEndDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);

  const onStartDateChange = (date: Date) => {
    setStartDate(date);
    setMinEndDate(date);
  };

  const onEndDateChange = (date: Date) => {
    const year = date.getFullYear();
    switch (granularity) {
      case "weekly":
        const endWeek = date.getDate() + 6;
        const lastWeekDay = new Date(year, date.getMonth(), endWeek);
        setEndDate(lastWeekDay);
        break;
      case "monthly":
        const month = date.getMonth();
        const lastDay = new Date(year, month + 1, 0);
        setEndDate(lastDay);
        break;
      case "yearly":
        const lastMonth = new Date(year, 12, 0);
        setEndDate(lastMonth);
        break;
      default:
        setEndDate(date);
        break;
    }
  };

  const weekRangePicker = () => (
    <>
      <WeekPicker dateValue={startDate} onChange={onStartDateChange} />
      <WeekPicker
        dateValue={endDate}
        minDate={minEndDate}
        onChange={onEndDateChange}
      />
    </>
  );

  const dateRangePicker = () => (
    <>
      <DatePicker dateValue={startDate} onChange={onStartDateChange} />
      <DatePicker
        dateValue={endDate}
        minDate={minEndDate}
        onChange={onEndDateChange}
      />
    </>
  );

  const monthRangePicker = () => (
    <>
      <MonthPicker dateValue={startDate} onChange={onStartDateChange} />
      <MonthPicker
        dateValue={endDate}
        minDate={minEndDate}
        onChange={onEndDateChange}
      />
    </>
  );

  const yearRangePicker = () => (
    <>
      <YearPicker dateValue={startDate} onChange={onStartDateChange} />
      <YearPicker
        dateValue={endDate}
        minDate={minEndDate}
        onChange={onEndDateChange}
      />
    </>
  );

  const getGranularityText = () => {
    switch (granularity) {
      case "daily":
        return "Dates";
      case "weekly":
        return "Weeks";
      case "monthly":
        return "Months";
      default:
        return "Years";
    }
  };

  return (
    <div className="w-96 px-2 py-5 pt-5 bg-white rounded-lg shadow-lg  z-10">
      <div className="flex justify-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Pick Start and End {getGranularityText()}.
        </h3>
      </div>
      <div className="mt-5 flex justify-around">
        {granularity === "daily" && dateRangePicker()}
        {granularity === "weekly" && weekRangePicker()}
        {granularity === "monthly" && monthRangePicker()}
        {granularity === "yearly" && yearRangePicker()}
      </div>
    </div>
  );
};

export default DateRangePicker;
