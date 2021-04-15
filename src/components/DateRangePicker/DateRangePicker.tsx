import { useState, useEffect } from "react";

import WeekPicker from "./WeekPicker";
import DatePicker from "./DatePicker";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";
import { isLeapYear } from "../../utils/utils";

interface DateRangePickerProps {
  granularity?: "daily" | "weekly" | "monthly" | "yearly";
}

const DateRangePicker = ({ granularity = "daily" }: DateRangePickerProps) => {
  const [maxEndDate, setMaxEndDate] = useState<Date>(new Date());
  const [minEndDate, setMinEndDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    const today = new Date();
    const startD = new Date(startDate);
    setMinEndDate(startD);
    switch (granularity) {
      case "weekly":
      case "monthly":
        const beforeFeb29 = startD.getMonth() < 2;
        const daysInYear =
          isLeapYear(startD.getFullYear()) && beforeFeb29 ? 366 : 365;
        const yearAhead = new Date(startDate);
        yearAhead.setDate(startD.getDate() + daysInYear);
        const maxMonth = today > yearAhead ? yearAhead : today;
        maxMonth.setHours(maxMonth.getHours() + 1);
        setMaxEndDate(maxMonth);
        break;
      case "yearly":
        const decadeAhead = new Date(startDate);
        decadeAhead.setFullYear(startD.getFullYear() + 10);
        const maxYear = today > decadeAhead ? decadeAhead : today;
        maxYear.setHours(maxYear.getHours() + 1);
        setMaxEndDate(maxYear);
        break;
      default:
        const monthAhead = new Date(startDate);
        monthAhead.setMonth(startD.getMonth() + 1);
        const maxDay = today > monthAhead ? monthAhead : today;
        maxDay.setHours(maxDay.getHours() + 1);
        setMaxEndDate(maxDay);
        break;
    }
  }, [granularity, startDate]);

  const onStartDateChange = (date: Date) => {
    setStartDate(date);
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
        maxDate={maxEndDate}
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
        maxDate={maxEndDate}
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
        maxDate={maxEndDate}
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
        maxDate={maxEndDate}
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
