// Modal.js
import React,{useEffect,useState} from 'react';
import Modal from 'react-modal';
import { Button, Img, Line, List, Text } from "components";
import { getVenue } from 'service/api';
import Cookies from 'js-cookie';

const ListModal = ({ isOpen, onRequestClose }) => {
    const [loading, setLoading] = useState(false);
    const [venueList, setVenueList] = useState([]);
 const list=async()=>{
    const req = {};
      
    await getVenue(req)
      .then((res) => {
        setVenueList(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  

useEffect(()=>{
 list();

},[])



const handleListItemClick = (venueId) => {
    // Update the cookie with the clicked venueId
    Cookies.set('venueId', venueId);

    // Handle other actions if needed
    console.log(`List item clicked: ${venueId}`);
    window.location.href = "/";
    // Add your logic here, e.g., navigate to a different page
  };
 







console.log(venueList,"list is ")



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: 'none',
          border: 'none',
          padding: 0,
          overflow: 'auto',
        },
       
      }}
    >
      <h2>Modal Content</h2>
      <div style={{ height: '700px',width:'900px' /* Add a specific height to trigger scrolling */ }}>
      <div className="bg-blue_gray-900_01 flex flex-col font-poppins  justify-start sm:px-5 px-[26px] rounded shadow-bs1 w-full">
                        <div className="flex flex-col gap-10  justify-start py-9 w-full">
                         
                      
                          <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between mb-[33px] w-full">
                          {loading ? (
        <p>Loading...</p>
      ) : (
        <List
          className="flex-1 sm:flex-col flex-row gap-[31px] grid md:grid-cols-1 grid-cols-2 w-full"
          orientation="horizontal"
        >
          {venueList.map((item) => (
            <div
              key={item.id}
              className="bg-black-900_11 border border-blue_gray-800 border-solid cursor-pointer  hover:bg-gray-700 flex flex-1 sm:flex-col flex-row gap-[21px] items-center justify-start sm:ml-[0] mx-0 p-2.5 shadow-bs transition duration-300 hover:bg-blue_gray-700 hover:border-blue_gray-600"
              onClick={() => handleListItemClick(item.id)}
            >
              {/* <Img
                className="sm:flex-1 h-[151px] md:h-auto object-cover w-[21%] sm:w-full"
                src={item.thumbnailUrl}
                alt={`Photo ${item.id}`}
              /> */}

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
                  {item.name}
                </Text>
                <Text
                  className="text-lg text-white-A700"
                  size="txtPoppinsMedium18"
                >
                  {item.email}
                </Text>
                <Text
                  className="mt-3.5 text-sm text-white-A700"
                  size="txtPoppinsRegular14"
                >
                  {item.albumId}
                </Text>
              </div>
            </div>
          ))}
        </List>
      )}
    
                           
                          </div>
                        </div>
                      </div>
      <button onClick={onRequestClose}>Close Modal</button>
      </div>
    </Modal>
  );
};

export default ListModal;
