import { characterMeta } from "../../meta/CharacterMeta.jsx";
import { useEffect } from "react";

export const CharacterInfo = ({ character }) => {
  return (
    <>
      {character !== null && (
        <div className="w-full border border-gray-100 rounded-lg shadow-sm text-sm -mt-1 overflow-hidden">
          {characterMeta.map((section, i) => {
            // Kiểm tra nếu tất cả các field trong section này đều không có giá trị
            const hasValidData = section.fields.some(
              ({ key }) => character[key]
            );

            // Nếu không có giá trị hợp lệ thì bỏ qua section này
            if (!hasValidData) return null;
            return (
              <div key={i} className="mb-2 last:mb-0">
                <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white font-semibold px-4 py-2.5">
                  {section.section}
                </div>
                <div className="divide-y divide-gray-100">
                  {section.fields.map(({ key, label }, index) => {
                    const value = character[key];
                    if (!value) return null; // Bỏ qua nếu không có dữ liệu
                    return (
                      <div
                        key={key}
                        className="grid grid-cols-6 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
                      >
                        <div className="col-span-2 font-medium text-gray-700">
                          {label}
                        </div>
                        <div className="col-span-4 ml-3 text-gray-600">
                          {value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
