import React, { useState } from "react";

const days = ["일", "월", "화", "수", "목", "금", "토"];

export default function WeekdayMultiSelector() {
  const [selected, setSelected] = useState([]);

  const toggleDay = (index: number) => {
    if (selected.includes(index)) {
      // 이미 선택된 요일이면 선택 해제
      setSelected(selected.filter(i => i !== index));
    } else {
      // 그렇지 않으면 추가 선택
      setSelected([...selected, index]);
    }
  };

  return (
    <div className="flex bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden w-fit">
      {days.map((d, i) => (
        <button
          key={d}
          onClick={() => toggleDay(i)}
          className={`
            px-4 py-3 border border-gray-200 transition-all duration-200 focus:outline-none
            ${selected.includes(i)
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-800"}
          `}
          type="button"
        >
          {d}
        </button>
      ))}
    </div>
  );
}