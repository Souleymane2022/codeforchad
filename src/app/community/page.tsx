import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MessageSquare, Eye, Plus, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

async function getCategories() {
  return prisma.category.findMany({
    include: { _count: { select: { posts: true } } },
  });
}

async function getPosts(categorySlug?: string) {
  const where = categorySlug ? { category: { slug: categorySlug } } : {};
  return prisma.post.findMany({
    where,
    include: {
      author: { select: { id: true, name: true, role: true } },
      category: true,
      _count: { select: { replies: true } },
    },
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    take: 30,
  });
}

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [categories, posts] = await Promise.all([
    getCategories(),
    getPosts(category),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare size={24} className="text-[#FECB00]" />
            Communauté
          </h1>
          <p className="text-gray-400 text-sm mt-1">Échangez, apprenez et collaborez avec les devs tchadiens</p>
        </div>
        <Link
          href="/community/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#FECB00] text-[#0a0f1e] font-semibold text-sm rounded-xl hover:bg-[#FECB00]/90 transition-colors"
        >
          <Plus size={16} />
          Nouvelle discussion
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/3 border border-white/8 rounded-2xl p-4 sticky top-24">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Catégories</h3>
            <div className="space-y-1">
              <Link
                href="/community"
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${!category ? "bg-[#FECB00]/10 text-[#FECB00]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
              >
                <span>Toutes</span>
                <span className="text-xs text-gray-600">{posts.length}</span>
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/community?category=${cat.slug}`}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${category === cat.slug ? "bg-[#FECB00]/10 text-[#FECB00]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                >
                  <span>{cat.icon} {cat.name}</span>
                  <span className="text-xs text-gray-600">{cat._count.posts}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="lg:col-span-3">
          {/* Stats bar */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <TrendingUp size={14} />
            <span>{posts.length} discussions</span>
            {category && (
              <>
                <span>·</span>
                <span className="text-[#FECB00]">
                  {categories.find((c) => c.slug === category)?.name}
                </span>
              </>
            )}
          </div>

          <div className="space-y-2">
            {posts.length === 0 ? (
              <div className="bg-white/3 border border-white/8 rounded-2xl p-12 text-center">
                <MessageSquare size={40} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Aucune discussion dans cette catégorie</p>
                <Link href="/community/new" className="text-[#FECB00] hover:underline text-sm">
                  Créer la première discussion →
                </Link>
              </div>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/${post.id}`}
                  className="flex gap-4 bg-white/3 border border-white/8 rounded-xl p-4 hover:bg-white/6 hover:border-white/15 transition-all group"
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#003082] to-[#FECB00] flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    {post.author.name[0].toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${post.category.color}20`, color: post.category.color }}
                      >
                        {post.category.icon} {post.category.name}
                      </span>
                      {post.pinned && <span className="text-xs text-[#FECB00] bg-[#FECB00]/10 px-2 py-0.5 rounded-full">📌 Épinglé</span>}
                      {post.author.role === "admin" && <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">Admin</span>}
                    </div>
                    <h3 className="font-medium text-white group-hover:text-[#FECB00] transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
                      <span className="font-medium text-gray-400">{post.author.name}</span>
                      <span>{format(new Date(post.createdAt), "d MMM yyyy", { locale: fr })}</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={11} /> {post._count.replies}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={11} /> {post.views}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
