import React, { useState, useRef, useEffect, useMemo } from "react";
import { FiX } from "react-icons/fi";

const players = [
  { name: "Virat Kohli", university: "University A", stats: "Player 1 stats here..." },
  { name: "Rohit Sharma", university: "University B", stats: "Player 2 stats here..." },
  { name: "MS Dhoni", university: "University C", stats: "Player 3 stats here..." },
  { name: "Wanindu Hasranga", university: "University D", stats: "Player 4 stats here..." },
  { name: "KL Rahul", university: "University E", stats: "Player 5 stats here..." },
  { name: "Shikhar Dhawan", university: "University F", stats: "Player 6 stats here..." },
  { name: "Hardik Pandya", university: "University G", stats: "Player 7 stats here..." },
  { name: "Jasprit Bumrah", university: "University H", stats: "Player 8 stats here..." },
  { name: "Yuzvendra Chahal", university: "University I", stats: "Player 9 stats here..." },
  { name: "Ravindra Jadeja", university: "University J", stats: "Player 10 stats here..." },
  { name: "Kagiso Rabada", university: "University K", stats: "Player 11 stats here..." },
  { name: "Ishant Sharma", university: "University L", stats: "Player 12 stats here..." },
  { name: "Shreyas Iyer", university: "University M", stats: "Player 13 stats here..." },
  { name: "Rishabh Pant", university: "University N", stats: "Player 14 stats here..." },
];

// Extract university options dynamically
const UNIVERSITY_OPTIONS = [
  { value: "", label: "All Universities" },
  ...Array.from(new Set(players.map(p => p.university))).map(univ => ({
    value: univ,
    label: univ,
  })),
];

const PlayersView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [activePlayer, setActivePlayer] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setIsDropdownOpen(!!event.target.value);
  };

  const handleFilter = (event) => setSelectedUniversity(event.target.value);
  const handleViewStats = (player) => setActivePlayer(player);
  const closeStats = () => setActivePlayer(null);

  // Memoized filtered players for performance
  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.university.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUniversity = selectedUniversity
        ? player.university === selectedUniversity
        : true;
      return matchesSearch && matchesUniversity;
    });
  }, [searchTerm, selectedUniversity]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#d1d5db] via-[#e5e7eb] to-[#f3f4f6] text-white p-6 md:p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg p-6 mb-5 rounded-lg text-center w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-montserrat font-extrabold uppercase tracking-[0.2em] text-black drop-shadow-lg">
          Available Players
        </h2>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:space-x-4 mb-8 relative w-full">
        <input
          type="text"
          placeholder="Search Players"
          aria-label="Search players by name or university"
          className="p-4 w-full bg-gray-800 bg-opacity-90 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm uppercase tracking-wide placeholder-gray-400 transition-all duration-300"
          value={searchTerm}
          onChange={handleSearch}
          ref={searchInputRef}
        />
        <select
          className="mt-4 md:mt-0 p-4 w-full md:w-60 bg-gray-800 bg-opacity-90 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm uppercase tracking-wide text-gray-300 transition-all duration-300 appearance-none bg-no-repeat bg-right bg-[length:1rem_1rem] bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"%23d1d5db\"><path d=\"M7 10l5 5 5-5H7z\"/></svg>')]"
          value={selectedUniversity}
          onChange={handleFilter}
          aria-label="Filter by university"
        >
          {UNIVERSITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-gray-800">
              {option.label}
            </option>
          ))}
        </select>

        {/* Search Suggestions */}
        {isDropdownOpen && searchTerm && filteredPlayers.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 w-full md:w-[calc(100%-15rem)] bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl mt-2 max-h-60 overflow-y-auto shadow-lg z-20"
          >
            {filteredPlayers.map((player, index) => (
              <div
                key={index}
                className="p-3 cursor-pointer hover:bg-gray-700 transition-colors duration-200 text-sm uppercase tracking-wide"
                onClick={() => {
                  setSearchTerm(player.name);
                  setIsDropdownOpen(false);
                }}
              >
                {player.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Player List with Updated Card-style Boxes */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player, index) => (
            <li
              key={index}
              className="relative bg-gradient-to-br from-[#1c2526] to-[#2a2e35] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 flex flex-col justify-between min-h-[220px] overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
                style={{
                  backgroundImage: `url(${player.imageUrl || 'https://via.placeholder.com/300x300?text=Player'})`,
                }}
              ></div>

              <div className="relative z-10 flex items-start space-x-4 mb-3">
                {/* Enlarged Circular Image Placeholder on the Left */}
                <div className="w-24 h-24 rounded-full bg-gray-700 bg-opacity-50 border-2 border-blue-500 flex items-center justify-center shadow-lg">
                  {player.imageUrl ? (
                    <img
                      src={player.imageUrl}
                      alt={player.name}
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/96?text=Player")}
                    />
                  ) : (
                    <span className="text-gray-400 text-xs uppercase">Upload</span>
                  )}
                </div>

                {/* Text on the Right */}
                <div className="flex-1 text-right">
                  <span className="text-lg font-extrabold uppercase tracking-wider text-white drop-shadow-md">
                    {player.name}
                  </span>
                  <p className="text-xs text-gray-300 uppercase tracking-wide drop-shadow-sm">
                    {player.university}
                  </p>
                </div>
              </div>

              {/* Decorative element (inspired by fireworks) */}
              <div className="relative z-10 mt-1 h-1 w-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto opacity-80"></div>

              {/* View Stats Button */}
              <div className="relative z-10 mt-auto">
                <button
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all duration-300 w-full shadow-md hover:shadow-lg"
                  onClick={() => handleViewStats(player)}
                  aria-label={`View stats for ${player.name}`}
                >
                  View Stats
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-400 uppercase tracking-wide text-sm col-span-full">
            No Players Found
          </li>
        )}
      </ul>

      {/* Stats Popup - Centered */}
      {activePlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-30 transition-opacity duration-300">
          <div className="bg-gradient-to-br from-[#1a2537] to-[#0d1b2a] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 scale-100 hover:scale-105">
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-4 text-white drop-shadow-lg">
              {activePlayer.name} - Stats
            </h3>
            <p className="text-gray-300 text-sm md:text-base mb-6">{activePlayer.stats}</p>
            <button
              className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 w-full sm:w-auto shadow-md hover:shadow-lg"
              onClick={closeStats}
              aria-label="Cancel and close popup"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayersView;