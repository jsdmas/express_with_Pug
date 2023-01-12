import User from "../models/User";
import bcrypt from 'bcrypt';
import fetch from "cross-fetch";

export const getJoin = (_, res) => {
    return res.render("join", { pageTitle: "join User" })
};
export const postJoin = async (req, res) => {
    const { body: { email, username, password, password2, name, location } } = req;
    const pageTitle = "Join";
    if (password !== password2) {
        return res.status(400).render("join", { pageTitle, errorMessage: "Password Confirmation does not match" });
    }
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
        return res.status(400).render("join", { pageTitle, errorMessage: "This username/email is already taken." });
    }
    await User.create({
        email, username, password, name, location
    });
    return res.redirect("/");
};

export const getLogin = (_, res) => res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
    const { body: { username, password } } = req;
    const pageTitle = "Login";
    const user = await User.findOne({ username, socialOnly: false });
    if (!user) {
        return res.status(400).render("login", { pageTitle, errorMessage: "An account with this username does not exists." });
    }
    // 클라이언트 입력 password, db password 비교 (true,false)
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", { pageTitle, errorMessage: "Wrong Password" });
    }

    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
    const baseURL = 'https://github.com/login/oauth/authorize';
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: 'read:user user:email',
    };
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    return res.redirect(finalURL);
};

export const finishGithubLogin = async (req, res) => {
    const baseURL = 'https://github.com/login/oauth/access_token';
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    const tokenRequest = await (await fetch(finalURL, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })).json();

    if ("access_token" in tokenRequest) {

        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                }
            })
        ).json();

        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                }
            })
        ).json();

        const emailObj = emailData.find((email) => email.primary === true && email.verified === true);

        if (!emailObj) {
            return res.redirect("/login");
        }

        let user = await User.findOne({ email: emailObj.email });
        if (!user) {
            user = await User.create({
                name: userData.name,
                avatarUrl: userData.avatar_url,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                location: userData.location,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};


export const getEdit = (_, res) => {
    return res.render("edit-profile", { pageTitle: "edit-profile" });
}

export const postEdit = async (req, res) => {
    const { body: { name, email, username, location },
        session: { user: { _id, avatarUrl, username: sessionUsername, email: sessionEmail } }, file } = req;

    // db에 중복되는 email, username이 있을경우 errorMessage 보내기.
    let searchParams = [];
    sessionUsername !== username ? searchParams.push({ username }) : searchParams;
    sessionEmail !== email ? searchParams.push({ email }) : searchParams;

    if (searchParams.length > 0) {
        const foundUser = await User.findOne({ $or: searchParams });
        if (foundUser && foundUser._id.toString() !== _id) {
            return res.status(400).render("edit-profile", {
                pageTitle: "edit-profile",
                errorMessage: "This username/email is already taken.",
            })
        }
    }

    // backend뿐아니라 prontend에도 변경된 값이 반영되어야 하기 떄문에
    // user의 값을 가져다주는 session도 update 해줘야한다.
    const updateUser = await User.findByIdAndUpdate(_id, {
        name, email, username, location, avatarUrl: file ? file.path : avatarUrl
    }, { new: true });
    req.session.user = updateUser;
    return res.redirect("/users/edit");
}

export const getChangePassword = (_, res) => {
    return res.render("change-password", { pageTitle: "change-password" });
}

export const postChangePassword = async (req, res) => {
    const { body: { oldPassword,
        newPassword,
        newPasswordConfirmation },
        session: { user: { _id, password } } } = req;

    if (oldPassword === newPassword) {
        return res.status(400).render("change-password", { pageTitle: "change-password", errorMessage: "기존 비밀번호와 다르게 생성하여야 합니다." });
    }

    if (newPassword !== newPasswordConfirmation) {
        return res.status(400).render("change-password", { pageTitle: "change-password", errorMessage: "비밀번호가 일치하지 않습니다." });
    }
    const user = await User.findById(_id);
    const ok = await bcrypt.compare(oldPassword, password);
    /** 2번쨰방법 : user를 찾아서 가장 최근의 DB에 있는 비밀번호를 사용.
     *  이 방법을 사용할시 세션을 업데이트 할 필요가 없어진다.
        const ok = bcrypt.compare(oldPassword, user.password);
     */
    if (!ok) {
        return res.status(400).render("change-password", { pageTitle: "change-password", errorMessage: "비밀번호가 일치하지 않습니다." });
    }
    // 새로운 password 저장
    user.password = newPassword;
    // 비밀번호 hash
    await user.save();
    // session 의 비밀번호를 update해줘야 logout이 된다.
    req.session.user.password = user.password;

    req.session.destroy();
    return res.redirect("/login");
}



