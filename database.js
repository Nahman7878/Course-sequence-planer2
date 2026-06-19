// database.js
// This file acts as our in-memory database.
// In production this would be PostgreSQL + a backend API.
// Every technology has: id, name, category, description, estimatedWeeks, difficulty, prerequisites[]
// prerequisites[] holds IDs of technologies that MUST come first

const DB = {

  technologies: [
    { id: 1,  name: "HTML & Semantic Markup",    category: "Frontend",  description: "Structure of web pages, semantic elements, accessibility basics, forms.",          estimatedWeeks: 1, difficulty: "Beginner",     prerequisites: [] },
    { id: 2,  name: "CSS Layout & Flexbox",       category: "Frontend",  description: "Box model, positioning, flexbox, grid, responsive design basics.",                  estimatedWeeks: 1, difficulty: "Beginner",     prerequisites: [1] },
    { id: 3,  name: "JavaScript Fundamentals",    category: "Language",  description: "Variables, functions, arrays, objects, DOM manipulation, events.",                  estimatedWeeks: 3, difficulty: "Beginner",     prerequisites: [1] },
    { id: 4,  name: "Git & Command Line",         category: "Tooling",   description: "Version control, branching, merging, GitHub workflow, CLI basics.",                 estimatedWeeks: 1, difficulty: "Beginner",     prerequisites: [] },
    { id: 5,  name: "TypeScript Basics",          category: "Language",  description: "Types, interfaces, generics. Adds type safety to JavaScript code.",                 estimatedWeeks: 2, difficulty: "Intermediate", prerequisites: [3] },
    { id: 6,  name: "React",                      category: "Frontend",  description: "Component architecture, hooks, state management, JSX.",                             estimatedWeeks: 4, difficulty: "Intermediate", prerequisites: [3, 4] },
    { id: 7,  name: "Node.js & Express",          category: "Backend",   description: "Server-side JavaScript, REST APIs, routing, middleware.",                           estimatedWeeks: 3, difficulty: "Intermediate", prerequisites: [3, 4] },
    { id: 8,  name: "SQL Fundamentals",           category: "Database",  description: "SELECT, INSERT, UPDATE, DELETE, JOINs, basic schema design.",                       estimatedWeeks: 2, difficulty: "Beginner",     prerequisites: [] },
    { id: 9,  name: "PostgreSQL",                 category: "Database",  description: "Advanced queries, indexes, transactions, stored procedures.",                       estimatedWeeks: 2, difficulty: "Intermediate", prerequisites: [8] },
    { id: 10, name: "Docker Basics",              category: "DevOps",    description: "Containers, images, Dockerfile, docker-compose for multi-service apps.",           estimatedWeeks: 2, difficulty: "Intermediate", prerequisites: [4, 7] },
    { id: 11, name: "Testing with Jest",          category: "Quality",   description: "Unit tests, assertions, mocks, test-driven development basics.",                    estimatedWeeks: 1, difficulty: "Intermediate", prerequisites: [3, 7] },
    { id: 12, name: "Python Fundamentals",        category: "Language",  description: "Variables, functions, OOP basics, standard library, pip.",                          estimatedWeeks: 3, difficulty: "Beginner",     prerequisites: [] },
    { id: 13, name: "Django",                     category: "Backend",   description: "MVC web framework for Python. ORM, views, templates, admin panel.",                estimatedWeeks: 3, difficulty: "Intermediate", prerequisites: [12, 8] },
    { id: 14, name: "Next.js",                    category: "Frontend",  description: "React framework with SSR, file-based routing, API routes.",                        estimatedWeeks: 3, difficulty: "Intermediate", prerequisites: [6, 5] },
    { id: 15, name: "REST API Design",            category: "Backend",   description: "HTTP methods, status codes, JSON, API versioning, authentication patterns.",       estimatedWeeks: 1, difficulty: "Intermediate", prerequisites: [7] },
    { id: 16, name: "MongoDB",                    category: "Database",  description: "NoSQL document database. CRUD, aggregation pipeline, indexing.",                   estimatedWeeks: 2, difficulty: "Intermediate", prerequisites: [3] },

    // Mobile development domain
    { id: 17, name: "Kotlin Fundamentals",        category: "Language",  description: "Variables, null safety, classes, coroutines for Android development.",             estimatedWeeks: 3, difficulty: "Beginner",     prerequisites: [] },
    { id: 18, name: "Android Development",        category: "Mobile",    description: "Activities, layouts, fragments, lifecycle, Android Studio basics.",                estimatedWeeks: 4, difficulty: "Intermediate", prerequisites: [17] },
    { id: 19, name: "Swift Fundamentals",         category: "Language",  description: "Optionals, closures, structs, protocols for iOS development.",                     estimatedWeeks: 3, difficulty: "Beginner",     prerequisites: [] },
    { id: 20, name: "iOS Development (SwiftUI)",  category: "Mobile",    description: "Views, state management, navigation, Xcode basics.",                               estimatedWeeks: 4, difficulty: "Intermediate", prerequisites: [19] },
    { id: 21, name: "React Native",               category: "Mobile",    description: "Cross-platform mobile apps using React component patterns.",                       estimatedWeeks: 3, difficulty: "Intermediate", prerequisites: [6] },

    // Data science and machine learning domain
    { id: 22, name: "NumPy & Pandas",             category: "Data Science", description: "Array operations, dataframes, data cleaning, basic statistics.",                estimatedWeeks: 2, difficulty: "Beginner",     prerequisites: [12] },
    { id: 23, name: "Data Visualization",         category: "Data Science", description: "Matplotlib, Seaborn, building clear charts from structured data.",              estimatedWeeks: 1, difficulty: "Beginner",     prerequisites: [22] },
    { id: 24, name: "Machine Learning Basics",    category: "Data Science", description: "Supervised learning, scikit-learn, train/test splits, evaluation metrics.",     estimatedWeeks: 4, difficulty: "Intermediate", prerequisites: [22] },
    { id: 25, name: "Deep Learning with TensorFlow", category: "Data Science", description: "Neural networks, layers, training loops, basic model deployment.",          estimatedWeeks: 4, difficulty: "Advanced",     prerequisites: [24] },

    // Cloud and infrastructure domain
    { id: 26, name: "Linux Fundamentals",         category: "DevOps",    description: "File system, permissions, shell scripting, process management.",                  estimatedWeeks: 2, difficulty: "Beginner",     prerequisites: [4] },
    { id: 27, name: "AWS Cloud Basics",           category: "Cloud",     description: "EC2, S3, IAM roles, basic cloud architecture concepts.",                           estimatedWeeks: 3, difficulty: "Intermediate", prerequisites: [26] },
    { id: 28, name: "CI/CD Pipelines",            category: "DevOps",    description: "Automated build, test, and deploy pipelines using GitHub Actions.",                estimatedWeeks: 2, difficulty: "Intermediate", prerequisites: [4, 10] },
    { id: 29, name: "Kubernetes Basics",          category: "DevOps",    description: "Pods, deployments, services, scaling containerized applications.",               estimatedWeeks: 3, difficulty: "Advanced",     prerequisites: [10] },

    // Additional backend and language coverage
    { id: 30, name: "GraphQL",                    category: "Backend",   description: "Schema design, queries, mutations, resolvers as an alternative to REST.",          estimatedWeeks: 2, difficulty: "Intermediate", prerequisites: [7] },
    { id: 31, name: "Redis Caching",              category: "Database",  description: "Key-value caching, session storage, pub/sub basics.",                             estimatedWeeks: 1, difficulty: "Intermediate", prerequisites: [7] },
  ],

  // Each entry: { techId, prereqId, importanceLevel, explanation }
  // importanceLevel: "critical" | "helpful" | "optional"
  prerequisiteDetails: [
    { techId: 6,  prereqId: 3, importanceLevel: "critical", explanation: "React is built on JavaScript. Without JS fundamentals you cannot write components, use hooks, or understand JSX syntax." },
    { techId: 6,  prereqId: 4, importanceLevel: "helpful",  explanation: "Git is needed to manage your React projects and collaborate via GitHub during development." },
    { techId: 7,  prereqId: 3, importanceLevel: "critical", explanation: "Node.js runs JavaScript on the server. You must understand JS before writing server-side code." },
    { techId: 7,  prereqId: 4, importanceLevel: "helpful",  explanation: "npm (Node Package Manager) is used through the command line to install Express and other packages." },
    { techId: 9,  prereqId: 8, importanceLevel: "critical", explanation: "PostgreSQL is an advanced SQL database. You must know basic SQL before learning PostgreSQL-specific features." },
    { techId: 10, prereqId: 4, importanceLevel: "critical", explanation: "Docker is used from the command line. CLI fluency is required to build images and run containers." },
    { techId: 10, prereqId: 7, importanceLevel: "helpful",  explanation: "Docker is most useful when you have a Node.js app to containerize. Learning both together makes the purpose clear." },
    { techId: 11, prereqId: 3, importanceLevel: "critical", explanation: "Jest tests JavaScript code. You need to understand functions, objects and async JS before writing meaningful tests." },
    { techId: 11, prereqId: 7, importanceLevel: "helpful",  explanation: "Testing APIs with Jest requires understanding of Express route handlers and async request patterns." },
    { techId: 13, prereqId: 12,importanceLevel: "critical", explanation: "Django is a Python framework. Python fundamentals are required before learning any Python-based framework." },
    { techId: 13, prereqId: 8, importanceLevel: "helpful",  explanation: "Django's ORM maps to SQL tables. Understanding basic SQL makes Django models and migrations far clearer." },
    { techId: 14, prereqId: 6, importanceLevel: "critical", explanation: "Next.js is built on top of React. You must know React components, hooks, and state before learning Next.js." },
    { techId: 14, prereqId: 5, importanceLevel: "helpful",  explanation: "Next.js projects typically use TypeScript. Having TypeScript basics makes reading Next.js documentation easier." },
    { techId: 15, prereqId: 7, importanceLevel: "critical", explanation: "REST API design is applied when building Express APIs. You need to know Express before designing API structure." },
    { techId: 16, prereqId: 3, importanceLevel: "critical", explanation: "MongoDB's Node.js driver and Mongoose are used with JavaScript. JS fundamentals are required." },
    { techId: 5,  prereqId: 3, importanceLevel: "critical", explanation: "TypeScript is a superset of JavaScript. You cannot learn TypeScript without first understanding JavaScript." },
    { techId: 2,  prereqId: 1, importanceLevel: "critical", explanation: "CSS styles HTML elements. You must understand HTML structure before applying CSS to elements." },
    { techId: 3,  prereqId: 1, importanceLevel: "helpful",  explanation: "JavaScript manipulates the DOM which is built from HTML. Understanding HTML makes DOM manipulation meaningful." },

    // Mobile development prerequisites
    { techId: 18, prereqId: 17, importanceLevel: "critical", explanation: "Android development is written in Kotlin. You must know Kotlin syntax before building Android screens." },
    { techId: 20, prereqId: 19, importanceLevel: "critical", explanation: "SwiftUI views are written in Swift. You must understand Swift syntax before composing iOS interfaces." },
    { techId: 21, prereqId: 6,  importanceLevel: "critical", explanation: "React Native reuses React's component model. You must know React before learning its mobile counterpart." },

    // Data science prerequisites
    { techId: 22, prereqId: 12, importanceLevel: "critical", explanation: "NumPy and Pandas are Python libraries. Python fundamentals are required before using either one." },
    { techId: 23, prereqId: 22, importanceLevel: "critical", explanation: "Data visualization charts are built from Pandas dataframes. You need to know how to shape data first." },
    { techId: 24, prereqId: 22, importanceLevel: "critical", explanation: "Machine learning models in scikit-learn expect data prepared with Pandas. Data handling skills come first." },
    { techId: 25, prereqId: 24, importanceLevel: "critical", explanation: "Deep learning builds on the same evaluation concepts as classical machine learning, applied to neural networks." },

    // Cloud and DevOps prerequisites
    { techId: 26, prereqId: 4,  importanceLevel: "helpful",  explanation: "Linux shell usage builds naturally on basic command line skills learned with Git." },
    { techId: 27, prereqId: 26, importanceLevel: "critical", explanation: "AWS instances run Linux. You must be comfortable with the Linux shell before managing cloud servers." },
    { techId: 28, prereqId: 4,  importanceLevel: "critical", explanation: "CI/CD pipelines are triggered by Git commits. Git fundamentals are required to configure any pipeline." },
    { techId: 28, prereqId: 10, importanceLevel: "helpful",  explanation: "Most CI/CD pipelines build and push Docker images, so Docker basics make the pipeline steps clearer." },
    { techId: 29, prereqId: 10, importanceLevel: "critical", explanation: "Kubernetes orchestrates Docker containers. You must understand containers before learning to orchestrate them." },

    // Additional backend prerequisites
    { techId: 30, prereqId: 7,  importanceLevel: "critical", explanation: "GraphQL servers are commonly built on top of Node.js and Express in JavaScript projects." },
    { techId: 31, prereqId: 7,  importanceLevel: "helpful",  explanation: "Redis is most often introduced as a caching layer in front of an existing Node.js and Express API." },
  ],

  // Saved learning paths per student (stored in localStorage in production)
  savedPaths: [],
};

// ── Utility: get a technology by id ──────────────────────────────────────────
function getTechById(id) {
  return DB.technologies.find(t => t.id === id) || null;
}

// ── Utility: get all prerequisite IDs for a given tech (direct only) ─────────
function getDirectPrereqs(techId) {
  const tech = getTechById(techId);
  return tech ? tech.prerequisites : [];
}

// ── Topological sort: orders an array of tech IDs so prereqs always come first ─
// Uses Kahn's algorithm (BFS-based). Returns sorted array or throws if cycle found.
function topologicalSort(techIds) {
  const idSet = new Set(techIds);
  const inDegree = {};
  const adjList = {};

  techIds.forEach(id => {
    inDegree[id] = 0;
    adjList[id] = [];
  });

  // Build graph only within our subset
  techIds.forEach(id => {
    const prereqs = getDirectPrereqs(id);
    prereqs.forEach(prereqId => {
      if (idSet.has(prereqId)) {
        adjList[prereqId].push(id);
        inDegree[id]++;
      }
    });
  });

  // Start with nodes that have no prerequisites in our set
  const queue = techIds.filter(id => inDegree[id] === 0);
  const sorted = [];

  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);
    adjList[current].forEach(dependent => {
      inDegree[dependent]--;
      if (inDegree[dependent] === 0) queue.push(dependent);
    });
  }

  // If we couldn't sort all nodes, there is a cycle
  if (sorted.length !== techIds.length) {
    throw new Error("Circular dependency detected in prerequisites.");
  }
  return sorted;
}

// ── Circular dependency check: can we add prereqId → techId without a cycle? ─
// Returns true if SAFE (no cycle), false if it would create a cycle.
function wouldCreateCycle(techId, newPrereqId) {
  // If newPrereqId already depends on techId (directly or transitively), adding
  // techId → newPrereqId would create a cycle.
  function dependsOn(startId, targetId, visited = new Set()) {
    if (startId === targetId) return true;
    if (visited.has(startId)) return false;
    visited.add(startId);
    const prereqs = getDirectPrereqs(startId);
    return prereqs.some(p => dependsOn(p, targetId, visited));
  }
  // If newPrereqId transitively depends on techId, adding the reverse is a cycle
  return dependsOn(techId, newPrereqId);
}