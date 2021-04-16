import { Request, Response } from 'express';
import { errorCodes } from '../utils/constants';
import { ApiResponse } from '../utils/common';
import { RecordResponse, RecordData } from '../interfaces/index';
import { filterRecords } from '../services/record';

/**
 *
 * @name RecordController
 * @param {Object} req - Request Object
 * @param {Object} res - Request Response
 * @description Handle request for records based on the startDate, endDate, minCount, and maxCount
 * @returns API Response
 */
const RecordController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { startDate, endDate, minCount, maxCount } = req.body;
  try {
    const dbRecords: Array<RecordData> = await filterRecords(
      startDate,
      endDate,
      minCount,
      maxCount
    );
    const records: Array<RecordResponse> = dbRecords.map((record) => ({
      key: record.key,
      createdAt: record.createdAt.toISOString(),
      totalCount: record.totalCount,
    }));
    return res.send(ApiResponse({ code: 0, msg: errorCodes[0], records }));
  } catch (error) {
    return res.send(
      ApiResponse({
        code: 1,
        msg:
          process.env.NODE_ENV !== 'development'
            ? error.stack
            : 'Something went wrong!',
      })
    );
  }
};

export default RecordController;
