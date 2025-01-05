"use client";

import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";
const socket = io(URL, {
  withCredentials: true,
  transports: ["websocket", "polling"], // Ensure multiple transport methods
  secure: true, // Use secure connection for HTTPS
});

socket.on("connect", () => {
  console.log("User on client: " + socket.id);
});
socket.on("disconnect", () => {
  console.log("User on client disconnected: " + socket.id);
});
export default socket;
