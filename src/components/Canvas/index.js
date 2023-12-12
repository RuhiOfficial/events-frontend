
import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Circle, Text as KonvaText } from 'react-konva';
import { AiOutlineMinus } from 'react-icons/ai';
import { LuRectangleHorizontal } from 'react-icons/lu';
import { FaRegCircle } from 'react-icons/fa6';
import { RxText } from 'react-icons/rx';
import { FaUndoAlt } from 'react-icons/fa';
// Import the LayoutPopup component
import LayoutPopup from 'components/Layoutpopup';
import { Button, Img, List, Text } from "components";

function Canvas() {
    const stageRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [shapes, setShapes] = useState([]);
    const [newShape, setNewShape] = useState({ tool: 'line', points: [] });
    const [textValue, setTextValue] = useState('');
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [layoutName, setLayoutName] = useState('');
    const [gridSize, setGridSize] = useState(25); // Default grid size
    const [gridVisible, setGridVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [boxes, setBoxes] = useState([]);
    const [count, setCount] = useState(3); 
  
  
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
  
    const handleMouseDown = (e) => {
      setDrawing(true);
      if (newShape.tool === 'text') {
        // Handle text creation
        const newText = {
          tool: 'text',
          text: textValue,
          x: e.evt.layerX,
          y: e.evt.layerY,
          fontSize: 16,
          fontFamily: 'Arial',
          fill: 'black',
        };
        setShapes([...shapes, newText]);
        setTextValue('');
        saveToHistory();
      } else {
        // Handle other shapes drawing
        setStartPos({ x: e.evt.layerX, y: e.evt.layerY });
      }
    };
  
    const handleMouseMove = () => {
      if (!drawing) return;
      if (newShape.tool !== 'text') {
        // Handle other shapes drawing
        const stage = stageRef.current;
        const point = stage.getPointerPosition();
  
        if (point) {
          const width = point.x - startPos.x;
          const height = point.y - startPos.y;
  
          setNewShape({
            tool: newShape.tool,
            points: [startPos.x, startPos.y, startPos.x + width, startPos.y + height],
          });
        }
      }
    };
  
    const handleMouseUp = () => {
      setDrawing(false);
      if (newShape.tool !== 'text') {
        // Handle other shapes drawing
        const updatedShapes = [...shapes, newShape];
        setShapes(updatedShapes);
        setNewShape({ tool: newShape.tool, points: [] });
        saveToHistory();
      }
    };
  
    const handleTextDragEnd = (e, index) => {
      const textShapes = shapes.filter((shape) => shape.tool === 'text');
      textShapes[index] = {
        ...textShapes[index],
        x: e.target.x(),
        y: e.target.y(),
      };
  
      setShapes([...shapes]);
      saveToHistory();
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
  
    const handleUndo = () => {
      if (historyIndex >= 0) {
        setHistoryIndex(historyIndex - 1);
        setShapes(history[historyIndex]);
      }
    };
    const toggleGrid = () => {
      setGridVisible(!gridVisible);
    };
    
  
    const renderShapes = () => {
      return shapes.map((shape, index) => {
        if (shape.tool === 'rectangle') {
          return (
            <Rect
              key={index}
              x={shape.points[0]}
              y={shape.points[1]}
              width={shape.points[2] - shape.points[0]}
              height={shape.points[3] - shape.points[1]}
              stroke="black"
              strokeWidth={2}
            />
          );
        } else if (shape.tool === 'line') {
          return (
            <Line
              key={index}
              points={shape.points}
              stroke="black"
              strokeWidth={2}
            />
          );
        } else if (shape.tool === 'circle') {
          const [x1, y1, x2, y2] = shape.points;
          const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          return (
            <Circle
              key={index}
              x={x1}
              y={y1}
              radius={radius}
              stroke="black"
              strokeWidth={2}
            />
          );
        } else if (shape.tool === 'text') {
          return (
            <KonvaText
              key={index}
              x={shape.x}
              y={shape.y}
              text={shape.text}
              fontSize={16}
              fontFamily="Arial"
              fill="black"
              draggable
              onDragEnd={(e) => handleTextDragEnd(e, index)}
            />
          );
        }
        return null;
      });
    };
  
    // Define state variables for the layout popup
    const [showLayoutPopup, setShowLayoutPopup] = useState(false);
  
    // Create a function to handle opening the layout popup
    const openLayoutPopup = () => {
      setShowLayoutPopup(true);
    };
  
    const onBackgroundImageChange = (layoutName, image) => {
      setBackgroundImage(image);
      setLayoutName(layoutName);
  
      if (image) {
        const img = new Image();
        img.src = URL.createObjectURL(image);
        img.onload = () => {
          // Once the image has loaded, set the dimensions of the Stage to match the image
          const stage = stageRef.current;
          stage.width(img.width); // Set the width to the image's width
          stage.height(img.height); // Set the height to the image's height
          stage.batchDraw(); // Redraw the stage
        };
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
  const handleAddBox = () => {
    const newBox = {
      x: 0,
      y: 0,
      width: gridSize,
      height: gridSize,
    };
    setBoxes([...boxes, newBox]);
  };
  const handleBoxDragEnd = (e, index) => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index] = {
          ...updatedBoxes[index],
          x: e.target.x(),
          y: e.target.y(),
        };
        setBoxes(updatedBoxes);
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
            onClick={handleAddBox}
            >
             Tables
            </Button>
          {/* <button className="buttons" onClick={() => setNewShape({ ...newShape, tool: 'line' })}>
            <AiOutlineMinus className="icons" />
          </button> */}
          {/* <button className="buttons" onClick={() => setNewShape({ ...newShape, tool: 'rectangle' })}>
            <LuRectangleHorizontal className="icons" />
          </button>
          <button className="buttons" onClick={() => setNewShape({ ...newShape, tool: 'circle' })}>
            <FaRegCircle className="icons" />
          </button>
          <button className="buttons" onClick={() => setNewShape({ ...newShape, tool: 'text' })}>
            <RxText className="icons" />
          </button>
          <button className="buttons" onClick={handleUndo}>
            <FaUndoAlt className="icons" />
          </button> */}
        </div>
  
        
       
        <div className={`drawing-canvas`} >
          {gridVisible && backgroundImage && (
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
  
          {/* Konva Stage with the drawing area */}
          <Stage
            width={backgroundImage ? backgroundImage.width : 1000}
            height={backgroundImage ? backgroundImage.height : 800}
            ref={stageRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
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
              <Rect
                key={index}
                x={box.x}
                y={box.y}
                width={box.width}
                height={box.height}
                fill="lightblue"
                stroke="black"
                strokeWidth={2}
                draggable
                onDragEnd={(e) => handleBoxDragEnd(e, index)}
              />
            ))}
  
              {renderShapes()}
              {newShape.tool === 'rectangle' && (
                <Rect
                  x={newShape.points[0]}
                  y={newShape.points[1]}
                  width={newShape.points[2] - newShape.points[0]}
                  height={newShape.points[3] - newShape.points[1]}
                  stroke="black"
                  strokeWidth={2}
                />
              )}
              {newShape.tool === 'line' && (
                <Line
                  points={newShape.points}
                  stroke="black"
                  strokeWidth={2}
                />
              )}
              {newShape.tool === 'circle' && (
                <Circle
                  x={newShape.points[0]}
                  y={newShape.points[1]}
                  radius={Math.sqrt(
                    Math.pow(newShape.points[2] - newShape.points[0], 2) +
                      Math.pow(newShape.points[3] - newShape.points[1], 2)
                  )}
                  stroke="black"
                  strokeWidth={2}
                />
              )}
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



// import React, { useRef, useState } from 'react';
// import { Stage, Layer, Rect, Line } from 'react-konva';
// import { Button } from 'components';

// function Canvas() {
//   const stageRef = useRef(null);
//   const [gridSize, setGridSize] = useState(25);
//   const [boxes, setBoxes] = useState([]);
//   const [count, setCount] = useState(3); // Set the initial count

//   const handleBoxDragEnd = (e, index) => {
//     const updatedBoxes = [...boxes];
//     updatedBoxes[index] = {
//       ...updatedBoxes[index],
//       x: e.target.x(),
//       y: e.target.y(),
//     };
//     setBoxes(updatedBoxes);
//   };

//   const handleAddBox = () => {
//     const newBox = {
//       x: 0,
//       y: 0,
//       width: gridSize,
//       height: gridSize,
//     };
//     setBoxes([...boxes, newBox]);
//   };

//   return (
//     <div className="drawing-app">
//       <div>
//         <Button
//           className="cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm"
//           color="indigo_A400"
//           size="sm"
//           onClick={handleAddBox}
//         >
//           Add Box
//         </Button>
//       </div>

//       <div className="drawing-canvas">
//         <Stage
//           width={800}
//           height={600}
//           ref={stageRef}
//         >
//           <Layer>
//             {Array.from({ length: Math.ceil(800 / gridSize) }).map((_, i) => (
//               <Line
//                 key={`grid-x-${i}`}
//                 points={[i * gridSize, 0, i * gridSize, 600]}
//                 stroke="#ccc"
//                 strokeWidth={1}
//               />
//             ))}
//             {Array.from({ length: Math.ceil(600 / gridSize) }).map((_, i) => (
//               <Line
//                 key={`grid-y-${i}`}
//                 points={[0, i * gridSize, 800, i * gridSize]}
//                 stroke="#ccc"
//                 strokeWidth={1}
//               />
//             ))}
//             {boxes.map((box, index) => (
//               <Rect
//                 key={index}
//                 x={box.x}
//                 y={box.y}
//                 width={box.width}
//                 height={box.height}
//                 fill="lightblue"
//                 stroke="black"
//                 strokeWidth={2}
//                 draggable
//                 onDragEnd={(e) => handleBoxDragEnd(e, index)}
//               />
//             ))}
//           </Layer>
//         </Stage>
//       </div>
//     </div>
//   );
// }

// export default Canvas;
