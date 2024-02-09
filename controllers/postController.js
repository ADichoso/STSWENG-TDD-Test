const postModel = require('../models/post');
const userModel = require('../models/post');

const { validationResult } = require('express-validator');

exports.addPost = (req, res) => {
    const {
        author,
        title,
        content
        } = req.body;

        postModel.create({ title, content, author}, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
        });
};

exports.updatePost = (req, res) => {
    const errors = validationResult(req);


    console.log("UPDATING POST");
    if (errors.isEmpty()) {
        const {
        id,
        title,
        content
        } = req.body;

        postModel.update({id: id, title: title, content: content}, (err, post) => 
        {
            if (err) {
                return res.status(500).end();
            } else {
                return res.json(post);
            }
        });

    } else {
        res.redirect('/');
    }
};

exports.showUpdatePostPage = (req, res) => 
{
    //Get id of post
    const id = req.params.id;

    console.log("ID:" + id)

    const username = req.session.name

    postModel.getById(id, (err, post) => 
    {
        console.log(post)
        if (err) 
        {
            req.flash('error_msg', 'Could not update post. Please try again.');
            res.redirect('/');
        } 
        else 
        {
            if(post.author.name == username)
            {
                res.render('editPost', 
                {
                    pageTitle: post.title,
                    method: "Update",
                    post: post.toObject(),
                });
            }
        }
    });
}

exports.showDeletePostPage = (req, res) => 
{
    //Get id of post
    const id = req.params.id;

    const username = req.session.name

    postModel.getById(id, (err, post) => 
    {
        if (err) 
        {
            req.flash('error_msg', 'Could not delete post. Please try again.');
            res.redirect('/');
        } 
        else 
        {
            if(post.author.name == username)
            {
                res.render('editPost', 
                {
                    pageTitle: post.title,
                    method: "Delete",
                    post: post.toObject(),
                });
            }
        }
    });
}


exports.getUserPosts = (user, callback) => {
  postModel.getByUser(user, (err, posts) => {
    if (err) throw err;

    const postObjects = [];

    posts.forEach(function(doc) {
      postObjects.push(doc.toObject());
    });

    callback(postObjects);
  });
};

exports.getPost = (req, res) => {
  const postId = req.params.id;

  postModel.getById(postId, (err, post) => {

    res.render('singlepost', { pageTitle: post.title, post: post.toObject()});
  });
}

exports.deletePost = (req, res) => {
  const errors = validationResult(req);

  console.log("DELETING POST");
  if (errors.isEmpty()) {
      const {
      id
      } = req.body;

      postModel.delete(id, (err, post) =>
      {
          if (err) {
              return res.status(500).end();
          } else {
              return res.json(post);
          }
      });
  } else {
  }
};