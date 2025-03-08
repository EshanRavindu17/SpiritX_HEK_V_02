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

export { getPlayers };