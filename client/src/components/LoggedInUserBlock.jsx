import React from 'react';

const LoggedInUserBlock = ({ loggedInUserData, rank }) => {
  return (
    <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-900 rounded-full border-2 border-gray-700 text-white font-bold text-lg">
        {rank}
      </div>
      <div>
        <p className="text-white font-semibold text-sm sm:text-base">{loggedInUserData.username}</p>
        <p className="text-yellow-400 font-bold text-lg sm:text-xl">{loggedInUserData.points}</p>
        <p className="text-gray-300 text-xs sm:text-sm">Your Rank: {rank}</p>
      </div>
    </div>
  );
};

export default LoggedInUserBlock;