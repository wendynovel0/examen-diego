import { useEffect, useState } from "react";
import { getNotifications } from "../api/notificationApi";

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
  getNotifications()
    .then((data) => setNotifications(data))
    .catch(console.error);
}, []);


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Notificaciones</h2>
      <ul className="space-y-2">
        {notifications.map((n) => (
          <li key={n.id} className="bg-white p-3 rounded shadow">
            <p className="font-medium">{n.type}</p>
            <p className="text-gray-600">{n.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
