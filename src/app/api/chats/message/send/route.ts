import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    const { message } = await req.json();
    return NextResponse.json({ message: `Response to ${message}` });
}