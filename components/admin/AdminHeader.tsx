"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/admin/login") return null;

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="bg-charcoal text-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-black tracking-widest text-mint">ECOVAPRO · CRM</Link>
          <nav className="text-sm text-white/70 flex gap-4">
            <Link href="/admin" className="hover:text-white">Bookings</Link>
            <Link href="/" className="hover:text-white" target="_blank" rel="noopener noreferrer">View site</Link>
          </nav>
        </div>
        <button type="button" onClick={logout} className="text-xs text-white/60 hover:text-white">
          Log out
        </button>
      </div>
    </div>
  );
}
