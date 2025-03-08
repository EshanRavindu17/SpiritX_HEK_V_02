import React, { useMemo } from 'react';
import TopThreePodium from '../components/TopThreePodium';
import LeaderboardTable from '../components/LeaderboardTable';
import imgvirat from "../assets/2.avif";

const leaderboardData = [
  { username: 'Meghan Jes...', points: 40, image: imgvirat },
  { username: 'Bryan Wolf', points: 43, image: imgvirat },
  { username: 'Alex Turner', points: 38, image: imgvirat },
  { username: 'Marsha Fisher', points: 36, image: imgvirat },
  { username: 'Juanita Cormier', points: 35, image: imgvirat },
  { username: 'loggedInUser', points: 34, image: imgvirat },
  { username: 'Tamara Schmidt', points: 33, image: imgvirat },
  { username: 'Ricardo Veum', points: 32, image: imgvirat },
  { username: 'Gary Sanford', points: 31, image: imgvirat },
  { username: 'Becky Bartell', points: 30, image: imgvirat },
];

const loggedInUser = 'loggedInUser';

const sortLeaderboard = (data) => {
  return [...data].sort((a, b) => b.points - a.points);
};

const Leaderboard = () => {
  const sortedLeaderboard = useMemo(() => sortLeaderboard(leaderboardData), []);
  const topThree = sortedLeaderboard.slice(0, 3);
  const others = sortedLeaderboard.slice(3);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative overflow-hidden">
      {/* Spotlight Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))
          `,
          backgroundColor: '#111827', // gray-900
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-wide drop-shadow-lg">
            Leaderboard
          </h2>
        </div>

        {/* Top 3 Section */}
        <div className="px-4 sm:px-6 md:px-8 py-6">
          <TopThreePodium topThree={topThree} loggedInUser={loggedInUser} />
        </div>

        {/* Leaderboard List */}
        <div className="flex-1 px-4 sm:px-6 md:px-8 pb-6">
          <LeaderboardTable others={others} loggedInUser={loggedInUser} />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;