const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.view = async (req, res) => {

    // pega as informaçoes
    const post = await Post.findOne({ slug:req.params.slug });

    res.render('view', { post });
    
}
 

exports.add = (req, res) => {
    res.render('postAdd');

};

exports.addAction = async (req, res) => {
    req.body.tags = req.body.tags.split(',').map(tag => tag.trim());

    
    const post = new Post(req.body);

    try {
        await post.save();
    } catch(error) {
        req.flash('error', 'Erro: ' +error.message);
        return res.redirect('/post/add');
    } 

    req.flash('success', 'Post added successfully ' +post.data );
    res.redirect('/'); 
};

exports.edit = async (req, res) => {
    // pega as informaçoes
    const post = await Post.findOne({ slug:req.params.slug });

    res.render('postEdit', { post });
};

exports.editAction = async (req, res) => {

    req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    req.body.slug = require('slug')(req.body.title, {lower:true})

    try {
        const post = await Post.findOneAndUpdate(
            { slug:req.params.slug}, 
            req.body, 
            {
                new: true, // Retornar novo item atualizado
                runValidators:true
            }
        );
    } catch(error){
        req.flash('error', 'Erro: ' +error.message);
        return res.redirect('/post/'+req.params.slug+'/edit');
    };

    req.flash('success', 'Post atualizado com sucesso!');

    res.redirect('/');
};