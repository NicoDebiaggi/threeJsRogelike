import * as THREE from 'three'

interface HandleWeaponMovementFrameProps {
  playerPosition: THREE.Vector3
  enemyPosition: THREE.Vector3
  weaponPosition: THREE.Vector3
  weaponRotation: THREE.Euler
  weaponRange: number
}

export const handleWeaponMovementFrame = ({
  playerPosition,
  enemyPosition,
  weaponPosition,
  weaponRotation,
  weaponRange
}: HandleWeaponMovementFrameProps) => {
  const weaponDistanceToEnemy = enemyPosition.distanceTo(weaponPosition)
  let newWeaponPosition = weaponPosition
  let newWeaponRotation = weaponRotation

  //rotate the weapon to face the enemy
  const direction = enemyPosition.clone().sub(weaponPosition)
  const angle = Math.atan2(direction.z, direction.x)
  const newRotation = new THREE.Euler(0, angle, 0)
  if (weaponRotation.y !== newRotation.y) newWeaponRotation = newRotation

  // position the weapon between the player and the enemy at a distance of weaponRange
  const weaponDirection = playerPosition.clone().sub(enemyPosition).normalize()
  const weaponPositionTarget = enemyPosition.clone().add(weaponDirection.multiplyScalar(weaponRange))

  newWeaponPosition = weaponPosition.clone().lerp(weaponPositionTarget, 0.1)
  const weaponInPosition = weaponDistanceToEnemy <= weaponRange
  return { newWeaponPosition, newWeaponRotation, weaponInPosition }
}

interface CalcFinalWeaponPositionProps {
  weaponPosition: THREE.Vector3
  weaponRotation: THREE.Euler
  animatedMeshRef: React.RefObject<THREE.Mesh>
}

export const calcFinalWeaponPosition = ({ weaponPosition, weaponRotation, animatedMeshRef }: CalcFinalWeaponPositionProps) => {
  if (!animatedMeshRef.current) return { finalPosition: weaponPosition, finalRotation: weaponRotation }
  const animatedMeshPosition = animatedMeshRef.current.position
  // this implementation is not matching the mesh position, checkout to improve it
  const finalPosition = weaponPosition
    .clone()
    .add(new THREE.Vector3(animatedMeshPosition.x, animatedMeshPosition.y, animatedMeshPosition.z))
  const animatedMeshRotation = animatedMeshRef.current.rotation
  const finalRotation = new THREE.Euler(
    weaponRotation.x + animatedMeshRotation.x,
    weaponRotation.y * -1 + animatedMeshRotation.y,
    weaponRotation.z + animatedMeshRotation.z
  )
  return { finalPosition, finalRotation }
}
