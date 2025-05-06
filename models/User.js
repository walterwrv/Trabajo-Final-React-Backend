import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  role: {
    type: String,
    enum: ['admin', 'owner', 'standard', 'kid'], // Dueño de cuenta, estándar, niño
    default: 'standard',
  },
}, {
  timestamps: true
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

export default User;
