import { useEffect, useState } from "react";
import { getMenu } from "../api/menuApi";
import { createOrder, getOrders, updateOrderStatus, Order } from "../api/orderApi";

interface MenuItem {
  id: number;
  nombre: string;
  precio: number;
  disponible: boolean;
}


export function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ id: number; cantidad: number }[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [filterUser, setFilterUser] = useState("");
  const [filterMesa, setFilterMesa] = useState("");

  // Cargar menú
  useEffect(() => {
    getMenu()
      .then((data) => (Array.isArray(data) ? setMenu(data) : setMenu([])))
      .catch((err) => {
        console.error(err);
        setMenu([]);
      });
  }, []);

  // Cargar pedidos
  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Seleccionar items del menú
  const handleSelect = (itemId: number) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) return prev.map((i) => (i.id === itemId ? { ...i, cantidad: i.cantidad + 1 } : i));
      return [...prev, { id: itemId, cantidad: 1 }];
    });
  };

  // Crear pedido
  const handleCreateOrder = async () => {
  if (selectedItems.length === 0) return alert("Selecciona al menos un producto");

  const itemsPayload = selectedItems.map((i) => {
    const item = menu.find((m) => m.id === i.id);
    return {
      menu_id: i.id,
      cantidad: i.cantidad,
      subtotal: item ? item.precio * i.cantidad : 0,
    };
  });

  const total = itemsPayload.reduce((sum, i) => sum + i.subtotal, 0);

  setLoading(true);
  try {
    await createOrder({
      user_id: 1,
      total,
      mesa: "A1",
      items: itemsPayload, // << esto es clave
    });
    alert("Pedido creado correctamente");
    setSelectedItems([]);
    fetchOrders(); // refrescar pedidos
  } catch (err) {
    console.error(err);
    alert("Error al crear el pedido");
  } finally {
    setLoading(false);
  }
};


  // Cambiar estado del pedido
  const handleUpdateStatus = async (orderId: number, estado: Order["estado"]) => {
    try {
      await updateOrderStatus(orderId, estado);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el estado del pedido");
    }
  };

  // Filtrar pedidos por usuario o mesa
  const filteredOrders = orders.filter((o) => {
    const matchesUser = filterUser ? o.user_id.toString() === filterUser : true;
    const matchesMesa = filterMesa ? o.mesa === filterMesa : true;
    return matchesUser && matchesMesa;
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Menú</h2>

      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-medium">{item.nombre}</p>
              <p className="text-gray-600">${item.precio}</p>
            </div>
            <button
              disabled={!item.disponible}
              onClick={() => handleSelect(item.id)}
              className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-800 disabled:bg-gray-400"
            >
              Agregar
            </button>
          </li>
        ))}
      </ul>

      {selectedItems.length > 0 && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h3 className="font-bold mb-2">Pedido:</h3>
          <ul>
            {selectedItems.map((i) => {
              const item = menu.find((m) => m.id === i.id);
              return (
                <li key={i.id}>
                  {item?.nombre} x {i.cantidad} = ${item ? item.precio * i.cantidad : 0}
                </li>
              );
            })}
          </ul>
          <p className="font-bold mt-2">
            Total: $
            {selectedItems.reduce((sum, i) => {
              const item = menu.find((m) => m.id === i.id);
              return sum + (item ? item.precio * i.cantidad : 0);
            }, 0)}
          </p>
          <button
            onClick={handleCreateOrder}
            disabled={loading}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {loading ? "Creando..." : "Crear Pedido"}
          </button>
        </div>
      )}

      <h2 className="text-xl font-bold mt-8 mb-4">Pedidos</h2>

      {/* Filtros */}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Filtrar por cliente (ID)"
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="border p-1 rounded"
        />
        <input
          type="text"
          placeholder="Filtrar por mesa"
          value={filterMesa}
          onChange={(e) => setFilterMesa(e.target.value)}
          className="border p-1 rounded"
        />
        <button
          onClick={fetchOrders}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Refrescar
        </button>
      </div>

      {loadingOrders ? (
        <p>Cargando pedidos...</p>
      ) : (
        <ul className="space-y-2">
          {filteredOrders.map((o) => (
            <li key={o.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
              <div>
                <p>
                  ID: {o.id} | Cliente: {o.user_id} | Mesa: {o.mesa} | Total: ${o.total} | Estado: {o.estado}
                </p>
              </div>
              <div className="space-x-2">
                {["pendiente", "preparando", "listo", "entregado"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleUpdateStatus(o.id, status as Order["estado"])}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
