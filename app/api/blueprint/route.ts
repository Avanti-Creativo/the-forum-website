import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "The Forum <onboarding@resend.dev>";
const TO_EMAIL = "info@theforumstudio.com";
const BLUEPRINT_URL =
  "https://drive.google.com/file/d/1A-osjwVtkXqtAYu4eZTdgwQ3w5X-VaWf/view?usp=sharing";

const CONTENT_TYPE_LABELS: Record<string, string> = {
  podcast: "Podcast",
  "social-media": "Social Media Content",
  youtube: "YouTube Video",
};

export async function POST(req: Request) {
  try {
    const { fullName, email, contentType } = await req.json();

    if (!fullName || !email || !contentType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const contentTypeLabel = CONTENT_TYPE_LABELS[contentType] || contentType;

    const subject = `New blueprint request: ${fullName}`;
    const text = `New Content Blueprint request:

Full Name: ${fullName}
Email: ${email}
Content they want to create: ${contentTypeLabel}

Blueprint link: ${BLUEPRINT_URL}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, blueprintUrl: BLUEPRINT_URL });
  } catch (err) {
    console.error("Blueprint route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
