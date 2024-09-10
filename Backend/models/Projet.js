import mongoose from 'mongoose';

const projetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  images: [{
    type: String
  }],
}, { timestamps: true });

export default mongoose.model('Projet', projetSchema);
