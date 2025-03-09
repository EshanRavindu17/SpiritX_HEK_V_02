import { db } from "../config/firebaseAdmin.js";
import { randomBytes, randomUUID } from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import admin from 'firebase-admin';

const sendAdminPasswordResetLink = async (req, res) => {
    console.log("777777")
    try {
        const { email } = req.body;

        // Input validation
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: "Valid email is required" });
        }
        console.log("email :",email)
        console.log('user emai',req.user)
      

        // Generate a secure random reset token and a short code
        const resetToken = randomBytes(20).toString("hex"); // 40 chars
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
        console.log("here")
        
        // Hash the token and code before storing
        const hashedToken = await bcrypt.hash(resetToken, 10);
        const hashedCode = await bcrypt.hash(resetCode, 10);

        // Use a unique ID for the reset request
        const resetId = randomUUID();
        await db.collection("passwordResets").doc(resetId).set({
            email,
            token: hashedToken,
            code: hashedCode,
            expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes expiry
        });

        // Reset link with resetId (no token in URL)
        const resetLink = `http://localhost:5175/reset-password?id=${resetId}`;

        // Secure email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            secure: true, // Enforce TLS
            tls: { rejectUnauthorized: true },
        });
      
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `
                <h2>Password Reset Request</h2>
                <p>Your reset code is: <strong>${resetCode}</strong></p>
                <p>Click the link below and enter the code to reset your password:</p>
                <a href="${resetLink}" target="_blank">${resetLink}</a>
                <p>This link and code will expire in 15 minutes.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `,
        });
        console.log("444444444444444444")

        // Log the attempt (avoid logging sensitive data)
        console.log(`Password reset requested for ${email} at ${new Date().toISOString()}`);

        return res.status(200).json({ success: true, message: "Reset link and code sent to email" });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isPasswordValid = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

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



const resetAdminPassword = async (req, res) => {
    const { uid } = req.user; 
    try {
      const { resetId, code, newPassword } = req.body;
  
      // Input validation
      if (!resetId || !code || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }
      if (!isPasswordValid(newPassword)) {
        return res.status(400).json({
          message: "Password must be at least 8 characters with an uppercase letter and a number",
        });
      }
  
      // Retrieve stored reset data from DB
      const doc = await db.collection("passwordResets").doc(resetId).get();
      if (!doc.exists) {
        return res.status(400).json({ message: "Invalid or expired reset request" });
      }
  
      const { email, token: hashedToken, code: hashedCode, expiresAt } = doc.data();
  
      // Check if the request is expired
      if (Date.now() > expiresAt) {
        await db.collection("passwordResets").doc(resetId).delete(); // Cleanup
        return res.status(400).json({ message: "Reset request expired. Please request a new one." });
      }
  
      // Compare provided code with hashed code
      const isCodeMatch = await bcrypt.compare(code, hashedCode);
      if (!isCodeMatch) {
        return res.status(400).json({ message: "Invalid reset code" });
      }
  console.log("user :",uid)
  console.log("new password :",newPassword)
      // Hash the new password and update the admin's password
      
    ;
      await admin.auth().updateUser(uid, {
        password: newPassword,
      });
  
      // Delete the reset request from DB after success
      await db.collection("passwordResets").doc(resetId).delete();
  
      // Log the success
      console.log(`Password reset successful for ${email} at ${new Date().toISOString()}`);
  
      return res.status(200).json({ success: true, message: "Password updated successfully" });
  
    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
 

export {addPlayer,getPlayers,getPlayer,updatePlayer,deletePlayer,getTournamentSummary,sendAdminPasswordResetLink,resetAdminPassword}