import React, { useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import json from './blueFlame.json'
import Nebula, { SpriteRenderer } from 'three-nebula'
import * as THREE from 'three'

export type NebulaSystem = {
  update: Function
}

class NebulaEngineClass {
  update(nebulaSystem: NebulaSystem) {
    nebulaSystem.update()
  }

  async loadSystem(json: JSON, scene: THREE.Scene): Promise<NebulaSystem> {
    const loaded = await Nebula.fromJSONAsync(json, THREE, undefined)
    const nebulaRenderer = new SpriteRenderer(scene as any, THREE as any)
    return loaded.addRenderer(nebulaRenderer)
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
    NebulaEngine.loadSystem(json as unknown as JSON, scene).then(nebulaSystem => {
      setParticleSystem(nebulaSystem)
    })
  }, [])

  return <></>
}
