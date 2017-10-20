
module.exports = function(app){

    app.get('/produtos', function(req,res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);

        produtosDAO.lista(function(err, results){
            res.format({
                html: function(){
                    res.render('produtos/lista',{lista:results});
                },
                json: function(){
                    res.json(results);
                }
            });
        });

        connection.end();
    });

    app.get('/produtos/cadastro',function(req, res){
        res.render('produtos/form',
            {validationErrors:{}, produto: {}})
    });

    app.post('/produtos',function(req,res) {
        var produto = req.body;

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);

        var validadorTitulo = req.assert('titulo', 'Titulo deve ser preenchido');
        validadorTitulo.notEmpty();
        req.assert('preco','Preco deve ser um número').isFloat();

        var errors = req.validationErrors();
        if(errors){
            res.format({
                html: function(){
                    res.status(400).render("produtos/form",{validationErrors:errors,produto:produto});
                },
                json: function(){
                    res.status(400).send(errors);
                }
            });

            return;
        }

        produtosDAO.salva(produto,function(erros,resultado){
            res.redirect('/produtos');
        });

        connection.end();
        
    });
}
