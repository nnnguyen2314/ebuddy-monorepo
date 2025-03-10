import UpdateButton from '@/features/dashboard/components/UpdateButton';
import ProtectedRoute from '@/shared/components/ProtectedRoute';
import { Box, Typography } from '@mui/material';
import UserData from "@/features/user/components/UserData";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">User Dashboard</Typography>
        <UserData />
      </Box>
    </ProtectedRoute>
  );
};

export default Dashboard;
