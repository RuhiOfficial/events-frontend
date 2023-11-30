import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "../Custom.css"
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'pages/Modal';

import { Button, Img, Line, List, Text } from "components";



const DashboardPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  

  
  return (
    <>
    < div className={`relative ${isModalOpen ? 'filter blur' : ''}`}>
      <div className="flex flex-col font-roboto items-center justify-start mx-auto w-full">
        <div className="backdrop-opacity-[0.5] bg-gray-900  flex flex-col items-center justify-end   w-full">
          <div className="flex md:flex-col flex-row  items-start justify-between mx-auto md:px-5 w-full">
            <div style={{display:"flex"}}>
            
            <div className="flex flex-1 flex-col gap-[40px] items-center justify-start mb-[34px] w-full">
              <header className="bg-gray-900_01 flex md:flex-col flex-row md:gap-5 items-center  w-full justify-between">
          
                
              
              </header>
             

             <div className="flex flex-col font-inter items-center justify-start w-full md:w-full h-full  p-[2.1rem] ml-[40px]">
                <div className="flex flex-col gap-[26px] items-center justify-start w-full">
                  <div className="flex md:flex-col flex-row gap-[22px] items-end justify-between w-full">
                    <div className="flex md:flex-1 flex-col gap-[21px] items-center justify-start w-3/4 md:w-full">
                      <div className="flex flex-col gap-[34px] items-start justify-start w-full">
                        <div className="w-full flex justify-between">
                          <div>
                          <Text
                            className="text-4xl sm:text-[32px] md:text-[34px] text-white-A700"
                            size="txtInterSemiBold36"
                          >
                            Friday November 20th, 2023
                          </Text>
                          </div>
                          <div>
                          <Button
                              className="cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm "
                              color="indigo_A400"
                              size="sm"
                              onClick={openModal}
                            >
                              + Add Venue
                            </Button>
                            </div>
                        </div>
                        <div className="flex md:flex-col flex-row font-poppins gap-6 items-center justify-between ml-0.5 md:ml-[0] rounded shadow-bs w-full">
                          <List
                            className="md:flex-1 sm:flex-col flex-row gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 w-3/4 md:w-full"
                            orientation="horizontal"
                          >
                            <div className="bg-blue_gray-900_01 flex flex-col items-start justify-end sm:ml-[0] p-[7px] rounded w-full">
                              <div className="flex flex-col gap-6 items-start justify-start ml-3 md:ml-[0] mt-3 w-1/2 md:w-full">
                                <div className="flex flex-row gap-4 items-start justify-between w-full">
                                  <Img
                                    className="h-8 rounded w-8"
                                    src="images/img_productrequests.svg"
                                    alt="productrequests"
                                  />
                                  <div className="flex flex-col items-start justify-start">
                                    <Text
                                      className="text-[10px] text-white-A700 tracking-[0.10px]"
                                      size="txtPoppinsLight10"
                                    >
                                      Venue Total
                                    </Text>
                                    <Text
                                      className="text-sm text-white-A700 tracking-[0.14px]"
                                      size="txtPoppinsSemiBold14"
                                    >
                                      Customers
                                    </Text>
                                  </div>
                                </div>
                                <Text
                                  className="md:text-3xl sm:text-[28px] text-[32px] text-white-A700"
                                  size="txtPoppinsSemiBold32"
                                >
                                  10
                                </Text>
                              </div>
                            </div>
                            <div className="bg-blue_gray-900_01 flex flex-col items-start justify-end sm:ml-[0] p-[7px] rounded w-full">
                              <div className="flex flex-col gap-[25px] items-start justify-start ml-3 md:ml-[0] mt-3 w-[58%] md:w-full">
                                <div className="flex flex-row gap-5 items-start justify-between w-full">
                                  <div className="bg-indigo-A400 flex flex-col items-start justify-start p-1 rounded w-8">
                                    <div className="flex flex-col h-6 items-center justify-start w-6">
                                      <Img
                                        className="h-6 md:h-auto object-cover w-6"
                                        src="images/img_wine1.png"
                                        alt="wineOne"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-start justify-start">
                                    <Text
                                      className="text-[10px] text-white-A700 tracking-[0.10px]"
                                      size="txtPoppinsLight10"
                                    >
                                      Venue
                                    </Text>
                                    <Text
                                      className="text-sm text-white-A700 tracking-[0.14px]"
                                      size="txtPoppinsSemiBold14"
                                    >
                                      Reservations
                                    </Text>
                                  </div>
                                </div>
                                <Text
                                  className="md:text-3xl sm:text-[28px] text-[32px] text-white-A700"
                                  size="txtPoppinsSemiBold32"
                                >
                                  25
                                </Text>
                              </div>
                            </div>
                            <div className="bg-blue_gray-900_01 flex flex-col items-start justify-end sm:ml-[0] p-[7px] rounded w-full">
                              <div className="flex flex-col gap-[25px] items-start justify-start ml-3 md:ml-[0] mt-3 w-[54%] md:w-full">
                                <div className="flex flex-row gap-5 items-start justify-between w-full">
                                  <div className="bg-indigo-A400 flex flex-col h-8 items-center justify-start p-[5px] rounded w-8">
                                    <div className="flex flex-col h-[22px] items-center justify-start w-[22px]">
                                      <Img
                                        className="h-[22px] md:h-auto object-cover w-[22px]"
                                        src="images/img_ticket1.png"
                                        alt="ticketOne"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-start justify-start">
                                    <Text
                                      className="text-[10px] text-white-A700 tracking-[0.10px]"
                                      size="txtPoppinsLight10"
                                    >
                                      Total
                                    </Text>
                                    <Text
                                      className="text-sm text-white-A700 tracking-[0.14px]"
                                      size="txtPoppinsSemiBold14"
                                    >
                                      Admissions
                                    </Text>
                                  </div>
                                </div>
                                <Text
                                  className="md:text-3xl sm:text-[28px] text-[32px] text-white-A700"
                                  size="txtPoppinsSemiBold32"
                                >
                                  10
                                </Text>
                              </div>
                            </div>
                          </List>
                          <div className="bg-blue_gray-900_01 flex md:flex-1 flex-col items-start justify-end p-2 rounded w-[24%] md:w-full">
                            <div className="flex flex-col gap-[25px] items-start justify-start md:ml-[0] ml-[11px] mt-[11px] w-[47%] md:w-full">
                              <div className="flex flex-row gap-4 items-end justify-start w-full">
                                <Button
                                  className="flex h-8 items-center justify-center rounded w-8"
                                  color="indigo_A400"
                                >
                                  <Img
                                    className="h-[22px]"
                                    src="images/img_emergencyservice.png"
                                    alt="emergencyservic"
                                  />
                                </Button>
                                <Text
                                  className="my-[5px] text-sm text-white-A700 tracking-[0.14px]"
                                  size="txtPoppinsSemiBold14"
                                >
                                  Inventory
                                </Text>
                              </div>
                              <Text
                                className="md:text-3xl sm:text-[28px] text-[32px] text-white-A700"
                                size="txtPoppinsSemiBold32"
                              >
                                22
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue_gray-900_01 flex flex-col font-poppins  justify-start sm:px-5 px-[26px] rounded shadow-bs1 w-full">
                        <div className="flex flex-col gap-10  justify-start py-9 w-full">
                          <div className="flex flex-row md:gap-10 gap-[1053px]  justify-start w-auto md:w-full">
                            <div className="flex flex-col font-poppins items-center justify-start">
                              <Text
                                className="text-[22px] sm:text-lg text-white-A700 md:text-xl"
                                size="txtPoppinsSemiBold22"
                              >
                                Events
                              </Text>
                            </div>
                            <Button
                              className="cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm"
                              color="indigo_A400"
                              size="sm"
                            >
                              + Add Event
                            </Button>
                          </div>
                          <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between mb-[33px] w-full">
                            <List
                              className="flex-1 sm:flex-col flex-row gap-[31px] grid md:grid-cols-1 grid-cols-2 w-full"
                              orientation="horizontal"
                            >
                              <div className="bg-black-900_11 border border-blue_gray-800 border-solid hover:cursor-pointer flex flex-1 sm:flex-col flex-row gap-[21px] items-center justify-start sm:ml-[0] hover:mx-0 p-2.5 hover:shadow-bs shadow-bs hover:w-full w-full">
                                <Img
                                  className="sm:flex-1 h-[151px] md:h-auto object-cover w-[21%] sm:w-full"
                                  src="images/img_rectangle63.png"
                                  alt="rectangleSixtyThree"
                                />
                                <div className="flex flex-col items-start justify-start">

 <Text
                                    className="sm:text-[19px] md:text-[21px] text-[23px] text-white-A700"
                                    size="txtPoppinsSemiBold23"
                                  >
                                    Cottontail @ NIGHT | Thursdays
                                  </Text>
                                  <Text
                                    className="text-lg text-white-A700"
                                    size="txtPoppinsMedium18"
                                  >
                                    9:00 pm To 2.00 am
                                  </Text>
                                  <Text
                                    className="mt-3.5 text-sm text-white-A700"
                                    size="txtPoppinsRegular14"
                                  >
                                    Recurring weekly
                                  </Text>
                                </div>
                              </div>
                              <div className="bg-black-900_11 border border-blue_gray-800 border-solid hover:cursor-pointer flex flex-1 sm:flex-col flex-row gap-[21px] items-center justify-start sm:ml-[0] hover:mx-0 p-2.5 hover:shadow-bs shadow-bs hover:w-full w-full">
                                <Img
                                  className="sm:flex-1 h-[151px] md:h-auto object-cover w-[21%] sm:w-full"
                                  src="images/img_rectangle63.png"
                                  alt="rectangleSixtyThree"
                                />
                                <div className="flex flex-col items-start justify-start">
                                  <Text
                                    className="sm:text-[19px] md:text-[21px] text-[23px] text-white-A700"
                                    size="txtPoppinsSemiBold23"
                                  >
                                    Cottontail @ NIGHT | Thursdays
                                  </Text>
                                  <Text
                                    className="text-lg text-white-A700"
                                    size="txtPoppinsMedium18"
                                  >
                                    9:00 pm To 2.00 am
                                  </Text>
                                  <Text
                                    className="mt-3.5 text-sm text-white-A700"
                                    size="txtPoppinsRegular14"
                                  >
                                    Recurring weekly
                                  </Text>
                                </div>
                              </div>
                            </List>
                           
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-1 flex-col font-poppins gap-[18px] items-center justify-start md:mt-0 mt-[78px] w-[24%] md:w-full">
                      <div className="bg-blue_gray-900_01 flex flex-col items-start justify-center p-4 rounded shadow-bs3 w-full">
                        <Text
                          className="text-[22px] sm:text-lg text-white-A700 md:text-xl"
                          size="txtPoppinsSemiBold22"
                        >
                          Clicker Charts
                        </Text>
                        <Text
                          className="mt-[3px] text-sm text-white-A700"
                          size="txtInterRegular14"
                        >
                          Last Event
                        </Text>
                        <div
                          className="bg-cover bg-no-repeat flex flex-col h-[197px] items-center justify-start mt-[15px] pt-[22px] w-full"
                          style={{
                            backgroundImage: "url('images/img_group50.svg')",
                          }}
                        >
                          <Img
                            className="h-[175px]"
                            src="images/img_chart.svg"
                            alt="chart"
                          />
                        </div>
                        <div className="flex flex-row font-inter gap-[11px] items-start justify-start mb-1.5 mt-[23px] w-[87%] md:w-full">
                          <div className="flex relative w-[52%]">
                            <div className="flex flex-row gap-2 items-end justify-start my-auto sm:pr-5 pr-[34px] w-[53%]">
                              <div className="bg-blue-400 h-1.5 my-[5px] rounded-[3px] w-[18%]"></div>
                              <Text
                                className="text-sm text-white-A700"
                                size="txtInterRegular14"
                              >
                                Men
                              </Text>
                            </div>
                            <div className="flex flex-row gap-2 items-end justify-center ml-[-7px] my-auto pr-[13px] w-[53%] z-[1]">
                              <div className="bg-pink-300 h-1.5 my-[5px] rounded-[3px] w-[13%]"></div>
                              <Text
                                className="text-sm text-white-A700"
                                size="txtInterRegular14"
                              >
                                Women
                              </Text>
                            </div>
                          </div>
                          <div className="flex flex-row gap-2 items-start justify-start w-[45%]">
                            <div className="bg-teal-200 h-1.5 my-[5px] rounded-[3px] w-[7%]"></div>
                            <Text
                              className="text-sm text-white-A700"
                              size="txtInterRegular14"
                            >
                              Total Throughput
                            </Text>
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue_gray-900_01 flex flex-col items-center justify-start p-3.5 rounded shadow-bs3 w-full">
                        <div className="flex flex-row items-start justify-between mb-24 w-[99%] md:w-full">
                          <Text
                            className="text-[15px] text-white-A700"
                            size="txtPoppinsSemiBold15"
                          >
                            Notes
                          </Text>
                          <Text
                            className="text-pink-300 text-xs"
                            size="txtPoppinsSemiBold12"
                          >
                            + Add Notes
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                  <List
                    className="sm:flex-col flex-row font-poppins gap-[41px] grid md:grid-cols-1 grid-cols-2 justify-center w-full"
                    orientation="horizontal"
                  >
                    <div className="bg-blue_gray-900_01 flex flex-1 flex-col items-center justify-end p-[22px] sm:px-5 rounded shadow-bs4 w-full">
                      <div className="flex flex-col gap-[27px] items-start justify-start mt-0.5 w-[96%] md:w-full">
                        <Text
                          className="text-[22px] sm:text-lg text-white-A700 md:text-xl"
                          size="txtPoppinsSemiBold22"
                        >
                          Reservation Sales
                        </Text>
                        <div className="flex flex-col gap-[46px] items-center justify-start w-full">
                          <div className="flex flex-col items-center justify-start w-full">
                            <div className="flex flex-col gap-3.5 items-center justify-start w-full">
                              <div className="flex sm:flex-col flex-row gap-[29px] items-center justify-between w-full">
                                <Text
                                  className="text-white-A700 text-xs"
                                  size="txtPoppinsRegular12"
                                >
                                  $1
                                </Text>
                                <Line className="bg-white-A700 h-px sm:mt-0 my-2 outline outline-[0.5px] outline-gray-800 w-[95%]" />
                              </div>
                              <div className="flex sm:flex-col flex-row gap-3.5 items-center justify-between w-full">
                                <Text
                                  className="text-white-A700 text-xs"
                                  size="txtPoppinsRegular12"
                                >
                                  $0.9
                                </Text>
                                <Line className="bg-white-A700 h-px sm:mt-0 my-2 outline outline-[0.5px] outline-gray-800 w-[95%]" />
                              </div>
                              <div className="flex sm:flex-col flex-row gap-3.5 items-center justify-between w-full">
                                <Text
                                  className="text-white-A700 text-xs"
                                  size="txtPoppinsRegular12"
                                >
                                  $0.8
                                </Text>
                                <Line className="bg-white-A700 h-px sm:mt-0 my-2 outline outline-[0.5px] outline-gray-800 w-[95%]" />
                              </div>
                              <div className="flex sm:flex-col flex-row gap-3.5 items-center justify-between w-full">
                                <Text
                                  className="text-white-A700 text-xs"
                                  size="txtPoppinsRegular12"
                                >
                                  $0.7
                                </Text>
                                <Line className="bg-white-A700 h-px sm:mt-0 my-2 outline outline-[0.5px] outline-gray-800 w-[95%]" />
                              </div>
                              <div className="flex sm:flex-col flex-row gap-3.5 items-center justify-between w-full">
                                <Text
                                  className="text-white-A700 text-xs"
                                  size="txtPoppinsRegular12"
                                >
                                  $0.6
                                </Text>
                                <Line className="bg-white-A700 h-px sm:mt-0 my-2 outline outline-[0.5px] outline-gray-800 w-[95%]" />
                              </div>
                              <div className="flex sm:flex-col flex-row gap-6 items-center justify-between w-full">
                              <Text
                                  className="text-white-A700 text-xs"
                                  size="txtPoppinsRegular12"
                                >
                                  $0
                                </Text>
                                <Line className="bg-white-A700 h-px sm:mt-0 my-2 outline outline-[0.5px] outline-gray-800 w-[95%]" />
                              </div>
                            </div>
                          </div>
                          <div className="flex sm:flex-col flex-row font-opensans gap-[54px] items-start justify-center w-[68%] md:w-full">
                            <div className="flex flex-row gap-1.5 items-start justify-start w-[22%] sm:w-full">
                              <div className="bg-light_blue-A700 h-[11px] mb-1 rounded-[5px] w-[11px]"></div>
                              <Text
                                className="text-white-A700 text-xs"
                                size="txtOpenSans12"
                              >
                                Payment Links
                              </Text>
                            </div>
                            <div className="flex flex-row gap-1.5 items-start justify-center w-[14%] sm:w-full">
                              <div className="bg-pink-300 h-[11px] mb-1 rounded-[5px] w-[11px]"></div>
                              <Text
                                className="text-white-A700 text-xs"
                                size="txtOpenSans12"
                              >
                                Widgets
                              </Text>
                            </div>
                            <div className="flex flex-row gap-1.5 items-center justify-center w-[15%] sm:w-full">
                              <div className="bg-cyan-300 h-[11px] my-0.5 rounded-[5px] w-[11px]"></div>
                              <Text
                                className="text-white-A700 text-xs"
                                size="txtOpenSans12"
                              >
                                Table list
                              </Text>
                            </div>
                            <div className="flex flex-row gap-1.5 items-center justify-start w-[16%] sm:w-full">
                              <div className="bg-lime-400 h-[11px] my-0.5 rounded-[5px] w-[11px]"></div>
                              <Text
                                className="text-white-A700 text-xs"
                                size="txtOpenSans12"
                              >
                                Fast Pass
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue_gray-900_01 flex flex-1 flex-col items-center justify-end p-[22px] sm:px-5 rounded shadow-bs4 w-full">
                      <div className="flex flex-col gap-[27px] items-start justify-start mt-0.5 w-[96%] md:w-full">
                        <Text
                          className="text-[22px] sm:text-lg text-white-A700 md:text-xl"
                          size="txtPoppinsSemiBold22"
                        >
                          Ticket Sales
                        </Text>
                 
                 


                        <div className="flex flex-col gap-[46px] items-center justify-start w-full">
                          <div className="flex flex-col items-center justify-start w-full">
                            <div className="flex flex-col gap-3.5 items-center justify-start w-full">
                              <div className="flex sm:flex-col flex-row gap-[29px] items-center justify-between w-full">
                                <Text
                                  className="text-white-A700 text-xs"
                                  size="txtPoppinsRegular12"
                                >
                                  $1
                                </Text>
                                <Line className="bg-white-A700 h-px sm:mt-0 my-2 outline outline-[0.5px] outline-gray-800 w-[95%]" />
                              </div>
                              <div className="flex sm:flex-col flex-row gap-3.5 items-center justify-between w-full">
                                <Text
                                  className="text-white-A700 text-xs"
                                  size="txtPoppinsRegular12"
                                >
                                  $0.9
                                </Text>
                                <Line className="bg-white-A700 h-px sm:mt-0 my-2 outline outline-[0.5px] outline-gray-800 w-[95%]" />
                              </div>
                              <div className="flex sm:flex-col flex-row gap-3.5 items-center justify-between w-full">
                                <Text
                                  className="text-white-A700 text-xs"
                                  size="txtPoppinsRegular12"
                                >
                                  $0.8
                                </Text>
                                <Line className="bg-white-A700 h-px sm:mt-0 my-2 outline outline-[0.5px] outline-gray-800 w-[95%]" />
                              </div>
                              <div className="flex sm:flex-col flex-row gap-3.5 items-center justify-between w-full">
                                <Text
                                  className="text-white-A700 text-xs"
                                  size="txtPoppinsRegular12"
                                >
                                  $0.7
                                </Text>
                                <Line className="bg-white-A700 h-px sm:mt-0 my-2 outline outline-[0.5px] outline-gray-800 w-[95%]" />
                              </div>
                              <div className="flex sm:flex-col flex-row gap-3.5 items-center justify-between w-full">
                                <Text
                                  className="text-white-A700 text-xs"
                                  size="txtPoppinsRegular12"
                                >
                                  $0.6
                                </Text>
                                <Line className="bg-white-A700 h-px sm:mt-0 my-2 outline outline-[0.5px] outline-gray-800 w-[95%]" />
                              </div>
                              <div className="flex sm:flex-col flex-row gap-6 items-center justify-between w-full">
                                <Text
                                  className="text-white-A700 text-xs"
                                  size="txtPoppinsRegular12"
                                >
                                  $0
                                </Text>
                                <Line className="bg-white-A700 h-px sm:mt-0 my-2 outline outline-[0.5px] outline-gray-800 w-[95%]" />
                              </div>
                            </div>
                          </div>
                          <div className="flex sm:flex-col flex-row font-opensans gap-[54px] items-start justify-center w-[68%] md:w-full">
                            <div className="flex flex-row gap-1.5 items-start justify-start w-[22%] sm:w-full">
                              <div className="bg-light_blue-A700 h-[11px] mb-1 rounded-[5px] w-[11px]"></div>
                              <Text
                                className="text-white-A700 text-xs"
                                size="txtOpenSans12"
                              >
                                Payment Links
                              </Text>
                            </div>
                            <div className="flex flex-row gap-1.5 items-start justify-center w-[14%] sm:w-full">
                              <div className="bg-pink-300 h-[11px] mb-1 rounded-[5px] w-[11px]"></div>
                              <Text
                                className="text-white-A700 text-xs"
                                size="txtOpenSans12"
                              >
                                Widgets
                              </Text>
                            </div>
                            <div className="flex flex-row gap-1.5 items-center justify-center w-[15%] sm:w-full">
                              <div className="bg-cyan-300 h-[11px] my-0.5 rounded-[5px] w-[11px]"></div>
                              <Text
                                className="text-white-A700 text-xs"
                                size="txtOpenSans12"
                              >
                                Table list
                              </Text>
                            </div>
                            <div className="flex flex-row gap-1.5 items-center justify-start w-[16%] sm:w-full">
                              <div className="bg-lime-400 h-[11px] my-0.5 rounded-[5px] w-[11px]"></div>
                              <Text
                                className="text-white-A700 text-xs"
                                size="txtOpenSans12"
                              >
                                Fast Pass
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </List>
                </div>
              </div>





              








            </div>
            </div>







            
          </div>
        </div>
      </div>
    </div>
    <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default DashboardPage;
