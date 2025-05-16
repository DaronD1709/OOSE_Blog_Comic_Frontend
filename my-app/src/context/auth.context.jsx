import { createContext, useEffect, useState } from 'react'
import { fetchAccountAPI } from '../services/userService.js'

export const AuthContext = createContext({})

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null)
  const [uploadCharacterAvatar, setUploadCharacterAvatar] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      const userPromise = fetchAccountAPI()
      userPromise
        .then((user) => {
          setUser(user)
        })
        .catch((error) => {
          setUser(null)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false) // ✅ THÊM dòng này để tránh treo loading mãi mãi
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, uploadCharacterAvatar, setUploadCharacterAvatar }}>
      {loading ? null : children} {/* Có thể thay bằng spinner */}
    </AuthContext.Provider>
  )
}

