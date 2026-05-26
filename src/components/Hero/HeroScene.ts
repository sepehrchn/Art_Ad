import * as THREE from 'three'

export const initScene = (
  canvas: HTMLCanvasElement,
  isMobile: boolean
): (() => void) => {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const pixelRatio = Math.min(window.devicePixelRatio, 2)

  // Scene setup
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
  camera.position.z = 6

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  })
  renderer.setPixelRatio(pixelRatio)
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0)

  // Icosahedron
  const icoGeometry = new THREE.IcosahedronGeometry(1.4, 1)
  const icoWireframe = new THREE.LineSegments(
    new THREE.WireframeGeometry(icoGeometry),
    new THREE.LineBasicMaterial({ color: 0x8B6E2E, transparent: true, opacity: 0.18 })
  )
  const icoSolid = new THREE.Mesh(
    icoGeometry,
    new THREE.MeshBasicMaterial({ color: 0xC9A84C, transparent: true, opacity: 0.04 })
  )
  scene.add(icoWireframe)
  scene.add(icoSolid)

  // Torus 1
  const torus1Geometry = new THREE.TorusGeometry(2.2, 0.006, 32, 100)
  const torus1 = new THREE.LineSegments(
    new THREE.WireframeGeometry(torus1Geometry),
    new THREE.LineBasicMaterial({ color: 0x8B6E2E, transparent: true, opacity: 0.4 })
  )
  torus1.rotation.x = Math.PI / 3
  scene.add(torus1)

  // Torus 2
  const torus2Geometry = new THREE.TorusGeometry(2.8, 0.004, 32, 100)
  const torus2 = new THREE.LineSegments(
    new THREE.WireframeGeometry(torus2Geometry),
    new THREE.LineBasicMaterial({ color: 0x8B6E2E, transparent: true, opacity: 0.3 })
  )
  torus2.rotation.x = Math.PI / 2.2
  torus2.rotation.y = Math.PI / 4
  scene.add(torus2)

  // Floating planes
  const planes: THREE.Mesh[] = []
  const planeConfigs = [
    { size: 1.2, x: -1.5, y: 1.5 },
    { size: 0.9, x: 1.8, y: -1.2 },
    { size: 1.5, x: -0.5, y: -1.8 },
    { size: 0.7, x: 2.0, y: 0.8 },
    { size: 1.0, x: -2.0, y: 0.5 },
  ]

  planeConfigs.forEach((config) => {
    const planeGeometry = new THREE.PlaneGeometry(config.size, config.size)
    const plane = new THREE.LineSegments(
      new THREE.WireframeGeometry(planeGeometry),
      new THREE.LineBasicMaterial({ color: 0xC9A84C, transparent: true, opacity: 0.15 })
    )
    plane.position.x = config.x
    plane.position.y = config.y
    scene.add(plane as any)
    planes.push(plane as any)
  })

  // Particles
  const particleCount = isMobile ? 80 : 180
  const particlesGeometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 16
    positions[i + 1] = (Math.random() - 0.5) * 10
    positions[i + 2] = (Math.random() - 0.5) * 8
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particles = new THREE.Points(
    particlesGeometry,
    new THREE.PointsMaterial({ color: 0xC9A84C, size: 0.025, transparent: true, opacity: 0.5 })
  )
  scene.add(particles)

  // Mouse tracking
  let mouseX = 0
  let mouseY = 0
  let targetX = 0
  let targetY = 0

  const onMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1
  }

  const isTouchDevice = () => {
    return (
      typeof window !== 'undefined' &&
      !!(navigator.maxTouchPoints || (navigator as any).msMaxTouchPoints)
    )
  }

  if (!isTouchDevice() && !isMobile) {
    window.addEventListener('mousemove', onMouseMove)
  }

  // Resize handler
  const onWindowResize = () => {
    const newWidth = canvas.clientWidth
    const newHeight = canvas.clientHeight
    camera.aspect = newWidth / newHeight
    camera.updateProjectionMatrix()
    renderer.setSize(newWidth, newHeight)
  }

  window.addEventListener('resize', onWindowResize)

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate)

    // Icosahedron rotation
    icoWireframe.rotation.x += 0.003
    icoWireframe.rotation.y += 0.005
    icoSolid.rotation.x += 0.003
    icoSolid.rotation.y += 0.005

    // Torus 2 z movement
    torus2.position.z -= 0.0015

    // Planes floating
    planes.forEach((plane, index) => {
      plane.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.005
      plane.rotation.z += 0.0008
    })

    // Mouse parallax
    targetX = mouseX * 0.4
    targetY = -mouseY * 0.3
    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04

    renderer.render(scene, camera)
  }

  animate()

  // Cleanup
  const cleanup = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onWindowResize)
    icoGeometry.dispose()
    torus1Geometry.dispose()
    torus2Geometry.dispose()
    particlesGeometry.dispose()
    renderer.dispose()
  }

  return cleanup
}
