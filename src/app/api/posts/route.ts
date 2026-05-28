import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;

  const where = categorySlug
    ? { category: { slug: categorySlug } }
    : {};

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, image: true, role: true } },
        category: true,
        _count: { select: { replies: true } },
      },
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ posts, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { title, content, categoryId } = await req.json();
  if (!title || !content || !categoryId) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: { title, content, categoryId, authorId: session.user.id },
    include: {
      author: { select: { id: true, name: true, image: true } },
      category: true,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
