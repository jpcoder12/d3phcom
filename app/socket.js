"use client";
import { io } from "socket.io-client";

export const socket = io("https://d3phcom.herokuapp.com", {
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 10,
    transports: ["websocket", "polling"],
});