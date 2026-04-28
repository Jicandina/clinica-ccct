import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MedicalOrb from './MedicalOrb'

export default function OrbScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#4cbf4c" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#2e8b2e" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#8fd14f" />
      <spotLight position={[0, 5, 0]} intensity={1} color="#ffffff" angle={0.3} />

      <Suspense fallback={null}>
        <MedicalOrb />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  )
}
