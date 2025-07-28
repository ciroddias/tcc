import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/api/lib/auth';
import { invoke } from '@/app/api/lib/googleGenAi';
import { PrismaClient } from '@/generated/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
    const authHeader = req.headers.get('authorization')
    const { chatId, message } = await req.json();

    if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    if (!decoded || typeof decoded === 'string') {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    let newChat;
    const prisma = new PrismaClient();

    if (!chatId) {
        newChat = await prisma.chat.create({
            data: {
                userId: decoded.user.id,
                messages: {
                    create: {
                        text: message,
                        role: 'user',
                    }
                }
            }
        })
    } else {
        await prisma.message.create({
            data: {
                chatId: parseInt(chatId),
                text: message,
                role: 'user',
            }
        });
    }

    const response = await invoke(message); 

    await prisma.message.create({
        data: {
            chatId: newChat ? newChat.id : parseInt(chatId),
            text: response || 'Erro ao processar a mensagem',
            role: 'assistant',
        }
    })

    return NextResponse.json({ chatId: newChat?.id || chatId, message: response, user: decoded });
}
