const User = require("../models/user");
const { randomUUID } = require("crypto");
const { setUser } = require("../services/auth");
const bcrypt = require("bcrypt");

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

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            password: hashedPassword,
        });

        return res.redirect("/login");

    } catch (error) {
        console.log("SIGNUP ERROR:", error);

        return res.render("signup", {
            error: "Something went wrong. Please try again.",
        });
    }
}


async function handleUserLogin(req, res) {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.render("login", {
                error: "Invalid username or password",
            });
        }

        // Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.render("login", {
                error: "Invalid username or password",
            });
        }

        // Create login session
        const sessionId = randomUUID();

        setUser(sessionId, user);

        res.cookie("uid", sessionId);

        return res.redirect("/notes");

    } catch (error) {
        console.log("LOGIN ERROR:", error);

        return res.render("login", {
            error: "Something went wrong. Please try again",
        });
    }
}


function handleUserLogout(req, res) {
    res.clearCookie("uid");

    return res.redirect("/");
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
};