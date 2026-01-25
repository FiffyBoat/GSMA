import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface SessionCheckResult {
  authenticated: boolean;
  session: {
    id: string;
    email: string;
    name: string;
  } | null;
}

const SESSION_CHECK_INTERVAL = 60000; // Check every 1 minute
const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes inactivity
const WARNING_TIME = 2 * 60 * 1000; // Warn 2 minutes before logout

/**
 * Hook to monitor admin session and handle timeouts
 * 
 * Features:
 * - Checks if session is still valid
 * - Warns user before session expires
 * - Auto-logs out on inactivity
 * - Triggers logout on session check failure
 */
export function useSessionTimeout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [timeUntilLogout, setTimeUntilLogout] = useState<number | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // Check session validity
  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session", { method: "GET" });
      const data: SessionCheckResult = await res.json();

      if (!res.ok || !data.authenticated) {
        // Session expired
        setIsAuthenticated(false);
        setShowWarning(false);
        router.push("/admin/login");
        return false;
      }

      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Session check failed:", error);
      setIsAuthenticated(false);
      return false;
    }
  }, [router]);

  // Track user activity
  const recordActivity = useCallback(() => {
    setLastActivity(Date.now());
    setShowWarning(false);
    setTimeUntilLogout(null);
  }, []);

  // Handle logout
  const logout = useCallback(async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      router.push("/admin/login");
    }
  }, [router]);

  // Initialize session check and activity listeners
  useEffect(() => {
    // Check session on mount
    checkSession();

    // Set up event listeners for activity
    const activityEvents = [
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    activityEvents.forEach((event) => {
      document.addEventListener(event, recordActivity, true);
    });

    // Session check interval
    const sessionCheckInterval = setInterval(checkSession, SESSION_CHECK_INTERVAL);

    // Inactivity check interval
    const inactivityCheckInterval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;

      // Check if user is inactive
      if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
        // User is inactive - logout
        setShowWarning(false);
        logout();
        return;
      }

      // Show warning if close to timeout
      if (
        timeSinceLastActivity > INACTIVITY_TIMEOUT - WARNING_TIME &&
        !showWarning
      ) {
        setShowWarning(true);
      }

      // Update countdown
      if (showWarning) {
        const timeLeft = INACTIVITY_TIMEOUT - timeSinceLastActivity;
        setTimeUntilLogout(Math.max(0, Math.ceil(timeLeft / 1000)));
      }
    }, 5000); // Check every 5 seconds

    // Cleanup
    return () => {
      activityEvents.forEach((event) => {
        document.removeEventListener(event, recordActivity, true);
      });
      clearInterval(sessionCheckInterval);
      clearInterval(inactivityCheckInterval);
    };
  }, [checkSession, recordActivity, logout, lastActivity, showWarning]);

  return {
    isAuthenticated,
    showWarning,
    timeUntilLogout,
    logout,
  };
}

/**
 * Session timeout warning component
 */
export function SessionTimeoutWarning({
  show,
  secondsLeft,
  onLogout,
}: {
  show: boolean;
  secondsLeft: number | null;
  onLogout: () => void;
}) {
  if (!show || secondsLeft === null) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-50 border-b border-yellow-200 p-4 z-50">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-yellow-700 font-semibold">
            ⚠️ Session Timeout Warning
          </div>
          <div className="text-yellow-600">
            You will be logged out in {minutes}:{seconds.toString().padStart(2, "0")} due to inactivity.
          </div>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
        >
          Logout Now
        </button>
      </div>
    </div>
  );
}
