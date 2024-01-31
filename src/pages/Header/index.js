import React, { useState,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "../Custom.css"
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import ListModal from 'pages/ListModal';

import { Button, Img, Line, List, Text } from "components";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { postSingleVenue } from 'service/api';


function Header() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name,setName]= useState();
    const [alphabetImages, setAlphabetImages] = useState([]);
    const[venueId,setVenueId]=useState("");
     const[data,setData]=useState("");


  useEffect(() => {
   
      // Read venue ID from the cookie
      // const savedVenueId = Cookies.get('venueId');
      const savedVenueId= localStorage.getItem('Venue')
      setVenueId(savedVenueId);
      const fetchData=async()=>{
      const req = {
        data: {
          id: savedVenueId,
        
        },
      };
  
      try {
        const res = await postSingleVenue(req);
        
        setName(res.data.data[0].name)
        const images = Array.from(name.toUpperCase()).map((letter) => getAlphabetImage(letter));
        setAlphabetImages(images);
        
      } catch (err) {
        console.error(err);
        
      }
      }
    fetchData();
  }, []);


    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    const formatDate = (date) => {
      return date.toLocaleDateString('en-GB'); // Adjust the locale as needed
    };
    const handlePrevClick = () => {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() - 1);
      setSelectedDate(newDate);
    };
  
    const handleNextClick = () => {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + 1);
      setSelectedDate(newDate);
    };
  
    const CustomInput = ({ value, onClick }) => (
      <div className="flex items-center custom-datepicker">
        <button className="p-2 mr-2" onClick={() => handlePrevClick()}>
          &lt;
        </button>
        <input
          className="border border-white rounded-full p-2 text-center w-full"
          onClick={onClick}
          value={formatDate(selectedDate)}
          readOnly
        />
        <button className="p-2 ml-2" onClick={() => handleNextClick()}>
          &gt;
        </button>
      </div>
    );
    const logout=()=>{
      localStorage.clear();
      window.location.href = "/";
    }

    const getAlphabetImage = (letter) => {
      // You can replace this with your own API or logic to fetch alphabet images
      // For simplicity, I'm using placeholder images from placekitten.com
      return `https://placekitten.com/100/100?text=${letter}`;
    };
    
  return (
    <div>
        
         <header className="bg-[#3f51b5] flex  flex-row md:gap-5 items-center  w-[100] justify-between ">
            
            <div style={{display:"flex",alignItems:"center"}}>
            <h1 style={{padding:"15px",color:"white",fontSize:"xx-large",marginRight:"20px"}} > <Link to="/" className='eqlogo'>eQ</Link></h1>
            {/* <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        className=" p-2 w-full custom-datepicker "
        customInput={<CustomInput />}
    
      /> */}
            </div>
        
        

         
              <div className="max-w-md  p-4">
    
    </div>
                
                <div className="flex flex-row font-rubik gap-5 items-center justify-center mb-3.5 md:ml-[0]  md:mt-0 mt-1 w-auto mr-[17px]">
                 
                  

            <div className="inline-flex  rounded-md">
               <div className="flex flex-row gap-2 items-center justify-start w-auto">
                      <Img
                        className="h-[30px] md:h-auto rounded-[50%] w-[30px]"
                        src="images/img_rectangle6.png"
                        alt="rectangleSix"
                      />
                      <Text
                        className="text-base text-right text-white-A700 w-auto mr-3"
                        size="txtRubikRomanMedium16"
                      >
                       {name}
                      </Text>
                    </div>
            <div className="relative">
                 <button
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex items-center justify-center h-full px-2 text-gray-600  border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {isDropdownOpen && (
          <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
            <div className="p-2 flex flex-col items-center">
              {/* <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
              >
                ReactJS Dropdown 1
              </a> */}
              <div className="p-2 flex flex-col items-center">
              <Button
                              className="cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm "
                              color="indigo_A400"
                              size="sm"
                              onClick={openModal}
                            >
                              Switch Venue
                            </Button>
                            <ListModal isOpen={isModalOpen} onRequestClose={closeModal} />

                            </div>
              <Button
                              className="cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm "
                              color="indigo_A400"
                              size="sm"
                              onClick={logout}
                            >
                              Logout
                            </Button>
             
                            
            </div>
          </div>
        )}
            </div>
        </div>

        <Img
                    className="h-full w-[23px]"
                    src="images/img_iconlylightou.svg"
                    alt="iconlylightou"
                  />
   


                </div>
               
              </header>
    </div>
  )
}

export default Header






