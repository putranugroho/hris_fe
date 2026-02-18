import {
  LayoutDashboard,
  Calendar,
  Users,
  Briefcase,
  Plane,
  FileText,
} from "lucide-react";

export const menuItems = [
  {
    section: "MAIN",
    items: [
      { name: "Dashboard", path: "/", icon: LayoutDashboard },
      { name: "Calendar", path: "/calendar", icon: Calendar },
    ],
  },
  {
    section: "WORKFORCE",
    items: [
      { name: "WFA Scheduling", path: "/wfa", icon: Briefcase },
      { name: "Business Trip", path: "/business-trip", icon: Plane },
      { name: "Employees", path: "/employees", icon: Users },
      { name: "Documents", path: "/documents", icon: FileText },
    ],
  },
];
