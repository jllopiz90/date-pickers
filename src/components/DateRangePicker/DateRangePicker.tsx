import { useState, useEffect } from "react";

// import DatePicker from 'components/elements/DatePicker';
import WeekPicker from "./WeekPicker";
import DatePicker from './DatePicker';
import MonthPicker from './MonthPicker';
import YearPicker from './YearPicker';
// import { useAppDispatch } from 'hooks';
// import { setStartDate, setEndDate , useFiltersState } from 'features/filters/filters.slice';
import { isLeapYear } from "../../utils/utils";

const DateRangePicker: React.FC = () => {
  // const dispatch = useAppDispatch();
  const [maxEndDate, setMaxEndDate] = useState<Date>(new Date());
  const [minEndDate, setMinEndDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  // const { startDate, endDate, granularity } = useFiltersState();

  // useEffect(() => {
  //     const today = new Date();
  //     const startD = new Date(startDate);
  //     setMinEndDate(startD);
  //     switch(granularity) {
  //         case 'weekly':
  //         case 'monthly':
  //             const beforeFeb29 = startD.getMonth() < 2;
  //             const daysInYear = isLeapYear(startD.getFullYear()) && beforeFeb29 ? 366 : 365;
  //             const yearAhead = new Date(startDate);
  //             yearAhead.setDate(startD.getDate() + daysInYear);
  //             const maxMonth = today > yearAhead ? yearAhead : today;
  //             maxMonth.setHours(maxMonth.getHours() + 1)
  //             setMaxEndDate(maxMonth);
  //             break;
  //         case 'yearly':
  //             const decadeAhead = new Date(startDate);
  //             decadeAhead.setFullYear(startD.getFullYear() + 10);
  //             const maxYear = today > decadeAhead ? decadeAhead : today;
  //             maxYear.setHours(maxYear.getHours() + 1)
  //             setMaxEndDate(maxYear);
  //             break;
  //         default:
  //             const monthAhead = new Date(startDate);
  //             monthAhead.setMonth(startD.getMonth() + 1);
  //             const maxDay = today > monthAhead ? monthAhead : today;
  //             maxDay.setHours(maxDay.getHours() + 1)
  //             setMaxEndDate(maxDay);
  //             break;
  //     }
  // }, [granularity, startDate]);

  //remove this useEffect later when redux is set

  useEffect(() => {
    const today = new Date();
    const startD = new Date(startDate);
    setMinEndDate(startD);
    const beforeFeb29 = startD.getMonth() < 2;
    const daysInYear =
      isLeapYear(startD.getFullYear()) && beforeFeb29 ? 366 : 365;
    const yearAhead = new Date(startDate);
    yearAhead.setDate(startD.getDate() + daysInYear);
    const maxMonth = today > yearAhead ? yearAhead : today;
    maxMonth.setHours(maxMonth.getHours() + 1);
    setMaxEndDate(maxMonth);
  }, [startDate]);

  const onStartDateChange = (date: Date) => {
    // dispatch(setStartDate(date.toLocaleString()));
    console.log("start date change to:", date.toLocaleString());
    setStartDate(date);
  };

  const onEndDateChange = (date: Date) => {
    const year = date.getFullYear();
    // switch(granularity) {
    //     case 'weekly':
    //         const endWeek = date.getDate() + 6;
    //         const lastWeekDay = new Date(year, date.getMonth(), endWeek);
    //         dispatch(setEndDate(lastWeekDay.toLocaleString()));
    //         break;
    //     case 'monthly':
    //         const month = date.getMonth();
    //         const lastDay = new Date(year, month + 1, 0);
    //         dispatch(setEndDate(lastDay.toLocaleString()));
    //         break;
    //     case 'yearly':
    //         const lastMonth = new Date(year, 12, 0);
    //         dispatch(setEndDate(lastMonth.toLocaleString()));
    //         break;
    //     default:
    //         dispatch(setEndDate(date.toLocaleString()));
    //         break;
    // }
            const endWeek = date.getDate() + 6;
            const lastWeekDay = new Date(year, date.getMonth(), endWeek);
    console.log("end date change to:", lastWeekDay.toLocaleString());

    setEndDate(lastWeekDay);
  };

  // const dateRangePicker = () => (
  //     <>
  //         <DatePicker dateValue={new Date(startDate)} onChange={onStartDateChange} />
  //         <DatePicker dateValue={new Date(endDate)} maxDate={maxEndDate} minDate={minEndDate} onChange={onEndDateChange} />
  //     </>
  // );

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

  // const getGranularityText = () => {
  //     switch(granularity) {
  //         case 'daily':
  //             return 'Dates';
  //         case 'weekly':
  //             return 'Weeks';
  //         case 'monthly':
  //             return 'Months';
  //         default:
  //             return 'Years';
  //     }
  // }

  return (
    <div className="w-96 px-2 py-5 pt-5 bg-white rounded-lg shadow-lg  z-10">
      <div className="flex justify-center">
        {/* {getGranularityText()} */}
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Pick Start and End Dates.
        </h3>
      </div>
      <div className="mt-5 flex justify-around">
        {/* {granularity !== 'weekly' && dateRangePicker()} */}
        {/* {weekRangePicker()} */}
        {yearRangePicker()}
      </div>
    </div>
  );
};

export default DateRangePicker;
