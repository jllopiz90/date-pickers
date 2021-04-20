import { useEffect, useState } from "react";
import ButtonIcon from "../icons/button-icon";
import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import {
    monthNames,
    getArrayWithNumbers,
    getMaxDayPerMonth,
  } from "../../utils/utils";
  import useWindowDimensions from "../../hooks/useWindowDimensions";

const today = new Date();

export interface CalendarProps {
    decreaseYear: () => void;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    increaseYear: () => void;
    onDateClick:  (day: number) => void;
    month: number;
    year: number;
    selectedDate: Date;
    maxDate: Date;
    minDate: Date;
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

const Calendar = ({
    decreaseYear,
    decreaseMonth,
    increaseMonth,
    increaseYear,
    onDateClick,
    year,
    month,
    selectedDate,
    maxDate,
    minDate,
}: CalendarProps) => {
    const [leftPosition, setLeftPosition] = useState(-100);
    const { width } = useWindowDimensions();
  
    useEffect(() => {
      const elems = document.getElementsByClassName('calendar');
      const rect = elems[0].getBoundingClientRect();
      if (rect.x + rect.width > width) {
          const newLeftPos = leftPosition -  (rect.x + rect.width - width) - 20;
          setLeftPosition(newLeftPos);
      }  
    }, [width, leftPosition]);

    const isThisDay = (dayParam: number) => {
        return (
          today.getMonth() === month - 1 &&
          today.getFullYear() === year &&
          today.getDate() === dayParam
        );
      };

      return (
        <div
          style={{
            width: 380,
            height: 320,
            position: "absolute",
            top: "100%",
            bottom: "unset",
            left: leftPosition,
            right: "unset",
            zIndex: 20,
          }}
          className="calendar bg-white border-2 overflow-y-scroll mx-2"
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
            <span className="mx-2">
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
                  new Date(year, month - 1, dayNumber + 1) > maxDate ||
                  new Date(year, month - 1, dayNumber + 1) < minDate
                }
                currentDay={isThisDay(dayNumber + 1)}
                onClick={() => onDateClick(dayNumber + 1)}
                key={`day_${dayNumber}`}
              />
            ))}
          </div>
        </div>
    )
};

export default Calendar;