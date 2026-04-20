import { useLoginMutation } from '../api/authApi';
import { useAppDispatch } from '@/app/store/hooks';
import { setTokens } from './authSlice';

export const useLogin = () => {
  const [loginMutation] = useLoginMutation();
  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    const res = await loginMutation({ email, password }).unwrap();

    dispatch(setTokens(res));

    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
  };

  return { login };
};
