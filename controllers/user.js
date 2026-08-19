const User = require("../models/user");
const { randomUUID } = require("crypto");
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
    try {
        const { username, password, confirmPassword } = req.body;

        if (!username || !password || !confirmPassword) {
            return res.render("signup", {
                error: "All fields are required",
            });
        }

        if (password !== confirmPassword) {
            return res.render("signup", {
                error: "Passwords do not match",
            });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.render("signup", {
                error: "Username already exists",
            });
        }

        await User.create({
            username,
            password,
        });

        return res.redirect("/login");

    } catch (error) {
        console.log(error);

        return res.render("signup", {
            error: "Something went wrong. Please try again.",
        });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            username,
            password,
        });

        if (!user) {
            return res.render("login", {
                error: "Invalid username or password",
            });
        }

        const sessionId = randomUUID();

        setUser(sessionId, user);

        res.cookie("uid", sessionId);

        return res.redirect("/notes");

    } catch (error) {
        console.log(error);

        return res.render("login", {
            error: "Something went wrong. Please try again",
        });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};