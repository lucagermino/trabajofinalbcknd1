import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://lucagermino:Luca123@cluster0.asvomzc.mongodb.net/?retryWrites=true&w=majority');
    } catch (error) {
        console.error('Error conectando a MongoDB', error);
        process.exit(1);
    }
}
