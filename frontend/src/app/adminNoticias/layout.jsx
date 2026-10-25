"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebarAdmin";
import "./adminLayout.css";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLogin = pathname === "/adminNoticias/login";

  if (isLogin) {
    return children;
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-conteudo">{children}</main>
    </div>
  );
}
