import ButtonIcon from "../icons/button-icon";
import CalendarIcon from "../icons/Calendar";
import { getYYYYMMDDFormat, getMaxDayPerMonth } from "../../utils/utils";

export interface DateInputProps {
  year: number;
  tempYearInput: number;
  maxYear: number;
  maxDate: Date;
  dayInput?: number;
  tempDayInput?: number;
  monthInput?: number;
  tempMonthInput?: number;
  selectedDate: Date;
  setShowPicker: (param: boolean) => void;
  onDayChange?: (event: any) => void;
  onDayBlur?: (event: any) => void;
  onMonthChange?: (event: any) => void;
  onMonthBlur?: (event: any) => void;
  onYearChange: (event: any) => void;
  onYearBlur: (event: any) => void;
  showPicker: boolean;
  inputTailwindClass?: string;
  inputStyle?: any;
  disabled?:  boolean;
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
  inputStyle,
  disabled = false,
  inputTailwindClass = "flex flex-grow flex-shrink-0 items-center border border-gray-500 w-full px-1 py-0.5 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600",
}: DateInputProps) => {
  const maxMonth = (year < maxYear && 12) || maxDate.getMonth() + 1;
  const maxDay =
    ((year < maxYear || (monthInput || 0) < maxMonth) &&
      getMaxDayPerMonth(selectedDate.getMonth() + 1 || 0)) ||
    maxDate.getDate();
  return (
    <div
      className={(!inputStyle && inputTailwindClass) || ""}
      style={inputStyle}
    >
      <div
        className="flex-grow px-0.5 py-0 box-content"
        onClick={() => !disabled && setShowPicker(true)}
      >
        <input
          type="date"
          name="date"
          value={getYYYYMMDDFormat(selectedDate)}
          className="absolute"
          readOnly
          style={{ visibility: 'hidden'}}
        />
        {!!monthInput && (
          <>
            {(tempMonthInput || 0) < 10  && <span>0</span>}
            <input
              autoComplete="off"
              min="1"
              max={maxMonth}
              name="month"
              placeholder="--"
              type="number"
              value={tempMonthInput}
              className={`${
                (tempMonthInput || 0) < 10 || !tempMonthInput ? "w-2.5" : "w-5"
              }`}
              onChange={onMonthChange}
              onBlur={onMonthBlur}
              readOnly={disabled}
            />
            <span className="whitespace-pre px-0.5">/</span>
          </>
        )}
        {!!dayInput && (
          <>
            {(tempDayInput || 0) < 10 && <span>0</span>}
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
              className={`${(tempDayInput || 0) < 10 ? "w-2.5" : "w-5"}`}
              onChange={onDayChange}
              onBlur={onDayBlur}
              readOnly={disabled}
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
          readOnly={disabled}
        ></input>
      </div>
      <ButtonIcon
        className="border-0 bg-transparent py-1 px-1.5"
        icon={CalendarIcon}
        onClick={() => !disabled && setShowPicker(!showPicker)}
      />
    </div>
  );
};

export default DateInput;
