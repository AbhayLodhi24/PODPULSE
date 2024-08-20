import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true, 
    },
    podcasts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Podcast',
        },
    ],
},
{timestamps: true}
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
