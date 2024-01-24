
import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Circle,Group , Text as KonvaText } from 'react-konva';

// Import the LayoutPopup component
import LayoutPopup from 'components/Layoutpopup';
import { Button, Img, List, Text } from "components";
import { useLocation, useHistory } from 'react-router-dom';
import { getCanvasTable ,postLayout,getSectionList} from 'service/api';
import {  ToastContainer,toast } from "react-toastify";
import { getLocalstorage } from 'service/api';

function Canvas() {
  const location = useLocation();

    const stageRef = useRef(null);
    const [shapes, setShapes] = useState([]);
    const [newShape, setNewShape] = useState({ tool: 'line', points: [] });
    const [textValue, setTextValue] = useState('');
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [myBackgroundImage, setMyBackgroundImage] = useState(null);
    const [layoutName, setLayoutName] = useState('');
    const [gridSize, setGridSize] = useState(50); // Default grid size
    const [gridVisible, setGridVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [boxes, setBoxes] = useState([]);
    const [count, setCount] = useState(3); 
    const [selectedBox, setSelectedBox] = useState(null);
    const [tableList, setTableList] = useState([]);
    const [droppedTables, setDroppedTables] = useState([]);
    const [activeTables, setActiveTables] = useState([]);
    const [inactiveTables, setInactiveTables] = useState([]);
    const [defaultLayout, setDefaultLayout] = useState([]);
    const vid=localStorage.getItem('Venue')
    const nameLayout=localStorage.getItem('layoutName')
    const [selectedResizingBox, setSelectedResizingBox] = useState(null);
    const [myImage, setMyImage] = useState("");

  
//   const fetch = async () => {
//     const vid = localStorage.getItem('Venue');
//     const req = {
//       data: {
//         venue_id: vid,
//       },
//     };
//     try {
//       const res = await getLocalstorage(req);
//       console.log(res, 'Response coming from the localStorage ============= ======>>');
//       setDefaultLayout(res.data[0]);
//       const backImage= localStorage.getItem('canvasBackgroundImage')
     
//       setMyImage(backImage);
//       console.log(backImage,"it exists or not ??????==============>>>>>")
//       if(backImage == null){
//         const  pic=res.data[0].image_url;
//        localStorage.setItem('canvasBackgroundImage',res.data[0].image_url)


       
//        const parsedBoxes = JSON.parse(req.data[0].boxes);

//        // Set background image and boxes
//        setBackgroundImage(pic);
       
//        setBoxes(parsedBoxes);
//        localStorage.setItem(
//         'canvasState',
//         JSON.stringify({ backgroundImage, boxes, /* ...other state variables */ })
//       );
    
//      }

//       }
//   catch (err) {
//       console.error(err);
//     }
//   };
  
//    useEffect(()=>{
//     fetch();
//    }
// ,[myImage,backgroundImage]
//    )






   
useEffect(() => {
  const savedCanvasState = localStorage.getItem('canvasState');


  if (savedCanvasState) {
    const loadedBackgroundImage = localStorage.getItem('canvasBackgroundImage');
    

    if (loadedBackgroundImage) {
      const img = new Image();

      if (loadedBackgroundImage.startsWith('data:image')) {
        // If it's a base64 string, set it as the src
        img.src = loadedBackgroundImage;

        img.onload = () => {
          // Convert the loaded image to a base64 string
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const context = canvas.getContext('2d');
          context.drawImage(img, 0, 0);
          const base64String = canvas.toDataURL('image/jpeg').split(',')[1];
          
          // Set myBackgroundImage with the base64 string
          setMyBackgroundImage(base64String);
        };

        img.onerror = (error) => {
          console.error('Error loading image:', error);
        };
      } else {
        // If it's a File object, handle it differently
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;

          img.onload = () => {
            setBackgroundImage(img);
          };

          img.onerror = (error) => {
            console.error('Error loading image:', error);
          };
        };

        // Assuming loadedBackgroundImage is a File object
        reader.readAsDataURL(loadedBackgroundImage);
      }
    }

    const parsedCanvasState = JSON.parse(savedCanvasState);
    setBoxes(parsedCanvasState.boxes || []);
    // ... (restore other state variables)
  } else {
    console.log("No saved canvas state");
  }
}, []);

  ///////////Table List///////////////
useEffect(()=>{
   table()
},[])

async function table() {
  const req = {
    data:{
      venue_id:vid,
    }
  };

  await getSectionList(req)
    .then((res) => {
      console.log(res,"canvas table list ====>>")
       setTableList(res.data.data);
      
    })
    .catch((err) => {
      console.error(err);
    });
}


  useEffect(() => {
    // Read layout information from URL parameters
    const params = new URLSearchParams(location.search);
    const layoutNameParam = params.get('layoutName');
    const backgroundImageParam = params.get('backgroundImage');
    const boxesParam = params.get('boxes');

    if (layoutNameParam && backgroundImageParam && boxesParam) {
      // Convert boxesParam to an array (assuming it's stored as a JSON string in the URL)
      const parsedBoxes = JSON.parse(boxesParam);

      // Set background image and boxes
      setBackgroundImage(new Image(backgroundImageParam));
      setLayoutName(layoutNameParam);
      setBoxes(parsedBoxes);
    }
  }, [location.search]);


  useEffect(() => {
    // Save canvas state to local storage whenever the background image or boxes change
    localStorage.setItem(
      'canvasState',
      JSON.stringify({ backgroundImage, boxes, /* ...other state variables */ })
    );
  }, [backgroundImage, boxes /*, other state variables */]);
  
 

useEffect(() => {
  if (backgroundImage || myBackgroundImage) {
    const img = new Image();
    img.src = backgroundImage ? URL.createObjectURL(backgroundImage) : `data:image/jpeg;base64,${myBackgroundImage}`;
    img.onload = () => {
      const stage = stageRef.current;

      if (stage) {
        const desiredMaxWidth = 1500; // Set your desired maximum width

        // Determine the width to use (original width or maximum width)
        const newWidth = Math.min(desiredMaxWidth, img.width);

        // Calculate the aspect ratio of the image
        const aspectRatio = img.width / img.height;

        // Calculate the new height based on the aspect ratio and the new width
        const newHeight = newWidth / aspectRatio;

        // Create a canvas with the new dimensions
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        const context = canvas.getContext('2d');

        // Draw the image on the canvas with the new dimensions
        context.drawImage(img, 0, 0, newWidth, newHeight);
        // my 

        // Convert the canvas content to a base64 string
        const resizedImageDataUrl = canvas.toDataURL('image/jpeg').split(',')[1];

        // Set the resized image as the background
        setMyBackgroundImage(resizedImageDataUrl);

        stage.width(newWidth);
        stage.height(newHeight);
        stage.batchDraw();
      }
    };
  }
}, [backgroundImage, myBackgroundImage,myImage]);

    // const saveToHistory = () => {
    //   const newHistory = [...history.slice(0, historyIndex + 1), shapes];
    //   setHistory(newHistory);
    //   setHistoryIndex(newHistory.length - 1);
    // };
  
  
    const addText = () => {
      if (newShape.tool === 'text' && textValue) {
        const newText = {
          tool: 'text',
          text: textValue,
          x: 50, // Set initial X position (adjust as needed)
          y: 50, // Set initial Y position (adjust as needed)
          fontSize: 16,
          fontFamily: 'Arial',
          fill: 'black',
        };
        const updatedShapes = [...shapes, newText];
  
        // Save the current canvas state in history
        setHistory([...history.slice(0, historyIndex + 1), updatedShapes]);
        setHistoryIndex(historyIndex + 1);
  
        setShapes(updatedShapes);
        setTextValue('');
      }
    };
  
   
    
    const onBackgroundImageChange = (layoutName, image) => {


      setBackgroundImage(image);
      setLayoutName(layoutName);
    
      if (image) {
        // Convert the image to a data URL and store it in the URL parameters
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageDataUrl = event.target.result;
    
          // Save the canvas background image to local storage
          localStorage.setItem('canvasBackgroundImage', imageDataUrl);
    
          // Update URL parameters
          const params = new URLSearchParams(location.search);
          params.set('layoutName', layoutName);
          params.set('backgroundImage', imageDataUrl);
          params.set('boxes', JSON.stringify(boxes));
          history.push(`${location.pathname}?${params.toString()}`);
        };
        reader.readAsDataURL(image);
        setMyBackgroundImage(null)
        setGridVisible(false);
        resetCanvasState();
      } else {
        // Clear the background image and boxes in the URL parameters
        const params = new URLSearchParams(location.search);
        params.delete('layoutName');
        params.delete('backgroundImage');
        params.delete('boxes');
        history.push(`${location.pathname}?${params.toString()}`);
      }
    };
    
  
    // ...


    /////////////Modal////////
    const openModal = () => {
        console.log("openModal")
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
      
      
      // const handleBoxDragEnd = (e, index) => {
      //   const updatedBoxes = [...boxes];
      //   updatedBoxes[index] = {
      //     ...updatedBoxes[index],
      //     x: e.target.x(),
      //     y: e.target.y(),
      //   };
      //   setBoxes(updatedBoxes);
      //   setSelectedBox(updatedBoxes[index]); // Update the selected box
      // };
      const handleBoxDragMove = (e, index) => {
        const updatedBoxes = [...boxes];
        const box = updatedBoxes[index];
      
        if (e.target.hasName('resizeHandle')) {
          // Handle resizing
          const scale = stageRef.current.getStage().scaleX();
          const newWidth = Math.max(0, e.target.x() / scale);
          const newHeight = Math.max(0, e.target.y() / scale);
      
          box.width = newWidth;
          box.height = newHeight;
        } else {
          // Handle normal dragging
          const scale = stageRef.current.getStage().scaleX();
          box.x = e.target.x() / scale;
          box.y = e.target.y() / scale;
        }
      
        setBoxes(updatedBoxes);
      };
      
      
      const handleBoxDragEnd = (e, index) => {
        const updatedBoxes = [...boxes];
        
        if (e.target.hasName('resizeHandle')) {
          // Resize the box
          updatedBoxes[index] = {
            ...updatedBoxes[index],
            width: Math.max(0, e.target.x()),
            height: Math.max(0, e.target.y()),
          };
        } else {
          // Handle normal dragging
          updatedBoxes[index] = {
            ...updatedBoxes[index],
            x: e.target.x(),
            y: e.target.y(),
          };
        }
      
        setBoxes(updatedBoxes);
        setSelectedBox(updatedBoxes[index]);
        setSelectedResizingBox(null);
      };
      
      
      
    
      const removeSelectedBox = () => {
        if (selectedBox !== null) {
          const updatedBoxes = boxes.filter((box) => box !== selectedBox);
          setBoxes(updatedBoxes);
          setSelectedBox(null); // Clear the selected box
        }
      };
    
      const handleTableButtonClick = () => {
        if (selectedBox !== null) {
          setBoxes([...boxes, selectedBox]); // Add the selected box back to the grid
          setSelectedBox(null); // Clear the selected box
        }
      };
    
      const handleTableListClick = (table) => {
        // Find and remove the box associated with the selected table
        const updatedBoxes = boxes.filter((box) => box.label !== table.table_name);
        
        // Add a new box with increased dimensions
        const newBox = {
          label: table.table_name, // Adjust the property name according to your API response
          width: gridSize * 1.5, // Adjust the width as needed
          height: gridSize * 1.5, // Adjust the height as needed
          x: 0,
          y: 0,
        };
      
        setBoxes([...updatedBoxes, newBox]);
        setSelectedBox(newBox); // Set the selected box to the newly added box
      };
      
      
    
      const handleDropTable = () => {
        if (selectedBox !== null) {
          setBoxes([...boxes, { ...selectedBox, x: 0, y: 0 }]); // Add the selected table to the grid
          setSelectedBox(null); // Clear the selected table
        }
      };
    
      

      const renderTableList = () => {
        // Group tables by section_id
        const tablesBySection = {};
      
        tableList.forEach((section) => {
          const sectionId = section.section_name;
          if (!tablesBySection[sectionId]) {
            tablesBySection[sectionId] = [];
          }
          tablesBySection[sectionId] = [...tablesBySection[sectionId], ...section.tables];
        });
      
        return (
          <ul className="table-list">
            {Object.entries(tablesBySection).map(([sectionId, tables], sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                <li className="table-list-item bg-[transparent]  " style={{color:"white"}}>{` ${sectionId}`}</li>
                {tables.map((table, index) => (
                  <li
                    key={index}
                    className={`table-list-item ${
                      selectedBox && selectedBox.label === table.table_name ? 'selected' : ''
                    }`}
                    onClick={() => handleTableListClick(table)}
                  >
                    {table.table_name}
                    {selectedBox && selectedBox.label === table.table_name && (
                      <span
                        className="resize-handle"
                        draggable
                        onDragEnd={(e) => handleResizeEnd(e, selectedBox)}
                      />
                    )}
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        );
      };
      
      
      
      

      const handleResizeEnd = (e, box) => {
        const stage = stageRef.current.getStage();
      
        if (stage) {
          const scale = stage.scaleX(); // Consider the current scale of the stage
      
          const mouseX = e.target.x() / scale;
          const mouseY = e.target.y() / scale;
      
          const updatedBoxes = boxes.map((b) =>
            b.label === box.label
              ? {
                  ...b,
                  width: Math.max(0, mouseX - b.x),
                  height: Math.max(0, mouseY - b.y),
                }
              : b
          );
      
          setBoxes(updatedBoxes);
        }
      };
      
      // const handleResizeDragEnd = (e, box) => {
      //   const stage = stageRef.current.getStage();
      
      //   if (stage) {
      //     const scale = stage.scaleX(); // Consider the current scale of the stage
      
      //     // Calculate the initial position of the resizing handle relative to the box
      //     const initialHandleX = box.width - 10;
      //     const initialHandleY = box.height - 10;
      
      //     // Calculate the movement of the handle during dragging
      //     const handleMovementX = (e.target.x() - initialHandleX) / scale;
      //     const handleMovementY = (e.target.y() - initialHandleY) / scale;
      
      //     // Calculate the new width and height based on the handle movement
      //     const newWidth = Math.max(0, box.width + handleMovementX);
      //     const newHeight = Math.max(0, box.height + handleMovementY);
      
      //     const updatedBoxes = boxes.map((b) =>
      //       b.label === box.label
      //         ? {
      //             ...b,
      //             width: newWidth,
      //             height: newHeight,
      //           }
      //         : b
      //     );
      
      //     setBoxes(updatedBoxes);
      //   }
      // };
      
      
      
      
      
      
      
      const updateTableStatus = () => {
        const activeTables = [];
        const inactiveTables = [];
    
        tableList.forEach((table) => {
          const tableExists = boxes.some((box) => box.label === table.label);
    
          if (tableExists) {
            activeTables.push(table);
          } else {
            inactiveTables.push(table);
          }
        });
    
        setActiveTables(activeTables);
        setInactiveTables(inactiveTables);
      };
    
      useEffect(() => {
        updateTableStatus();
      }, [boxes]); 

      const saveCanvasImage = () => {
        const stage = stageRef.current.getStage();
    
        if (stage) {
          // Create a new canvas element
          const tempCanvas = document.createElement('canvas');
          const tempCanvas1 = document.createElement('canvas');
          tempCanvas.width = stage.width();
          tempCanvas.height = stage.height();
          tempCanvas1.width = stage.width();
          tempCanvas1.height = stage.height();
    
          const tempContext = tempCanvas.getContext('2d');
          const tempContext1 = tempCanvas1.getContext('2d');
    
          // Draw the background image onto the canvas (use either backgroundImage or myBackgroundImage)
          const backgroundToUse = myBackgroundImage || backgroundImage;
    
          if (backgroundToUse) {
            const backgroundImageElement = new Image();
            backgroundImageElement.src = myBackgroundImage
              ? `data:image/jpeg;base64,${myBackgroundImage}`
              : URL.createObjectURL(backgroundToUse);
    
            backgroundImageElement.onload = () => {
              // Draw the background image
              tempContext.drawImage(
                backgroundImageElement,
                0,
                0,
                stage.width(),
                stage.height()
              );

              tempContext1.drawImage(
                backgroundImageElement,
                0,
                0,
                stage.width(),
                stage.height()
              );
    
              // Draw other Konva elements onto the canvas
              stage.children.forEach((layer) => {
                if (layer.isVisible()) {
                  layer.children.forEach((node) => {
                    if (node.isVisible()) {
                      tempContext.drawImage(node.toCanvas(), node.x(), node.y());
                    }
                  });
                }
              });
    
              // // Create a link element and trigger a download
              // const a = document.createElement('a');
              // a.href = tempCanvas.toDataURL('image/png');
              // a.download = 'canvas_image.png';
              // document.body.appendChild(a);
              // a.click();
              // document.body.removeChild(a);
    
              // Extract necessary data for the API request
              const imageDataUrl = tempCanvas.toDataURL('image/png');
              const onlyImageUrl = tempCanvas1.toDataURL('image/png');
             const updatedBoxes = boxes.map((box) => ({
      label: box.label,
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
      sectionName: getSectionNameForBox(box), // Add sectionName property
    }));

    
             
    postCanvas(imageDataUrl,onlyImageUrl, updatedBoxes);
    
              // Call the API function with the extracted data
              // sendApiRequest(imageDataUrl, boxInfo, activeTableLabels, inactiveTableLabels);
            };
          }
          const getSectionNameForBox = (box) => {
            // Iterate over each section in tableList
            for (const section of tableList) {
              // Find the table with a matching table_name within the current section
              const matchingTable = section.tables.find((table) => table.table_name === box.label);
          
              // If a matching table is found, return the section_name
              if (matchingTable) {
                return section.section_name;
              }
            }
          
            // If no matching table is found, return 'Unknown Section'
            return 'Unknown Section';
          };
          
          
        }
      };
    




  async function postCanvas(imageDataUrl,onlyImageUrl, updatedBoxes) {

  
      const req = {

        
  
        data: {
          venue_id:vid,
          name:nameLayout || "name",
          image_url:imageDataUrl,
          boxes:updatedBoxes,
          imageBoxUrl:onlyImageUrl
        },
  
      };
 
   await   postLayout(req)
        .then((res) => {
          
          
      
          
          toast.success("Canvas is added Succesfully!");
         
        
        })
        .catch((err) => {
          console.error(err);
          toast.error("Something Went Wrong!");
        });
    }
  

    
      
      const resetCanvasState = () => {
        setShapes([]);
        setNewShape({ tool: 'line', points: [] });
        setTextValue('');
        setHistory([]);
        setHistoryIndex(0);
        
        setMyBackgroundImage(null);
        setLayoutName('');
        setGridSize(50);
        
        setBoxes([]);
        setCount(3);
        setSelectedBox(null);
        // setTableList([
        //   { label: 'Table 1', width: gridSize, height: gridSize },
        //   { label: 'Table 2', width: gridSize, height: gridSize },
        //   { label: 'Table 3', width: gridSize, height: gridSize },
        // ]);
        setDroppedTables([]);
        setActiveTables([]);
        setInactiveTables([]);
      };
      

      
      

    return (
      <div className="drawing-app" style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
        {/* <button className="buttons" onClick={openLayoutPopup}>
          New Layout
        </button> */}
        <Button
         className="cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm"
            color="indigo_A400"
            size="sm"
            onClick={openModal}
            >
            New Layout
            </Button>
    
      <Button
        className="cursor-pointer font-inter font-semibold leading-[normal] mt-10 min-w-[128px] rounded-lg text-center text-sm"
        color="indigo_A400"
        size="sm"
        onClick={handleTableButtonClick}
      >
        Table List
      </Button>
      {renderTableList()}
     
      <Button
        className="cursor-pointer font-inter font-semibold leading-[normal] mt-10 min-w-[128px] rounded-lg text-center text-sm"
        color="indigo_A400"
        size="sm"
        onClick={removeSelectedBox}
      >
        Remove Box
      </Button>
      <Button
        className="cursor-pointer font-inter font-semibold leading-[normal] mt-10 min-w-[128px] rounded-lg text-center text-sm"
        color="indigo_A400"
        size="sm"
        onClick={saveCanvasImage}
      >
        Save Canvas
      </Button>
        </div>
  
        
       
        <div className="drawing-canvas">
      {backgroundImage && (
        <img
          src={URL.createObjectURL(backgroundImage)}
          alt="Background Image"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      )}

      {myBackgroundImage && (
        <img
          src={`data:image/jpeg;base64,${myBackgroundImage}`}
          alt="Background Image"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      )}

      {/* Konva Stage with the drawing area */}
      <Stage
        width={backgroundImage ? backgroundImage.width : 1000}
        height={backgroundImage ? backgroundImage.height : 800}
        ref={stageRef}
      >
     <Layer>
     {boxes.map((box, index) => (
  <Group
    key={index}
    x={box.x}
    y={box.y}
    draggable
    onDragMove={(e) => handleBoxDragMove(e, index)}
    onDragEnd={handleBoxDragEnd}
  >
    <Rect
      width={box.width}
      height={box.height}
      fill="lightblue"
      stroke="black"
      strokeWidth={2}
      draggable
    />
    {/* Display the label at the center of the box */}
    <KonvaText
      text={box.label}
      fontSize={16}
      fill="black"
      align="center"
      verticalAlign="middle"
      width={box.width}
      height={box.height}
    />
    {/* Resizing handle */}
    <Rect
      x={box.width - 10}
      y={box.height - 10}
      width={10}
      height={10}
      fill="red"
      draggable
      name="resizeHandle"
      onDragMove={(e) => handleBoxDragMove(e, index)}
      onDragEnd={handleBoxDragEnd}
    />
  </Group>
))}

</Layer>

      </Stage>
      </div>
  
        {/* Render the layout popup when showLayoutPopup is true */}
        {isModalOpen && (
          <LayoutPopup
          isOpen={isModalOpen} onRequestClose={closeModal}
            onBackgroundImageChange={onBackgroundImageChange}
          />
        )}
  
        {newShape.tool === 'text' && (
          <div>
            <input
              type="text"
              placeholder="Enter text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <button onClick={addText}>Add Text</button>
          </div>
        )}
        <ToastContainer />
      </div>
    );
}

export default Canvas