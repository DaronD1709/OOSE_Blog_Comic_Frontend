import React, { useState, useEffect, useContext } from "react";
import { Tabs, message } from "antd";
import { useParams, useLocation } from "react-router-dom";
import UserDisplay from "../components/User/UserDisplay";
import UserForm from "../components/User/UserForm";
import AvatarUpload from "../components/User/AvatarUpload";
import { AvatarDisplay } from "../components/User/AvatarUpload";
import FavouriteList from "../components/Favourite/FavouriteList";
import { getFavouritesByUserAPI } from '../services/favoriteService.js';
import { fetchAllFollowsAPI } from '../services/followService.js';
import { getUsersByIdsAPI } from '../services/userService.js';
import FollowingList from '../components/Follow/FollowingList.jsx';
import { 
  fetchUserById, 
  fetchUserByEmail, 
  fetchUserByUsername, 
  updateUser, 
  updateUserAvatarService,
  fetchAccountAPI
} from "../services/userService";
import { getFollowingByUserAPI } from '../services/followService.js';
import { AuthContext } from '../context/auth.context.jsx';
import { getUserAvatar } from '../constants/utility.js'

const { TabPane } = Tabs;

const UserPage = () => {
  const [userData, setUserData] = useState({
    id: null,
    fullName: '',
    email: '',
    phoneNumber: '',
    username: '',
    role: '',
    avatar: null
  });
  const [loading, setLoading] = useState(true);
  const [favouriteBlogs, setFavouriteBlogs] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  
  // Get URL parameters
  const { id: paramId } = useParams();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        let response;
        if (paramId) {
          response = await fetchUserById(paramId);
        } else {
          message.error('Không tìm thấy thông tin người dùng, vui lòng đăng nhập');
          setLoading(false);
          return;
        }
        const user = response.data || response;
        setUserData({
          id: user.id,
          fullName: user.fullName|| user.displayName || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
          username: user.username || '',
          role: user.role || 'user',
          avatar: user.avatar || null
        });
        // Lấy danh sách bài viết yêu thích
        if (user.id) {
          try {
            const favRes = await getFavouritesByUserAPI(user.id);
            setFavouriteBlogs(favRes.map(fav => fav.blog || fav));
          } catch (e) {
            setFavouriteBlogs([]);
          }          
          try {
            const following = await getFollowingByUserAPI(user.id);
            if (following && following.length > 0) {
              setFollowingList(following);
            } else {
              setFollowingList([]);
            }
          } catch (e) {
            console.error('Error fetching following list:', e);
            setFollowingList([]);
          }
        }
      } catch (error) {
        message.error('Không thể tải thông tin người dùng');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [paramId, location.pathname]);
  
  const handleUserUpdate = async (updatedData) => {
    try {
      const userUpdateReq = {
        fullName: updatedData.fullName,
        email: updatedData.email,
        username: updatedData.username
      };
      // Bước 1: Cập nhật user
      await updateUser(userData.id, userUpdateReq);
      // Bước 2: Luôn fetch lại user bằng id để cập nhật UI
      const response = await fetchUserById(userData.id);
      const updatedUserData = response.data || response;
      setUserData(prev => ({ ...prev, ...updatedUserData }));
      message.success("Cập nhật thông tin thành công");
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Cập nhật thông tin thất bại");
      return Promise.reject(error);
    }
  };
  const handleAvatarUpload = async (file) => {
    try {
      await updateUserAvatarService(userData.id, file);
      const response = await fetchUserById(userData.id);
      const updatedUserData = response.data || response;
      setUserData(prev => ({ ...prev, ...updatedUserData }));
      message.success("Cập nhật ảnh đại diện thành công");
      return Promise.resolve();
    } catch (error) {
      console.error("Error uploading avatar:", error);
      message.error("Cập nhật ảnh đại diện thất bại");
      return Promise.reject(error);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Đang tải thông tin...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Thông tin người dùng</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thông tin tài khoản" key="1">
          <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-2/5 flex justify-center">
              <AvatarDisplay
                avatar={user.avatar}
                size={200}
                className="rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="md:w-3/5">
              <UserDisplay userData={userData} />
            </div>
          </div>
        </TabPane>
        <TabPane tab="Chỉnh sửa tài khoản" key="2">
          <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-2/5 flex justify-center">
              {/* Chỉ cho phép upload ở tab này */}
              <AvatarUpload initialAvatar={userData.avatar} onUpload={handleAvatarUpload} />
            </div>
            <div className="md:w-3/5">
              <UserForm initialData={userData} onSubmit={handleUserUpdate} />
            </div>
          </div>
        </TabPane>
        <TabPane tab="Bài viết yêu thích" key="3">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Bài viết yêu thích</h2>
            <FavouriteList blogs={favouriteBlogs} />
          </div>
        </TabPane>       
        <TabPane tab="Đang theo dõi" key="4">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Blogger đang theo dõi</h2>
            <FollowingList following={followingList.map(f => f.bloggerId || f.id || f)} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserPage;