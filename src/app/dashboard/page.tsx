"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, ChatWindow } from "@siavanna/atomic-lib";
import {
  fetchRooms,
  fetchMessages,
  fetchParticipants,
  sendMessage,
} from "./api";
import cable from "./cable";
import { Room, Message, Participant } from "./types";

const DashBoardPage = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    } else {
      const loadData = async () => {
        try {
          const roomsData = await fetchRooms();
          setRooms(roomsData);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      loadData();
    }
  }, [router]);

  const handleRoomChange = async (room: Room) => {
    setCurrentRoom(room);
    setMessages([]);
    setParticipants([]);
    try {
      const messagesData = await fetchMessages(room.id);
      const participantsData = await fetchParticipants(room.id);
      setMessages(messagesData);
      setParticipants(participantsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async (text: string) => {
    try {
      if (currentRoom) {
        const message = await sendMessage(currentRoom.id, text);
        setMessages([...messages, message]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        rooms={rooms}
        participants={participants}
        onRoomChange={handleRoomChange}
      />
      <div className="chat-container" style={{ flex: 1 }}>
        {currentRoom && (
          <div>
            <ChatWindow
              key={currentRoom.id}
              className="chat-window"
              messages={messages}
              onSendMessage={handleSendMessage}
              placeholder="Type a message..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardPage;
