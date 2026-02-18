"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import useSidebar from "./useSidebar_temp";

export default function ClientLayout({ children }) {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div style={{ flex: 1, background: "#f8fafc", minHeight: "100vh" }}>
        <Header />
        <main style={{ padding: "30px" }}>{children}</main>
      </div>
    </div>
  );
}
