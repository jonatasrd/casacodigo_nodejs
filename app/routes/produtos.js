
module.exports = function(app){

    app.get('/produtos', function(req,res){
        var connection = app.infra.connectionFactory();
        var produtosBanco = new app.infra.produtosDAO(connection);

        produtosBanco.lista(function(err, results){
            res.render('produtos/lista',{lista:results});
        });

        connection.end();
    });
}
