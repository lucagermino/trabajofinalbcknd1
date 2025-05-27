import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/luca-node');
    } catch (error) {
        console.error('Error conectando a MongoDB', error);
        process.exit(1);
    }
}
