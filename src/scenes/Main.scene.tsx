import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import * as THREE from 'three'

import { Knight, LongSword, MapOne } from '@/models'
import { Istore } from '@/redux'
import { Bloom, EffectComposer, N8AO, SMAA, Vignette } from '@react-three/postprocessing'
import { SkeletonMinionSpawner } from '@/models'

const cameraBaseConfig = {
  position: [0, 16, -16]
}

const Main = () => {
  const playerPosition = useSelector((state: Istore) => state.player.position)

  useThree(({ camera, scene }) => {
    scene.background = new THREE.Color(0x222222)
    camera.position.set(
      cameraBaseConfig.position[0] + playerPosition.x,
      cameraBaseConfig.position[1] + playerPosition.y,
      cameraBaseConfig.position[2] + playerPosition.z
    ),
      camera.lookAt(playerPosition.x, playerPosition.y, playerPosition.z)
  })

  return (
    <>
      {/* <OrbitControls /> */}
      <ambientLight />
      <directionalLight intensity={0.7} position={[-5, 5, 5]} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>
          <Knight />
          <LongSword />
        </group>
        <SkeletonMinionSpawner levelBoundaries={{ x: { min: -22, max: 22 }, z: { min: -22, max: 22 } }} />
        <MapOne />
        <EffectComposer multisampling={2}>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={600} intensity={3} />
          <Vignette offset={0.2} darkness={0.5} />
          <N8AO halfRes color='black' aoRadius={2} intensity={1} aoSamples={6} denoiseSamples={4} />
          <SMAA />
        </EffectComposer>
      </Suspense>
    </>
  )
}

export default Main
