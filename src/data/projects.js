export const projectCategories = [
  { label: "All", value: "all" },
  { label: "Audio ML", value: "audio-ml" },
  { label: "Computer Vision", value: "computer-vision" },
  { label: "Neuromorphic", value: "neuromorphic" },
  { label: "Edge AI", value: "edge-ai" },
  { label: "Software", value: "software" },
];

export const projects = [
  {
    slug: "underwater-acoustic-vessel-classification",
    title: "Underwater Acoustic Vessel Classification",
    category: "Audio ML",
    image: "/assets/project-images/hydrophone-arrays.jpg",
    imageAlt: "Hydrophone arrays on an oceanographic research vessel",
    categories: ["audio-ml", "edge-ai", "software"],
    featured: true,
    featuredOrder: 1,
    problem:
      "Underwater acoustic classification needs reliable models that can distinguish vessel audio patterns while respecting research privacy, evaluation discipline and potential edge constraints.",
    built:
      "Built an end-to-end audio ML workflow covering acoustic feature engineering, compact deep-learning models, benchmark evaluation, classical ML baselines and deployment-aware model selection.",
    contribution:
      "Owned the practical ML workflow: preprocessing, acoustic representation experiments, model comparison, benchmark evaluation, result interpretation and public-safe research communication.",
    outcome:
      "Achieved about 98% classification accuracy on ShipsEar with a compact 2-layer CNN. Publication-facing method details remain intentionally private.",
    note:
      "Public description avoids private datasets, unpublished implementation details, confidential configurations and local file paths.",
    tags: ["Python", "PyTorch", "ShipsEar", "STFT", "CNNs", "Transformers", "Classical ML", "Evaluation"],
    links: {
      demo: null,
      code: null,
      publication: null,
    },
    caseStudy: {
      overview:
        "A research-engineering project for classifying underwater vessel audio with a focus on efficient model design, reproducible evaluation and deployment-aware thinking.",
      approach: [
        "Prepared audio ML pipelines around feature extraction, training and evaluation.",
        "Compared compact neural models, acoustic representations and broader ML baselines without exposing publication-sensitive details.",
        "Framed model quality together with deployability, generalisation risk and resource-aware model design.",
      ],
      architecture:
        "Audio input -> preprocessing and features -> model comparison -> evaluation -> deployment-readiness review.",
      results:
        "Verified public result: about 98% ShipsEar classification accuracy using a compact 2-layer CNN, presented as evidence that targeted acoustic classifiers can be accurate without oversized backbones when the representation and evaluation workflow are carefully designed.",
      decisions: [
        "Prioritised compact model design for targeted acoustic classification.",
        "Kept unpublished methods and dataset handling details out of the public site.",
        "Framed accuracy together with efficiency and deployment practicality.",
      ],
      limitations: [
        "Full method details, private experimental settings and publication-sensitive comparisons are withheld until publication-ready.",
        "Public links will be added only when code, paper or demo URLs are ready to release.",
      ],
      future: [
        "Add publication link when available.",
        "Add public-safe diagrams or screenshots.",
        "Add deployment notes once they are ready to share.",
      ],
    },
  },
  {
    slug: "event-based-vision-neuromorphic-sensing",
    title: "Event-Based Vision and Neuromorphic Sensing",
    category: "Neuromorphic",
    image: "/assets/project-images/cnn-layers.png",
    imageAlt: "Convolutional feature-processing diagram used as a technical visual",
    categories: ["neuromorphic", "computer-vision", "edge-ai", "software"],
    featured: true,
    featuredOrder: 2,
    problem:
      "Event cameras produce asynchronous data that needs specialised tooling for sensor characterisation, event processing and deployment-aware analysis.",
    built:
      "Built research workflows with event cameras, sensor characterisation, asynchronous event processing, Python pipelines, Faery integration, Arduino-controlled experiments and event-camera data compression work.",
    contribution:
      "Contributed to experiment control, data processing, event-stream analysis and public-safe engineering communication around neuromorphic sensing.",
    outcome:
      "Supported research workflows around event-camera reliability, compression and embedded feasibility without exposing confidential experimental configurations.",
    note:
      "Raspberry Pi feasibility and embedded constraints are discussed at a high level only.",
    tags: ["Event Cameras", "Prophesee", "Faery", "Python", "Arduino", "Compression", "Raspberry Pi"],
    links: {
      demo: null,
      code: null,
      publication: null,
    },
    caseStudy: {
      overview:
        "A research-engineering project around event-based vision workflows and neuromorphic sensing infrastructure.",
      approach: [
        "Processed asynchronous event streams with Python tooling.",
        "Used Faery and live/offline workflows where appropriate.",
        "Connected sensor experiments with Arduino-controlled stimulus or calibration workflows.",
        "Considered compression and embedded constraints for practical deployment contexts.",
      ],
      architecture:
        "Event camera -> acquisition workflow -> event processing pipeline -> characterisation/compression analysis -> embedded feasibility review.",
      results:
        "Public result summary is qualitative: improved research workflow reliability and supported neuromorphic sensing analysis.",
      decisions: [
        "Kept experimental settings and confidential configurations private.",
        "Focused public messaging on engineering responsibilities and safe outcomes.",
      ],
      limitations: [
        "No confidential sensor configuration or unpublished experimental detail is published here.",
      ],
      future: [
        "Add public-safe diagrams or screenshots when available.",
        "Add publication or repository links if approved for release.",
      ],
    },
  },
  {
    slug: "foodvision-mini-deployed-computer-vision",
    title: "FoodVision Mini - Deployed Computer Vision",
    category: "Computer Vision",
    image: "/assets/project-images/cnn-layers.png",
    imageAlt: "Convolutional feature-processing diagram used as a computer vision visual",
    categories: ["computer-vision", "software"],
    featured: true,
    featuredOrder: 3,
    problem:
      "Image-classification projects should show more than notebook accuracy: they should compare models, support reproducible inference and provide a usable demo.",
    built:
      "Trained and compared EfficientNetB2 and Vision Transformer image-classification models using PyTorch, then deployed an interactive inference demo on Hugging Face Spaces.",
    contribution:
      "Built the model training, evaluation and deployment workflow as a user-facing computer vision portfolio project.",
    outcome:
      "Demonstrates computer vision, transfer learning, model evaluation, reproducible inference and public ML deployment experience.",
    tags: ["PyTorch", "Computer Vision", "EfficientNetB2", "Vision Transformer", "Hugging Face", "Deployment"],
    links: {
      demo: null,
      code: null,
      publication: null,
    },
    caseStudy: {
      overview:
        "A deployed computer vision project designed to demonstrate model comparison and accessible inference, not just training code.",
      approach: [
        "Trained and compared EfficientNetB2 and Vision Transformer approaches.",
        "Prepared inference code suitable for an interactive Hugging Face Spaces demo.",
        "Kept the project focused on reproducibility, evaluation and user-facing deployment.",
      ],
      architecture:
        "Image input -> preprocessing -> selected PyTorch model -> inference output -> Hugging Face Spaces interface.",
      results:
        "No verified public metric is shown here yet. Add a measured result once you are ready to publish it.",
      decisions: [
        "Presented both transfer learning and transformer-based model comparison.",
        "Used deployment as evidence of end-to-end ML workflow capability.",
      ],
      limitations: [
        "Live demo and repository URLs need to be inserted before public release.",
      ],
      future: [
        "Add Hugging Face Space URL.",
        "Add GitHub repository URL.",
        "Add screenshots or a public-safe confusion matrix if available.",
      ],
    },
  },
  {
    slug: "raspberry-pi-inference-deployment",
    title: "Raspberry Pi Inference Deployment",
    category: "Edge AI",
    image: "/assets/project-images/raspberry-pi.png",
    imageAlt: "Raspberry Pi single-board computer",
    categories: ["edge-ai", "software"],
    problem:
      "ML models need to be tested against real device constraints before they can be taken seriously for embedded AI use cases.",
    built:
      "Deployed an inference-oriented ML workflow on Raspberry Pi Linux, connecting model execution with practical device constraints.",
    contribution:
      "Worked on repeatable device setup, SSH-based development and deployment-aware inference testing.",
    outcome:
      "Shows edge AI readiness and practical Linux development experience.",
    tags: ["Raspberry Pi", "Embedded AI", "Linux", "SSH", "Inference", "Python"],
    links: { demo: null, code: null, publication: null },
  },
  {
    slug: "raspberry-pi-resource-monitoring-gui",
    title: "Raspberry Pi Resource-Monitoring GUI",
    category: "Software",
    image: "/assets/project-images/raspberry-pi.png",
    imageAlt: "Raspberry Pi single-board computer",
    categories: ["software", "edge-ai"],
    problem:
      "Embedded inference needs visibility into resource use so model behaviour can be interpreted alongside system constraints.",
    built:
      "Built a resource-monitoring workflow for Raspberry Pi experiments to observe compute, memory and system behaviour during ML inference work.",
    contribution:
      "Connected embedded AI experimentation with practical monitoring and operational thinking.",
    outcome:
      "Supports evaluation beyond model accuracy by making device behaviour visible.",
    tags: ["Python", "Monitoring", "Raspberry Pi", "Linux", "Edge AI"],
    links: { demo: null, code: null, publication: null },
  },
  {
    slug: "event-camera-data-compression",
    title: "Event-Camera Data Compression",
    category: "Neuromorphic",
    image: "/assets/project-images/cnn-layers.png",
    imageAlt: "Sparse feature-processing diagram used as a neuromorphic systems visual",
    categories: ["neuromorphic", "software", "edge-ai"],
    problem:
      "Event-based sensors can generate data streams that require efficient representation for analysis and embedded feasibility.",
    built:
      "Worked on event-camera data compression concepts as part of neuromorphic sensing research workflows.",
    contribution:
      "Supported compression-oriented analysis while keeping unpublished research details private.",
    outcome:
      "Demonstrates interest in efficient data handling for event-based vision systems.",
    tags: ["Event Cameras", "Compression", "Neuromorphic", "Python"],
    links: { demo: null, code: null, publication: null },
  },
  {
    slug: "transformer-based-vision-experiments",
    title: "Transformer-Based Vision Experiments",
    category: "Computer Vision",
    image: "/assets/project-images/cnn-layers.png",
    imageAlt: "Neural-network feature extraction visual",
    categories: ["computer-vision"],
    problem:
      "Different vision architectures need to be compared to understand trade-offs in training, evaluation and deployment readiness.",
    built:
      "Built and trained Vision Transformer and Patch Transformer style models as part of broader deep-learning experimentation.",
    contribution:
      "Developed PyTorch model-building intuition across CNN and transformer architectures.",
    outcome:
      "Strengthened computer-vision engineering breadth while keeping the portfolio focused on deployable systems.",
    tags: ["Vision Transformer", "Patch Transformer", "PyTorch", "Model Training"],
    links: { demo: null, code: null, publication: null },
  },
  {
    slug: "nlp-job-description-classifier",
    title: "NLP Job Description Classifier",
    category: "Software",
    image: "/assets/project-images/cnn-layers.png",
    imageAlt: "Neural-network feature extraction visual",
    categories: ["software"],
    problem:
      "Job descriptions can be classified with both classical NLP and modern embedding-based approaches, each with trade-offs.",
    built:
      "Built an NLP classification pipeline using TF-IDF, sentence-transformer embeddings, scikit-learn classifiers and LLM-assisted zero/few-shot methods.",
    contribution:
      "Compared model quality, latency and cost trade-offs across classical and LLM-assisted approaches.",
    outcome:
      "Demonstrates applied ML evaluation and pragmatic model-selection thinking.",
    tags: ["NLP", "TF-IDF", "Sentence Transformers", "scikit-learn", "LLMs"],
    links: { demo: null, code: null, publication: null },
  },

  {
    slug: "high-altitude-payload-separation-system",
    title: "High-Altitude Payload Separation System",
    category: "Edge AI",
    image: "/assets/project-images/bme280-breakout.jpg",
    imageAlt: "BME280 atmospheric sensor breakout board",
    categories: ["edge-ai", "software"],
    problem:
      "High-altitude payload systems need reliable sensing and control logic under practical embedded constraints.",
    built:
      "Built an Arduino and BME280-based payload separation system using sensor readings and embedded control logic.",
    contribution:
      "Worked on the embedded sensing workflow, control behaviour and reliability-oriented system design.",
    outcome:
      "Shows practical embedded systems experience that supports later edge AI deployment work.",
    tags: ["Arduino", "BME280", "Embedded Systems", "Sensors", "Control Logic"],
    links: { demo: null, code: null, publication: null },
  },
  {
    slug: "biomedical-ppg-pulse-sensor",
    title: "Biomedical PPG Pulse Sensor",
    category: "Engineering",
    image: "/assets/project-images/pulse-oximetry.png",
    imageAlt: "Pulse oximetry sensing principle diagram",
    categories: ["software"],
    problem:
      "Biomedical sensing projects require careful signal capture, conditioning and interpretation.",
    built:
      "Built a biomedical electronics workflow using a PPG pulse sensor to capture and interpret physiological signal data.",
    contribution:
      "Applied biomedical signal analysis concepts to electronics, sensing and signal interpretation.",
    outcome:
      "Adds signal-processing and hardware context to the broader ML engineering portfolio.",
    tags: ["Biomedical", "PPG", "Electronics", "Signal Processing"],
    links: { demo: null, code: null, publication: null },
  },
  {
    slug: "bidirectional-dc-dc-converter",
    title: "Bidirectional DC-DC Converter",
    category: "Engineering",
    image: "/assets/project-images/dc-dc-converter.png",
    imageAlt: "DC-DC converter circuit diagram",
    categories: ["software"],
    problem:
      "Power electronics systems require careful circuit design, control thinking and validation.",
    built:
      "Final year engineering project focused on bidirectional power conversion, circuit behaviour, control considerations and system validation.",
    contribution:
      "Connected electrical engineering analysis with practical system validation.",
    outcome:
      "Shows hardware-oriented engineering foundations behind later embedded AI work.",
    tags: ["Power Electronics", "MATLAB", "Control", "Hardware"],
    links: { demo: null, code: null, publication: null },
  },
];

export function getFeaturedProjects() {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function isRealUrl(url) {
  return Boolean(url && url !== "#");
}
