import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center px-5 py-4 hover:bg-border/40 transition"
      >
        <span className="font-semibold text-textPrimary">
          {title}
        </span>

        {open ? (
          <ChevronUp size={18} />
        ) : (
          <ChevronDown size={18} />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 pt-2 space-y-4 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
