import { useState, useEffect } from "react";
import type {
  User,
  CreateUserPayload,
  UpdateUserPayload,
} from "../../types/user";

interface Props {
  initial?: User | null;
  onSubmit: (data: CreateUserPayload | UpdateUserPayload) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function UserForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(initial?.name ?? "");
    setEmail(initial?.email ?? "");
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), email: email.trim() });
  };

  const fieldClass =
    "w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-zinc-500 mb-1.5">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={fieldClass}
          placeholder="e.g. Dimas"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-zinc-500 mb-1.5">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={fieldClass}
          placeholder="e.g. dimas@mail.com"
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 text-sm rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2 text-sm rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 disabled:opacity-50 transition-colors font-medium"
        >
          {loading ? "Saving..." : initial ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
