import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { generateToken } from '@/app/api/lib/auth'

export async function POST(req: NextRequest, res: NextResponse) {
    const {username, password} = await req.json();

    if (!username || !password) {
        return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    try {
        const prisma = new PrismaClient()

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 404 });
        }

        if (user.password !== password) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        const token = generateToken({ user })
        return NextResponse.json({ token })
    } catch (error) {
        console.error('Error during authentication:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}