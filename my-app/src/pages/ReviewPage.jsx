import React, { useEffect, useState } from "react";
import AppSidebar from "../components/Sidebar/AppSidebar";
import VerticalCard from "../components/Card/VerticalCard";
import AppPagination from "../components/AppPagination";
import { message } from "antd";
import { getBlogComicPaginationAPI } from "../services/blogService.js";
import { PAGINATION } from "../constants/api.js";
import { validate } from "../utils/validate.js";

const ReviewPageMenu = [
  {
    label: "Thể loại truyện",
    children: [
      { label: "Action", to: "/genre/action" },
      { label: "Adventure", to: "/genre/adventure" },
      { label: "Drama", to: "/genre/drama" },
      { label: "Fantasy", to: "/genre/fantasy" },
      { label: "Romance", to: "/genre/romance" },
    ],
  },
  { label: "Tất cả truyện", to: "/all-comics" },
];

const ReviewPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    getBlogs();
  }, [currentPage]);

  const getBlogs = async () => {
    try {
      const res = await getBlogComicPaginationAPI(currentPage - 1, 9);
      setBlogs(res.result);
      setMeta(res.meta);
    } catch (err) {
      message.error(err.data);
    }
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-full">
      <div>
        <AppSidebar
          menuItems={ReviewPageMenu}
          onGenreSelect={handleGenreSelect}
        />
      </div>
      <div className="flex flex-col flex-1 pt-10 px-3">
        <div className="grid grid-cols-3 gap-5 h-[930px] overflow-y-auto">
          {validate(blogs) ? (
            blogs.map((comic) => <VerticalCard key={comic.id} {...comic} />)
          ) : (
            <p>Không có truyện nào cho thể loại này.</p>
          )}
        </div>
        <div className="flex justify-center mt-5 mb-13 pb-5">
          {validate(meta) && (
            <AppPagination
              current={currentPage}
              total={meta.total}
              pageSize={9}
              onChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
