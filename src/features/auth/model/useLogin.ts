import { useLoginMutation } from '../api/authApi';
import { useAppDispatch } from '@/app/store/hooks';
import { setToken } from './authSlice';

export const useLogin = () => {
  const [loginMutation] = useLoginMutation();
  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    const res = await loginMutation({ email, password }).unwrap();

    dispatch(setToken(res.accessToken));
  };

  return { login };
};
