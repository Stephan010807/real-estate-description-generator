import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Description from '@/models/Description';

export async function GET() {
  try {
    await dbConnect();
    const descriptions = await Description.find({})
      .sort({ updatedAt: -1 })
      .limit(10)
      .select('title content createdAt updatedAt');
    
    return NextResponse.json(descriptions);
  } catch (error) {
    console.error('Error in /api/descriptions:', error);
    return NextResponse.json({ error: 'Failed to fetch descriptions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    const newDescription = await Description.create(body);
    return NextResponse.json(newDescription, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/descriptions:', error);
    return NextResponse.json({ error: 'Failed to create description' }, { status: 500 });
  }
}