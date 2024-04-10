import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import * as THREE from 'three'

import { Knight, MapOne } from '@/models'
import { Istore } from '@/redux'
import { Bloom, EffectComposer, SSAO, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

const cameraBaseConfig = {
  position: [0, 16, -16]
}

const Main = () => {
  const position = useSelector((state: Istore) => state.player.position)

  useThree(({ camera, scene }) => {
    scene.background = new THREE.Color(0x222222)
    camera.position.set(
      cameraBaseConfig.position[0] + position.x,
      cameraBaseConfig.position[1] + position.y,
      cameraBaseConfig.position[2] + position.z
    ),
      camera.lookAt(position.x, position.y, position.z)
  })

  return (
    <>
      {/* <OrbitControls /> */}
      <ambientLight />
      <directionalLight intensity={0.7} position={[-5, 5, 5]} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>
          <Knight />
        </group>
        <MapOne />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={600} intensity={3} />
          <Vignette offset={0.2} darkness={0.5} />
          <SSAO samples={30} radius={20} luminanceInfluence={0.9} blendFunction={BlendFunction.MULTIPLY} worldDistanceThreshold={1} worldDistanceFalloff={1} worldProximityThreshold={1} worldProximityFalloff={1}/>
        </EffectComposer>
      </Suspense>
    </>
  )
}

export default Main
