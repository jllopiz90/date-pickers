import { useEffect, useState } from "react";
import OutsideEvent from "../../hooks/useOutsideElementEvent";
import DateInput from "./DateInput";
import Calendar from "./Calendar";
import {
  getMaxDayPerMonth,
} from "../../utils/utils";

const today = new Date();

export interface DatePickerProps {
  dateValue?: Date;
  maxDate?: Date;
  minDate?: Date;
  onChange: (date: Date) => void;
  dateInputClasses?: string;
}

const DatePicker = ({
  onChange,
  maxDate = today,
  minDate = new Date(1979, 0, 1),
  dateValue = today,
  dateInputClasses,
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
          inputTailwindClass={dateInputClasses}
        />
        {showPicker && (
          <Calendar
            decreaseMonth={decreaseMonth}
            decreaseYear={decreaseYear}
            increaseMonth={increaseMonth}
            increaseYear={increaseYear}
            maxDate={maxDate}
            minDate={minDate}
            month={month}
            onDateClick={onDateClick}
            selectedDate={selectedDate}
            year={year}
          />
        )}
      </div>
    </OutsideEvent>
  );
};

export default DatePicker;
