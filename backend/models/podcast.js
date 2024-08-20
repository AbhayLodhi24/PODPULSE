import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema({
    frontImage: {
        type: String,
        required: true, 
    },
    audioFile: {
        type: String,
        required: true, 
    },
    title: {
        type: String,
        unique: true,
        required: true, 
    },
    description: {
        type: String,
        required: true, 
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
},
{timestamps: true}
);

const Podcast = mongoose.model('Podcast', podcastSchema);
export default Podcast;
