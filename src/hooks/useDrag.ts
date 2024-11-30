import { useState, useRef, useEffect } from 'react';

const useDraggable = ({ containerRef }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const startPosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    const element = event.currentTarget; // Элемент, который будет перетаскиваться
    const rect = element.getBoundingClientRect();

    setDragging(true);
    startPosition.current = {
      x: event.clientX - rect.left, // Координаты внутри элемента
      y: event.clientY - rect.top,
    };
  };

  const handleMouseMove = (event) => {
    if (!dragging) return;

    let newX = event.clientX - startPosition.current.x;
    let newY = event.clientY - startPosition.current.y;

    if (containerRef && containerRef.current) {
      const parentRect = containerRef.current.getBoundingClientRect();
      const elementWidth = containerRef.current.firstChild.offsetWidth;
      const elementHeight = containerRef.current.firstChild.offsetHeight;

      // Ограничение по горизонтали
      if (newX < 0) newX = 0;
      if (newX + elementWidth > parentRect.width) {
        newX = parentRect.width - elementWidth;
      }

      // Ограничение по вертикали
      if (newY < 0) newY = 0;
      if (newY + elementHeight > parentRect.height) {
        newY = parentRect.height - elementHeight;
      }
    }

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return {
    position,
    handleMouseDown,
  };
};

export default useDraggable;