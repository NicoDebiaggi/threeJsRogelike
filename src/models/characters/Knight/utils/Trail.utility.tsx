import React, { useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import Nebula, { BoxZone, Emitter, MeshRenderer, RadialVelocity, Rate, Span, Vector3D, Particle } from 'three-nebula'
import * as THREE from 'three'
import Initializer from 'three-nebula/src/initializer/Initializer'
import { NebulaEngineClass } from '@/utils'

const NebulaEngine = new NebulaEngineClass()

interface Props {
  position: THREE.Vector3
  rotation: THREE.Euler
  active?: boolean
}

export const Trail: React.FC<Props> = ({ position, rotation, active }: Props) => {
  const { scene } = useThree()
  const [particleSystem, setParticleSystem] = useState<Nebula>()
  const [isEmitting, setIsEmitting] = useState(false)
  const originalRate = new Rate(new Span(5, 10), new Span(0.05, 0.05))
  const originalRateEmissive = new Rate(new Span(2, 5), new Span(0.05, 0.05))
  const rateZero = new Rate(0)

  const playerDirection = new THREE.Vector3(Math.sin(rotation.y), 0, Math.cos(rotation.y))
  // get the direction vector of the particle, should be the opposite of the player direction
  const particleDirection = playerDirection.clone().negate()
  const velocityVector = new Vector3D(particleDirection.x, particleDirection.y + 1, particleDirection.z)

  useEffect(() => {
    const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.15, 1), new THREE.MeshPhongMaterial({ color: '#b36b0c' }))
    const meshEmissive = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.2, 1),
      new THREE.MeshStandardMaterial({ color: '#b36b0c', emissive: '#fdc173' })
    )
    const emitter = NebulaEngine.createEmitter({
      position: { x: position.x, y: position.y, z: position.z },
      body: mesh,
      lifeMin: 0.1,
      lifeMax: 0.2,
      positionLimit: new BoxZone(1)
    })
    const emitterEmissive = NebulaEngine.createEmitter({
      position: { x: position.x, y: position.y, z: position.z },
      body: meshEmissive,
      lifeMin: 0.1,
      lifeMax: 0.2,
      positionLimit: new BoxZone(1)
    })

    NebulaEngine.particleSystem.addEmitter(emitter)
    NebulaEngine.particleSystem.addEmitter(emitterEmissive)
    NebulaEngine.particleSystem.addRenderer(new MeshRenderer(scene as any, THREE as any))
    setParticleSystem(NebulaEngine.particleSystem)
  }, [])

  useFrame(() => {
    if (particleSystem) {
      NebulaEngine.update(particleSystem)
      const emitter = particleSystem.emitters[0] as Emitter & {
        isEmitting: boolean
        particles: Particle[]
        rate: Rate
        initializers: Initializer[]
      }
      const emitterEmissive = particleSystem.emitters[1] as Emitter & {
        isEmitting: boolean
        particles: Particle[]
        rate: Rate
        initializers: Initializer[]
      }

      emitter.position = new Vector3D(position.x, position.y, position.z)
      emitterEmissive.position = new Vector3D(position.x, position.y, position.z)
      if (active && !isEmitting) {
        const initializers = emitter.initializers
        const initializersEmissive = emitterEmissive.initializers

        initializers[0] = new RadialVelocity(4, velocityVector, 3, true)
        initializersEmissive[0] = new RadialVelocity(4, velocityVector, 3, true)
        setIsEmitting(true)
        emitter.setInitializers(initializers)
        emitter.setRate(originalRate)
        emitter.emit()
        emitterEmissive.setInitializers(initializersEmissive)
        emitterEmissive.setRate(originalRateEmissive)
        emitterEmissive.emit()
      } else if (!active && isEmitting) {
        setIsEmitting(false)
        emitter.setRate(rateZero)
        emitterEmissive.setRate(rateZero)
      }
    }
  })

  return <></>
}
