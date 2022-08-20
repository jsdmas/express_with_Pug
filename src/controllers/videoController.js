const videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 1,
        id: 1
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "3 minutes ago",
        views: 59,
        id: 2
    },
    {
        title: "Third Video",
        rating: 5,
        comments: 2,
        createdAt: "4 minutes ago",
        views: 59,
        id: 3
    }
]
export const trending = (req, res) => res.render("home", { pageTitle: "Home", videos });
export const watch = (req, res) => {
    const { id } = req.params;
    // params : 매개변수  , const id = req.params.id ; 
    // params 는 videoRouter의 /:id(\\d+) 부분을 말한다.
    const video = videos[id - 1];
    return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
    // watch 라는 template render해주기
    // pageTitel에 보내는 변수명이 videos.title 이 아니라 video.title인 이유는 
    // trending 함수가 home으로 videos배열을 render해준뒤 데이터를 mixins를 통해 받기 때문에 video라 적은것.
}

export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("edit", { pageTitle: `Editing : ${video.title}`, video });
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    // form에서 오는 body에서 title 얻기
    // req.body = form에 있는 value의 javascript representation이다.(JS식으로 표현한 것)
    // input에 name이 없다면 req.body에서 데이터를 볼 수 없다.
    videos[id - 1].title = title;
    res.redirect(`/videos/${id}`);
}
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" })
}

export const postUpload = (req, res) => {
    const { title } = req.body;
    const newVideo = {
        title,
        rating: 0,
        comments: 0,
        createdAt: "just now",
        views: 0,
        id: videos.length + 1,
    };
    videos.push(newVideo);
    return res.redirect("/");
}