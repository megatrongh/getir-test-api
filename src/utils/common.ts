import { NextFunction, Request, Response } from 'express';
import { ExpressJoiError } from 'express-joi-validation';
import { ResponseObject } from '../interfaces';

import { errorCodes } from './constants';
import logger from './logger';

/**
 *
 * @name ApiResponse
 * @param {number} code - predefined error codes
 * @param {string} msg - description of error or success messages
 * @param {array} records - An array of records
 * @param {array} errors - An array of erorrs if there was an error in the app
 *
 * @description Api response object
 * @returns APi response object
 */
const ApiResponse = ({
  code,
  msg,
  records = [],
}: ResponseObject): ResponseObject => ({
  code,
  msg,
  records,
});

/**
 *
 * @name notFound
 * @param {object} req
 * @param {object} res
 * @param {function} NextFunction
 * @description handles Resource not found errors
 */
const notFound = (req: Request, res: Response): Response =>
  res.status(404).send(ApiResponse({ code: 2, msg: errorCodes[2] }));

/**
 *
 * @name handleJoiValidationError
 * @param {object} req
 * @param {object} res
 * @description handles joi validation errors
 */

const handleJoiValidationError = (
  err: ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err && err.error && err.error.isJoi) {
    logger.error(err.error.toString());
    return res.status(400).send(
      ApiResponse({
        code: 3,
        msg: `${err.error.toString()}`,
      })
    );
  } else {
    next(err);
  }
};

export { ApiResponse, notFound, handleJoiValidationError };
