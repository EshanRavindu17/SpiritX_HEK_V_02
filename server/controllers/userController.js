import { db } from "../config/firebaseAdmin.js";


const getPlayers = async (req, res) => {
    try{
        const snapshot = await db.collection('players').get();
        const players = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(players);
        res.status(200).json({success:true,players});
    }catch(error){
        res.status(500).json({success:false,message:"Failed to fetch players"});
    }
}

const getfilterplayers = async (req, res) => {
    try {
        // Check if db is initialized
        if (!db) {
            throw new Error("Firestore database not initialized");
        }

        // Get owner from request (assuming it's passed as a route parameter)
        const owner = req.params.id; // e.g., /api/players/:id
        console.log("Owner ID:", owner);
        if (!owner) {
            throw new Error("Owner parameter is required");
        }

        // Get selected player IDs from teams collection
        const teamSnapshot = await db.collection("teams")
            .where("owner", "==", owner)
            .get();

        let selectedPlayerIds = [];
        if (!teamSnapshot.empty) {
            const teamData = teamSnapshot.docs[0].data();
            selectedPlayerIds = teamData.players || [];
        }

        // Fetch all players in parallel
        const [batSnapshot, ballSnapshot, allSnapshot] = await Promise.all([
            db.collection("players").where("category", "==", "Batsman").get(),
            db.collection("players").where("category", "==", "Bowler").get(),
            db.collection("players").where("category", "==", "All-Rounder").get(),
        ]);

        // Function to calculate player cost
        const calculatePlayerCost = (player) => {
            const battingStrikeRate = player.ballsFaced > 0 ? (player.totalRuns / player.ballsFaced) * 100 : 0;
            const battingAverage = player.inningsPlayed > 0 ? player.totalRuns / player.inningsPlayed : 0;
            const bowlingStrikeRate = player.wickets > 0 ? (player.oversBowled * 6) / player.wickets : Infinity;
            const economyRate = player.oversBowled > 0 ? (player.runsConceded / (player.oversBowled * 6)) * 6 : Infinity;

            const playerPoints =
                (battingStrikeRate / 5) +
                (battingAverage * 0.8) +
                (bowlingStrikeRate === Infinity ? 0 : 500 / bowlingStrikeRate) +
                (economyRate === Infinity ? 0 : 140 / economyRate);

            return Math.round(((9 * playerPoints + 100) * 1000) / 50000) * 50000;
        };

        // Process players (shared function for both selected and unselected)
        const processPlayers = (doc) => {
            const player = { id: doc.id, ...doc.data() };
            const playerValue = calculatePlayerCost(player);
            return {
                id: player.id,
                name: player.name,
                university: player.university,
                cost: playerValue,
                category: player.category,
            };
        };

        // Process unselected players by category
        const batsmans = batSnapshot.docs
            .filter(doc => !selectedPlayerIds.includes(doc.id))
            .map(processPlayers);
        const bowlers = ballSnapshot.docs
            .filter(doc => !selectedPlayerIds.includes(doc.id))
            .map(processPlayers);
        const allRounders = allSnapshot.docs
            .filter(doc => !selectedPlayerIds.includes(doc.id))
            .map(processPlayers);

        // Fetch and process selected players individually
        let selectedPlayers = [];
        if (selectedPlayerIds.length > 0) {
            const selectedPromises = selectedPlayerIds.map(id =>
                db.collection("players").doc(id).get()
            );
            const selectedDocs = await Promise.all(selectedPromises);
            selectedPlayers = selectedDocs
                .filter(doc => doc.exists) // Ensure the document exists
                .map(processPlayers);
        }

        res.status(200).json({
            success: true,
            batsmans, // Only unselected Batsmen
            bowlers,  // Only unselected Bowlers
            allRounders, // Only unselected All-Rounders
            selectedPlayers, // All selected players (Batsmen, Bowlers, All-Rounders)
            selectedCount: selectedPlayerIds.length,
        });
    } catch (error) {
        console.error("Error filtering players:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch players",
            error: error.message,
        });
    }
};


const submitTeam = async (req, res) => {
    try {
        const { team, id } = req.body;
        console.log("team:", team);
        console.log("id:", id);

        if (!db) {
            throw new Error("Firestore database not initialized");
        }

        // Validate input
        if (!Array.isArray(team) || team.length !== 11) {
            throw new Error("Team must be an array of exactly 11 players");
        }
        if (!id) {
            throw new Error("Owner ID is required");
        }

        // Extract only player IDs from the team array
        const playerIds = team.map(player => {
            if (!player.id) {
                throw new Error("Each player must have an 'id' field");
            }
            return player.id;
        });

        // Step 1: Check if a team already exists for the owner
        const teamSnapshot = await db.collection("teams")
            .where("owner", "==", id)
            .get();

        if (!teamSnapshot.empty) {
            // Step 2: Team exists - Update the existing team
            const existingTeamDoc = teamSnapshot.docs[0]; // Assuming one team per owner
            const teamRef = existingTeamDoc.ref;

            await teamRef.update({
                players: playerIds, // Replace old players with new ones
                updatedAt: new Date().toISOString() // Optional: track update time
            });

            res.status(200).json({
                success: true,
                id: existingTeamDoc.id,
                message: "Team updated successfully"
            });
        } else {
            // Step 3: No team exists - Create a new team
            const teamDoc = await db.collection("teams").add({
                players: playerIds,
                owner: id,
                createdAt: new Date().toISOString() // Optional: track creation time
            });

            res.status(200).json({
                success: true,
                id: teamDoc.id,
                message: "Team created successfully"
            });
        }
    } catch (error) {
        console.error("Error submitting team:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit team",
            error: error.message,
        });
    }
};


const getTeam = async (req, res) => {
    try {
        // Assuming the owner's ID is passed in the request body or as a query parameter
        const  ownerId  = req.params; // Adjust based on how you send the owner ID (e.g., req.query.ownerId or req.user.id if using auth middleware)
        console.log("ownerId:", ownerId.id);
        if (!ownerId) {
            return res.status(400).json({
                success: false,
                message: "Owner ID is required",
            });
        }

        if (!db) {
            throw new Error("Firestore database not initialized");
        }

        // Fetch the team document for the given owner
        const teamSnapshot = await db.collection("teams")
            .where("owner", "==", ownerId.id)
            .limit(1) // Assuming each owner has only one team
            .get();

            
        if (teamSnapshot.empty) {
            return res.status(404).json({
                success: false,
                message: "No team found for this owner",
            });
        }

        // Get the first (and assumed only) team document
        const teamDoc = teamSnapshot.docs[0];
        const teamData = teamDoc.data();
        const playerIds = teamData.players; // Array of 11 player IDs

        if (!Array.isArray(playerIds) ) {
            return res.status(400).json({
                success: false,
                message: "Team must contain exactly 11 player IDs",
            });
        }

        // Fetch player details for all 11 player IDs
        const playerPromises = playerIds.map(async (playerId) => {
            const playerDoc = await db.collection("players").doc(playerId).get();
            if (!playerDoc.exists) {
                throw new Error(`Player with ID ${playerId} not found`);
            }
            const playerData = playerDoc.data();
            return {
                id: playerId,
                name: playerData.name,
                university: playerData.university,
                points: calculatePlayerPoints(playerData), // Calculate points dynamically
            };
        });

        // Resolve all player data promises
        const players = await Promise.all(playerPromises);

        // Return the team with enriched player data
        res.status(200).json({
            success: true,
            team: {
                id: teamDoc.id,
                players: players,
                owner: ownerId,
            },
        });
    } catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch team",
            error: error.message,
        });
    }
};

// Helper function to calculate player points (adjust based on your logic)
const calculatePlayerPoints = (player) => {
    const battingStrikeRate = player.ballsFaced > 0 ? (player.totalRuns / player.ballsFaced) * 100 : 0;
    const battingAverage = player.inningsPlayed > 0 ? player.totalRuns / player.inningsPlayed : 0;
    const bowlingStrikeRate = player.wickets > 0 ? (player.oversBowled * 6) / player.wickets : Infinity;
    const economyRate = player.oversBowled > 0 ? (player.runsConceded / (player.oversBowled * 6)) * 6 : Infinity;

    const points = 
        (battingStrikeRate / 5) +
        (battingAverage * 0.8) +
        (bowlingStrikeRate === Infinity ? 0 : 500 / bowlingStrikeRate) +
        (economyRate === Infinity ? 0 : 140 / economyRate);

    return Math.round(points); // Adjust rounding or formula as needed
};


const removePlayer = async (req, res) => {
    try {
        console.log("awaaaaaaaa")
        const { player_id, id } = req.body;

        // Validate input
        if (!player_id || !id) {
            return res.status(400).json({
                success: false,
                message: "player_id and id (owner) are required",
            });
        }

        // Check if db is initialized
        if (!db) {
            throw new Error("Firestore database not initialized");
        }

        // Find the team by owner (id)
        const teamSnapshot = await db.collection("teams")
            .where("owner", "==", id)
            .get();

        if (teamSnapshot.empty) {
            return res.status(404).json({
                success: false,
                message: "No team found for the specified owner",
            });
        }

        // Assuming only one team per owner; get the first document
        const teamDoc = teamSnapshot.docs[0];
        const teamRef = teamDoc.ref;
        const teamData = teamDoc.data();
        const currentPlayers = teamData.players || [];

        // Check if player exists in the team
        if (!currentPlayers.includes(player_id)) {
            return res.status(400).json({
                success: false,
                message: "Player not found in this team",
            });
        }

        // Remove the player_id from the players array
        const updatedPlayers = currentPlayers.filter(pid => pid !== player_id);

        // Update the team document in Firestore
        await teamRef.update({
            players: updatedPlayers
        });

        res.status(200).json({
            success: true,
            message: "Player removed successfully",
            teamId: teamDoc.id,
            removedPlayerId: player_id,
            updatedPlayerCount: updatedPlayers.length
        });

    } catch (error) {
        console.error("Error removing player:", error);
        res.status(500).json({
            success: false,
            message: "Failed to remove player",
            error: error.message,
        });
    }
};

const getLeaderboard = async (req, res) => {
    try {
        // Check if db is initialized
        if (!db) {
            throw new Error("Firestore database not initialized");
        }
        console.log("leaderboard");

        // Define the calculatePlayerPoints function within scope
        const calculatePlayerPoints = (player) => {
            const battingStrikeRate = player.ballsFaced > 0 ? (player.totalRuns / player.ballsFaced) * 100 : 0;
            const battingAverage = player.inningsPlayed > 0 ? player.totalRuns / player.inningsPlayed : 0;
            const bowlingStrikeRate = player.wickets > 0 ? (player.oversBowled * 6) / player.wickets : Infinity;
            const economyRate = player.oversBowled > 0 ? (player.runsConceded / (player.oversBowled * 6)) * 6 : Infinity;

            const points = 
                (battingStrikeRate / 5) +
                (battingAverage * 0.8) +
                (bowlingStrikeRate === Infinity ? 0 : 500 / bowlingStrikeRate) +
                (economyRate === Infinity ? 0 : 140 / economyRate);

            return Math.round(points); // Adjust rounding or formula as needed
        };

        // Step 1: Fetch all teams from the teams collection
        const teamsSnapshot = await db.collection("teams").get();
        if (teamsSnapshot.empty) {
            return res.status(200).json({
                success: true,
                leaderboard: [],
                message: "No teams found"
            });
        }

        // Step 2: Process each team
        const leaderboardPromises = teamsSnapshot.docs.map(async (teamDoc) => {
            const teamData = teamDoc.data();
            const ownerId = teamData.owner; // userId
            const playerIds = teamData.players || []; // Array of player IDs

            // Step 3: Fetch owner details (assuming a 'users' collection with 'id' and 'name')
            const ownerSnapshot = await db.collection("users").doc(ownerId).get();
            const ownerName = ownerSnapshot.exists ? ownerSnapshot.data().name : "Unknown User";

            // Step 4: Fetch player details and calculate total points using calculatePlayerPoints
            let totalPoints = 0;
            if (playerIds.length > 0) {
                const playerPromises = playerIds.map(id => db.collection("players").doc(id).get());
                const playerDocs = await Promise.all(playerPromises);
                totalPoints = playerDocs
                    .filter(doc => doc.exists) // Ensure player exists
                    .reduce((sum, doc) => {
                        const playerData = doc.data();
                        const playerPoints = calculatePlayerPoints(playerData);
                        return sum + playerPoints;
                    }, 0);
            }

            return {
                ownerName,
                totalPoints
            };
        });

        // Step 5: Resolve all promises and sort by totalPoints
        const leaderboard = await Promise.all(leaderboardPromises);
        leaderboard.sort((a, b) => b.totalPoints - a.totalPoints); // Descending order
        console.log("Leaderboard data:", leaderboard);

        // Step 6: Send response to frontend
        res.status(200).json({
            success: true,
            leaderboard,
            message: "Leaderboard fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch leaderboard",
            error: error.message
        });
    }
};

const clearTeam = async (req, res) => {
    try {
        const user_obj  = req.body;
        console.log("user_obj:", user_obj.id);

        if (!db) {
            throw new Error("Firestore database not initialized");
        }

        if (!user_obj.id) {
            return res.status(400).json({
                success: false,
                message: "Owner ID is required",
            });
        }

        // Find the team by owner (id)
        const teamSnapshot = await db.collection("teams")
            .where("owner", "==", user_obj.id)
            .get();

        if (teamSnapshot.empty) {
            return res.status(404).json({
                success: false,
                message: "No team found for the specified owner",
            });
        }

        // Assuming only one team per owner; get the first document
        const teamDoc = teamSnapshot.docs[0];
        const teamRef = teamDoc.ref;

        // Delete the team document from Firestore
        await teamRef.delete();

        res.status(200).json({
            success: true,
            message: "Team deleted successfully",
            teamId: teamDoc.id,
        });

    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete team",
            error: error.message,
        });
    }
};

export { getPlayers,getfilterplayers ,submitTeam,getTeam,removePlayer,getLeaderboard,clearTeam};