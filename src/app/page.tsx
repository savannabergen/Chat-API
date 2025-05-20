'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';
import { Alert, Button, Avatar } from "@siavanna/atomic-lib";

export default function Home() {
  const handleDismiss = (type: string) => {
    console.log(`Alert of type ${type} dismissed!`);
  };

  return (
    <div>
      <Avatar src="https://picsum.photos/200/200" alt="Test Image" size="large" />
      <Button>Click</Button>
    </div>
  );
}