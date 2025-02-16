import {Response} from 'express';
import express from 'express';
import HttpStatusCode from './http-status';

export interface StatusError extends Error {
  statusCode?: number;
}

const enum ErrorMessages {
  UNAUTHORIZED = 'Unauthorized',
  NOT_FOUND = 'Not Found',
  SUCCESS = 'Success',
  BAD_REQUEST = 'Bad Request',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
}

/**
 * Extends the `Express` `Response` object with clean helper methods for standardised HTTP responses.
 * Provides convenient methods for common status codes like:
 *
 * - `ok()`
 * - `unauthorized()`
 * - `notFound()`
 * - `badRequest()`
 * - `error()`
 * - `negotiate()`
 */
export function responseHelpers(): void {
  const baseResponse = function (
    this: Response,
    status: HttpStatusCode,
    message: string,
  ): void {
    this.locals.message = message;
    this.status(status).json({message});
  };

  express.response.ok = function (
    this: Response,
    data: unknown = {},
    message: string = ErrorMessages.SUCCESS,
  ): void {
    this.locals.message = message;
    this.status(HttpStatusCode.OK).json({data, message});
  };

  express.response.negotiate = function (this: Response, error: StatusError): void {
    const statusError = error as StatusError;

    const status = statusError?.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    const message = error?.message || ErrorMessages.INTERNAL_SERVER_ERROR;

    this.status(status).json({message});
  };

  express.response.unauthorized = function (
    this: Response,
    message: string = ErrorMessages.UNAUTHORIZED,
  ): void {
    baseResponse.call(this, HttpStatusCode.UNAUTHORIZED, message);
  };

  express.response.notFound = function (
    this: Response,
    message: string = ErrorMessages.NOT_FOUND,
  ): void {
    baseResponse.call(this, HttpStatusCode.NOT_FOUND, message);
  };

  express.response.badRequest = function (
    this: Response,
    message: string = ErrorMessages.BAD_REQUEST,
  ): void {
    baseResponse.call(this, HttpStatusCode.BAD_REQUEST, message);
  };

  express.response.error = function (
    this: Response,
    message: string = ErrorMessages.INTERNAL_SERVER_ERROR,
  ): void {
    baseResponse.call(this, HttpStatusCode.INTERNAL_SERVER_ERROR, message);
  };
}
