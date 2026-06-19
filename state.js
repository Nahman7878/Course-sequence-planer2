// state.js
// Central application state. All screens read from and write to this object.
// In production this would be server-side sessions + a database.

const State = {
  // ── Student state ─────────────────────────────────────────────────────────
  knownTechIds: [],         // IDs checked in the knowledge checklist
  selectedGoalId: null,     // The tech the student wants to learn
  currentPath: null,        // { steps[], totalWeeks, goalTech } — generated path
  selectedAlternative: "fullstack", // Which alternative path is selected
  validationReport: null,   // Last validation result

  // FR-012: progress tracking — stores completion state per step
  // Shape: { techId: boolean }
  stepCompletion: {},

  // ── Instructor state ──────────────────────────────────────────────────────
  isInstructorLoggedIn: false,
  instructorEmail: "",

  // Search/filter state for the technology list
  techSearchQuery: "",
  techCategoryFilter: "All",

  // Which tech is being edited in the add/edit form
  editingTechId: null,
  addTechStep: 1, // Current step in the 3-step wizard (1, 2, or 3)

  // Temp storage for the new technology being created
  newTech: {
    name: "",
    category: "",
    description: "",
    estimatedWeeks: "",
    difficulty: "Beginner",
    selectedPrereqIds: [],
    prereqImportanceLevels: {}, // { prereqId: "critical"|"helpful"|"optional" }
    prereqExplanations: {},     // { prereqId: string }
    docUrl: "",
    courseUrl: "",
  },

  // ── Helpers ───────────────────────────────────────────────────────────────

  // Save state to localStorage so it survives page refresh
  save() {
    try {
      localStorage.setItem("csp_state", JSON.stringify({
        knownTechIds: this.knownTechIds,
        selectedGoalId: this.selectedGoalId,
        currentPath: this.currentPath,
        stepCompletion: this.stepCompletion,
        isInstructorLoggedIn: this.isInstructorLoggedIn,
        instructorEmail: this.instructorEmail,
      }));
    } catch (e) {
      // localStorage might be unavailable (private mode) — silently continue
    }
  },

  // Load state from localStorage on startup
  load() {
    try {
      const saved = localStorage.getItem("csp_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(this, parsed);
      }
    } catch (e) {
      // Corrupt storage — start fresh
    }
  },

  // Reset student session (useful for "start over" button)
  resetStudent() {
    this.knownTechIds = [];
    this.selectedGoalId = null;
    this.currentPath = null;
    this.stepCompletion = {};
    this.validationReport = null;
    this.save();
  },
};
