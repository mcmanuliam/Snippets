interface LoggingConfig {
  requestLogging: boolean;

  errorLogging: boolean;

  logExpiry: number;
}

export const loggingConfig: LoggingConfig = {
  errorLogging: true,
  logExpiry: 2592000,
  requestLogging: true,
}
