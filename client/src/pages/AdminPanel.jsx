import React, { useEffect } from 'react'
import SideBar from '../components/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminPanel = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }
  }, [])
  return (
    <div className='flex'>
      <SideBar/>
       <Outlet/>
    </div>
  )
}

export default AdminPanel
