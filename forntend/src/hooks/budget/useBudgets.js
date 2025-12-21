import { useState } from "react";
import { budgetSections as rawSections } from "../../data/dummyBudgetData";

/* ---------------- NORMALIZER ---------------- */
const normalizeSections = (sections = []) =>
  sections.map((s) => ({
    section: s.section ?? "Unnamed",
    limit: Number(s.limit ?? 0),
    categories: Array.isArray(s.categories) ? s.categories : [],
  }));

export function useBudgets() {
  const [sections, setSections] = useState(
    normalizeSections(rawSections)
  );

  /* ---------------- ADD SECTION ---------------- */
  const addSection = (newSection) => {
    const sectionName = newSection.section?.trim();
    if (!sectionName) return;

    const exists = sections.some(
      (s) =>
        s.section.toLowerCase() === sectionName.toLowerCase()
    );

    if (exists) {
      alert("Section already exists");
      return;
    }

    setSections((prev) =>
      normalizeSections([...prev, newSection])
    );

    // BACKEND (later)
    // budgetService.createSection(newSection);
  };

  /* ---------------- DELETE SECTION ---------------- */
  const deleteSection = (sectionName) => {
    setSections((prev) =>
      normalizeSections(
        prev.filter((s) => s.section !== sectionName)
      )
    );

    // budgetService.deleteSection(sectionName);
  };

  /* ---------------- UPDATE LIMIT ---------------- */
  const updateLimit = (index, value) => {
    setSections((prev) =>
      normalizeSections(
        prev.map((sec, i) =>
          i === index ? { ...sec, limit: value } : sec
        )
      )
    );

    // budgetService.updateLimit(sections[index].section, value);
  };

  return {
    sections,
    addSection,
    deleteSection,
    updateLimit,
  };
}
