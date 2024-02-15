import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../Custom.css"
import 'react-datepicker/dist/react-datepicker.css';

import { Menu , MenuItem, Sidebar } from "react-pro-sidebar";
import Header from 'pages/Header';
import { Link } from 'react-router-dom';

import Dash from "../../assets/images/dashboard.png"
import customers from "../../assets/images/customer.png"

import setting from "../../assets/images/Group5.png"
import admissions from "../../assets/images/Group6.png"
import inventory from "../../assets/images/Group7.png"
import Calendar from '../../assets/images/calendar.png';
import Reservation from '../../assets/images/reservation.png';
import Layout from '../../assets/images/layout.png';
import Clipboard from '../../assets/images/clipboard.png';

// import { children } from 'cheerio/lib/api/traversing';


function Mysidebar({children}) {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");
  const [tooltipText, setTooltipText] = useState("");
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
          imgSrc: Reservation, // Assuming customers is the import of your image file
          href: "/reservation",
          active: window.location.pathname === "/reservation",
          altText: "reservation", // Add alt text for accessibility
        },
        {
          imgSrc: Layout, // Assuming customers is the import of your image file
          href: "/canvas",
          active: window.location.pathname === "/canvas",
          altText: "Canvas", // Add alt text for accessibility
        },
        
        {
          imgSrc: Clipboard, // Assuming customers is the import of your image file
          href: "/tickets",
          active: window.location.pathname === "/tickets",
          altText: "tickets ", // Add alt text for accessibility
        },
        {
          imgSrc: Calendar, // Assuming customers is the import of your image file
          href: "/calender",
          active: window.location.pathname === "/calender",
          altText: "calender ", // Add alt text for accessibility
        },
       
      ]


      const handleMouseEnter = (altText) => {
        setTooltipText(altText);
      };
    
      const handleMouseLeave = () => {
        setTooltipText("");
      };
      
    
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
                   <div className="tooltip-container">
                     <img src={menu.imgSrc} alt={menu.altText} className='sidebar-img' />
                     <span className="tooltip-text">{menu.altText}</span>
                   </div>
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