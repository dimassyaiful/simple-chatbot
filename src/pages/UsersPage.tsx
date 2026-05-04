import { useState } from "react";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "../hooks/useUsers";
import UserTable from "../components/users/UserTable";
import UserForm from "../components/users/UserForm";
import UserDeleteModal from "../components/users/UserDeleteModal";
import type { User } from "../types/user";

type Modal = "create" | "edit" | "delete" | null;

export default function UsersPage() {
  const { data: users = [], isLoading, isError } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const [modal, setModal] = useState<Modal>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const closeModal = () => {
    setModal(null);
    setSelectedUser(null);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setModal("edit");
  };
  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setModal("delete");
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-zinc-50">
      <div className="max-w-3xl mx-auto px-5 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-semibold text-zinc-800">Users</h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              {users.length} {users.length === 1 ? "user" : "users"}
            </p>
          </div>
          <button
            onClick={() => setModal("create")}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add User
          </button>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-xl ring-1 ring-zinc-200 overflow-hidden">
          {isLoading ? (
            <div className="py-16 text-center text-zinc-400">
              <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm">Loading...</p>
            </div>
          ) : isError ? (
            <div className="py-16 text-center">
              <p className="text-sm text-red-400">Failed to load users.</p>
              <p className="text-xs text-zinc-400 mt-1">
                Make sure the API is running.
              </p>
            </div>
          ) : (
            <UserTable
              users={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {(modal === "create" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 p-6 w-full max-w-sm mx-4">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-zinc-800">
                {modal === "create" ? "New User" : "Edit User"}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {modal === "create"
                  ? "Fill in the details below"
                  : "Update user information"}
              </p>
            </div>
            <UserForm
              initial={selectedUser}
              loading={createUser.isPending || updateUser.isPending}
              onCancel={closeModal}
              onSubmit={async (data) => {
                if (modal === "create") {
                  await createUser.mutateAsync(
                    data as import("../types/user").CreateUserPayload,
                  );
                } else if (selectedUser) {
                  await updateUser.mutateAsync({
                    id: selectedUser.id,
                    payload: data,
                  });
                }
                closeModal();
              }}
            />
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <UserDeleteModal
        user={modal === "delete" ? selectedUser : null}
        loading={deleteUser.isPending}
        onCancel={closeModal}
        onConfirm={async () => {
          if (selectedUser) await deleteUser.mutateAsync(selectedUser.id);
          closeModal();
        }}
      />
    </div>
  );
}
