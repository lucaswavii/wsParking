module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var disponivelDao = new application.app.models.DisponivelDAO(connection);
    
    disponivelDao.listar(function(error, disponiveis){
        connection.end();
        if( error ) {
            res.render('disponivelListar', { validacao : [ {'msg': error.sqlMessage }], disponiveis : {}, sessao: req.session.usuario });
            return;
        }
        res.render('disponivelListar', { validacao : {}, disponiveis : disponiveis, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    var connection = application.config.dbConnection();
    var bancoDao = new application.app.models.BancoDAO(connection);
    
    bancoDao.listar(function(error, bancos){
        if( error ) {
            res.render('disponivelListar', { validacao : [ {'msg': error.sqlMessage }], disponiveis : {}, sessao: req.session.usuario });
            return;
        }
        res.render('disponivelEditar', { validacao : {}, disponiveis : {}, bancos:bancos, sessao: req.session.usuario });
    
    });
}

module.exports.editar = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var disponivelDao = new application.app.models.DisponivelDAO(connection);
    var bancoDao = new application.app.models.BancoDAO(connection);
    
    bancoDao.listar(function(error, bancos){
        disponivelDao.editar( req.params._id, function(error, disponiveis){
            connection.end();
            if( error ) {
                res.render('disponivelEditar', { validacao : [ {'msg': error.sqlMessage }], disponiveis : {}, bancos: bancos, sessao: req.session.usuario });
                return;
            }
            res.render('disponivelEditar', { validacao : {}, disponiveis : disponiveis, bancos: bancos, sessao: req.session.usuario });
        });
    })
}

module.exports.excluir = function( application, req, res ){
   
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var disponivelDao = new application.app.models.DisponivelDAO(connection);
    
    disponivelDao.excluir( req.params._id, function(error, disponiveis){
        connection.end();
        if( error ) {
            res.render('disponivel', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], disponiveis : {}, bancos: {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/disponivel");
    });
}

module.exports.salvar = function( application, req, res ){

    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var dadosForms = req.body;
    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('banco', 'banco é obrigatório').notEmpty();       
    req.assert('agencia', 'Agência é obrigatória').notEmpty();       
    req.assert('conta', 'Conta é obrigatória').notEmpty();       

    var erros = req.validationErrors();

    if(erros){
      
        res.render('disponivelEditar', {validacao: erros,  disponiveis: [ dadosForms], bancos: {}, sessao: req.session.usuario});
        return;
    }
    
    var connection = application.config.dbConnection();
    var disponivelDao = new application.app.models.DisponivelDAO(connection);        
    
    disponivelDao.salvar(dadosForms, function(error, result){
        connection.end();
        if( error ) {
            res.render('disponivelEditar', { validacao : [ {'msg': error.sqlMessage }], disponiveis :[ dadosForms], bancos: {}, sessao: req.session.usuario });
            return;
        }
        res.redirect('/disponivel');
    });
     
}