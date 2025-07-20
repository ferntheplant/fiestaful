import { supabase } from "./supabase";

// Simple password verification (in production, use proper bcrypt)
export async function verifyGuestPassword(password: string): Promise<boolean> {
  try {
    if (!supabase) return false;

    const { data, error } = await supabase
      .from("event")
      .select("guest_password_hash")
      .single();

    if (error || !data) return false;

    // For demo purposes, using simple comparison
    // In production, use proper bcrypt comparison
    return data.guest_password_hash === password;
  } catch {
    return false;
  }
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    if (!supabase) return false;

    const { data, error } = await supabase
      .from("event")
      .select("admin_password_hash")
      .single();

    if (error || !data) return false;

    // For demo purposes, using simple comparison
    // In production, use proper bcrypt comparison
    return data.admin_password_hash === password;
  } catch {
    return false;
  }
}

export function setSessionCookie(
  type: "guest" | "admin",
  value: string,
): string {
  return `${type}_session=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`;
}

export function getSessionCookie(
  cookies: string,
  type: "guest" | "admin",
): string | null {
  const cookieName = `${type}_session`;
  const match = cookies.match(new RegExp(`${cookieName}=([^;]+)`));
  return match ? match[1] : null;
}
