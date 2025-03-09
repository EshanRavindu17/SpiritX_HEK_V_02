import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaListAlt, FaUserCircle, FaUsers, FaKey } from 'react-icons/fa';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const logout = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    navigate("/login")
  }

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className='text-white bg-purple-700 p-3 fixed top-4 left-4 z-50 rounded-full shadow-lg md:hidden hover:bg-purple-800 transition-all duration-300'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white  fixed top-0 bottom-0 space-y-4 w-64 transform transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-64'} md:translate-x-0 md:relative z-50 shadow-2xl font-poppins`}
      >
        <div className='bg-gradient-to-r from-purple-600 to-indigo-600 h-16 flex items-center justify-center shadow-md'>
          <h3 className='text-2xl text-center font-bold text-white font-playfair'>SpritX Panel</h3>
        </div>
        <div className='px-4 py-4 space-y-2'>
          <NavLink
            to='/admin-panel'
            className={({ isActive }) =>
              `${isActive ? 'bg-purple-700 shadow-lg' : 'hover:bg-gray-700'} flex items-center space-x-4 block py-3 px-5 rounded-md transition-all duration-300 font-poppins`}
            end
            onClick={handleLinkClick}
          >
            <FaUsers className='text-xl' />
            <span className='text-lg'>Players</span>
          </NavLink>

          <NavLink
            to='/admin-panel/tournament-summary'
            className={({ isActive }) =>
              `${isActive ? 'bg-purple-700 shadow-lg' : 'hover:bg-gray-700'} flex items-center space-x-4 block py-3 px-5 rounded-md transition-all duration-300 font-poppins`}
            onClick={handleLinkClick}
          >
            <FaListAlt className='text-xl' />
            <span className='text-lg'>Tournament Summary</span>
          </NavLink>

          <NavLink
            to='/admin-panel/new-player'
            className={({ isActive }) =>
              `${isActive ? 'bg-purple-700 shadow-lg' : 'hover:bg-gray-700'} flex items-center space-x-4 block py-3 px-5 rounded-md transition-all duration-300 font-poppins`}
            onClick={handleLinkClick}
          >
            <FaUserCircle className='text-xl' />
            <span className='text-lg'>Create New Player</span>
          </NavLink>

          <NavLink
            to='/change-admin-password'
            className={({ isActive }) =>
              `${isActive ? 'bg-purple-700 shadow-lg' : 'hover:bg-gray-700'} flex items-center space-x-4 block py-3 px-5 rounded-md transition-all duration-300 font-poppins`}
            onClick={handleLinkClick}
          >
            <FaKey className='text-xl' />
            <span className='text-lg'>Change password</span>
          </NavLink>

          <button
          onClick={logout}
          className='bg-red-600 px-8 ml-4 mt-4 py-1 rounded'>logout</button>
        </div>
      </div>

      {/* Overlay for mobile view when sidebar is open */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 md:hidden z-40 backdrop-blur-sm'
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideBar;
