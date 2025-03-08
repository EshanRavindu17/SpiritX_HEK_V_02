import React from "react";
import { Link } from "react-router-dom";
import Leaderboard from "../assets/images/leaderboard.png";
import teamview from "../assets/images/teamview.jpeg";
import players from "../assets/images/players.jpeg";
import selectteam from "../assets/images/selectteam.jpeg";

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-4xl font-bold text-yellow-300 tracking-wide">
          Spirit11 Fantasy Cricket
        </h1>
        <div className="text-xl text-white flex items-center space-x-2">
          <span>User</span>
          <svg
            className="w-6 h-6 text-yellow-300"
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
        </div>
      </header>

      {/* Menu Bar */}
      <nav className="bg-gray-800 p-4 flex justify-center space-x-10 shadow-md">
        <Link
          to="/"
          className="text-lg font-semibold text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          HOME
        </Link>
        <Link
          to="/playnow"
          className="text-lg font-semibold text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          PLAY NOW
        </Link>
        <Link
          to="/myteam"
          className="text-lg font-semibold text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          MY TEAM
        </Link>
        <Link
          to="/customise"
          className="text-lg font-semibold text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          CUSTOMISE
        </Link>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="space-y-8">
          {/* Leaderboard Section */}
          <Link to="/leaderboardview">
            <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <img
                src={Leaderboard}
                alt="Leaderboard"
                className="w-full h-72 object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-8 text-left">
                <h2 className="text-3xl font-bold text-white uppercase tracking-wide">
                  Leaderboard
                </h2>
                <p className="text-gray-200 text-sm mt-3 leading-relaxed">
                  Check out the top-performing players and see where you stand in the rankings.
                </p>
                <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-full uppercase transition duration-300 transform hover:scale-105">
                  View Leaderboard
                </button>
              </div>
            </div>
          </Link>

          {/* Team View Section */}
          <Link to="/teamview">
            <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <img
                src={teamview}
                alt="Team View"
                className="w-full h-72 object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-8 text-left">
                <h2 className="text-3xl font-bold text-white uppercase tracking-wide">
                  Team View
                </h2>
                <p className="text-gray-200 text-sm mt-3 leading-relaxed">
                  Manage your fantasy team and strategize for the upcoming matches.
                </p>
                <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-full uppercase transition duration-300 transform hover:scale-105">
                  Manage Team
                </button>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Section */}
        <div className="space-y-8">
          {/* Players View Section */}
          <Link to="/playersview">
            <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <img
                src={players}
                alt="Players View"
                className="w-full h-72 object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-8 text-left">
                <h2 className="text-3xl font-bold text-white uppercase tracking-wide">
                  Players View
                </h2>
                <p className="text-gray-200 text-sm mt-3 leading-relaxed">
                  Explore and manage your players to build the ultimate fantasy team.
                </p>
                <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-full uppercase transition duration-300 transform hover:scale-105">
                  Explore Players
                </button>
              </div>
            </div>
          </Link>

          {/* Select Team Section */}
          <Link to="/selectteam">
            <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <img
                src={selectteam}
                alt="Select Team"
                className="w-full h-72 object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-8 text-left">
                <h2 className="text-3xl font-bold text-white uppercase tracking-wide">
                  Select Team
                </h2>
                <p className="text-gray-200 text-sm mt-3 leading-relaxed">
                  Pick your dream team and compete in thrilling fantasy matches.
                </p>
                <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-full uppercase transition duration-300 transform hover:scale-105">
                  Select Team
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 text-center text-gray-400">
        <p>Powered by Spirit11 © 2023 | Build Your Cricket Legacy</p>
      </footer>
    </div>
  );
};

export default HomeScreen;