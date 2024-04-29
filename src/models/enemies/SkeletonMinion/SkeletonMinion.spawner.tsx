import { Istore } from '@/redux'
import { useDispatch, useSelector } from 'react-redux'
import { addEnemy } from '@/redux/slices'
import { useEffect, useState } from 'react'
import { SkeletonMinion } from './SkeletonMinion.enemy'

const skeletonMinionBasicStats = {
  hp: 30,
  isFullySpawned: false,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 }
}
const MAX_ENEMIES = 1
const SPAWN_INTERVAL = 1000

interface SkeletonMinionSpawnerProps {
  levelBoundaries: { x: { min: number; max: number }; z: { min: number; max: number } }
}

export const SkeletonMinionSpawner = ({ levelBoundaries }: SkeletonMinionSpawnerProps) => {
  const dispatch = useDispatch()
  const enemies = useSelector((state: Istore) => state.enemies)
  const playerPosition = useSelector((state: Istore) => state.player.position)
  const [isSpawning, setIsSpawning] = useState<boolean>(false)

  useEffect(() => {
    if (enemies.length < MAX_ENEMIES && !isSpawning) {
      setIsSpawning(true)
      setTimeout(() => {
        const randomX = Math.floor(Math.random() * (levelBoundaries.x.max - levelBoundaries.x.min) + levelBoundaries.x.min)
        const randomZ = Math.floor(Math.random() * (levelBoundaries.z.max - levelBoundaries.z.min) + levelBoundaries.z.min)
        const randomPosition = { x: randomX, y: 0, z: randomZ }
        if (randomPosition.x === playerPosition.x && randomPosition.z === playerPosition.z) return
        const newEnemy = { ...skeletonMinionBasicStats, id: `testEnemy-${Math.floor(Math.random() * 9000) + 1000}`, position: randomPosition }
        dispatch(addEnemy(newEnemy))
        setIsSpawning(false)
      }, SPAWN_INTERVAL)
    }
  }, [enemies.length, isSpawning])

  return (
    <group>
      {enemies.map(enemy => (
        <SkeletonMinion key={enemy.id} enemyId={enemy.id} initialPosition={enemy.position} hp={enemy.hp} />
      ))}
    </group>
  )
}
