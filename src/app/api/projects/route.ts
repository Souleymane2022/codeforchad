import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const tag = searchParams.get("tag");
  const limit = 12;

  const where = tag ? { tags: { contains: tag } } : {};

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, image: true } },
        _count: { select: { likes: true } },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.project.count({ where }),
  ]);

  return NextResponse.json({ projects, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { title, description, github, demo, tags } = await req.json();
  if (!title || !description || !tags) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      title,
      description,
      github,
      demo,
      tags: Array.isArray(tags) ? tags.join(",") : tags,
      authorId: session.user.id,
    },
    include: {
      author: { select: { id: true, name: true, image: true } },
    },
  });

  return NextResponse.json(project, { status: 201 });
}
