import React, { useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import Nebula, {
  SpriteRenderer,
  Body,
  BoxZone,
  Emitter,
  Gravity,
  Life,
  Mass,
  MeshRenderer,
  Position,
  RadialVelocity,
  Radius,
  Rate,
  Rotate,
  Scale,
  Span,
  Vector3D,
  Particle
} from 'three-nebula'
import * as THREE from 'three'
import Zone from 'three-nebula/src/zone/Zone'
import Initializer from 'three-nebula/src/initializer/Initializer'

export type createEmitterProps = {
  position: {
    x: number
    y: number
    z: number
  }
  body: THREE.Sprite | THREE.Mesh
  rate?: {
    min: number
    max: number
    timeMin: number
    timeMax: number
  }
  mass?: number
  radius?: number
  lifeMin?: number
  lifeMax?: number
  positionLimit?: Zone
  velocityRadius?: number
  velocityVector?: Vector3D
  velocityTheta?: number
  velocityActive?: boolean
  rotate?: {
    x: number | 'random' | undefined
    y: number | 'random' | undefined
    z: number | 'random' | undefined
  }
  scaleA?: number
  scaleB?: number
  gravity?: number
}

class NebulaEngineClass {
  particleSystem: Nebula
  constructor() {
    this.particleSystem = new Nebula()
  }
  update(nebulaSystem: Nebula) {
    nebulaSystem.update()
  }

  async loadSystemFromJSON(json: JSON, scene: THREE.Scene): Promise<Nebula> {
    const loaded = await Nebula.fromJSONAsync(json, THREE, undefined)
    const nebulaRenderer = new SpriteRenderer(scene as any, THREE as any)
    return loaded.addRenderer(nebulaRenderer)
  }

  createEmitter({
    position,
    body,
    rate = {
      min: 5,
      max: 10,
      timeMin: 0.1,
      timeMax: 0.25
    },
    mass = 1,
    radius = 10,
    lifeMin = 2,
    lifeMax = 4,
    positionLimit = new BoxZone(4),
    velocityRadius = 2,
    velocityVector = new Vector3D(1, 1, 1),
    velocityTheta = 3,
    velocityActive = true,
    rotate = {
      x: 'random',
      y: 'random',
      z: undefined
    },
    scaleA = 1,
    scaleB = 0.1,
    gravity = 0
  }: createEmitterProps): Emitter {
    const emitter = new Emitter()
      .setRate(new Rate(new Span(rate.min, rate.max), new Span(rate.timeMin, rate.timeMax)))
      .addInitializers([
        new Mass(mass),
        new Radius(radius),
        new Life(lifeMin, lifeMax),
        new Body(body),
        new Position(positionLimit),
        new RadialVelocity(velocityRadius, velocityVector, velocityTheta, velocityActive)
      ])
      .addBehaviours([new Rotate(rotate.x, rotate.y, rotate.z), new Scale(scaleA, scaleB), new Gravity(gravity)])
      .setPosition(position)
    return emitter
  }
}

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
  const rateZero = new Rate(0)

  const playerDirection = new THREE.Vector3(Math.sin(rotation.y), 0, Math.cos(rotation.y))
  // get the direction vector of the particle, should be the opposite of the player direction
  const particleDirection = playerDirection.clone().negate()
  const velocityVector = new Vector3D(particleDirection.x, particleDirection.y+1, particleDirection.z)

  useEffect(() => {
    const cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshPhongMaterial({ color: '#b36b0c', emissive: '#bababa'}))
    const emitter = NebulaEngine.createEmitter({ position: { x: position.x, y: position.y, z: position.z }, body: cubeMesh, lifeMin: 0.5, lifeMax: 1, positionLimit: new BoxZone(2)})

    NebulaEngine.particleSystem.addEmitter(emitter)
    NebulaEngine.particleSystem.addRenderer(new MeshRenderer(scene as any, THREE as any))
    setParticleSystem(NebulaEngine.particleSystem)
  }, [])

  useFrame(() => {
    if (particleSystem) {
      NebulaEngine.update(particleSystem)
      const emitter = particleSystem.emitters[0] as Emitter & { isEmitting: boolean; particles: Particle[]; rate: Rate, initializers: Initializer[] }

      emitter.position = new Vector3D(position.x, position.y, position.z)
      if (active && !isEmitting) {
        const initializers = emitter.initializers
        initializers[0] = new RadialVelocity(4, velocityVector, 3, true)
        emitter.setInitializers(initializers)
        setIsEmitting(true)
        emitter.setRate(originalRate)
        emitter.emit()
      } else if (!active && isEmitting) {
        setIsEmitting(false)
        setTimeout(() => {
          emitter.setRate(rateZero)
        }, 300)
      }
    }
  })

  return <></>
}
