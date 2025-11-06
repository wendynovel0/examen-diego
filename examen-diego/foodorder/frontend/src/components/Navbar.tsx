import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-purple-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">🍽️ FoodOrder</h1>
      <div className="space-x-4">
        <Link to="/">Menú</Link>
        <Link to="/orders">Pedidos</Link>
        <Link to="/notifications">Notificaciones</Link>
      </div>
    </nav>
  );
}
