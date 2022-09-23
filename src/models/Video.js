import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, maxLength: 80 },
        description: { type: String, required: true, trim: true, minLength: 20 },
        // default 값에 Date.now() 를 쓰지않는 이유는 함수를 바로 실행시키고 싶지 않아서이다.
        createdAt: { type: Date, required: true, default: Date.now },
        hashtags: [{ type: String, trim: true }],
        meta: {
            views: { type: Number, default: 0, required: true },
            rating: { type: Number, default: 0, required: true },
        },
    }
);

const Video = mongoose.model("Video", videoSchema);
// video model 정의, 모델의 형식은 위의 스키마와 같다.
export default Video;

