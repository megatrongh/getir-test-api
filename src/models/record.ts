import mongoose from 'mongoose';

/**
 *
 * @description defined schema for the record model
 */
const schema = new mongoose.Schema({
  key: String,
  value: String,
  createdAt: Date,
  counts: [],
});

export default mongoose.model('records', schema);
