import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Ring, Torus } from '@react-three/drei'
import * as THREE from 'three'

function Particles() {
  const count = 200
  const mesh = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.2 + Math.random() * 1.5
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      const g = 0.4 + Math.random() * 0.6
      colors[i * 3] = 0.1
      colors[i * 3 + 1] = g
      colors[i * 3 + 2] = 0.1
    }
    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * 0.05
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function OrbitRing({ radius, speed, tilt }: { radius: number; speed: number; tilt: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <Torus ref={ref} args={[radius, 0.008, 8, 80]} rotation={[tilt, 0, 0]}>
      <meshBasicMaterial color="#2e8b2e" transparent opacity={0.35} />
    </Torus>
  )
}

function CrossSymbol() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.3
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
  })
  return (
    <group ref={ref}>
      <mesh position={[0, 0, 1.05]}>
        <boxGeometry args={[0.06, 0.22, 0.012]} />
        <meshStandardMaterial color="#4cbf4c" emissive="#2e8b2e" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0, 0, 1.05]}>
        <boxGeometry args={[0.22, 0.06, 0.012]} />
        <meshStandardMaterial color="#4cbf4c" emissive="#2e8b2e" emissiveIntensity={1.5} />
      </mesh>
    </group>
  )
}

export default function MedicalOrb() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
  })

  return (
    <group ref={groupRef}>
      {/* Core sphere */}
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#0e360e"
          emissive="#1a5c1a"
          emissiveIntensity={0.4}
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>

      {/* Inner glow shell */}
      <Sphere args={[1.05, 32, 32]}>
        <meshStandardMaterial
          color="#2e8b2e"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          emissive="#4cbf4c"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere args={[1.35, 32, 32]}>
        <meshStandardMaterial
          color="#4cbf4c"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
          emissive="#4cbf4c"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Orbit rings */}
      <OrbitRing radius={1.6} speed={0.4} tilt={Math.PI / 6} />
      <OrbitRing radius={1.75} speed={-0.25} tilt={Math.PI / 3} />
      <OrbitRing radius={1.9} speed={0.18} tilt={Math.PI / 2.2} />

      {/* Medical cross */}
      <CrossSymbol />

      {/* Equator ring */}
      <Ring args={[1.55, 1.62, 80]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#4cbf4c" transparent opacity={0.2} side={THREE.DoubleSide} />
      </Ring>

      {/* Particles */}
      <Particles />
    </group>
  )
}
