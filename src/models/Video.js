import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        title: String,
        // title : {type : String}을 줄여쓴것.
        description: String,
        createAt: Date,
        hashtags: [{ type: String }],
        meta: {
            views: Number,
            rating: Number,
        },
    }
);

const Video = mongoose.model("Video", videoSchema);
// video model 정의, 모델의 형식은 위의 스키마와 같다.
export default Video;

