import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, image: true, role: true, bio: true } },
      category: true,
      replies: {
        include: {
          author: { select: { id: true, name: true, image: true, role: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!post) return NextResponse.json({ error: "Post introuvable" }, { status: 404 });

  await prisma.post.update({ where: { id }, data: { views: { increment: 1 } } });

  return NextResponse.json(post);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  const { content } = await req.json();
  if (!content) return NextResponse.json({ error: "Contenu requis" }, { status: 400 });

  const reply = await prisma.reply.create({
    data: { content, postId: id, authorId: session.user.id },
    include: {
      author: { select: { id: true, name: true, image: true, role: true } },
    },
  });

  return NextResponse.json(reply, { status: 201 });
}
