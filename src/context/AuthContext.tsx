import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { Auth, GoogleAuthProvider, User as FbUser } from "firebase/auth";

type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "tumbas_auth_user";
const USERS_KEY = "tumbas_users";

const genUid = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

const loadPersisted = (): User | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

// Local (demo) helpers.
function localRegister(email: string, password: string, name: string): User {
  const raw = localStorage.getItem(USERS_KEY);
  const users: Record<string, { password: string; name: string }> = raw
    ? JSON.parse(raw)
    : {};
  const key = email.toLowerCase();
  if (users[key]) throw new Error("Email sudah terdaftar.");
  users[key] = { password, name };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const u: User = { uid: genUid(), email: key, displayName: name };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  return u;
}

function localLogin(email: string, password: string): User {
  const raw = localStorage.getItem(USERS_KEY);
  const users: Record<string, { password: string; name: string }> = raw
    ? JSON.parse(raw)
    : {};
  const key = email.toLowerCase();
  const rec = users[key];
  if (!rec || rec.password !== password) {
    throw new Error("Email atau password salah.");
  }
  const u: User = { uid: genUid(), email: key, displayName: rec.name };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  return u;
}

function mapFbUser(fb: FbUser): User {
  return {
    uid: fb.uid,
    email: fb.email || "",
    displayName: fb.displayName || fb.email?.split("@")[0] || "User",
    photoURL: fb.photoURL || undefined,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let unsub: (() => void) | null = null;

    (async () => {
      try {
        const { getFirebase } = await import("../firebase/config");
        const { auth } = getFirebase() as { auth: Auth | null };
        if (auth) {
          const { onAuthStateChanged } = await import("firebase/auth");
          unsub = onAuthStateChanged(
            auth,
            (fbUser) => {
              if (cancelled) return;
              if (fbUser) {
                const u = mapFbUser(fbUser);
                setUser(u);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
              } else {
                setUser(null);
                localStorage.removeItem(STORAGE_KEY);
              }
              setLoading(false);
            },
            () => {
              if (!cancelled) {
                setUser(loadPersisted());
                setLoading(false);
              }
            }
          );
          return;
        }
      } catch {
        // fall through to local
      }
      if (!cancelled) {
        setUser(loadPersisted());
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      if (unsub) unsub();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { getFirebase } = await import("../firebase/config");
      const { auth } = getFirebase() as { auth: Auth | null };
      if (auth) {
        const { signInWithEmailAndPassword } = await import("firebase/auth");
        const cred = await signInWithEmailAndPassword(auth, email, password);
        if (cred.user) {
          const u = mapFbUser(cred.user);
          setUser(u);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
          setLoading(false);
          return;
        }
      }
      throw new Error("no-auth");
    } catch (err: any) {
      // If Firebase threw a real auth error (wrong password etc.), surface it;
      // otherwise fall through to local.
      if (err?.code && err.code.startsWith("auth/")) {
        setLoading(false);
        const msg =
          err.code === "auth/user-not-found" ||
          err.code === "auth/wrong-password" ||
          err.code === "auth/invalid-credential"
            ? "Email atau password salah."
            : err.code === "auth/invalid-email"
            ? "Format email tidak valid."
            : err.code === "auth/too-many-requests"
            ? "Terlalu banyak percobaan. Coba lagi nanti."
            : err.message || "Gagal masuk.";
        throw new Error(msg);
      }
      try {
        const u = localLogin(email, password);
        setUser(u);
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
        throw e;
      }
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const { getFirebase } = await import("../firebase/config");
      const { auth } = getFirebase() as { auth: Auth | null };
      if (auth) {
        const { createUserWithEmailAndPassword, updateProfile } = await import(
          "firebase/auth"
        );
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (cred.user && name) {
          await updateProfile(cred.user, { displayName: name });
        }
        const u = mapFbUser(cred.user);
        if (name) u.displayName = name;
        setUser(u);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        setLoading(false);
        return;
      }
      throw new Error("no-auth");
    } catch (err: any) {
      if (err?.code && err.code.startsWith("auth/")) {
        setLoading(false);
        const msg =
          err.code === "auth/email-already-in-use"
            ? "Email sudah terdaftar."
            : err.code === "auth/weak-password"
            ? "Password terlalu lemah (minimal 6 karakter)."
            : err.code === "auth/invalid-email"
            ? "Format email tidak valid."
            : err.message || "Gagal daftar.";
        throw new Error(msg);
      }
      try {
        const u = localRegister(email, password, name);
        setUser(u);
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
        throw e;
      }
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const { getFirebase } = await import("../firebase/config");
      const { auth, provider } = getFirebase() as {
        auth: Auth | null;
        provider: InstanceType<typeof GoogleAuthProvider> | null;
      };
      if (auth && provider) {
        const { signInWithPopup } = await import("firebase/auth");
        const cred = await signInWithPopup(auth, provider);
        const u = mapFbUser(cred.user);
        setUser(u);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        setLoading(false);
        return;
      }
      throw new Error("no-auth");
    } catch {
      // Fallback Google demo.
      const u: User = {
        uid: genUid(),
        email: "google.user@demo.com",
        displayName: "Google User",
      };
      setUser(u);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { getFirebase } = await import("../firebase/config");
      const { auth } = getFirebase() as { auth: Auth | null };
      if (auth) {
        const { signOut } = await import("firebase/auth");
        await signOut(auth);
      }
    } catch {
      // ignore
    }
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
