'use client';

interface NavigationSwitchProps {
  isOn: boolean;
  onToggle: (next: boolean) => void;
  leftLabel: string;
  rightLabel: string;
  className?: string;
}

export default function NavigationSwitch({
  isOn,
  onToggle,
  leftLabel,
  rightLabel,
  className = '',
}: NavigationSwitchProps) {
  return (
    <div className={`inline-flex rounded-full bg-gray-700 p-1 ${className}`}>
      <button
        type="button"
        onClick={() => onToggle(true)}
        className={`px-4 py-2 rounded-full transition-colors duration-200 text-mb-5 mr-2 ${
          isOn ? 'bg-white text-gray-900' : 'text-gray-400 hover:bg-gray-600'
        }`}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        onClick={() => onToggle(false)}
        className={`px-4 py-2 rounded-full transition-colors duration-200 text-mb-5 ${
          !isOn ? 'bg-white text-gray-900' : 'text-gray-400 hover:bg-gray-600'
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
}
