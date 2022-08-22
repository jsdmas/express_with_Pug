import Video from "../models/Video";
// models import

export const home = (req, res) => {
    Video.find({}, (error, videos) => {
        //mongoose 가 Video.find({}) 이 부분을 db 에서 불러온다.
        //db가 반응하면 mongoose는 위의 함수를 실행시킨다.
        //mongoose는 err와 video의 값을 불러온다.
        console.log("errors", error);
        console.log("videos", videos);

    });

    return res.render("home", { pageTitle: "Home", videos: [] });
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
    return res.render("upload", { pageTitle: "Upload Video" })
}

export const postUpload = (req, res) => {
    const { title } = req.body;
    return res.redirect("/");
}