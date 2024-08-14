// src/models/Description.ts
import mongoose, { Schema, model, models } from 'mongoose';

const descriptionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {  // Stelle sicher, dass hier "content" verwendet wird
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Description = models.Description || model('Description', descriptionSchema);

export default Description;
