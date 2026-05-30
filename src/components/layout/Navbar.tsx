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
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-chad-border shadow-sm" style={{ borderColor: '#dde3f0' }}>
      {/* Chad flag stripe top bar */}
      <div className="h-1 chad-stripe" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
            <Image src="/logo.png" alt="Code for Chad Logo" width={36} height={36} className="object-contain" />
            <span style={{ color: '#003082' }}>Code<span style={{ color: '#FECB00', WebkitTextStroke: '0.5px #d4a900' }}>For</span><span style={{ color: '#C8102E' }}>Chad</span></span>
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
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ color: '#4a5568' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = '#003082'; (e.target as HTMLElement).style.background = '#f0f3f8'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = '#4a5568'; (e.target as HTMLElement).style.background = ''; }}
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
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
                  style={{ border: '1px solid #dde3f0' }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #003082, #1a4fa0)' }}>
                    {session.user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#0d1b3e' }}>{session.user.name}</span>
                  <ChevronDown size={14} style={{ color: '#6b7a99' }} />
                </button>

                {dropOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-1" style={{ border: '1px solid #dde3f0' }}>
                    <Link href={`/profile/${session.user.id}`} className="flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: '#4a5568' }} onClick={() => setDropOpen(false)}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f0f3f8')}
                      onMouseLeave={e => (e.currentTarget.style.background = '')}>
                      <User size={14} /> Mon profil
                    </Link>
                    {session.user.role === "admin" && (
                      <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: '#4a5568' }} onClick={() => setDropOpen(false)}
                        onMouseEnter={e => (e.currentTarget.style.background = '#f0f3f8')}
                        onMouseLeave={e => (e.currentTarget.style.background = '')}>
                        <Settings size={14} /> Admin
                      </Link>
                    )}
                    <hr style={{ borderColor: '#dde3f0', margin: '4px 0' }} />
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors"
                      style={{ color: '#C8102E' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#fff5f6')}
                      onMouseLeave={e => (e.currentTarget.style.background = '')}
                    >
                      <LogOut size={14} /> Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-medium px-4 py-2 rounded-lg transition-colors" style={{ color: '#4a5568' }}
                  onMouseEnter={e => { (e.currentTarget.style.background = '#f0f3f8'); (e.currentTarget.style.color = '#003082'); }}
                  onMouseLeave={e => { (e.currentTarget.style.background = ''); (e.currentTarget.style.color = '#4a5568'); }}>
                  Connexion
                </Link>
                <Link href="/auth/register" className="text-sm font-semibold px-5 py-2 rounded-lg transition-all hover:scale-105" style={{ background: '#003082', color: '#ffffff' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1a4fa0')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#003082')}>
                  Rejoindre
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg" style={{ color: '#003082' }} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-1" style={{ borderColor: '#dde3f0' }}>
          {[
            { href: "/community", label: "Communauté" },
            { href: "/projects", label: "Projets" },
            { href: "/events", label: "Événements" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="block px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ color: '#4a5568' }} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <hr style={{ borderColor: '#dde3f0', margin: '8px 0' }} />
          {session ? (
            <button onClick={() => signOut()} className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium" style={{ color: '#C8102E' }}>
              Se déconnecter
            </button>
          ) : (
            <>
              <Link href="/auth/login" className="block px-4 py-2 rounded-lg text-sm font-medium" style={{ color: '#4a5568' }} onClick={() => setOpen(false)}>Connexion</Link>
              <Link href="/auth/register" className="block px-4 py-2 text-center rounded-lg text-sm font-semibold text-white" style={{ background: '#003082' }} onClick={() => setOpen(false)}>Rejoindre la communauté</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
