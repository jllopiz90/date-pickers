const ChevronUpBtn = ({ onClick, color = 'currentColor' }: { onClick: () => void, color?: string}) => (
    <button className="mx-6 p-2 focus:outline-none active:bg-gray-300" onClick={onClick}>
        <svg
            className="w-6 h-6"
            fill="none"
            stroke={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
    </button>
);

export default ChevronUpBtn;