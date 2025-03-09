import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Leaderboard from "../assets/images/PLayersView.png";
import teamview from "../assets/images/Team.jpg";
import players from "../assets/images/newplayer.avif";
import selectteam from "../assets/images/teamteam.avif";
import "../pages/Home.css";

const HomeScreen = () => {
const [userId,setUserId] = useState('');
  const [name,setname]=useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id');
    setUserId(id);
    if(!id){
      navigate('/login');
    }else{
      const name = localStorage.getItem('name');
      setname(name);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="animated-background"></div>

      {/* Content Layer */}
      <div className="content">
        <header className="relative bg-black bg-opacity-400 p-4 sm:p-6 md:p-8 flex justify-center items-center shadow-xl border-b border-gray-700">
          <div className="flex justify-center items-center h-7 w-full">
          <h1 
            className="sm:text-xl md:text-5xl font-extrabold tracking-wider drop-shadow-md text-white"
            style={{ fontFamily: "'Copperplate', 'Palatino Linotype', 'Arial Black', sans-serif" }}
          >
            Spirit11 Fantasy Cricket
          </h1>

          </div>
          <div className="absolute left-4 sm:left-6 md:left-8 flex items-center space-x-3 sm:space-x-4">
          
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-white font-bold">{name}</span>
          </div>
          <div className="absolute right-4 sm:right-6 md:right-8">
            <button 
            onClick={logout}
            className="text-white bg-red-700 px-2 py-1 rounded-md font-bold hover:bg-red-800 focus:outline-none">logout</button>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
          {/* Left Section */}
          <div className="space-y-6 sm:space-y-8">
            {/* Leaderboard Section */}
            <Link to="/leaderboardview" aria-label="View the leaderboard">
              <div className="relative rounded-xl overflow-hidden border-2 border-gray-600 shadow-custom transition-all duration-500 hover:shadow-hover focus:outline-none focus:ring-2 focus:ring-gray-400 h-[270px]">
                <img
                  src={Leaderboard}
                  alt="Leaderboard"
                  className="z-10 absolute inset-0 w-full h-full object-cover transition-opacity duration-300 brightness-50 hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-center p-3 text-left">
                  <h2 className="z-20 text-lg sm:text-xl md:text-2xl font-extrabold text-white uppercase tracking-widest drop-shadow-xl">
                    Leaderboard
                  </h2>
                  <p className="z-20 text-xs sm:text-sm mt-1 leading-relaxed drop-shadow-md text-gray-200">
                    Check out the top-performing players and see where you stand in the rankings.
                  </p>
                </div>
              </div>
            </Link>

            {/* Team View Section */}
            <Link to="/teamview" aria-label="View and manage your fantasy team">
              <div className="relative rounded-xl overflow-hidden mt-8 border-2 border-gray-600 shadow-custom transition-all duration-500 hover:shadow-hover focus:outline-none focus:ring-2 focus:ring-gray-400 h-[270px]">
                <img
                  src={teamview}
                  alt="Team View"
                  className="z-10 absolute inset-0 w-full h-full object-cover transition-opacity duration-300 brightness-50 hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-center p-3 text-left">
                  <h2 className="z-20 text-lg sm:text-xl md:text-2xl font-extrabold text-white uppercase tracking-widest drop-shadow-xl">
                    Team View
                  </h2>
                  <p className="z-20 text-xs sm:text-sm mt-1 leading-relaxed drop-shadow-md text-gray-200">
                    Manage your fantasy team and strategize for the upcoming matches.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Section */}
          <div className="space-y-6 sm:space-y-8">
            {/* Players View Section */}
            <Link to="/playersview" aria-label="Explore and manage players">
              <div className="relative rounded-xl overflow-hidden border-2 border-gray-600 shadow-custom transition-all duration-500 hover:shadow-hover focus:outline-none focus:ring-2 focus:ring-gray-400 h-[270px]">
                <img
                  src={players}
                  alt="Players View"
                  className="z-10 absolute inset-0 w-full h-full object-cover transition-opacity duration-300 brightness-50 hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-center p-3 text-left">
                  <h2 className="z-20 text-lg sm:text-xl md:text-2xl font-extrabold text-white uppercase tracking-widest drop-shadow-xl">
                    Players View
                  </h2>
                  <p className="z-20 text-xs sm:text-sm mt-1 leading-relaxed drop-shadow-md text-gray-200">
                    Explore and manage your players to build the ultimate fantasy team.
                  </p>
                </div>
              </div>
            </Link>

            {/* Select Team Section */}
            <Link to="/selectteam" aria-label="Select your fantasy team">
              <div className="relative rounded-xl mt-8 overflow-hidden border-2 border-gray-600 shadow-custom transition-all duration-500 hover:shadow-hover focus:outline-none focus:ring-2 focus:ring-gray-400 h-[270px]">
                <img
                  src={selectteam}
                  alt="Select Team"
                  className="z-10 absolute inset-0 w-full h-full object-cover transition-opacity duration-300 brightness-50 hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-center p-3 text-left">
                  <h2 className="z-20 text-lg sm:text-xl md:text-2xl font-extrabold text-white uppercase tracking-widest drop-shadow-xl">
                    Select Team
                  </h2>
                  <p className="z-20 text-xs sm:text-sm mt-1 leading-relaxed drop-shadow-md text-gray-200">
                    Pick your dream team and compete in thrilling fantasy matches.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>


    </div>
  );
};


export default HomeScreen;
