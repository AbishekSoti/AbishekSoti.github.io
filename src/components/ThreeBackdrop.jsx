import { useEffect, useRef } from "react";

export function ThreeBackdrop() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let disposed = false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    async function setup() {
      const THREE = await import("three");
      if (disposed) return;

      const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const nodeGeometry = new THREE.SphereGeometry(0.025, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x126b5f });
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x285f9f, transparent: true, opacity: 0.28 });
    const accentMaterial = new THREE.LineBasicMaterial({ color: 0xb46a22, transparent: true, opacity: 0.35 });

    const points = [];
    for (let i = 0; i < 42; i += 1) {
      const x = (i % 7) * 0.58 - 1.9 + Math.sin(i * 1.7) * 0.16;
      const y = Math.floor(i / 7) * 0.42 - 1.15 + Math.cos(i * 1.1) * 0.12;
      const z = Math.sin(i * 0.8) * 0.65;
      const point = new THREE.Vector3(x, y, z);
      points.push(point);

      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(point);
      group.add(node);
    }

    for (let i = 0; i < points.length - 1; i += 1) {
      if (i % 7 !== 6) {
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([points[i], points[i + 1]]), lineMaterial));
      }
      if (i + 7 < points.length && i % 3 === 0) {
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([points[i], points[i + 7]]), lineMaterial));
      }
    }

    const wavePoints = Array.from({ length: 88 }, (_, i) => {
      const x = (i / 87) * 4.8 - 2.4;
      return new THREE.Vector3(x, Math.sin(i * 0.34) * 0.14 - 1.65, Math.cos(i * 0.18) * 0.18);
    });
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(wavePoints), accentMaterial));

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
      const t = time * 0.00018;
      group.rotation.y = -0.32 + Math.sin(t) * 0.08;
      group.rotation.x = 0.18 + Math.cos(t * 0.8) * 0.035;
      renderer.render(scene, camera);
      if (!prefersReducedMotion) animationFrame = window.requestAnimationFrame(render);
    }
    render();

      return () => {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", resize);
        nodeGeometry.dispose();
        nodeMaterial.dispose();
        lineMaterial.dispose();
        accentMaterial.dispose();
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
