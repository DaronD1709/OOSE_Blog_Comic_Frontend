// ✅ File đã được style lại cho đẹp mắt, gọn gàng, dễ bảo trì
// 📁 File: ViewBlogComicPage.jsx

import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getBlogByIdAPI,
  getBlogCharacterAPI,
  getBlogComicAPI,
  getBlogInsightByIdAPI,
} from "../services/blogService";
import {
  saveFavouriteBlogAPI,
  removeFavouriteBlogAPI,
  getFavouriteByUserAndBlogAPI,
  getFavouriteCountBlogAPI,
} from "../services/favoriteService";
import { getCommentCountOfBlogAPI } from "../services/commentService";
import { saveReactionToABlogAPI } from "../services/reactionService";
import {
  findFollowAPI,
  followBloggerAPI,
  unfollowBloggerAPI,
} from "../services/followService";

import { Button, Image, Layout, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

import { AuthContext } from "../context/auth.context";
import { Comment } from "../components/Comment/Comment";
import { BloggerInfo } from "../components/blog/BloggerInfo";
import { SelectedElement } from "../components/blog/SelectedElement";
import { RelatedBlog } from "../components/character-related-blogs/RelatedBlog.jsx";
import PostActions from "../components/PostActions";

import { formatDatetimeWithTimeFirst } from "../services/helperService";
import { ROUTES } from "../constants/api";
import { URL_BACKEND_IMAGES } from "../constants/images";
import { customImageAlignStyles } from "../editor/editorCustomStyleConstant";
import { getUserAvatar } from "../constants/utility.js";
import { validate } from "../utils/validate.js";
import mythAvatar from "../assets/images/anonymous.png";

export const ViewBlogComicPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [blogComic, setBlogComic] = useState(null);
  const [blogCharacter, setBlogCharacter] = useState(null);

  const [commentCount, setCommentCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);
  const [favouriteId, setFavouriteId] = useState(null);
  const [hasFollow, setHasFollow] = useState(false);

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBlog(id);
      fetchCommentCount(id);
      fetchSaveCount(id);
    }
  }, [id]);

  useEffect(() => {
    if (user && id) {
      getFavouriteByUserAndBlogAPI(user.id, id)
        .then((res) => res?.id && setFavouriteId(res.id))
        .catch(() => setFavouriteId(null));
    }
  }, [user, id]);

  useEffect(() => {
    if (user && blog?.author?.userId) {
      checkFollow();
    }
  }, [user, blog]);

  const checkFollow = async () => {
    try {
      await findFollowAPI({ userId: user.id, bloggerId: blog.author.userId });
      setHasFollow(true);
    } catch {
      setHasFollow(false);
    }
  };

  const fetchCommentCount = async (id) => {
    try {
      const res = await getCommentCountOfBlogAPI(id);
      setCommentCount(res);
    } catch {
      message.error("Không thể lấy số lượng bình luận");
    }
  };

  const fetchSaveCount = async (id) => {
    try {
      const res = await getFavouriteCountBlogAPI(id);
      setSaveCount(res);
    } catch {
      message.error("Không thể lấy số lượt lưu bài");
    }
  };

  const fetchBlog = async (id) => {
    try {
      const res = await getBlogByIdAPI(id);
      if (res.type === "CHARACTER")
        return navigate(ROUTES.getViewCharacter(id));

      let fullBlog = res;
      if (res.type === "COMIC") fullBlog = await getBlogComicAPI(id);
      if (res.type === "INSIGHT") {
        fullBlog = await getBlogInsightByIdAPI(id);
        if (fullBlog.comicId)
          setBlogComic(await getBlogComicAPI(fullBlog.comicId));
        if (fullBlog.blogCharacterId)
          setBlogCharacter(await getBlogCharacterAPI(fullBlog.blogCharacterId));
      }

      setBlog(fullBlog);
    } catch {
      message.error("Không thể tải blog");
    }
  };

  const handleReaction = async () => {
    if (!user) return message.error("Bạn chưa đăng nhập");
    try {
      await saveReactionToABlogAPI({
        userId: user.id,
        blogId: blog.id,
        type: "Blog",
        reaction: "LOVE",
      });
    } catch {
      message.error("Không thể thích bài viết");
    }
  };

  const handleSave = async (willBeSaved) => {
    if (!user) return message.error("Bạn cần đăng nhập để lưu bài viết");
    try {
      if (willBeSaved) {
        const res = await saveFavouriteBlogAPI(user.id, blog.id);
        setFavouriteId(res.id);
        message.success("Đã lưu bài viết");
      } else {
        await removeFavouriteBlogAPI(favouriteId);
        setFavouriteId(null);
        message.success("Đã bỏ lưu bài viết");
      }
    } catch {
      message.error("Lỗi khi lưu/bỏ lưu bài viết");
    }
  };

  const handleFollow = async () => {
    if (!user) return message.error("Bạn chưa đăng nhập");
    try {
      if (hasFollow) {
        await unfollowBloggerAPI({
          userId: user.id,
          bloggerId: blog.author.userId,
        });
        message.success("Đã hủy theo dõi");
        setHasFollow(false);
      } else {
        await followBloggerAPI({
          userId: user.id,
          bloggerId: blog.author.userId,
        });
        message.success("Đã theo dõi");
        setHasFollow(true);
      }
    } catch {
      message.error("Lỗi khi theo dõi blogger");
    }
  };

  const scrollToComment = () => {
    document.getElementById("comment")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!blog) {
    return (
      <div className="text-center p-10 text-gray-500">Đang tải blog...</div>
    );
  }

  return (
    <>
      <style>{customImageAlignStyles}</style>
      <Layout className="border border-gray-100 rounded-2xl min-h-screen">
        {/* Sidebar trái */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={300}
          collapsedWidth={80}
          trigger={null}
          className="!bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-lg transition-all duration-300"
        >
          {!collapsed && (
            <div className="flex justify-end p-3">
              <Button
                icon={<LeftOutlined />}
                className="!bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white border-none shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => setCollapsed(true)}
              />
            </div>
          )}

          <div className="text-center px-4 py-6">
            {collapsed ? (
              <RelatedBlog
                blogComic={blog}
                blogInsight={blog}
                blogType={blog.type}
                loadType="Icon"
              />
            ) : (
              <>
                <div className="relative mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Những bài viết liên quan
                  </h2>
                  <div className="absolute bottom[-1] left-22 w-32 h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"></div>
                </div>
                <RelatedBlog
                  blogType={blog.type}
                  blogComic={blog}
                  blogInsight={blog}
                  loadType="Full"
                />
              </>
            )}
          </div>
        </Sider>

        {/* Nút mở sidebar khi thu gọn */}
        {collapsed && (
          <div className="flex justify-end">
            <Button
              icon={<RightOutlined />}
              className="!bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white border-none shadow-sm hover:shadow-md transition-all duration-300 !rounded-l-none"
              onClick={() => setCollapsed(false)}
            />
          </div>
        )}

        {/* Nội dung chính */}
        <Layout>
          <Content className="flex gap-4 px-6 sm:px-10 py-8 justify-center ">
            <PostActions
              user={user}
              likes={blog.reaction || 0}
              comments={commentCount}
              saves={saveCount}
              isSaved={!!favouriteId}
              onLike={handleReaction}
              onComment={scrollToComment}
              onSave={handleSave}
              onShare={() => {}}
            />

            <div className="max-w-auto grow  rounded-2xl shadow-sm p-8">
              <h1 className="font-bold text-4xl text-gray-800 py-4 leading-tight border-b border-gray-100">
                {blog.title}
              </h1>

              <div className="py-6">
                <BloggerInfo
                  hasFollow={hasFollow}
                  name={
                    validate(blog.author)
                      ? blog.author.displayName
                      : "Tài khoản không tồn tại"
                  }
                  avatarUrl={getUserAvatar(blog.author.avatar)}
                  date={formatDatetimeWithTimeFirst(blog.createdAt)}
                  onFollow={handleFollow}
                  setHasFollow={setHasFollow}
                />
              </div>

              <div className="flex flex-wrap gap-3 my-6">
                <SelectedElement
                  selected={blog.categories}
                  type="Thể loại"
                  color="blue"
                />
                <SelectedElement
                  selected={blog.tags}
                  type="Tag"
                  color="amber"
                />
              </div>

              {blog.type === "INSIGHT" && (
                <div className="my-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-medium">
                        Viết về nhân vật:
                      </span>
                      <span
                        className={
                          blogCharacter
                            ? "text-blue-600 hover:text-blue-700 transition-colors"
                            : "text-gray-500 italic"
                        }
                      >
                        {blogCharacter ? (
                          <Link
                            to={ROUTES.getViewCharacter(blogCharacter.id)}
                            className="hover:underline"
                          >
                            {blogCharacter.title}
                          </Link>
                        ) : (
                          "Không rõ"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-medium">
                        Trong truyện:
                      </span>
                      <span
                        className={
                          blogComic
                            ? "text-blue-600 hover:text-blue-700 transition-colors"
                            : "text-gray-500 italic"
                        }
                      >
                        {blogComic ? (
                          <Link
                            to={ROUTES.getViewComic(blogComic.id)}
                            className="hover:underline"
                          >
                            {blogComic.title}
                          </Link>
                        ) : (
                          "Không rõ"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center my-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    style={{ maxHeight: 650, maxWidth: 930 }}
                    src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
                    className="rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300"
                  />
                </div>
              </div>

              <div
                className="my-8 prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-sm"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </Content>

          <div className="bg-white border-t border-gray-100">
            <Comment blogId={blog.id} />
          </div>
        </Layout>
      </Layout>
    </>
  );
};
