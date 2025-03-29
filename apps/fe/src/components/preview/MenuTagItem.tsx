export default function MenuTagItem({ label }: { label: string }) {
  return (
    <li className="px-2 py-1.5 text-label-xs-m rounded-sm bg-gray-100 text-gray-600 border border-gray-200">{label}</li>
  );
}
