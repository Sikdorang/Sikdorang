export default function OptionSelectorSheet() {
  return (
    <div className="z-40 fixed inset-0 bg-black/25 min-w-xs xl:mx-auto xl:max-w-5xl w-full h-full">
      <div className=" absolute bg-white bottom-0 h-5/6 w-full wrapper rounded-t-2xl p-5">
        <div className="mb-6 flex items-center justify-between gap-12 pb-2">
          <h2 className="text-mb-3 text-gray-900">{}</h2>
          <button>엑스</button>
        </div>
        <ul></ul>
      </div>
    </div>
  );
}
