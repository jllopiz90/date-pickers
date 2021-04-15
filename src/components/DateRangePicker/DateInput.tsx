import CalendarIcon from "../icons/Calendar";
import { getYYYYMMDDFormat, getMaxDayPerMonth } from "../../utils/utils";

export interface DateInputProps {
  year: number;
  tempYearInput: number;
  maxYear: number;
  maxDate: Date;
  dayInput: number;
  tempDayInput: number;
  monthInput: number;
  tempMonthInput: number;
  selectedDate: Date;
  setShowPicker: (param: boolean) => void;
  onDayChange?: (event: any) => void;
  onDayBlur?: (event: any) => void;
  onMonthChange?: (event: any) => void;
  onMonthBlur?: (event: any) => void;
  onYearChange: (event: any) => void;
  onYearBlur: (event: any) => void;
  showPicker: boolean;
  hideDay?: boolean;
  hideMonth?: boolean;
}

const DateInput = ({
  year,
  tempYearInput,
  maxYear,
  maxDate,
  dayInput,
  tempDayInput,
  monthInput,
  tempMonthInput,
  selectedDate,
  setShowPicker,
  onDayChange = () => {},
  onDayBlur = () => {},
  onMonthChange = () => {},
  onMonthBlur = () => {},
  onYearChange,
  onYearBlur,
  showPicker,
  hideDay = false,
  hideMonth = false,
}: DateInputProps) => {
  const maxMonth = (year < maxYear && 12) || maxDate.getMonth() + 1;
  const maxDay =
    ((year < maxYear || monthInput < maxMonth) &&
      getMaxDayPerMonth(+monthInput)) ||
    maxDate.getDate();
  return (
    <div className="flex flex-grow flex-shrink-0 border border-gray-500">
      <div
        className="flex-grow px-0.5 py-0 box-content"
        onClick={() => setShowPicker(true)}
      >
        <input
          type="date"
          name="date"
          value={getYYYYMMDDFormat(selectedDate)}
          className="invisible absolute"
          readOnly
        />
        {!hideMonth && (
          <>
            {tempMonthInput < 10 && !!tempMonthInput && <span>0</span>}
            <input
              autoComplete="off"
              min="1"
              max={maxMonth}
              name="month"
              placeholder="--"
              type="number"
              value={tempMonthInput}
              className={`${
                tempMonthInput < 10 || !tempMonthInput ? "w-2.5" : "w-5"
              }`}
              onChange={onMonthChange}
              onBlur={onMonthBlur}
            />
            <span className="whitespace-pre px-0.5">/</span>
          </>
        )}
        {!hideDay && (
          <>
            {dayInput < 10 && !!tempDayInput && <span>0</span>}
            <input
              autoComplete="off"
              data-input="true"
              inputMode="numeric"
              min="1"
              max={maxDay}
              name="day"
              placeholder="--"
              type="number"
              value={tempDayInput}
              className={`${tempDayInput < 10 ? "w-2.5" : "w-5"}`}
              onChange={onDayChange}
              onBlur={onDayBlur}
            />
            <span className="whitespace-pre px-0.5">/</span>
          </>
        )}
        <input
          autoComplete="off"
          data-input="true"
          inputMode="numeric"
          max={maxYear}
          name="year"
          placeholder="----"
          step="1"
          type="number"
          value={tempYearInput}
          className="w-10"
          onChange={onYearChange}
          onBlur={onYearBlur}
        ></input>
      </div>
      <button
        className="border-0 bg-transparent py-1 px-1.5"
        onClick={() => setShowPicker(!showPicker)}
      >
        <CalendarIcon />
      </button>
    </div>
  );
};

export default DateInput;
