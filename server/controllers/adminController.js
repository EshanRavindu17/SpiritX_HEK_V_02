import { db } from "../config/firebaseAdmin.js";

const addPlayer = async (req, res) => {
    try{
        const playerData=req.body
        console.log(playerData);
        const playerDoc = await db.collection('players').add(playerData);
        if(playerDoc.id){
            res.status(200).json({success:true,message:"Player added successfully"});
        }
    }catch(error){
        res.status(500).json({success:false,message:"Failed to add player"});
    }
}

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

const getPlayer = async (req, res) => {
    try{
        const playerDoc = await db.collection('players').doc(req.params.id).get();
        if(playerDoc.exists){
            console.log("Dataaa",playerDoc.data());
            res.status(200).json({success:true,player:playerDoc.data()});
        }else{
            res.status(404).json({success:false,message:"Player not found"});
        }
    }catch(error){
        res.status(500).json({success:false,message:"Failed to fetch player"});
    }
}

const updatePlayer = async (req, res) => {
    try{
        const playerData=req.body
        const playerDoc = await db.collection('players').doc(req.params.id).update(playerData);
        if(playerDoc){
            res.status(200).json({success:true,message:"Player updated successfully"});
        }
    }catch(error){
        res.status(500).json({success:false,message:"Failed to update player"});
    }
}

const deletePlayer = async (req, res) => {
    try{
        const playerDoc = await db.collection('players').doc(req.params.id).delete();
        if(playerDoc){
            res.status(200).json({success:true,message:"Player deleted successfully"});
        }
    }catch(error){
        res.status(500).json({success:false,message:"Failed to delete player"});
    }
}

const getTournamentSummary = async (req, res) => {
    try {
        const snapshot = await db.collection('players').get();
        const players = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const totalPlayers = players.length;
        const totalRuns = players.reduce((total, player) => total + Number(player.totalRuns || 0), 0);
        const totalWickets = players.reduce((total, player) => total + Number(player.wickets || 0), 0);

        // Find highest run scorer
        const highestRunScorer = players.length > 0
            ? players.reduce((max, player) => (Number(player.totalRuns || 0) > Number(max.totalRuns || 0) ? player : max), players[0])
            : null;

        // Find highest wicket taker
        const highestWicketTaker = players.length > 0
            ? players.reduce((max, player) => (Number(player.wickets || 0) > Number(max.wickets || 0) ? player : max), players[0])
            : null;

        res.status(200).json({
            success: true,
            totalPlayers,
            totalRuns,
            totalWickets,
            highestRunScorer: highestRunScorer 
                ? { name: highestRunScorer.name, runs: highestRunScorer.totalRuns, image: highestRunScorer.image || null }
                : null,
            highestWicketTaker: highestWicketTaker 
                ? { name: highestWicketTaker.name, wickets: highestWicketTaker.wickets, image: highestWicketTaker.image || null }
                : null
        });
    } catch (error) {
        console.error("Error fetching tournament summary:", error);
        res.status(500).json({ success: false, message: "Failed to fetch tournament summary", error: error.message });
    }
};



export {addPlayer,getPlayers,getPlayer,updatePlayer,deletePlayer,getTournamentSummary}