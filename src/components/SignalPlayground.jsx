import { useEffect, useRef, useState } from "react";
import { Activity, AudioLines, ScanLine } from "lucide-react";

const modes = [
  {
    id: "sound",
    label: "Sound",
    number: "01",
    icon: AudioLines,
    title: "Structure inside noise.",
    description:
      "Frequency, texture and timing turn raw pressure changes into evidence a classifier can reason about.",
  },
  {
    id: "motion",
    label: "Motion",
    number: "02",
    icon: ScanLine,
    title: "Change without redundant frames.",
    description:
      "Sparse events preserve when and where brightness changes, making time part of the representation.",
  },
  {
    id: "telemetry",
    label: "Telemetry",
    number: "03",
    icon: Activity,
    title: "The model is only part of the system.",
    description:
      "Memory, compute and timing traces reveal whether an inference pipeline belongs on its target device.",
  },
];

function drawGrid(context, width, height, palette) {
  context.save();
  context.strokeStyle = palette.line;
  context.globalAlpha = 0.48;
  context.lineWidth = 1;

  for (let x = 0; x <= width; x += 44) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y <= height; y += 44) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  context.restore();
}

function drawSound(context, width, height, time, pointer, palette) {
  const colors = [palette.accent, palette.blue, palette.amber];

  colors.forEach((color, index) => {
    const baseline = height * (0.3 + index * 0.2);
    const amplitude = height * (0.055 + index * 0.008);

    context.beginPath();
    for (let x = 0; x <= width; x += 3) {
      const focus = pointer.active
        ? Math.exp(-Math.pow((x - pointer.x) / Math.max(width * 0.16, 1), 2))
        : 0;
      const carrier = Math.sin(x * (0.026 + index * 0.006) - time * (0.0013 + index * 0.00018));
      const texture = Math.sin(x * 0.071 + time * 0.0007 + index * 1.8) * 0.34;
      const response = focus * Math.sin((x - pointer.x) * 0.105 - time * 0.003) * 0.7;
      const y = baseline + (carrier + texture + response) * amplitude;

      if (x === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }

    context.strokeStyle = color;
    context.globalAlpha = index === 0 ? 0.95 : 0.68;
    context.lineWidth = index === 0 ? 2.2 : 1.4;
    context.stroke();
  });

  if (pointer.active) {
    context.beginPath();
    context.moveTo(pointer.x, 24);
    context.lineTo(pointer.x, height - 24);
    context.strokeStyle = palette.accent;
    context.globalAlpha = 0.32;
    context.lineWidth = 1;
    context.stroke();
  }

  context.globalAlpha = 1;
}

function drawMotion(context, width, height, time, pointer, palette) {
  const colors = [palette.accent, palette.blue, palette.amber];

  for (let index = 0; index < 58; index += 1) {
    const speed = 0.018 + (index % 5) * 0.004;
    const travel = (index * 73 + time * speed) % (width + 100);
    let x = travel - 50;
    let y =
      height * (0.16 + ((index * 37) % 68) / 100) +
      Math.sin(index * 1.9 + time * 0.0011) * 19;

    if (pointer.active) {
      const distance = Math.hypot(x - pointer.x, y - pointer.y);
      const pull = Math.max(0, 1 - distance / 190);
      x += (pointer.x - x) * pull * 0.14;
      y += (pointer.y - y) * pull * 0.14;
    }

    context.fillStyle = colors[index % colors.length];
    context.globalAlpha = 0.32 + (index % 4) * 0.14;
    context.fillRect(x, y, 2 + (index % 3), 7 + (index % 5) * 2);
  }

  if (pointer.active) {
    for (let index = 0; index < 16; index += 1) {
      const angle = index * 2.39 + time * 0.0007;
      const radius = 18 + (index % 6) * 10;
      const x = pointer.x + Math.cos(angle) * radius;
      const y = pointer.y + Math.sin(angle) * radius * 0.62;
      context.fillStyle = colors[index % colors.length];
      context.globalAlpha = 0.7;
      context.fillRect(x, y, 3, 9);
    }
  }

  context.globalAlpha = 1;
}

function drawTelemetry(context, width, height, time, pointer, palette) {
  const traces = [
    { color: palette.accent, baseline: 0.28, frequency: 0.023, phase: 0 },
    { color: palette.blue, baseline: 0.5, frequency: 0.017, phase: 1.7 },
    { color: palette.amber, baseline: 0.72, frequency: 0.029, phase: 3.2 },
  ];

  traces.forEach((trace, index) => {
    context.beginPath();
    let finalY = 0;

    for (let x = 0; x <= width; x += 3) {
      const focus = pointer.active
        ? Math.exp(-Math.pow((x - pointer.x) / Math.max(width * 0.18, 1), 2))
        : 0;
      const wave =
        Math.sin(x * trace.frequency + time * 0.001 + trace.phase) * 8 +
        Math.sin(x * 0.071 - time * 0.0005 + index) * 3 +
        focus * Math.sin((x - pointer.x) * 0.08) * 13;
      const y = height * trace.baseline + wave;
      finalY = y;

      if (x === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }

    context.strokeStyle = trace.color;
    context.globalAlpha = 0.82;
    context.lineWidth = 1.7;
    context.stroke();

    context.beginPath();
    context.arc(width - 4, finalY, 4, 0, Math.PI * 2);
    context.fillStyle = trace.color;
    context.globalAlpha = 1;
    context.fill();
  });
}

export function SignalPlayground() {
  const [mode, setMode] = useState("sound");
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const activeMode = modes.find((item) => item.id === mode);
  const ActiveIcon = activeMode.icon;

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !stage || !context) return undefined;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let pixelRatio = 1;
    let palette = {};
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const readPalette = () => {
      const styles = window.getComputedStyle(document.documentElement);
      palette = {
        background: styles.getPropertyValue("--surface-muted").trim(),
        line: styles.getPropertyValue("--line").trim(),
        accent: styles.getPropertyValue("--accent").trim(),
        blue: styles.getPropertyValue("--blue").trim(),
        amber: styles.getPropertyValue("--amber").trim(),
      };
    };

    const draw = (time = 0) => {
      if (!width || !height) return;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.fillStyle = palette.background;
      context.fillRect(0, 0, width, height);
      drawGrid(context, width, height, palette);

      if (mode === "sound") drawSound(context, width, height, time, pointerRef.current, palette);
      if (mode === "motion") drawMotion(context, width, height, time, pointerRef.current, palette);
      if (mode === "telemetry") drawTelemetry(context, width, height, time, pointerRef.current, palette);

      if (!reduceMotion) frameId = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      const bounds = stage.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(280, Math.floor(bounds.width));
      height = Math.max(300, Math.floor(bounds.height));
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      readPalette();
      window.cancelAnimationFrame(frameId);
      draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(() => {
      readPalette();
      if (reduceMotion) draw(performance.now());
    });

    resizeObserver.observe(stage);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    resize();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, [mode]);

  const updatePointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      active: true,
    };
  };

  return (
    <section className="section-band signal-room" aria-labelledby="signal-room-heading">
      <div className="section-inner signal-layout">
        <div className="signal-copy">
          <p className="eyebrow">Signal room</p>
          <h2 id="signal-room-heading">The first decision is what the machine gets to notice.</h2>
          <p>
            Sound carries rhythm and texture. Event sensors preserve change. Device
            telemetry reveals whether inference can live beyond the lab.
            Representation is where each system begins.
          </p>
        </div>
        <div className="signal-console">
          <div className="signal-toolbar">
            <div className="signal-mode-control" role="group" aria-label="Signal representation">
              {modes.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    className={"signal-mode-button" + (mode === item.id ? " active" : "")}
                    type="button"
                    aria-pressed={mode === item.id}
                    key={item.id}
                    onClick={() => setMode(item.id)}
                  >
                    <Icon size={17} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div
            className="signal-stage"
            ref={stageRef}
            onPointerMove={updatePointer}
            onPointerLeave={() => {
              pointerRef.current.active = false;
            }}
          >
            <canvas ref={canvasRef} aria-hidden="true" />
            <div className="signal-readout">
              <div className="signal-readout-meta">
                <span>{activeMode.number}</span>
                <ActiveIcon size={18} />
                <span>{activeMode.label}</span>
              </div>
              <h3>{activeMode.title}</h3>
              <p>{activeMode.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
