import { db } from '../config/firebase.config';
import { User } from '../entities/user';

const USERS_COLLECTION = 'USERS';

export const fetchUserData = async (userId: string): Promise<User | null> => {
    const userDoc = await db.collection(USERS_COLLECTION).doc(userId).get();
    return userDoc.exists ? (userDoc.data() as User) : null;
};

export const updateUserData = async (userId: string, data: Partial<User>): Promise<void> => {
    await db.collection(USERS_COLLECTION).doc(userId).update(data);
};