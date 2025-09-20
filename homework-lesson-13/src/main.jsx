import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Users } from './pages/users.jsx'
import { AddUsers } from './pages/add-users.jsx'
import { UserDetails } from './pages/user-details.jsx'
const router = createBrowserRouter([
  {path:"",element:<Users/>},
  {path:"add",element:<AddUsers/>},
  {path:"users/:id",element:<UserDetails/>}
])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
