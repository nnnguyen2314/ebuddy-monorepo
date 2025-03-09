import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase.config';

export const authMiddleware = async (request: any, response: any, next: any) => {
    const headerToken = request?.headers.authorization || '';
    const token = headerToken?.split(' ')[1];

    if (!token) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await auth.verifyIdToken(token);
        next();
    } catch (error) {
        response.status(403).json({ message: 'Forbidden' });
    }
};