// pathEngine.js
// This file implements FR-003 through FR-008.
// It takes what the student knows and their goal, then produces a validated learning path.

// ── FR-004: Compare student's knowledge against what the goal requires ────────
// Returns all tech IDs needed (transitively) for goalId, excluding what student knows.
function computeGap(goalId, knownIds) {
  const knownSet = new Set(knownIds);
  const needed = new Set();

  // Recursive: collect all prereqs of a tech, then the tech itself
  function collect(id) {
    if (knownSet.has(id) || needed.has(id)) return;
    const prereqs = getDirectPrereqs(id);
    prereqs.forEach(p => collect(p));
    needed.add(id);
  }

  collect(goalId);
  return [...needed]; // Returns an unordered array of IDs the student is missing
}

// ── FR-005 + FR-006 + FR-007: Generate the full ordered path ─────────────────
// Returns an array of step objects, each ready to display in the path table.
function generatePath(goalId, knownIds) {
  const missingIds = computeGap(goalId, knownIds);

  // Sort missing techs so no tech appears before its own prerequisites (FR-005)
  let sortedIds;
  try {
    sortedIds = topologicalSort(missingIds);
  } catch (e) {
    console.error("Sort failed:", e);
    sortedIds = missingIds; // Fallback: unsorted but won't break the UI
  }

  let totalWeeks = 0;

  const steps = sortedIds.map((id, index) => {
    const tech = getTechById(id);
    const prereqDetails = DB.prerequisiteDetails.filter(p => p.techId === id);

    // FR-006: explanation — use the stored explanation or generate a sensible default
    const explanation = prereqDetails.length > 0
      ? prereqDetails.map(p => p.explanation).join(" ")
      : `${tech.name} is required to progress toward your goal in the correct order.`;

    // FR-007: time estimates
    totalWeeks += tech.estimatedWeeks;

    // Which prereqs of this tech does the student already have vs still need?
    const prereqNames = tech.prerequisites
      .map(pid => getTechById(pid)?.name)
      .filter(Boolean)
      .join(", ") || "None";

    return {
      step: index + 1,
      id: tech.id,
      name: tech.name,
      category: tech.category,
      estimatedWeeks: tech.estimatedWeeks,
      difficulty: tech.difficulty,
      prerequisites: prereqNames,
      explanation: explanation,
      completed: false,
    };
  });

  return { steps, totalWeeks, goalTech: getTechById(goalId) };
}

// ── FR-008: Alternative paths ─────────────────────────────────────────────────
// For the Full-Stack JS goal we define 3 pre-set alternative paths.
// In production this would query the DB and compute multiple topological orderings.
function getAlternativePaths(goalId) {
  // Pre-defined alternatives for demonstration — covers the main web dev tracks
  const alternatives = [
    {
      id: "frontend",
      label: "Frontend Specialist",
      description: "Deep focus on React, Next.js, and UI engineering. Minimal backend.",
      techIds: [1, 2, 3, 4, 6, 5, 14],
      weeks: 13,
      difficulty: "Intermediate",
    },
    {
      id: "fullstack",
      label: "Full-Stack JavaScript",
      description: "Balanced frontend and backend. Most versatile for job applications.",
      techIds: [1, 2, 3, 4, 7, 9, 6, 5, 11, 10],
      weeks: 19,
      difficulty: "Intermediate",
    },
    {
      id: "backend",
      label: "Backend API Engineer",
      description: "Focus on Node.js, databases, and system design. Minimal UI work.",
      techIds: [3, 4, 7, 8, 9, 15, 11, 10],
      weeks: 15,
      difficulty: "Advanced",
    },
  ];

  return alternatives.map(alt => ({
    ...alt,
    techs: alt.techIds.map(id => getTechById(id)?.name).filter(Boolean),
  }));
}
