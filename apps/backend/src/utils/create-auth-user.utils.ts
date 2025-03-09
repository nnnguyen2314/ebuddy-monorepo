import {auth, db} from "../config/firebase.config";
import dotenv from "dotenv";

dotenv.config();

const createUser = async () => {
    try {
        const user = await auth.createUser({
            email: process.env.SAMPLE_USER_EMAIL as string,
            password: process.env.SAMPLE_USER_PASSWORD as string,
            displayName: process.env.SAMPLE_USER_DISPLAY_NAME as string,
        });
        console.log("User created:", user.uid);

        const totalAverageWeightRatings = Math.random() * 4.5 + 1;
        const numberOfRents = Math.floor(Math.random() * 100) + 1;
        const recentlyActive = Date.now();
        const rankingScore = (totalAverageWeightRatings * 1000) + numberOfRents + (recentlyActive / 1000000);

        await db.collection("USERS").doc(user.uid).set({
            id: user.uid,
            name: process.env.SAMPLE_USER_DISPLAY_NAME as string,
            email: process.env.SAMPLE_USER_EMAIL as string,
            totalAverageWeightRatings,
            numberOfRents,
            recentlyActive,
            rankingScore,
        });
        console.log("User added to Firestore!");
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

createUser();