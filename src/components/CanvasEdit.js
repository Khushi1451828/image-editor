// src/components/CanvasEditor.js
import React, { useEffect, useState } from 'react';
import { Canvas, Textbox, Circle, Rect, Triangle, Image } from 'fabric';

const CanvasEdit = ({ selectedImage }) => {
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    // Initialize Fabric canvas
    const newCanvas = new Canvas('imageCanvas', {
      width: 800,
      height: 600,
    });
    setCanvas(newCanvas);

    return () => {
      newCanvas.dispose(); // Clean up on unmount
    };
  }, []);

  useEffect(() => {
    if (selectedImage && canvas) {
      Image.fromURL(selectedImage, (img) => {
        canvas.clear(); // Clear canvas before adding new image
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        });
      });
    }
  }, [selectedImage, canvas]);

  const addText = () => {
    if (canvas) {
      const textbox = new Textbox('Edit Me', {
        left: 50,
        top: 50,
        width: 200,
        fontSize: 24,
        fill: '#ffffff',
        backgroundColor: '#000000',
      });
      canvas.add(textbox);
      canvas.setActiveObject(textbox); // Set active object separately
      canvas.renderAll(); // Ensure canvas updates
    } else {
      console.error('Canvas is not initialized.');
    }
  };

  const addShape = (shapeType) => {
    if (canvas) {
      let shape;
      switch (shapeType) {
        case 'circle':
          shape = new Circle({
            radius: 50,
            fill: '#ff0000',
            left: 100,
            top: 100,
          });
          break;
        case 'rectangle':
          shape = new Rect({
            width: 100,
            height: 100,
            fill: '#00ff00',
            left: 100,
            top: 100,
          });
          break;
        case 'triangle':
          shape = new Triangle({
            width: 100,
            height: 100,
            fill: '#0000ff',
            left: 100,
            top: 100,
          });
          break;
        default:
          return;
      }
      canvas.add(shape);
      canvas.setActiveObject(shape); // Set active object separately
      canvas.renderAll(); // Ensure canvas updates
    } else {
      console.error('Canvas is not initialized.');
    }
  };

  const downloadImage = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0,
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'edited-image.png';
      link.click();
    } else {
      console.error('Canvas is not initialized.');
    }
  };

  return (
    <div className="canvas-editor">
      <canvas id="imageCanvas"></canvas>
      <div className="controls">
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape('circle')}>Add Circle</button>
        <button onClick={() => addShape('rectangle')}>Add Rectangle</button>
        <button onClick={() => addShape('triangle')}>Add Triangle</button>
        <button onClick={downloadImage}>Download Image</button>
      </div>
    </div>
  );
};

export default CanvasEdit;
