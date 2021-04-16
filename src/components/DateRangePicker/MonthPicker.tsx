import { useEffect, useState } from "react";
import ButtonIcon from "../icons/button-icon";
import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import OutsideEvent from "../../hooks/useOutsideElementEvent";
import DateInput from "./DateInput";
import { monthShortNames } from "../../utils/utils";

const today = new Date();

export interface DatePickerProps {
  dateValue?: Date;
  maxDate?: Date;
  minDate?: Date;
  onChange: (date: Date) => void;
}

export interface MonthBtnProps {
  month: string;
  onClick: () => void;
  active?: boolean;
  currentMonth?: boolean;
  disabled?: boolean;
}

const MonthBtn = ({
  month,
  onClick,
  active = false,
  currentMonth = false,
  disabled = false,
}: MonthBtnProps): JSX.Element => (
  <button
    className={`p-5 m-1 focus:outline-none ${
      currentMonth && !active
        ? "bg-calendar-yellow-200 hover:bg-calendar-yellow-100"
        : ""
    } ${active ? "bg-calendar-blue-200 hover:bg-calendar-blue-100" : ""} ${
      disabled ? "bg-gray-100" : "hover:bg-gray-100 active:bg-gray-300"
    }`}
    onClick={() => !disabled && onClick()}
  >
    <span className="px-2 text-sm">{month}</span>
  </button>
);

const MonthPicker = ({
  onChange,
  maxDate = today,
  minDate = new Date(1979, 0, 1),
  dateValue = today,
}: DatePickerProps): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState(dateValue);
  const [year, setYear] = useState(today.getFullYear());
  const [monthInput, setMonthInput] = useState(dateValue.getMonth() + 1);
  const [tempMonthInput, setTempMonth] = useState(dateValue.getMonth() + 1);
  const [yearInput, setYearInput] = useState(today.getFullYear());
  const [tempYearInput, setTempYearInput] = useState(today.getFullYear());
  const [maxYear, setMaxYear] = useState(maxDate.getFullYear());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setMonthInput(dateValue.getMonth() + 1);
    setTempMonth(dateValue.getMonth() + 1);
    setYearInput(dateValue.getFullYear());
    setTempYearInput(dateValue.getFullYear());
    setYear(dateValue.getFullYear());
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


  const onMonthClick = (monthParam: number) => {
    setYearInput(year);
    setMonthInput(monthParam + 1);
    const date = new Date(year, monthParam, 1);
    setSelectedDate(date);
    onChange(date);
    setShowPicker(false);
  };

  const isThisMonth = (monthIndex: number) =>
    today.getMonth() === monthIndex && today.getFullYear() === year;

  const onMonthChange = (event: any) => {
    const maxMonth = (yearInput < maxYear && 12) || maxDate.getMonth() + 1;
    if (+event.target.value <= maxMonth) {
      const noZeros = event.target.value.replace(/^0+/, "");
      setTempMonth(noZeros);
    }
  };

  const onMonthBlur = (event: any) => {
    if (tempMonthInput > 0) {
      const newDate = new Date(yearInput, tempMonthInput - 1, 1);
      setSelectedDate(newDate);
      setMonthInput(tempMonthInput);
      onChange(newDate);
    } else {
      setTempMonth(monthInput);
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
      const newDate = new Date(tempYearInput, monthInput - 1, 1);
      setYearInput(tempYearInput);
      setSelectedDate(newDate);
      onChange(newDate);
    } else {
      setTempYearInput(yearInput);
    }
  };

  const monthsPickerContent = () => (
    <span className="contents">
      <div
        style={{
          width: 360,
          height: 280,
          position: "absolute",
          top: "100%",
          bottom: "unset",
          left: -100,
          right: "unset",
          zIndex: 20,
        }}
        className="bg-white border-2 overflow-y-scroll mx-2"
      >
        <div className="flex flex-row justify-around pt-2">
          <ButtonIcon 
            onClick={decreaseYear}
            className="mx-6 p-2 focus:outline-none active:bg-gray-300"
            icon={() => <ChevronLeft  size={3} />}
          />
          <span className="">{year}</span>
          <ButtonIcon 
            onClick={increaseYear}
            className="mx-6 p-2 focus:outline-none active:bg-gray-300"
            icon={() => <ChevronRight  size={3} />}
          />
        </div>
        <div className="pt-2">
          {monthShortNames.map((monthShortName, index) => (
            <MonthBtn
              month={monthShortName}
              active={
                index === selectedDate.getMonth() &&
                year === selectedDate.getFullYear()
              }
              disabled={
                new Date(year, index, 1) > maxDate ||
                new Date(year, index, 1) < minDate
              }
              currentMonth={isThisMonth(index)}
              onClick={() => onMonthClick(index)}
              key={`month_${monthShortName}`}
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
          monthInput={monthInput}
          tempMonthInput={tempMonthInput}
          selectedDate={selectedDate}
          setShowPicker={setShowPicker}
          onMonthChange={onMonthChange}
          onMonthBlur={onMonthBlur}
          onYearChange={onYearChange}
          onYearBlur={onYearBlur}
          showPicker={showPicker}
        />
        {showPicker && monthsPickerContent()}
      </div>
    </OutsideEvent>
  );
};

export default MonthPicker;
