export interface Room {
  id: number;
  name: string | null;
  is_private: boolean;
  created_at: Date;
  updated_at: Date;
}