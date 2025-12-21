import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPasswordInput({ label, register, error }) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1">
      <label className="text-sm text-textMuted">{label}</label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          {...register}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-bg border
            ${error ? "border-danger" : "border-border"}
            text-textPrimary
            focus:outline-none focus:border-glow
            transition
          `}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-3 text-textMuted hover:text-textPrimary"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <p className="text-danger text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
}
