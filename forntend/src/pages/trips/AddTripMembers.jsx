import { useState } from "react";
import { useAddTripMember } from "../../hooks/trips/useAddTripMembers";

export default function AddTripMember({ tripId }) {
  const [name, setName] = useState("");
  const addMember = useAddTripMember(tripId);

  const submit = () => {
    if (!name.trim()) return;
    addMember.mutate(name.trim());
    setName("");
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <h4 className="text-sm font-medium mb-2">
        Add Member
      </h4>

      <div className="flex gap-2">
        <input
          className="input flex-1"
          placeholder="Member name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-glow text-bg px-4 rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
}
