"use client";

import { useEffect } from "react";

function isEventLike(value: unknown) {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (typeof Event !== "undefined" && value instanceof Event) {
    return true;
  }

  const candidate = value as {
    type?: unknown;
    target?: unknown;
    currentTarget?: unknown;
    isTrusted?: unknown;
    message?: unknown;
    stack?: unknown;
    name?: unknown;
  };

  return (
    typeof candidate.type === "string" &&
    ("target" in candidate || "currentTarget" in candidate) &&
    candidate.message == null &&
    candidate.stack == null &&
    candidate.name == null
  );
}

function isIgnorableRejection(reason: unknown) {
  if (isEventLike(reason)) {
    return true;
  }

  if (reason === "[object Event]") {
    return true;
  }

  if (
    reason instanceof DOMException &&
    (reason.name === "AbortError" || reason.name === "NotAllowedError")
  ) {
    return true;
  }

  return false;
}

export default function UnhandledRejectionGuard() {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (!isIgnorableRejection(event.reason)) {
        return;
      }

      event.preventDefault();
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection, {
      capture: true,
    });

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
        { capture: true }
      );
    };
  }, []);

  return null;
}
