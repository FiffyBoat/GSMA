import { NextRequest, NextResponse } from "next/server";

interface LogEntry {
  timestamp: string;
  level: "error" | "warn" | "info" | "debug";
  service: string;
  message: string;
  metadata?: Record<string, any>;
  stackTrace?: string;
}

/**
 * Structured logging service for the application
 * Provides consistent log formatting and multiple log levels
 */
export class Logger {
  private service: string;

  constructor(service: string) {
    this.service = service;
  }

  private log(
    level: "error" | "warn" | "info" | "debug",
    message: string,
    metadata?: Record<string, any>
  ) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      service: this.service,
      message,
      ...(metadata && { metadata }),
    };

    // Format for console
    const logMessage = `[${entry.timestamp}] [${entry.service}] [${entry.level.toUpperCase()}] ${entry.message}`;

    switch (level) {
      case "error":
        console.error(logMessage, metadata);
        break;
      case "warn":
        console.warn(logMessage, metadata);
        break;
      case "info":
        console.info(logMessage, metadata);
        break;
      case "debug":
        if (process.env.DEBUG) {
          console.debug(logMessage, metadata);
        }
        break;
    }

    // You can add external logging service integration here
    // e.g., Sentry, LogRocket, etc.
  }

  error(message: string, metadata?: Record<string, any>, error?: Error) {
    this.log("error", message, {
      ...metadata,
      ...(error && {
        error: error.message,
        stack: error.stack,
      }),
    });
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.log("warn", message, metadata);
  }

  info(message: string, metadata?: Record<string, any>) {
    this.log("info", message, metadata);
  }

  debug(message: string, metadata?: Record<string, any>) {
    this.log("debug", message, metadata);
  }
}

/**
 * Create logger instance for a service
 */
export function createLogger(service: string): Logger {
  return new Logger(service);
}

/**
 * Middleware to log API requests
 */
export function createLoggingMiddleware(logger: Logger) {
  return async (request: NextRequest, response: NextResponse) => {
    const startTime = Date.now();
    const method = request.method;
    const pathname = new URL(request.url).pathname;

    try {
      logger.debug(`${method} ${pathname}`, {
        method,
        pathname,
      });

      // Log will happen after response is sent
      return response;
    } finally {
      const duration = Date.now() - startTime;
      logger.debug(`${method} ${pathname} completed`, {
        method,
        pathname,
        duration: `${duration}ms`,
      });
    }
  };
}

// Pre-configured loggers for common services
export const authLogger = createLogger("AUTH");
export const databaseLogger = createLogger("DATABASE");
export const storageLogger = createLogger("STORAGE");
export const apiLogger = createLogger("API");
