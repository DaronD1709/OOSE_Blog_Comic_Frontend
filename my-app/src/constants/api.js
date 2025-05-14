export const URL_BACKEND = import.meta.env.VITE_BACKEND_URL
export const URL_FRONTEND = import.meta.env.VITE_FRONTEND_URL
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  NEW_CHARACTER: '/new-character',
  EDIT_CHARACTER: '/edit-character/:id',
  VIEW_CHARACTER: '/character/:id',
  VIEW_COMIC: '/comic/:id',
  NEW_COMIC: '/new-comic',
  EDIT_COMIC: '/edit-comic/:id',
  SEARCH: '/search',
  DASHBOARD: '/dashboard',
  FORGOT_PASSWORD: '/forgot-password',
  USERS: '/users/:id', // Đổi sang dạng /users/:id
  USER_BY_ID: '/users/:id',
  USER_BY_ID_PUBLIC: '/users/:id/public',
  COMMENT: '/comment',
  REPORT: '/report',
  FAVOURITE: '/favourite',
  COMMENT_ADMIN: '/comment-admin',
  REVIEW_COMIC: '/review-comic',
  REVIEW_CHARACTER: '/review-character',
  REVIEW_INSIGHT: '/review-insight',
  VIEW_BLOG: '/view-blog',
  CALLBACK: '/callback',

  getEditCharacter: (id) => `/edit-character/${id}`,
  getViewCharacter: (id) => `/character/${id}`,
  getViewComic: (id) => `/comic/${id}`,
  getEditComic: (id) => `/edit-comic/${id}`,
  getUserProfile: (id) => `/users/${id}`,
}

export const PAGINATION = {
  SIZE: 9,
  PAGE: 0
}