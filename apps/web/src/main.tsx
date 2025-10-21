import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import typescriptLogo from "/typescript.svg";
import { Header, Counter } from "@repo/ui";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3005"; // Porta do notifications-service

const App = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Substitua pelo JWT real do usuário logado
    const token = "";

    const socket: Socket = io(SOCKET_URL, {
      transports: ["websocket"],
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on("connect", () => {
      console.log("✅ Conectado ao WebSocket");
      setConnected(true);
    });

    socket.on("notification", (data) => {
      console.log("📩 Nova notificação:", data);
      setMessages((prev) => [...prev, JSON.stringify(data)]);
    });

    socket.on("disconnect", () => {
      console.log("❌ Desconectado do WebSocket");
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>🔌 Teste de conexão WebSocket</h2>
      <p>Status: {connected ? "🟢 Conectado" : "🔴 Desconectado"}</p>
      <h3>📬 Notificações recebidas:</h3>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

createRoot(document.getElementById("app")!).render(<App />);
