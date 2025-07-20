import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ message: 'Hello from API' });
}