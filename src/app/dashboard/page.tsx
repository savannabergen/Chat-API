"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, ChatWindow } from "@siavanna/atomic-lib";
import {
  apiClient,
  getRooms,
  getUsers,
  getMessages,
  getParticipants,
  sendMessage,
} from "../../utils/apiClient";
import consumer from "../../utils/actioncable";
import { ChatWindowProps } from "@siavanna/atomic-lib";
import axios, { AxiosError } from "axios";

type Room = Awaited<ReturnType<typeof getRooms>>[number];
type User = Awaited<ReturnType<typeof getUsers>>[number];
type Participant = Awaited<ReturnType<typeof getParticipants>>[number];

const DashBoardPage = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<ChatWindowProps["messages"]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    } else {
      const checkAuth = async () => {
        try {
          const response = await apiClient.get("/users/edit");
          fetchRooms();
          fetchUsers();
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            setError(
              `Error ${error.response?.status}: ${error.response?.statusText}`,
            );
            router.push("/login");
          } else {
            setError("An unknown error occurred");
          }
        }
      };
      checkAuth();
    }
  }, []);

  useEffect(() => {
    if (currentRoom) {
      const subscription = consumer.subscriptions.create(
        { channel: "Turbo::StreamsChannel", room_id: currentRoom.id },
        {
          received: (data: any) => {
            setMessages((prevMessages: ChatWindowProps["messages"]) => [
              ...prevMessages,
              data as ChatWindowProps["messages"][number],
            ]);
          },
        },
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [currentRoom]);

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);
      if (data.length > 0) {
        setCurrentRoom(data[0]);
        fetchMessages(data[0].id);
        fetchParticipants(data[0].id);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          `Error ${error.response?.status}: ${error.response?.statusText}`,
        );
      } else {
        setError("Error fetching rooms");
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          `Error ${error.response?.status}: ${error.response?.statusText}`,
        );
      } else {
        setError("Error fetching users");
      }
    }
  };

  const fetchMessages = async (roomId: number) => {
    try {
      const data = await getMessages(roomId);
      setMessages(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          `Error ${error.response?.status}: ${error.response?.statusText}`,
        );
      } else {
        setError("Error fetching messages");
      }
    }
  };

  const fetchParticipants = async (roomId: number) => {
    try {
      const data = await getParticipants(roomId);
      setParticipants(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          `Error ${error.response?.status}: ${error.response?.statusText}`,
        );
      } else {
        setError("Error fetching participants");
      }
    }
  };

  const handleRoomChange = (room: Room) => {
    setCurrentRoom(room);
    fetchMessages(room.id);
    fetchParticipants(room.id);
  };

  const handleSendMessage: ChatWindowProps["onSendMessage"] = async (
    text: string,
  ) => {
    try {
      if (currentRoom) {
        const data = await sendMessage(currentRoom.id, text);
        setMessages((prevMessages: ChatWindowProps["messages"]) => [
          ...prevMessages,
          data as ChatWindowProps["messages"][number],
        ]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          `Error ${error.response?.status}: ${error.response?.statusText}`,
        );
      } else {
        setError("Error sending message");
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
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
              messages={messages || []}
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
