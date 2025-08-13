export default function MenuTableHeader() {
  return (
    <thead className="text-mb-3 text-white rounded-lg border-b border-b-gray-400 bg-gray-800">
      <tr>
        <th className="w-[3%] whitespace-nowrap rounded-tl-xl px-5 py-5"></th>
        <th className="w-[35%] whitespace-nowrap px-5 py-5 text-left">
          메뉴명
        </th>
        <th className="w-[10%] whitespace-nowrap px-5 py-5 text-left">가격</th>
        <th className="w-[12%] whitespace-nowrap px-5 py-5 text-left">
          카테고리
        </th>
        <th className="w-[10%] whitespace-nowrap px-5 py-5 text-left">상태</th>
        <th className="w-[8%] whitespace-nowrap rounded-tr-xl px-5 py-5">
          세부사항
        </th>
      </tr>
    </thead>
  );
}
