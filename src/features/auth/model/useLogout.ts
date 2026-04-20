import { useLogoutMutation } from '../api/authApi';

export const useLogout = () => {
  const [logoutMutation] = useLogoutMutation();

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      await logoutMutation({ refreshToken });
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return { logout };
};
