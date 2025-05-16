import { useContext, useState } from "react";
import RichTextEditor from "../editor/RichTextEditor.jsx";
import { customImageAlignStyles } from "../editor/editorCustomStyleConstant.jsx";
import { Divider, Dropdown, Input, message } from "antd";
import { AuthContext } from "../context/auth.context.jsx";
import {
  saveBlogComicAPI,
  saveBlogInsightAPI,
} from "../services/blogService.js";
import { SearchBlogComic } from "../components/blog/SearchBlogComic.jsx";
import { SearchBlogCharacter } from "../components/blog/SearchBlogCharacter.jsx";
import { CategoryTagSelection } from "../components/blog/CategoryTagSelection.jsx";
import ThumbnailUpload from "../components/blog/ThumbnailUpload.jsx";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { runes } from "runes2";
import TextArea from "antd/es/input/TextArea.js";

const items = [
  {
    key: "1",
    label: "Bài viết về truyện",
  },
  {
    key: "2",
    label: "Bài viết bình luận về nhân vật hoặc truyện",
  },
];
export const NewBlogComicPage = () => {
  const { user } = useContext(AuthContext);
  // HTML content của bài viết
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState("");
  const [isImageSaved, setIsImageSaved] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogComic, setBlogComic] = useState(null);
  const [blogCharacter, setBlogCharacter] = useState(null);
  const [blogType, setBlogType] = useState("Comic");
  const [thumbnail, setThumbnail] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const [introduction, setIntroduction] = useState("");
  const handleMenuClick = (e) => {
    if (e.key === "1") {
      setBlogType("Comic");
    } else if (e.key === "2") {
      setBlogType("Insight");
    }
  };

  const saveBlog = async () => {
    try {
      if (blogType === "Comic") {
        const blogComicReq = {
          title: blogTitle,
          authorId: user.id,
          content: result,
          categories: selectedCategory.map((cat) => cat.id),
          tags: selectedTag.map((tag) => tag.id),
          introduction: introduction,
        };
        const response = await saveBlogComicAPI(blogComicReq, thumbnail);
      } else {
        const blogInsightReq = {
          title: blogTitle,
          authorId: user.id,
          content: result,
          categories: selectedCategory.map((cat) => cat.id),
          tags: selectedTag.map((tag) => tag.id),
          comicId: blogComic !== null ? blogComic.id : null,
          introduction: introduction,
          blogCharacterId: blogCharacter !== null ? blogCharacter.id : null,
        };
        const response = await saveBlogInsightAPI(blogInsightReq, thumbnail);
      }
      message.success("Tạo bài viết thành công");
      // Reset các input và state
      resetForm();
    } catch (error) {
      message.error(error.data);
    }
  };
  const resetForm = () => {
    setResult("");
    setPreview("");
    setIsImageSaved(false);
    setBlogTitle("");
    setBlogComic(null);
    setBlogCharacter(null);
    setBlogType("Comic");
    setThumbnail(null);
    setSelectedCategory([]);
    setSelectedTag([]);
    setImgSrc("");
    setIntroduction("");
  };

  return (
    <>
      <style>{customImageAlignStyles}</style>
      <div className="flex justify-center py-12 px-4 bg-gray-50 min-h-screen">
        {/* Main content section */}

        <div className="w-full max-w-7xl bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          {/* SearchBlogComic Component */}
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            placement="bottomLeft"
            trigger={["click"]}
            className={"!mb-10"}
          >
            <button
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition-all duration-100 text-gray-800"
            >
              {blogType === "Comic"
                ? "Bài viết về truyện"
                : "Bài viết bình luận về nhân vật hoặc truyện"}{" "}
              <DownOutlined className="text-sm" />
            </button>
          </Dropdown>

          {blogType === "Insight" ? (
            <div>
              <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 w-full mx-auto p-2 sm:p-4">
                <div className="w-full sm:w-[360px] lg:w-[400px]">
                  <SearchBlogComic
                    blogComic={blogComic}
                    setBlogComic={setBlogComic}
                  />
                </div>
                <div className="w-full sm:w-[360px] lg:w-[400px]">
                  <SearchBlogCharacter
                    blogCharacter={blogCharacter}
                    setBlogCharacter={setBlogCharacter}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className={"flex justify-around gap-1"}>
            <div>
              <CategoryTagSelection
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
              />
            </div>
            <div>
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent pt-8">
                    Chọn ảnh bìa truyện
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full mt-2"></div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <ThumbnailUpload
                    setThumbnail={setThumbnail}
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Title and Character/Comic Info Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8 mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Title Input */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-3">
                  Tiêu đề bài viết
                </h2>
                <Input
                  value={blogTitle}
                  placeholder="Nhập tiêu đề bài viết"
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="rounded-xl shadow-sm border-gray-200 hover:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
                  style={{
                    height: 48,
                    fontSize: 16,
                    padding: "0 16px",
                    width: "100%",
                  }}
                />
              </div>

              {/* Character and Comic Info */}
              {blogType === "Insight" && (
                <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Thông tin liên quan
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 min-w-[120px]">
                        Nhân vật:
                      </span>
                      <span
                        className={
                          blogCharacter
                            ? "text-blue-600 hover:text-blue-700"
                            : "text-gray-500 italic"
                        }
                      >
                        {blogCharacter === null ? (
                          "Chưa chọn nhân vật"
                        ) : (
                          <Link
                            to={"/test/#"}
                            target={"_blank"}
                            className="hover:underline"
                          >
                            {blogCharacter.title}
                          </Link>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 min-w-[120px]">
                        Truyện:
                      </span>
                      <span
                        className={
                          blogComic
                            ? "text-blue-600 hover:text-blue-700"
                            : "text-gray-500 italic"
                        }
                      >
                        {blogComic === null ? (
                          "Chưa chọn truyện"
                        ) : (
                          <Link
                            to={"/test/#"}
                            target={"_blank"}
                            className="hover:underline"
                          >
                            {blogComic.title}
                          </Link>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Introduction Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <h2 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-3">
              Giới thiệu truyện
            </h2>
            <TextArea
              showCount
              maxLength={300}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="Viết lời giới thiệu về bài viết"
              value={introduction}
              className="rounded-xl border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300"
              style={{
                height: 120,
                resize: "none",
                fontSize: 15,
                padding: "12px 16px",
              }}
            />
          </div>

          {/* RichTextEditor */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <RichTextEditor
              result={result}
              setResult={setResult}
              setPreview={setPreview}
              isImageSaved={isImageSaved}
              setIsImageSaved={setIsImageSaved}
              saveBlog={saveBlog}
            />
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 text-gray-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent  mb-4">
              Bản xem trước
            </h2>
            <div className="border border-gray-100 rounded-xl p-6 bg-gray-50">
              <div
                className="prose prose-lg max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: preview }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
