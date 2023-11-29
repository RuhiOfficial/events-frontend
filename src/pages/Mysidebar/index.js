import React from 'react';

import "../Custom.css"
import 'react-datepicker/dist/react-datepicker.css';

import { Menu , MenuItem, Sidebar } from "react-pro-sidebar";
import Header from 'pages/Header';

import Dash from "../../assets/images/dashboard.png"
import customers from "../../assets/images/customer.png"
import reservations from "../../assets/images/Group4.png"
import setting from "../../assets/images/Group5.png"
import admissions from "../../assets/images/Group6.png"
import inventory from "../../assets/images/Group7.png"
// import { children } from 'cheerio/lib/api/traversing';


function Mysidebar({children}) {
    const sideBarMenu = [
        {
          imgSrc: Dash, // Assuming Dash is the import of your image file
          href: "/dashboard",
          active: window.location.pathname === "/dashboard",
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
    
   <div  style={{display:"flex"}}>
     <Sidebar className="!sticky !w-[70px] bg-gray-900_01 flex h-auto justify-start  overflow-auto top-[0] ">
            {/* <h1 style={{padding:"13px",color:"white",textAlign:"center",fontSize:"xx-large"}} >eQ</h1> */}
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
                  },
                }}
                className="flex flex-col items-center justify-center  mb-[790px] mt-[25px]  w-full"
              >
                {sideBarMenu?.map((menu, i) => (
                  <MenuItem key={`sideBarMenuItem${i}`} {...menu}>
                    <img src={menu.imgSrc} alt={menu.altText} />
                  </MenuItem>
                ))}
              </Menu>
            </Sidebar>
            
              <main style={{width:"100%"}}>{children}</main>
            
   </div>
   </div>
  )
}

export default Mysidebar;