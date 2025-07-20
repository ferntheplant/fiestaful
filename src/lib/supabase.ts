import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Event {
  id: string;
  name: string;
  date: string | null;
  time: string | null;
  location: string | null;
  description: string | null;
  admin_password_hash: string;
  guest_password_hash: string;
  accepting_rsvps: boolean;
  is_public: boolean;
  created_at: string;
}

export interface RSVP {
  id: string;
  event_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string | null;
  response: 'yes' | 'no' | 'maybe';
  message: string | null;
  created_at: string;
}

export interface Update {
  id: string;
  event_id: string;
  content: string;
  created_at: string;
} 