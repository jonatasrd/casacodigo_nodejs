
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
        res.render('produtos/form');
    });

    app.post('/produtos',function(req,res) {
        var produto = req.body;
        //console.log(produto);

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);

        produtosDAO.salva(produto,function(erros,resultado){
            res.redirect('/produtos');
        });

        connection.end();
        
    });
}
