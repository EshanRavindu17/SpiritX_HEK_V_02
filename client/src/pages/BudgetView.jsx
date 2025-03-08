import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Sample player data
const availablePlayers = [
  { name: 'Player 1', university: 'University A', cost: 500000 },
  { name: 'Player 2', university: 'University B', cost: 600000 },
  { name: 'Player 3', university: 'University C', cost: 550000 },
  { name: 'Player 4', university: 'University D', cost: 700000 },
  { name: 'Player 5', university: 'University E', cost: 800000 },
  { name: 'Player 6', university: 'University F', cost: 650000 },
  { name: 'Player 7', university: 'University G', cost: 500000 },
  { name: 'Player 8', university: 'University H', cost: 750000 },
  { name: 'Player 9', university: 'University I', cost: 850000 },
  { name: 'Player 10', university: 'University J', cost: 900000 },
  { name: 'Player 11', university: 'University K', cost: 600000 },
];

const initialBudget = 9000000; // Rs.9,000,000

const BudgetView = () => {
  const [team, setTeam] = useState([]);
  const [budget, setBudget] = useState(initialBudget);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);

  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Memoized filtered players for performance
  const filteredPlayers = useMemo(() => {
    return availablePlayers.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.university.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUniversity = selectedUniversity
        ? player.university === selectedUniversity
        : true;
      const notInTeam = !team.find((p) => p.name === player.name); // Exclude players already in team
      return matchesSearch && matchesUniversity && notInTeam;
    });
  }, [searchTerm, selectedUniversity, team]);

  // Handle adding a player to the team
  const handleAddPlayer = (player) => {
    if (team.length >= 11) {
      toast.error('Team is full! Maximum 11 players allowed.');
      return;
    }
    if (team.find((p) => p.name === player.name)) {
      toast.warn(`${player.name} is already in your team.`);
      return;
    }
    if (budget - player.cost < 0) {
      toast.error('Insufficient budget to add this player.');
      return;
    }
    setTeam([...team, player]);
    setBudget(budget - player.cost);
    toast.success(`${player.name} added to your team!`);
    setSearchTerm(''); // Clear search term after adding
    setIsDropdownOpen(false); // Close dropdown
  };

  // Handle removing a player from the team
  const handleRemovePlayer = (player) => {
    setShowConfirmDialog(player);
  };

  const confirmRemovePlayer = () => {
    if (showConfirmDialog) {
      setTeam(team.filter((p) => p.name !== showConfirmDialog.name));
      setBudget(budget + showConfirmDialog.cost);
      toast.error(`${showConfirmDialog.name} removed from your team.`); // Changed to toast.error for red color
      setShowConfirmDialog(null);
    }
  };

  // Clear the entire team
  const handleClearTeam = () => {
    setTeam([]);
    setBudget(initialBudget);
    toast.success('Team cleared successfully!');
  };

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setIsDropdownOpen(!!event.target.value);
  };

  // Handle selecting a player from the search dropdown
  const handleSelectPlayer = (player) => {
    handleAddPlayer(player); // Add the player directly when selected
  };

  // Handle university filter
  const handleFilter = (event) => setSelectedUniversity(event.target.value);

  // Close dropdown if clicking outside
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate budget usage percentage for progress bar
  const budgetUsagePercentage = ((initialBudget - budget) / initialBudget) * 100;

  return (
    <div className="bg-gradient-to-l from-gray-300 via-gray-600 to-black min-h-screen p-4 md:p-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        aria-live="polite" // Improve accessibility
      />
      <div className="container mx-auto max-w-6xl bg-transparent">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wider">
            Manage Your Fantasy Team Budget
          </h2>
        </div>

        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-8 relative">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search Players"
              aria-label="Search players by name or university"
              className="p-4 w-full bg-gray-800 text-white bg-opacity-90 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm uppercase tracking-wide placeholder-gray-400 transition-all duration-300"
              value={searchTerm}
              onChange={handleSearch}
              ref={searchInputRef}
            />
            {/* Search Suggestions */}
            {isDropdownOpen && searchTerm && filteredPlayers.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 w-full text-white bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl mt-2 max-h-60 overflow-y-auto shadow-lg z-20"
              >
                {filteredPlayers.map((player, index) => (
                  <div
                    key={index}
                    role="option"
                    tabIndex={0}
                    className="p-3 cursor-pointer hover:bg-gray-700 transition-colors duration-200 text-sm uppercase tracking-wide focus:outline-none focus:bg-gray-700"
                    onClick={() => handleSelectPlayer(player)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSelectPlayer(player);
                    }}
                  >
                    {player.name} ({player.university})
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* University Filter */}
          <select
            className="mt-4 md:mt-0 p-4 w-full md:w-1/3 bg-gray-800 bg-opacity-90 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm uppercase tracking-wide text-white transition-all duration-300"
            value={selectedUniversity}
            onChange={handleFilter}
            aria-label="Filter by university"
          >
            <option value="">All Universities</option>
            {Array.from(new Set(availablePlayers.map((p) => p.university))).map((university) => (
              <option key={university} value={university}>
                {university}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Overview Section */}
        <div className="bg-gray-900 p-4 md:p-6 rounded-xl shadow-lg mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h3 className="text-lg md:text-xl text-gray-200">Remaining Budget</h3>
            <div className="text-xl md:text-3xl text-white font-bold">Rs. {budget.toLocaleString()}</div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  budgetUsagePercentage > 80 ? 'bg-red-600' : 'bg-green-600'
                }`}
                style={{ width: `${budgetUsagePercentage}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              {budgetUsagePercentage.toFixed(1)}% of budget used
            </p>
          </div>
          {budget <= 0 && (
            <div className="text-red-600 text-lg font-semibold mt-3">
              <strong>Warning:</strong> You have exceeded your budget!
            </div>
          )}
        </div>

        {/* Total Spending Section */}
        <div className="bg-gray-900 p-4 md:p-6 rounded-xl shadow-lg mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h3 className="text-lg md:text-xl text-gray-200">Total Spending</h3>
            <div className="text-xl md:text-3xl text-white font-bold">
              Rs. {(initialBudget - budget).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Available Players Section */}
        <div className="bg-gray-900 p-4 md:p-6 rounded-xl shadow-lg mb-6">
          <h3 className="text-xl md:text-2xl text-gray-200 mb-4">Available Players</h3>
          {filteredPlayers.length === 0 ? (
            <p className="text-gray-500">No players available based on current filters</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredPlayers.map((player) => (
                <div
                  key={player.name}
                  className="bg-gray-800 p-4 rounded-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <div className="flex flex-col mb-4">
                    <span className="text-white text-lg font-semibold">{player.name}</span>
                    <span className="text-gray-400 text-sm">{player.university}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold">Rs. {player.cost.toLocaleString()}</span>
                    <button
                      onClick={() => handleAddPlayer(player)}
                      className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                      aria-label={`Add ${player.name} to team`}
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Your Team Section */}
        <div className="bg-gray-900 p-4 md:p-6 rounded-xl shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl md:text-2xl text-gray-200">Your Team</h3>
            {team.length > 0 && (
              <button
                onClick={handleClearTeam}
                className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Clear team"
              >
                Clear Team
              </button>
            )}
          </div>
          {team.length === 0 ? (
            <p className="text-gray-500">No players selected yet</p>
          ) : (
            <div className="space-y-4">
              {team.map((player) => (
                <div
                  key={player.name}
                  className="flex flex-col md:flex-row justify-between items-center bg-gray-700 p-4 rounded-xl hover:bg-gray-600 transition duration-300"
                >
                  <div className="text-white font-medium mb-2 md:mb-0">
                    {player.name} - {player.university}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-yellow-400 font-bold">Rs. {player.cost.toLocaleString()}</span>
                    <button
                      onClick={() => handleRemovePlayer(player)}
                      className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                      aria-label={`Remove ${player.name} from team`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirmation Dialog for Removing Players */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm w-full">
              <h3 className="text-xl text-white mb-4">Confirm Removal</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to remove {showConfirmDialog.name} from your team?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmDialog(null)}
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRemovePlayer}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label="Confirm removal"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetView;