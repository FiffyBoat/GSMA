"use client";

import { useEffect, useRef } from "react";

type ReporterProps = {
  error?: Error & { digest?: string };
};

export default function ErrorReporter({ error }: ReporterProps) {
  const lastOverlayMsg = useRef("");
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (window.parent === window) {
      return;
    }

    const send = (payload: unknown) => window.parent.postMessage(payload, "*");

    const onError = (event: ErrorEvent) =>
      send({
        type: "ERROR_CAPTURED",
        error: {
          message: event.message,
          stack: event.error?.stack,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          source: "window.onerror",
        },
        timestamp: Date.now(),
      });

    const onReject = (event: PromiseRejectionEvent) =>
      send({
        type: "ERROR_CAPTURED",
        error: {
          message: event.reason?.message ?? String(event.reason),
          stack: event.reason?.stack,
          source: "unhandledrejection",
        },
        timestamp: Date.now(),
      });

    const pollOverlay = () => {
      const overlay = document.querySelector("[data-nextjs-dialog-overlay]");
      const node =
        overlay?.querySelector(
          "h1, h2, .error-message, [data-nextjs-dialog-body]"
        ) ?? null;
      const text = node?.textContent ?? node?.innerHTML ?? "";

      if (text && text !== lastOverlayMsg.current) {
        lastOverlayMsg.current = text;
        send({
          type: "ERROR_CAPTURED",
          error: { message: text, source: "nextjs-dev-overlay" },
          timestamp: Date.now(),
        });
      }
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onReject);
    pollRef.current = setInterval(pollOverlay, 1000);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onReject);

      if (pollRef.current) {
        clearInterval(pollRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    window.parent.postMessage(
      {
        type: "global-error-reset",
        error: {
          message: error.message,
          stack: error.stack,
          digest: error.digest,
          name: error.name,
        },
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      },
      "*"
    );
  }, [error]);

  if (!error) {
    return null;
  }

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-destructive">
              Something went wrong!
            </h1>
            <p className="text-muted-foreground">
              An unexpected error occurred. Please refresh the page or try again.
            </p>
          </div>

          {process.env.NODE_ENV === "development" ? (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                Error details
              </summary>
              <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-xs">
                {error.message}
                {error.stack ? (
                  <div className="mt-2 text-muted-foreground">{error.stack}</div>
                ) : null}
                {error.digest ? (
                  <div className="mt-2 text-muted-foreground">
                    Digest: {error.digest}
                  </div>
                ) : null}
              </pre>
            </details>
          ) : null}
        </div>
      </body>
    </html>
  );
}
