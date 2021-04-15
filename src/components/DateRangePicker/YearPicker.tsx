import { useEffect, useState } from "react";
import OutsideEvent from "../../hooks/useOutsideElementEvent";
import DateInput from "./DateInput";
import { getArrayWithYears } from "../../utils/utils";

const today = new Date();

export interface DatePickerProps {
  dateValue?: Date;
  maxDate?: Date;
  minDate?: Date;
  onChange: (date: Date) => void;
}

export interface YearBtnProps {
  year: number;
  onClick: () => void;
  active?: boolean;
  currentYear?: boolean;
  disabled?: boolean;
}

const YearBtn = ({
  year,
  onClick,
  active = false,
  currentYear = false,
  disabled = false,
}: YearBtnProps): JSX.Element => (
  <button
    className={`p-4 m-1 focus:outline-none ${
      currentYear && !active
        ? "bg-calendar-yellow-200 hover:bg-calendar-yellow-100"
        : ""
    } ${active ? "bg-calendar-blue-200 hover:bg-calendar-blue-100" : ""} ${
      disabled ? "bg-gray-100" : "hover:bg-gray-100 active:bg-gray-300"
    }`}
    onClick={() => !disabled && onClick()}
  >
    <span className="px-2 text-sm">{year}</span>
  </button>
);

const YearPicker = ({
  onChange,
  maxDate = today,
  minDate = new Date(1979, 0, 1),
  dateValue = today,
}: DatePickerProps): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState(dateValue);
  const [year, setYear] = useState(today.getFullYear());
  const [yearInput, setYearInput] = useState(today.getFullYear());
  const [tempYearInput, setTempYearInput] = useState(today.getFullYear());
  const [maxYear, setMaxYear] = useState(maxDate.getFullYear());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
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


  const onYearClick = (yearParam: number) => {
    const date = new Date(yearParam, 0, 1);
    setSelectedDate(date);
    onChange(date);
    setShowPicker(false);
  };

  const isThisYear = (year: number) => today.getFullYear() === year;

  const onYearChange = (event: any) => {
    if (+event.target.value <= maxYear) {
      const noZeros = event.target.value.replace(/^0+/, "");
      setTempYearInput(noZeros);
    }
  };

  const onYearBlur = (event: any) => {
    if (tempYearInput > 2000 && tempYearInput <= maxYear) {
      const newDate = new Date(tempYearInput, 0, 1);
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
          width: 380,
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
        <div className="pt-2 flex justify-center flex-wrap">
          {getArrayWithYears().map((year) => (
            <YearBtn
              year={year}
              active={year === selectedDate.getFullYear()}
              disabled={
                new Date(year, 0, 1) > maxDate ||
                new Date(year, 0, 1) < minDate
              }
              currentYear={isThisYear(year)}
              onClick={() => onYearClick(year)}
              key={`month_${year}`}
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
          selectedDate={selectedDate}
          setShowPicker={setShowPicker}
          onYearChange={onYearChange}
          onYearBlur={onYearBlur}
          showPicker={showPicker}
        />
        {showPicker && monthsPickerContent()}
      </div>
    </OutsideEvent>
  );
};

export default YearPicker;
