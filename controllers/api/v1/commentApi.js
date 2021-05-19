const { response } = require('express');
const Comment = require('../../../models/comment');
const Post = require('../../../models/post');

module.exports.createcomment = async function (request, response) {
    try {
        let post = await Post.findById(req.body.post);


        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {


                post.comments.push(comment);
                post.save();
                return response.json(200, {
                    status: 200,
                    message: 'Comment added'
                })

            });
        }
    } catch (err) {
        return response.json(500, {
            status: 500,
            message: 'Internal Server Error'
        });
    }
}
// Destroy the comment
module.exports.destroy = async function (request, response) {
    try {
      let comment=await Comment.findById(req.params.id);
            if (comment.user == req.user.id) {
                let postId = comment.post;

                comment.remove();

                Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                    return response.json(200, {
                        status:200,
                        comment:'Comment added'
                    });

                })
            } else {
                return response.json(200, {
                    status:200,
                    message:'comment added'
                });
            }

    

    } catch (err) {
        return response.json(500, {
            status: 500,
            message: 'Internal Server Error!!'
        })
    }

}

