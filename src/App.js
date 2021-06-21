import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import "./App.css"

function App() {
  // threejs state
  const [scene, setScene] = useState(null)
  const [camera, setCamera] = useState(null)
  const [renderer, setRenderer] = useState(null)
  const [cube, setCube] = useState(null)

  // useRef
  const canvas3D = useRef(null)

  // initialize scene,camera & renderer after first render & call render function
  useEffect(() => {
    setScene(new THREE.Scene())
    setCamera(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))

    let canvas = canvas3D.current

    setRenderer(
      new THREE.WebGLRenderer({
        canvas,
        // alpha: true,
        powerPreference: "high-performance"
      })
    )

    render()
  }, [])

  // initialize cube, update scene to include cube data & update camera position, and call animate function
  function render() {
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

    setCube(new THREE.Mesh(geometry, material))

    setScene(prev => ({
      ...prev,
      children: [...prev.children, cube]
    }))

    setCamera(prev => ({
      ...prev,
      position: {
        ...prev.position,
        z: 5
      }
    }))

    animate()
  }

  // requestAnimationFrame to loop animate & setcube to change cube rotation
  function animate() {
    requestAnimationFrame(animate)

    setCube(prev => ({
      ...prev,
      rotation: {
        ...prev.rotation,
        x: prev.rotation.x + 1,
        y: prev.rotation.y + 1
      }
    }))

    if (renderer) {
      renderer.render(scene, camera)
    }
  }

  return (
    <div id="video_overlay" style={{ left: 34, width: 1280, top: 0, height: 720, display: "block" }}>
      <canvas ref={canvas3D} id="canvas_overlay_3d" style={{ width: 1280, height: 720 }}></canvas>
    </div>
  )
}

export default App
