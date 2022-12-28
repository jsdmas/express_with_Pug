const videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createAt: 2,
        views: 59,
        id: 1
    },
    {
        title: "Second Video",
        rating: 4,
        comments: 9,
        createAt: 5,
        views: 20,
        id: 2
    },
    {
        title: "three Video",
        rating: 2,
        comments: 11,
        createAt: 7,
        views: 10,
        id: 3
    },
];

export const trending = (req, res) => res.render("home", { pageTitle: "Home", videos: videos });
export const see = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("watch", { pageTitle: `${video.title}`, video });
};

export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("edit", { pageTitle: `Edit : ${video.title}`, video });
};
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
};