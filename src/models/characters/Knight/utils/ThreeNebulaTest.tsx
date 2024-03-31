import React, { useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import json from './blueFlame.json'
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
  Vector3D
} from 'three-nebula'
import * as THREE from 'three'
import Zone from 'three-nebula/src/zone/Zone'

export type NebulaSystem = {
  update: Function
}

class NebulaEngineClass {
  particleSystem: Nebula
  constructor () {
    this.particleSystem = new Nebula()
  }
  update (nebulaSystem: NebulaSystem) {
    nebulaSystem.update()
  }

  async loadSystemFromJSON (json: JSON, scene: THREE.Scene): Promise<NebulaSystem> {
    const loaded = await Nebula.fromJSONAsync(json, THREE, undefined)
    const nebulaRenderer = new SpriteRenderer(scene as any, THREE as any)
    return loaded.addRenderer(nebulaRenderer)
  }

  createEmitter (
    position: {
      x: number
      y: number
      z: number
    },
    body: THREE.Sprite | THREE.Mesh,
    rate: {
      min: number
      max: number
      timeMin: number
      timeMax: number
    } = {
      min: 5,
      max: 10,
      timeMin: 0.1,
      timeMax: 0.25
    },
    mass: number = 1,
    radius: number = 10,
    lifeMin: number = 2,
    lifeMax: number = 4,
    positionLimit: Zone = new BoxZone(4),
    velocityRadius: number = 2,
    velocityVector: Vector3D = new Vector3D(1, 1, 1),
    velocityTheta: number = 3,
    velocityActive: boolean = true,
    rotate: {
      x: number | 'random' | undefined
      y: number | 'random' | undefined
      z: number | 'random' | undefined
    } = {
      x: 'random',
      y: 'random',
      z: undefined
    },
    scaleA: number = 1,
    scaleB: number = 0.1,
    gravity: number = 0
  ): Emitter {
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
      .emit()
    return emitter
  }
}

const NebulaEngine = new NebulaEngineClass()

interface Props {}

export const BlueFlame: React.FC<Props> = (props: Props) => {
  const { scene } = useThree()
  const [particleSystem, setParticleSystem] = useState<NebulaSystem>()

  useFrame(() => {
    if (particleSystem) {
      NebulaEngine.update(particleSystem)
    }
  })

  useEffect(() => {
    const cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshLambertMaterial({ color: '#ff0000' }))
    const emitter = NebulaEngine.createEmitter({ x: 0, y: 2, z: 0 }, cubeMesh)
    NebulaEngine.particleSystem.addEmitter(emitter)
    NebulaEngine.particleSystem.addRenderer(new MeshRenderer(scene as any, THREE as any))
    setParticleSystem(NebulaEngine.particleSystem)
  }, [])

  return <></>
}
