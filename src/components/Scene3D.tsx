import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, Box, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const Scene3D = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const boxesRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (sphereRef.current) {
      gsap.to(sphereRef.current.position, {
        y: 0.5,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });

      gsap.to(sphereRef.current.rotation, {
        y: Math.PI * 2,
        duration: 8,
        repeat: -1,
        ease: "none"
      });
    }

    if (textRef.current) {
      gsap.to(textRef.current.position, {
        y: 2.2,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    }
  }, []);

  useFrame((state, delta) => {
    if (boxesRef.current) {
      boxesRef.current.rotation.y += delta * 0.5;
      
  
      boxesRef.current.children.forEach((box, i) => {
        const offset = i * (Math.PI / 4);
        box.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + offset) * 0.1);
      });
    }
  });

  const handleBoxHover = (index: number | null) => {
    setHovered(index);
    document.body.style.cursor = index !== null ? 'pointer' : 'default';

    if (boxesRef.current && index !== null) {
      const box = boxesRef.current.children[index];
      gsap.to(box.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.3,
        ease: "power2.out"
      });
    } else if (boxesRef.current && index === null) {
      boxesRef.current.children.forEach((box) => {
        gsap.to(box.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }
  };

  return (
    <>
      <OrbitControls 
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#00ff41" />

      <Sphere
        ref={sphereRef}
        args={[1, 32, 32]}
        position={[0, 0, 0]}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <meshStandardMaterial
          color="#00ff41"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      <group ref={boxesRef}>
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            args={[0.2, 0.2, 0.2]}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 2,
              0,
              Math.sin((i / 8) * Math.PI * 2) * 2
            ]}
            onPointerOver={() => handleBoxHover(i)}
            onPointerOut={() => handleBoxHover(null)}
          >
            <meshStandardMaterial
              color="#00ff41"
              transparent
              opacity={hovered === i ? 0.8 : 0.5}
              emissive="#00ff41"
              emissiveIntensity={hovered === i ? 0.5 : 0}
            />
          </Box>
        ))}
      </group>

      <Text
        ref={textRef}
        position={[-2, 2, 0]}
        fontSize={0.5}
        color="#00ff41"
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        SECURITY
      </Text>
    </>
  );
};

export default Scene3D;