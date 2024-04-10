import Nebula, {
  SpriteRenderer,
  Body,
  BoxZone,
  Emitter,
  Gravity,
  Life,
  Mass,
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

export class NebulaEngineClass {
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
