const ChevronLeftBtn = ({
  onClick,
  color = "currentColor",
  size = 6,
  double = false,
}: {
  onClick: () => void;
  color?: string;
  size?: number;
  double?: boolean;
}) =>
  (double && (
    <button
      className="mx-6 p-2 focus:outline-none active:bg-gray-300"
      onClick={onClick}
    >
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
    </button>
  )) || (
    <button
      className="mx-6 p-2 focus:outline-none active:bg-gray-300"
      onClick={onClick}
    >
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
    </button>
  );

export default ChevronLeftBtn;
