const flash = require('express-flash');
const User = require('../models/User');

exports.login = (req, res) => {
    res.render('login');
};  

exports.register = (req, res) => {
    res.render('register');
};

exports.loginAction = (req, res) => {
    const auth = User.authenticate()

    auth(req.body.email, req.body.password, (error, result) => {
        if(!result) {
            req.flash('error', 'Não foi possível logar, tente novamento')
            res.redirect('/users/login');
            return;
        }
        req.login(result, () => {});

        req.flash('success', 'Você logou!');
        res.redirect('/')
    })   
}

exports.registerAction = (req, res) => {
    User.register(new User(req.body), req.body.password, (error)=>{
        if (error) {
            req.flash('error', 'Ocorreu um erro, tente novamente')
            res.redirect('/users/register');
            return;
        }   
        flash('success', 'Cadastro realizado com sucesso!')
        res.redirect('/Users/login');
    });
};  