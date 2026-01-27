import { useState } from 'react';
import { useCreateTrip } from '../../hooks/trips/useCreateTrips';

export default function CreateTripModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [members, setMembers] = useState(['You']);

  const createTrip = useCreateTrip();

  const addMember = () => {
  if (members[members.length - 1].trim() === "") return;
  setMembers([...members, ""]);
};


  const submit = () => {
    const cleanedMembers = members.map((name) => name.trim()).filter(Boolean); // 🔥 removes empty strings

    if (!title.trim()) {
      alert('Trip title is required');
      return;
    }

    if (cleanedMembers.length < 1) {
      alert('At least one member is required');
      return;
    }

    createTrip.mutate({
      title: title.trim(),
      members: cleanedMembers.map((name) => ({ name })),
    });

    setOpen(false);
  };

  if (!open)
    return (
      <button onClick={() => setOpen(true)} className="text-glow">
        + New Trip
      </button>
    );

  return (
    <div className="bg-surface text-black border border-border rounded-xl p-4 space-y-3">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Trip name" />

      {members.map((m, i) => (
        <input
          key={i}
          value={m}
          onChange={(e) => {
            const copy = [...members];
            copy[i] = e.target.value;
            setMembers(copy);
          }}
          placeholder="Member name"
        />
      ))}

      <button onClick={addMember}>+ Add member</button>
      <button onClick={submit} className="bg-glow text-bg px-3 py-1 rounded">
        Create
      </button>
    </div>
  );
}
