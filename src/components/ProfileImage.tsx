import React, { useEffect, useRef } from 'react';

const ProfileImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const angleX = (e.clientY - centerY) / 20;
      const angleY = (e.clientX - centerX) / 20;
      
      wrapper.style.transform = `perspective(1000px) rotateX(${-angleX}deg) rotateY(${angleY}deg)`;
    };

    const handleMouseLeave = () => {
      wrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="profile-image-container">
      <div ref={wrapperRef} className="profile-image-wrapper">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTst_YSjoRyojlkInhkxT6fTI8tQtQQ63lF5w&s"
          alt="Profile"
          className="profile-image"
        />
      </div>
    </div>
  );
};

export default ProfileImage;