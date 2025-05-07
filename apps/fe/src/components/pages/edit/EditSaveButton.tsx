interface EditSaveButtonProps {
  onClick: () => void;
}

export default function EditSaveButton({ onClick }: EditSaveButtonProps) {
  return (
    <button
      className="text-sm font-bold text-white fixed bottom-5 right-5 bg-blue-500 p-1 w-16 h-16 rounded-full shadow-2xl"
      onClick={onClick}
    >
      저장
    </button>
  );
}
