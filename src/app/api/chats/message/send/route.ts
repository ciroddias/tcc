import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/api/lib/auth';

export async function POST(req: NextRequest, res: NextResponse) {
    const authHeader = req.headers.get('authorization')
    const { message } = await req.json();

    if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    if (!decoded) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    return NextResponse.json({ message: `Response to ${message}`, user: decoded });
}
