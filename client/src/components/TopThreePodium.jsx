import React from 'react';
import image1 from '../assets/images/first.png';
import image2 from '../assets/images/second.png';
import image3 from '../assets/images/third.png';

const TopThreePodium = ({ topThree, loggedInUser }) => {
  // Check if topThree has at least 3 elements to avoid undefined errors
  if (!topThree || topThree.length < 3) {
    return (
      <div className="text-center text-gray-400 py-6">
        Not enough players to display the podium (minimum 3 required).
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-end space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 px-4 py-6 sm:py-8 md:py-10">
      {/* Rank 2 (Left) */}
      <div className="flex flex-col items-center transition-all duration-300 hover:scale-105">
        <div className="relative mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold text-sm sm:text-lg md:text-xl shadow-md">
            2
          </div>
        </div>
        <img
          src={image2}
          alt={`${topThree[1].username} profile`}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover border-2 border-gray-600 mb-2 sm:mb-3 shadow-lg"
        />
        <div className="text-center">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white truncate max-w-[90px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px]">
            {topThree[1].username}
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white flex items-center justify-center gap-1">
            <span>⭐</span> {topThree[1].points} pts
          </p>
          {topThree[1].username === loggedInUser && (
            <span className="text-blue-400 text-xs sm:text-sm md:text-base">You</span>
          )}
        </div>
      </div>

      {/* Rank 1 (Center, Elevated) */}
      <div className="flex flex-col items-center translate-y-[-16px] sm:translate-y-[-20px] md:translate-y-[-24px] transition-all duration-300 hover:scale-105">
        <div className="relative mb-2 sm:mb-3">
          <span className="absolute -top-8 sm:-top-8 md:-top-9 left-1/2 transform -translate-x-1/2 text-yellow-400 text-2xl sm:text-3xl">
            👑
          </span>
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold text-sm sm:text-lg md:text-xl shadow-md">
            1
          </div>
        </div>
        <img
          src={image1}
          alt={`${topThree[0].username} profile`}
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-2 border-gray-600 mb-2 sm:mb-3 shadow-lg"
        />
        <div className="text-center">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white truncate max-w-[90px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px]">
            {topThree[0].username}
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white flex items-center justify-center gap-1">
            <span>⭐</span> {topThree[0].points} pts
          </p>
          {topThree[0].username === loggedInUser && (
            <span className="text-blue-400 text-xs sm:text-sm md:text-base">You</span>
          )}
        </div>
      </div>

      {/* Rank 3 (Right) */}
      <div className="flex flex-col items-center transition-all duration-300 hover:scale-105">
        <div className="relative mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold text-sm sm:text-lg md:text-xl shadow-md">
            3
          </div>
        </div>
        <img
          src={image3}
          alt={`${topThree[2].username} profile`}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover border-2 border-gray-600 mb-2 sm:mb-3 shadow-lg"
        />
        <div className="text-center">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white truncate max-w-[90px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px]">
            {topThree[2].username}
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white flex items-center justify-center gap-1">
            <span>⭐</span> {topThree[2].points} pts
          </p>
          {topThree[2].username === loggedInUser && (
            <span className="text-blue-400 text-xs sm:text-sm md:text-base">You</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopThreePodium;