import Video from "../models/Video";
// models import

export const home = async (req, res) => {
    const videos = await Video.find({});
    //home은 모든 Video 를 찾아내고 videos는 video 들로 구성된 array 이다.
    return res.render("home", { pageTitle: "Home", videos })
    // videos 를 home template 으로 전송하고 있다.
}
export const watch = (req, res) => {
    const { id } = req.params;
    return res.render("watch", { pageTitle: `Watching` });
}

export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", { pageTitle: `Editing : ` });
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    res.redirect(`/videos/${id}`);
}
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
}

export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags: hashtags.split(",").map((word) => `#${word}`),
        });
        return res.redirect("/");
    } catch (error) {
        // 만약 에러 발생시 upload page render , error message 출력
        return res.render("upload",
            { pageTitle: "Upload Video", errorMessage: error._message });
    }

}