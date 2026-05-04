import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersPage from "./pages/UsersPage";
import ChatPage from "./pages/ChatPage";

const queryClient = new QueryClient();

function Navbar() {
  return (
    <nav className="h-12 bg-white border-b border-zinc-100 px-5 flex items-center gap-1 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-5">
        <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center">
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <span className="text-sm font-semibold text-zinc-800 tracking-tight">
          SimpleApp
        </span>
      </div>

      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive
            ? "px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-900 text-white"
            : "px-3 py-1.5 text-xs font-medium rounded-md text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
        }
      >
        Users
      </NavLink>
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          isActive
            ? "px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-900 text-white"
            : "px-3 py-1.5 text-xs font-medium rounded-md text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
        }
      >
        Chat
      </NavLink>
    </nav>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="h-screen flex flex-col overflow-hidden">
          <Navbar />
          <div className="flex-1 min-h-0">
            <Routes>
              <Route path="/" element={<UsersPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
