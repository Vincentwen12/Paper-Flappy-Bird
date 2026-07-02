import { create } from "zustand";
import { storage } from "@/utils/storage";

const ACCOUNTS_KEY = "accounts";
const CURRENT_USER_KEY = "currentUser";

interface Accounts {
  [username: string]: string; // username -> hashed password
}

// Simple hash for local-only password storage
function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return hash.toString(36);
}

function loadAccounts(): Accounts {
  return storage.get<Accounts>(ACCOUNTS_KEY, {});
}

function saveAccounts(accounts: Accounts): void {
  storage.set(ACCOUNTS_KEY, accounts);
}

function loadCurrentUser(): string | null {
  return storage.get<string | null>(CURRENT_USER_KEY, null);
}

function saveCurrentUser(username: string | null): void {
  if (username === null) {
    storage.remove(CURRENT_USER_KEY);
  } else {
    storage.set(CURRENT_USER_KEY, username);
  }
}

interface AuthState {
  username: string | null;
  isLoggedIn: boolean;
  isRegistered: boolean;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  const currentUser = loadCurrentUser();
  const accounts = loadAccounts();

  return {
    username: currentUser,
    isLoggedIn: currentUser !== null,
    isRegistered: Object.keys(accounts).length > 0,

    login: async (username: string, password: string) => {
      // Simulate async for consistency
      await new Promise((r) => setTimeout(r, 300));

      if (username.length < 2 || username.length > 16) {
        return { ok: false, error: "username_length" };
      }
      if (password.length < 4 || password.length > 32) {
        return { ok: false, error: "password_length" };
      }

      const accounts = loadAccounts();
      if (!accounts[username]) {
        return { ok: false, error: "no_account" };
      }
      if (accounts[username] !== hashPassword(password)) {
        return { ok: false, error: "wrong_credentials" };
      }

      saveCurrentUser(username);
      set({ username, isLoggedIn: true });
      return { ok: true };
    },

    register: async (username: string, password: string) => {
      await new Promise((r) => setTimeout(r, 300));

      if (username.length < 2 || username.length > 16) {
        return { ok: false, error: "username_length" };
      }
      if (password.length < 4 || password.length > 32) {
        return { ok: false, error: "password_length" };
      }

      const accounts = loadAccounts();
      if (accounts[username]) {
        return { ok: false, error: "already_registered" };
      }

      accounts[username] = hashPassword(password);
      saveAccounts(accounts);
      saveCurrentUser(username);
      set({ username, isLoggedIn: true, isRegistered: true });
      return { ok: true };
    },

    logout: () => {
      saveCurrentUser(null);
      set({ username: null, isLoggedIn: false });
    },
  };
});

export function hydrateAuth() {
  const currentUser = loadCurrentUser();
  const accounts = loadAccounts();
  useAuthStore.setState({
    username: currentUser,
    isLoggedIn: currentUser !== null,
    isRegistered: Object.keys(accounts).length > 0,
  });
}