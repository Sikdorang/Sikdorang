import Header from '../components/common/\bHeader';

export default function Orders() {
  return (
    <div className="min-w-xs mx-auto flex h-full w-full flex-col">
      <Header title="주문내역" />
      <div className="wrapper flex w-full flex-1 flex-col pt-6">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-mb-1 text-gray-700">전체 1건</p>
          <p className="text-mb-1 text-gray-700">총 25,000원</p>
        </div>
        <ul>
          <li className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-gray-800 flex items-center justify-between h-12 px-4">
              <p className="text-mb-1 text-gray-100">01</p>
              <p className="text-mc-2 text-gray-100">2025</p>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <ul>
                <li>
                  <div className="flex justify-between items-start gap-6">
                    <p className="text-mb-3 text-gray-700 flex-1">
                      정말 밋정말 밋정말 밋정말 밋정말 밋정말 밋정말 밋정말
                      밋정말 밋정말 밋정말 밋정말 밋정말 밋정말 밋정말 밋
                    </p>
                    <div className="flex flex-col justify-end gap-1">
                      <p className="text-mb-3 text-gray-700 text-right">
                        1000000원
                      </p>
                      <p className="text-mb-6 text-gray-400 text-right">1개</p>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-1 mt-1">
                    <li className="text-mb-6 text-gray-500">매운맛 </li>
                    <li className="text-mb-6 text-gray-500">매운맛 </li>
                  </ul>
                </li>
              </ul>
              <hr className="border-gray-200" />
              <p className="text-mb-1 text-gray-900 text-right">
                총 10000000원
              </p>
              <button className="text-mb-5 text-gray-700 bg-gray-100 rounded-2xl h-11">
                같은 메뉴 주문하기
              </button>
            </div>
          </li>
        </ul>
        <div className="h-48"></div>
      </div>
    </div>
  );
}
