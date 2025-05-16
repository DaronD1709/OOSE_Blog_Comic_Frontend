import { useContext, useEffect, useState } from "react";
import RichTextEditor from "../editor/RichTextEditor.jsx";
import { customImageAlignStyles } from "../editor/editorCustomStyleConstant.jsx";
import { EditCharacterInfo } from "../components/blog/EditCharacterInfo.jsx";
import { Divider, Input, message } from "antd";
import { AuthContext } from "../context/auth.context.jsx";
import {
  getBlogCharacterAPI,
  getBlogComicAPI,
  updateBlogCharacterAPI,
} from "../services/blogService.js";

import { SearchBlogComic } from "../components/blog/SearchBlogComic.jsx";
import { useParams } from "react-router-dom";
import { URL_BACKEND_IMAGES } from "../constants/images.js";
import TextArea from "antd/es/input/TextArea.js";

export const EditBlogCharacterPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  // HTML content của bài viết
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState("");
  const [isImageSaved, setIsImageSaved] = useState(false);
  const [blogComic, setBlogComic] = useState(null);
  const [blogCharacter, setBlogCharacter] = useState(null);
  const [character, setCharacter] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCharacterThumbnail, setBlogCharacterThumbnail] = useState(null);
  const [introduction, setIntroduction] = useState("");
  const { uploadCharacterAvatar } = useContext(AuthContext);
  const updateBlog = async () => {
    const blogCharacterReq = {
      title: blogTitle,
      authorId: user.id,
      content: result,
      character: character,
      comicId: blogComic === null ? null : blogComic.id,
      introduction: introduction,
    };
    try {
      const response = await updateBlogCharacterAPI(
        blogCharacterReq,
        blogCharacterThumbnail,
        id
      );
      message.success("Sửa bài viết thành công");
    } catch (error) {
      message.error(error.data);
    }
  };

  useEffect(() => {
    if (!id) return;

    const getBlogCharacter = async () => {
      try {
        const res = await getBlogCharacterAPI(id);
        setBlogCharacter(res);
        setCharacter(res.character);
        setBlogTitle(res.title);
        setResult(res.content);
        setBlogCharacterThumbnail(res.thumbnail);
        setIntroduction(res.introduction);
      } catch (error) {
        message.error("Lỗi khi lấy dữ liệu bài viết về nhân vật");
      }
    };

    getBlogCharacter();
  }, [id]);

  useEffect(() => {
    if (!blogCharacter?.comicId) return;

    const getBlogComic = async () => {
      try {
        const res = await getBlogComicAPI(blogCharacter.comicId);
        setBlogComic(res);
      } catch (error) {
        message.error("Lỗi khi lấy dữ liệu truyện của nhân vật");
      }
    };

    getBlogComic();
  }, [blogCharacter]);

  return (
    <>
      <style>{customImageAlignStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main content section */}
          <div className="col-span-9">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              {/* SearchBlogComic Component */}
              <div className="mb-6 mt-3 flex justify-center">
                <SearchBlogComic
                  blogComic={blogComic}
                  setBlogComic={setBlogComic}
                />
              </div>

              {/* Title and Comic Info Section */}
              <div className="flex items-center mb-6">
                <Input
                  style={{ width: "12rem" }}
                  value={blogTitle}
                  placeholder="Nhập tiêu đề bài viết"
                  className="!flex-shrink-0 rounded-lg shadow-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base"
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
                <div className="ml-6 font-medium text-gray-700">
                  Thuộc truyện:{" "}
                  <span className="font-semibold text-blue-600">
                    {blogComic === null ? "Chưa chọn truyện" : blogComic.title}
                  </span>
                </div>
              </div>

              {/* Introduction Section */}
              <div className="mb-4">
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  Giới thiệu truyện
                </div>
                <TextArea
                  showCount
                  maxLength={300}
                  onChange={(e) => setIntroduction(e.target.value)}
                  placeholder="Viết lời giới thiệu về bài viết"
                  style={{
                    height: 100,
                    resize: "none",
                    borderRadius: "0.5rem",
                    padding: "0.75rem",
                  }}
                  value={introduction}
                  className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* RichTextEditor */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <RichTextEditor
                result={result}
                setResult={setResult}
                setPreview={setPreview}
                isImageSaved={isImageSaved}
                setIsImageSaved={setIsImageSaved}
                saveBlog={updateBlog}
              />
            </div>

            {/* Preview section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-xl font-semibold text-gray-800 mb-4">
                Bản xem trước
              </div>
              <Divider className="!mt-0 !mb-4" />

              <div className="border rounded-lg p-6 bg-gray-50">
                <div
                  className="prose prose-lg max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{ __html: preview }}
                ></div>
              </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="col-span-3">
            <EditCharacterInfo
              character={character}
              setCharacter={setCharacter}
              setBlogCharacterThumbnail={setBlogCharacterThumbnail}
              blogCharacterThumbnail={
                blogCharacter !== null ? blogCharacterThumbnail : null
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
