import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ageCategory: {
      type: String,
      enum: ['Adulto', 'Infantil'], // Por ejemplo, puedes agregar más categorías según tus necesidades
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referencia al usuario al que pertenece el perfil
      required: true,
    },
    watchlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
  },
  { timestamps: true }, 
  { collection: 'profiles' }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
