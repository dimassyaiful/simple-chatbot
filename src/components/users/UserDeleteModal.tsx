import type { User } from "../../types/user";

interface Props {
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function UserDeleteModal({
  user,
  onConfirm,
  onCancel,
  loading,
}: Props) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 p-6 w-full max-w-xs mx-4">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-5 h-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <h3 className="text-center text-sm font-semibold text-zinc-800 mb-1">
          Delete user?
        </h3>
        <p className="text-center text-xs text-zinc-400 mb-5">
          <span className="font-medium text-zinc-600">{user.name}</span> will be
          permanently removed.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-500 hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold disabled:opacity-50 transition-colors"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
