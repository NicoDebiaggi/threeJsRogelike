import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface ParticleSystemProps {
  count: number
  position: THREE.Vector3
  rotation: THREE.Euler
  active: boolean
}

export const ParticleSystem = ({ count, position, rotation, active }: ParticleSystemProps) => {
  const mesh =
    useRef<
      THREE.InstancedMesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[],
        THREE.InstancedMeshEventMap
      >
    >(null)

  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const speed = 0.01 + Math.random() / 50
      const planeFactor = 0 + Math.random() * 5
      const yFactor = 0 + Math.random() * 3
      const randomness = Math.random() * 0.5
      temp.push({ t, speed, planeFactor, yFactor, randomness })
    }
    return temp
  }, [count])

  // The innards of this hook will run every frame
  useFrame(() => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, speed, planeFactor, yFactor, randomness } = particle
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 2
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      randomness += 0.5
      if (Math.abs(randomness) > 20) randomness = Math.random() * 0.5
      // get the direction vector of the player
      const playerDirection = new THREE.Vector3(Math.sin(rotation.y), 0, Math.cos(rotation.y))
      // get the direction vector of the particle, should be the opposite of the player direction
      const particleDirection = playerDirection.clone().negate()
      // get the position of the particle based on the player position and the direction vector
      const xVector = position.x + particleDirection.x * planeFactor + Math.sin(b * 2) * randomness
      let yVector = Math.abs(position.y + 1 + Math.sin(b * yFactor)) /* * yFactor */
      const zVector = position.z + particleDirection.z * planeFactor + Math.cos(b * 2) * randomness

      if (active) {
        dummy.position.set(xVector, yVector, zVector)
        dummy.scale.set(s, s, s)

        dummy.rotation.set(s * 5, s * 5, s * 5)
        dummy.updateMatrix()
        // And apply the matrix to the instanced item
        mesh.current && mesh.current.setMatrixAt(i, dummy.matrix)
      } else {
        dummy.position.set(0, -5, 0)
        dummy.scale.set(0, 0, 0)
        dummy.rotation.set(0, 0, 0)
        dummy.updateMatrix()
        mesh.current && mesh.current.setMatrixAt(i, dummy.matrix)
      }
    })
    mesh.current && (mesh.current.instanceMatrix.needsUpdate = true)
  })
  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshPhongMaterial color='#b69f66' />
      </instancedMesh>
    </>
  )
}
