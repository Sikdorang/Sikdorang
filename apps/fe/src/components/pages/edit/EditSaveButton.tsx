import { ButtonHTMLAttributes } from 'react';

interface EditSaveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

export default function EditSaveButton({ onClick, ...rest }: EditSaveButtonProps) {
  return (
    <button
      className="disabled:bg-gray-300 disabled:text-gray-100 text-sm font-bold text-white fixed bottom-7 right-7 bg-blue-500 p-1 w-20 h-20 rounded-full shadow-2xl"
      onClick={onClick}
      {...rest}
    >
      저장
    </button>
  );
}
