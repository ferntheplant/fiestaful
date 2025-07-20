import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

interface RSVPFormData {
  name: string;
  email: string;
  phone?: string;
  response: "yes" | "no" | "maybe";
  message?: string;
}

interface EventData {
  id: string;
  accepting_rsvps: boolean;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      return new Response("Database not configured", { status: 500 });
    }

    const formData = await request.formData();

    // Extract and validate form data
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const phone = formData.get("phone")?.toString().trim() || undefined;
    const response = formData
      .get("response")
      ?.toString() as RSVPFormData["response"];
    const message = formData.get("message")?.toString().trim() || undefined;

    // Validation
    if (!name || name.length < 2) {
      return new Response("Invalid name", { status: 400 });
    }

    if (!email || !email.includes("@")) {
      return new Response("Invalid email", { status: 400 });
    }

    if (!response || !["yes", "no", "maybe"].includes(response)) {
      return new Response("Invalid response", { status: 400 });
    }

    // Get event ID (assuming single event per deployment)
    const { data: eventData, error: eventError } = await supabase
      .from("event")
      .select("id, accepting_rsvps")
      .single();

    if (eventError || !eventData) {
      return new Response("Event not found", { status: 404 });
    }

    const event = eventData as EventData;

    if (!event.accepting_rsvps) {
      return new Response("RSVPs are currently closed", { status: 403 });
    }

    // Check if email already exists for this event
    const { data: existingRSVP } = await supabase
      .from("rsvps")
      .select("id")
      .eq("event_id", event.id)
      .eq("guest_email", email)
      .single();

    if (existingRSVP) {
      return new Response("You have already RSVPed for this event", {
        status: 409,
      });
    }

    // Insert RSVP
    const { error: insertError } = await supabase.from("rsvps").insert({
      event_id: event.id,
      guest_name: name,
      guest_email: email,
      guest_phone: phone,
      response: response,
      message: message,
    });

    if (insertError) {
      console.error("Error inserting RSVP:", insertError);
      return new Response("Failed to save RSVP", { status: 500 });
    }

    // Redirect to success page
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/?success=true",
      },
    });
  } catch (error) {
    console.error("RSVP API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
};
