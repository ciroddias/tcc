import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest, res: NextResponse) {
    const { username, password, confirmPassword } = await req.json();

    if (!username || !password || !confirmPassword) {
        return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    if (password !== confirmPassword) {
        return NextResponse.json({ error: 'As senhas não coincidem.' }, { status: 400 });
    }

    try {
        const prisma = new PrismaClient();

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { username, password: hashedPassword }
        });

        return NextResponse.json({ user: user });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return NextResponse.json({ error: 'Erro ao criar usuário.' }, { status: 500 });
    }
}

