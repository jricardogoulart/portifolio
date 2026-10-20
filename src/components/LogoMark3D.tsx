import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239 127">
  <path d="M24.994 0C64.4582 21.8017 107.2 47.2097 146.666 69.0149C125.956 55.0928 107.375 37.7733 105.398 23.8364L193.759 24.4224L150.831 100.303L35.1483 99.6328L0 126.26L169.788 127L239 0.175029C238.946 0.181648 25.9391 0.134652 24.994 0Z" fill="white"/>
</svg>`;

// High-fidelity ramp from sparse to dense
const ASCII_CHARS = " ·:;=+*#%@";

export default function LogoMark3D({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const displayCanvas = canvasRef.current;
    if (!displayCanvas) return;

    const displayCtx = displayCanvas.getContext("2d");
    if (!displayCtx) return;

    // ── Offscreen WebGL Canvas for 3D ASCII buffer ──
    const glCanvas = document.createElement("canvas");
    const renderer = new THREE.WebGLRenderer({
      canvas: glCanvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;

    // ── Scene ──
    const scene = new THREE.Scene();

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 6.0);

    // ── Lights with strong specular contrast for ASCII shading ──
    const keyLight = new THREE.DirectionalLight(0xffffff, 5.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc0d0ff, 2.8);
    fillLight.position.set(-3, 1, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 3.5);
    rimLight.position.set(2, -2, -3);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // ── Extruded 3D Logo from SVG ──
    const loader = new SVGLoader();
    const { paths } = loader.parse(LOGO_SVG);
    const group = new THREE.Group();

    let maxDim = 1;

    paths.forEach((path) => {
      SVGLoader.createShapes(path).forEach((shape) => {
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth: 20,
          bevelEnabled: true,
          bevelThickness: 2.5,
          bevelSize: 2,
          bevelOffset: 0,
          bevelSegments: 6,
        });
        geo.center();

        if (geo.boundingBox) {
          const sx = geo.boundingBox.max.x - geo.boundingBox.min.x;
          const sy = geo.boundingBox.max.y - geo.boundingBox.min.y;
          maxDim = Math.max(maxDim, sx, sy);
        }

        const mat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.6,
          roughness: 0.18,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.6,
        });

        const mesh = new THREE.Mesh(geo, mat);
        group.add(mesh);
      });
    });

    // Symmetrical scale and flip Y for SVG coordinates
    const sf = 3.0 / maxDim;
    group.scale.set(sf, -sf, sf);
    group.position.set(0, 0, 0);
    scene.add(group);

    // ── Environment ──
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    scene.environment = pmrem.fromScene(new RoomEnvironment()).texture;
    pmrem.dispose();

    // ── Grid & ASCII Sizing ──
    let cols = 80;
    let rows = 48;
    let cellW = 8;
    let cellH = 13;
    let pixelBuffer = new Uint8Array(cols * rows * 4);

    const updateGrid = () => {
      const w = displayCanvas.clientWidth || 300;
      const h = displayCanvas.clientHeight || 200;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      displayCanvas.width = Math.round(w * dpr);
      displayCanvas.height = Math.round(h * dpr);

      // Fine cell dimensions for rich ASCII art density
      const baseCellW = 6.2 * dpr;
      const baseCellH = 10.5 * dpr;

      cols = Math.max(25, Math.floor(displayCanvas.width / baseCellW));
      rows = Math.max(16, Math.floor(displayCanvas.height / baseCellH));

      cellW = displayCanvas.width / cols;
      cellH = displayCanvas.height / rows;

      renderer.setSize(cols, rows, false);
      camera.aspect = cols / rows;
      camera.updateProjectionMatrix();

      pixelBuffer = new Uint8Array(cols * rows * 4);
    };

    updateGrid();

    // ── Mouse hover influence (Parallax tilt) ──
    let targetTiltX = 0;
    let targetTiltY = 0;
    const tilt = { x: 0, y: 0 };

    const onWindowPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetTiltY = nx * 0.22;
      targetTiltX = -ny * 0.16;
    };

    window.addEventListener("pointermove", onWindowPointerMove, { passive: true });

    // ── Direct drag interaction (strictly bounded, NO flip) ──
    const mouse = { down: false, lastX: 0, lastY: 0 };
    const vel = { x: 0, y: 0 };
    const dragRot = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      mouse.down = true;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      vel.x = 0;
      vel.y = 0;
      displayCanvas.setPointerCapture(e.pointerId);
      displayCanvas.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!mouse.down) return;
      const dx = e.clientX - mouse.lastX;
      const dy = e.clientY - mouse.lastY;
      dragRot.y = Math.max(-0.45, Math.min(0.45, dragRot.y + dx * 0.007));
      dragRot.x = Math.max(-0.30, Math.min(0.30, dragRot.x + dy * 0.007));
      vel.x = Math.max(-0.02, Math.min(0.02, dy * 0.007));
      vel.y = Math.max(-0.02, Math.min(0.02, dx * 0.007));
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      mouse.down = false;
      try {
        if (displayCanvas.hasPointerCapture(e.pointerId)) {
          displayCanvas.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }
      displayCanvas.style.cursor = "grab";
    };

    displayCanvas.addEventListener("pointerdown", onPointerDown);
    displayCanvas.addEventListener("pointermove", onPointerMove);
    displayCanvas.addEventListener("pointerup", onPointerUp);
    displayCanvas.addEventListener("pointerleave", onPointerUp);
    displayCanvas.style.cursor = "grab";

    // ── Animation Loop ──
    const clock = new THREE.Clock();
    let rotY = 0;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!mouse.down) {
        vel.x *= 0.90;
        vel.y *= 0.90;
        dragRot.x += vel.x;
        dragRot.y += vel.y;
        dragRot.x *= 0.96;
        dragRot.y *= 0.96;
        rotY += 0.007; // Smooth continuous rotation
      }

      dragRot.x = Math.max(-0.40, Math.min(0.40, dragRot.x));
      dragRot.y = Math.max(-0.60, Math.min(0.60, dragRot.y));

      tilt.x += (targetTiltX - tilt.x) * 0.05;
      tilt.y += (targetTiltY - tilt.y) * 0.05;
      tilt.x = Math.max(-0.25, Math.min(0.25, tilt.x));
      tilt.y = Math.max(-0.35, Math.min(0.35, tilt.y));

      // Organic subtle random variations
      const idleRotX = Math.sin(t * 0.45) * 0.08 + Math.cos(t * 0.28) * 0.04;
      const idleRotY = Math.sin(t * 0.32) * 0.06 + Math.cos(t * 0.16) * 0.03;
      const idleRotZ = Math.sin(t * 0.22) * 0.03;

      group.rotation.x = idleRotX + tilt.x + dragRot.x;
      group.rotation.y = rotY + idleRotY + tilt.y + dragRot.y;
      group.rotation.z = idleRotZ;

      // Position strictly fixed: zero translation
      group.position.set(0, 0, 0);

      // ── Render 3D offscreen ──
      renderer.render(scene, camera);

      // ── Read pixels from WebGL context ──
      const gl = renderer.getContext();
      gl.readPixels(0, 0, cols, rows, gl.RGBA, gl.UNSIGNED_BYTE, pixelBuffer);

      // ── Draw ASCII Art on Display Canvas ──
      displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
      displayCtx.font = `bold ${Math.round(cellH * 0.96)}px "Courier New", Consolas, "JetBrains Mono", monospace`;
      displayCtx.textAlign = "center";
      displayCtx.textBaseline = "middle";

      const rampLen = ASCII_CHARS.length;

      for (let cy = 0; cy < rows; cy++) {
        // WebGL coordinate Y is inverted (0 at bottom)
        const glY = rows - 1 - cy;
        const yPos = (cy + 0.5) * cellH;

        for (let cx = 0; cx < cols; cx++) {
          const idx = (glY * cols + cx) * 4;
          const a = pixelBuffer[idx + 3];

          // Transparent background: nothing drawn!
          if (a < 25) continue;

          const r = pixelBuffer[idx];
          const g = pixelBuffer[idx + 1];
          const b = pixelBuffer[idx + 2];

          // Perceived luminance
          const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          const charIdx = Math.min(rampLen - 1, Math.floor(luma * rampLen));
          const char = ASCII_CHARS[charIdx];

          const xPos = (cx + 0.5) * cellW;

          // Ivory-white characters with subtle brightness gradation
          const brightness = Math.min(255, Math.floor(190 + luma * 65));
          displayCtx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
          displayCtx.fillText(char, xPos, yPos);
        }
      }
    };

    animate();

    // ── Resize Observer ──
    const ro = new ResizeObserver(() => {
      updateGrid();
    });
    ro.observe(displayCanvas);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onWindowPointerMove);
      displayCanvas.removeEventListener("pointerdown", onPointerDown);
      displayCanvas.removeEventListener("pointermove", onPointerMove);
      displayCanvas.removeEventListener("pointerup", onPointerUp);
      displayCanvas.removeEventListener("pointerleave", onPointerUp);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
