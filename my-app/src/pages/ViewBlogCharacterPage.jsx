import { useEffect, useState, useContext } from "react";
import {
  getBlogCharacterAPI,
  getBlogComicAPI,
} from "../services/blogService.js";
import { Button, Layout, message } from "antd";
import { Character } from "../components/blog/Character.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  customHeadingStyles,
  customImageAlignStyles,
} from "../editor/editorCustomStyleConstant.jsx";
import { Content } from "antd/es/layout/layout.js";
import Sider from "antd/es/layout/Sider.js";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { RelatedBlog } from "../components/character-related-blogs/RelatedBlog.jsx";
import { BloggerInfo } from "../components/blog/BloggerInfo.jsx";
import { formatDatetimeWithTimeFirst } from "../services/helperService.js";
import PostActions from "../components/PostActions.jsx";
import {
  saveFavouriteBlogAPI,
  removeFavouriteBlogAPI,
  getFavouriteByUserAndBlogAPI,
  getFavouriteCountBlogAPI,
} from "../services/favoriteService.js";
import { AuthContext } from "../context/auth.context.jsx";
import { Comment } from "../components/Comment/Comment.jsx";
import { getCommentCountOfBlogAPI } from "../services/commentService.js";
import { saveReactionToABlogAPI } from "../services/reactionService.js";
import {
  findFollowAPI,
  followBloggerAPI,
  unfollowBloggerAPI,
} from "../services/followService.js";
import { getUserAvatar } from "../constants/utility.js";
import mythAvatar from "/src/assets/images/anonymous.png";
import { validate } from "../utils/validate.js";

export const ViewBlogCharacterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [collapsed, setCollapsed] = useState(false);
  const [blog, setBlog] = useState(null);
  const [blogComic, setBlogComic] = useState(null);
  const [favouriteId, setFavouriteId] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [saveCount, setSaveCount] = useState(null);
  const [hasFollow, setHasFollow] = useState(false);

  // Load blog và comic
  useEffect(() => {
    if (!id) return;
    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    try {
      const res = await getBlogCharacterAPI(id);
      setBlog(res);

      if (res.comicId !== null) {
        try {
          const comic = await getBlogComicAPI(res.comicId);
          setBlogComic(comic);
        } catch {
          message.error("Không thể tải truyện liên quan.");
        }
      }
    } catch {
      message.error("Không thể tải blog.");
    }
  };

  // Khi blog được tải xong => load dữ liệu phụ thuộc blog
  useEffect(() => {
    if (!blog) return;

    loadCommentCount();
    loadFavouriteCount();

    if (user) {
      checkFavourite();
      checkFollow();
    }
  }, [blog, user]);

  const loadCommentCount = async () => {
    try {
      const res = await getCommentCountOfBlogAPI(id);
      setCommentCount(res);
    } catch (err) {
      message.error("Lỗi khi tải bình luận.");
    }
  };

  const loadFavouriteCount = async () => {
    try {
      const res = await getFavouriteCountBlogAPI(id);
      setSaveCount(res);
    } catch (err) {
      message.error("Lỗi khi tải lượt lưu.");
    }
  };

  const checkFavourite = async () => {
    try {
      const res = await getFavouriteByUserAndBlogAPI(user.id, blog.id);
      setFavouriteId(res?.id || null);
    } catch {
      setFavouriteId(null);
    }
  };

  const checkFollow = async () => {
    try {
      await findFollowAPI({ userId: user.id, bloggerId: blog.author.userId });
      setHasFollow(true);
    } catch {
      setHasFollow(false);
    }
  };

  const handleComment = () => {
    const commentSection = document.getElementById("comment");
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const reactionToBlog = async () => {
    if (!user) {
      message.error("Bạn chưa đăng nhập");
      return;
    }
    try {
      await saveReactionToABlogAPI({
        userId: user.id,
        blogId: blog.id,
        type: "Blog",
        reaction: "LOVE",
      });
    } catch (err) {
      message.error("Lỗi khi thả tim bài viết.");
    }
  };

  const toggleFollowBlogger = async () => {
    if (!user) {
      message.error("Bạn chưa đăng nhập");
      return;
    }

    try {
      if (hasFollow) {
        await unfollowBloggerAPI({
          userId: user.id,
          bloggerId: blog.author.userId,
        });
        message.success("Hủy theo dõi blogger thành công");
        setHasFollow(false);
      } else {
        await followBloggerAPI({
          userId: user.id,
          bloggerId: blog.author.userId,
        });
        message.success("Theo dõi blogger thành công");
        setHasFollow(true);
      }
    } catch {
      message.error("Lỗi khi cập nhật theo dõi.");
    }
  };

  const handleSave = async (willBeSaved) => {
    if (!user) {
      message.error("Bạn cần đăng nhập để lưu bài viết");
      return;
    }

    try {
      if (willBeSaved) {
        const res = await saveFavouriteBlogAPI(user.id, blog.id);
        setFavouriteId(res.id);
        message.success("Đã lưu bài viết");
      } else if (favouriteId) {
        await removeFavouriteBlogAPI(favouriteId);
        setFavouriteId(null);
        message.success("Đã bỏ lưu bài viết");
      }
    } catch {
      message.error("Có lỗi khi lưu/bỏ yêu thích!");
    }
  };

  return (
    <>
      <style>{customImageAlignStyles}</style>
      <style>{customHeadingStyles}</style>
      {!blog ? (
        <div className="text-center p-10 text-gray-500">Đang tải blog...</div>
      ) : (
        <Layout className="border min-h-screen !mb-20">
          {/* Sidebar trái */}
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width={300}
            collapsedWidth={80}
            trigger={null}
            className="!bg-white border-r border-gray-100 shadow-sm transition-all duration-300"
          >
            {!collapsed && (
              <div className="flex justify-end p-2">
                <Button
                  icon={<LeftOutlined />}
                  className="!bg-white hover:!bg-gray-50 !text-gray-600 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow transition-all duration-300"
                  onClick={() => setCollapsed(true)}
                />
              </div>
            )}

            <div className="px-4 py-6">
              {collapsed ? (
                <RelatedBlog
                  hasBlog={!!blogComic}
                  blogComic={blogComic}
                  blogCharacterId={blog.id}
                  blogType={blog.type}
                  loadType="Icon"
                />
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Những bài viết liên quan
                    </h2>
                  </div>
                  <RelatedBlog
                    hasBlog={!!blogComic}
                    blogComic={blogComic}
                    blogCharacterId={blog.id}
                    blogType={blog.type}
                    loadType="Full"
                  />
                </>
              )}
            </div>
          </Sider>
          {/* Button mở sidebar */}
          {collapsed && (
            <div className="flex justify-end">
              <Button
                icon={<RightOutlined />}
                className="!bg-white hover:!bg-gray-50 !text-gray-600 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow transition-all duration-300 !rounded-l-none"
                onClick={() => setCollapsed(false)}
              />
            </div>
          )}
          {/* Content */}
          <Layout>
            <Content className="flex  px-10 py-6 justify-center">
              {/* Actions */}
              <PostActions
                user={user}
                likes={blog.reaction || 0}
                comments={commentCount || 0}
                saves={saveCount || 0}
                isSaved={!!favouriteId}
                onLike={reactionToBlog}
                onComment={handleComment}
                onSave={handleSave}
                onShare={() => {}}
              />

              <div className="mx-8">
                <div className="my-8">
                  <div className="font-bold py-2 my-2 text-4xl text-[#333333]">
                    {blog.title}
                  </div>

                  <BloggerInfo
                    hasFollow={hasFollow}
                    name={validate(blog.author) ? blog.author.displayName : 'Tài khoản không còn nữa'}
                    avatarUrl={getUserAvatar(blog.author.avatar)}
                    name={
                      validate(blog.author)
                        ? blog.author.displayName
                        : "Tài khoản không còn nữa"
                    }
                    avatarUrl={
                      validate(blog.author)
                        ? getUserAvatar(blog.author.avatar)
                        : mythAvatar
                    }
                    date={formatDatetimeWithTimeFirst(blog.createdAt)}
                    onFollow={toggleFollowBlogger}
                    setHasFollow={setHasFollow}
                  />

                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>
              </div>

              {/* Character */}
              <div className="mt-22">
                <Character
                  character={blog.character}
                  thumbnail={blog.thumbnail}
                />
              </div>
            </Content>

            <Comment blogId={blog.id} />
          </Layout>
        </Layout>
      )}
    </>
  );
};
