module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.listar(function(error, grupos){
        connection.end();
        if( error ) {
            res.render('permissaoListar', { validacao : [ {'msg': error }], grupos : {}, sessao: req.session.usuario });
            return;
        }
        res.render('permissaoListar', { validacao : {}, grupos : grupos, sessao: req.session.usuario });
    });
}

module.exports.editar = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    var permissaoDao = new application.app.models.PermissaoDAO(connection);
    var moduloDao = new application.app.models.ModuloDAO(connection);
    
    moduloDao.listar(function(error, modulos){
        grupoDao.editar( req.params._id,function(error, grupos){    
            permissaoDao.editar( req.params._id, function(error, permissoes){
                connection.end();
                if( error ) {
                    res.render('permissao', { validacao : [ {'msg': error }], grupos : {}, sessao: req.session.usuario });
                    return;
                }
                res.render('permissaoEditar', { validacao : {}, modulos : modulos, grupos: grupos, modulo:{}, permissoes:permissoes, sessao: req.session.usuario });
            });
        });
    });
}

module.exports.excluir = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    
    var connection = application.config.dbConnection();
    var indicacaoDao = new application.app.models.IndicacaoDAO(connection);
    
    indicacaoDao.excluir( req.params._id, function(error, indicacoes){
        connection.end();
        if( error ) {
            res.render('indicacao', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], indicacoes : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/indicacao");
    });
}

module.exports.salvar = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    var dadosForms = req.body;
    var connection = application.config.dbConnection();
    var permissaoDao = new application.app.models.PermissaoDAO(connection);        
    var grupoDao = new application.app.models.GrupoDAO(connection);
    var moduloDao = new application.app.models.ModuloDAO(connection);
    
    permissaoDao.listar( dadosForms, function(error, permissoes){
        var permissoes;
        
        if( permissoes.length > 0 ) {
            permissoes = { id:permissoes[0].id, 
                           grupo: dadosForms.grupo, 
                           modulo: dadosForms.modulo, 
                           ver: ( dadosForms.ver ? 'S': 'F'),
                           incluir: ( dadosForms.incluir ? 'S': 'F'),
                           alterar: ( dadosForms.alterar ? 'S': 'F'),
                           excluir: ( dadosForms.excluir ? 'S': 'F')  
                        }                
        } else {
            permissoes = { grupo: dadosForms.grupo, 
                           modulo: dadosForms.modulo, 
                           ver: ( dadosForms.ver ? 'S': 'F'),
                           incluir: ( dadosForms.incluir ? 'S': 'F'),
                           alterar: ( dadosForms.alterar ? 'S': 'F'),
                           excluir: ( dadosForms.excluir ? 'S': 'F')  
                        }
            
        }
        permissaoDao.salvar(permissoes, function(error, result){
            
            moduloDao.listar(function(error, modulos){
                grupoDao.editar( permissoes.grupo,function(error, grupos){    
                    permissaoDao.editar( permissoes.grupo, function(error, permissoes){
                        connection.end();
                        if( error ) {
                            res.render('permissao', { validacao : [ {'msg': error }], grupos : {}, sessao: req.session.usuario });
                            return;
                        }
                        res.render('permissaoEditar', { validacao : {}, modulos : modulos, grupos: grupos, modulo:dadosForms.modulo, permissoes:permissoes, sessao: req.session.usuario });
                    });
                });
            });        
        });
    });

    /*var modulo      = req.params._id;
    
    
    
    indicacoesDao.salvar(dadosForms, function(error, result){
        connection.end();    
        if( error ) {
            res.render('indicacaoEditar', { validacao : [ {'msg': error.sqlMessage }], indicacoes : [ dadosForms], sessao: req.session.usuario });
            return;
        }
        res.redirect('/indicacao');
    });*/
    
}