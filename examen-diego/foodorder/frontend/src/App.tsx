import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MenuPage } from "./pages/MenuPage";
import { NotificationsPage } from "./pages/NotificationsPage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
