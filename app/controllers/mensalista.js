module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var mensalistaDao = new application.app.models.MensalistaDAO(connection);
    
    mensalistaDao.listar(function(error, mensalistas){
        connection.end();
        if( error ) {
            res.render('mensalistaListar', { validacao : [ {'msg': error.sqlMessage }], mensalistas : {}, sessao: req.session.usuario });
            return;
        }
        res.render('mensalistaListar', { validacao : {}, mensalistas : mensalistas, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var clienteDao = new application.app.models.ClienteDAO(connection);
    var veiculosDao = new application.app.models.VeiculoDAO(connection);
    
    clienteDao.listar(function(error, clientes){
        veiculosDao.listar(function(error, veiculos){
            connection.end();
            res.render('mensalistaEditar', { validacao : {}, clientes : clientes, veiculos: veiculos, vinculos: {}, sessao: req.session.usuario });
        });
    });

}

module.exports.editar = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var mensalistaDao = new application.app.models.MensalistaDAO(connection);
    var clienteDao = new application.app.models.ClienteDAO(connection);
    var veiculosDao = new application.app.models.VeiculoDAO(connection);
    
    mensalistaDao.editar( req.params._id, function(error, mensalistas){
        clienteDao.listar(function(error, clientes){
            veiculosDao.listar(function(error, veiculos){
                connection.end();
                if( error ) {
                    res.render('mensalistaEditar', { validacao : [ {'msg': error.sqlMessage }], mensalistas : {}, sessao: req.session.usuario });
                    return;
                }
                res.render('mensalistaEditar', { validacao : {}, mensalistas : mensalistas, clientes:clientes, veiculos: veiculos, sessao: req.session.usuario });
            });
        });
    });
}

module.exports.excluir = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var tipoDao = new application.app.models.TipoDAO(connection);
    
    tipoDao.excluir( req.params._id, function(error, tipos){
        connection.end();
        if( error ) {
            res.render('tipos', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], tipos : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/tipos");
    });
}

module.exports.salvar = function( application, req, res ){

    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var dadosForms = req.body;
    req.assert('nome', 'Nome é obrigatório').notEmpty();
    
    var erros = req.validationErrors();

    if(erros){
      
        res.render('mensalistaEditar', {validacao: erros,  tipos: [ dadosForms], sessao: req.session.usuario});
        return;
    }
    
    var connection = application.config.dbConnection();
    var tipoDao = new application.app.models.TipoDAO(connection);        
    var moduloDao = new application.app.models.ModuloDAO(connection);        
    
    tipoDao.salvar(dadosForms, function(error, result){
        connection.end();    
        
        if( error ) {
            res.render('mensalistaEditar', { validacao : [ {'msg': error.sqlMessage }], tipos : [ dadosForms], sessao: req.session.usuario });
            return;
        }
        res.redirect('/mensalista');
    });
}