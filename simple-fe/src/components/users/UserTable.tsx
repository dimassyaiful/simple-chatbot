import type { User } from "../../types/user";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
  if (users.length === 0) {
    return (
      <div className="py-14 text-center">
        <p className="text-sm text-zinc-400">No users yet</p>
        <p className="text-xs text-zinc-300 mt-1">
          Click "Add User" to create the first one
        </p>
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-zinc-100">
          <th className="text-left text-[11px] font-medium text-zinc-400 uppercase tracking-wide px-5 py-3">
            Name
          </th>
          <th className="text-left text-[11px] font-medium text-zinc-400 uppercase tracking-wide py-3">
            Email
          </th>
          <th className="text-left text-[11px] font-medium text-zinc-400 uppercase tracking-wide py-3 hidden sm:table-cell">
            Created
          </th>
          <th className="text-right text-[11px] font-medium text-zinc-400 uppercase tracking-wide px-5 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="border-b border-zinc-50 hover:bg-zinc-50/60 transition-colors"
          >
            <td className="px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center font-semibold text-[11px] shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-zinc-800">{user.name}</span>
              </div>
            </td>
            <td className="py-3.5 text-zinc-500">{user.email}</td>
            <td className="py-3.5 text-zinc-400 text-xs hidden sm:table-cell">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </td>
            <td className="px-5 py-3.5 text-right">
              <button
                onClick={() => onEdit(user)}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors mr-3"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user)}
                className="text-xs font-medium text-red-400 hover:text-red-600 transition-colors"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
