import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// An abstract particle field that slowly rotates and reacts to scroll
const ParticleField = () => {
  const ref = useRef<THREE.Points>(null!);
  const { size } = useThree();
  const count = 5000;

  const [positions, renderOrder] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // distribute them in a sphere or large volume
        const radius = 10 + Math.random() * 20;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return [positions, 0];
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
        // Slow rotation for dynamic effect
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
        
        // Gentle oscillation on scroll or time
        ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#aa88ff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

export const BackgroundScene = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0c]">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} dpr={[1, 2]}>
        <color attach="background" args={['#0a0a0c']} />
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
    </div>
  );
};
