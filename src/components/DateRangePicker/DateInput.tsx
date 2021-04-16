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
        onClick={() => setShowPicker(true)}
      >
        <input
          type="date"
          name="date"
          value={getYYYYMMDDFormat(selectedDate)}
          className="invisible absolute"
          readOnly
        />
        {!!tempMonthInput && (
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
        {!!tempDayInput && (
          <>
            {(dayInput || 0) < 10 && !!tempDayInput && <span>0</span>}
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
      <ButtonIcon
        className="border-0 bg-transparent py-1 px-1.5"
        icon={CalendarIcon}
        onClick={() => setShowPicker(!showPicker)}
      />
    </div>
  );
};

export default DateInput;
