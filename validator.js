// validator.js
// Implements FR-009, FR-010, FR-011 and NFRs 1.5, 1.6, 1.7, 1.8.
// Takes a student's submitted sequence (array of tech names) and
// returns a detailed ValidationReport.

// ── Match a typed name to a tech in the DB (case-insensitive partial match) ───
function findTechByName(name) {
  const clean = name.trim().toLowerCase();
  return DB.technologies.find(t =>
    t.name.toLowerCase() === clean ||
    t.name.toLowerCase().includes(clean) ||
    clean.includes(t.name.toLowerCase().split(" ")[0])
  ) || null;
}

// ── FR-010: Core validation logic ─────────────────────────────────────────────
// Returns a ValidationReport object with entries for every tech in the submitted list.
function validateSequence(rawLines) {
  // FR-009: Parse the submitted plan — one technology per line
  const lines = rawLines
    .split("\n")
    .map(l => l.replace(/^\d+[\.\)]\s*/, "").trim()) // strip "1." or "1)" numbering
    .filter(l => l.length > 0);

  const entries = [];
  const errors = [];
  const warnings = [];
  const valids = [];

  // Map each line to a tech (or mark as unrecognized)
  const resolved = lines.map(line => ({
    raw: line,
    tech: findTechByName(line),
  }));

  // The IDs in submission order — used for ordering checks
  const submittedIds = resolved.map(r => r.tech?.id).filter(Boolean);
  const positionMap = {}; // techId → index in submitted list
  submittedIds.forEach((id, i) => { positionMap[id] = i; });

  resolved.forEach(({ raw, tech }, index) => {
    if (!tech) {
      // Unrecognized technology name
      entries.push({
        raw,
        status: "error",
        title: `"${raw}" not recognized`,
        description: `This technology is not in the database. Check the spelling or use the Technology List to find the correct name.`,
        suggestion: `Search the Technology List screen to find the closest match and update your plan.`,
      });
      errors.push(raw);
      return;
    }

    const techPrereqDetails = DB.prerequisiteDetails.filter(p => p.techId === tech.id);
    const issuesForThisTech = [];

    techPrereqDetails.forEach(({ prereqId, importanceLevel, explanation }) => {
      const prereqTech = getTechById(prereqId);
      if (!prereqTech) return;

      const prereqPosition = positionMap[prereqId];
      const prereqInList = prereqPosition !== undefined;

      if (!prereqInList) {
        // Prerequisite is completely missing from the submitted plan
        if (importanceLevel === "critical") {
          // NFR-1.5: missing critical prerequisite → ERROR
          issuesForThisTech.push({
            level: "error",
            message: `Missing critical prerequisite: "${prereqTech.name}" is not in your plan at all. ${explanation}`,
            suggestion: `Add "${prereqTech.name}" to your sequence before "${tech.name}".`,
          });
        } else if (importanceLevel === "helpful") {
          // NFR-1.6: missing helpful prerequisite → WARNING (not error)
          issuesForThisTech.push({
            level: "warn",
            message: `"${prereqTech.name}" is missing. It would significantly help before "${tech.name}". ${explanation}`,
            suggestion: `Consider adding "${prereqTech.name}" before "${tech.name}" for a smoother learning experience.`,
          });
        }
      } else if (prereqPosition > index) {
        // Prerequisite is in the list but AFTER the tech that needs it
        if (importanceLevel === "critical") {
          // NFR-1.5: ordering error with critical prereq → ERROR
          issuesForThisTech.push({
            level: "error",
            message: `"${prereqTech.name}" appears after "${tech.name}" in your plan, but "${tech.name}" requires it first. ${explanation}`,
            suggestion: `Move "${prereqTech.name}" to before step ${index + 1} in your sequence.`,
          });
        } else {
          // NFR-1.6: ordering warning for helpful prereq
          issuesForThisTech.push({
            level: "warn",
            message: `"${prereqTech.name}" appears after "${tech.name}". It would be better to learn it first. ${explanation}`,
            suggestion: `Consider moving "${prereqTech.name}" earlier in your plan.`,
          });
        }
      }
    });

    if (issuesForThisTech.length === 0) {
      // NFR-1.8: positive confirmation for correctly placed technologies
      entries.push({
        raw,
        techId: tech.id,
        status: "valid",
        title: `"${tech.name}" is correctly placed`,
        description: `All prerequisites for "${tech.name}" appear before it in your sequence.`,
        suggestion: null,
      });
      valids.push(tech.name);
    } else {
      // Determine overall status for this tech: error beats warn
      const overallStatus = issuesForThisTech.some(i => i.level === "error") ? "error" : "warn";

      // NFR-1.7: every problem entry MUST have a specific corrective action
      const combinedMessage = issuesForThisTech.map(i => i.message).join(" | ");
      const combinedSuggestion = issuesForThisTech.map(i => i.suggestion).join(" | ");

      entries.push({
        raw,
        techId: tech.id,
        status: overallStatus,
        title: `Problem with "${tech.name}"`,
        description: combinedMessage,
        suggestion: combinedSuggestion,
      });

      if (overallStatus === "error") errors.push(tech.name);
      else warnings.push(tech.name);
    }
  });

  return {
    entries,
    summary: {
      total: resolved.length,
      valid: valids.length,
      warnings: warnings.length,
      errors: errors.length,
    },
    // NFR-1.8: if there are zero errors and zero warnings, the plan is fully correct
    isPerfect: errors.length === 0 && warnings.length === 0,
  };
}
