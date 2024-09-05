import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ['Admin', 'Client'], default: 'Client' },
  panier: { type: Schema.Types.ObjectId, ref: 'Panier' }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
