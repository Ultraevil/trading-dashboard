import { useLogoutMutation } from '@/services/api/userApi';
import { useAppDispatch } from '@/app/hooks';
import { marketSocket } from '@/services/websocket/marketSocket';
import { logout as logoutAction } from './authSlice';

export const useLogout = () => {
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      await logoutMutation({ refreshToken });
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');

    dispatch(logoutAction());
    marketSocket.updateAuthToken();
  };

  return { logout };
};
