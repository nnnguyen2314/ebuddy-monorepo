import { updateUserData } from '@/shared/apis/userApi';
import { useAppSelector } from '@/shared/hooks';
import { getAuthState } from '@/features/auth/store/auth.selectors';
import useAppDispatch from '@/shared/hooks/useAppDispatch';
import { showNotification } from '@/shared/store/notification.slice';

export const useUpdateButton = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getAuthState);
  const handleUpdate = async () => {
    const userData = {
      numberOfRents: 35,
      totalAverageWeightRatings: 4.5,
      recentlyActive: Date.now(),
      rankingScore: (4.5 * 1000) + (35 * 10) + (Date.now()/1000000) // RANKING_SCORE = (totalAverageWeightRatings * 1000) + (numberOfRents * 10) + (recentlyActive / 1000000);
    }
    try {
      await updateUserData(user?.uid, { numberOfRents: 35,  });
      dispatch(showNotification({ message: 'User updated successfully!', type: 'success' }));
    } catch (error) {
      console.error('Failed to update user data', error);
      dispatch(showNotification({ message: 'Failed to update user!', type: 'error' }));
    }
  };

  return { handleUpdate };
};
