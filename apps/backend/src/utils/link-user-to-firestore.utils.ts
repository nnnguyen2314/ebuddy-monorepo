import { db } from "../config/firebase.config";
import dotenv from "dotenv";

dotenv.config();

const linkUserToFirestore = async () => {
    const userId = process.env.SAMPLE_USER_ID as string;

    const totalAverageWeightRatings = Math.random() * 4.5 + 1;
    const numberOfRents = Math.floor(Math.random() * 100) + 1;
    const recentlyActive = Date.now();
    const rankingScore = (totalAverageWeightRatings * 1000) + numberOfRents + (recentlyActive / 1000000);

    await db.collection("USERS").doc(userId).set({
        id: userId,
        name: process.env.SAMPLE_USER_DISPLAY_NAME as string,
        email: process.env.SAMPLE_USER_EMAIL as string,
        totalAverageWeightRatings,
        numberOfRents,
        recentlyActive,
        rankingScore,
    });

    console.log("User added to Firestore!");
};

linkUserToFirestore();
