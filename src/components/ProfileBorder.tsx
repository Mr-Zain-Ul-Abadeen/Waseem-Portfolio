import React, { useEffect, useRef } from 'react';

interface ProfileBorderProps {
  children: React.ReactNode;
}

const ProfileBorder: React.FC<ProfileBorderProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const border = borderRef.current;

    if (!container || !border) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / centerY;
      const angleY = (x - centerX) / centerX;
      
      border.style.transform = `perspective(1000px) rotateX(${angleX * 10}deg) rotateY(${angleY * 10}deg)`;
    };

    const handleMouseLeave = () => {
      border.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="profile-container">
      <div ref={borderRef} className="profile-border">
        {children}
      </div>
    </div>
  );
};

export default ProfileBorder;