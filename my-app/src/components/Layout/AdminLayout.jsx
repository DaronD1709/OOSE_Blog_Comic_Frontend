// src/layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom'
import { useMode, ColorModeContext } from '/src/theme.js'
import { ThemeProvider, CssBaseline } from '@mui/material'
import AdminSidebar from '../navigation/AdminSidebar.jsx'
import AdminNavbar from '../navigation/AdminNavbar.jsx'
import { useState } from 'react'

export default function AdminLayout () {
  const [theme, colorMode] = useMode()
  const [isSidebar, setIsSidebar] = useState(true)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="flex h-screen relative">
          <AdminSidebar isSidebar={isSidebar}/>
          <main className="h-full w-full font-sans">
            <AdminNavbar setIsSidebar={setIsSidebar}/>
            <Outlet/>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
