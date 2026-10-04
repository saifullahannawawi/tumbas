import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Replace these with your real Firebase project credentials to enable live auth.
// With the demo placeholders below, authentication falls back to localStorage
// so the UI remains fully functional for testing.
const firebaseConfig = {
  apiKey: "demo-api-key-replace-me",
  authDomain: "tumbas-demo.firebaseapp.com",
  projectId: "tumbas-demo",
  storageBucket: "tumbas-demo.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:demo",
};

// We lazy-init so that pages without auth don't even try to talk to Firebase.
let _app: ReturnType<typeof initializeApp> | null = null;
let _auth: ReturnType<typeof getAuth> | null = null;
let _provider: GoogleAuthProvider | null = null;
let _initAttempted = false;

function ensureInit() {
  if (_initAttempted) {
    return { app: _app, auth: _auth, provider: _provider };
  }
  _initAttempted = true;

  // Guard against server-side / non-browser environments.
  if (typeof window === "undefined") {
    return { app: null, auth: null, provider: null };
  }

  try {
    // Only init if a real-looking API key is configured.
    if (
      !firebaseConfig.apiKey ||
      firebaseConfig.apiKey.startsWith("demo") ||
      firebaseConfig.apiKey === "replace-me"
    ) {
      console.info(
        "[TUMBAS] Firebase tidak dikonfigurasi (API Key demo). Menggunakan localStorage mode."
      );
      return { app: null, auth: null, provider: null };
    }

    if (!getApps().length) {
      _app = initializeApp(firebaseConfig);
    } else {
      _app = getApps()[0];
    }
    _auth = getAuth(_app);
    _provider = new GoogleAuthProvider();
    _provider.setCustomParameters({ prompt: "select_account" });
  } catch (err) {
    console.warn("[TUMBAS] Gagal inisialisasi Firebase:", err);
    _app = null;
    _auth = null;
    _provider = null;
  }
  return { app: _app, auth: _auth, provider: _provider };
}

// Exported getters allow lazy initialisation on demand.
export function getFirebase() {
  return ensureInit();
}

// Re-export commonly used values for convenience (lazy).
export const app = null;
export const auth = null;
export const googleProvider = null;
