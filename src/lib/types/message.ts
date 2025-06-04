export interface Message {
  id: number;
  user_id: number;
  room_id: number;
  body: string | null;
  created_at: Date;
  updated_at: Date;
}