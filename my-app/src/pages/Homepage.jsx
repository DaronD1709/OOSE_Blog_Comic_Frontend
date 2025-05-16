import React, { useEffect, useState } from "react";
import HorizontalCard from "../components/Card/HorizontalCard";
import CardTrending from "../components/Card/CardTrending";
import AppPagination from "../components/AppPagination";
import DisplayAuthorInfo from "../components/DisplayAuthorInfor";
import {
  getBlogCharacterPaginationAPI,
  getBlogPaginationAPI,
} from "../services/blogService.js";
import { PAGINATION } from "../constants/api.js";
import { message } from "antd";
import { validate } from "../utils/validate.js";

const topReviews = [
  {
    index: 1,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Vương Lâm trong Tiên Nghịch",
    date: "12 December 2023",
  },
  {
    index: 2,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Vương Lâm trong Tiên Nghịch",
    date: "12 December 2023",
  },
  {
    index: 3,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Vương Lâm trong Tiên Nghịch",
    date: "12 December 2023",
  },
  {
    index: 4,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Vương Lâm trong Tiên Nghịch",
    date: "12 December 2023",
  },
  {
    index: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Vương Lâm trong Tiên Nghịch",
    date: "12 December 2023",
  },
  {
    index: 6,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Vương Lâm trong Tiên Nghịch",
    date: "12 December 2023",
  },

  // ...
];

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    getBlogs();
  }, [currentPage]);
  const getBlogs = async () => {
    try {
      const res = await getBlogPaginationAPI(currentPage - 1, PAGINATION.SIZE);
      setBlogs(res.result);
      setMeta(res.meta);
    } catch (err) {
      message.error(err.data);
    }
  };
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white flex flex-col flex-1 min-h-screen ">
      <div className="flex justify-center p-8 ">
        <div
          className={
            "h-[900px] overflow-y-scroll  w-5/7 text-black  flex flex-col gap-3 items-center" +
            " overflow-x-hidden"
          }
        >
          {validate(blogs) && (
            <div className="  ">
              {blogs.map((item) => (
                <HorizontalCard key={item.id} {...item} />
              ))}
            </div>
          )}
        </div>
        <div className="w-2/7 h-full text-black bg-white rounded-2xl shadow-sm flex flex-col mt-6 gap-4 items-center ml-8 p-6 border border-gray-100">
          <div className="w-full">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent pb-2">
              Truyện nổi bật
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-6"></div>
          </div>
          <div className="w-full space-y-3">
            {topReviews.map((item, idx) => (
              <CardTrending key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mx-10 pb-20">
        {validate(meta) && (
          <AppPagination
            current={currentPage}
            total={meta.total}
            pageSize={meta.pageSize}
            onChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Homepage;
