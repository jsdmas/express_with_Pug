import mongoose from "mongoose";
const { Schema, model } = mongoose;

// const formatHashtags = (hashtags) => hashtags.split(",").map(word => word.startsWith("#") ? word : `#${word}`);

const videoSchema = new Schema({
    title: { type: String, requried: true, trim: true, maxLength: 80 },
    description: { type: String, requried: true, trim: true, minLength: 20 },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
});

// model이 셍성되기전에 생성해주어야 한다.
videoSchema.static("formatHashtags", function (hashtags) {
    return hashtags.split(",").map(word => word.startsWith("#") ? word : `#${word}`);
})

const Video = model("Video", videoSchema);
export default Video;