'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';
import { Alert, Button, Avatar, ChatWindow } from "@siavanna/atomic-lib";

export default function Home() {
  const handleDismiss = (type: string) => {
    console.log(`Alert of type ${type} dismissed!`);
  };
  const handleSendMessage = (text: string) => {
    console.log(text);
  };
  const messages = [
    {
      id: 1,
      text: 'Hello, world!',
      timestamp: '12:00 PM',
      sender: {
        id: 1,
        name: 'John Doe'
      },
    },
    {
      id: 2,
      text: 'Hi!',
      timestamp: '12:01 PM',
      sender: {
        id: 2,
        name: 'Jane Doe'
      },
    },
  ];

  return (
    <div className="container">
      <div className="chat-container">
        <ChatWindow
          className="chat-window"
          messages={messages}
          onSendMessage={handleSendMessage}
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}