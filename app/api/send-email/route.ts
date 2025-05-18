import { NextRequest, NextResponse } from "next/server";
import { sendEmailWithEmailJS } from "@/lib/emailjs";

export async function POST(request: NextRequest) {
  try {
    const { email, subject, message } = await request.json();
    
    // Send email using EmailJS with parameters matching your template
    const result = await sendEmailWithEmailJS(email, subject, message);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}