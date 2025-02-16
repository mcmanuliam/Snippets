import {SessionUser} from '../session-user';

// Extend the `Express.Request` interface to add a custom 'curr' property
// This allows us to attach the current user to the 'req' object in our routes

declare global {
  namespace Express {
    interface User extends SessionUser {}

    export interface Response extends ResponseHelpers {}
  }
}

interface ResponseHelpers {
  ok(data?: unknown, message?: string): void;
  negotiate(error?: unknown): void;
  unauthorized(message?: string): void;
  notFound(message?: string): void;
  badRequest(message?: string): void;
  error(message?: string): void;
}