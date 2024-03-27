import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Controls } from '@/dataModels'
import Main from '@/scenes/Main.scene'

import { Interface } from './components'
import { Istore } from './redux'

const App = () => {
  const animations = useSelector((state: Istore) => state.player.animations)

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ['KeyW', 'ArrowUp'] },
      { name: Controls.backward, keys: ['KeyS', 'ArrowDown'] },
      { name: Controls.left, keys: ['KeyA', 'ArrowLeft'] },
      { name: Controls.right, keys: ['KeyD', 'ArrowRight'] },
      { name: Controls.jump, keys: ['Space'] },
      { name: Controls.dodge, keys: ['ShiftLeft'] },
      { name: Controls.pause, keys: ['Escape'] },
      { name: Controls.attack, keys: ['ClickLeft', 'KeyJ'] },
      { name: Controls.block, keys: ['ClickRight', 'KeyK'] }
    ],
    []
  )

  return (
    <KeyboardControls map={map}>
      <Canvas camera={{ fov: 90 }} shadows>
        <Perf />
        <Physics debug gravity={[0, -9.81, 0]}>
          <Main />
        </Physics>
      </Canvas>
      {animations.length > 0 && <Interface />}
    </KeyboardControls>
  )
}

export default App
