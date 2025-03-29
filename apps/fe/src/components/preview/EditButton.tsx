export default function EditButton(isEditing: boolean, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>) {
  return (
    <button
      className={`fixed bottom-15 right-15 text-black font-bold py-2 px-4 w-25 h-25 rounded-full shadow-lg focus:outline-none ${isEditing ? 'bg-green-300 hover:bg-green-400' : 'bg-white hover:bg-gray-100'}`}
      onClick={() => setIsEditing((prev) => !prev)}
    >
      {isEditing ? '편집 완료' : '편집 모드'}
    </button>
  );
}
