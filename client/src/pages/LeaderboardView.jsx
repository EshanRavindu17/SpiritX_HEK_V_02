import React from 'react';

const leaderboardData = [
  { username: 'user1', points: 1500 },
  { username: 'user2', points: 1200 },
  { username: 'user3', points: 900 },
  { username: 'user4', points: 1600 },
  { username: 'user5', points: 1100 },
  { username: 'loggedInUser', points: 1300 }, // Example of logged-in user
];

// Assuming the logged-in user's username is passed as a prop or retrieved from state
const loggedInUser = 'loggedInUser';

const LeaderboardView = () => {
  // Sort leaderboard data in descending order based on points
  const sortedLeaderboard = leaderboardData.sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-5">
      <div className="container mx-auto max-w-3xl bg-white rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-semibold text-gray-800">Leaderboard</h2>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-4">
          {sortedLeaderboard.map((user, index) => (
            <div
              key={user.username}
              className={`flex justify-between items-center p-4 rounded-lg border ${user.username === loggedInUser ? 'bg-yellow-200 border-yellow-500' : 'bg-gray-100 hover:bg-gray-200'} transition duration-300`}
            >
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${user.username === loggedInUser ? 'font-bold text-gray-800' : 'text-gray-700'}`}>
                  {index + 1}. {user.username}
                </span>
              </div>
              <span className="text-xl text-gray-700">{user.points} Points</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardView;
