import { useEffect } from "react";

const colorMap = {
  amber: {
    text: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    hover: "hover:bg-amber-100 hover:border-amber-300 hover:shadow-amber-100",
    delete: "text-amber-500 hover:text-amber-700",
    label: "bg-amber-50 text-amber-700 border-amber-200",
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    hover: "hover:bg-blue-100 hover:border-blue-300 hover:shadow-blue-100",
    delete: "text-blue-500 hover:text-blue-700",
    label: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

export const SelectedElement = ({ selected, type, color }) => {
  const style = colorMap[color];

  useEffect(() => {}, [selected]);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-4 my-3">
        {/* Label */}
        <div
          className={`flex items-center justify-center text-sm font-semibold px-4 py-2.5 rounded-lg border ${style.label} shadow-sm w-[120px] shrink-0 transition-all duration-200`}
        >
          {type}
        </div>

        {/* Selected Items */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {selected === null ||
          selected === undefined ||
          selected.length === 0 ? (
            <div className="text-gray-400 italic text-sm flex items-center h-full">
              Chưa chọn {type}
            </div>
          ) : (
            selected.map((cat) => (
              <label
                key={cat.id}
                className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${style.border} ${style.bg} ${style.text} ${style.hover} shadow-sm hover:shadow-md`}
              >
                <span className="text-sm font-medium leading-5">
                  {cat.name}
                </span>
                <span
                  className={`${style.delete} opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </label>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
