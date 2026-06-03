"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.push("/admin");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.session.user.id)
        .single();
      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        router.push("/admin");
      } else {
        setIsAdmin(true);
      }
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  if (loading || !isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="animate-spin w-8 h-8 rounded-full border-2 border-transparent" style={{ borderTopColor: "var(--primary-light)", borderRightColor: "var(--primary-light)" }} />
      </main>
    );
  }

  // On login page, don't show sidebar
  if (pathname === "/admin") return <>{children}</>;

  const navItems = [
    { href: "/admin/cars", label: "Voitures", icon: "M19 17h2v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2h2m10-10a4 4 0 11-8 0 4 4 0 018 0z" },
    { href: "/admin/reservations", label: "Réservations", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside className="w-64 shrink-0 min-h-screen p-6 flex flex-col" style={{ background: "var(--bg-secondary)", borderRight: "1px solid var(--border)" }}>
        <Link href="/" className="text-xl font-bold mb-8">
          <span style={{ color: "var(--primary-light)" }}>TOMO</span><span style={{ color: "var(--accent)" }}>BILT</span>
          <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>Admin</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname.startsWith(item.href)
                  ? "text-white"
                  : ""
              }`}
              style={{
                background: pathname.startsWith(item.href) ? "rgba(37,99,235,0.15)" : "transparent",
                color: pathname.startsWith(item.href) ? "var(--primary-light)" : "var(--text-secondary)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={item.icon} />
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
          style={{ color: "var(--text-muted)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Déconnexion
        </button>
      </aside>

      {/* Content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
