import { PropsWithChildren } from 'react';

export default function LinkButton({ children }: PropsWithChildren) {
  return (
    <button className="text-label-sm-m text-gray-500 p-2 hover:text-gray-800 rounded transition-colors duration-300 whitespace-nowrap line-clamp-1">
      {children}
    </button>
  );
}
