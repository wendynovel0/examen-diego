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
      setUser(response.data);
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center fade-in">
      <div className="card w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">Iniciar sesión 🍽️</h2>
        <div className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="input"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            type="password"
            className="input"
          />
          <button onClick={handleLogin} className="btn-primary w-full">Entrar</button>
        </div>
        {user && (
          <pre className="mt-4 text-sm bg-purple-50 rounded-lg p-2 text-left overflow-x-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};
