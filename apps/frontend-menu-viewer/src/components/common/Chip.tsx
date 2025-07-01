interface Props {
  label: string;
  color?: 'red' | 'yellow' | 'green';
}

const colorClassMap = {
  red: 'bg-red-200 text-red-500',
  yellow: 'bg-yellow-200 text-yellow-500',
  green: 'bg-green-200 text-green-500',
};

export default function Chip({ label, color = 'red' }: Props) {
  return (
    <div
      className={`text-mc-1 rounded-[6px] px-2 py-1 ${colorClassMap[color]}`}
    >
      {label}
    </div>
  );
}
