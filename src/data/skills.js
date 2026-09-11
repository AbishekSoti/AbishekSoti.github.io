export const skillGroups = [
  {
    title: "Acoustic ML & Signal Intelligence",
    summary:
      "Designing audio-classification systems around the structure of the signal, defensible evaluation and efficient model selection.",
    skills: [
      "Time-frequency representation and STFT feature pipelines",
      "Acoustic preprocessing and feature-engineering experiments",
      "Compact convolutional architecture design",
      "Classical and deep-learning baseline comparison",
      "Leakage-aware dataset separation and benchmark evaluation",
      "Accuracy, macro-F1 and error-pattern interpretation",
    ],
    evidence: [
      {
        label: "Underwater vessel classification",
        href: "/projects/underwater-acoustic-vessel-classification",
      },
    ],
  },
  {
    title: "Deep Learning & Model Evaluation",
    summary:
      "Building end-to-end PyTorch workflows that connect architecture decisions to repeatable experiments and useful inference.",
    skills: [
      "Custom PyTorch training and evaluation workflows",
      "Transfer learning with EfficientNet architectures",
      "Vision Transformer and patch-based experiments",
      "Ablation-style model and representation comparison",
      "Inference pipeline design and reproducible model loading",
      "Benchmarking across quality and efficiency constraints",
    ],
    evidence: [
      {
        label: "FoodVision model comparison",
        href: "/projects/foodvision-mini-deployed-computer-vision",
      },
      {
        label: "ShipsEar efficiency study",
        href: "/projects/underwater-acoustic-vessel-classification",
      },
    ],
  },
  {
    title: "Event-Based Vision & Neuromorphic Systems",
    summary:
      "Engineering acquisition and analysis workflows for sparse, asynchronous visual data rather than treating it like conventional video.",
    skills: [
      "Prophesee event-camera acquisition workflows",
      "Asynchronous event-stream processing",
      "Sensor characterisation and controlled experiments",
      "Faery-based live and offline processing",
      "Compression-aware event-data representation",
      "Embedded-feasibility analysis for neuromorphic sensing",
    ],
    evidence: [
      {
        label: "Event-based vision research",
        href: "/projects/event-based-vision-neuromorphic-sensing",
      },
      {
        label: "Event-stream compression",
        href: "/projects/event-camera-data-compression",
      },
    ],
  },
  {
    title: "Edge AI & Embedded Systems",
    summary:
      "Connecting inference with the hardware, operating-system and resource constraints that determine whether a model is practical.",
    skills: [
      "Raspberry Pi Linux inference deployment",
      "CPU and memory resource monitoring",
      "SSH-based device development workflows",
      "Arduino sensor and experiment integration",
      "BME280 environmental sensing and control logic",
      "Hardware-aware debugging and system validation",
    ],
    evidence: [
      {
        label: "Raspberry Pi inference",
        href: "/projects/raspberry-pi-inference-deployment",
      },
      {
        label: "Resource-monitoring GUI",
        href: "/projects/raspberry-pi-resource-monitoring-gui",
      },
    ],
  },
  {
    title: "Python & Engineering Systems",
    summary:
      "Structuring the software around experiments and inference so failures are visible, behaviour is repeatable and components remain maintainable.",
    skills: [
      "Modular Python project structure",
      "Logging and exception-handling strategy",
      "NumPy and pandas data pipelines",
      "SQLite-backed utilities and persistence",
      "Multithreading, multiprocessing and memory-aware processing",
      "Git, Linux and reproducible environment workflows",
    ],
    evidence: [
      {
        label: "Browse software projects",
        href: "/projects",
      },
    ],
  },
  {
    title: "Electrical & Signal Engineering",
    summary:
      "Applying a hardware-grounded understanding of sensing, control and physical signals to software and machine-learning decisions.",
    skills: [
      "MATLAB signal and system analysis",
      "Biomedical PPG acquisition and interpretation",
      "Power-electronics modelling and validation",
      "Sensor interfacing and embedded control",
      "Experimental measurement and technical documentation",
      "Signal-chain reasoning from acquisition to decision",
    ],
    evidence: [
      {
        label: "Biomedical PPG sensing",
        href: "/projects/biomedical-ppg-pulse-sensor",
      },
      {
        label: "Bidirectional DC-DC converter",
        href: "/projects/bidirectional-dc-dc-converter",
      },
    ],
  },
];
