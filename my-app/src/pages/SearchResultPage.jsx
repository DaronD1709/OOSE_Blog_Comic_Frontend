import {
  Card,
  Col,
  Row,
  Typography,
  Avatar,
  Divider,
  Checkbox,
  message,
  Input,
  Button,
} from "antd";
import { HeartFilled, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getAllCategoryAPI } from "../services/categoryService.js";
import { getAllTagAPI } from "../services/tagService.js";
import Search from "antd/es/input/Search.js";
import {
  searchBlogByKeywordAPI,
  searchBlogWithFilter,
} from "../services/blogService.js";
import { URL_BACKEND_IMAGES } from "../constants/images.js";
import { getUsersByIdsAPI } from "../services/userService.js";
import VerticalCard from "../components/Card/VerticalCard.jsx";
import HorizontalCard from "../components/Card/HorizontalCard.jsx";
import { validate } from "../utils/validate.js";

// Trên thanh Navbar (components/navigation/Navbar.jsx) sẽ có 1 thanh search và 1 button "Tìm kiếm nâng cao"
// User sẽ chọn cách search ở thanh Navbar (đối với search by title thì nhập trực tiếp vô thanh seach bar)
// Dù chọn cách nào cũng sẽ redirect qua trang "SearchResultPage"

// Thêm logic search by keyword + logic hiện gợi ý search (UI của gợi ý search components/SearchSuggestion.jsx)
// Thêm logic query database để hiển thị các category/tag + search by category/tag
// Thêm logic query những blogger có liên quan đến các blog được tìm thấy
// Thêm logic save favourite blog ở button ♥ của mỗi card blog + logic redirect qua trang cá nhân của blogger

const { Title, Text } = Typography;

const SearchResultPage = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  // -----Hardcode data-----
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [blogs, setBlogs] = useState([]);
  const [bloggers, setBloggers] = useState([]);
  const { Search } = Input;
  useEffect(() => {
    getCategories();
    getTags();
  }, []);
  const getCategories = async () => {
    try {
      const res = await getAllCategoryAPI();
      setCategories(res);
    } catch (error) {
      message.error("Không thể lấy danh sách thể loại");
    }
  };

  const getTags = async () => {
    try {
      const res = await getAllTagAPI();
      setTags(res);
    } catch (error) {
      message.error("Không thể lấy danh sách thể loại");
    }
  };
  const handleCategoryCheckboxChange = (id) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // Bỏ chọn
          : [...prev, id] // Chọn thêm
    );
  };

  const handleTagCheckboxChange = (id) => {
    setSelectedTags(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // Bỏ chọn
          : [...prev, id] // Chọn thêm
    );
  };

  const searchByKeyword = async (keyword) => {
    if (keyword.length === 0 && keyword.trim() === "") {
      return;
    }
    try {
      const res = await searchBlogByKeywordAPI(keyword, page, size);
      setBlogs(res.result);
      const bloggerIds = res.result.map((blog) => blog.author.userId);
      getBloggerByIds(bloggerIds);
    } catch (error) {
      message.error("Lỗi khi cố gắng tìm danh sách với keyword");
    }
  };

  const searchWithFilter = async () => {
    if (selectedCategories.length === 0 && selectedTags.length === 0) {
      return;
    } else {
      try {
        const res = await searchBlogWithFilter(
          selectedCategories,
          selectedTags,
          page,
          size
        );
        setBlogs(res.result);
        const bloggerIds = res.result.map((blog) => blog.author.userId);
        getBloggerByIds(bloggerIds);
      } catch (e) {
        message.error("Lỗi khi cố gắng tìm danh sách với filter");
      }
    }
  };

  const getBloggerByIds = async (authorIds) => {
    try {
      const res = await getUsersByIdsAPI(authorIds);
      setBloggers(res);
    } catch (error) {
      message.error("Lỗi khi cố gắng tìm nhưng blogger liên quan");
    }
  };
  // -----Hardcode data-----

  return (
    <div className="min-h-screen bg-white px-6 py-8 sm:ml-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Title level={3} style={{ color: "#1a1a1a", marginBottom: "2rem" }}>
            Tìm kiếm theo tên
          </Title>
          <div className="w-full max-w-2xl mx-auto">
            <Search
              onSearch={searchByKeyword}
              placeholder="Nhập từ khóa tìm kiếm..."
              className="w-full"
              size="large"
              prefix={<SearchOutlined className="text-gray-400" />}
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                position: "relative",
                zIndex: 1,
              }}
            />
          </div>

          <div className="w-32 h-[3px] bg-gradient-to-r from-blue-400 to-indigo-500 my-8 mx-auto rounded-full" />

          <Title level={3} style={{ color: "#1a1a1a", marginBottom: "2rem" }}>
            Bộ lọc
          </Title>
          <div className="text-left text-2xl font-bold text-gray-800 mb-4">
            Thể loại
          </div>
          <div className="flex flex-wrap justify-start gap-3 mt-4">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  selectedCategories.includes(cat.id)
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500 text-white shadow-lg transform hover:scale-105"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-200 hover:shadow-md"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => handleCategoryCheckboxChange(cat.id)}
                />
                <span className="text-sm font-semibold tracking-wide">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>

          <Divider className="bg-gradient-to-r from-blue-400 to-indigo-500 h-0.5 my-12 opacity-50" />

          <div className="text-left text-2xl font-bold text-gray-800 mb-4">
            Nhãn dán
          </div>
          <div className="flex flex-wrap justify-start gap-3 mt-4">
            {tags.map((tag) => (
              <label
                key={tag.id}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  selectedTags.includes(tag.id)
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 border-indigo-500 text-white shadow-lg transform hover:scale-105"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-indigo-200 hover:shadow-md"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleTagCheckboxChange(tag.id)}
                />
                <span className="text-sm font-semibold tracking-wide">
                  # {tag.name}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-8">
            <Button
              type="primary"
              size="large"
              className="px-10 py-3 h-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-base font-semibold tracking-wide"
              onClick={searchWithFilter}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>

        <Divider className="bg-gradient-to-r from-blue-400 to-indigo-500 h-0.5 my-12 opacity-50" />

        <Title level={3} className="mb-6 text-gray-800">
          Bài viết liên quan
        </Title>
        <div className="flex flex-wrap gap-6 h-[930px] justify-start overflow-y-scroll custom-scrollbar mr-4 pl-13">
          {blogs.length > 0 ? (
            blogs.map((comic) => <VerticalCard key={comic.id} {...comic} />)
          ) : (
            <p className="text-gray-500 text-lg">
              Không có truyện nào cho thể loại này.
            </p>
          )}
        </div>

        <Divider className="bg-gradient-to-r from-blue-400 to-indigo-500 h-0.5 my-12 opacity-50" />

        <Title level={3} className="mb-6 text-gray-800">
          Blogger liên quan
        </Title>
        {validate(bloggers) && (
          <Row gutter={[24, 24]}>
            {bloggers.map((blogger) => (
              <Col xs={24} sm={12} md={6} key={blogger.id}>
                <Card
                  hoverable
                  onClick={() => {
                    // TODO: chuyển hướng đến trang cá nhân blogger
                  }}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.3s ease",
                  }}
                  className="cursor-pointer hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <Avatar
                      size={56}
                      src={
                        blogger.loginType === "LOCAL"
                          ? `${URL_BACKEND_IMAGES}/${blogger.avatar}`
                          : `${blogger.avatar}`
                      }
                      className="border-2 border-blue-400"
                    />
                    <Text className="font-bold text-gray-800 text-lg">
                      {blogger.displayName}
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
