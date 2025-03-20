import React, { useEffect, useState } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const ClickEffect = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      setRipples((prev) => [...prev, newRipple]);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (ripples.length > 0) {
      const timeoutId = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [ripples]);

  return (
    <>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </>
  );
};

export default ClickEffect;