import React from 'react';

export default function Modal({ isOpen, onClose, item }) {
  // If the modal is not open or no item is provided, return null (do not render the modal)
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      {/* Modal content */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        {/* Item name */}
        <h2 className="text-xl font-bold mb-4">{item.name}</h2>

        {/* Item description */}
        <p>{item.description}</p>

        {/* Item price */}
        <p className="text-gray-800 font-bold mt-4">{item.price}원</p>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
