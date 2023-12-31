import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../Custom.css"
import 'react-datepicker/dist/react-datepicker.css';

import { Menu , MenuItem, Sidebar } from "react-pro-sidebar";
import Header from 'pages/Header';
import { Link } from 'react-router-dom';

import Dash from "../../assets/images/dashboard.png"
import customers from "../../assets/images/customer.png"
import reservations from "../../assets/images/Group4.png"
import setting from "../../assets/images/Group5.png"
import admissions from "../../assets/images/Group6.png"
import inventory from "../../assets/images/Group7.png"
// import { children } from 'cheerio/lib/api/traversing';


function Mysidebar({children}) {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    setActiveMenu(location.pathname); // Compare with the full path
  }, [location.pathname]);

    const sideBarMenu = [
        {
          imgSrc: Dash, // Assuming Dash is the import of your image file
          href: "/",
          active: window.location.pathname === "/",
          altText: "Dashboard", // Add alt text for accessibility
        },
        {
          imgSrc: customers, // Assuming customers is the import of your image file
          href: "/customers",
          active: window.location.pathname === "/customers",
          altText: "Customers", // Add alt text for accessibility
        },
        {
          imgSrc: reservations, // Assuming customers is the import of your image file
          href: "/reservations",
          active: window.location.pathname === "/reservations",
          altText: "reservations", // Add alt text for accessibility
        },
        {
          imgSrc: setting, // Assuming customers is the import of your image file
          href: "/setting",
          active: window.location.pathname === "/setting",
          altText: "setting", // Add alt text for accessibility
        },
        {
          imgSrc: admissions, // Assuming customers is the import of your image file
          href: "/admissions",
          active: window.location.pathname === "/admissions",
          altText: "admissions", // Add alt text for accessibility
        },
        {
          imgSrc: inventory, // Assuming customers is the import of your image file
          href: "/inventory",
          active: window.location.pathname === "/inventory",
          altText: "inventory", // Add alt text for accessibility
        },
      ]
    
  return (
    <div>
  <Header/>
    
   <div  style={{display:"flex"}} className="bg-gray-900_01">
     <Sidebar className="!sticky !w-[70px] bg-gray-900_01 flex h-auto justify-start  overflow-auto top-[0] m-[20px]">
            {
              <Menu
                menuItemStyles={{
                  button: {
                    padding: 0,
                    flexDirection: "column",
                    color: "#ffffff",
                    fontSize: "16px",
                    paddingTop: "12px",
                    paddingBottom: "5px",
                    
                  },
                }}
                className="flex flex-col items-center justify-center  mb-[790px] mt-[25px]  w-full"
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
}</Sidebar>
            
              <main style={{width:"100%"}}>{children}</main>
            
   </div>
   </div>
  )
}

export default Mysidebar;