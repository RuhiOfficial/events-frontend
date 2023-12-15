
import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Circle,Group , Text as KonvaText } from 'react-konva';

// Import the LayoutPopup component
import LayoutPopup from 'components/Layoutpopup';
import { Button, Img, List, Text } from "components";

function Canvas() {
    const stageRef = useRef(null);
    const [shapes, setShapes] = useState([]);
    const [newShape, setNewShape] = useState({ tool: 'line', points: [] });
    const [textValue, setTextValue] = useState('');
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [layoutName, setLayoutName] = useState('');
    const [gridSize, setGridSize] = useState(50); // Default grid size
    const [gridVisible, setGridVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [boxes, setBoxes] = useState([]);
    const [count, setCount] = useState(3); 
    const [selectedBox, setSelectedBox] = useState(null);
    const [tableList, setTableList] = useState([
      { label: 'Table 1', width: gridSize, height: gridSize },
      { label: 'Table 2', width: gridSize, height: gridSize },
      { label: 'Table 3', width: gridSize, height: gridSize },
    ]);
    const [droppedTables, setDroppedTables] = useState([]);
    const [activeTables, setActiveTables] = useState([]);
  const [inactiveTables, setInactiveTables] = useState([]);
  useEffect(() => {
    // Load canvas state from local storage when the component mounts
    const savedCanvasState = localStorage.getItem('canvasState');
    console.log(savedCanvasState.backgroundImage,"saved canvas state is===>>>")
    // if (savedCanvasState) {
    //   console.log(savedCanvasState,"saved canvas state is yessssss")
    //   const loadedBackgroundImage = localStorage.getItem('canvasBackgroundImage');
    //   if (loadedBackgroundImage) {
    //     setBackgroundImage(new Image(loadedBackgroundImage));
    //   }
    //   setBoxes(savedCanvasState.boxes || []);
    //   // ... (restore other state variables)
    // }
    // else{
    //   console.log("no saved canvas state")
    // }
  },[]);

  useEffect(() => {
    // Save canvas state to local storage whenever the background image or boxes change
    localStorage.setItem(
      'canvasState',
      JSON.stringify({ backgroundImage, boxes, /* ...other state variables */ })
    );
  }, [backgroundImage, boxes /*, other state variables */]);
  
    useEffect(() => {
      if (backgroundImage) {
        const img = new Image();
        img.src = URL.createObjectURL(backgroundImage);
        img.onload = () => {
          // Once the image has loaded, set the dimensions of the Stage to match the image
          const stage = stageRef.current;
          const imageWidth = img.width;
          const imageHeight = img.height;
          setGridSize(Math.min(imageWidth, imageHeight) / 20); // Adjust grid size based on the image dimensions
          stage.width(imageWidth);
          stage.height(imageHeight);
          stage.batchDraw(); // Redraw the stage
        };
      }
    }, [backgroundImage]);
  


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
        // Convert the image to a data URL and store it in the localStorage
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageDataUrl = event.target.result;
          localStorage.setItem('canvasBackgroundImage', imageDataUrl);
        };
        reader.readAsDataURL(image);
      } else {
        // Clear the background image in the localStorage if null or undefined
        localStorage.removeItem('canvasBackgroundImage');
      }
    };

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
      const saveCanvasImage = () => {
        const stage = stageRef.current.getStage();
      
        if (stage) {
          // Create a new canvas element
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = stage.width();
          tempCanvas.height = stage.height();
      
          const tempContext = tempCanvas.getContext('2d');
      
          // Draw the background image onto the canvas
          if (backgroundImage) {
            const backgroundImageElement = new Image();
            backgroundImageElement.src = URL.createObjectURL(backgroundImage);
            backgroundImageElement.onload = () => {
              tempContext.drawImage(backgroundImageElement, 0, 0, stage.width(), stage.height());
      
              // Draw the Konva stage onto the canvas
              const stageData = stage.toDataURL({
                mimeType: 'image/png',
                quality: 1,
                pixelRatio: 1,
              });
              const stageImage = new Image();
              stageImage.src = stageData;
              stageImage.onload = () => {
                tempContext.drawImage(stageImage, 0, 0);
      
                // Create a link element and trigger a download
                const a = document.createElement('a');
                a.href = tempCanvas.toDataURL('image/png');
                a.download = 'canvas_image.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              };
            };
          }
        }
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
  
        
       
         <div className={`drawing-canvas`}>
        {gridVisible && backgroundImage && (
          <img
            src={backgroundImage ? URL.createObjectURL(backgroundImage) : ''}
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
            {Array.from({ length: Math.ceil((backgroundImage ? backgroundImage.width : 1000) / gridSize) }).map((_, i) => (
              <Line
                key={`grid-x-${i}`}
                points={[i * gridSize, 0, i * gridSize, (backgroundImage ? backgroundImage.height : 800)]}
                stroke="#ccc"
                strokeWidth={1}
              />
            ))}
            {Array.from({ length: Math.ceil((backgroundImage ? backgroundImage.height : 800) / gridSize) }).map((_, i) => (
              <Line
                key={`grid-y-${i}`}
                points={[0, i * gridSize, (backgroundImage ? backgroundImage.width : 1000), i * gridSize]}
                stroke="#ccc"
                strokeWidth={1}
              />
            ))}
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
      </div>
    );
}

export default Canvas

