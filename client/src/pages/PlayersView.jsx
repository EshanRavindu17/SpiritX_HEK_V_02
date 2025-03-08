import React, { useState, useRef, useEffect, useMemo } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";
import image1 from "../assets/images/icon.png";

const PlayersView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [activePlayer, setActivePlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [battingStrikeRate, setBattingStrikeRate] = useState(0);
  const [battingAverage, setBattingAverage] = useState(0);
  const [bowlingStrikeRate, setBowlingStrikeRate] = useState(0);
  const [economyRate, setEconomyRate] = useState(0);
  const [playerPoints, setPlayerPoints] = useState(0)
  const [playerValue, setPlayerValue] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(0);

  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user/getplayers");
        if (response.data.success) {
          setPlayers(response.data.players);
        }
      } catch (error) {
        alert("Failed to fetch players");
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  const UNIVERSITY_OPTIONS = useMemo(() => [
    { value: "", label: "All Universities" },
    ...Array.from(new Set(players.map((p) => p.university))).map((univ) => ({
      value: univ,
      label: univ,
    })),
  ], [players]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
        setIsDropdownOpen(!!event.target.value);
      };

  const handleFilter = (event) => setSelectedUniversity(event.target.value);
  const handleViewStats = (player) => {
    
    const battingStrikeRate = player.ballsFaced > 0 ? (player.totalRuns / player.ballsFaced) * 100 : 0;
    const battingAverage = player.inningsPlayed > 0 ? player.totalRuns / player.inningsPlayed : 0;
    const bowlingStrikeRate = player.wickets > 0 ? (player.oversBowled * 6) / player.wickets : 0;
    const economyRate = player.oversBowled > 0 ? (player.runsConceded / (player.oversBowled * 6)) * 6 : 0;

    const playerPoints = (battingStrikeRate / 5) + (battingAverage * 0.8) + (500 / (bowlingStrikeRate || 1)) + (140 / (economyRate || 1));
    const playerValue = Math.round(((9 * playerPoints + 100) * 1000) / 50000) * 50000;
    setBattingAverage(battingAverage);
    setBattingStrikeRate(battingStrikeRate);
    setBowlingStrikeRate(bowlingStrikeRate);
    setEconomyRate(economyRate);
    setPlayerPoints(playerPoints);
    setPlayerValue(playerValue);
    setActivePlayer(player);
  }
  const closeStats = () => setActivePlayer(null);

  const filteredPlayers = useMemo(() => {
    console.log(playerPoints)
    console.log(isDropdownOpen)

    return players.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.university.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUniversity = selectedUniversity
        ? player.university === selectedUniversity
        : true;
      return matchesSearch && matchesUniversity;
    });
  }, [searchTerm, selectedUniversity, players]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#d1d5db] via-[#e5e7eb] to-[#f3f4f6] text-white p-6 md:p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg p-6 mb-5 rounded-lg text-center w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-montserrat font-extrabold uppercase tracking-[0.2em] text-black drop-shadow-lg">
          Available Players
        </h2>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 mb-8 relative w-full">
        <input
          type="text"
          placeholder="Search Players"
          className="p-4 w-full bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={handleSearch}
          ref={searchInputRef}
        />
        <select
          className="mt-4 md:mt-0 p-4 w-full md:w-60 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400"
          value={selectedUniversity}
          onChange={handleFilter}
        >
          {UNIVERSITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading players...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player, index) => (
              <li key={index} className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col justify-between min-h-[200px]">
                <div className="flex items-start space-x-4 mb-4">
                  <img src={player.image || image1} className='w-24 h-24 rounded-full object-cover' />
                  <div className="flex-1 text-right">
                    <span className="text-base font-bold uppercase text-white">{player.name}</span>
                    <p className="text-xs text-gray-400 uppercase mt-1">{player.university}</p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl" onClick={() => handleViewStats(player)}>
                  View Stats
                </button>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-400">No Players Found</li>
          )}
        </ul>
      )}

      {activePlayer && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
          {/* Header */}
          <h3 className="text-xl uppercase font-bold text-gray-900 mb-4 text-center">
            {activePlayer.name} - Stats
          </h3>
      
          {/* Stats Boxes */}
          <div className="space-y-4">
            {/* Batting Box */}
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="text-sm font-semibold text-blue-700 mb-2">Batting</h4>
              <div className="space-y-1 text-sm text-gray-700">
                <p><span className="font-medium">Runs:</span> {activePlayer.totalRuns}</p>
                <p><span className="font-medium">Balls Faced:</span> {activePlayer.ballsFaced}</p>
                <p><span className="font-medium">Innings:</span> {activePlayer.inningsPlayed}</p>
                <p><span className="font-medium text-blue-600">Strike Rate:</span> {battingStrikeRate.toFixed(2)}</p>
                <p><span className="font-medium text-blue-600">Average:</span> {battingAverage.toFixed(2)}</p>
              </div>
            </div>
      
            {/* Bowling Box */}
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="text-sm font-semibold text-green-700 mb-2">Bowling</h4>
              <div className="space-y-1 text-sm text-gray-700">
                <p><span className="font-medium">Wickets:</span> {activePlayer.wickets}</p>
                <p><span className="font-medium">Overs Bowled:</span> {activePlayer.oversBowled}</p>
                <p><span className="font-medium">Runs Conceded:</span> {activePlayer.runsConceded}</p>
                <p><span className="font-medium text-green-600">Strike Rate:</span> {bowlingStrikeRate.toFixed(2)}</p>
                <p><span className="font-medium text-green-600">Economy:</span> {economyRate.toFixed(2)}</p>
              </div>
            </div>
      
            {/* Base Price Box */}
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <p className="text-sm text-gray-700">
                <span className=" text-yellow-600 font-bold">Base Price:</span> Rs {playerValue.toFixed(2)}
              </p>
            </div>
          </div>
      
          {/* Close Button */}
          <button
            className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium transition-colors duration-200"
            onClick={closeStats}
          >
            Close
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default PlayersView;