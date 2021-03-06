import { IconComponent } from "./icon.component";

const ChevronDown: IconComponent = ({
  color = "currentColor",
  size = 6,
  double = false,
}) =>
  (double && (
    <svg
      className={`w-${size} h-${size}`}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
      />
    </svg>
  )) || (
    <svg
      className={`w-${size} h-${size}`}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

export default ChevronDown;
