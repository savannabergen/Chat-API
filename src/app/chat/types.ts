export interface Room {
  id: number;
  name: string | null;
  is_private: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Message {
  id: number;
  user_id: number;
  room_id: number;
  body: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Participant {
  id: number;
  user_id: number;
  room_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  email: string;
  encrypted_password: string;
  reset_password_token: string | null;
  reset_password_sent_at: Date | null;
  remember_created_at: Date | null;
  created_at: Date;
  updated_at: Date;
  jti: string;
}
