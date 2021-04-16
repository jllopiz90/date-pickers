import { IconComponent } from "./icon.component";

const ChevronLeft: IconComponent = ({
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
        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
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
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

export default ChevronLeft;
