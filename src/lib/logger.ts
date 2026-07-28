type LogLevel = "debug" | "info" | "warn" | "error";

interface LogPayload {
  message: string;
  context?: string;
  data?: unknown;
  error?: Error | unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV !== "production";
  private isTest = process.env.NODE_ENV === "test";

  private formatMessage(level: LogLevel, payload: LogPayload): string {
    const timestamp = new Date().toISOString();
    const contextPrefix = payload.context ? `[${payload.context}]` : "";
    return `${timestamp} [${level.toUpperCase()}] ${contextPrefix} ${payload.message}`;
  }

  public debug(message: string, context?: string, data?: unknown): void {
    if (!this.isDevelopment || this.isTest) return;
    const formatted = this.formatMessage("debug", { message, context, data });
    console.debug(formatted, data ?? "");
  }

  public info(message: string, context?: string, data?: unknown): void {
    if (this.isTest) return;
    const formatted = this.formatMessage("info", { message, context, data });
    console.info(formatted, data ?? "");
  }

  public warn(message: string, context?: string, data?: unknown): void {
    if (this.isTest) return;
    const formatted = this.formatMessage("warn", { message, context, data });
    console.warn(formatted, data ?? "");
  }

  public error(message: string, context?: string, error?: Error | unknown): void {
    if (this.isTest) return;
    const formatted = this.formatMessage("error", { message, context, error });
    console.error(formatted, error ?? "");
  }
}

export const logger = new Logger();
