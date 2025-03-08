// src/components/TopThreePodium.js
import React from 'react';

const TopThreePodium = ({ topThree, loggedInUser }) => {
  const rankColors = [
    'bg-gradient-to-t from-yellow-600 to-yellow-400', // Gold for rank 1
    'bg-gradient-to-t from-gray-500 to-gray-300', // Silver for rank 2
    'bg-gradient-to-t from-orange-600 to-orange-400', // Bronze for rank 3
  ];

  return (
    <div className="w-full max-w-5xl flex justify-center items-center space-x-6 md:space-x-12 mb-12">
      {topThree.map((user, index) => {
        const rank = index + 1;
        const isLoggedInUser = user.username === loggedInUser;

        return (
          <div
            key={user.username}
            className={`flex flex-col items-center justify-end w-1/3 md:w-1/4 lg:w-1/5 ${
              rankColors[index]
            } bg-opacity-90 shadow-xl rounded-md p-4 border ${
              isLoggedInUser ? 'border-yellow-400' : 'border-transparent'
            }`}
            role="listitem"
            aria-label={`Rank ${rank}: ${user.username} with ${user.points} points`}
          >
            <span
              className={`text-xl font-bold text-white ${
                isLoggedInUser ? 'text-yellow-300' : ''
              }`}
            >
              {user.username}
            </span>
            <p className="text-base text-white">{user.points.toLocaleString()} Pts</p>
            <span className="text-sm text-white font-semibold">Rank {rank}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TopThreePodium;
