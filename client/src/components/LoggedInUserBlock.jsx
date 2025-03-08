// src/components/LoggedInUserBlock.js
import React from 'react';

const LoggedInUserBlock = ({ loggedInUserData, rank }) => {
  return (
    <div className="fixed bottom-10 right-10 bg-yellow-500 p-6 rounded-lg shadow-lg text-center text-white w-64">
      <h3 className="text-2xl font-bold">Your Current Rank</h3>
      <p className="text-xl">Rank: {rank}</p>
      <p className="text-xl">Points: {loggedInUserData.points.toLocaleString()}</p>
    </div>
  );
};

export default LoggedInUserBlock;
