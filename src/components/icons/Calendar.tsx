import { IconComponent } from './icon.component';

const Calendar: IconComponent = ({color = 'currentColor'}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 19 19"
        stroke={color}
        strokeWidth="2"
    >
        <rect fill="none" height="15" width="15" x="2" y="2"></rect>
        <line x1="6" x2="6" y1="0" y2="4"></line>
        <line x1="13" x2="13" y1="0" y2="4"></line>
    </svg>
);

export default Calendar;
