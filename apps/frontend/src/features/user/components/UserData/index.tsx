'use client';

import React, {useState} from 'react';
import {Button, TextField, Box, Typography, Stack} from '@mui/material';
import { useUserData } from './useUserData';
import {useAppSelector} from "@/shared/hooks";
import {getAuthState} from "@/features/auth/store/auth.selectors";

const UserData = () => {
    const { user: userData, loading, handleFetchUserData, handleUpdateUserData } = useUserData();
    const { user: userAccount } = useAppSelector(getAuthState);
    const [showUserData, setShowUserData] = useState(false);

    const onShowUserData = async () => {
        await handleFetchUserData(userAccount?.uid);
        setShowUserData(true);
    }

    const onHideUserData = async () => {
        setShowUserData(false);
    }

    const onUpdateUser = async () => {
        const userData = {
            numberOfRents: 35,
            totalAverageWeightRatings: 4.5,
            recentlyActive: Date.now(),
            rankingScore: 4.5 * 1000 + 35 * 10 + Date.now() / 1000000, // RANKING_SCORE = (totalAverageWeightRatings * 1000) + (numberOfRents * 10) + (recentlyActive / 1000000);
        };
        await handleUpdateUserData(userAccount?.uid, userData);
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6">User Info:</Typography>
            {showUserData && userData ? (
                <Stack direction="column">
                    <Typography>Email: {userData.email}</Typography>
                    <Typography>Rents: {userData.numberOfRents}</Typography>
                    <Typography>Total Average Weight Ratings: {userData.totalAverageWeightRatings}</Typography>
                    <Typography>Ranking Score: {userData.rankingScore}</Typography>
                    <Button variant="contained" color="primary" onClick={onUpdateUser} disabled={loading}>
                        {loading ? "Updating..." : "Update User Data"}
                    </Button>
                </Stack>
            ) : (
                <Typography>No user data available.</Typography>
            )}

            <Button variant="contained" color="primary" onClick={showUserData ? onHideUserData : onShowUserData} disabled={loading}>
                {loading ? "Fetching..." : (showUserData ? 'Hide User Data' : 'Display User Data')}
            </Button>
        </Box>
    );
};

export default UserData;
