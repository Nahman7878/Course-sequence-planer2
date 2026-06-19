# Course Sequence Planner
### CoSc3311 – Fundamentals of Software Engineering
**Addis Ababa University, Department of Computer Science**

---

## Team Members
| Name | ID |
|------|----|
| Natinael Firew | NSE/8485/15 |
| Worku Fikerselassie | NSE/8384/15 |
| Binyam Tesfaye | NSE/1177/15 |
| Nahom Ayalineh | NSE/0828/15 |

**Instructor:** Dagmawi Lemma (PhD)
**Submission Date:** June 19, 2026

---

## Project Overview

The Course Sequence Planner is a web application that helps students plan their technology learning by:
1. Generating personalised, prerequisite-ordered learning paths based on what the student already knows
2. Validating student-submitted learning plans against stored prerequisite rules
3. Tracking completion progress step by step
4. Allowing instructors to manage the technology and prerequisite database

---

## How to Run

**No installation required.** This is a pure frontend application.

1. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)
2. That's it — everything runs locally

**Demo Instructor Login:**
- Email: `instructor@aau.edu.et`
- Password: `password123`

---

## File Structure

```
course-sequence-planner/
├── index.html              ← All 11 screens, all CSS, all event wiring
├── js/
│   ├── database.js         ← In-memory DB: 16 technologies, 18 prerequisites
│   ├── pathEngine.js       ← FR-004, FR-005: gap computation + topological sort
│   ├── validator.js        ← FR-010, FR-011: sequence validation engine
│   └── state.js            ← Application state + localStorage persistence
└── README.md               ← This file
```

---

## Functional Requirements Coverage

| FR | Description | Screen | Status |
|----|-------------|--------|--------|
| FR-001 | Student searches for learning goal | Home | Checked |
| FR-002 | Student records current knowledge via checklist | Checklist | Checked |
| FR-003 | System stores prerequisite relationships in DB | database.js | Checked |
| FR-004 | System compares known skills vs required | pathEngine.js | Checked |
| FR-005 | System generates dependency-ordered path | Learning Path | Checked |
| FR-006 | System explains each step | Learning Path (Why column) | Checked |
| FR-007 | System shows time estimates per step + total | Learning Path | Checked |
| FR-008 | System offers alternative path options | Alternative Paths | Checked |
| FR-009 | Student submits custom plan for validation | Validate My Plan | Checked |
| FR-010 | System validates sequence for ordering errors | validator.js | Checked |
| FR-011 | System displays validation report with suggestions | Validation Results | Checked |
| FR-012 | Student marks steps complete, path updates | Progress Tracking | Checked |
| FR-013 | Instructor adds new technologies | Add Technology | Checked |
| FR-014 | Instructor defines prerequisites with levels | Add Technology Step 2 | Checked |
| FR-015 | Instructor updates existing prerequisites | Edit (Tech List) | Checked |
| FR-016 | Instructor deletes technologies with warning | Delete (Tech List) | Checked |

---

## Non-Functional Requirements Coverage

| NFR | Description | Implementation |
|-----|-------------|----------------|
| NFR-1.1 | Path excludes already-known skills | `computeGap()` in pathEngine.js |
| NFR-1.2 | Steps ordered — no tech before its prereqs | `topologicalSort()` in database.js |
| NFR-1.3 | Every step has ≥15-word explanation | Stored in prerequisiteDetails |
| NFR-1.4 | Total time = sum of step times | `generatePath()` accumulates totalWeeks |
| NFR-1.5 | Missing critical prereq → ERROR | validator.js error classification |
| NFR-1.6 | Missing helpful prereq → WARNING only | validator.js warning classification |
| NFR-1.7 | Every flagged problem has corrective action | Each entry has `.suggestion` field |
| NFR-1.8 | Valid steps get positive confirmation | Green checkmark items in Results |
| NFR-1.9 | Each prereq has exactly one importance level | Enforced in Add Tech Step 2 |
| NFR-1.10 | Explanation must be ≥15 characters | Validated in `addTechNext()` |
| NFR-1.11 | Circular dependency blocked | `wouldCreateCycle()` in database.js |
| NFR-2.1 | Works in standard browser, no install | Pure HTML/CSS/JS, no build step |
| NFR-2.2 | Responsive layout for all screen sizes | CSS media query at 1024px |
| NFR-2.3 | Usable without documentation | Self-explanatory UI with inline hints |
| NFR-5.1 | Instructor screens require login | Login gate + nav guard |
| NFR-5.2 | Students cannot access instructor screens | Nav click intercepted if not logged in |
| NFR-6.1 | Circular dependencies blocked at graph level | `wouldCreateCycle()` traversal |
| NFR-6.2 | Tech entry requires name + desc + category | Step 1 validation in wizard |
| NFR-6.3 | Delete warns about dependent technologies | `confirmDelete()` checks dependents |

---

## Architecture

The system uses a **Boundary-Control-Entity** architecture (Jacobson):

- **Boundary:** 11 HTML screens — the user interface
- **Control:** `pathEngine.js` (EP-001), `validator.js` (EP-002), inline instructor logic (EP-003)
- **Entity:** `database.js` — Technology and Prerequisite objects

The overall pattern is a **layered single-page application**:
- Presentation layer: HTML + CSS in index.html
- Business logic layer: pathEngine.js, validator.js
- Data layer: database.js (in-memory; would be PostgreSQL in production)

---

## Known Prototype Limitations (expected for a course project)

- Data is in-memory — changes reset on page refresh (production would use PostgreSQL)
- Authentication is demo-only (production would use server-side sessions)
- PDF export uses browser print (production would use a PDF library)
