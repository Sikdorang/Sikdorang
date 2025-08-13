'use client';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: (next: boolean) => void;
  label?: string;
  className?: string;
}

export default function ToggleSwitch({
  isOn,
  onToggle,
  label,
  className = '',
}: ToggleSwitchProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {label && <span className="text-mb-2">{label}</span>}
      <button
        type="button"
        onClick={() => onToggle(!isOn)}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isOn
            ? 'bg-yellow-400 focus:ring-yellow-500'
            : 'bg-gray-300 focus:ring-gray-500'
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
            isOn ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
      <span
        className={`text-sm font-medium ${isOn ? 'text-yellow-600' : 'text-gray-500'}`}
      ></span>
    </div>
  );
}
