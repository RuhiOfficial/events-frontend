import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../Custom.css";
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import Header from 'pages/Header';
import { Link, useNavigate } from 'react-router-dom';

import Dash from "../../assets/images/dashboard.png";
import customers from "../../assets/images/customer.png";
import reservations from "../../assets/images/Group4.png";
import setting from "../../assets/images/Group5.png";
import admissions from "../../assets/images/Group6.png";
import inventory from "../../assets/images/Group7.png";

function Mysidebar({ children }) {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    setActiveMenu(location.pathname); // Compare with the full path
  }, [location.pathname]);

  const sideBarMenu = [
    {
      imgSrc: Dash,
      href: "/",
      altText: "Dashboard",
    },
    {
      imgSrc: customers,
      href: "/customers",
      altText: "Customers",
    },
    {
      imgSrc: reservations,
      href: "/reservations",
      altText: "Reservations",
    },
    {
      imgSrc: setting,
      href: "/setting",
      altText: "Setting",
    },
    {
      imgSrc: admissions,
      href: "/admissions",
      altText: "Admissions",
    },
    {
      imgSrc: inventory,
      href: "/inventory",
      altText: "Inventory",
    },
  ];

  return (
    <>
    
    {auth?
    <div>
      <Header />
      <div style={{ display: "flex" }} className="bg-gray-900_01">
        <Sidebar className="!sticky !w-[70px] bg-gray-900_01 flex h-auto justify-start overflow-auto top-[0] m-[19px]">
          <Menu
            menuItemStyles={{
              button: {
                padding: 0,
                paddingLeft: "13px",
                flexDirection: "column",
                color: "#ffffff",
                fontSize: "16px",
                paddingTop: "13px",
                paddingBottom: "13px",
                alignItems: "flex-start",
              },
            }}
            className="flex flex-col items-center justify-center mb-[790px] mt-[25px] w-full"
          >
            {sideBarMenu?.map((menu, i) => (
              <MenuItem
                key={`sideBarMenuItem${i}`}
                className={`menu-item ${activeMenu === menu.href ? 'active-menu' : ''}`}
              >
                <Link to={menu.href}>
                  <img src={menu.imgSrc} alt={menu.altText} />
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Sidebar>
        <main style={{ width: "100%" }}>{children}</main>
      </div>
    </div>
  );
}

export default Mysidebar;
