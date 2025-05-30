import {  Input, message } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { getAllCategoryAPI } from "../../services/categoryService.js";

export const SearchCategory = ({ selectedCategory, setSelectedCategory }) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const res = await getAllCategoryAPI();
      setCategories(res);
    } catch (error) {
      message.error("Gặp lỗi khi lấy danh sách truyện");
    }
  };

  const filteredcategories =
    categories === null
      ? null
      : categories.filter((category) =>
          category.name.toLowerCase().includes(search.toLowerCase())
        );

  const handleClickCategory = (category) => {
    const isExisted = selectedCategory.some((c) => c.id === category.id);
    if (isExisted) {
      const newCategories = selectedCategory.filter(
        (c) => c.id !== category.id
      );
      setSelectedCategory(newCategories);
    } else {
      const newCategories = [...selectedCategory, category];
      setSelectedCategory(newCategories);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Chọn thể loại truyện
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mt-2"></div>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <Input
          placeholder="Tìm thể loại truyện theo tiêu đề"
          prefix={<SearchOutlined className="text-gray-400" />}
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border-gray-200 shadow-sm hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
          style={{
            height: 52,
            fontSize: 16,
            padding: "0 20px",
            width: "100%",
            maxWidth: "100%",
          }}
        />
      </div>

      {/* Category List */}
      <div className="border border-gray-100 rounded-xl shadow-sm bg-gradient-to-b from-gray-50 to-white">
        <div className="h-[280px] overflow-y-auto p-3 custom-scrollbar">
          {filteredcategories === null || filteredcategories.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-400 italic text-center py-6 flex flex-col items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Không tìm thấy kết quả phù hợp.</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredcategories.map((category) => (
                <div
                  key={category.id}
                  className={`group flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300
                    ${
                      selectedCategory.map((se) => se.id).includes(category.id)
                        ? "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-sm"
                        : "bg-white hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-blue-100/50 hover:border hover:border-blue-100"
                    }`}
                  onClick={() => handleClickCategory(category)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleClickCategory(category)
                  }
                >
                  {/* Category Name */}
                  <div
                    className={`font-medium text-gray-700 line-clamp-2 leading-5
                    ${
                      selectedCategory.map((se) => se.id).includes(category.id)
                        ? "text-blue-700"
                        : "group-hover:text-blue-600"
                    }`}
                  >
                    {category.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};
