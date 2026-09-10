import { useEffect, useRef } from "react";

export function ThreeBackdrop() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(max-width: 640px)").matches) {
      return undefined;
    }

    let disposed = false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    async function setup() {
      const THREE = await import("three");
      if (disposed) return undefined;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.z = 6.4;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const signalGroup = new THREE.Group();
      scene.add(signalGroup);

      const eventPositions = [];
      for (let index = 0; index < 168; index += 1) {
        const column = index % 28;
        const row = Math.floor(index / 28);
        const signal = Math.sin(column * 0.63 + row * 1.47);
        if (signal > -0.12 || (column + row) % 7 === 0) {
          eventPositions.push(
            (column / 27) * 5.5 - 2.75,
            (row / 5) * 2.5 - 1.05 + Math.sin(column * 0.32) * 0.12,
            Math.cos(index * 0.41) * 0.7,
          );
        }
      }

      const eventGeometry = new THREE.BufferGeometry();
      eventGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(eventPositions, 3),
      );
      const eventMaterial = new THREE.PointsMaterial({
        color: 0x5ee0c2,
        size: 0.045,
        transparent: true,
        opacity: 0.64,
        sizeAttenuation: true,
      });
      const events = new THREE.Points(eventGeometry, eventMaterial);
      signalGroup.add(events);

      const waveformPoints = Array.from({ length: 150 }, (_, index) => {
        const x = (index / 149) * 5.8 - 2.9;
        const y =
          Math.sin(index * 0.22) * 0.16 +
          Math.sin(index * 0.071) * 0.09 -
          1.55;
        const z = Math.cos(index * 0.13) * 0.22;
        return new THREE.Vector3(x, y, z);
      });
      const waveformGeometry = new THREE.BufferGeometry().setFromPoints(waveformPoints);
      const waveformMaterial = new THREE.LineBasicMaterial({
        color: 0xcfe6df,
        transparent: true,
        opacity: 0.34,
      });
      const waveform = new THREE.Line(waveformGeometry, waveformMaterial);
      signalGroup.add(waveform);

      const baselineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2.9, -1.55, 0),
        new THREE.Vector3(2.9, -1.55, 0),
      ]);
      const baselineMaterial = new THREE.LineBasicMaterial({
        color: 0x5ee0c2,
        transparent: true,
        opacity: 0.12,
      });
      signalGroup.add(new THREE.Line(baselineGeometry, baselineMaterial));

      function resize() {
        const { width, height } = mount.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
      }

      resize();
      window.addEventListener("resize", resize);

      let animationFrame = 0;
      function render(time = 0) {
        const phase = time * 0.00015;
        signalGroup.rotation.y = -0.18 + Math.sin(phase) * 0.045;
        signalGroup.position.y = Math.cos(phase * 0.7) * 0.025;
        renderer.render(scene, camera);
        if (!prefersReducedMotion) {
          animationFrame = window.requestAnimationFrame(render);
        }
      }
      render();

      return () => {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", resize);
        eventGeometry.dispose();
        eventMaterial.dispose();
        waveformGeometry.dispose();
        waveformMaterial.dispose();
        baselineGeometry.dispose();
        baselineMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    let cleanup;
    setup().then((teardown) => {
      cleanup = teardown;
      if (disposed && cleanup) cleanup();
    });

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, []);

  return <div className="three-backdrop" ref={mountRef} aria-hidden="true" />;
}
