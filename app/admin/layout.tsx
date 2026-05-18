import type { Metadata } from "next";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Admin — EcovaPro CRM",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-charcoal">
      <AdminHeader />
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8">{children}</div>
    </div>
  );
}
