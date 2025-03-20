import React, { useEffect, useState, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const updatePosition = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const updateHoverState = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isHoverable = 
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.closest('.glass-panel') !== null ||
      target.closest('.profile-image-container') !== null;
    
    setIsHovered(isHoverable);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseover', updateHoverState, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', updateHoverState);
    };
  }, [updatePosition, updateHoverState]);

  return (
    <>
      <div
        className={`cursor-dot ${isHovered ? 'hovered' : ''}`}
        style={{
          transform: `translate3d(${position.x - 8}px, ${position.y - 8}px, 0)`,
          willChange: 'transform'
        }}
      />
      <div
        className={`cursor-outline ${isHovered ? 'hovered' : ''}`}
        style={{
          transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0)`,
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default CustomCursor;