"use client";

import { usePathname } from "next/navigation";
import { menuItems } from "./menuConfig_temp";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();

  return (
    <div
      style={{
        width: collapsed ? "80px" : "260px",
        background: "#0f172a",
        color: "#94a3b8",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo + Toggle */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: collapsed ? "center" : "space-between",
          alignItems: "center",
          borderBottom: "1px solid #1e293b",
        }}
      >
        {!collapsed && (
          <h2 style={{ color: "#fff", margin: 0 }}>HRIS</h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            transition: "0.3s",
            transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Menu Sections */}
      <div style={{ padding: "20px 10px", flex: 1 }}>
        {menuItems.map((section) => (
          <div key={section.section}>
            {!collapsed && (
              <p
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                  color: "#475569",
                }}
              >
                {section.section}
              </p>
            )}

            {section.items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    title={collapsed ? item.name : ""}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px",
                      marginBottom: "8px",
                      borderRadius: "8px",
                      background: active ? "#1e293b" : "transparent",
                      color: active ? "#fff" : "#94a3b8",
                      justifyContent: collapsed ? "center" : "flex-start",
                      transition: "0.2s",
                    }}
                  >
                    <Icon size={18} />
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
