const express = require("express");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const activeUser = req.session.username;

  try {
    const posts = await models.Post.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.render("index", { posts: posts, activeUser });
  } catch {
    res.redirect("/error");
  }
});

postRouter.post("/create", (req, res) => {
  const userID = req.session.userID;
  const activeUser = req.session.username;
  const title = req.body.title;
  const body = req.body.body;
  const category = "other"; //change this later to dropdown

  // Create post object

  const post = models.Post.build({
    title: title,
    body: body,
    category: category,
    author: activeUser,
    authorID: userID,
  });

  // Save post to table

  post.save().then((savedPost) => {
    res.redirect("/posts");
  });
});

postRouter.get("/create", (req, res) => {
  res.render("new-post");
});

//////// Create delete BUTTON /////////

// postRouter.post('/delete', async (req, res) => {

//     const id = req.body.postID

//     try {
//         const deletedPost = await models.Post.destroy({
//             where: {
//                 id: id
//             }
//         })
//     } catch {
//         res.redirect('/error')
//     }

//     res.redirect('/posts')
// })

// Create delete LINK

postRouter.get("/delete/:postID", async (req, res) => {
  const id = req.params.postID;

  try {
    const deletedPost = await models.Post.destroy({
      where: {
        id: id,
      },
    });
  } catch {
    res.redirect("/error");
  }

  res.redirect("/posts");
});

//////// Create edit BUTTON ////////

// postRouter.post('/update/:postID', async (req, res) => {

//     const id = req.params.postID

//     const post = await models.Post.findByPk(id)

//     res.render('update-post', {post})
// })

// Create edit LINK

postRouter.get("/update/:postID", async (req, res) => {
  const id = req.params.postID;

  const post = await models.Post.findByPk(id);

  res.render("update-post", { post });
});

// Allow user to update post

postRouter.post("/update", async (req, res) => {
  const id = req.body.postID;
  const title = req.body.title;
  const body = req.body.body;

  const updatedPost = await models.Post.update(
    {
      title: title,
      body: body,
    },
    {
      where: {
        id: id,
      },
    }
  );

  res.redirect("/posts");
});

module.exports = postRouter;
