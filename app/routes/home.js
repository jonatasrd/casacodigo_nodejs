module.exports = function(app) {
    app.get("/",function(req, res) {
        var connection = app.infra.ConnectionFactory();
        var produtos = new app.infra.ProdutosDAO(connection);

        produtos.lista(function(error,results){
            res.render('home/index',{livros:results});
        });
        connection.end();

    });
}