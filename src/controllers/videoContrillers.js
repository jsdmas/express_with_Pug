import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
    const videos = await Video.find({})
        .sort({ createdAt: "desc" })
        .populate("owner");
    return res.render("home", { pageTitle: "Home", videos });
};
export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner");
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video Not Found" });
    }

    return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    const { user: { _id } } = req.session;
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video Not Found" });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).render("404", { pageTitle: "Video Not found." });
    }
    return res.render("edit", { pageTitle: `Edit : ${video.title}`, video });
}

export const postEdit = async (req, res) => {
    const { body: { title, description, hashtags }, params: { id }, session: { user: { _id } } } = req;
    // exists : 존재하다 - boolean 반환
    // 영상이 존재하는지 확인
    const video = await Video.exists({ _id: id });
    const videoModified = await Video.findByIdAndUpdate(id, {
        title, description, hashtags: Video.formatHashtags(hashtags)
    });
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video Not Found" });
    }
    if (String(videoModified.owner) !== String(_id)) {
        return res.status(403).render("404", { pageTitle: "Video Not found." });
    }

    return res.redirect(`/videos/${id}`);
}

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
}

export const postUpload = async (req, res) => {
    const { body: { title, description, hashtags }, file: { path: fileUrl }, session: { user: { _id } } } = req;

    try {
        const newVideo = await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
            fileUrl,
            owner: _id,
        });
        const user = await User.findById(_id);
        // owner _id 가 아니라 video가 생성될때의 ObjectId를 저장한다.
        user.videos.push(newVideo._id);
        user.save();

        return res.redirect("/");
    }
    catch (error) {
        return res.status(400).render("upload", { errorMessage: error, pageTitle: "Upload Video" });
    }
}

export const deleteVideo = async (req, res) => {
    const { params: { id }, session: { user: { _id } } } = req;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video Not Found" });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).render("404", { pageTitle: "Video Not found." });
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}

export const search = async (req, res) => {
    let videos = [];
    const { query: { keyword } } = req;
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i")
            }
        }).populate("owner");
    }
    return res.render("search", { pageTitle: "Search", videos });
}