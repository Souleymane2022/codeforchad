"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, ChevronDown, LogOut, User, Settings } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
            <Image src="/logo.png" alt="Code for Chad Logo" width={32} height={32} className="object-contain" />
            <span className="text-white">Code<span className="text-chad-gold">For</span>Chad</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/community", label: "Communauté" },
              { href: "/projects", label: "Projets" },
              { href: "/events", label: "Événements" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-chad-blue to-chad-gold flex items-center justify-center text-xs font-bold text-white">
                    {session.user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-300">{session.user.name}</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>

                {dropOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#111827] border border-white/10 rounded-xl shadow-xl py-1">
                    <Link href={`/profile/${session.user.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setDropOpen(false)}>
                      <User size={14} /> Mon profil
                    </Link>
                    {session.user.role === "admin" && (
                      <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setDropOpen(false)}>
                        <Settings size={14} /> Admin
                      </Link>
                    )}
                    <hr className="my-1 border-white/10" />
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5"
                    >
                      <LogOut size={14} /> Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">
                  Connexion
                </Link>
                <Link href="/auth/register" className="text-sm font-medium bg-chad-gold text-[#0a0f1e] px-4 py-2 rounded-lg hover:bg-chad-gold/90 transition-colors">
                  Rejoindre
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0a0f1e] border-t border-white/5 px-4 py-4 space-y-1">
          {[
            { href: "/community", label: "Communauté" },
            { href: "/projects", label: "Projets" },
            { href: "/events", label: "Événements" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <hr className="border-white/10 my-2" />
          {session ? (
            <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/5 rounded-lg text-sm">
              Se déconnecter
            </button>
          ) : (
            <>
              <Link href="/auth/login" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg" onClick={() => setOpen(false)}>Connexion</Link>
              <Link href="/auth/register" className="block px-4 py-2 text-center bg-chad-gold text-[#0a0f1e] font-medium rounded-lg hover:bg-chad-gold/90" onClick={() => setOpen(false)}>Rejoindre la communauté</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
