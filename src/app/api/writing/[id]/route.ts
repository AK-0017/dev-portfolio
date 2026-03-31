import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db('portfolio');
    const { _id, ...updateData } = data;

    await db.collection('writing').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return NextResponse.json({ message: 'Entry updated successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update entry' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('portfolio');
    await db.collection('writing').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });
  }
}
