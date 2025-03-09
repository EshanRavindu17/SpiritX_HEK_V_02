import React, { useMemo, useState, useRef, useEffect } from 'react';
import TopThreePodium from '../components/TopThreePodium';
import LeaderboardTable from '../components/LeaderboardTable';
import LoggedInUserBlock from '../components/LoggedInUserBlock';
import '../styles/leaderboard.css';

const leaderboardData = [
  { username: 'user1', points: 1500 },
  { username: 'user2', points: 1200 },
  { username: 'user3', points: 900 },
  { username: 'user4', points: 1600 },
  { username: 'user5', points: 1100 },
  { username: 'loggedInUser', points: 1300 },
  { username: 'player7', points: 1700 },
  { username: 'player8', points: 1400 },
  { username: 'player9', points: 1000 },
  { username: 'player10', points: 1250 },
];

const loggedInUser = 'loggedInUser';

// Utility to sort leaderboard data
const sortLeaderboard = (data) => {
  return [...data].sort((a, b) => b.points - a.points);
};

const Leaderboard = () => {
  const sortedLeaderboard = useMemo(() => sortLeaderboard(leaderboardData), []);
  const topThree = sortedLeaderboard.slice(0, 3);
  const others = sortedLeaderboard.slice(3);

  const [showBackToTop, setShowBackToTop] = useState(false);
  const tableRef = useRef(null);

  // Scroll detection for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const scrollTop = tableRef.current.scrollTop;
        setShowBackToTop(scrollTop > 100);
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (tableRef.current) {
      tableRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Logged-in User Block Message
  const loggedInUserData = sortedLeaderboard.find(
    (user) => user.username === loggedInUser
  );
  const rank = sortedLeaderboard.findIndex((user) => user.username === loggedInUser) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16 px-8 md:px-16 lg:px-24 flex flex-col items-center relative">
      {/* Header */}
      <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 tracking-wider">
        Leaderboard
      </h2>

      {/* Top 3 Podium */}
      <TopThreePodium topThree={topThree} loggedInUser={loggedInUser} />

      <LeaderboardTable
        others={others}
        loggedInUser={loggedInUser}
        tableRef={tableRef}
        showBackToTop={showBackToTop}
        scrollToTop={scrollToTop}
      />

      {/* Logged-in User Block positioned at the bottom-right */}
      {loggedInUserData && (
        <LoggedInUserBlock loggedInUserData={loggedInUserData} rank={rank} />
      )}
    </div>
  );
};

export default Leaderboard;
