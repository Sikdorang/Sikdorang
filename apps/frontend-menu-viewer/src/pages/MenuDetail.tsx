export default function MenuDetail() {
  return (
    <div className="min-w-xs mx-auto w-full">
      <div className="sticky top-0 z-10 h-12 bg-white shadow-sm">
        <div className="wrapper flex w-full items-center justify-end"></div>
      </div>
      <div
        id="page1"
        className="relative mx-auto min-h-screen max-w-xs bg-white"
      >
        <div className="flex items-center bg-white px-5 py-4">
          <button className="mr-4 p-1">
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="mx-5 flex h-96 items-center justify-center rounded-lg bg-gray-100">
            <div className="text-mb-4 text-gray-400">이미지 영역</div>
          </div>
          <div className="text-mc-2 absolute right-9 top-4 rounded-full bg-black bg-opacity-60 px-2 py-1 text-white">
            1/5
          </div>

          <div className="mt-4 flex justify-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-gray-800"></div>
            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          </div>
        </div>

        <div className="mb-6 px-5">
          <div className="text-mc-1 mb-3 inline-block rounded-full bg-red-200 px-3 py-1 text-red-500">
            인기
          </div>
          <h1 className="text-mh-1 mb-2 text-black">참소라 무침</h1>
          <p className="text-mb-6 mb-4 text-gray-600">
            정말 맛있는 참소라 무침입니다. 이거 안시키면 평생 후회할거야 @@@
          </p>
          <div className="flex items-center justify-between">
            <div className="text-mt-1 text-black">25,000원</div>
            <div className="flex items-center rounded-lg border border-gray-300">
              <button className="text-mb-4 px-4 py-2 text-gray-600 hover:bg-gray-50">
                -
              </button>
              <span className="text-mb-4 border-x border-gray-300 px-4 py-2 text-black">
                1
              </span>
              <button className="text-mb-4 px-4 py-2 text-gray-600 hover:bg-gray-50">
                +
              </button>
            </div>
          </div>
        </div>

        <div className="mb-32 px-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-mb-1 text-black">맵기옵션을 선택해주세요</h2>
            <button className="text-mc-1 text-blue-500">필수</button>
          </div>

          <div className="mb-3">
            <label className="border-main-500 bg-main-100 flex cursor-pointer items-center justify-between rounded-lg border-2 p-4">
              <div className="flex items-center">
                <div className="bg-main-500 mr-3 flex h-6 w-6 items-center justify-center rounded-full">
                  <div className="h-3 w-3 rounded-full bg-white"></div>
                </div>
                <span className="text-mb-3 text-black">기본맛</span>
              </div>
              <span className="text-mb-6 text-gray-600">+0원</span>
            </label>
          </div>

          <div className="mb-3">
            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="mr-3 h-6 w-6 rounded-full border-2 border-gray-300"></div>
                <span className="text-mb-4 text-black">보통맛</span>
              </div>
              <span className="text-mb-6 text-gray-600">+500원</span>
            </label>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-xs border-t border-gray-100 bg-white p-5">
          <button className="bg-main-500 text-mb-1 hover:bg-main-600 w-full rounded-lg py-4 font-semibold text-black shadow-sm transition-colors">
            총 25,000원 · 담기
          </button>
        </div>
      </div>
    </div>
  );
}
