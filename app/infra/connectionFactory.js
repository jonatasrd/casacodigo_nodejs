var mysql = require('mysql');

function createDbConnection(){  
    if(!process.env.NODE_ENV || process.env.node === 'dev') {
        return mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'',
                database:'casadocodigo_nodejs'
        });
    }

    if(process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'',
                database:'casadocodigo_nodejs_teste'
        });
    }
}

module.exports = function(){
    return createDbConnection;
}