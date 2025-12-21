import { useState } from "react";

export default function AddSectionForm({ onAdd }) {
  const [sectionName, setSectionName] = useState("");
  const [limit, setLimit] = useState("");

  const handleSubmit = () => {
    if (!sectionName.trim() || !limit) return;

    onAdd({
      section: sectionName.trim(),
      limit: Number(limit),
      categories: [],
    });

    setSectionName("");
    setLimit("");
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <input
        className="text-black"
        placeholder="Section name (e.g. Lifestyle)"
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
      />

      <input
        className="text-black"
        type="number"
        placeholder="Monthly limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-glow text-bg rounded-lg"
      >
        + Add Section
      </button>
    </div>
  );
}
