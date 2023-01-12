import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    // browser에서 받아온 세션을(req.session) backend에서 가공하여 처리해준뒤 
    // pug에서 사용할 수 있게 local로 보내준다.
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};

    next();
}

export const protectorMiddleware = (req, res, next) => {
    if (res.locals.loggedIn) {
        return next();
    } else {
        return res.redirect("/login");
    }
};

export const publicMiddleware = (req, res, next) => {
    if (!res.locals.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
};

//  https://www.npmjs.com/package/multer
export const avatarUpload = multer({ dest: "uploads/avatars", limits: 3000000 });

export const videoUpload = multer({ dest: "uploads/videos", limits: 10000000 });

