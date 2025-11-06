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
  console.log("Payload enviado:", {
    user_id: 2,
    total,
    mesa: "A2",
    items: itemsPayload,
  });

  await createOrder({
    user_id: 2,
    total,
    mesa: "A2",
    items: itemsPayload,
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
  <div className="p-6 max-w-3xl mx-auto fade-in">
    <h2 className="text-3xl font-bold mb-6 text-purple-800">Menú del día</h2>

    <ul className="grid gap-4 sm:grid-cols-2">
      {menu.map((item) => (
        <li key={item.id} className="card flex justify-between items-center">
          <div>
            <p className="font-semibold text-lg">{item.nombre}</p>
            <p className="text-gray-500">${item.precio}</p>
          </div>
          <button
            disabled={!item.disponible}
            onClick={() => handleSelect(item.id)}
            className={`btn-primary ${!item.disponible && 'opacity-50 cursor-not-allowed'}`}
          >
            Agregar
          </button>
        </li>
      ))}
    </ul>

    {selectedItems.length > 0 && (
      <div className="mt-8 card">
        <h3 className="text-xl font-bold mb-3">Tu pedido 🧾</h3>
        <ul className="space-y-1">
          {selectedItems.map((i) => {
            const item = menu.find((m) => m.id === i.id);
            return (
              <li key={i.id} className="flex justify-between">
                <span>{item?.nombre} × {i.cantidad}</span>
                <span className="font-semibold">${item ? item.precio * i.cantidad : 0}</span>
              </li>
            );
          })}
        </ul>
        <p className="font-bold mt-3 text-right text-lg text-purple-700">
          Total: ${selectedItems.reduce((sum, i) => {
            const item = menu.find((m) => m.id === i.id);
            return sum + (item ? item.precio * i.cantidad : 0);
          }, 0)}
        </p>
        <button
          onClick={handleCreateOrder}
          disabled={loading}
          className="btn-primary w-full mt-4"
        >
          {loading ? "Creando..." : "Confirmar Pedido"}
        </button>
      </div>
    )}

    <h2 className="text-3xl font-bold mt-12 mb-4 text-purple-800">Pedidos actuales</h2>

    <div className="mb-4 flex flex-wrap gap-2">
      <input
        type="text"
        placeholder="Filtrar por cliente (ID)"
        value={filterUser}
        onChange={(e) => setFilterUser(e.target.value)}
        className="input w-full sm:w-1/3"
      />
      <input
        type="text"
        placeholder="Filtrar por mesa"
        value={filterMesa}
        onChange={(e) => setFilterMesa(e.target.value)}
        className="input w-full sm:w-1/3"
      />
      <button onClick={fetchOrders} className="btn-secondary">Refrescar</button>
    </div>

    {loadingOrders ? (
      <p className="text-center text-gray-600">Cargando pedidos...</p>
    ) : (
      <ul className="space-y-3">
        {filteredOrders.map((o) => (
          <li key={o.id} className="card">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm">
                  <span className="font-semibold">Pedido #{o.id}</span> — Mesa {o.mesa} — Cliente {o.user_id}
                </p>
                <p className="text-gray-600 text-sm">
                  Estado: <span className="font-semibold text-purple-700">{o.estado}</span>
                </p>
              </div>
              <div className="space-x-2">
                {["pendiente", "preparando", "listo", "entregado"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleUpdateStatus(o.id, status as Order["estado"])}
                    className="btn-secondary capitalize"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* 🧾 Lista de items del pedido */}
            {o.items && Array.isArray(o.items) && o.items.length > 0 && (
              <ul className="pl-4 text-sm text-gray-700">
                {o.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>
                      Producto {item.menu?.nombre} × {item.cantidad}
                    </span>
                    <span>${item.subtotal}</span>
                  </li>
                ))}
                <li className="font-semibold text-right mt-1 text-purple-700">
                  Total: ${o.total}
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);
}