import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI;

mongoose.set('strictQuery', true);
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('DB conectada');
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });
