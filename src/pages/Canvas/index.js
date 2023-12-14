import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Stage, Layer, Line, Rect, Group, Text as KonvaText } from 'react-konva';
import { Button } from 'components';
import LayoutPopup from 'components/Layoutpopup';

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
    if (backgroundImage) {
      const img = new Image();
      img.src = URL.createObjectURL(backgroundImage);
      img.onload = () => {
        const stage = stageRef.current;
        const imageWidth = img.width;
        const imageHeight = img.height;
        setGridSize(Math.min(imageWidth, imageHeight) / 20);
        stage.width(imageWidth);
        stage.height(imageHeight);
        stage.batchDraw();
      };
    }
  }, [backgroundImage]);

  // Load canvas state from localStorage on component mount
  useEffect(() => {
    const savedCanvasState = localStorage.getItem('canvasState');
    if (savedCanvasState) {
      setShapes(JSON.parse(savedCanvasState));
    }
  }, []);

  // Save canvas state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('canvasState', JSON.stringify(shapes));
  }, [shapes]);

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
        x: 50,
        y: 50,
        fontSize: 16,
        fontFamily: 'Arial',
        fill: 'black',
      };
      const updatedShapes = [...shapes, newText];

      saveToHistory();

      setShapes(updatedShapes);
      setTextValue('');
    }
  };

  const onBackgroundImageChange = (layoutName, image) => {
    setBackgroundImage(image);
    setLayoutName(layoutName);

    if (image) {
      const img = new Image();
      img.src = URL.createObjectURL(image);
      img.onload = () => {
        const stage = stageRef.current;
        stage.width(img.width);
        stage.height(img.height);
        stage.batchDraw();
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

  const handleBoxDragEnd = (e, index) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index] = {
      ...updatedBoxes[index],
      x: e.target.x(),
      y: e.target.y(),
    };
    setBoxes(updatedBoxes);
    setSelectedBox(updatedBoxes[index]);
  };

  const removeSelectedBox = () => {
    if (selectedBox !== null) {
      const updatedBoxes = boxes.filter((box) => box !== selectedBox);
      setBoxes(updatedBoxes);
      setSelectedBox(null);
    }
  };

  const handleTableButtonClick = () => {
    if (selectedBox !== null) {
      setBoxes([...boxes, selectedBox]);
      setSelectedBox(null);
    }
  };

  const handleTableListClick = (table) => {
    const updatedBoxes = boxes.filter((box) => box.label !== table.label);

    const newBox = {
      label: table.label,
      width: gridSize * 1.5,
      height: gridSize * 1.5,
      x: 0,
      y: 0,
    };

    setBoxes([...updatedBoxes, newBox]);
    setSelectedBox(newBox);
  };

  const handleDropTable = () => {
    if (selectedBox !== null) {
      setBoxes([...boxes, { ...selectedBox, x: 0, y: 0 }]);
      setSelectedBox(null);
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

  return (
    <div className="drawing-app" style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
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
      </div>

      <div className={`drawing-canvas`}>
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
                  fontSize={16}
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

      {isModalOpen && (
        <LayoutPopup
          isOpen={isModalOpen}
          onRequestClose={closeModal}
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

export default Canvas;
