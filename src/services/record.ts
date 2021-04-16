import { RecordData } from '../interfaces';
import Record from '../models/record';

/**
 *
 * @param Date startDate
 * @param Date startDate
 * @param number minCount
 * @param numebr maxCount
 *
 * @description filters the record collection
 * @returns An array of objects with values totalCount, createdAt and key
 */
const filterRecords = async (
  startDate: string,
  endDate: string,
  minCount: number,
  maxCount: number
): Promise<RecordData[]> => {
  const records = await Record.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    { $project: { key: 1, createdAt: 1, totalCount: { $sum: '$counts' } } },
    { $match: { totalCount: { $gte: minCount, $lt: maxCount } } },
  ]);
  return records;
};

export { filterRecords };
