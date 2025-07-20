import QRCode from "qrcode";

export function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(timeString: string | null): string {
  if (!timeString) return "";
  return timeString;
}

export function generateInviteEmail(
  rsvps: { guest_email: string }[],
  eventDetails: {
    name: string;
    description?: string;
    date?: string;
    time?: string;
    location?: string;
  },
  eventUrl: string,
): string {
  const emails = rsvps.map((r) => r.guest_email).join(";");
  const subject = `You're invited to ${eventDetails.name}`;
  const body = `Hi there!

You're invited to ${eventDetails.name}!

${eventDetails.description ? `Details: ${eventDetails.description}` : ""}
${eventDetails.date ? `Date: ${formatDate(eventDetails.date)}` : ""}
${eventDetails.time ? `Time: ${eventDetails.time}` : ""}
${eventDetails.location ? `Location: ${eventDetails.location}` : ""}

Please RSVP here: ${eventUrl}

Looking forward to seeing you there!`;

  return `mailto:${emails}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for older browsers
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  return Promise.resolve();
}

export async function generateQRCode(url: string): Promise<string> {
  try {
    return await QRCode.toDataURL(url);
  } catch (error) {
    console.error("Error generating QR code:", error);
    return "";
  }
}

export function generateICSFile(eventDetails: {
  id: string;
  name: string;
  description?: string;
  location?: string;
  date?: string;
}): string {
  const startDate = eventDetails.date
    ? new Date(eventDetails.date)
    : new Date();
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Event RSVP//EN",
    "BEGIN:VEVENT",
    `UID:${eventDetails.id}@event-rsvp.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `SUMMARY:${eventDetails.name}`,
    `DESCRIPTION:${eventDetails.description || ""}`,
    `LOCATION:${eventDetails.location || ""}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return icsContent;
}

export function downloadFile(
  content: string,
  filename: string,
  mimeType: string,
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
