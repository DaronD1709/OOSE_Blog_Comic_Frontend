import { Image, Input, message } from "antd";
import { useEffect, useState } from "react";
import { getAllBlogCharactersAPI } from "../../services/blogService.js";
import { URL_BACKEND_IMAGES } from "../../constants/images.js";
import { SearchOutlined } from "@ant-design/icons";

export const SearchBlogCharacter = ({ blogCharacter, setBlogCharacter }) => {
  const [blogs, setBlogs] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllBlogCharacters();
  }, []);

  const getAllBlogCharacters = async () => {
    try {
      const res = await getAllBlogCharactersAPI();
      setBlogs(res);
    } catch (error) {
      message.error("Gặp lỗi khi lấy danh sách nhân vật");
    }
  };

  const filteredBlogs =
    blogs === null
      ? null
      : blogs.filter((blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase())
        );

  const handleChooseBlog = (blogComic) => {
    setBlogCharacter(blogComic);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Tiêu đề */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-gradient-to-b from-purple-500 to-purple-400 rounded-full"></div>
        <h2 className="text-xl font-semibold text-gray-800 pt-3">
          Bài viết này về nhân vật
        </h2>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Input
          placeholder="Tìm nhân vật theo tiêu đề"
          prefix={<SearchOutlined className="text-gray-400" />}
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border-gray-200 shadow-sm hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
          style={{
            height: 48,
            fontSize: 16,
            padding: "0 16px",
            width: "100%",
            maxWidth: 400,
            backgroundColor: "#f8fafc",
          }}
        />
      </div>

      {/* Character List */}
      <div className="border border-gray-100 rounded-xl shadow-sm p-4 text-left w-full max-w-[400px] h-[280px] overflow-y-auto bg-white mb-8 transition-all duration-300 hover:shadow-md">
        {filteredBlogs === null || filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <SearchOutlined className="text-4xl mb-3 text-gray-300" />
            <p className="text-center">Không tìm thấy kết quả phù hợp</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className={`group flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${
                    blogCharacter?.id === blog.id
                      ? "bg-purple-50 border border-purple-200"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                onClick={() => handleChooseBlog(blog)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleChooseBlog(blog)}
              >
                {/* Thumbnail */}
                <div className="w-[72px] h-[54px] flex-shrink-0 overflow-hidden rounded-lg shadow-sm">
                  <Image
                    src={`${blog.thumbnail}`}
                    alt={blog.title}
                    width={72}
                    height={54}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    preview={false}
                  />
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-800 font-medium line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors duration-200">
                    {blog.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
