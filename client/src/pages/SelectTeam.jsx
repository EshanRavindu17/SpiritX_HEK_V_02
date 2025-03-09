import React, { useState, useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Categories must match backend exactly
const categories = ['Batters', 'Bowlers', 'All-rounders'];

const initialBudget = 9000000; // Rs.9,000,000
const maxTeamSize = 11; // Maximum number of players allowed

const SelectTeamView = () => {
  const [team, setTeam] = useState([]);
  const [budget, setBudget] = useState(initialBudget);
  const [selectedCategory, setSelectedCategory] = useState('Batters');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = localStorage.getItem("id");

  const [Batters, setBatters] = useState([]);
  const [Bowlers, setBowlers] = useState([]);
  const [Allrounders, setAllrounders] = useState([]);

  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  // Fetch players from backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/getfilterplayers/${id}`);
        if (response.data.success) {
          setBatters(response.data.batsmans || []);
          setBowlers(response.data.bowlers || []);
          setAllrounders(response.data.allRounders || []);
          
          // Set team and update budget based on selected players
          const selectedPlayers = response.data.selectedPlayers || [];
          setTeam(selectedPlayers);
          
          // Calculate total cost of selected players and update budget
          const totalCost = selectedPlayers.reduce((sum, player) => sum + (player.cost || 0), 0);
          setBudget(initialBudget - totalCost);

          console.log("Fetched data:", response.data); // Debug backend response
        } else {
          toast.error("Failed to load players from server.");
        }
      } catch (error) {
        toast.error("Error fetching players. Please try again.");
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Map category to state (simplified without useMemo for now)
  const categoryData = {
    Batters,
    Bowlers,
    'All-rounders': Allrounders,
  };

  // Filtered players (simplified without useMemo for now)
  const filteredPlayers = (categoryData[selectedCategory] || []).filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUniversity = selectedUniversity
      ? player.university === selectedUniversity
      : true;
    const notInTeam = !team.find((p) => p.name === player.name);
    return matchesSearch && matchesUniversity && notInTeam;
  });

  // Calculate category counts directly (no useMemo)
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = team.filter((player) => player.category === category).length;
    return acc;
  }, {});
  console.log("Team state:", team); // Debug team state
  console.log("Category counts:", categoryCounts); // Debug counts

  // Handle adding a player to the team
  const handleAddPlayer = (player) => {
    if (team.length >= maxTeamSize) {
      toast.error(`Team is full! Maximum ${maxTeamSize} players allowed.`);
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
    const updatedPlayer = { ...player, category: player.category || selectedCategory };
    setTeam((prevTeam) => {
      const newTeam = [...prevTeam, updatedPlayer];
      console.log("After adding player, new team:", newTeam); // Debug team after adding
      return newTeam;
    });
    setBudget((prevBudget) => prevBudget - player.cost);
    toast.success(`${player.name} added to your team!`);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  // Handle removing a player from the team
  const handleRemovePlayer = (player) => {
    setShowConfirmDialog(player);
  };

  const confirmRemovePlayer = () => {
    if (showConfirmDialog) {
      setTeam((prevTeam) => {
        const newTeam = prevTeam.filter((p) => p.name !== showConfirmDialog.name);
        console.log("After removing player, new team:", newTeam); // Debug team after removing
        return newTeam;
      });
      setBudget((prevBudget) => prevBudget + showConfirmDialog.cost);
      toast.error(`${showConfirmDialog.name} removed from your team.`);
      setShowConfirmDialog(null);
    }
  };

  // Clear the entire team
  const handleClearTeam = async() => {

    const response = await axios.post('http://localhost:4000/api/user/clearteam', { id });
    if (response.data.success) {
      toast.success('Team cleared successfully!');
      setTeam([]);
      setBudget(initialBudget);
      navigate('/home')
    }
    
    toast.success('Team cleared successfully!');
  };

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setIsDropdownOpen(!!event.target.value);
  };

  // Handle selecting a player from the search dropdown
  const handleSelectPlayer = (player) => {
    handleAddPlayer(player);
  };

  // Handle university filter
  const handleFilter = (event) => setSelectedUniversity(event.target.value);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  // Handle team submission
  const handleSubmitTeam = async () => {
    console.log('Team submitted:', team);
    console.log("id", id); // Debug team submission

    try {
      const response = await axios.post('http://localhost:4000/api/user/submitteam', 
        { team, id }
      );
      if (response.data.success) {
        toast.success('Team submitted successfully!');
      }
    } catch (error) {
      toast.error('Failed to submit team. Please try again.');
      console.error('Error submitting team:', error);
    }
  };

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

  // Calculate budget usage percentage
  const budgetUsagePercentage = ((initialBudget - budget) / initialBudget) * 100;

  // Get all universities (simplified without useMemo)
  const allUniversities = Array.from(
    new Set([Batters, Bowlers, Allrounders].flat().map((player) => player.university).filter(Boolean))
  );

  // Team completeness status
  const teamCompleteness = `${team.length}/${maxTeamSize} players selected`;

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#d1d5db] via-[#e5e7eb] to-[#f3f4f6] flex items-center justify-center">
        <p className="text-white text-xl">Loading players...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#d1d5db] via-[#e5e7eb] to-[#f3f4f6] text-white flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} aria-live="polite" />
      {/* Header Section - Moved outside the container */}
      <div className="relative bg-black  p-4 sm:p-6 md:p-8 flex justify-center items-center shadow-xl  border-black w-full">
        <div className="flex justify-center items-center h-7 w-full">
          <h2 
            className="sm:text-xl md:text-5xl font-extrabold tracking-wider drop-shadow-md text-white"
            style={{ fontFamily: "'Copperplate', 'Palatino Linotype', 'Arial Black', sans-serif" }}
          >
            Manage Your Fantasy Team
          </h2>
        </div>
      </div>

      {/* Container for the rest of the content */}
      <div className="container mx-auto max-w-6xl bg-transparent">
        {/* Category Selector */}
        <div className="mb-6 mt-4 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 md:px-6 md:py-2 text-sm md:text-lg font-semibold rounded-full transition duration-300 ease-in-out 
                ${selectedCategory === category 
                  ? 'bg-indigo-600 text-white shadow-lg transform scale-110' 
                  : 'bg-gray-200 text-gray-800 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400'}`}
              aria-label={`Select ${category} category`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-8 relative">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder={`Search ${selectedCategory}`}
              aria-label={`Search ${selectedCategory} by name or university`}
              className="p-4 w-full bg-gray-800 text-white bg-opacity-90 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm uppercase tracking-wide placeholder-gray-400 transition-all duration-300"
              value={searchTerm}
              onChange={handleSearch}
              ref={searchInputRef}
            />
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

          <select
            className="mt-4 md:mt-0 p-4 w-full md:w-1/3 bg-gray-800 bg-opacity-90 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm uppercase tracking-wide text-white transition-all duration-300"
            value={selectedUniversity}
            onChange={handleFilter}
            aria-label="Filter by university"
          >
            <option value="">All Universities</option>
            {allUniversities.map((university) => (
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
          <h3 className="text-xl md:text-2xl text-gray-200 mb-4">Available {selectedCategory}</h3>
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
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl md:text-2xl text-gray-200">Your Team</h3>
                <span className="text-sm md:text-lg text-yellow-400 font-semibold bg-gray-800 px-2 py-1 rounded-full">
                  {teamCompleteness}
                </span>
              </div>
              <div className="text-sm md:text-base text-gray-400" key={team.length}>
                {categories.map((category) => (
                  <span key={category} className="mr-4">
                    {category}: {categoryCounts[category] || 0}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-2 md:mt-0 flex space-x-4">
              {team.length > 0 && (
                <button
                  onClick={handleClearTeam}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label="Clear team"
                >
                  Clear Team
                </button>
              )}
              {team.length === maxTeamSize && (
                <button
                  onClick={handleSubmitTeam}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Submit team"
                >
                  Submit Team
                </button>
              )}
            </div>
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
                  <div className="flex flex-col mb-2 md:mb-0">
                    <span className="text-white font-medium">{player.name} ({player.category})</span>
                    <span className="text-gray-400 text-sm">{player.university}</span>
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

        {/* Confirmation Dialog */}
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

export default SelectTeamView;
