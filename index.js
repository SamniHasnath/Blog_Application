const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

// HOME
app.get("/", (req, res) => {
    res.render("index", { posts });
});

// CREATE POST
app.post("/create", (req, res) => {
    const { title, content } = req.body;

    posts.push({
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleString() // ✅ Date & Time
    });

    res.redirect("/");
});

// DELETE POST
app.get("/delete/:id", (req, res) => {
    posts = posts.filter(post => post.id != req.params.id);
    res.redirect("/");
});

// EDIT PAGE
app.get("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render("edit", { post });
});

// UPDATE POST
app.post("/edit/:id", (req, res) => {
    const { title, content } = req.body;

    const post = posts.find(p => p.id == req.params.id);
    post.title = title;
    post.content = content;

    res.redirect("/");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});