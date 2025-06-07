import * as mongoose from 'mongoose';

export const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

passengerSchema.index({ email: 1 }, { unique: true });
