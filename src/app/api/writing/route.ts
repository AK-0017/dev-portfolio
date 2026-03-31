import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const logs = await db.collection('writing').find({}).sort({ date: -1 }).toArray();
    return NextResponse.json(logs);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch writing entries' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    // Auto-generate ID if not provided
    if (!data.id) {
      const count = await db.collection('writing').countDocuments();
      data.id = (count + 1).toString().padStart(2, '0');
    }

    const result = await db.collection('writing').insertOne(data);
    return NextResponse.json({ ...data, _id: result.insertedId });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create writing entry' }, { status: 500 });
  }
}
