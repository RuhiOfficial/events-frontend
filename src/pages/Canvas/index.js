
import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Circle,Group , Text as KonvaText } from 'react-konva';

// Import the LayoutPopup component
import LayoutPopup from 'components/Layoutpopup';
import { Button, Img, List, Text } from "components";
import { useLocation, useHistory } from 'react-router-dom';
import { getCanvasTable ,postLayout} from 'service/api';
import {  ToastContainer,toast } from "react-toastify";

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
  const vid=localStorage.getItem('Venue')
  const nameLayout=localStorage.getItem('layoutName')
  console.log(backgroundImage,"initial")
  console.log(layoutName,"Layout name ===>>")
  // localStorage.setItem('canvasBackgroundImage', 'https://example.com/path/to/your/image.jpg');
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
},[backgroundImage || myBackgroundImage])

async function table() {
  const req = {
    data:{
      venue_id:vid,
    }
  };

  await getCanvasTable(req)
    .then((res) => {
      console.log(res,"canvas table list ====>>")
      let options;

      if (res.data.data.length === 1) {
        
        options = [
          {
            label: res.data.data[0].table_name,
            value: res.data.data[0].id,
          },
        ];
      } else {
       
        options = res.data.data.map((item) => ({
          label: item.table_name,
          value: item.id,
        }));
      }

       setTableList(options);
      
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
        const imageWidth = img.width;
        const imageHeight = img.height;
        const newGridSize = Math.min(imageWidth, imageHeight) / 20; // Adjust factor as needed
        setGridSize(newGridSize);
        stage.width(imageWidth);
        stage.height(imageHeight);
        stage.batchDraw();
      };
    }
  }, [backgroundImage, myBackgroundImage]);
  


    const saveToHistory = () => {
      const newHistory = [...history.slice(0, historyIndex + 1), shapes];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    };
  
  
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
      
      
      const handleBoxDragEnd = (e, index) => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index] = {
          ...updatedBoxes[index],
          x: e.target.x(),
          y: e.target.y(),
        };
        setBoxes(updatedBoxes);
        setSelectedBox(updatedBoxes[index]); // Update the selected box
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
        const updatedBoxes = boxes.filter((box) => box.label !== table.label);
        
        // Add a new box with increased dimensions
        const newBox = {
          label: table.label,
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
        return (
          <ul className="table-list">
            {tableList.map((table, index) => (
              <li
                key={index}
                className={`table-list-item ${
                  selectedBox && selectedBox.label === table.label ? 'selected' : ''
                }`}
                onClick={() => handleTableListClick(table)}
              >
                {table.label}
              </li>
            ))}
          </ul>
        );
      };



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
          tempCanvas.width = stage.width();
          tempCanvas.height = stage.height();
    
          const tempContext = tempCanvas.getContext('2d');
    
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
    
              // Create a link element and trigger a download
              const a = document.createElement('a');
              a.href = tempCanvas.toDataURL('image/png');
              a.download = 'canvas_image.png';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
    
              // Extract necessary data for the API request
              const imageDataUrl = tempCanvas.toDataURL('image/png');
              const boxInfo = boxes.map((box) => ({
                label: box.label,
                x: box.x,
                y: box.y,
                width: box.width,
                height: box.height,
              }));
             
    postCanvas(imageDataUrl,boxInfo,activeTables,inactiveTables);
    
              // Call the API function with the extracted data
              // sendApiRequest(imageDataUrl, boxInfo, activeTableLabels, inactiveTableLabels);
            };
          }
        }
      };
    




  async function postCanvas(imageDataUrl,boxInfo) {
        
    // console.log(data,"data from modal is ");
      const req = {
  
        data: {
          venue_id:vid,
          name:nameLayout,
          image_url:imageDataUrl,
          boxes:boxInfo
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
          {gridVisible && backgroundImage && (
            <>
              {Array.from({ length: Math.ceil((backgroundImage.width || 1000) / gridSize) }).map((_, i) => (
                <Line
                  key={`grid-x-${i}`}
                  points={[i * gridSize, 0, i * gridSize, (backgroundImage.height || 800)]}
                  stroke="#ccc"
                  strokeWidth={1}
                />
              ))}
              {Array.from({ length: Math.ceil((backgroundImage.height || 800) / gridSize) }).map((_, i) => (
                <Line
                  key={`grid-y-${i}`}
                  points={[0, i * gridSize, (backgroundImage.width || 1000), i * gridSize]}
                  stroke="#ccc"
                  strokeWidth={1}
                />
              ))}
            </>
          )}

          {boxes.map((box, index) => (
            <Group
              key={index}
              x={box.x}
              y={box.y}
              draggable
              onDragEnd={(e) => handleBoxDragEnd(e, index)}
            >
              <Rect
                width={box.width}
                height={box.height}
                fill="lightblue"
                stroke="black"
                strokeWidth={2}
              />
              <KonvaText
                x={0}
                y={0}
                text={box.label}
                fontSize={16}  // Adjust the font size as needed
                fill="black"
                align="center"
                width={box.width}
                height={box.height}
                verticalAlign="middle"
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