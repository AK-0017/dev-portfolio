import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const settings = await db.collection("settings").findOne({ id: "global" });
    
    // Default settings if none exist
    if (!settings) {
      const defaultSettings = { 
        id: "global", 
        isAvailable: true, 
        resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "" 
      };
      await db.collection("settings").insertOne(defaultSettings);
      return NextResponse.json(defaultSettings);
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { isAvailable, resumeUrl } = await request.json();
    const client = await clientPromise;
    const db = client.db("portfolio");

    await db.collection("settings").updateOne(
      { id: "global" },
      { $set: { isAvailable, resumeUrl, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
