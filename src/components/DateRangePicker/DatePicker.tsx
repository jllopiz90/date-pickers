import { useEffect, useState } from "react";
import ButtonIcon from "../icons/button-icon";
import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import OutsideEvent from "../../hooks/useOutsideElementEvent";
import DateInput from "./DateInput";
import {
  monthNames,
  getMaxDayPerMonth,
  getArrayWithNumbers,
} from "../../utils/utils";

const today = new Date();

export interface DatePickerProps {
  dateValue?: Date;
  maxDate?: Date;
  minDate?: Date;
  onChange: (date: Date) => void;
}

export interface DayBtnProps {
  day: number;
  onClick: () => void;
  active?: boolean;
  currentDay?: boolean;
  disabled?: boolean;
}

const DayBtn = ({
  day,
  onClick,
  active = false,
  currentDay = false,
  disabled = false,
}: DayBtnProps): JSX.Element => (
  <button
    className={`px-1 mx-1 my-2 focus:outline-none ${
      currentDay && !active
        ? "bg-calendar-yellow-200 hover:bg-calendar-yellow-100"
        : ""
    } ${active ? "bg-calendar-blue-200 hover:bg-calendar-blue-100" : ""} ${
      disabled ? "bg-gray-100" : "hover:bg-gray-100 active:bg-gray-300"
    }`}
    onClick={() => !disabled && onClick()}
    style={{ width: 45, height: 40 }}
  >
    <span className="px-2 text-sm">{day}</span>
  </button>
);

const DatePicker = ({
  onChange,
  maxDate = today,
  minDate = new Date(1979, 0, 1),
  dateValue = today,
}: DatePickerProps): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState(dateValue);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [monthInput, setMonthInput] = useState(dateValue.getMonth() + 1);
  const [tempMonthInput, setTempMonth] = useState(dateValue.getMonth() + 1);
  const [dayInput, setDayInput] = useState(dateValue.getDate());
  const [tempDayInput, setTempDayInput] = useState(dateValue.getDate());
  const [yearInput, setYearInput] = useState(today.getFullYear());
  const [tempYearInput, setTempYearInput] = useState(today.getFullYear());
  const [maxYear, setMaxYear] = useState(maxDate.getFullYear());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setMonthInput(dateValue.getMonth() + 1);
    setTempMonth(dateValue.getMonth() + 1);
    setDayInput(dateValue.getDate());
    setTempDayInput(dateValue.getDate());
    setYearInput(dateValue.getFullYear());
    setTempYearInput(dateValue.getFullYear());
    setYear(dateValue.getFullYear());
    setMonth(dateValue.getMonth() + 1);
  }, [dateValue]);

  useEffect(() => {
    setMaxYear(maxDate.getFullYear());
    if (maxDate < selectedDate) {
      setSelectedDate(maxDate);
      onChange(maxDate);
    }
  }, [maxDate, onChange, selectedDate]);

  useEffect(() => {
    if (minDate > selectedDate) {
      setSelectedDate(maxDate);
      onChange(maxDate);
    }
  }, [minDate, maxDate, onChange, selectedDate]);

  const decreaseYear = () => {
    setYear(year - 1);
  };

  const increaseYear = () => {
    if (year < maxYear) {
      setYear(year + 1);
    }
  };

  const decreaseMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const increaseMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const onDateClick = (day: number) => {
    setYearInput(year);
    setMonthInput(month);
    const date = new Date(year, month - 1, day);
    setSelectedDate(date);
    onChange(date);
    setShowPicker(false);
  };

  const isThisDay = (dayParam: number) => {
    return (
      today.getMonth() === month - 1 &&
      today.getFullYear() === year &&
      today.getDate() === dayParam
    );
  };

  const onMonthChange = (event: any) => {
    const maxMonth = (yearInput < maxYear && 12) || maxDate.getMonth() + 1;
    if (+event.target.value <= maxMonth) {
      const noZeros = event.target.value.replace(/^0+/, "");
      setTempMonth(noZeros);
    }
  };

  const onMonthBlur = (event: any) => {
    if (tempMonthInput > 0) {
      const newDate = new Date(yearInput, tempMonthInput - 1, dayInput);
      setSelectedDate(newDate);
      setMonthInput(tempMonthInput);
      onChange(newDate);
    } else {
      setTempMonth(monthInput);
    }
  };

  const onDayChange = (event: any) => {
    const maxMonth = (yearInput < maxYear && 12) || maxDate.getMonth() + 1;
    const maxDay =
      ((yearInput < maxYear || monthInput < maxMonth) &&
        getMaxDayPerMonth(+monthInput)) ||
      maxDate.getDate();
    if (+event.target.value <= maxDay) {
      const noZeros = event.target.value.replace(/^0+/, "");
      setTempDayInput(noZeros);
    }
  };

  const onDayBlur = (event: any) => {
    if (tempDayInput > 0) {
      const newDate = new Date(yearInput, monthInput - 1, tempDayInput);
      setSelectedDate(newDate);
      setDayInput(tempDayInput);
      onChange(newDate);
    } else {
      setTempDayInput(dayInput);
    }
  };

  const onYearChange = (event: any) => {
    if (+event.target.value <= maxYear) {
      const noZeros = event.target.value.replace(/^0+/, "");
      setTempYearInput(noZeros);
    }
  };

  const onYearBlur = (event: any) => {
    if (tempYearInput > 2000 && tempYearInput <= maxYear) {
      const newDate = new Date(tempYearInput, monthInput - 1, dayInput);
      setYearInput(tempYearInput);
      setSelectedDate(newDate);
      onChange(newDate);
    } else {
      setTempYearInput(yearInput);
    }
  };

  const daysPickerContent = () => (
    <span className="contents">
      <div
        style={{
          width: 380,
          height: 320,
          position: "absolute",
          top: "100%",
          bottom: "unset",
          left: -100,
          right: "unset",
          zIndex: 20,
        }}
        className="bg-white border-2 overflow-y-scroll mx-2"
      >
        <div className="flex flex-row justify-center pt-2">
          <ButtonIcon
            onClick={decreaseYear}
            className="mx-2 p-2 focus:outline-none active:bg-gray-300"
            icon={() => <ChevronLeft size={3} double />}
          />
          <ButtonIcon
            onClick={decreaseMonth}
            className="mx-2 p-2 focus:outline-none active:bg-gray-300"
            icon={() => <ChevronLeft size={3} />}
          />
          <span className="mx-8">
            {monthNames[month - 1]} {year}
          </span>
          <ButtonIcon
            onClick={increaseMonth}
            className="mx-2 p-2 focus:outline-none active:bg-gray-300"
            icon={() => <ChevronRight size={3} />}
          />
          <ButtonIcon
            onClick={increaseYear}
            className="mx-2 p-2 focus:outline-none active:bg-gray-300"
            icon={() => <ChevronRight size={3} double />}
          />
        </div>
        <div>
          {getArrayWithNumbers(getMaxDayPerMonth(month)).map((dayNumber) => (
            <DayBtn
              day={dayNumber + 1}
              active={
                dayNumber + 1 === selectedDate.getDate() &&
                month === selectedDate.getMonth() + 1 &&
                year === selectedDate.getFullYear()
              }
              disabled={
                new Date(year, month - 1, dayNumber) > maxDate ||
                new Date(year, month - 1, dayNumber) < minDate
              }
              currentDay={isThisDay(dayNumber + 1)}
              onClick={() => onDateClick(dayNumber + 1)}
              key={`day_${dayNumber}`}
            />
          ))}
        </div>
      </div>
    </span>
  );

  return (
    <OutsideEvent onClick={() => setShowPicker(false)}>
      <div className="box-border inline-flex relative mx-2">
        <DateInput
          year={year}
          tempYearInput={tempYearInput}
          maxYear={maxYear}
          maxDate={maxDate}
          dayInput={dayInput}
          tempDayInput={tempDayInput}
          monthInput={monthInput}
          tempMonthInput={tempMonthInput}
          selectedDate={selectedDate}
          setShowPicker={setShowPicker}
          onDayChange={onDayChange}
          onDayBlur={onDayBlur}
          onMonthChange={onMonthChange}
          onMonthBlur={onMonthBlur}
          onYearChange={onYearChange}
          onYearBlur={onYearBlur}
          showPicker={showPicker}
        />
        {showPicker && daysPickerContent()}
      </div>
    </OutsideEvent>
  );
};

export default DatePicker;
