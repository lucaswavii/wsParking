module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();    
    var veiculoDao = new application.app.models.VeiculoDAO(connection);
    veiculoDao.listar(function(error, veiculos){
        connection.end();
        if( error ) {
            res.render('veiculoListar', { validacao : [ {'msg': error.sqlMessage }], veiculos : {}, sessao: req.session.usuario });
            return;
        }
        res.render('veiculoListar', { validacao : {}, veiculos : veiculos, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();    
    var tipoDao = new application.app.models.TipoDAO(connection);
    var corDao = new application.app.models.CorDAO(connection);
    tipoDao.listar(function(error, tipos ){
        corDao.listar(function(error, cores ){
            res.render('veiculoEditar', { validacao : {}, veiculos : {} , tipos: tipos, cores: cores, sessao: req.session.usuario });
        });
    });

}

module.exports.editar = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var veiculoDao = new application.app.models.VeiculoDAO(connection);
    var tipoDao = new application.app.models.TipoDAO(connection);
    var corDao = new application.app.models.CorDAO(connection);

    veiculoDao.editar(req.params._id, function(error, veiculos){
        tipoDao.listar(function(error, tipos ){
            corDao.listar(function(error, cores ){
                res.render('veiculoEditar', { validacao : {}, veiculos : veiculos , tipos: tipos, cores: cores, sessao: req.session.usuario });
            });
        });
    });
}

module.exports.excluir = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var veiculoDao = new application.app.models.VeiculoDAO(connection);
    
    veiculoDao.excluir( req.params._id, function(error, veiculos){
        connection.end();
        if( error ) {
            res.render('veiculos', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], veiculos : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/veiculos");
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
      
        res.render('veiculoListar', { validacao : [ {'msg': error.sqlMessage }], veiculos : {}, sessao: req.session.usuario });
        return;
    }
    
    var connection = application.config.dbConnection();
    var veiculoDao = new application.app.models.VeiculoDAO(connection);       
    
    veiculoDao.salvar(dadosForms, function(error, result){
        connection.end();    
        
        if( error ) {
            res.render('veiculoListar', { validacao : error, veiculos : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect('/veiculos');
    });
}