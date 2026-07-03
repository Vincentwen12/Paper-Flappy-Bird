import { create } from "zustand";

const ACCOUNTS_KEY = "paper_flap_accounts";
const CURRENT_USER_KEY = "paper_flap_currentUser";

interface Accounts {
  [username: string]: string; // username -> hashed password
}

function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return hash.toString(36);
}

function loadAccounts(): Accounts {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAccounts(accounts: Accounts): void {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch { /* ignore */ }
}

function loadCurrentUser(): string | null {
  try {
    return localStorage.getItem(CURRENT_USER_KEY);
  } catch {
    return null;
  }
}

function saveCurrentUser(username: string | null): void {
  try {
    if (username === null) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, username);
    }
  } catch { /* ignore */ }
}

interface AuthState {
  username: string | null;
  isLoggedIn: boolean;
  isRegistered: boolean;
  lastUsername: string | null;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const lastUser = loadCurrentUser();
  const accounts = loadAccounts();

  return {
    username: null,
    isLoggedIn: false,
    isRegistered: Object.keys(accounts).length > 0,
    lastUsername: lastUser,

    login: async (username: string, password: string) => {
      await new Promise((r) => setTimeout(r, 200));

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
      await new Promise((r) => setTimeout(r, 200));

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
  const lastUser = loadCurrentUser();
  const accounts = loadAccounts();
  useAuthStore.setState({
    username: null,
    isLoggedIn: false,
    isRegistered: Object.keys(accounts).length > 0,
    lastUsername: lastUser,
  });
}