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