import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;
  const timestamp = new Date().toISOString();

  let dbSuccess = false;
  let emailSuccess = false;

  // 1. Attempt MongoDB Insertion
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    await db.collection("communications").insertOne({
      name,
      email,
      message,
      timestamp,
      status: "new"
    });
    dbSuccess = true;
  } catch (e) {
    console.error("MONGODB_PERSISTENCE_FAILURE:", e);
    // Continue even if DB fails
  }

  // 2. Attempt Email Transmission
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name} (via Portfolio)" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL_RECIPIENT,
      replyTo: email,
      subject: `NEW_TRANSMISSION: From ${name}`,
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: 'Courier New', Courier, monospace; border: 1px solid #FFB800;">
          <h1 style="color: #FFB800; text-transform: uppercase; border-bottom: 1px solid rgba(255,184,0,0.2); padding-bottom: 20px;">Incoming Message</h1>
          
          <div style="margin-top: 30px;">
            <p style="color: rgba(255,255,255,0.4); text-transform: uppercase; font-size: 10px; margin-bottom: 5px;">Identification</p>
            <p style="font-size: 18px; margin: 0;">${name}</p>
          </div>

          <div style="margin-top: 20px;">
            <p style="color: rgba(255,255,255,0.4); text-transform: uppercase; font-size: 10px; margin-bottom: 5px;">Protocol (Email)</p>
            <p style="font-size: 18px; margin: 0;">${email}</p>
          </div>

          <div style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,184,0,0.1); border-radius: 10px;">
            <p style="color: rgba(255,255,255,0.4); text-transform: uppercase; font-size: 10px; margin-bottom: 10px;">Transmission_Content</p>
            <p style="line-height: 1.6; font-size: 16px;">${message}</p>
          </div>

          <div style="margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; font-size: 10px; color: rgba(255,255,255,0.2);">
            TIMESTAMP: ${timestamp} | SYSTEM: STUDIO_OS_WEBSITE
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    emailSuccess = true;
  } catch (e) {
    console.error("EMAIL_TRANSMISSION_FAILURE:", e);
  }

  // Final Response based on resilience logic
  if (dbSuccess || emailSuccess) {
    return NextResponse.json({ 
      success: true, 
      db: dbSuccess ? "persisted" : "offline", 
      email: emailSuccess ? "transmitted" : "failed" 
    });
  } else {
    return NextResponse.json({ error: "Communication link completely offline" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const comms = await db.collection("communications").find({}).sort({ timestamp: -1 }).toArray();
    return NextResponse.json(comms);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch communications" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  try {
    const { ObjectId } = require("mongodb");
    const client = await clientPromise;
    const db = client.db("portfolio");
    await db.collection("communications").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete communication" }, { status: 500 });
  }
}
