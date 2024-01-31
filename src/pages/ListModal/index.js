// Modal.js
import React,{useEffect,useState} from 'react';
import Modal from 'react-modal';
import { Button, Img, Line, List, Text } from "components";
import { postVenueList ,getLocalstorage} from 'service/api';
import Cookies from 'js-cookie';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const ListModal = ({ isOpen, onRequestClose }) => {
  // const companyId = Cookies.get('companyId');
  const companyId=localStorage.getItem('companyId');
  console.log(companyId,"id if company is ===>>>")
    const [isLoading, setIsLoading] = useState(true);
    const [venueList, setVenueList] = useState([]);
 const list=async()=>{
    const req = {
      data:{
        id:companyId,
      }
    };
      console.log(req,"req from the header page is ")
    await postVenueList(req).then((res) => {
        setVenueList(res.data.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err);
      });
  }

//  const fetch=async()=>{
//   try {
//     console.log('Fetching data...');
//     const vid = localStorage.getItem('Venue');
//     const req = {
//       data: {
//         venue_id: vid,
//       },
//     };
//     const res = await getLocalstorage(req);
//     console.log(res, 'Response coming from Header list modal PAGE api ======>>');
   
//       localStorage.setItem('canvasBackgroundImage', res.data[0].imageBoxUrl);
//     const backgroundImage = res.data[0].imageBoxUrl;
//     const boxes = res.data[0].boxes;
//     localStorage.setItem(
//       'canvasState',
//       JSON.stringify({ backgroundImage, boxes /* ...other state variables */ })
//     );

//     }
    
    
    
   
//   catch (err) {
//     console.error(err);
//     console.error('Fetch failed');
//   }







//  }





  

useEffect(()=>{
  
 list();

},[])



console.log(venueList,"list of venues==>")


const handleListItemClick = (venueId) => {
    // Update the cookie with the clicked venueId
    Cookies.set('venueId', venueId);
   localStorage.setItem('Venue',venueId);

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
      
      <div style={{ height: '700px',width:'900px' /* Add a specific height to trigger scrolling */ }}>
      <div className="bg-blue_gray-900_01 flex flex-col font-poppins  justify-start sm:px-5 px-[26px] rounded shadow-bs1 w-full">
                        <div className="flex flex-col gap-10  justify-start py-9 w-full">
                         
                      
                          <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between mb-[33px] w-full">
                          {isLoading ? (
  // Loading state
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto', width: '100%' }}>
    <ScaleLoader css={override} color={'#5051f9'} loading={isLoading} />
    <h1 style={{ color: '#5051f9', fontSize: '20px' }}> Loading!</h1>
  </div>
) : (
        <List
          className="flex-1 sm:flex-col flex-row gap-[31px] grid md:grid-cols-1 grid-cols-3 w-full "
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
                                  className="sm:flex-1 h-[60px] md:h-auto object-cover w-[30%] sm:w-full"
                                  src="images/img_rectangle63.png"
                                  alt="rectangleSixtyThree"
                                />

              <div className="flex flex-col items-start justify-start">
                <Text
                  className="sm:text-[19px] md:text-[21px] text-[17px] text-white-A700"
                  size="txtPoppinsSemiBold23"
                >
                  {item.name}
                </Text>
                <Text
                  className="text-xs text-white-A700 "
                  size="txtPoppins"
                >
                  {item.email}
                </Text>
                {/* <Text
                  className="mt-3.5 text-sm text-white-A700"
                  size="txtPoppinsRegular14"
                >
                  {item.albumId}
                </Text> */}
              </div>
            </div>
          ))}
        </List>
      )}
    
                           
                          </div>
                        </div>
                      </div>
      {/* <button onClick={onRequestClose}>Close Modal</button> */}
      </div>
    </Modal>
  );
};

export default ListModal;
