// src/components/LeaderboardTable.js
import React from 'react';
import { FiArrowUp } from 'react-icons/fi';

const LeaderboardTable = ({ others, loggedInUser, tableRef, showBackToTop, scrollToTop }) => {
  return (
    <div
      ref={tableRef}
      className="w-full max-w-4xl bg-gray-800 bg-opacity-85 rounded-lg shadow-2xl p-8 border border-cyan-500/30 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-900 relative"
    >
      {others.length === 0 ? (
        <p className="text-center text-gray-300 text-lg">No additional users in the leaderboard.</p>
      ) : (
        <div className="space-y-4">
          {others.map((user, index) => {
            const rank = index + 4;
            const isLoggedInUser = user.username === loggedInUser;

            return (
              <div
                key={user.username}
                className={`flex justify-between items-center p-4 rounded-md bg-gray-700 bg-opacity-80 border ${
                  isLoggedInUser
                    ? 'border-yellow-400 bg-yellow-900/30'
                    : 'border-gray-600'
                } hover:bg-gray-600 transition-colors duration-200`}
                tabIndex={0}
                role="listitem"
                aria-label={`Rank ${rank}: ${user.username} with ${user.points} points`}
              >
                <div className="flex items-center space-x-4">
                  <span className="w-10 h-10 flex items-center justify-center rounded-md bg-cyan-500 text-white font-bold text-sm">
                    {rank}
                  </span>
                  <span
                    className={`text-lg md:text-xl text-white truncate ${
                      isLoggedInUser ? 'font-bold text-yellow-300' : ''
                    }`}
                  >
                    {user.username}
                  </span>
                </div>
                <span className="text-lg md:text-xl text-white font-medium">
                  {user.points.toLocaleString()} Pts
                </span>
              </div>
            );
          })}
        </div>
      )}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-10 bg-cyan-500 text-white p-3 rounded-full shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors duration-200 z-10"
          aria-label="Scroll back to top"
        >
          <FiArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default LeaderboardTable;
