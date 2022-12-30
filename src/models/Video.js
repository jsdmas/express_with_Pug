import mongoose from "mongoose";
const { Schema, model } = mongoose;

const videoSchema = new Schema({
    title: String,
    description: String,
    createAt: Date,
    hashtags: [{ type: String }],
    meta: {
        views: Number,
        rating: Number,
    },
});

const Video = model("Video", videoSchema);
export default Video;