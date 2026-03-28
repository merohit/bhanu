"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, Package, LogOut, Menu, X, ExternalLink } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
  { name: "Add Service", href: "/admin/add", icon: <PlusCircle size={18} /> },
  { name: "All Services", href: "/admin/services", icon: <Package size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      setIsAuthenticated(true); // Let login page render without redirect
      return;
    }
    const auth = localStorage.getItem("subhband_admin_auth");
    if (auth !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router, pathname]);

  const logout = () => {
    localStorage.removeItem("subhband_admin_auth");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
          <span className="text-white/50 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-dark-800/95 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <span className="text-sm text-dark-900 font-bold">S</span>
            </div>
            <span className="text-lg font-semibold text-white">Subh Band</span>
            <span className="bg-gold/15 text-gold text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wider uppercase">
              Admin
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-white/40 hover:text-gold text-sm transition-colors"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">View Site</span>
          </Link>
          <div className="w-px h-5 bg-white/10"></div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-white/40 hover:text-red-400 text-sm transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 bg-dark-800/95 backdrop-blur-xl border-r border-white/5 z-30 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <nav className="p-3 space-y-1 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gold/10 text-gold border border-gold/15"
                    : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="pt-16 md:pl-60">
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
