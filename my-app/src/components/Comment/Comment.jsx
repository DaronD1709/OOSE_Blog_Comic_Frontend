import { Card, Divider, Empty, message, Spin } from "antd";
import { CommentProvider } from "../../context/CommentContext.jsx";
import CommentBox from "./CommentBox.jsx";
import CommentList from "./CommentList.jsx";
import { useContext, useEffect, useState } from "react";
import {
  addCommentToBlogAPI,
  getHighestCommentApi,
} from "../../services/commentService.js";
import { AuthContext } from "../../context/auth.context.jsx";

export const Comment = ({ blogId }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(null);
  const userRole = user !== null ? user.role.toLowerCase() : "anonymous";

  useEffect(() => {
    getHighestComment();
  }, [blogId]);

  const getHighestComment = async () => {
    try {
      const res = await getHighestCommentApi(blogId);
      setComments(res);
    } catch (err) {
      message.error(err.data);
    }
  };

  return (
    <div className="bg-white py-8">
      <div className="max-w-[1000px] mx-auto px-4">
        <div className="relative mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Bình luận</h2>
        </div>

        <CommentProvider blogId={blogId}>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <div id="comment" className="mb-8">
                <div className="max-w-[825px] mx-auto">
                  <CommentBox
                    setComments={setComments}
                    comments={comments}
                    blogId={blogId}
                    userId={user !== null ? user.id : null}
                    onSubmit={addCommentToBlogAPI}
                    currentUserRole={userRole}
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 my-8"></div>

              {comments !== null ? (
                <div className="max-w-[825px] mx-auto">
                  <CommentList
                    setComments={setComments}
                    comments={comments}
                    blogId={blogId}
                    currentUserRole={userRole}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Empty
                    description={
                      <span className="text-gray-500 text-lg">
                        Chưa có bình luận nào
                      </span>
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                </div>
              )}
            </>
          )}
        </CommentProvider>
      </div>
    </div>
  );
};
