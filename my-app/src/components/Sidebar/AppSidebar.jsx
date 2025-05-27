import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

// AppSidebar.js
const AppSidebar = ({ menuItems, onGenreSelect }) => (
  <Sidebar className="h-full w-full sticky top-0">
    <div className="h-full overflow-y-auto bg-white border-r border-gray-200">
      <Menu
        menuItemStyles={{
          button: {
            color: "#4B5563",
            backgroundColor: "transparent",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
            "&:hover": {
              backgroundColor: "#F3F4F6",
              color: "#2563EB",
            },
            "&.active": {
              backgroundColor: "#EFF6FF",
              color: "#2563EB",
              fontWeight: "600",
            },
          },
        }}
      >
        {menuItems.map((item) =>
          item.children ? (
            <SubMenu
              key={item.label}
              label={item.label}
              style={{
                backgroundColor: "transparent",
                color: "#4B5563",
                fontSize: "14px",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "#F3F4F6",
                },
              }}
            >
              {item.children.map((child) => (
                <MenuItem
                  key={child.label}
                  onClick={() => onGenreSelect(child.label)}
                  style={{
                    paddingLeft: "32px",
                    fontSize: "13px",
                    "&:hover": {
                      backgroundColor: "#F3F4F6",
                      color: "#2563EB",
                    },
                  }}
                >
                  {child.label}
                </MenuItem>
              ))}
            </SubMenu>
          ) : (
            <MenuItem
              key={item.label}
              onClick={() => onGenreSelect(null)}
              style={{
                fontSize: "14px",
                fontWeight: "500",
                "&:hover": {
                  backgroundColor: "#F3F4F6",
                  color: "#2563EB",
                },
              }}
            >
              {item.label}
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  </Sidebar>
);

export default AppSidebar;
