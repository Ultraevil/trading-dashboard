import { useLoginMutation } from '@/services/api/userApi';
import { useAppDispatch } from '@/app/hooks';
import { marketSocket } from '@/services/websocket/marketSocket';
import { setTokens } from './authSlice';

export const useLogin = () => {
  const [loginMutation, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    const res = await loginMutation({ email, password }).unwrap();

    dispatch(setTokens({ ...res, email }));

    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('userEmail', email);

    marketSocket.updateAuthToken();
  };

  return { login, isLoading, error };
};
