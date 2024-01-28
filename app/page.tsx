"use client"
import { useState } from "react";
import { io } from "socket.io-client";
import ChatPage from "@/components/chat";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setRoomId] = useState("");

  const socket = io("http://localhost:3001");

  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      console.log(userName, "userName", roomId, "roomId");
      socket.emit("join_room", roomId);
      setShowSpinner(true);
      // You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 4000);
    } else {
      alert("Please fill in Username and Room Id");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="mb-4">
          <input
            className="border p-2 rounded-lg mr-2 text-black"
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            disabled={showSpinner}
          />
          <input
            className="border p-2 rounded-lg mr-2 text-black"
            type="text"
            placeholder="Room Id"
            onChange={(e) => setRoomId(e.target.value)}
            disabled={showSpinner}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleJoin}
            disabled={showSpinner}
          >
            {!showSpinner ? "Join" : "Loading..."}
          </button>
        </div>
        <div style={{ display: showChat ? "block" : "none" }}>
          <ChatPage socket={socket} roomId={roomId} username={userName} />
        </div>
      </div>
    </div>
  );
}
