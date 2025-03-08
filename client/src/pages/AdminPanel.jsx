import React from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

const AdminPanel = () => {
  return (
    <div className='flex'>
      <SideBar/>
       <Outlet/>
    </div>
  )
}

export default AdminPanel
