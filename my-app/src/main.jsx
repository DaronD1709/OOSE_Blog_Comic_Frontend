import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'antd/dist/reset.css' // Đối với AntD v5 trở lên
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { AuthWrapper } from './context/auth.context.jsx'
import Callback from './callback/CallBack.jsx'
import { EditBlogCharacterPage } from './pages/EditBlogCharacterPage.jsx'
import { ViewBlogCharacterPage } from './pages/ViewBlogCharacterPage.jsx'
import { NewBlogCharacterPage } from './pages/NewBlogCharacterPage.jsx'
import CharacterPage from './pages/CharacterPage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import Homepage from './pages/Homepage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import SearchResultPage from './pages/SearchResultPage'
import UserPage from './pages/UserPage.jsx'
import CommentPage from './pages/CommentPage.jsx'
import ReportPage from './pages/ReportPage.jsx'
import FavouritePage from './pages/FavouritePage.jsx'
import { ReportProvider } from './context/ReportContext'
import FavouriteProvider from './context/FavouriteContext.jsx'
import CommentAdminPage from './pages/CommentAdminPage.jsx'
import { ROUTES } from './constants/api.js'
import { NewBlogComicPage } from './pages/NewBlogComicPage.jsx'
import { EditBlogComicPage } from './pages/EditBlogComicPage.jsx'
import { ViewBlogComicPage } from './pages/ViewBlogComicPage.jsx'
import InsightPage from './pages/InsightPage.jsx'
import AdminManageCategories from './components/manage/AdminManageCategories.jsx'
import AdminManageBlogs from './components/manage/AdminManageBlogs.jsx'
import AdminManageReports from './components/manage/AdminManageReports.jsx'
import AdminManageUsers from './components/manage/AdminManageUsers.jsx'
import AdminManageTags from './components/manage/AdminManageTags.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import AdminLayout from './components/Layout/AdminLayout.jsx'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App/>,
    children: [
      {
        index: true,
        element: <Homepage/>,
      },
      {
        path: ROUTES.NEW_CHARACTER,
        element: <NewBlogCharacterPage/>,
      },
      {
        path: ROUTES.NEW_COMIC,
        element: <NewBlogComicPage/>
      },
      {
        path: ROUTES.VIEW_CHARACTER,
        element: <ViewBlogCharacterPage/>,
      },
      {
        path: ROUTES.VIEW_COMIC,
        element: <ViewBlogComicPage/>
      },
      {
        path: ROUTES.EDIT_COMIC,
        element: <EditBlogComicPage/>,
      },
      {
        path: ROUTES.EDIT_CHARACTER,
        element: <EditBlogCharacterPage/>,
      },
      {
        path: ROUTES.REVIEW_COMIC,
        element: <ReviewPage/>,
      },
      {
        path: ROUTES.REVIEW_INSIGHT,
        element: <InsightPage/>,
      },
      {
        path: ROUTES.REVIEW_CHARACTER,
        element: <CharacterPage/>,
      },
      {
        path: ROUTES.SEARCH,
        element: <SearchResultPage/>,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage/>,
      },
      {
        path: ROUTES.FAVOURITE,
        element: <FavouritePage/>,
      },
      {
        path: ROUTES.USERS,
        element: <UserPage/>,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage/>,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage/>,
  },
  {
    path: ROUTES.CALLBACK,
    element: <Callback/>,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPasswordPage/>,
  },
  {
    path: ROUTES.COMMENT_ADMIN,
    element: <CommentAdminPage/>,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'users',
        element: <AdminManageUsers />,
      },
      {
        path: 'reports',
        element: <AdminManageReports />,
      },
      {
        path: 'blogs',
        element: <AdminManageBlogs />,
      },
      {
        path: 'categories',
        element: <AdminManageCategories />,
      },
      {
        path: 'tags',
        element: <AdminManageTags />,
      },
    ],
  }

]);

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <FavouriteProvider>
      <ReportProvider>
        <RouterProvider router={router}/>
      </ReportProvider>
    </FavouriteProvider>
  </AuthWrapper>
)
