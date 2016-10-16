var url = require('url');


module.exports = function (req, res) {
    var createUrl = url.parse(req.url).pathname == "/usuario/create";
    var updateUrl = !createUrl;

    // console.log(url.parse(req.url).pathname);
    // console.log("createURL: ---> " + createUrl);

    req.assert('nome', 'Informe seu Nome').notEmpty();

    if (createUrl) {
        req.assert('email', 'E-mail inválido ').isEmail();
        req.assert('password', 'Sua senha deve conter de 6 a 10 caracteres ').len(6, 10);
    }
    
    req.assert('site', 'Site não é uma URL válida').isURL();

    var validateErros = req.validationErrors() || [];

    if (req.body.password != req.body.password_confirmar) {
        validateErros.push({
            msg: 'Senha não confere'
        });
    }

    if (validateErros.length > 0) {
        validateErros.forEach(function (e) {
            req.flash('erro', e.msg);
        });

        for (var x = 0; x < validateErros.length; x++) {
            console.log(" ");
            console.log("ERRO: " + validateErros[x].msg);
            console.log(" ");
        }

        return false;
        
    } else {
        return true;
    }

}