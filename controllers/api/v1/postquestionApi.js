const Question=require('../../../models/postquestion');

module.exports.createQuesionPost=async function(request,response)
{
    try {
        const { description } = request.body
     

        const question = await Question.create({
            description,
           
        })

        return response.status(201).json(question);
    } catch (error) {
        return response.status(500).json({"error":error})
    }
}