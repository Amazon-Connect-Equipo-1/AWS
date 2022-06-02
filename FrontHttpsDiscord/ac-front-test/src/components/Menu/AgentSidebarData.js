/* Agent Sidebar Data
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import React from "react";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { t } from "i18next";

export const AgentSidebarData = [
  {
    title: "Dashboard",
    path: "/agent",
    icon: <MdDashboard />,
    cName: "nav-text",
  },
  {
    title: "Feedback",
    path: "/agent-qa",
    icon: <MdOutlineCheckBox />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IoSettingsSharp />,
    cName: "nav-text",
  },
];
