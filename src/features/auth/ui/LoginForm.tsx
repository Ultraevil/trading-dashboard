import { useState } from 'react';
import { useLogin } from '@/features/auth/model/useLogin';

export const LoginForm = () => {
  const { login } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} />
      <input onChange={(e) => setPassword(e.target.value)} />

      <button onClick={() => login(email, password)}>Login</button>
    </div>
  );
};
