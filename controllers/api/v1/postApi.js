const Comment=require('../../../models/comment');
const Post=require('../../../models/post');

module.exports.createPost= async function(request,response)
{
    try{
        let post=await Post.find({})
        .sort('createdAt')
        .populate('user')
        .populate({
            path:'Comment',
            populate:{
                path:'user'
            }
        });
        return response.json(200,{
            message:'List of Post',
            post:[]
        })

    }catch(err)
    {
        console.log('Error in the Server');
        return response.json(500,{
            status:500,
            message:'Internal Server Error'
        });
    }
}

// Deleting the Post of the User

module.exports.destroypost=async function(request,response)
{
    try{
            let post=await Post.findById(request.params.id);

            post.remove();

            await Comment.deleteMany({post:request.params.id});
            return response.json(200,{
                status:200,
                message:'Post is Deleted Successfull'
            });
    }catch(err)
    {
        return response.json(500,{
            status:500,
            message:'Internal Server Error'
        });
    }
}


