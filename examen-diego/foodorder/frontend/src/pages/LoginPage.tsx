import React, { useState } from 'react';
import axios from 'axios';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post<any>('http://localhost:4006/auth/login', {
        email,
        password,
      });
      const data = response.data; // TypeScript ahora sabe que es 'any'
      setUser(data); // se asigna la respuesta a user
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>Login</button>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
};
