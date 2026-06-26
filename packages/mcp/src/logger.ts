/**
 * All diagnostic logging goes to stderr. Stdout is reserved exclusively for the MCP
 * protocol stream (JSON-RPC over stdio), so an accidental `console.log` there would corrupt
 * the transport. Keep this the only logging surface in the server.
 */

export interface Logger {
  debug(message: string): void
  info(message: string): void
  warn(message: string): void
  error(message: string): void
}

export function createLogger(enabled = true): Logger {
  const write = (level: 'debug' | 'info' | 'warn' | 'error', message: string): void => {
    if (enabled) process.stderr.write(`[primer-brand-mcp] ${level}: ${message}\n`)
  }
  return {
    debug: message => write('debug', message),
    info: message => write('info', message),
    warn: message => write('warn', message),
    error: message => write('error', message),
  }
}
