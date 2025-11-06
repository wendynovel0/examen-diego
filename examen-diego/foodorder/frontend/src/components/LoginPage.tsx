import { useState } from "react";
import { login } from "../api/authApi";

interface LoginPageProps {
  onLogin: () => void; // Solo indica que el usuario "inició sesión"
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password); // Llamada simple al backend
      onLogin(); // Avisamos que se inició sesión
    } catch {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-80">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border mb-3 p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border mb-3 p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">
          Entrar
        </button>
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </form>
    </div>
  );
}
