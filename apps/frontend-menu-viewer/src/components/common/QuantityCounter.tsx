interface QuantityCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityCounter({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityCounterProps) {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1);
  };
  const handleIncrease = () => {
    if (max === undefined || value < max) onChange(value + 1);
  };

  return (
    <div className="self-start flex gap-1 rounded-md bg-gray-200 p-0.5">
      <button
        onClick={handleDecrease}
        className={`transition-colors duration-300 ${value === min ? 'text-gray-400' : 'text-gray-600'} text-mb-1 flex aspect-square h-6 w-6 flex-col items-center justify-center`}
        disabled={value === min}
      >
        -
      </button>
      <span className="text-mb-1 flex aspect-square h-6 w-6 flex-col items-center justify-center rounded-md bg-white text-gray-800">
        {value}
      </span>
      <button
        onClick={handleIncrease}
        className={`text-mb-1 flex aspect-square h-6 w-6 flex-col items-center justify-center ${max !== undefined && value === max ? 'text-gray-400' : 'text-gray-600'}`}
        disabled={max !== undefined && value === max}
      >
        +
      </button>
    </div>
  );
}
