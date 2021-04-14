import { useEffect, useState } from 'react';
import ChevronLeftBtn from './icons/ChevronLeftBtn';
import ChevronRight from './icons/ChevronRightBtn';
import CalendarIcon from './icons/Calendar';
import { getYYYYMMDDFormat } from '../utils/utils';
import OutsideEvent from '../hooks/useOutsideElementEvent';

const weekNumbers = Array.from(Array(52).keys());

const getDateOfWeek = (weekNumber: number, year: number) => {
    const d = 1 + weekNumber * 7; // 1st of January + 7 days for each week
    return new Date(year, 0, d);
};

const getWeekNumber = (date: Date) => {
    const yearStart = new Date(date.getFullYear(), 0, 1);
    //@ts-ignore
    return Math.ceil(((date - yearStart) / 86400000 + 1) / 7) - 1;
};

const getMaxDayPerMonth = (month: number) => {
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 2:
            return 28;
        default:
            return 30;
    }
};

interface WeekPickerProps {
    dateValue?: Date;
    maxDate?: Date;
    minDate?: Date;
    onChange: (date: Date) => void;
}

interface WeekBtnProps {
    week: number;
    onClick: () => void;
    active?: boolean;
    currentWeek?: boolean;
    disabled?: boolean;
}

const WeekBtn = ({ week, onClick, active = false, currentWeek = false, disabled = false }: WeekBtnProps): JSX.Element => (
    <button
        className={`px-1 m-1 focus:outline-none ${
            currentWeek && !active ? 'bg-calendar-yellow-200 hover:bg-calendar-yellow-100' : ''
        } ${active ? 'bg-calendar-blue-200 hover:bg-calendar-blue-100' : ''} ${disabled ? 'bg-gray-100' : 'hover:bg-gray-100 active:bg-gray-300'}`}
        onClick={() => !disabled && onClick()}
        style={{ width: 85, height: 40 }}
    >
        <span className="px-2 text-sm">Week {week + 1}</span>
    </button>
);

const WeekPicker = ({
    onChange,
    maxDate = new Date(),
    minDate = new Date(2000, 0, 1),
    dateValue = new Date(),
}: WeekPickerProps): JSX.Element => {
    const [selectedWeek, setSelectedWeek] = useState(getWeekNumber(dateValue));
    const [selectedDate, setSelectedDate] = useState(dateValue);
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthInput, setMonthInput] = useState(dateValue.getMonth() + 1);
    const [tempMonthInput, setTempMonth] = useState(dateValue.getMonth() + 1);
    const [dayInput, setDayInput] = useState(dateValue.getDate());
    const [tempDayInput, setTempDayInput] = useState(dateValue.getDate());
    const [yearInput, setYearInput] = useState(new Date().getFullYear());
    const [tempYearInput, setTempYearInput] = useState(new Date().getFullYear());
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

    const onWeekClick = (week: number) => {
        setYearInput(year);
        setSelectedWeek(week);
        const date = getDateOfWeek(week, year);
        setSelectedDate(date);
        onChange(date);
        setShowPicker(false);
    };

    const isThisWeek = (week: number) => {
        const now = new Date();
        const currentWeek = getWeekNumber(now);
        const currentYear = now.getFullYear();
        return year === currentYear && week === currentWeek;
    };

    const onMonthChange = (event: any) => {
        const maxMonth = (yearInput < maxYear && 12) || maxDate.getMonth() + 1;
        if (+event.target.value <= maxMonth) {
            const noZeros = event.target.value.replace(/^0+/, '');
            setTempMonth(noZeros);
        }
    }

    const onMonthBlur = (event: any) => {
        if(tempMonthInput > 0) {
            const auxDate = new Date(yearInput, tempMonthInput - 1, dayInput);
            const newWeek = getWeekNumber(auxDate);
            setSelectedWeek(newWeek);
            setMonthInput(tempMonthInput);
            const newDate = getDateOfWeek(newWeek, yearInput);
            setSelectedDate(newDate);
            onChange(selectedDate);
        } else {
            setTempMonth(monthInput);
        }
    }

    const onDayChange = (event: any) => {
        const maxMonth = (yearInput < maxYear && 12) || maxDate.getMonth() + 1;
        const maxDay =
            ((yearInput < maxYear || monthInput < maxMonth) && getMaxDayPerMonth(monthInput)) || maxDate.getDate();
        if (+event.target.value <= maxDay) {
            const noZeros = event.target.value.replace(/^0+/, '');
            setTempDayInput(noZeros);
        }
    }

    const onDayBlur = (event: any) => {
        if (tempDayInput > 0) {
            const auxDate = new Date(yearInput, monthInput - 1, tempDayInput);
            const newWeek = getWeekNumber(auxDate);
            setSelectedWeek(newWeek);
            setDayInput(tempDayInput);
            const newDate = getDateOfWeek(newWeek, yearInput);
            setSelectedDate(newDate);
            onChange(selectedDate);
        } else {
            setTempDayInput(dayInput);
        }
     }

    const onYearChange = (event: any) => {
        if (+event.target.value <= maxYear) {
            const noZeros = event.target.value.replace(/^0+/, '');
            setTempYearInput(noZeros);
        }
    }

    const onYearBlur = (event: any) => {
        if (tempYearInput > 2000 && tempYearInput <= maxYear) {
            const auxDate = new Date(tempYearInput, monthInput - 1, dayInput);
            const newWeek = getWeekNumber(auxDate);
            setSelectedWeek(newWeek);
            setYearInput(tempYearInput);
            const newDate = getDateOfWeek(newWeek, tempYearInput);
            setSelectedDate(newDate);
            onChange(selectedDate);
        } else {
            setTempYearInput(yearInput);
        }
     }


    const dateInput = () => {
        const maxMonth = (year < maxYear && 12) || maxDate.getMonth() + 1;
        const maxDay =
            ((year < maxYear || monthInput < maxMonth) && getMaxDayPerMonth(monthInput)) || maxDate.getDate();
        return (
            <div className="flex flex-grow flex-shrink-0 border border-gray-500">
                <div className="flex-grow px-0.5 py-0 box-content" onClick={() => setShowPicker(true)}>
                    <input
                        type="date"
                        name="date"
                        value={getYYYYMMDDFormat(selectedDate)}
                        className="invisible absolute"
                        readOnly
                    />
                    {tempMonthInput < 10 && !!tempMonthInput && <span>0</span>}
                    <input
                        autoComplete="off"
                        min="1"
                        max={maxMonth}
                        name="month"
                        placeholder="--"
                        type="number"
                        value={tempMonthInput}
                        className={`${(tempMonthInput < 10 || !tempMonthInput) ? 'w-2.5' : 'w-5'}`}
                        onChange={onMonthChange}
                        onBlur={onMonthBlur}
                    />
                    <span className="whitespace-pre px-0.5">/</span>
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
                        className={`${tempDayInput < 10 ? 'w-2.5' : 'w-5'}`}
                        onChange={onDayChange}
                        onBlur={onDayBlur}
                    />
                    <span className="whitespace-pre px-0.5">/</span>
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

    const weeksPickerContent = () => (
        <span className="contents">
            <div
                style={{
                    width: 380,
                    height: 300,
                    position: 'absolute',
                    top: '100%',
                    bottom: 'unset',
                    left: -100,
                    right: 'unset',
                    zIndex: 20,
                }}
                className="bg-white border-2 overflow-y-scroll mx-2"
            >
                <div className="flex flex-row justify-around pt-2">
                    <ChevronLeftBtn onClick={decreaseYear} size={3} />
                    <span className="">{year}</span>
                    <ChevronRight onClick={increaseYear} size={3} />
                </div>
                <div>
                    {weekNumbers.map((weekNumber) => (
                        <WeekBtn
                            week={weekNumber}
                            active={weekNumber === selectedWeek && year === yearInput}
                            disabled={getDateOfWeek(weekNumber, year) > maxDate || getDateOfWeek(weekNumber, year) < minDate}
                            currentWeek={isThisWeek(weekNumber)}
                            onClick={() => onWeekClick(weekNumber)}
                            key={`week_${weekNumber}`}
                        />
                    ))}
                </div>
            </div>
        </span>
    );

    return (
        <OutsideEvent onClick={() => setShowPicker(false)}>
            <div className="box-border inline-flex relative mx-2">
                {dateInput()}
                {showPicker && weeksPickerContent()}
            </div>
        </OutsideEvent>
    );
};

export default WeekPicker;
