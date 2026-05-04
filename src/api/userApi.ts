import api from "./axios";
import type { User, CreateUserPayload, UpdateUserPayload } from "../types/user";

export const userApi = {
  getAll: () => api.get<User[]>("/api/users").then((r) => r.data),

  getById: (id: string) =>
    api.get<User>(`/api/users/${id}`).then((r) => r.data),

  create: (payload: CreateUserPayload) =>
    api.post<User>("/api/users", payload).then((r) => r.data),

  update: (id: string, payload: UpdateUserPayload) =>
    api.put<User>(`/api/users/${id}`, payload).then((r) => r.data),

  delete: (id: string) => api.delete(`/api/users/${id}`),
};
