import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import LayoutNav from "@/components/LayoutNav";

export const metadata = {
  title: "Next.js App Router + Material UI v5",
  description: "Next.js App Router + Material UI v5",
};

// const DRAWER_WIDTH = 200;

// const LINKS = [
//   { text: "Home", href: "/", icon: HomeIcon },
//   { text: "Products", href: "/products", icon: ProductionQuantityLimitsIcon },
//   { text: "Favourite", href: "/Favourite", icon: StarIcon },
// ];

// const PLACEHOLDER_LINKS = [
//   { text: "Settings", icon: SettingsIcon },
//   { text: "Support", icon: SupportIcon },
//   { text: "Logout", icon: LogoutIcon },
// ];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
        <LayoutNav>

        {children}

        </LayoutNav>

        </ThemeRegistry>
      </body>
    </html>
  );
}
