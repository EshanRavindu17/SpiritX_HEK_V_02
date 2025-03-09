import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LeaderboardTable = ({ others, loggedInUser }) => {
  const sortedOthers = [...others].sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-2 sm:space-y-3 md:space-y-4">
      {sortedOthers.map((user, index) => {
        const rank = index + 4;
        const isLoggedInUser = user.username === loggedInUser;

        return (
          <div
            key={user.username}
            className={`flex items-center p-2 sm:p-3 md:p-4 rounded-lg transition-all duration-300 ${
              isLoggedInUser ? 'bg-blue-800/50' : 'bg-gray-400/50'
            } hover:shadow-lg hover:bg-gray-700/50`}
          >
            <div className="w-8 sm:w-10 md:w-12 text-center text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-300">
              {rank}
            </div>
            <img
              src={user.image}
              alt={`${user.username} profile`}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover border-2 border-gray-700 mr-2 sm:mr-3 md:mr-4 shadow-md"
            />
            <div className="flex-1 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white truncate">
              {user.username}
              {isLoggedInUser && (
                <span className="text-blue-400 ml-1 sm:ml-2 font-semibold"> (You)</span>
              )}
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white">
              {user.points} pts
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardTable;