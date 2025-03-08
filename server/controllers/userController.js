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
        // Check if db is initialized (assuming db is imported from a config file)
        if (!db) {
            throw new Error("Firestore database not initialized");
        }

        // Fetch all players in parallel for better performance
        const [batSnapshot, ballSnapshot, allSnapshot] = await Promise.all([
            db.collection("players").where("category", "==", "Batsman").get(),
            db.collection("players").where("category", "==", "Bowler").get(),
            db.collection("players").where("category", "==", "All-Rounder").get(),
        ]);

        // Function to calculate player cost
        const calculatePlayerCost = (player) => {
            const battingStrikeRate = player.ballsFaced > 0 ? (player.totalRuns / player.ballsFaced) * 100 : 0;
            const battingAverage = player.inningsPlayed > 0 ? player.totalRuns / player.inningsPlayed : 0;
            const bowlingStrikeRate = player.wickets > 0 ? (player.oversBowled * 6) / player.wickets : Infinity; // Use Infinity for no wickets
            const economyRate = player.oversBowled > 0 ? (player.runsConceded / (player.oversBowled * 6)) * 6 : Infinity; // Use Infinity for no overs

            const playerPoints =
                (battingStrikeRate / 5) +
                (battingAverage * 0.8) +
                (bowlingStrikeRate === Infinity ? 0 : 500 / bowlingStrikeRate) + // 0 points if no wickets
                (economyRate === Infinity ? 0 : 140 / economyRate); // 0 points if no overs bowled

            return Math.round(((9 * playerPoints + 100) * 1000) / 50000) * 50000;
        };

        // Process players for each category
        const processPlayers = (snapshot) =>
            snapshot.docs.map((doc) => {
                const player = { id: doc.id, ...doc.data() };
                const playerValue = calculatePlayerCost(player);
                return {
                    id: player.id,
                    name: player.name,
                    university: player.university,
                    cost: playerValue, // Keep as number
                    category: player.category,
                };
            });

        const batsmans = processPlayers(batSnapshot);
        const bowlers = processPlayers(ballSnapshot);
        const allRounders = processPlayers(allSnapshot);

        res.status(200).json({ success: true, batsmans, bowlers, allRounders });
    } catch (error) {
        console.error("Error filtering players:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch players",
            error: error.message, // Provide more context
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

        // Create a new team document with only player IDs
        const teamDoc = await db.collection("teams").add({
            players: playerIds,
            owner: id
        });

        // Return the ID of the newly created team
        res.status(200).json({ success: true, id: teamDoc.id });
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

        if (!Array.isArray(playerIds) || playerIds.length !== 11) {
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




export { getPlayers,getfilterplayers ,submitTeam,getTeam};